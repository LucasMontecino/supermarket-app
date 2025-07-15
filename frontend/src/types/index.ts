export interface Product {
  id: number;
  name: string;
  last_price: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: number;
  createdAt: string;
  updatedAt: string;
  items?: ShoppingListItem[];
}

export interface ShoppingListItem {
  id: number;
  shopping_list_id: number;
  product_id: number;
  quantity: number;
  price: number | null;
  createdAt: string;
  updatedAt: string;
  Product?: Product;
}

export interface CreateProductRequest {
  name: string;
  last_price?: number;
}

export interface UpdateProductRequest {
  name?: string;
  last_price?: number;
}

export interface AddItemRequest {
  product_id: number;
  quantity: number;
  price?: number;
}

export interface UpdateItemRequest {
  quantity?: number;
  price?: number;
} 