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
    addToCartContext(product, quantity); // 🔑 update context (also updates localStorage inside context)
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

      {/* Product Grid - Existing section */}
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
          <p className="text-xl text-indigo-600 mt-2">{product.price} {product.gst}</p>

          {/* Technical Details */}
          <ul className="mt-4 text-gray-700">
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
          {product.features && (
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
              onChange={(e) => setQuantity(Number(e.target.value))}
              defaultValue={1}
              min={1}
              className="border px-3 py-2 w-20 rounded"
            />
            <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Add to Cart
            </button>
          </div>

          {/* SKU, Categories, Tags */}
          <div className="mt-4 text-gray-600">
            {product.sku && <p><strong>SKU:</strong> {product.sku}</p>}
            <p><strong>Categories:</strong> CG Emotron, {product.series}</p>
            {product.tags && <p><strong>Tags:</strong> {product.tags.join(", ")}</p>}
          </div>
        </div>
      </div>

      {/* Additional Detailed Section - Extended info */}
      <div className="mt-12 space-y-6">
        {/* Product Overview */}
        {product.description && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Product Overview</h2>
            <p className="text-gray-700">{product.description}</p>
          </section>
        )}

        {/* Features */}
        {product.features?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Key Features</h2>
            <ul className="list-disc ml-5 text-gray-700">
              {product.features.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Benefits */}
        {product.benefits?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc ml-5 text-gray-700">
              {product.benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Technical Specs Table */}
        {product.technicalSpecs?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Technical Specifications</h2>
            <table className="min-w-full border border-gray-300 text-gray-700">
              <tbody>
                {product.technicalSpecs.map((spec, idx) => (
                  <tr key={idx} className="border-b border-gray-300">
                    <td className="px-4 py-2 font-semibold">{spec.parameter}</td>
                    <td className="px-4 py-2">{spec.specification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Series Range */}
        {product.seriesRange?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Series Range</h2>
            <ul className="list-disc ml-5 text-gray-700">
              {product.seriesRange.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Applications */}
        {product.applications?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2">Applications</h2>
            <ul className="list-disc ml-5 text-gray-700">
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
