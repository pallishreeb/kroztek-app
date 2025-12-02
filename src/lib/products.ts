// lib/products.ts
// Utility functions to fetch products from Firestore

import { db, ProductCategory } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { FirestoreProduct } from "@/types/product";
import { DEFAULT_CATEGORIES, CategoryData } from "@/types/category";

// Full product type that merges Firestore product data with category data
export interface FullProduct extends Omit<FirestoreProduct, 'id'> {
  // ID is required for display (from Firestore doc id)
  id: string;
  // Category-level fields (merged from DEFAULT_CATEGORIES)
  features: string[];
  benefits: string[];
  applications: string[];
  seriesRange: string[];
  tags: string[];
  displayName: string;
  modelInfo: string;
}

// Merge product data with category data
function mergeWithCategoryData(product: FirestoreProduct): FullProduct {
  const categoryData: CategoryData = DEFAULT_CATEGORIES[product.category] || DEFAULT_CATEGORIES.vsx;
  
  return {
    ...product,
    // Use product image if set, otherwise use category default
    image: product.image || categoryData.image,
    // Merge category-level data
    features: categoryData.features,
    benefits: categoryData.benefits,
    applications: categoryData.applications,
    seriesRange: categoryData.seriesRange,
    tags: categoryData.tags,
    displayName: categoryData.displayName,
    modelInfo: categoryData.modelInfo,
  };
}

// Fetch all products from Firestore
export async function getAllProducts(activeOnly: boolean = true): Promise<FullProduct[]> {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    let products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreProduct[];

    // Filter active products if needed
    if (activeOnly) {
      products = products.filter((p) => p.isActive !== false);
    }

    // Merge with category data
    return products.map(mergeWithCategoryData);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch products by category
export async function getProductsByCategory(
  category: ProductCategory,
  activeOnly: boolean = true
): Promise<FullProduct[]> {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    let products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreProduct[];

    if (activeOnly) {
      products = products.filter((p) => p.isActive !== false);
    }

    return products.map(mergeWithCategoryData);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

// Fetch a single product by ID
export async function getProductById(productId: string): Promise<FullProduct | null> {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const product = {
      id: docSnap.id,
      ...docSnap.data(),
    } as FirestoreProduct;

    return mergeWithCategoryData(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get unique categories that have products
export async function getCategoriesWithProducts(): Promise<ProductCategory[]> {
  try {
    const products = await getAllProducts();
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories) as ProductCategory[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

