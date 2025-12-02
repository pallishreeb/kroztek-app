// lib/carousel.ts
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { CarouselSlide } from "@/types/carousel";

const COLLECTION_NAME = "carouselSlides";

// Get all carousel slides (ordered by order field)
export async function getAllSlides(): Promise<CarouselSlide[]> {
  try {
    const slidesRef = collection(db, COLLECTION_NAME);
    const q = query(slidesRef, orderBy("order", "asc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CarouselSlide[];
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    return [];
  }
}

// Get only active carousel slides (for public display)
export async function getActiveSlides(): Promise<CarouselSlide[]> {
  try {
    const slidesRef = collection(db, COLLECTION_NAME);
    const q = query(
      slidesRef,
      where("isActive", "==", true),
      orderBy("order", "asc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CarouselSlide[];
  } catch (error) {
    console.error("Error fetching active carousel slides:", error);
    return [];
  }
}

// Get a single slide by ID
export async function getSlideById(id: string): Promise<CarouselSlide | null> {
  try {
    const slideRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(slideRef);

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as CarouselSlide;
  } catch (error) {
    console.error("Error fetching slide:", error);
    return null;
  }
}

// Default slides to use as fallback if Firestore is empty
export const DEFAULT_SLIDES: CarouselSlide[] = [
  {
    id: "default-1",
    image: "/banner1.jpg",
    title: "Authorized Dealer",
    subtitle: "CG Emotron Industrial Solutions",
    description: "Premium quality drives and automation solutions for your industrial needs",
    type: "banner",
    order: 1,
    isActive: true,
    buttonText: "Browse Products",
    buttonLink: "/series",
  },
  {
    id: "default-2",
    image: "/banner2.jpg",
    title: "Industrial Drives",
    subtitle: "Shaft Power Solutions",
    description: "Advanced motor control systems and power transmission solutions",
    type: "banner",
    order: 2,
    isActive: true,
    buttonText: "Browse Products",
    buttonLink: "/series",
  },
  {
    id: "default-3",
    image: "/banner5.jpg",
    title: "Reliable Service",
    subtitle: "24/7 Support & Maintenance",
    description: "Expert technical support and comprehensive maintenance services",
    type: "banner",
    order: 3,
    isActive: true,
    buttonText: "Browse Products",
    buttonLink: "/series",
  },
  {
    id: "default-4",
    image: "/cgemotron.png",
    title: "CG Emotron",
    subtitle: "Official Partner",
    description: "",
    type: "logo",
    order: 4,
    isActive: true,
    buttonText: "",
    buttonLink: "",
  },
];

