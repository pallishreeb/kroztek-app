// components/ProductViewTracker.tsx
"use client";

import { useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface ProductViewTrackerProps {
  productId: string;
  productName: string;
  category: string;
}

export default function ProductViewTracker({ productId, productName, category }: ProductViewTrackerProps) {
  useEffect(() => {
    const trackView = async () => {
      try {
        // Check if this product exists in Firestore analytics
        const analyticsRef = doc(db, "productAnalytics", productId);
        const analyticsSnap = await getDoc(analyticsRef);

        if (analyticsSnap.exists()) {
          // Update existing analytics
          await updateDoc(analyticsRef, {
            viewCount: increment(1),
            lastViewed: serverTimestamp(),
          });
        } else {
          // Create new analytics entry
          await setDoc(analyticsRef, {
            productId,
            productName,
            category,
            viewCount: 1,
            lastViewed: serverTimestamp(),
            createdAt: serverTimestamp(),
          });
        }

        // Also try to update the product document if it exists in Firestore
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          await updateDoc(productRef, {
            viewCount: increment(1),
          });
        }
      } catch (error) {
        // Silently fail - don't break the page if tracking fails
        console.error("Error tracking product view:", error);
      }
    };

    // Track view with a small delay to avoid counting quick bounces
    const timer = setTimeout(trackView, 2000);

    return () => clearTimeout(timer);
  }, [productId, productName, category]);

  // This component doesn't render anything
  return null;
}

