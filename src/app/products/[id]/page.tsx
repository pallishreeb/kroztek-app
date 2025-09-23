import { products, Product } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: { id: string };
  // Optional searchParams if you need them
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;

  // Find the product by ID
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
