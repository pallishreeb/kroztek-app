"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown, Zap, Phone, Mail } from "lucide-react";
import { useCart } from "../app/context/CartContext";
import { useAuth } from "../app/context/AuthContext";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
    setOpenMobileDropdown(null);
  };

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+91 8637214899</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>kroztekintegratedsolution@gmail.com</span>
            </div>
          </div>
          <div className="text-xs">
            <span className="opacity-90">GST:21EOUPS1807D1ZX | Authorized Dealer & Service Provider</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-1 md:flex-none"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <Zap className="text-white" size={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-base lg:text-xl font-bold text-gray-800 leading-tight hidden sm:block">
                  KROZTEK
                </span>
                <span className="text-[10px] lg:text-xs text-gray-600 font-medium hidden sm:block">
                  Integrated Solution
                </span>
                <span className="text-base lg:text-xl font-bold text-gray-800 leading-tight sm:hidden">
                  KROZTEK
                </span>
              </div>
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex items-center gap-1 px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium text-sm lg:text-base"
                    >
                      {link.name}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden transition-all duration-200 ${
                        openDropdown === link.name
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="py-2">
                        {link.children.map((child, index) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            className="block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium border-l-2 border-transparent hover:border-blue-600"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium text-sm lg:text-base"
                  >
                    {link.name}
                  </Link>
                )
              )}

              {/* Desktop Cart */}
              <Link
                href="/cart"
                className="relative flex items-center px-3 lg:px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 ml-2"
              >
                <ShoppingCart size={22} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full font-semibold px-1.5 shadow-md">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* Desktop User Section */}
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
                {user && (
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border-2 border-blue-100"
                  />
                )}
                <LoginButton />
              </div>
            </div>

            {/* Mobile menu buttons */}
            <div className="md:hidden flex items-center gap-3">
              {/* Mobile Cart Button */}
              <Link href="/cart" className="relative flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ShoppingCart size={22} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center rounded-full font-semibold">
                    {totalQuantity}
                  </span>
                )}
              </Link>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {openMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {openMobileMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Side Panel */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[70] md:hidden transform transition-transform duration-300 ${
          openMobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Zap size={20} />
            </div>
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>
          <button onClick={closeMobileMenu} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {/* User Section */}
            {user ? (
              <div className="p-4 bg-gradient-to-br from-blue-50 to-white border-b flex items-center gap-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-blue-200 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="p-4 border-b">
                <LoginButton />
              </div>
            )}

            {/* Navigation Links */}
            <nav className="p-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === link.name ? null : link.name
                        )
                      }
                      className="flex items-center justify-between w-full p-3 text-left hover:bg-blue-50 rounded-xl transition-colors font-medium"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          openMobileDropdown === link.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${
                        openMobileDropdown === link.name
                          ? "max-h-96 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          href={child.path}
                          className="block p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-sm border-l-2 border-transparent hover:border-blue-600"
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
                    className="block p-3 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t bg-gray-50">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-blue-600" />
                <span>+91 8637214899</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-blue-600" />
                <span>kroztekintegratedsolution@gmail.com</span>
              </div>
            </div>
            {user && (
              <div className="mt-3 pt-3 border-t">
                <LoginButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}