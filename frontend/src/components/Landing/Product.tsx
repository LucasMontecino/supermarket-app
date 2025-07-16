import { Product as IProduct } from "@/types";

export default function Product({ product }: { product: IProduct }) {
    return (
        <li key={product.id} className="py-2 text-black flex justify-between">
            <span>{product.name}</span>
            {product.last_price && (
                <span className="text-sm text-gray-600">${product.last_price.toFixed(2)}</span>
            )}
        </li>
    )
}