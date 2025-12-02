// types/carousel.ts
import { Timestamp } from "firebase/firestore";

// Carousel slide type for Firestore
export interface CarouselSlide {
  id?: string;
  image: string;           // Image URL (uploaded to Firebase Storage)
  title: string;           // Main heading
  subtitle: string;        // Secondary heading
  description: string;     // Description text
  type: "banner" | "logo"; // Slide type - banner shows overlay, logo shows centered
  order: number;           // Display order
  isActive: boolean;       // Whether to show this slide
  buttonText?: string;     // Optional CTA button text
  buttonLink?: string;     // Optional CTA button link
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string;
  updatedBy?: string;
}

// Form data for creating/editing carousel slides
export interface CarouselFormData {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  type: "banner" | "logo";
  order: number;
  isActive: boolean;
  buttonText: string;
  buttonLink: string;
}

// Initial empty form data
export const EMPTY_CAROUSEL_FORM: CarouselFormData = {
  image: "",
  title: "",
  subtitle: "",
  description: "",
  type: "banner",
  order: 0,
  isActive: true,
  buttonText: "Browse Products",
  buttonLink: "/series",
};

