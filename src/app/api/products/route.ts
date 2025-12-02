// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { SUPER_ADMIN_EMAILS, PRODUCT_CATEGORIES } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { FirestoreProduct } from "@/types/product";

// GET - Fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const activeOnly = searchParams.get("activeOnly") !== "false";

    let q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    // Filter by category if provided
    if (category && PRODUCT_CATEGORIES.includes(category as typeof PRODUCT_CATEGORIES[number])) {
      q = query(
        collection(db, "products"),
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
    }

    const querySnapshot = await getDocs(q);
    
    let products: FirestoreProduct[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirestoreProduct[];

    // Filter active products for public view
    if (activeOnly) {
      products = products.filter((p) => p.isActive !== false);
    }

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Create a new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminEmail, product } = body;

    // Validate admin access
    if (!adminEmail || !SUPER_ADMIN_EMAILS.includes(adminEmail)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!product.name || !product.category || !product.price || !product.description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: name, category, price, description" },
        { status: 400 }
      );
    }

    // Validate category
    if (!PRODUCT_CATEGORIES.includes(product.category)) {
      return NextResponse.json(
        { success: false, error: `Invalid category. Must be one of: ${PRODUCT_CATEGORIES.join(", ")}` },
        { status: 400 }
      );
    }

    // Prepare product data - only product-specific fields
    // Category-level data (features, benefits, applications) comes from CategoryData
    const productData: Omit<FirestoreProduct, "id"> = {
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image || "",           // Optional: override category image
      gst: product.gst || "18",
      sku: product.sku || "",
      series: product.series || product.category.toUpperCase(),
      model: product.model || "",
      mainsVoltage: product.mainsVoltage || "",
      kw: product.kw || "",
      hp: product.hp || "",
      amps: product.amps || "",
      weight: product.weight || "",
      range: product.range || "",
      rangeA: product.rangeA || "",
      technicalSpecs: product.technicalSpecs || [],
      viewCount: 0,
      isActive: product.isActive !== false,
      createdAt: serverTimestamp() as FirestoreProduct["createdAt"],
      updatedAt: serverTimestamp() as FirestoreProduct["updatedAt"],
      createdBy: adminEmail,
      updatedBy: adminEmail,
    };

    const docRef = await addDoc(collection(db, "products"), productData);

    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...productData },
      message: "Product created successfully",
    });
  } catch (error) {
    console.error("Error creating product:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create product";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

