export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  price: number;
  /** Объём/вес, показывается только если задан ("300 мл", "150 гр", "7 шт") */
  weight?: string;
  imageUrl: string;
  isAvailable: boolean;
  /** Показывать во вкладке «Выбор шефа» */
  isChefChoice?: boolean;
}

/** Всё меню целиком: то, что хранится в menu.json и редактируется в админке */
export interface MenuData {
  categories: Category[];
  items: MenuItem[];
  /** ISO-дата последнего сохранения из админки, null для стартовых данных из кода */
  updatedAt: string | null;
}

/** Позиция корзины, как её присылает гость при отправке заказа */
export interface OrderLine {
  id: string;
  quantity: number;
}
