/** @format */
"use client";

import { ShoppingCart, Phone, CheckCircle, Package } from "lucide-react";
import { useEffect, useState } from "react";

export default function GuideToBuyPage() {
  const steps = [
    {
      icon: ShoppingCart,
      title: "1. Browse Products",
      description:
        "Explore our range of products from the navigation menu — such as VSX, VSM, or VSS series. Click on any product to view its specifications and price.",
    },
    {
      icon: Phone,
      title: "2. Contact Us to Place Order",
      description:
        "Once you’ve chosen your product, call us directly at +91 8637214899 or click on the WhatsApp icon on the product page to connect with our team.",
    },
    {
      icon: Package,
      title: "3. Share Details & Confirm",
      description:
        "We’ll ask for your delivery address and other details over call or WhatsApp. Based on your location, we’ll calculate the final amount including shipment charges.",
    },
    {
      icon: CheckCircle,
      title: "4. Final Payment & Dispatch",
      description:
        "Once you confirm the order and payment, we’ll dispatch the product via trusted courier services. You’ll get full shipment details for transparency.",
    },
  ];

  // Counters for delivered products
  const [counts, setCounts] = useState({ vsm: 0, vsx: 0, other: 0 });

  useEffect(() => {
    const target = { vsm: 200, vsx: 390, other: 300 };
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
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700">
        How to Buy
      </h1>
      <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
        For now, all purchases are handled personally to ensure smooth delivery
        and accurate pricing. Follow these simple steps to place your order.
      </p>

      <div className="space-y-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex-shrink-0 bg-indigo-100 text-indigo-600 p-4 rounded-full">
              <step.icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-green-50 border border-green-200 p-6 rounded-lg text-center">
        <CheckCircle className="w-10 h-10 mx-auto text-green-600 mb-2" />
        <h2 className="text-xl font-bold text-green-700 mb-2">
          Transparent Shipping Policy
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          We calculate shipping charges based on your delivery location and only
          charge the actual courier cost. No hidden delivery fees — complete
          transparency in pricing.
        </p>
      </div>

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
          <p className="text-gray-600">Crompton VSS Series</p>
        </div>
      </div>
    </div>
  );
}
