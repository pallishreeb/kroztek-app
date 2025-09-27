"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState(false); // ✅ new
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
          {/* nav links ... same as before */}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpenMobileMenu(true)} // ✅ open mobile menu
        >
          ☰
        </button>
      </div>

      {/* ✅ Mobile menu drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          openMobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold">Menu</span>
          <button onClick={() => setOpenMobileMenu(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-3">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name}>
                <p className="font-semibold">{link.name}</p>
                <div className="ml-3 flex flex-col gap-2">
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      href={child.path}
                      onClick={() => setOpenMobileMenu(false)}
                      className="hover:text-blue-600"
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
                onClick={() => setOpenMobileMenu(false)}
                className="hover:text-blue-600"
              >
                {link.name}
              </Link>
            )
          )}
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}
