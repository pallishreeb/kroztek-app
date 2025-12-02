"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from "firebase/firestore";
import { CarouselSlide } from "@/types/carousel";
import { Trash2, Edit, Plus, GripVertical, Eye, EyeOff, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminCarouselPage() {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlides = async () => {
    try {
      const slidesRef = collection(db, "carouselSlides");
      const q = query(slidesRef, orderBy("order", "asc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CarouselSlide[];
      setSlides(data);
    } catch (error) {
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    try {
      await deleteDoc(doc(db, "carouselSlides", id));
      setSlides(slides.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting slide:", error);
      alert("Failed to delete slide");
    }
  };

  const toggleActive = async (slide: CarouselSlide) => {
    try {
      await updateDoc(doc(db, "carouselSlides", slide.id!), {
        isActive: !slide.isActive,
      });
      setSlides(slides.map((s) => 
        s.id === slide.id ? { ...s, isActive: !s.isActive } : s
      ));
    } catch (error) {
      console.error("Error toggling slide:", error);
    }
  };

  const moveSlide = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === slides.length - 1) return;

    const newSlides = [...slides];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    
    // Swap orders
    const tempOrder = newSlides[index].order;
    newSlides[index].order = newSlides[swapIndex].order;
    newSlides[swapIndex].order = tempOrder;

    // Swap positions in array
    [newSlides[index], newSlides[swapIndex]] = [newSlides[swapIndex], newSlides[index]];

    try {
      // Update both in Firestore
      await updateDoc(doc(db, "carouselSlides", slides[index].id!), {
        order: newSlides.find(s => s.id === slides[index].id)?.order,
      });
      await updateDoc(doc(db, "carouselSlides", slides[swapIndex].id!), {
        order: newSlides.find(s => s.id === slides[swapIndex].id)?.order,
      });
      setSlides(newSlides);
    } catch (error) {
      console.error("Error reordering slides:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Carousel Slides</h1>
        <Link
          href="/admin/carousel/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} /> Add Slide
        </Link>
      </div>

      {slides.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No carousel slides yet.</p>
          <Link href="/admin/carousel/new" className="text-blue-600 hover:underline">
            Add your first slide
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`bg-white rounded-lg shadow p-4 flex items-center gap-4 ${
                !slide.isActive ? "opacity-60" : ""
              }`}
            >
              {/* Reorder buttons */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveSlide(index, "up")}
                  disabled={index === 0}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveSlide(index, "down")}
                  disabled={index === slides.length - 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <ArrowDown size={16} />
                </button>
              </div>

              {/* Image thumbnail */}
              <div className="w-32 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Slide info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{slide.title}</h3>
                <p className="text-sm text-gray-500 truncate">{slide.subtitle}</p>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  slide.type === "banner" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                }`}>
                  {slide.type}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleActive(slide)}
                  className={`p-2 rounded ${
                    slide.isActive
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                  title={slide.isActive ? "Hide slide" : "Show slide"}
                >
                  {slide.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <Link
                  href={`/admin/carousel/${slide.id}`}
                  className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  title="Edit slide"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(slide.id!)}
                  className="p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  title="Delete slide"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

