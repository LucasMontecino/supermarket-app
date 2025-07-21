export default function Modal({
  showProductModal,
  setShowProductModal,
  productName,
  setProductName,
  productPrice,
  setProductPrice,
  productError,
  createProduct,
  productLoading,
}: {
  showProductModal: boolean;
  setShowProductModal: (show: boolean) => void;
  productName: string;
  setProductName: (name: string) => void;
  productPrice: string;
  setProductPrice: (price: string) => void;
  productError: string | null;
  createProduct: () => void;
  productLoading: boolean;
}) {
  return (
    showProductModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">
              Crear nuevo producto
            </h3>
            <button
              onClick={() => setShowProductModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del producto"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Último precio (opcional)
              </label>
              <input
                type="number"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            {productError && (
              <div className="text-red-600 text-sm">{productError}</div>
            )}
            <button
              onClick={createProduct}
              disabled={!productName || productLoading}
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {productLoading ? 'Creando...' : 'Crear producto'}
            </button>
          </div>
        </div>
      </div>
    )
  );
}
