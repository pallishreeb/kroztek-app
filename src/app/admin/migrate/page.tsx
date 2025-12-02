// app/admin/migrate/page.tsx
"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, getDocs, query, serverTimestamp } from "firebase/firestore";
import { products as staticProducts } from "@/data/products";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function MigratePage() {
  const { user } = useAuth();
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [result, setResult] = useState<{ success: number; failed: number; errors: string[] } | null>(null);
  const [existingCount, setExistingCount] = useState<number | null>(null);

  const checkExisting = async () => {
    const snapshot = await getDocs(query(collection(db, "products")));
    setExistingCount(snapshot.size);
  };

  const handleMigrate = async () => {
    if (!confirm(`This will migrate ${staticProducts.length} products to Firestore. Continue?`)) {
      return;
    }

    setMigrating(true);
    setProgress({ current: 0, total: staticProducts.length });
    setResult(null);

    const results = { success: 0, failed: 0, errors: [] as string[] };

    for (let i = 0; i < staticProducts.length; i++) {
      const product = staticProducts[i];
      
      try {
        // Use the product ID as the document ID for consistency
        const docRef = doc(db, "products", product.id);
        
        // Only migrate product-specific fields (not category-level data)
        await setDoc(docRef, {
          name: product.name,
          category: product.category,
          price: product.price,
          description: product.description,
          image: product.image || "",
          gst: product.gst || "18",
          sku: product.sku || "",
          series: product.series || product.category.toUpperCase(),
          model: product.model || "",
          mainsVoltage: product.mainsVoltage || "",
          kw: product.kw || "",
          hp: product.hp || "",
          amps: product.amps || "",
          weight: product.weight || "",
          range: product.range || "",
          rangeA: product.rangeA || "",
          technicalSpecs: product.technicalSpecs || [],
          viewCount: 0,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          createdBy: user?.email || "migration",
          updatedBy: user?.email || "migration",
        });

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`${product.name}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }

      setProgress({ current: i + 1, total: staticProducts.length });
    }

    setResult(results);
    setMigrating(false);
    checkExisting();
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin" className="text-gray-500 hover:text-gray-700">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Migrate Products</h1>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Migration Tool</h3>
        <p className="text-yellow-700 text-sm">
          This tool will migrate all {staticProducts.length} products from the static products.ts file to Firestore.
          Only product-specific fields will be migrated (category-level data like features, benefits, applications 
          are stored separately).
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <button
            onClick={checkExisting}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Check Existing Products
          </button>
          {existingCount !== null && (
            <span className="text-gray-600">
              {existingCount} products already in Firestore
            </span>
          )}
        </div>

        <button
          onClick={handleMigrate}
          disabled={migrating}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {migrating ? "Migrating..." : "Start Migration"}
        </button>

        {/* Progress */}
        {migrating && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">
                {progress.current} / {progress.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Migration Complete</h3>
            <div className="flex gap-6 mb-4">
              <div className="text-green-600">
                ✓ Success: {result.success}
              </div>
              <div className="text-red-600">
                ✗ Failed: {result.failed}
              </div>
            </div>
            {result.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-red-700 mb-2">Errors:</h4>
                <ul className="text-sm text-red-600 space-y-1 max-h-40 overflow-y-auto">
                  {result.errors.map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

