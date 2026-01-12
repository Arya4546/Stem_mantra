"use client";

import { useState, useCallback, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  X,
  Plus,
  Eye,
  FolderOpen,
  Grid3x3,
  List,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { apiClient, PaginatedResponse } from "@/lib/api-client";

// Types
interface GalleryImage {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: string;
  tags?: string[];
  type?: string;
  isPublished?: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt?: string;
}

interface UploadResponse {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

// Categories instead of folders to match backend
const categories = [
  { id: "workshop", label: "Workshops", count: 0 },
  { id: "lab", label: "Labs", count: 0 },
  { id: "class", label: "Classes", count: 0 },
  { id: "event", label: "Events", count: 0 },
  { id: "campus", label: "Campus", count: 0 },
  { id: "other", label: "Other", count: 0 },
];

export default function AdminGalleryPage() {
  const queryClient = useQueryClient();
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("workshop");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");

  // Lock body scroll when modal is open - comprehensive approach
  useEffect(() => {
    if (uploadModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, [uploadModalOpen]);

  // Fetch images from real API
  const { data: galleryData, isLoading } = useQuery({
    queryKey: ["admin-gallery", selectedCategory],
    queryFn: async () => {
      // apiClient.get returns response.data.data which is the array directly
      const images = await apiClient.get<GalleryImage[]>(
        `/content/gallery?category=${selectedCategory}&limit=50`
      );
      return images;
    },
  });
  
  const images = galleryData || [];

  // Upload mutation - first upload image, then create gallery item
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const results = [];
      for (const file of files) {
        // Step 1: Upload image to cloudinary
        const uploadResponse = await apiClient.upload<{
          url: string;
          publicId: string;
          width: number;
          height: number;
        }>("/upload/image", file, "image");
        
        // Step 2: Create gallery item in database
        const galleryItem = await apiClient.post<GalleryImage>("/content/gallery", {
          title: newImageTitle || file.name.split('.')[0],
          description: newImageDescription || undefined,
          url: uploadResponse.url,
          thumbnail: uploadResponse.url,
          category: selectedCategory,
          type: "IMAGE",
          isPublished: true,
        });
        
        results.push(galleryItem);
      }
      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      setUploadModalOpen(false);
      setPendingFiles([]);
      setUploadProgress(null);
      setNewImageTitle("");
      setNewImageDescription("");
      toast.success("Images uploaded successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload images");
      setUploadProgress(null);
    },
  });

  // Delete mutation - delete from gallery table
  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => apiClient.delete(`/content/gallery/${id}`)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      setSelectedImages([]);
      toast.success("Images deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete images");
    },
  });

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isImage) {
        toast.error(`${file.name} is not an image`);
      } else if (!isValidSize) {
        toast.error(`${file.name} is too large (max 5MB)`);
      }
      return isImage && isValidSize;
    });
    setPendingFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isValidSize = file.size <= 5 * 1024 * 1024;
      return isImage && isValidSize;
    });
    setPendingFiles((prev) => [...prev, ...validFiles]);
  };

  const handleUpload = () => {
    if (pendingFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }
    setUploadProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    uploadMutation.mutate(pendingFiles);
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedImages.length === 0) return;
    deleteMutation.mutate(selectedImages);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout title="Gallery">
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gallery Management</h1>
          <p className="text-slate-600">Upload and manage images for your website</p>
        </div>

        <div className="flex items-center gap-3">
          {selectedImages.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedImages.length})
            </button>
          )}
          
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Upload Images
          </button>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white rounded-lg p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-indigo-600 text-white" : "text-slate-600"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-indigo-600 text-white" : "text-slate-600"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Grid/List */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-slate-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`group relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all ${
                selectedImages.includes(image.id)
                  ? "ring-2 ring-indigo-600"
                  : "hover:shadow-md"
              }`}
              onClick={() => toggleImageSelection(image.id)}
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover"
              />
              
              {/* Selection indicator */}
              <div
                className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedImages.includes(image.id)
                    ? "bg-indigo-600 border-indigo-600"
                    : "bg-white/80 border-slate-300 group-hover:border-indigo-600"
                }`}
              >
                {selectedImages.includes(image.id) && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium truncate">
                    {image.title}
                  </p>
                  <p className="text-white/70 text-xs">
                    {image.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedImages(images.map((i) => i.id));
                      } else {
                        setSelectedImages([]);
                      }
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {images.map((image) => (
                <tr key={image.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.id)}
                      onChange={() => toggleImageSelection(image.id)}
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.title}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {image.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {image.category}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className="px-2 py-1 text-xs rounded-full bg-slate-100">
                      {image.type || "IMAGE"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-100 rounded">
                        <Eye className="w-4 h-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate([image.id])}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Upload Images</h2>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Dropzone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 hover:border-primary"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">
                  {isDragActive
                    ? "Drop the files here..."
                    : "Drag & drop images here, or click to select"}
                </p>
                <p className="text-sm text-slate-400">
                  PNG, JPG, GIF, WebP up to 5MB (max 10 files)
                </p>
              </div>

              {/* Pending files */}
              {pendingFiles.length > 0 && (
                <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
                  {pendingFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-slate-50 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">
                            {file.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          setPendingFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          )
                        }
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        <X className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Title and Description fields */}
              {pendingFiles.length > 0 && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                      placeholder="Enter image title"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Description (optional)
                    </label>
                    <textarea
                      value={newImageDescription}
                      onChange={(e) => setNewImageDescription(e.target.value)}
                      placeholder="Enter image description"
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {uploadProgress !== null && (
                <div className="mt-4">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2 text-center">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={pendingFiles.length === 0 || uploadMutation.isPending}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploadMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  Upload
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
