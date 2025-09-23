import { products, Product } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product: Product | undefined = products.find(
    (p) => p.id === params.id
  );

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return <ProductDetailClient product={product} />;
}
