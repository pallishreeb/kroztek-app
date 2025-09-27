"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { cart } = useCart();
  const { user } = useAuth();

  const navLinks = [
    { name: "About Us", path: "/about" },
    {
      name: "CG Emotron",
      children: [
        { name: "VSX", path: "/products?cat=vsx" },
        { name: "VSM", path: "/products?cat=vsm" },
        { name: "VSS", path: "/products?cat=vss" },
        { name: "M20 Shaft Power", path: "/products?cat=m20" },
        { name: "VSR", path: "/products?cat=vsr" },
      ],
    },
    { name: "Orders", path: "/orders" },
    { name: "Guide to Buy", path: "/guide-to-buy" },
  ];

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
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
          <Link
            href="/"
            className="text-lg md:text-xl font-bold text-gray-800 flex-1 md:flex-none"
          >
            <span className="hidden sm:inline">
              KROZTEK INTEGRATED SOLUTION
            </span>
            <span className="sm:hidden">KROZTEK</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.name} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.name ? null : link.name
                      )
                    }
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    {link.name}
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`}
                    />
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
            <Link
              href="/cart"
              className="relative flex items-center hover:text-blue-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

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
            <Link href="/cart" className="relative flex items-center">
              <ShoppingCart size={24} />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
              className="p-1"
            >
              {openMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
        {/* Login/Logout Button - Top Position */}
        <div className="p-4 border-b">
          <LoginButton />
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
                  <p className="font-medium">{user.displayName || "User"}</p>
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
        </div>
      </div>
    </>
  );
}
