// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { FirestoreProduct } from "@/types/product";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalViews: number;
  topProducts: { name: string; views: number; category: string }[];
  categoryBreakdown: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("viewCount", "desc"));
        const snapshot = await getDocs(q);

        const products = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FirestoreProduct[];

        const totalProducts = products.length;
        const activeProducts = products.filter((p) => p.isActive !== false).length;
        const totalViews = products.reduce((sum, p) => sum + (p.viewCount || 0), 0);

        const topProducts = products
          .slice(0, 5)
          .map((p) => ({
            name: p.name,
            views: p.viewCount || 0,
            category: p.category,
          }));

        const categoryBreakdown: Record<string, number> = {};
        products.forEach((p) => {
          categoryBreakdown[p.category] = (categoryBreakdown[p.category] || 0) + 1;
        });

        setStats({
          totalProducts,
          activeProducts,
          totalViews,
          topProducts,
          categoryBreakdown,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-sm text-blue-600 font-medium">Total Products</p>
          <p className="text-3xl font-bold text-blue-700">{stats?.totalProducts || 0}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6">
          <p className="text-sm text-green-600 font-medium">Active Products</p>
          <p className="text-3xl font-bold text-green-700">{stats?.activeProducts || 0}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6">
          <p className="text-sm text-purple-600 font-medium">Total Views</p>
          <p className="text-3xl font-bold text-purple-700">{stats?.totalViews || 0}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Products by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {["vsx", "vsm", "vss", "m20", "vsr"].map((cat) => (
            <div key={cat} className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 uppercase">{cat}</p>
              <p className="text-2xl font-bold text-gray-700">
                {stats?.categoryBreakdown[cat] || 0}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Viewed Products</h2>
        {stats?.topProducts && stats.topProducts.length > 0 ? (
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Product</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.topProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    <td className="px-4 py-3 text-sm text-gray-800">{product.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 uppercase">{product.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 text-right">{product.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No products yet. Add your first product!</p>
        )}
      </div>
    </div>
  );
}

