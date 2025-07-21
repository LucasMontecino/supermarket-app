import { shoppingListsApi } from '@/lib/api/shoppingLists';
import { ShoppingList } from '@/types';
import { useEffect, useState } from 'react';

export default function useShoppingList() {
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to load shopping lists');
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create new list');
      }
    } finally {
      setCreating(false);
    }
  };

  return { lists, loading, error, creating, createList };
}
