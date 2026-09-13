"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";
import { MenuItem } from "../types";
import { useCartStore } from "@/store/cart";

interface Props {
  item: MenuItem;
  onClose: () => void;
}

/**
 * Подробный экран блюда: большое фото, полный состав, цена и кнопки.
 * На телефоне выезжает снизу, на планшете и десктопе - по центру.
 * Закрывается крестиком, тапом по фону, Escape и системной кнопкой «назад»
 * (открытие кладёт запись в history, чтобы «назад» закрывал экран, а не уводил с сайта).
 */
export const MenuItemModal = ({ item, onClose }: Props) => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const quantity = items.find((i) => i.id === item.id)?.quantity || 0;

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Закрываем через history.back(): popstate вызовет onClose. Если записи почему-то нет, закрываем напрямую
  const requestClose = useCallback(() => {
    if (window.history.state?.dish === item.id) window.history.back();
    else onCloseRef.current();
  }, [item.id]);

  useEffect(() => {
    // Защита от повторного pushState в dev-режиме (StrictMode запускает эффект дважды)
    if (window.history.state?.dish !== item.id) {
      window.history.pushState({ dish: item.id }, "");
    }
    const onPop = () => onCloseRef.current();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [item.id, requestClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/60 animate-[fadeIn_0.15s_ease-out]"
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className="w-full sm:max-w-lg max-h-[92vh] bg-white rounded-t-3xl sm:rounded-2xl overflow-y-auto shadow-2xl animate-[slideUp_0.25s_ease-out] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Большое фото */}
        <div className="relative w-full aspect-square sm:aspect-[4/3] bg-gray-200 shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            priority
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover"
          />
          <button
            onClick={requestClose}
            aria-label="Закрыть"
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md active:scale-95 transition-transform"
          >
            <X size={22} />
          </button>
        </div>

        {/* Описание */}
        <div className="p-5 pb-3">
          <h2 className="text-2xl font-bold leading-tight">{item.title}</h2>
          {item.weight && <p className="text-sm text-gray-400 mt-1">{item.weight}</p>}
          {item.description && (
            <p className="text-base text-gray-600 mt-3 leading-relaxed">{item.description}</p>
          )}
        </div>

        {/* Цена и кнопки, прижаты к низу листа */}
        <div className="sticky bottom-0 mt-auto bg-white border-t border-gray-100 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-4">
          <span className="text-2xl font-black">{item.price} ₽</span>

          {!item.isAvailable ? (
            <span className="text-gray-500 font-medium">Нет в наличии</span>
          ) : quantity > 0 ? (
            <div className="flex items-center gap-3 bg-marble rounded-xl p-1 border border-gray-200">
              <button
                onClick={() => removeItem(item.id)}
                aria-label="Убрать одну"
                className="w-11 h-11 flex items-center justify-center bg-white rounded-lg shadow-sm text-brandRed active:scale-95 transition-transform"
              >
                <Minus size={22} />
              </button>
              <span className="w-6 text-center font-bold text-xl">{quantity}</span>
              <button
                onClick={() => addItem(item.id)}
                aria-label="Добавить ещё одну"
                className="w-11 h-11 flex items-center justify-center bg-brandRed rounded-lg shadow-sm text-white active:scale-95 transition-transform"
              >
                <Plus size={22} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item.id)}
              className="bg-brandRed text-white px-6 h-12 rounded-xl font-semibold text-base active:scale-95 transition-transform"
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
