import { ShoppingList } from '@/types';
import ListItem from './ListItem';

export default function Lists({ lists }: { lists: ShoppingList[] }) {
  return (
    <ul className="space-y-4">
      {lists.map((list) => (
        <ListItem key={list.id} list={list} />
      ))}
    </ul>
  );
}
