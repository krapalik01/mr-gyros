// POST /api/admin/login { password } - ставит куку сессии админки
import { NextResponse } from "next/server";
import { checkPassword, isAdminConfigured, sessionCookie } from "@/lib/adminAuth";
import { clientIp, rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Админка не настроена: задайте ADMIN_PASSWORD (минимум 6 символов) в переменных окружения" },
      { status: 503 }
    );
  }

  // 10 попыток за 15 минут с одного IP
  if (!rateLimit(`login:${clientIp(request)}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json({ error: "Слишком много попыток, попробуйте через 15 минут" }, { status: 429 });
  }

  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  const password = typeof body.password === "string" ? body.password : "";

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie());
  return response;
}
