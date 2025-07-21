import { productsApi } from '@/lib/api/products';
import { useState } from 'react';

export default function useCreateProduct(
  setShowProductModal: (show: boolean) => void
) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productSuccess, setProductSuccess] = useState<string | null>(null);

  const createProduct = async () => {
    setProductLoading(true);
    setProductError(null);
    setProductSuccess(null);
    try {
      await productsApi.create({
        name: productName,
        last_price: productPrice ? parseFloat(productPrice) : undefined,
      });
      setProductSuccess('Product created!');
      setProductName('');
      setProductPrice('');
      setShowProductModal(false);
    } catch (err: unknown) {
      if (err instanceof Error) setProductError(err.message);
      else setProductError('Failed to create product');
    } finally {
      setProductLoading(false);
    }
  };

  return {
    productName,
    productPrice,
    productLoading,
    productError,
    createProduct,
    setProductError,
    setProductName,
    setProductPrice,
  };
}
