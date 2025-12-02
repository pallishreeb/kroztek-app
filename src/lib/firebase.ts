// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyFwTtYh0wHYu_5FzkCMD9U31Tdr8X2UI",
  authDomain: "kroztek-shop.firebaseapp.com",
  projectId: "kroztek-shop",
  storageBucket: "kroztek-shop.firebasestorage.app",
  messagingSenderId: "627912446588",
  appId: "1:627912446588:web:243b48573b9b318036aff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Super Admin emails with full access
export const SUPER_ADMIN_EMAILS = [
  "kroztekintegratedsolution@gmail.com",
  "pallishreebehera01@gmail.com",
];

// Product categories (fixed)
export const PRODUCT_CATEGORIES = ["vsx", "m20", "vsm", "vsr", "vss"] as const;
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];
