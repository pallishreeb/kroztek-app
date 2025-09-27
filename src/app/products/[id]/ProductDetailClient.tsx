"use client";

import { Product } from "@/data/products";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../../context/CartContext";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart: addToCartContext } = useCart();
  
  const categoryMap: Record<string, string> = {
    vsx: "VSX",
    m20: "M20 Shaft Power",
    vsm: "VSM",
    vsr: "VSR",
    vss: "VSS",
  };
  const categoryName = product.category ? categoryMap[product.category] : "All Products";

  const handleAddToCart = () => {
    addToCartContext(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600 mb-6">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/products" className="hover:underline">CG Emotron</Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`/products?cat=${product.category}`} className="hover:underline">{categoryName}</Link>
          </li>
          <li>/</li>
          <li className="font-medium">{product.name}</li>
        </ol>
      </nav>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded shadow"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-xl text-indigo-600 mt-2">Rs.{product.price} + {product.gst}% GST</p>

          {/* Technical Details */}
          <ul className="mt-4 text-gray-700 space-y-1">
            {product.series && <li><strong>Make:</strong> {product.series}</li>}
            {product.series && <li><strong>Series:</strong> {product.series}</li>}
            {product.model && <li><strong>Model:</strong> {product.model}</li>}
            {product.mainsVoltage && <li><strong>Mains Voltage:</strong> {product.mainsVoltage}</li>}
            {product.kw && <li><strong>KW:</strong> {product.kw}</li>}
            {product.hp && <li><strong>HP:</strong> {product.hp}</li>}
            {product.amps && <li><strong>Amps:</strong> {product.amps}</li>}
            {product.weight && <li><strong>Weight:</strong> {product.weight}</li>}
          </ul>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold">Features</h2>
              <ul className="list-disc ml-5 text-gray-700">
                {product.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="mt-6 flex items-center gap-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min={1}
              className="border px-3 py-2 w-20 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button 
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* SKU, Categories, Tags */}
          <div className="mt-4 text-gray-600 space-y-1">
            {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
            <p><strong>Categories:</strong> CG Emotron, {product.series}</p>
            {product.tags && product.tags.length > 0 && (
              <p><strong>Tags:</strong> {product.tags.join(", ")}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Detailed Section */}
      <div className="mt-12 space-y-8">
        {/* Product Overview */}
        {product.description && (
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Product Overview</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </section>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <section className="bg-white border border-gray-200 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Key Features</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              {product.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Benefits */}
        {product.benefits && product.benefits.length > 0 && (
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Benefits</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              {product.benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Technical Specs Table */}
        {product.technicalSpecs && product.technicalSpecs.length > 0 && (
          <section className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Technical Specifications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody className="divide-y divide-gray-200">
                  {product.technicalSpecs.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-900 bg-gray-50">
                        {spec.parameter}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {spec.specification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Series Range */}
        {product.seriesRange && product.seriesRange.length > 0 && (
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Series Range</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              {product.seriesRange.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <section className="bg-purple-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Applications</h2>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              {product.applications.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}