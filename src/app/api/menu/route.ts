// GET  /api/menu - актуальное меню (публично)
// PUT  /api/menu - сохранить меню целиком (только админ)
import { NextResponse } from "next/server";
import { loadMenu, saveMenu, normalizeMenu } from "@/lib/menuStorage";
import { isAdminRequest } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const menu = await loadMenu({ fresh: true });
  return NextResponse.json(menu, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Нужно войти в админку" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  try {
    const saved = await saveMenu(normalizeMenu(body));
    return NextResponse.json(saved);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не удалось сохранить меню";
    const status = /Blob|BLOB|token|fetch|Хранилище/i.test(message) ? 502 : 400;
    console.error("[menu] save failed:", error);
    return NextResponse.json({ error: message }, { status });
  }
}
