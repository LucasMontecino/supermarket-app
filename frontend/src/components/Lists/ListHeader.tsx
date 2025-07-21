import Link from 'next/link';

export default function ListHeader({
  createList,
  creating,
  setShowProductModal,
}: {
  createList: () => void;
  creating: boolean;
  setShowProductModal: (show: boolean) => void;
}) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-black hover:text-blue-600 transition-colors"
        >
          Listas de compras
        </Link>
        <div className="flex gap-2">
          <button
            onClick={createList}
            disabled={creating}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {creating ? 'Creando...' : '+ Lista'}
          </button>
          <button
            onClick={() => setShowProductModal(true)}
            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            + Producto
          </button>
        </div>
      </div>
    </header>
  );
}
