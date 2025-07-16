import { Product as IProduct } from "@/types";
import Product from "./Product";

export default function AvailableProducts({ products }: { products: IProduct[] }) {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-black mb-4">Available Products</h2>
            {products.length > 0 ? (
                <ul className="divide-y">
                    {products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))}
                </ul>
            ) : (
                <div className="text-black">No products available.</div>
            )}
        </div>
    )
}