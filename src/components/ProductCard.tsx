import Link from "next/link";
import { FullProduct } from "@/lib/products";

export default function ProductCard({ product }: { product: FullProduct }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col">
        {/* Image */}
        <div className="w-full h-48">
          <img
            src={product.image || "/img/vsx10 Medium.png"}
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

          <p className="text-indigo-600 font-bold text-lg mt-3">Rs.{product.price}</p>
        </div>
      </div>
    </Link>
  );
}
