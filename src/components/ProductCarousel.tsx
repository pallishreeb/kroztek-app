"use client";
import Link from "next/link";
import { Eye } from "lucide-react";
import { products } from "@/data/products";

// Map category codes to readable names
const categoryMap: Record<string, string> = {
  vsx: "VSX",
  m20: "M20 Shaft Power",
  vsm: "VSM",
  vsr: "VSR",
  vss: "VSS",
};

export default function SeriesGrid() {
  const categoryOrder = ["vsx", "vss", "vsm", "vsr","m20" ];

const uniqueSeries = categoryOrder.filter((cat) =>
  products.some((p) => p.category === cat)
);


  return (
    <div className="px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">CG Emotron Series</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {uniqueSeries.map((cat) => {
          const seriesProducts = products.filter((p) => p.category === cat);
          const firstProduct = seriesProducts[0];
          const categoryName = categoryMap[cat] || cat;

          return (
            <Link
              key={cat}
              href={`/products?cat=${cat}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white group"
            >
              {/* Image wrapper */}
              <div className="relative w-full h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={firstProduct.image}
                  alt={categoryName}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />

                {/* Eye icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
                  <Eye className="text-white w-8 h-8" />
                </div>
              </div>

              {/* Text section */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{categoryName}</h3>
                {firstProduct?.range && (
                  <p className="text-sm text-gray-700">{firstProduct.range}</p>
                )}
                {firstProduct?.rangeA && (
                  <p className="text-sm text-gray-700">{firstProduct.rangeA}</p>
                )}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {firstProduct.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
