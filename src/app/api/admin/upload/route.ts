// POST /api/admin/upload (multipart: file, itemId) - сохраняет фото блюда, возвращает { url }
// Картинка уже уменьшена на клиенте (до 1200px, JPEG), тут только проверки и запись в хранилище.
import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { saveImage } from "@/lib/menuStorage";

const MAX_BYTES = 4 * 1024 * 1024; // лимит тела запроса у Vercel Functions 4.5 МБ
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Нужно войти в админку" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  const itemId = String(form?.get("itemId") ?? "item");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Поддерживаются JPEG, PNG и WebP" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Файл больше 4 МБ" }, { status: 413 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const url = await saveImage(buffer, file.type as "image/jpeg" | "image/png" | "image/webp", itemId);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[upload] failed:", error);
    return NextResponse.json({ error: "Не удалось сохранить фото" }, { status: 502 });
  }
}
