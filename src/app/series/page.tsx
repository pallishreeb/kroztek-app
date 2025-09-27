"use client";

import Link from "next/link";
import { products } from "@/data/products";

// Map category codes to readable names
const categoryMap: Record<string, string> = {
  vsx: "VSX",
  m20: "M20 Shaft Power",
  vsm: "VSM",
  vsr: "VSR",
  vss: "VSS",
};

export default function ProductsSeriesPage() {
  // Get unique categories from products
  const uniqueCategories = Array.from(
    new Set(products.map((p) => p.category))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>/</li>
          <li className="font-medium">CG Emotron</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-8">CG Emotron Series</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {uniqueCategories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat);
          const categoryName = categoryMap[cat] || cat;
          const productImage = catProducts[0]?.image; // show first product image
          return (
            <Link
              key={cat}
              href={`/products?cat=${cat}`}
              className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={productImage}
                alt={categoryName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">{categoryName} - {catProducts[0]?.range} kW</h2>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
