// src/store/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  /** Убирает из корзины позиции, которых нет в переданном списке id (меню обновилось) */
  pruneMissing: (validIds: string[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (id) => set((state) => {
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem) {
          // Если товар уже есть, увеличиваем количество
          return {
            items: state.items.map(item =>
              item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        // Если товара нет, добавляем новый
        return { items: [...state.items, { id, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => {
        const existingItem = state.items.find(item => item.id === id);
        if (existingItem?.quantity === 1) {
          // Если осталась 1 штука, удаляем совсем
          return { items: state.items.filter(item => item.id !== id) };
        }
        // Иначе просто уменьшаем количество
        return {
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        };
      }),

      pruneMissing: (validIds) => set((state) => {
        const valid = new Set(validIds);
        const items = state.items.filter(item => valid.has(item.id));
        // Возвращаем тот же массив, если ничего не выкинули, чтобы не дёргать подписчиков зря
        return items.length === state.items.length ? state : { items };
      }),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'mr-gyros-cart', // Ключ в localStorage
    }
  )
);
