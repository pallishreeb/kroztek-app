"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Trash2, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false); // Added mobile menu state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null); // Mobile dropdown state
  const cartRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close dropdowns/menus when clicking outside
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
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setOpenMobileMenu(false);
        setOpenMobileDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openMobileMenu]);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
    setOpenMobileDropdown(null);
  };

  return (
    <>
      <nav className="bg-white shadow-md relative z-40">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-lg md:text-xl font-bold text-gray-800 flex-1 md:flex-none">
            <span className="hidden sm:inline">KROZTEK INTEGRATED SOLUTION</span>
            <span className="sm:hidden">KROZTEK</span>
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
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                    <ChevronDown size={16} className={`transition-transform ${
                      openDropdown === link.name ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <div
                    className={`absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 ${
                      openDropdown === link.name
                        ? "opacity-100 max-h-96"
                        : "opacity-0 max-h-0 pointer-events-none"
                    }`}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        href={child.path}
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors text-sm"
                        onClick={() => setOpenDropdown(null)}
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

            {/* Desktop Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setOpenCart(!openCart)}
                className="relative flex items-center hover:text-blue-600 transition-colors"
              >
                <ShoppingCart size={24} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </button>

              <div
                className={`absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4 overflow-hidden transition-all duration-300 ${
                  openCart ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 pointer-events-none"
                }`}
              >
                <h3 className="font-semibold mb-3">Cart Items</h3>
                {cart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between gap-2 p-2 hover:bg-gray-50 rounded"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-gray-600">
                                {item.quantity} × Rs. {item.product.price}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                    <Link
                      href="/cart"
                      className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => setOpenCart(false)}
                    >
                      Go to Cart
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop User Section */}
            {user && (
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
            <LoginButton />
          </div>

          {/* Mobile menu buttons */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Cart Button */}
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

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="p-1"
            >
              {openMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Cart Dropdown */}
        <div
          className={`md:hidden absolute right-4 top-16 w-80 max-w-[calc(100vw-2rem)] bg-white border rounded-lg shadow-lg z-50 p-4 overflow-hidden transition-all duration-300 ${
            openCart ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0 pointer-events-none"
          }`}
          ref={cartRef}
        >
          <h3 className="font-semibold mb-3">Cart Items</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              <div className="max-h-64 overflow-y-auto space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-2 p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-xs text-gray-600">
                          {item.quantity} × Rs. {item.product.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total:</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>
              <Link
                href="/cart"
                className="block bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setOpenCart(false)}
              >
                Go to Cart
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity duration-300 ${
          openMobileMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Side Panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300 ${
          openMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={closeMobileMenu} className="p-1">
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            {user && (
              <div className="p-4 border-b flex items-center gap-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user.displayName || 'User'}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="p-4 space-y-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{link.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          openMobileDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`ml-4 overflow-hidden transition-all duration-300 ${
                        openMobileDropdown === link.name
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={closeMobileMenu}
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
                    className="block p-3 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Login/Logout Button */}
          <div className="p-4 border-t">
            <LoginButton />
          </div>
        </div>
      </div>
    </>
  );
}