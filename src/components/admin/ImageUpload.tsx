// components/admin/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
}

export default function ImageUpload({ currentImage, onImageUploaded }: ImageUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(currentImage || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image (JPEG, PNG, WebP, or GIF)");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    setUploading(true);

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("adminEmail", user?.email || "");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Upload failed");
      }

      onImageUploaded(result.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setPreview(currentImage || "");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onImageUploaded("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {/* Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Upload Input */}
      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
            uploading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
          }`}
        >
          {uploading ? "Uploading..." : preview ? "Change Image" : "Upload Image"}
        </label>
        
        {/* URL Input */}
        <span className="text-gray-400 text-sm">or</span>
        <input
          type="text"
          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
            onImageUploaded(e.target.value);
          }}
          placeholder="Paste image URL"
          className="flex-1 border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

