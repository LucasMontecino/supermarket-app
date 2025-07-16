"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { Product, ShoppingList } from "@/types";
import { productsApi } from "@/lib/api/products";
import { shoppingListsApi } from "@/lib/api/shoppingLists";

export default function ShoppingListDetailPage() {
  const router = useRouter();
  const params = useParams();
  const listId = Number(params.id);

  const [products, setProducts] = useState<Product[]>([]);
  const [list, setList] = useState<ShoppingList | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
    loadList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Failed to load products");
    }finally{
        setLoading(false);
    }
  };

  const loadList = async () => {
    setLoading(true);
    setError(null);
    try {
      const lists = await shoppingListsApi.getAll();
      const found = lists.find((l) => l.id === listId);
      setList(found || null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to load shopping list");
    } finally {
      setLoading(false);
    }
  };

  // Set itemPrice to the selected product's last known price when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      const product = products.find((p) => p.id === selectedProduct);
      if (product && product.last_price != null) {
        setItemPrice(product.last_price.toString());
      } else {
        setItemPrice("");
      }
    } else {
      setItemPrice("");
    }
  }, [selectedProduct, products]);

  const addItemToList = async () => {
    if (!list || !selectedProduct) return;
    try {
      await shoppingListsApi.addItem(list.id, {
        product_id: selectedProduct,
        quantity: itemQuantity,
        price: itemPrice ? parseFloat(itemPrice) : undefined,
      });
      await loadList();
      setSelectedProduct(0);
      setItemQuantity(1);
      setItemPrice("");
      setShowAddItem(false);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Failed to add item to list");
    }
  };

  const removeItem = async (itemId: number) => {
    if (!list) return;
    try {
      await shoppingListsApi.removeItem(list.id, itemId);
      await loadList();
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Failed to remove item from list");
    }
  };

  const deleteList = async () => {
    if (!list) return;
    try {
      await shoppingListsApi.delete(list.id);
      router.push("/lists");
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Failed to delete list");
    }
  };

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || "Unknown Product";
  };

  // Calculate total price for current list
  const totalPrice = list?.items?.reduce((sum, item) => {
    if (item.price != null) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0) ?? 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/lists")}
            className="px-3 py-1 bg-gray-200 text-black text-sm rounded-md hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <h1 className="text-xl font-bold text-black flex items-center gap-2">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            Shopping List #{listId}
          </h1>
          <button
            onClick={deleteList}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
          >
            Delete List
          </button>
        </div>
      </header>
      <main className="max-w-md mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center text-black">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : list ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black">List Items</h2>
              <button
                onClick={() => setShowAddItem(true)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
              >
                Add Item
              </button>
            </div>
            {/* List Items */}
            <div className="bg-white rounded-lg shadow-sm border">
              {list.items && list.items.length > 0 ? (
                <>
                  <div className="divide-y">
                    {list.items.map((item) => (
                      <div key={item.id} className="p-4 flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-black">
                            {getProductName(item.product_id)}
                          </h3>
                          <p className="text-sm text-black">
                            Qty: {item.quantity}
                            {item.price && ` • $${item.price.toFixed(2)}`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Total Price */}
                  <div className="p-4 border-t flex justify-end">
                    <span className="font-semibold text-black">Total: ${totalPrice.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-black">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Your shopping list is empty</p>
                  <p className="text-sm">Add some items to get started!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-black">List not found.</div>
        )}

        {/* Add Item Modal */}
        {showAddItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-black">Add Item to List</h3>
                <button
                  onClick={() => setShowAddItem(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(Number(e.target.value))}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select a product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="off"
                    placeholder="1"
                    value={itemQuantity}
                    onChange={(e) => {
                      // Remove leading zeros and non-digit characters
                      const val = e.target.value.replace(/^0+/, '').replace(/\D/g, '');
                      setItemQuantity(val ? Number(val) : 1);
                    }}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Price (optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
                <button
                  onClick={addItemToList}
                  disabled={!selectedProduct}
                  className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Add to List
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 