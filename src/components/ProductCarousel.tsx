"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Map category codes to readable names
const categoryMap: Record<string, string> = {
  vsx: "VSX",
  m20: "M20 Shaft Power",
  vsm: "VSM",
  vsr: "VSR",
  vss: "VSS",
};

export default function SeriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const scrollAmount = scrollRef.current.clientWidth / 4;
        if (scrollRef.current.scrollLeft + scrollRef.current.clientWidth >= scrollRef.current.scrollWidth - 1) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += scrollAmount;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= scrollRef.current.clientWidth / 4;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollRef.current.clientWidth / 4;
    }
  };

  // Get unique series
  const uniqueSeries = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="relative px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Series</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Scrollable Series */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth py-2 px-2 md:px-4 scrollbar-hide"
        >
          {uniqueSeries.map((cat) => {
            const seriesProducts = products.filter((p) => p.category === cat);
            const firstProduct = seriesProducts[0];
            const categoryName = categoryMap[cat] || cat;

            return (
              <Link
                key={cat}
                href={`/products?cat=${cat}`} // link to category details page
                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={firstProduct.image}
                  alt={categoryName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{categoryName} - {firstProduct?.range} kW</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{firstProduct.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
