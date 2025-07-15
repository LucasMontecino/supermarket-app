'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Trash2, Edit, X } from 'lucide-react';
import { Product, ShoppingList, ShoppingListItem } from '@/types';
import { productsApi } from '@/lib/api/products';
import { shoppingListsApi } from '@/lib/api/shoppingLists';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentList, setCurrentList] = useState<ShoppingList | null>(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemPrice, setItemPrice] = useState('');

  useEffect(() => {
    loadProducts();
    loadCurrentList();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const loadCurrentList = async () => {
    try {
      const lists = await shoppingListsApi.getAll();
      if (lists.length > 0) {
        setCurrentList(lists[0]); // Get the most recent list
      }
    } catch (error) {
      console.error('Failed to load shopping list:', error);
    }
  };

  const createNewList = async () => {
    try {
      const newList = await shoppingListsApi.create();
      setCurrentList(newList);
    } catch (error) {
      console.error('Failed to create new list:', error);
    }
  };

  const addProduct = async () => {
    if (!newProductName.trim()) return;
    
    try {
      const product = await productsApi.create({
        name: newProductName,
        last_price: newProductPrice ? parseFloat(newProductPrice) : undefined,
      });
      setProducts([...products, product]);
      setNewProductName('');
      setNewProductPrice('');
      setShowAddProduct(false);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const addItemToList = async () => {
    if (!currentList || !selectedProduct) return;
    
    try {
      await shoppingListsApi.addItem(currentList.id, {
        product_id: selectedProduct,
        quantity: itemQuantity,
        price: itemPrice ? parseFloat(itemPrice) : undefined,
      });
      await loadCurrentList();
      setSelectedProduct(0);
      setItemQuantity(1);
      setItemPrice('');
      setShowAddItem(false);
    } catch (error) {
      console.error('Failed to add item to list:', error);
    }
  };

  const removeItem = async (itemId: number) => {
    if (!currentList) return;
    
    try {
      await shoppingListsApi.removeItem(currentList.id, itemId);
      await loadCurrentList();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const deleteList = async () => {
    if (!currentList) return;
    
    try {
      await shoppingListsApi.delete(currentList.id);
      setCurrentList(null);
    } catch (error) {
      console.error('Failed to delete list:', error);
    }
  };

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product?.name || 'Unknown Product';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
              Shopping List
            </h1>
            <button
              onClick={() => setShowAddProduct(true)}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {/* Current List */}
        {currentList ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Current List</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddItem(true)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Item
                </button>
                <button
                  onClick={deleteList}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                >
                  Clear List
                </button>
              </div>
            </div>

            {/* List Items */}
            <div className="bg-white rounded-lg shadow-sm border">
              {currentList.items && currentList.items.length > 0 ? (
                <div className="divide-y">
                  {currentList.items.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {getProductName(item.product_id)}
                        </h3>
                        <p className="text-sm text-gray-500">
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
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Your shopping list is empty</p>
                  <p className="text-sm">Add some items to get started!</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Shopping List</h2>
            <p className="text-gray-500 mb-6">Create a new shopping list to get started</p>
            <button
              onClick={createNewList}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New List
            </button>
          </div>
        )}

        {/* Products Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Products</h2>
          <div className="bg-white rounded-lg shadow-sm border">
            {products.length > 0 ? (
              <div className="divide-y">
                {products.map((product) => (
                  <div key={product.id} className="p-4">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    {product.last_price && (
                      <p className="text-sm text-gray-500">
                        Last price: ${product.last_price.toFixed(2)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No products available</p>
                <p className="text-sm">Add some products to get started!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button
                onClick={() => setShowAddProduct(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Price (optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <button
                onClick={addProduct}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Item to List</h3>
              <button
                onClick={() => setShowAddItem(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product
                </label>
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={itemQuantity}
                  onChange={(e) => setItemQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    </div>
  );
} 