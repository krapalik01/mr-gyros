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
  weight: string;
  imageUrl: string;
  isAvailable: boolean;
}