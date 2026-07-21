import { Category } from "../types";

interface Props {
  categories: Category[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export const CategoryTabs = ({ categories, activeCategory, onSelect }: Props) => {
  return (
    <div className="bg-marble/90 backdrop-blur-md pt-2 pb-3 px-4 shadow-sm border-b border-gray-100">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
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