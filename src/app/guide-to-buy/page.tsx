"use client";

import { ShoppingCart, Package, CreditCard, FileText, Phone, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function GuideToBuyPage() {
  
  const steps = [
    {
      icon: ShoppingCart,
      title: "1. Browse Products",
      description:
        "From the navigation menu, choose a category like VSX, VSM, or others. Explore the products and click on a product to view details.",
    },
    {
      icon: Package,
      title: "2. Add to Cart",
      description:
        "Select the desired quantity and click 'Add to Cart'. When ready, open your cart and proceed to checkout.",
    },
    {
      icon: CreditCard,
      title: "3. Checkout & Payment",
      description:
        "Fill in your billing details and address. Pay using the provided account details, QR code, or UPI. Then click 'I Have Paid', enter your Transaction ID, and confirm your order.",
    },
    {
      icon: FileText,
      title: "4. Order Confirmation",
      description:
        "Once confirmed, your order will appear on the 'My Orders' page with invoice details available for download. You’ll also receive an email notification.",
    },
    {
      icon: Package,
      title: "5. Dispatch & Delivery",
      description:
        "We dispatch through trusted couriers. The courier bill will be shared with you, and you only pay the actual delivery charges at the time of dispatch. This ensures full transparency.",
    },
    {
      icon: Phone,
      title: "6. Support Anytime",
      description:
        "If you have any doubts, call us anytime at +91 863741899. We are here to help you at every step.",
    },
  ];

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
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-700">
        Guide to Buy
      </h1>
      <p className="text-center max-w-3xl mx-auto text-gray-600 mb-12">
        To make your purchase process smooth and transparent, here’s a simple
        step-by-step guide. Follow these steps to place your order with
        confidence.
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
          We do not charge any hidden delivery fees. You only pay the actual
          courier charges as per the bill, ensuring complete transparency and
          fairness in pricing.
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
          <p className="text-gray-600">Other Products</p>
        </div>
      </div>
    </div>
  );
}
