import { productsApi } from '@/lib/api/products';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi
      .getAll()
      .then(setProducts)
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.error('Error fetching products:', error.message);
        }
      });
  }, []);

  return { products };
}
