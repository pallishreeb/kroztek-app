import { products, Product } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Do NOT make this async unless you fetch from API
export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params; // Just destructure — no await!

  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Product not found
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
