"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Star, Pencil, ExternalLink, LogOut, Search } from "lucide-react";
import { Category, MenuData, MenuItem } from "@/types";
import { LoginForm } from "./LoginForm";
import { ItemEditor } from "./ItemEditor";

interface Props {
  configured: boolean;
  initialAuthed: boolean;
  initialMenu: MenuData | null;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";
type EditorState = { item: MenuItem; isNew: boolean } | null;

const PLACEHOLDER = "/images/placeholder.jpg";
const SAVE_DELAY_MS = 800;

export const AdminApp = ({ configured, initialAuthed, initialMenu }: Props) => {
  const [authed, setAuthed] = useState(initialAuthed);
  const [menu, setMenu] = useState<MenuData | null>(initialMenu);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [status, setStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [editor, setEditor] = useState<EditorState>(null);

  // Автосохранение: любое изменение меню улетает на сервер целиком через 0.8 с после последней правки
  const pendingRef = useRef<MenuData | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flushSave = useCallback(async () => {
    const data = pendingRef.current;
    if (!data) return;
    pendingRef.current = null;
    setStatus("saving");
    try {
      const response = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => ({}))) as Partial<MenuData> & { error?: string };
      if (response.status === 401) {
        setAuthed(false);
        return;
      }
      if (!response.ok) throw new Error(result.error || "Не удалось сохранить");
      // Если пока сохраняли, накопились новые правки - они уйдут следующим вызовом
      if (!pendingRef.current) {
        setStatus("saved");
        setSaveError(null);
        setMenu((m) => (m ? { ...m, updatedAt: result.updatedAt ?? m.updatedAt } : m));
      }
    } catch (e) {
      setStatus("error");
      setSaveError(e instanceof Error ? e.message : "Не удалось сохранить");
    }
  }, []);

  const commit = useCallback(
    (next: MenuData) => {
      setMenu(next);
      pendingRef.current = next;
      setStatus("saving");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flushSave, SAVE_DELAY_MS);
    },
    [flushSave]
  );

  // Предупреждаем, если закрывают вкладку с несохранёнными правками
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pendingRef.current || status === "saving") e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [status]);

  // После входа подтягиваем меню
  useEffect(() => {
    if (!authed || menu) return;
    fetch("/api/menu", { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error("Не удалось загрузить меню");
        setMenu((await r.json()) as MenuData);
      })
      .catch((e: Error) => setLoadError(e.message));
  }, [authed, menu]);

  const updateItem = (id: string, patch: Partial<MenuItem>) => {
    if (!menu) return;
    commit({ ...menu, items: menu.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) });
  };

  const saveFromEditor = (item: MenuItem) => {
    if (!menu || !editor) return;
    const exists = menu.items.some((it) => it.id === item.id);
    const items = exists
      ? menu.items.map((it) => (it.id === item.id ? item : it))
      : [...menu.items, item];
    commit({ ...menu, items });
    setEditor(null);
  };

  const deleteItem = (id: string) => {
    if (!menu) return;
    commit({ ...menu, items: menu.items.filter((it) => it.id !== id) });
    setEditor(null);
  };

  const openNew = () => {
    if (!menu) return;
    const realCategories = menu.categories.filter((c) => c.id !== "all" && c.id !== "chef");
    const categoryId =
      filterCategory !== "all" && realCategories.some((c) => c.id === filterCategory)
        ? filterCategory
        : realCategories[0]?.id ?? "";
    setEditor({
      isNew: true,
      item: {
        id: `item-${Date.now().toString(36)}`,
        categoryId,
        title: "",
        description: "",
        price: 0,
        imageUrl: PLACEHOLDER,
        isAvailable: true,
      },
    });
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setAuthed(false);
    setMenu(null);
  };

  const categoryTitle = useMemo(() => {
    const map = new Map<string, string>();
    menu?.categories.forEach((c) => map.set(c.id, c.title));
    return (id: string) => map.get(id) ?? id;
  }, [menu]);

  if (!authed) {
    return <LoginForm configured={configured} onSuccess={() => setAuthed(true)} />;
  }

  if (!menu) {
    return (
      <main className="min-h-screen bg-marble flex items-center justify-center p-4 text-gray-500">
        {loadError ?? "Загружаем меню…"}
      </main>
    );
  }

  const realCategories: Category[] = menu.categories.filter((c) => c.id !== "all" && c.id !== "chef");
  const query = search.trim().toLowerCase();
  const visibleItems = menu.items.filter(
    (it) =>
      (filterCategory === "all" || it.categoryId === filterCategory) &&
      (!query || it.title.toLowerCase().includes(query) || it.description.toLowerCase().includes(query))
  );
  const stopCount = menu.items.filter((it) => !it.isAvailable).length;

  return (
    <main className="min-h-screen bg-marble text-dark pb-24">
      {/* Шапка */}
      <header className="sticky top-0 z-40 bg-marble/90 backdrop-blur-md border-b border-gray-200/60 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex-grow min-w-0">
            <h1 className="font-bold text-lg leading-tight">Админка меню</h1>
            <p className="text-xs text-gray-500 truncate">
              <StatusText status={status} error={saveError} updatedAt={menu.updatedAt} />
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="h-9 px-3 rounded-lg border border-gray-300 text-sm flex items-center gap-1.5 bg-white"
          >
            <ExternalLink size={16} /> <span className="hidden sm:inline">Открыть меню</span>
          </a>
          <button
            onClick={logout}
            className="h-9 px-3 rounded-lg border border-gray-300 text-sm flex items-center gap-1.5 bg-white"
          >
            <LogOut size={16} /> <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
        {/* Фильтры */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по названию или составу"
              className="w-full h-11 rounded-lg border border-gray-300 bg-white pl-10 pr-3 text-base focus:outline-none focus:border-brandRed"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-11 rounded-lg border border-gray-300 bg-white px-3 text-base focus:outline-none focus:border-brandRed"
          >
            <option value="all">Все категории ({menu.items.length})</option>
            {realCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({menu.items.filter((it) => it.categoryId === c.id).length})
              </option>
            ))}
          </select>
          <button
            onClick={openNew}
            className="h-11 px-4 rounded-lg bg-brandRed text-white font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Plus size={18} /> Добавить
          </button>
        </div>

        {stopCount > 0 && (
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            В стоп-листе: {stopCount}. Гости видят такие позиции с кнопкой «Нет в наличии».
          </p>
        )}

        {/* Список позиций */}
        <div className="flex flex-col gap-2">
          {visibleItems.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              categoryTitle={categoryTitle(item.categoryId)}
              onChange={(patch) => updateItem(item.id, patch)}
              onEdit={() => setEditor({ item, isNew: false })}
            />
          ))}
          {visibleItems.length === 0 && (
            <p className="text-center text-gray-500 py-10">Ничего не найдено</p>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Список категорий меняется в коде (src/data/menu.ts). Всё остальное правится здесь и сохраняется автоматически.
        </p>
      </div>

      {editor && (
        <ItemEditor
          key={editor.item.id}
          item={editor.item}
          isNew={editor.isNew}
          categories={menu.categories}
          onSave={saveFromEditor}
          onDelete={deleteItem}
          onClose={() => setEditor(null)}
        />
      )}
    </main>
  );
};

