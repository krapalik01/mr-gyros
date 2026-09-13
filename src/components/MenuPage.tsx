"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuItemCard } from "@/components/MenuItemCard";
import { MenuItemModal } from "@/components/MenuItemModal";
import { FloatingCart } from "@/components/FloatingCart";
import { useCartStore } from "@/store/cart";
import { Category, MenuData, MenuItem } from "@/types";

export const TABLE_STORAGE_KEY = "mr-gyros-table";

interface Props {
  menu: MenuData;
}

export const MenuPage = ({ menu }: Props) => {
  const { categories, items: menuItems } = menu;
  const [activeCategory, setActiveCategory] = useState("all");
  const [openedItem, setOpenedItem] = useState<MenuItem | null>(null);
  const pruneMissing = useCartStore((state) => state.pruneMissing);

  // Стейт для видимости объединенной шапки
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Прячем шапку, только если скроллим вниз и проскроллили больше 80px
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHeaderVisible(false);
      }
      // Показываем шапку, если скроллим вверх
      else if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    // Вешаем слушатель с passive: true для плавной работы на мобилках
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Номер стола из QR-кода: ссылка вида https://сайт/?table=5 запоминается на устройстве гостя
  useEffect(() => {
    try {
      const table = new URLSearchParams(window.location.search).get("table")?.trim();
      if (table) localStorage.setItem(TABLE_STORAGE_KEY, table.slice(0, 8));
    } catch {
      // приватный режим без localStorage: просто не запоминаем
    }
  }, []);

  // Меню могло обновиться в админке: выкидываем из корзины позиции, которых больше нет
  useEffect(() => {
    pruneMissing(menuItems.map((item) => item.id));
  }, [menuItems, pruneMissing]);

  // При смене вкладки возвращаемся в начало списка,
  // иначе после длинного «Все» можно попасть в пустоту под коротким разделом
  const handleSelectCategory = (id: string) => {
    setActiveCategory(id);
    window.scrollTo({ top: 0 });
  };

  // Позиции категории. «Выбор шефа» - виртуальная категория: собирается по флагу, без дублей
  const itemsOfCategory = (category: Category): MenuItem[] =>
    menuItems.filter((item) =>
      category.id === "chef"
        ? item.isChefChoice === true
        : item.categoryId === category.id
    );

  // В режиме «Все» показываем все разделы подряд с заголовками,
  // в остальных - один выбранный раздел
  const visibleCategories =
    activeCategory === "all"
      ? categories.filter((c) => c.id !== "all" && c.id !== "chef")
      : categories.filter((c) => c.id === activeCategory);

  const sections = visibleCategories
    .map((category) => ({ category, items: itemsOfCategory(category) }))
    .filter((section) => section.items.length > 0);

  return (
    <main className="min-h-screen bg-marble text-dark pb-24">

      {/* Единая "умная" шапка */}
      <div
        className={`sticky top-0 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Header />
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleSelectCategory}
        />
      </div>

      <div className="p-4 flex flex-col gap-6 mx-auto">
        {sections.map(({ category, items }) => (
          <section key={category.id}>
            <h2 className="text-xl font-bold mb-3 px-1">{category.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onOpen={setOpenedItem} />
              ))}
            </div>
          </section>
        ))}

        {sections.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            В этой категории пока ничего нет.
          </div>
        )}
      </div>

      <FloatingCart menuItems={menuItems} />

      {openedItem && (
        <MenuItemModal item={openedItem} onClose={() => setOpenedItem(null)} />
      )}
    </main>
  );
};
