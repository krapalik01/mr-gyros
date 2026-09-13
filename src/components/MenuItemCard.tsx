"use client";

import Image from "next/image";
import { MenuItem } from "../types";
import { useCartStore } from "@/store/cart";
import { Plus, Minus } from "lucide-react";

interface Props {
  item: MenuItem;
  /** Тап по карточке (не по кнопкам) открывает подробный экран блюда */
  onOpen?: (item: MenuItem) => void;
}

export const MenuItemCard = ({ item, onOpen }: Props) => {
  // Вытаскиваем массив всех товаров и экшены из Zustand
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  // Ищем конкретно этот товар в корзине, чтобы узнать его количество
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const open = () => onOpen?.(item);

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-100 cursor-pointer active:scale-[0.99] transition-transform"
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      aria-label={`${item.title}, ${item.price} ₽, подробнее`}
    >
      {/* Фото сверху. Сетка на телефоне в 2 колонки, поэтому пропорция 4:3, а не высокий блок */}
      <div className="relative w-full aspect-[4/3] bg-gray-200">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Текстовая часть */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-bold text-sm leading-tight">
          {item.title}
          {item.weight && (
            <span className="ml-1.5 text-xs font-normal text-gray-400 whitespace-nowrap">
              {item.weight}
            </span>
          )}
        </h3>
        {item.description && (
          <p className="text-xs text-gray-500 mt-1 leading-snug">{item.description}</p>
        )}

        {/* Низ карточки: цена и кнопка на всю ширину. mt-auto прижимает блок к низу,
            чтобы в одном ряду сетки кнопки стояли на одном уровне.
            stopPropagation, чтобы тап по кнопкам не открывал подробный экран */}
        <div className="mt-auto pt-3" onClick={(e) => e.stopPropagation()}>
          <div className="font-bold text-base mb-2">{item.price} ₽</div>

          {/* Логика рендера кнопок */}
          {!item.isAvailable ? (
            <button
              disabled
              className="w-full h-9 bg-gray-200 text-gray-500 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed"
            >
              Нет в наличии
            </button>
          ) : quantity > 0 ? (
            // Контрол количества (появляется с мягким fade-in)
            <div className="w-full h-9 flex items-center justify-between bg-marble rounded-lg p-0.5 border border-gray-200 animate-[fadeIn_0.2s_ease-in-out]">
              <button
                onClick={() => removeItem(item.id)}
                aria-label="Убрать одну"
                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-brandRed active:scale-95 transition-transform"
              >
                <Minus size={18} />
              </button>
              <span className="font-bold text-base">{quantity}</span>
              <button
                onClick={() => addItem(item.id)}
                aria-label="Добавить ещё одну"
                className="w-8 h-8 flex items-center justify-center bg-brandRed rounded-md shadow-sm text-white active:scale-95 transition-transform"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            // Дефолтная кнопка (также с анимацией при возвращении)
            <button
              onClick={() => addItem(item.id)}
              className="w-full h-9 bg-brandRed text-white rounded-lg text-sm font-medium active:scale-95 transition-transform animate-[fadeIn_0.2s_ease-in-out]"
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
