"use client";

import { useSearchParams } from "next/navigation";
import { products, type Product } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useState } from "react";

interface ProductRowProps {
  product: Product;
  addToCart: (product: Product, qty: number) => void;
}

export default function ProductsContent() {
  const [notification, setNotification] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const category = searchParams.get("cat");
  const { addToCart } = useCart();

  // Map category codes to readable names
  const categoryMap: Record<string, string> = {
    vsx: "VSX",
    m20: "M20 Shaft Power",
    vsm: "VSM",
    vsr: "VSR",
    vss: "VSS",
  };

  // Coming Soon categories
  if (category === "m20" || category === "vsr") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-gray-600 text-lg mb-6">
          The {categoryMap[category]} series will be available soon. Stay tuned!
        </p>
        <Link
          href="/series"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Browse Other Series
        </Link>
      </div>
    );
  }

  // Filter products
  let filteredProducts: Product[] = products;
  let categoryName = "All Products";

  if (category && category in categoryMap) {
    filteredProducts = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    categoryName = categoryMap[category];
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  // take first product for shared info
  const categoryInfo = filteredProducts[0];

  const handleAddToCart = (product: Product, qty: number) => {
    addToCart(product, qty);
    setNotification(`${product.model} (${qty}) added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

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
            <Link href="/series" className="hover:underline">
              CG Emotron
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium">{categoryName}</li>
        </ol>
      </nav>

      {/* Category Heading */}
      <div className="max-w-4xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold mb-4">{categoryName} Category</h1>
        <p className="text-xl  text-gray-600 font-semibold mb-8">
          {categoryInfo?.modelInfo}.
        </p>
        <div className="max-w-lg mx-auto w-full h-auto rounded shadow overflow-hidden">
          <Image
            src={categoryInfo.image}
            alt={categoryName}
            width={500}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>

      {/* Product Table */}
      <section className="bg-white border p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Available Models</h2>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100 hidden md:table-header-group">
              <tr>
                <th className="p-3 border">Model Name</th>
                <th className="p-3 border">KW / HP</th>
                <th className="p-3 border">Current</th>
                <th className="p-3 border">Price</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  addToCart={handleAddToCart}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Series Range */}
      {categoryInfo.seriesRange && categoryInfo.seriesRange.length > 0 && (
        <section className="bg-blue-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Series Range</h2>
          <ul className="list-disc ml-5 space-y-2">
            {categoryInfo.seriesRange.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {categoryInfo.benefits && categoryInfo.benefits.length > 0 && (
        <section className="bg-green-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Benefits</h2>
          <ul className="list-disc ml-5 space-y-2">
            {categoryInfo.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Overview */}
      {categoryInfo.description && (
        <section className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Product Overview</h2>
          <p>{categoryInfo.description}</p>
        </section>
      )}

      {/* Key Features */}
      {categoryInfo.features && categoryInfo.features.length > 0 && (
        <section className="bg-white border p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Key Features</h2>
          <ul className="list-disc ml-5 space-y-2">
            {categoryInfo.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Applications */}
      {categoryInfo.applications && categoryInfo.applications.length > 0 && (
        <section className="bg-purple-50 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Applications</h2>
          <ul className="list-disc ml-5 space-y-2">
            {categoryInfo.applications.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {notification}
          </div>
        </div>
      )}
    </div>
  );
}

// Separate row component with qty state
function ProductRow({ product, addToCart }: ProductRowProps) {
  const [qty, setQty] = useState(1);
  // 👉 put helper function here
const calculateAmount = (price: string) => {
  const base = Number(price); // ✅ convert string to number
  if (isNaN(base)) return "Invalid Price"; // safety check

  const afterDiscount = base * 0.31; // -69% → keep 31%
  const afterAddOne = afterDiscount * 1.01; // +1%
  return `Rs.${Math.round(afterAddOne)}`;
};

  return (
    <>
      {/* Desktop Table Row */}
      <tr className="hover:bg-gray-50 hidden md:table-row">
        <td className="p-3 border">{product.model}</td>
        <td className="p-3 border">
          {typeof product.kw === "string" ? product.kw : `${product.kw}`} /{" "}
          {typeof product.hp === "string" ? product.hp : `${product.hp}`}
        </td>
        <td className="p-3 border">
          {typeof product.amps === "string" ? product.amps : `${product.amps}`}{" "}
          
        </td>
        <td className="p-3 border">
          {calculateAmount(product?.price)} + {product.gst}% GST
        </td>
        <td className="p-3 border">
          <div className="flex items-center justify-center border rounded w-fit mx-auto">
            <button
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="px-2 py-1 text-lg font-bold hover:bg-gray-100 disabled:opacity-50"
              disabled={qty === 1}
            >
              -
            </button>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-12 text-center outline-none"
              min={1}
            />
            <button
              onClick={() => setQty((prev) => prev + 1)}
              className="px-2 py-1 text-lg font-bold hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </td>

        <td className="p-3 border">
          <button
            onClick={() => addToCart(product, qty)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </td>
      </tr>

      {/* Mobile Card Layout */}
      <tr className="md:hidden">
        <td colSpan={6} className="p-0">
          <div className="p-4 border-b bg-gray-50 hover:bg-gray-100">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{product.model}</h3>

              <div className="text-sm text-gray-700 space-y-1">
                <div>
                  {typeof product.kw === "string"
                    ? product.kw
                    : `${product.kw}`}{" "}
                  /{" "}
                  {typeof product.hp === "string"
                    ? product.hp
                    : `${product.hp}`}
                </div>
                <div>
                  {typeof product.amps === "string"
                    ? product.amps
                    : `${product.amps}`}{" "}
                </div>
              </div>

              <div className="text-lg font-medium text-gray-900">
                {calculateAmount(product?.price)}  + {product.gst}% GST
              </div>

              <div className="flex items-center justify-between pt-2">
                {/* Quantity Control */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Qty:</label>
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className="px-2 py-1 text-lg font-bold hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={qty}
                      onChange={(e) =>
                        setQty(Math.max(1, Number(e.target.value)))
                      }
                      className="w-12 text-center outline-none"
                      min={1}
                    />
                    <button
                      onClick={() => setQty((prev) => prev + 1)}
                      className="px-2 py-1 text-lg font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, qty)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
