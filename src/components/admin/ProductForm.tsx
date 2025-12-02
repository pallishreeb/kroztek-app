// components/admin/ProductForm.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { PRODUCT_CATEGORIES } from "@/lib/firebase";
import { FirestoreProduct, ProductFormData, EMPTY_PRODUCT_FORM, TechnicalSpec } from "@/types/product";
import { DEFAULT_CATEGORIES } from "@/types/category";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  initialData?: FirestoreProduct;
  onSubmit: (data: Partial<FirestoreProduct>) => Promise<void>;
  isEdit?: boolean;
}

export default function ProductForm({ initialData, onSubmit, isEdit = false }: ProductFormProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with existing data or empty
  const [formData, setFormData] = useState<ProductFormData>(() => {
    if (initialData) {
      return {
        name: initialData.name || "",
        category: initialData.category || "vsx",
        price: String(initialData.price || ""),
        description: initialData.description || "",
        image: initialData.image || "",
        gst: initialData.gst || "18",
        sku: initialData.sku || "",
        series: initialData.series || "",
        model: initialData.model || "",
        mainsVoltage: initialData.mainsVoltage || "",
        kw: initialData.kw || "",
        hp: initialData.hp || "",
        amps: initialData.amps || "",
        weight: initialData.weight || "",
        range: initialData.range || "",
        rangeA: initialData.rangeA || "",
        technicalSpecs: JSON.stringify(initialData.technicalSpecs || [], null, 2),
        isActive: initialData.isActive !== false,
      };
    }
    return EMPTY_PRODUCT_FORM;
  });

  // Technical specs as editable rows
  const [specs, setSpecs] = useState<TechnicalSpec[]>(() => {
    if (initialData?.technicalSpecs) return initialData.technicalSpecs;
    return [{ parameter: "", specification: "" }];
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSpecChange = (index: number, field: "parameter" | "specification", value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpecRow = () => {
    setSpecs([...specs, { parameter: "", specification: "" }]);
  };

  const removeSpecRow = (index: number) => {
    if (specs.length > 1) {
      setSpecs(specs.filter((_, i) => i !== index));
    }
  };

  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error("Please fill in all required fields");
      }

      // Filter out empty spec rows
      const filteredSpecs = specs.filter((s) => s.parameter.trim() && s.specification.trim());

      const productData: Partial<FirestoreProduct> = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        description: formData.description,
        image: formData.image || DEFAULT_CATEGORIES[formData.category].image,
        gst: formData.gst,
        sku: formData.sku,
        series: formData.series || formData.category.toUpperCase(),
        model: formData.model,
        mainsVoltage: formData.mainsVoltage,
        kw: formData.kw,
        hp: formData.hp,
        amps: formData.amps,
        weight: formData.weight,
        range: formData.range,
        rangeA: formData.rangeA,
        technicalSpecs: filteredSpecs,
        isActive: formData.isActive,
      };

      await onSubmit(productData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()} - {DEFAULT_CATEGORIES[cat].displayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price & SKU */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GST (%)</label>
          <input
            type="text"
            name="gst"
            value={formData.gst}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <ImageUpload currentImage={formData.image} onImageUploaded={handleImageUploaded} />
        <p className="text-xs text-gray-500 mt-1">
          Leave empty to use default category image
        </p>
      </div>

      {/* Technical Details */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Series</label>
            <input type="text" name="series" value={formData.series} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mains Voltage</label>
            <input type="text" name="mainsVoltage" value={formData.mainsVoltage} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">KW</label>
            <input type="text" name="kw" value={formData.kw} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">HP</label>
            <input type="text" name="hp" value={formData.hp} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amps</label>
            <input type="text" name="amps" value={formData.amps} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Range (kW)</label>
            <input type="text" name="range" value={formData.range} onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500" placeholder="e.g. 0.75 - 55 kW" />
          </div>
        </div>
      </div>

      {/* Technical Specs Table */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Technical Specifications Table</h3>
          <button type="button" onClick={addSpecRow}
            className="text-sm text-blue-600 hover:text-blue-800">+ Add Row</button>
        </div>
        <div className="space-y-2">
          {specs.map((spec, idx) => (
            <div key={idx} className="flex gap-2">
              <input type="text" value={spec.parameter} placeholder="Parameter"
                onChange={(e) => handleSpecChange(idx, "parameter", e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm" />
              <input type="text" value={spec.specification} placeholder="Specification"
                onChange={(e) => handleSpecChange(idx, "specification", e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm" />
              <button type="button" onClick={() => removeSpecRow(idx)}
                className="text-red-500 hover:text-red-700 px-2">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Status & Submit */}
      <div className="border-t pt-6 flex items-center justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="isActive" checked={formData.isActive}
            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
            className="rounded border-gray-300" />
          <span className="text-sm text-gray-700">Active (visible on website)</span>
        </label>
        <button type="submit" disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
}

