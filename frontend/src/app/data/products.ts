export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  price: number;
  category: "Food" | "Clothing" | "Decor";
  image: string;
  origin: string;
  weight: number;
  stock: number;
  lowStockThreshold: number;
  inStock: boolean;
}

export const categories = [
  { id: "all", name: "All Products" },
  { id: "Food", name: "Food" },
  { id: "Decor", name: "Decor" },
  { id: "Clothing", name: "Clothing" },
];
