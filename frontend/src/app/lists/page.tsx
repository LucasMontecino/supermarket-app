"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingList } from "@/types";
import { shoppingListsApi } from "@/lib/api/shoppingLists";

export default function ListsPage() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

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
          <button
            onClick={createList}
            disabled={creating}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {creating ? "Creating..." : "New List"}
          </button>
        </div>
      </header>
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