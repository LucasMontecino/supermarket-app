"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { productsApi } from "@/lib/api/products";
import Link from "next/link";

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.getAll().then(setProducts).catch(() => {});
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/landing-bg.png"
          alt="Landing background"
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
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
            <button className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition-colors">
              Go to Shopping Lists
            </button>
          </Link>
          <div>
            <h2 className="text-xl font-semibold text-black mb-4">Available Products</h2>
            {products.length > 0 ? (
              <ul className="divide-y">
                {products.map((product) => (
                  <li key={product.id} className="py-2 text-black flex justify-between">
                    <span>{product.name}</span>
                    {product.last_price && (
                      <span className="text-sm text-gray-600">${product.last_price.toFixed(2)}</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-black">No products available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 