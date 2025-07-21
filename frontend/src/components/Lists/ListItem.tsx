import { ShoppingList } from '@/types';
import { formatDate } from '@/utils';
import Link from 'next/link';

export default function ListItem({ list }: { list: ShoppingList }) {
  return (
    <li className="bg-white rounded-lg shadow-sm border p-4 flex items-center justify-between">
      <div>
        <div className="font-semibold text-black">Lista #{list.id}</div>
        <div className="text-xs text-gray-500">
          Creado el: {formatDate(list.createdAt)}
        </div>
      </div>
      <Link
        href={`/lists/${list.id}`}
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
      >
        Ver
      </Link>
    </li>
  );
}
