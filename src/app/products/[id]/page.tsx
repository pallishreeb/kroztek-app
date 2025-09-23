import { products, Product } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Await the params since it's now a Promise in Next.js 15+
  const { id } = await params;

  // Find the product by ID
  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <a 
            href="/products" 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Products
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}