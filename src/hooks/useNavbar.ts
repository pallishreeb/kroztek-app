

// ===== 9. hooks/useNavbar.ts =====
"use client";
import { useState, useRef, useEffect } from 'react';

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMobileMenuClick = (menuType: string) => {
    setActiveMobileMenu(menuType);
    setMobileMenuOpen(true);
  };

  const handleMenuToggle = (menuType: string) => {
    setActiveMenu((prev) => (prev === menuType ? null : menuType));
  };

  const handleMobileToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeActiveMenu = () => {
    setActiveMenu(null);
  };

  const closeMobileSheet = (open: boolean) => {
    setMobileMenuOpen(open);
    if (!open) setActiveMobileMenu("");
  };

  // Issue 2 Fix: Close all mobile menus
  const closeAllMobileMenus = () => {
    setIsMenuOpen(false);
    setMobileMenuOpen(false);
    setActiveMobileMenu("");
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenu]);

  return {
    isMenuOpen,
    activeMenu,
    mobileMenuOpen,
    activeMobileMenu,
    menuRef,
    handleMobileMenuClick,
    handleMenuToggle,
    handleMobileToggle,
    closeActiveMenu,
    closeMobileSheet,
    closeAllMobileMenus, // Issue 2 Fix
  };
}