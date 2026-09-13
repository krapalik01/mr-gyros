"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ImagePlus, Trash2, Star } from "lucide-react";
import { Category, MenuItem } from "@/types";
import { resizeImage } from "./resizeImage";

interface Props {
  item: MenuItem;
  isNew: boolean;
  categories: Category[];
  onSave: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

const inputClass =
  "h-11 rounded-lg border border-gray-300 px-3 text-base focus:outline-none focus:border-brandRed bg-white";

export const ItemEditor = ({ item, isNew, categories, onSave, onDelete, onClose }: Props) => {
  const [draft, setDraft] = useState<MenuItem>(item);
  const [priceText, setPriceText] = useState(String(item.price));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const blob = await resizeImage(file);
      const form = new FormData();
      form.append("file", blob, "photo.jpg");
      form.append("itemId", draft.id);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Не удалось загрузить фото");
      set("imageUrl", data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить фото");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = draft.title.trim();
    const price = Number(priceText.replace(",", "."));
    if (!title) return setError("Введите название");
    if (!Number.isFinite(price) || price < 0) return setError("Введите цену числом");
    if (!draft.categoryId) return setError("Выберите категорию");
    const weight = (draft.weight ?? "").trim();
    onSave({
      ...draft,
      title,
      description: draft.description.trim(),
      price: Math.round(price),
      ...(weight ? { weight } : { weight: undefined }),
    });
  };

  const realCategories = categories.filter((c) => c.id !== "all" && c.id !== "chef");

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[94vh] overflow-y-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-[slideUp_0.2s_ease-out] flex flex-col"
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between z-10">
          <h2 className="font-bold text-lg">{isNew ? "Новая позиция" : "Редактирование"}</h2>
          <button type="button" onClick={onClose} aria-label="Закрыть" className="p-2 -mr-2 rounded-full active:bg-gray-100">
            <X size={22} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Фото */}
          <div className="flex gap-4 items-start">
            <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-200 shrink-0">
              <Image src={draft.imageUrl} alt="" fill sizes="112px" className="object-cover" />
              {uploading && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs font-medium">
                  Загрузка…
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="h-10 px-4 rounded-lg border border-gray-300 text-sm font-medium flex items-center gap-2 active:bg-gray-50 disabled:opacity-50"
              >
                <ImagePlus size={18} />
                {draft.imageUrl.includes("placeholder") ? "Загрузить фото" : "Заменить фото"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <p className="text-xs text-gray-500">
                Фото уменьшится до 1200px автоматически. Лучше всего горизонтальные снимки 4:3.
              </p>
            </div>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Название</span>
            <input value={draft.title} onChange={(e) => set("title", e.target.value)} className={inputClass} autoFocus={isNew} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Состав / описание</span>
            <textarea
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-brandRed"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Цена, ₽</span>
              <input
                value={priceText}
                onChange={(e) => setPriceText(e.target.value)}
                inputMode="numeric"
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Объём / вес</span>
              <input
                value={draft.weight ?? ""}
                onChange={(e) => set("weight", e.target.value)}
                placeholder="300 мл, 150 гр, 7 шт"
                className={inputClass}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">Категория</span>
            <select
              value={draft.categoryId}
              onChange={(e) => set("categoryId", e.target.value)}
              className={inputClass}
            >
              {realCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                checked={draft.isAvailable}
                onChange={(e) => set("isAvailable", e.target.checked)}
                className="w-5 h-5 accent-brandRed"
              />
              <span>В наличии (снимите галочку, чтобы поставить в стоп-лист)</span>
            </label>
            <label className="flex items-center gap-3 py-1">
              <input
                type="checkbox"
                checked={Boolean(draft.isChefChoice)}
                onChange={(e) => set("isChefChoice", e.target.checked || undefined)}
                className="w-5 h-5 accent-brandRed"
              />
              <span className="flex items-center gap-1">
                <Star size={16} className="text-amber-500" /> Показывать во вкладке «Выбор шефа»
              </span>
            </label>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex items-center gap-3">
          {!isNew && (
            <button
              type="button"
              onClick={() => (confirmDelete ? onDelete(draft.id) : setConfirmDelete(true))}
              className={`h-11 px-4 rounded-lg text-sm font-medium flex items-center gap-2 ${
                confirmDelete ? "bg-red-600 text-white" : "text-red-600 border border-red-200"
              }`}
            >
              <Trash2 size={18} />
              {confirmDelete ? "Точно удалить?" : "Удалить"}
            </button>
          )}
          <button
            type="submit"
            disabled={uploading}
            className="h-11 flex-grow rounded-lg bg-brandRed text-white font-semibold active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isNew ? "Добавить" : "Сохранить"}
          </button>
        </div>
      </form>
    </div>
  );
};
