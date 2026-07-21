"use client";

import { useCartStore } from "@/store/cart";
import { menuItems } from "@/data/menu";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const FloatingCart = () => {
  const items = useCartStore((state) => state.items);
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Оставляем проверку только для гидратации Next.js
  if (!mounted) return null;

  // Флаг видимости корзины
  const isVisible = items.length > 0;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, cartItem) => {
    const menuItem = menuItems.find(m => m.id === cartItem.id);
    return sum + (menuItem?.price || 0) * cartItem.quantity;
  }, 0);

  return (
    <div 
  className={`fixed bottom-0 left-0 w-full p-4 z-50 bg-gradient-to-t from-marble via-marble to-transparent pb-6 pt-10 transition-all duration-300 ease-out ${
    isVisible 
      ? "translate-y-0 opacity-100" 
      : "translate-y-full opacity-0 pointer-events-none"
  }`}
>
      <button
        onClick={() => router.push('/cart')}
        className="w-full bg-brandRed text-white rounded-xl p-4 flex items-center justify-between shadow-lg shadow-brandRed/30 active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-brandRed text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </div>
          <span className="font-medium text-lg">Показать заказ</span>
        </div>
        <span className="font-bold text-lg">{totalPrice} ₽</span>
      </button>
    </div>
  );
};