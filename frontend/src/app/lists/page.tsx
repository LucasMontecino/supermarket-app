"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingList } from "@/types";
import { shoppingListsApi } from "@/lib/api/shoppingLists";
import { productsApi } from "@/lib/api/products";

export default function ListsPage() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [productSuccess, setProductSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await shoppingListsApi.getAll();
      setLists(data);
    } catch (err: unknown) {
      if(err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load shopping lists");
      }
    } finally {
      setLoading(false);
    }
  };

  const createList = async () => {
    setCreating(true);
    try {
      await shoppingListsApi.create();
      await fetchLists();
    } catch (err: unknown) {
      if(err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create new list");
      }
    } finally {
      setCreating(false);
    }
  };

  const createProduct = async () => {
    setProductLoading(true);
    setProductError(null);
    setProductSuccess(null);
    try {
      await productsApi.create({
        name: productName,
        last_price: productPrice ? parseFloat(productPrice) : undefined,
      });
      setProductSuccess("Product created!");
      setProductName("");
      setProductPrice("");
      setShowProductModal(false);
    } catch (err: unknown) {
      if (err instanceof Error) setProductError(err.message);
      else setProductError("Failed to create product");
    } finally {
      setProductLoading(false);
    }
  };

  // Add date formatting helper
  function formatDate(dateString: string) {
    const d = new Date(dateString);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString();
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-black hover:text-blue-600 transition-colors">Shopping Lists</Link>
          <div className="flex gap-2">
            <button
              onClick={createList}
              disabled={creating}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {creating ? "Creating..." : "New List"}
            </button>
            <button
              onClick={() => setShowProductModal(true)}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              New Product
            </button>
          </div>
        </div>
      </header>
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Create New Product</h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Last Price (optional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              {productError && <div className="text-red-600 text-sm">{productError}</div>}
              <button
                onClick={createProduct}
                disabled={!productName || productLoading}
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {productLoading ? "Creating..." : "Create Product"}
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="max-w-md mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-black">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : lists.length === 0 ? (
          <div className="text-center text-black">No shopping lists found.</div>
        ) : (
          <ul className="space-y-4">
            {lists.map((list) => (
              <li key={list.id} className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-black">List #{list.id}</div>
                  <div className="text-xs text-gray-500">Created: {formatDate(list.createdAt)}</div>
                </div>
                <Link
                  href={`/lists/${list.id}`}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                >
                  View
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
} 