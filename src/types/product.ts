// types/product.ts
import { Timestamp } from "firebase/firestore";
import { ProductCategory } from "@/lib/firebase";

// Technical spec row for the product table
export interface TechnicalSpec {
  parameter: string;
  specification: string;
}

// Product type for Firestore - ONLY product-specific fields
// Category-level data (features, benefits, applications, etc.) comes from CategoryData
export interface FirestoreProduct {
  id?: string;
  name: string;
  category: ProductCategory;
  price: number | string;
  description: string;              // Short product-specific description
  image?: string;                   // Optional: override category image

  // Product-specific technical details (shown in table)
  gst?: string;
  sku?: string;
  series?: string;
  model?: string;
  mainsVoltage?: string;
  kw?: string;
  hp?: string;
  amps?: string;
  weight?: string;
  range?: string;                   // e.g., "0.75 - 55 kW"
  rangeA?: string;                  // e.g., "2.5 - 112 Amps"

  // Technical specifications table (product-specific)
  technicalSpecs?: TechnicalSpec[];

  // Analytics fields
  viewCount?: number;

  // Timestamps
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string;
  updatedBy?: string;

  // Status
  isActive?: boolean;
}

// Form data for creating/editing products (admin form)
export interface ProductFormData {
  name: string;
  category: ProductCategory;
  price: string;
  description: string;
  image?: string;
  gst: string;
  sku: string;
  series: string;
  model: string;
  mainsVoltage: string;
  kw: string;
  hp: string;
  amps: string;
  weight: string;
  range: string;
  rangeA: string;
  // Technical specs as JSON string for form input
  technicalSpecs: string;
  isActive: boolean;
}

// Initial empty form data
export const EMPTY_PRODUCT_FORM: ProductFormData = {
  name: "",
  category: "vsx",
  price: "",
  description: "",
  image: "",
  gst: "18",
  sku: "",
  series: "",
  model: "",
  mainsVoltage: "",
  kw: "",
  hp: "",
  amps: "",
  weight: "",
  range: "",
  rangeA: "",
  technicalSpecs: "[]",
  isActive: true,
};

// API Response types
export interface ProductApiResponse {
  success: boolean;
  data?: FirestoreProduct | FirestoreProduct[];
  error?: string;
  message?: string;
}

// Analytics type
export interface ProductAnalytics {
  productId: string;
  productName: string;
  viewCount: number;
  category: ProductCategory;
  lastViewed?: Timestamp;
}

