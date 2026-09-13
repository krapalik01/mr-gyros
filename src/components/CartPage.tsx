"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Plus, Minus, CheckCircle2, Send } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWakeLock } from "@/hooks/useWakeLock";
import { useHasMounted } from "@/hooks/useHasMounted";
import { MenuItem } from "@/types";
import { TABLE_STORAGE_KEY } from "@/components/MenuPage";

interface Props {
  menuItems: MenuItem[];
}

type SentOrder = { table: string; total: number };

export const CartPage = ({ menuItems }: Props) => {
  const { items, addItem, removeItem, clearCart, pruneMissing } = useCartStore();
  const router = useRouter();
  // Корзина живёт в localStorage, поэтому до монтирования в браузере ничего не рисуем
  const mounted = useHasMounted();

  // Номер стола: из QR-кода (сохранён на главной) или введённый вручную в прошлый раз.
  // До монтирования компонент ничего не рендерит, поэтому чтение localStorage здесь безопасно
  const [table, setTable] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(TABLE_STORAGE_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const [comment, setComment] = useState("");
  const [ordersEnabled, setOrdersEnabled] = useState<boolean | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<SentOrder | null>(null);

  // Активируем удержание экрана
  useWakeLock();

  useEffect(() => {
    pruneMissing(menuItems.map((item) => item.id));
  }, [menuItems, pruneMissing]);

  // Узнаём, настроена ли отправка заказов в Telegram, чтобы показать нужную кнопку
  useEffect(() => {
    fetch("/api/order", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: { enabled?: boolean }) => setOrdersEnabled(Boolean(data.enabled)))
      .catch(() => setOrdersEnabled(false));
  }, []);

  if (!mounted) return null;

  // Экран после успешной отправки
  if (sent) {
    return (
      <div className="min-h-screen bg-marble flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 size={72} className="text-green-600 mb-4" />
        <h1 className="text-2xl font-bold text-dark mb-2">Заказ отправлен</h1>
        <p className="text-gray-600 mb-1">
          Стол {sent.table} · Итого {sent.total} ₽
        </p>
        <p className="text-gray-500 mb-8">Официант скоро подойдёт к вам</p>
        <button
          onClick={() => router.push("/")}
          className="bg-brandRed text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

  // Если корзина пуста (например, зашли по прямой ссылке или очистили)
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-marble flex flex-col items-center justify-center p-4">
        <p className="text-xl text-dark mb-4">Корзина пуста</p>
        <button
          onClick={() => router.push("/")}
          className="bg-brandRed text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

  // Склеиваем стейт корзины с данными меню
  const cartDetails = items
    .map((cartItem) => ({ ...cartItem, menuItem: menuItems.find((m) => m.id === cartItem.id) }))
    .filter((item) => item.menuItem);

  const totalPrice = cartDetails.reduce(
    (sum, item) => sum + (item.menuItem?.price || 0) * item.quantity,
    0
  );

  const handleClear = () => {
    clearCart();
    router.push("/"); // Возвращаем гостя на главную после показа заказа
  };

  const handleSend = async () => {
    const tableValue = table.trim();
    if (!tableValue) {
      setError("Укажите номер стола");
      return;
    }
    setSending(true);
    setError(null);
    try {
      localStorage.setItem(TABLE_STORAGE_KEY, tableValue);
    } catch {
      // не критично
    }
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: tableValue,
          comment: comment.trim(),
          items: items.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string; total?: number };
      if (!response.ok) {
        setError(data.error || "Не удалось отправить заказ, покажите экран официанту");
        return;
      }
      clearCart();
      setSent({ table: tableValue, total: data.total ?? totalPrice });
    } catch {
      setError("Нет связи. Покажите экран официанту");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-marble text-dark flex flex-col pb-[22rem]">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-marble/90 backdrop-blur-md border-b border-gray-200/50 p-4 flex items-center">
        <button
          onClick={() => router.push("/")}
          aria-label="Назад в меню"
          className="p-2 -ml-2 active:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold flex-grow text-center pr-8">
          Ваш заказ
        </h1>
      </header>

      {/* Список блюд без фото, но крупно */}
      <div className="p-4 flex flex-col gap-4">
        {cartDetails.map(({ id, quantity, menuItem }) => (
          <div key={id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-bold text-xl leading-tight">
                {menuItem?.title}
              </h3>
              <span className="font-bold text-lg whitespace-nowrap text-brandRed">
                {menuItem!.price * quantity} ₽
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-500 text-sm">Цена: {menuItem?.price} ₽</span>

              <div className="flex items-center gap-4 bg-marble rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => removeItem(id)}
                  aria-label="Убрать одну"
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm text-brandRed active:scale-95"
                >
                  <Minus size={20} />
                </button>
                <span className="w-6 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => addItem(id)}
                  aria-label="Добавить ещё одну"
                  className="w-10 h-10 flex items-center justify-center bg-brandRed rounded-md shadow-sm text-white active:scale-95"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итоговая панель (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 w-full p-4 pb-[max(1rem,env(safe-area-inset-bottom))] z-50 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100">
        {ordersEnabled && (
          <div className="flex gap-3 mb-3">
            <label className="flex flex-col gap-1 w-28 shrink-0">
              <span className="text-xs text-gray-500">Номер стола</span>
              <input
                value={table}
                onChange={(e) => setTable(e.target.value.slice(0, 8))}
                inputMode="numeric"
                placeholder="5"
                className="h-11 rounded-lg border border-gray-300 px-3 text-lg font-bold text-center focus:outline-none focus:border-brandRed"
              />
            </label>
            <label className="flex flex-col gap-1 flex-grow">
              <span className="text-xs text-gray-500">Комментарий (необязательно)</span>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 300))}
                placeholder="Без лука, соус отдельно…"
                className="h-11 rounded-lg border border-gray-300 px-3 text-base focus:outline-none focus:border-brandRed"
              />
            </label>
          </div>
        )}

        <div className="flex justify-between items-end mb-3 px-1">
          <span className="text-lg text-gray-500 font-medium">Итого:</span>
          <span className="text-4xl font-black text-brandRed">{totalPrice} ₽</span>
        </div>

        {error && <p className="text-sm text-red-600 mb-2 px-1">{error}</p>}

        {ordersEnabled ? (
          <>
            <button
              onClick={handleSend}
              disabled={sending}
              className="w-full bg-brandRed text-white rounded-xl p-4 font-bold text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-60 disabled:active:scale-100"
            >
              <Send size={20} />
              {sending ? "Отправляем…" : "Отправить заказ"}
            </button>
            <button
              onClick={handleClear}
              className="w-full mt-2 text-gray-500 text-sm py-2 active:text-dark"
            >
              Очистить корзину
            </button>
          </>
        ) : (
          <button
            onClick={handleClear}
            className="w-full bg-dark text-white rounded-xl p-4 font-bold text-lg active:scale-95 transition-transform"
          >
            Заказ показан (Очистить)
          </button>
        )}
      </div>
    </main>
  );
};
