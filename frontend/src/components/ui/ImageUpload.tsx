"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, ImageIcon, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: "products" | "gallery" | "blog" | "avatars" | "banners" | "testimonials" | "courses" | "general";
  label?: string;
  placeholder?: string;
  aspectRatio?: "square" | "video" | "banner" | "portrait";
  maxSize?: number; // in MB
  disabled?: boolean;
  className?: string;
}

interface MultiImageUploadProps {
  values?: string[];
  onChange: (urls: string[]) => void;
  folder?: "products" | "gallery" | "blog" | "avatars" | "banners" | "testimonials" | "courses" | "general";
  label?: string;
  maxImages?: number;
  maxSize?: number; // in MB
  disabled?: boolean;
  className?: string;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  banner: "aspect-[3/1]",
  portrait: "aspect-[3/4]",
};

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  label,
  placeholder = "Click or drag to upload",
  aspectRatio = "square",
  maxSize = 5,
  disabled = false,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("folder", folder);

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/upload/image`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      const result = await response.json();
      onChange(result.data.secureUrl || result.data.url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }, [folder, maxSize, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled || isUploading) return;
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }, [disabled, isUploading, handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      
      <div
        className={`relative ${aspectRatioClasses[aspectRatio]} w-full rounded-xl border-2 border-dashed transition-all overflow-hidden ${
          isDragging
            ? "border-indigo-500 bg-indigo-50"
            : value
            ? "border-slate-200 bg-slate-50"
            : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && !isUploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled || isUploading}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-white/80"
            >
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              <span className="mt-2 text-sm text-slate-600">Uploading...</span>
            </motion.div>
          ) : value ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Image
                src={value}
                alt="Uploaded image"
                fill
                className="object-cover"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                {isDragging ? (
                  <Upload className="w-6 h-6 text-indigo-600" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-indigo-600" />
                )}
              </div>
              <p className="text-sm font-medium text-slate-700">
                {isDragging ? "Drop image here" : placeholder}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, WebP up to {maxSize}MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function MultiImageUpload({
  values = [],
  onChange,
  folder = "general",
  label,
  maxImages = 10,
  maxSize = 5,
  disabled = false,
  className = "",
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (files: FileList) => {
    const validFiles: File[] = [];
    
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return;
      }
      if (file.size > maxSize * 1024 * 1024) {
        toast.error(`${file.name} is too large (max ${maxSize}MB)`);
        return;
      }
      validFiles.push(file);
    });

    if (validFiles.length === 0) return;

    // Check max images limit
    const remainingSlots = maxImages - values.length;
    if (validFiles.length > remainingSlots) {
      toast.error(`Can only upload ${remainingSlots} more image(s)`);
      validFiles.splice(remainingSlots);
    }

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      validFiles.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("folder", folder);

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/upload/images`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      const result = await response.json();
      const newUrls = result.data.map((img: { secureUrl?: string; url: string }) => 
        img.secureUrl || img.url
      );
      onChange([...values, ...newUrls]);
      toast.success(`${newUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  }, [folder, maxSize, maxImages, values, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files);
    }
    // Reset input so same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (disabled || isUploading) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleUpload(files);
    }
  }, [disabled, isUploading, handleUpload]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = (index: number) => {
    const newValues = [...values];
    newValues.splice(index, 1);
    onChange(newValues);
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    const newValues = [...values];
    const [removed] = newValues.splice(fromIndex, 1);
    newValues.splice(toIndex, 0, removed);
    onChange(newValues);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          <span className="text-slate-400 font-normal ml-2">
            ({values.length}/{maxImages})
          </span>
        </label>
      )}

      <div className="space-y-4">
        {/* Image Grid */}
        {values.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {values.map((url, index) => (
              <motion.div
                key={url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-50 group"
              >
                <Image
                  src={url}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {!disabled && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => handleReorder(index, 0)}
                        className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-xs font-medium"
                      >
                        Main
                      </button>
                    )}
                  </div>
                )}
                {index === 0 && (
                  <span className="absolute top-1 left-1 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded">
                    Main
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Upload Area */}
        {values.length < maxImages && (
          <div
            className={`relative h-32 rounded-xl border-2 border-dashed transition-all ${
              isDragging
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"
            } ${disabled || isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !disabled && !isUploading && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={disabled || isUploading}
              className="hidden"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  <span className="mt-2 text-sm text-slate-600">Uploading...</span>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                    {isDragging ? (
                      <Upload className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {isDragging ? "Drop images here" : "Add more images"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PNG, JPG, WebP up to {maxSize}MB each
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
