// app/admin/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import ProductForm from "@/components/admin/ProductForm";
import { FirestoreProduct } from "@/types/product";
import Link from "next/link";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState<FirestoreProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productId = params.id as string;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Product not found");
          return;
        }

        setProduct({
          id: docSnap.id,
          ...docSnap.data(),
        } as FirestoreProduct);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (productData: Partial<FirestoreProduct>) => {
    const docRef = doc(db, "products", productId);
    
    await updateDoc(docRef, {
      ...productData,
      updatedAt: serverTimestamp(),
      updatedBy: user?.email,
    });

    // Redirect to products list
    router.push("/admin/products");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error || "Product not found"}</p>
        <Link href="/admin/products" className="text-blue-600 hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        <span className="text-gray-400">|</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      <ProductForm initialData={product} onSubmit={handleSubmit} isEdit />
    </div>
  );
}

