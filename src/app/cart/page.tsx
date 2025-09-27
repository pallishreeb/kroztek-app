"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

// ✅ Define Product and CartItem types
interface Product {
  id: string;
  name: string;
  price: number | string;
  image: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const taxRate = 0.18; // 18% tax

  // Load cart from localStorage
  const loadCart = () => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = cart.map((item) =>
      item.product.id === id ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id: string) => {
    const newCart = cart.filter((item) => item.product.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * Number(item.product.price),
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link href="/series" className="text-blue-600 hover:underline">
            Shop now
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left side - product list */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-medium">{item.product.name}</h2>
                  <p className="text-gray-600">₹{item.product.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(item.product.id, parseInt(e.target.value))
                      }
                      className="w-16 border text-center rounded"
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₹{(item.quantity * Number(item.product.price)).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 mt-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Cart totals */}
          <div className="border p-4 rounded space-y-4 h-fit">
            <h2 className="text-xl font-semibold mb-4">Cart Totals</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span>Shipping</span>
              <input
                type="text"
                placeholder="Enter your address"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
              <button
                onClick={() => setShippingCost(100)} // Example shipping cost
                className="bg-gray-200 py-1 rounded hover:bg-gray-300"
              >
                Calculate shipping
              </button>
              {shippingCost > 0 && (
                <span>Shipping cost: ₹{shippingCost.toFixed(2)}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="block w-full">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
