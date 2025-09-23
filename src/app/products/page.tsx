"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");

  // Map category codes to readable names
  const categoryMap: Record<string, string> = {
    vsx: "VSX",
    m20: "M20 Shaft Power",
    vsm: "VSM",
    vsr: "VSR",
    vss: "VSS",
  };

  let filteredProducts = products;
  let categoryName = "All Products";

  if (category && categoryMap[category]) {
    filteredProducts = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    categoryName = categoryMap[category];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:underline">
              CG Emotron
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium">{categoryName}</li>
        </ol>
      </nav>

      {/* Category Title */}
      <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found in this category.</p>
      )}
    </div>
  );
}
