import ProductDetailClient from "./ProductDetailClient";
import Link from "next/link";
import { getProductById } from "@/lib/products";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Await the params since it's now a Promise in Next.js 15+
  const { id } = await params;

  // Fetch the product from Firestore
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/series" className="text-blue-600 hover:underline">
            Go back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}