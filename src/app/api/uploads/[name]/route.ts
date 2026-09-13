// GET /api/uploads/<file> - отдаёт фото из локального хранилища (.data/uploads).
// Нужен только без Vercel Blob: файлы, добавленные в public/ после сборки, next start не отдаёт.
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const UPLOADS_DIR = path.join(process.cwd(), ".data", "uploads");
const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" };

export async function GET(_request: Request, context: { params: Promise<{ name: string }> }) {
  const { name } = await context.params;
  const match = /^([a-z0-9_-]+)\.(jpg|png|webp)$/i.exec(name);
  if (!match) return new NextResponse("Not found", { status: 404 });

  try {
    const file = await fs.readFile(path.join(UPLOADS_DIR, name));
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": TYPES[match[2].toLowerCase()],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
