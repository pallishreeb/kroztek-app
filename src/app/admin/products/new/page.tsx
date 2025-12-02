// app/admin/products/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import ProductForm from "@/components/admin/ProductForm";
import { FirestoreProduct } from "@/types/product";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewProductPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (productData: Partial<FirestoreProduct>) => {
    // Direct Firestore write (client-side, uses Firebase Auth context)
    const docData = {
      ...productData,
      viewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      createdBy: user?.email || "unknown",
      updatedBy: user?.email || "unknown",
    };

    await addDoc(collection(db, "products"), docData);

    // Redirect to products list
    router.push("/admin/products");
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/products" className="text-gray-500 hover:text-gray-700">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
      </div>

      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}

