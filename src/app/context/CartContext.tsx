"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Generic cart product type - works with both static and Firestore products
export type CartProduct = {
  id: string;
  name: string;
  price: number | string;
  image?: string;
  model?: string;
  gst?: string;
  category?: string;
};

// CartItem uses CartProduct
type CartItem = { product: CartProduct; quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: CartProduct, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
// helper to calculate final rounded price
// helper to calculate final rounded price
const getFinalPrice = (price: number | string): number => {
  const num = Number(price);
  if (isNaN(num)) return 0;

  const afterDiscount = num * 0.31; // -69%
  const afterAddOne = afterDiscount * 1.01; // +1%
  return Math.ceil(afterAddOne); // round UP
};

const addToCart = (product: Product, quantity = 1) => {
  setCart((prev: CartItem[]) => {
    const existing = prev.find((i) => i.product.id === product.id);

    if (existing) {
      return prev.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
    }

    // overwrite price with final calculated one before storing
    const updatedProduct: Product = {
      ...product,
      price: getFinalPrice(product.price),
    };

    return [...prev, { product: updatedProduct, quantity }];
  });
};


  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
