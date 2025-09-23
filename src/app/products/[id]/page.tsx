// File: src/app/products/[id]/page.tsx
import { products, Product } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

// Optional: Generate static paths for build optimization
// Optional: Generate static paths for build optimization
export async function generateStaticParams() {
  return products.map((product) => ({
    params: {
      id: product.id,
    },
  }));
}
// Optional: Metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description || "Kroztek product details",
  };
}

// Page Component
export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;

  const product: Product | undefined = products.find((p) => p.id === id);

  if (!product) {
    // This will show a 404 page
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
