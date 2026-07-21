"use client";

import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { CategoryTabs } from "@/components/CategoryTabs";
import { MenuItemCard } from "@/components/MenuItemCard";
import { categories, menuItems } from "@/data/menu";
import { FloatingCart } from "@/components/FloatingCart";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  
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

  const filteredItems = menuItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.categoryId === activeCategory;
  });

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
          onSelect={setActiveCategory} 
        />
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
        
        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            В этой категории пока ничего нет.
          </div>
        )}
      </div>

      <FloatingCart />
    </main>
  );
}