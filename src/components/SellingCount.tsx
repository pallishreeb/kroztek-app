"use client";
import { useEffect, useState } from "react";

export default function SellingCount() {

    // Counters for delivered products
  const [counts, setCounts] = useState({ vsm: 0, vsx: 0, other: 0 });

  useEffect(() => {
    const target = { vsm: 200, vsx: 150, other: 500 };
    let i = 0;
    const interval = setInterval(() => {
      i += 10;
      setCounts({
        vsm: Math.min(i, target.vsm),
        vsx: Math.min(i, target.vsx),
        other: Math.min(i * 2, target.other),
      });
      if (i >= 500) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container mx-auto px-6 py-12">
        {/* Counters */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 mt-8">
        📦 Delivered Products So Far
      </h2>
      <div className="grid md:grid-cols-3 gap-6 text-center mb-16">
        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-3xl font-bold text-indigo-600">{counts.vsm}+</p>
          <p className="text-gray-600">Crompton VSM Series</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-3xl font-bold text-indigo-600">{counts.vsx}+</p>
          <p className="text-gray-600">Crompton VSX Series</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <p className="text-3xl font-bold text-indigo-600">{counts.other}+</p>
          <p className="text-gray-600">Other Products</p>
        </div>
      </div>
    </div>
  );
}
