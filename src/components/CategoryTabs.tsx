"use client";

import { useEffect, useRef } from "react";
import { Category } from "../types";

interface Props {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export const CategoryTabs = ({ categories, activeCategory, onSelect }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Подкручиваем ленту вкладок так, чтобы активная оказалась по центру
  // (иначе при выборе, например, «Лимонады» активная вкладка остаётся за краем экрана)
  useEffect(() => {
    const scroller = scrollerRef.current;
    const button = buttonRefs.current.get(activeCategory);
    if (!scroller || !button) return;

    const target = button.offsetLeft - (scroller.clientWidth - button.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeCategory]);

  return (
    <div className="bg-marble/90 backdrop-blur-md pt-2 pb-3 px-4 shadow-sm border-b border-gray-100">
      <div
        ref={scrollerRef}
        className="relative flex gap-3 overflow-x-auto scrollbar-hide pb-1"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(cat.id, el);
              else buttonRefs.current.delete(cat.id);
            }}
            onClick={() => onSelect(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-brandRed text-white"
                : "bg-white text-dark shadow-sm"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
};
