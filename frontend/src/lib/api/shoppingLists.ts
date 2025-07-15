import api from '../api';
import { ShoppingList, AddItemRequest, UpdateItemRequest, ShoppingListItem } from '@/types';

export const shoppingListsApi = {
  getAll: async (): Promise<ShoppingList[]> => {
    const response = await api.get('/shopping-lists');
    return response.data;
  },

  create: async (): Promise<ShoppingList> => {
    const response = await api.post('/shopping-lists');
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/shopping-lists/${id}`);
  },

  addItem: async (listId: number, data: AddItemRequest): Promise<ShoppingListItem> => {
    const response = await api.post(`/shopping-lists/${listId}/items`, data);
    return response.data;
  },

  updateItem: async (listId: number, itemId: number, data: UpdateItemRequest): Promise<ShoppingListItem> => {
    const response = await api.put(`/shopping-lists/${listId}/items/${itemId}`, data);
    return response.data;
  },

  removeItem: async (listId: number, itemId: number): Promise<void> => {
    await api.delete(`/shopping-lists/${listId}/items/${itemId}`);
  },
}; 