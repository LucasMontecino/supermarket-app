"use client";

import { productsApi } from "@/lib/api/products";
import { Product } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import AvailableProducts from "./AvailableProducts";

export default function Landing() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        productsApi.getAll().then(setProducts).catch((error: unknown) => {
            if (error instanceof Error) {
                console.error("Error fetching products:", error.message);
            }
        });
    }, []);

    return (
        <>
            {/* Text content with background for readability */}
            <div className="relative z-10 max-w-md w-full px-4 py-12 flex flex-col items-center">
                <div className="bg-white/60 backdrop-blur-xs rounded-lg shadow-md p-6 w-full mb-8 flex flex-col">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-lg">
                        Welcome to Supermarket App!
                    </h1>
                    <p className="text-lg text-gray-800 mb-8 drop-shadow">
                        Organize your groceries, track prices, and manage your shopping lists with ease.
                    </p>
                    {/* Call to Action Button */}
                    <Link href="/lists" className="self-center">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-colors cursor-pointer">
                            Go to Shopping Lists
                        </button>
                    </Link>
                    <AvailableProducts products={products} />
                </div>
            </div>
        </>
    )
}