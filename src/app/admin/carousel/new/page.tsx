"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { useAuth } from "@/app/context/AuthContext";
import { CarouselFormData, EMPTY_CAROUSEL_FORM } from "@/types/carousel";
import ImageUpload from "@/components/admin/ImageUpload";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCarouselSlidePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState<CarouselFormData>(EMPTY_CAROUSEL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.image) {
      setError("Please upload an image");
      setLoading(false);
      return;
    }

    try {
      // Get highest order number
      const slidesRef = collection(db, "carouselSlides");
      const q = query(slidesRef, orderBy("order", "desc"));
      const snapshot = await getDocs(q);
      const maxOrder = snapshot.docs.length > 0 ? (snapshot.docs[0].data().order || 0) : 0;

      const docData = {
        ...formData,
        order: maxOrder + 1,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user?.email || "unknown",
        updatedBy: user?.email || "unknown",
      };

      await addDoc(collection(db, "carouselSlides"), docData);
      router.push("/admin/carousel");
    } catch (err) {
      console.error("Error creating slide:", err);
      setError("Failed to create slide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link href="/admin/carousel" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft size={20} /> Back to Carousel
      </Link>

      <h1 className="text-2xl font-bold mb-6">Add New Slide</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slide Image *
          </label>
          <ImageUpload
            currentImage={formData.image}
            onImageUpload={handleImageUpload}
            folder="carousel"
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended: 1920x600px for banners, 800x400px for logos
          </p>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slide Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="banner">Banner (with text overlay)</option>
            <option value="logo">Logo (centered, no overlay)</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Authorized Dealer"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., CG Emotron Industrial Solutions"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
            placeholder="Brief description shown on the slide"
          />
        </div>

        {/* Button Text & Link (only for banner type) */}
        {formData.type === "banner" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Browse Products"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Link
              </label>
              <input
                type="text"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., /series"
              />
            </div>
          </div>
        )}

        {/* Active Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            id="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Active (show on homepage)
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Slide"}
          </button>
          <Link
            href="/admin/carousel"
            className="px-4 py-2 border rounded hover:bg-gray-50 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

