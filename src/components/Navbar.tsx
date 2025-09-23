"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // track dropdown by name
  const cartRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();

  const navLinks = [
    { name: "About Us", path: "/about" },
    {
      name: "CG Emotron",
      children: [
        { name: "VSX", path: "/products?cat=vsx" },
        { name: "M20 Shaft Power", path: "/products?cat=m20" },
        { name: "VSM", path: "/products?cat=vsm" },
        { name: "VSR", path: "/products?cat=vsr" },
        { name: "VSS", path: "/products?cat=vss" },
      ],
    },
    { name: "Orders", path: "/orders" },
    { name: "Guide to Buy", path: "/guide-to-buy" },
  ];

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.product.price),
    0
  );

  // Close dropdown/cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setOpenCart(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black-700">
          KROZTEK INTEGRATED SOLUTION
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name} className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === link.name ? null : link.name)
                  }
                  className="hover:text-blue-600 transition-colors"
                >
                  {link.name} ▾
                </button>

                <div
                  className={`absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 overflow-hidden transition-all duration-300 ${
                    openDropdown === link.name
                      ? "opacity-100 max-h-96"
                      : "opacity-0 max-h-0 pointer-events-none"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setOpenDropdown(null)} // close after navigation
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                href={link.path}
                className="hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            )
          )}

          {/* Cart icon + mini-cart */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setOpenCart(!openCart)}
              className="relative flex items-center"
            >
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </button>

            <div
              className={`absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 p-4 overflow-hidden transition-all duration-300 ${
                openCart ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 pointer-events-none"
              }`}
            >
              <h3 className="font-semibold mb-2">Cart Items</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-600">
                            {item.quantity} × ₹{item.product.price}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/cart"
                    className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
                  >
                    Go to Cart
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* User avatar + login/logout */}
          {user && (
            <img
              src={user.photoURL || "/default-avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          )}
          <LoginButton />
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden" onClick={() => setOpenCart(!openCart)}>
          ☰
        </button>
      </div>
    </nav>
  );
}
