// src/lib/menuStorage.ts
// Хранилище меню. Только для серверного кода (route handlers, server components).
//
// Два режима, выбираются автоматически:
// - есть BLOB_READ_WRITE_TOKEN (Vercel)  -> меню лежит в Vercel Blob как menu.json, фото в menu-images/
// - токена нет (локальная разработка)   -> меню в .data/menu.json, фото в .data/uploads/ (отдаёт /api/uploads/...)
//
// Пока админка ни разу ничего не сохранила, отдаются стартовые данные из src/data/menu.ts.

import { promises as fs } from "fs";
import path from "path";
import { get, put } from "@vercel/blob";
import { categories as seedCategories, menuItems as seedItems } from "@/data/menu";
import type { Category, MenuData, MenuItem } from "@/types";

const MENU_PATHNAME = "menu.json";
const LOCAL_DIR = path.join(process.cwd(), ".data");
const LOCAL_FILE = path.join(LOCAL_DIR, "menu.json");
const LOCAL_UPLOADS = path.join(process.cwd(), ".data", "uploads");

// Короткий кэш в памяти, чтобы не ходить в хранилище на каждый запрос страницы
const CACHE_MS = 10_000;
let cache: { data: MenuData; at: number } | null = null;

export const isBlobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export const seedMenu = (): MenuData => ({
  categories: seedCategories,
  items: seedItems,
  updatedAt: null,
});

export async function loadMenu(options?: { fresh?: boolean }): Promise<MenuData> {
  if (!options?.fresh && cache && Date.now() - cache.at < CACHE_MS) return cache.data;

  let stored: MenuData | null = null;
  try {
    stored = isBlobConfigured() ? await loadFromBlob() : await loadFromFile();
  } catch (error) {
    console.error("[menu] не удалось прочитать меню из хранилища, показываю стартовые данные", error);
  }

  const data = stored ? normalizeMenu(stored) : seedMenu();
  cache = { data, at: Date.now() };
  return data;
}

export async function saveMenu(input: MenuData): Promise<MenuData> {
  const data = normalizeMenu({ ...input, updatedAt: new Date().toISOString() });
  const json = JSON.stringify(data, null, 2);

  if (isBlobConfigured()) {
    await put(MENU_PATHNAME, json, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
      cacheControlMaxAge: 60, // минимум, который позволяет Blob; читаем всё равно мимо CDN (useCache: false)
    });
  } else {
    await fs.mkdir(LOCAL_DIR, { recursive: true });
    await fs.writeFile(LOCAL_FILE, json, "utf8");
  }

  cache = { data, at: Date.now() };
  return data;
}

/** Сохраняет картинку блюда и возвращает URL, который можно класть в item.imageUrl */
export async function saveImage(
  buffer: Buffer,
  contentType: "image/jpeg" | "image/png" | "image/webp",
  key: string
): Promise<string> {
  const ext = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const safeKey = key.replace(/[^a-z0-9_-]/gi, "").slice(0, 60) || "item";
  const filename = `${safeKey}-${Date.now()}.${ext}`;

  if (isBlobConfigured()) {
    const result = await put(`menu-images/${filename}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });
    return result.url;
  }

  await fs.mkdir(LOCAL_UPLOADS, { recursive: true });
  await fs.writeFile(path.join(LOCAL_UPLOADS, filename), buffer);
  return `/api/uploads/${filename}`;
}

// ---------- приватное ----------

async function loadFromBlob(): Promise<MenuData | null> {
  // useCache: false - читаем свежую версию из хранилища, а не из CDN-кэша (иначе до 60 с старые данные)
  const result = await get(MENU_PATHNAME, { access: "public", useCache: false });
  if (!result || result.statusCode !== 200) return null;
  const text = await new Response(result.stream).text();
  return JSON.parse(text) as MenuData;
}

async function loadFromFile(): Promise<MenuData | null> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as MenuData;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

/**
 * Приводит данные к строгой форме: лишние поля отбрасываются, числа и флаги приводятся к типам.
 * Бросает Error с понятным текстом, если данные битые (используется и для PUT из админки).
 */
export function normalizeMenu(input: unknown): MenuData {
  if (!input || typeof input !== "object") throw new Error("Меню должно быть объектом");
  const raw = input as Partial<MenuData>;
  if (!Array.isArray(raw.categories) || !Array.isArray(raw.items)) {
    throw new Error("В меню должны быть массивы categories и items");
  }

  const categories: Category[] = raw.categories.map((c, i) => {
    const cat = c as Partial<Category>;
    if (!cat.id || !cat.title) throw new Error(`Категория #${i + 1}: нужны id и title`);
    return { id: String(cat.id), title: String(cat.title).trim(), slug: String(cat.slug || cat.id) };
  });
  const categoryIds = new Set(categories.map((c) => c.id));
  if (!categoryIds.has("all")) throw new Error("Должна быть категория all");

  const seenIds = new Set<string>();
  const items: MenuItem[] = raw.items.map((it, i) => {
    const item = it as Partial<MenuItem>;
    const id = String(item.id ?? "").trim();
    const title = String(item.title ?? "").trim();
    const price = Number(item.price);
    if (!id) throw new Error(`Позиция #${i + 1}: пустой id`);
    if (seenIds.has(id)) throw new Error(`Позиция «${title || id}»: id повторяется`);
    seenIds.add(id);
    if (!title) throw new Error(`Позиция ${id}: пустое название`);
    if (!Number.isFinite(price) || price < 0 || price > 1_000_000) {
      throw new Error(`Позиция «${title}»: некорректная цена`);
    }
    if (!item.categoryId || !categoryIds.has(item.categoryId) || item.categoryId === "all" || item.categoryId === "chef") {
      throw new Error(`Позиция «${title}»: неизвестная категория`);
    }
    const weight = String(item.weight ?? "").trim();
    return {
      id,
      categoryId: item.categoryId,
      title,
      description: String(item.description ?? "").trim(),
      price: Math.round(price),
      ...(weight ? { weight } : {}),
      imageUrl: String(item.imageUrl || "/images/placeholder.jpg"),
      isAvailable: item.isAvailable !== false,
      ...(item.isChefChoice ? { isChefChoice: true } : {}),
    };
  });

  return {
    categories,
    items,
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null,
  };
}
