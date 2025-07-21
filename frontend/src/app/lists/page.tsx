'use client';

import { useState } from 'react';
import useShoppingList from '@/hooks/useShoppingList';
import useCreateProduct from '@/hooks/useCreateProduct';
import Modal from '@/components/Modal';
import Lists from '@/components/Lists';
import ListHeader from '@/components/Lists/ListHeader';

export default function ListsPage() {
  const { lists, loading, error, creating, createList } = useShoppingList();
  const [showProductModal, setShowProductModal] = useState(false);
  const {
    productName,
    productPrice,
    productLoading,
    productError,
    createProduct,
    setProductName,
    setProductPrice,
  } = useCreateProduct(setShowProductModal);

  return (
    <div className="min-h-screen bg-gray-50">
      <ListHeader
        createList={createList}
        creating={creating}
        setShowProductModal={setShowProductModal}
      />
      <Modal
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        productName={productName}
        setProductName={setProductName}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        productError={productError}
        createProduct={createProduct}
        productLoading={productLoading}
      />
      <main className="max-w-md mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-black">Cargando...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : lists.length === 0 ? (
          <div className="text-center text-black">
            No se encontraron listas.
          </div>
        ) : (
          <Lists lists={lists} />
        )}
      </main>
    </div>
  );
}
