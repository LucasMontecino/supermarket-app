import api from '../api';
import { Product, CreateProductRequest, UpdateProductRequest } from '@/types';

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: number, data: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
}; 