// ---------- строка позиции ----------

interface RowProps {
  item: MenuItem;
  categoryTitle: string;
  onChange: (patch: Partial<MenuItem>) => void;
  onEdit: () => void;
}

const ItemRow = ({ item, categoryTitle, onChange, onEdit }: RowProps) => {
  const [priceText, setPriceText] = useState(String(item.price));
  const [knownPrice, setKnownPrice] = useState(item.price);

  // Если цену поменяли снаружи (например, в редакторе), подтягиваем в поле
  if (knownPrice !== item.price) {
    setKnownPrice(item.price);
    setPriceText(String(item.price));
  }

  const commitPrice = (text: string) => {
    const value = Number(text.replace(",", "."));
    if (Number.isFinite(value) && value >= 0 && Math.round(value) !== item.price) {
      onChange({ price: Math.round(value) });
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-3 flex flex-wrap items-center gap-3 ${
        item.isAvailable ? "" : "opacity-70"
      }`}
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-200 shrink-0">
        <Image src={item.imageUrl} alt="" fill sizes="56px" className="object-cover" />
      </div>

      <div className="flex-grow min-w-[140px]">
        <div className="font-semibold leading-tight flex items-center gap-1.5">
          {item.title}
          {item.isChefChoice && <Star size={14} className="text-amber-500 fill-amber-400" />}
        </div>
        <div className="text-xs text-gray-500">
          {categoryTitle}
          {item.weight ? ` · ${item.weight}` : ""}
          {!item.isAvailable ? " · стоп-лист" : ""}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <label className="flex items-center gap-1">
          <input
            value={priceText}
            onChange={(e) => {
              setPriceText(e.target.value);
              commitPrice(e.target.value);
            }}
            onBlur={() => setPriceText(String(item.price))}
            inputMode="numeric"
            aria-label="Цена"
            className="w-20 h-10 rounded-lg border border-gray-300 px-2 text-right font-semibold focus:outline-none focus:border-brandRed"
          />
          <span className="text-gray-500">₽</span>
        </label>

        <Toggle
          checked={item.isAvailable}
          onChange={(v) => onChange({ isAvailable: v })}
          label={item.isAvailable ? "Есть" : "Стоп"}
        />

        <button
          onClick={() => onChange({ isChefChoice: item.isChefChoice ? undefined : true })}
          aria-pressed={Boolean(item.isChefChoice)}
          aria-label="Выбор шефа"
          title="Выбор шефа"
          className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
            item.isChefChoice ? "border-amber-300 bg-amber-50 text-amber-500" : "border-gray-300 text-gray-400"
          }`}
        >
          <Star size={18} className={item.isChefChoice ? "fill-amber-400" : ""} />
        </button>

        <button
          onClick={onEdit}
          aria-label="Изменить"
          title="Изменить"
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 active:bg-gray-50"
        >
          <Pencil size={18} />
        </button>
      </div>
    </div>
  );
};

const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`h-10 px-1 pr-3 rounded-full border flex items-center gap-2 text-sm font-medium transition-colors ${
      checked ? "bg-green-50 border-green-300 text-green-700" : "bg-gray-100 border-gray-300 text-gray-600"
    }`}
  >
    <span
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
        checked ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <span className="w-3 h-3 rounded-full bg-white" />
    </span>
    <span className="whitespace-nowrap">{label}</span>
  </button>
);

const StatusText = ({ status, error, updatedAt }: { status: SaveStatus; error: string | null; updatedAt: string | null }) => {
  if (status === "saving") return <span>Сохраняем…</span>;
  if (status === "error") return <span className="text-red-600">Ошибка: {error}</span>;
  if (status === "saved") return <span className="text-green-700">Сохранено</span>;
  if (updatedAt) {
    return <span>Последнее изменение: {new Date(updatedAt).toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" })}</span>;
  }
  return <span>Стартовые данные из кода, ещё ничего не сохраняли</span>;
};
