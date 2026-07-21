// src/app/cart/page.tsx
"use client";

import { useCartStore } from "@/store/cart";
import { menuItems } from "@/data/menu";
import { ChevronLeft, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useWakeLock } from "@/hooks/useWakeLock";

export default function CartPage() {
  const { items, addItem, removeItem, clearCart } = useCartStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Активируем удержание экрана
  useWakeLock();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Если корзина пуста (например, зашли по прямой ссылке или очистили)
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-marble flex flex-col items-center justify-center p-4">
        <p className="text-xl text-dark mb-4">Корзина пуста</p>
        <button
          onClick={() => router.push("/")}
          className="bg-brandRed text-white px-6 py-3 rounded-xl font-medium active:scale-95 transition-transform"
        >
          Вернуться в меню
        </button>
      </div>
    );
  }

  // Склеиваем стейт корзины с данными из JSON
  const cartDetails = items.map((cartItem) => {
    const menuItem = menuItems.find((m) => m.id === cartItem.id);
    return { ...cartItem, menuItem };
  }).filter(item => item.menuItem);

  const totalPrice = cartDetails.reduce(
    (sum, item) => sum + (item.menuItem?.price || 0) * item.quantity,
    0
  );

  const handleClear = () => {
    clearCart();
    router.push("/"); // Возвращаем гостя на главную после показа заказа
  };

  return (
    <main className="min-h-screen bg-marble text-dark flex flex-col pb-32">
      {/* Шапка */}
      <header className="sticky top-0 z-50 bg-marble/90 backdrop-blur-md border-b border-gray-200/50 p-4 flex items-center">
        <button
          onClick={() => router.push("/")}
          className="p-2 -ml-2 active:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-xl font-bold flex-grow text-center pr-8">
          Ваш заказ
        </h1>
      </header>

      {/* Список блюд без фото, но крупно */}
      <div className="p-4 flex flex-col gap-4">
        {cartDetails.map(({ id, quantity, menuItem }) => (
          <div key={id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-bold text-xl leading-tight">
                {menuItem?.title}
              </h3>
              <span className="font-bold text-lg whitespace-nowrap text-brandRed">
                {menuItem!.price * quantity} ₽
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-500 text-sm">Цена: {menuItem?.price} ₽</span>
              
              <div className="flex items-center gap-4 bg-marble rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => removeItem(id)}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-md shadow-sm text-brandRed active:scale-95"
                >
                  <Minus size={20} />
                </button>
                <span className="w-6 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => addItem(id)}
                  className="w-10 h-10 flex items-center justify-center bg-brandRed rounded-md shadow-sm text-white active:scale-95"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Итоговая панель (Sticky Footer) */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-50 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100">
        <div className="flex justify-between items-end mb-4 px-2">
          <span className="text-lg text-gray-500 font-medium">Итого:</span>
          <span className="text-4xl font-black text-brandRed">{totalPrice} ₽</span>
        </div>
        <button
          onClick={handleClear}
          className="w-full bg-dark text-white rounded-xl p-4 font-bold text-lg active:scale-95 transition-transform"
        >
          Заказ показан (Очистить)
        </button>
      </div>
    </main>
  );
}