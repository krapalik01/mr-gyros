// POST /api/order { table, comment?, items: [{ id, quantity }] }
// Проверяет заказ по актуальному меню, считает сумму на сервере и шлёт сообщение в Telegram-чат персонала.
import { NextResponse } from "next/server";
import { loadMenu } from "@/lib/menuStorage";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import type { OrderLine } from "@/types";

export const dynamic = "force-dynamic";

const MAX_LINES = 30;
const MAX_QTY = 20;

const isTelegramConfigured = () =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  // Клиент спрашивает, включена ли отправка заказов, чтобы показать нужную кнопку
  return NextResponse.json({ enabled: isTelegramConfigured() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!isTelegramConfigured()) {
    return NextResponse.json(
      { error: "Отправка заказов не настроена. Покажите экран официанту." },
      { status: 503 }
    );
  }

  // 6 заказов за 10 минут с одного IP: гости за столом столько не сделают, спам отсечёт
  if (!rateLimit(`order:${clientIp(request)}`, 6, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Слишком много заказов подряд, подождите немного" }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as
    | { table?: unknown; comment?: unknown; items?: unknown }
    | null;

  const table = String(body?.table ?? "").trim().slice(0, 8);
  const comment = String(body?.comment ?? "").trim().slice(0, 300);
  const rawItems = Array.isArray(body?.items) ? (body!.items as OrderLine[]) : [];

  if (!/^[0-9A-Za-zА-Яа-яЁё-]{1,8}$/.test(table)) {
    return NextResponse.json({ error: "Укажите номер стола" }, { status: 400 });
  }
  if (rawItems.length === 0 || rawItems.length > MAX_LINES) {
    return NextResponse.json({ error: "Корзина пуста" }, { status: 400 });
  }

  const menu = await loadMenu({ fresh: true });
  const byId = new Map(menu.items.map((item) => [item.id, item]));

  const lines: { title: string; quantity: number; price: number }[] = [];
  for (const raw of rawItems) {
    const item = byId.get(String(raw?.id));
    const quantity = Math.floor(Number(raw?.quantity));
    if (!item || !Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return NextResponse.json({ error: "В корзине есть позиция, которой больше нет в меню" }, { status: 400 });
    }
    if (!item.isAvailable) {
      return NextResponse.json({ error: `«${item.title}» сейчас нет в наличии` }, { status: 409 });
    }
    lines.push({ title: item.title, quantity, price: item.price });
  }

  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const time = new Date().toLocaleTimeString("ru-RU", {
    timeZone: process.env.ORDER_TIMEZONE || "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
  });

  const text = [
    `🧾 <b>Новый заказ, стол ${escapeHtml(table)}</b>  ·  ${time}`,
    "",
    ...lines.map((l) => `• ${escapeHtml(l.title)} × ${l.quantity}  -  ${l.price * l.quantity} ₽`),
    "",
    `<b>Итого: ${total} ₽</b>`,
    ...(comment ? ["", `💬 ${escapeHtml(comment)}`] : []),
  ].join("\n");

  // TELEGRAM_API_BASE нужен только для тестов (подменить адрес Telegram на локальную заглушку)
  const apiBase = process.env.TELEGRAM_API_BASE || "https://api.telegram.org";
  const tgResponse = await fetch(
    `${apiBase}/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
        ...(process.env.TELEGRAM_THREAD_ID ? { message_thread_id: Number(process.env.TELEGRAM_THREAD_ID) } : {}),
      }),
    }
  ).catch(() => null);

  if (!tgResponse?.ok) {
    const details = tgResponse ? await tgResponse.text().catch(() => "") : "no response";
    console.error("[order] telegram failed:", tgResponse?.status, details);
    return NextResponse.json(
      { error: "Не удалось отправить заказ. Покажите экран официанту." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, total });
}
