// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { SUPER_ADMIN_EMAILS, PRODUCT_CATEGORIES } from "@/lib/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { FirestoreProduct } from "@/types/product";

// GET - Fetch single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const trackView = searchParams.get("trackView") === "true";

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Increment view count if tracking
    if (trackView) {
      await updateDoc(docRef, {
        viewCount: increment(1),
      });
    }

    const product: FirestoreProduct = {
      id: docSnap.id,
      ...docSnap.data(),
    } as FirestoreProduct;

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update a product (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { adminEmail, product } = body;

    // Validate admin access
    if (!adminEmail || !SUPER_ADMIN_EMAILS.includes(adminEmail)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Validate category if provided
    if (product.category && !PRODUCT_CATEGORIES.includes(product.category)) {
      return NextResponse.json(
        { success: false, error: `Invalid category. Must be one of: ${PRODUCT_CATEGORIES.join(", ")}` },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: Partial<FirestoreProduct> = {
      ...product,
      updatedAt: serverTimestamp() as FirestoreProduct["updatedAt"],
      updatedBy: adminEmail,
    };

    // Remove id from update data if present
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.createdBy;

    await updateDoc(docRef, updateData);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const adminEmail = searchParams.get("adminEmail");

    // Validate admin access
    if (!adminEmail || !SUPER_ADMIN_EMAILS.includes(adminEmail)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin access required" },
        { status: 401 }
      );
    }

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    await deleteDoc(docRef);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

