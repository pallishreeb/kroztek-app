import Link from "next/link";
import { Product } from "@/data/products";
import { Eye } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col shadow-sm hover:shadow-md transition">
        {/* Image */}
        <div className="w-full h-48">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-xl"
          />
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
          </div>

          {/* Price + Eye icon */}
          <div className="flex items-center justify-between mt-3">
            <p className="text-indigo-600 font-bold text-lg">{product.price}</p>
            <Eye className="text-gray-500 hover:text-indigo-600 cursor-pointer" size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
