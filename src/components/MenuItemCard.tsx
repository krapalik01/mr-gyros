"use client";

import Image from "next/image";
import { MenuItem } from "../types";
import { useCartStore } from "@/store/cart";
import { Plus, Minus } from "lucide-react";

interface Props {
  item: MenuItem;
}

export const MenuItemCard = ({ item }: Props) => {
  // Вытаскиваем массив всех товаров и экшены из Zustand
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  // Ищем конкретно этот товар в корзине, чтобы узнать его количество
  const cartItem = items.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col border border-gray-100">
      {/* Блок с картинкой */}
      <div className="h-48 bg-gray-200 relative w-full">
        <Image 
          src={item.imageUrl} 
          alt={item.title} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      
      {/* Текстовая часть */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{item.weight}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {item.description}
        </p>
        
        {/* Нижний блок с ценой и кнопками */}
        {/* Фиксируем высоту h-10, чтобы верстка не прыгала при смене кнопок */}
        <div className="flex items-center justify-between mt-auto h-10">
          <span className="font-bold text-xl">{item.price} ₽</span>
          
          {/* Логика рендера кнопок */}
          {!item.isAvailable ? (
            <button 
              disabled 
              className="bg-gray-200 text-gray-500 px-5 py-2 rounded-lg font-medium opacity-50 cursor-not-allowed"
            >
              Нет в наличии
            </button>
          ) : quantity > 0 ? (
            // Контрол количества (появляется с мягким fade-in)
            <div className="flex items-center gap-3 bg-marble rounded-lg p-1 border border-gray-200 animate-[fadeIn_0.2s_ease-in-out]">
              <button
                onClick={() => removeItem(item.id)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-brandRed active:scale-95 transition-transform"
              >
                <Minus size={18} />
              </button>
              <span className="w-5 text-center font-bold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => addItem(item.id)}
                className="w-8 h-8 flex items-center justify-center bg-brandRed rounded-md shadow-sm text-white active:scale-95 transition-transform"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            // Дефолтная кнопка (также с анимацией при возвращении)
            <button 
              onClick={() => addItem(item.id)}
              className="bg-brandRed text-white px-5 py-2 rounded-lg font-medium active:scale-95 transition-transform animate-[fadeIn_0.2s_ease-in-out]"
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};