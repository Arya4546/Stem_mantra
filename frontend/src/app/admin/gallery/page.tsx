"use client";

import { useState, useCallback, useRef, DragEvent, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FileText,
  Users,
  Settings,
  LogOut,
  Upload,
  Trash2,
  X,
  ChevronDown,
  Bell,
  Search,
  Menu,
  Plus,
  Eye,
  FolderOpen,
  Grid3x3,
  List,
  Filter,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { apiClient, PaginatedResponse } from "@/lib/api";

// Types
interface GalleryImage {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description?: string;
  category: string;
  folder: string;
  size: number;
  createdAt: string;
}

interface UploadResponse {
  url: string;
  publicId: string;
  width: number;
  height: number;
}

// Sidebar navigation items
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ImageIcon, label: "Gallery", href: "/admin/gallery", active: true },
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const folders = [
  { id: "gallery", label: "Gallery", count: 24 },
  { id: "blog", label: "Blog Posts", count: 12 },
  { id: "products", label: "Products", count: 8 },
  { id: "avatars", label: "Avatars", count: 45 },
];

// Static demo images
const demoImages: GalleryImage[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    title: "Robotics Workshop",
    category: "Workshop",
    folder: "gallery",
    size: 1024000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    title: "3D Printing Lab",
    category: "Lab",
    folder: "gallery",
    size: 2048000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    title: "Coding Class",
    category: "Class",
    folder: "gallery",
    size: 1536000,
    createdAt: new Date().toISOString(),
  },
];

export default function AdminGalleryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState("gallery");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  // Fetch images
  const { data: images = demoImages, isLoading } = useQuery({
    queryKey: ["admin-gallery", selectedFolder],
    queryFn: async () => {
      // In production, this would call the API
      // const response = await apiClient.get<PaginatedResponse<GalleryImage>>(
      //   `/upload/gallery?folder=${selectedFolder}`
      // );
      // return response.items;
      return demoImages.filter((img) => img.folder === selectedFolder);
    },
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      formData.append("folder", selectedFolder);

      // Simulated upload for demo
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // In production:
      // const response = await apiClient.upload<UploadResponse[]>("/upload/multiple", files, selectedFolder);
      // return response;
      
      return files.map((file) => ({
        url: URL.createObjectURL(file),
        publicId: `demo-${Date.now()}`,
        width: 800,
        height: 600,
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      setUploadModalOpen(false);
      setPendingFiles([]);
      setUploadProgress(null);
      toast.success("Images uploaded successfully!");
    },
    onError: () => {
      toast.error("Failed to upload images");
      setUploadProgress(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      // In production:
      // await Promise.all(ids.map((id) => apiClient.delete(`/upload/${id}`)));
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      setSelectedImages([]);
      toast.success("Images deleted successfully!");
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
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-40 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">SM</span>
            </div>
            {sidebarOpen && (
              <span className="font-bold text-lg">Admin Panel</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                item.active
                  ? "bg-primary text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              router.push("/login");
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-slate-600" />
            </button>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search images..."
                className="pl-10 pr-4 py-2 bg-slate-100 rounded-lg border-0 focus:ring-2 focus:ring-primary/20 w-64"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Admin</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Upload Images
              </button>
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Folders */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedFolder === folder.id
                      ? "bg-primary text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  {folder.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedFolder === folder.id ? "bg-white/20" : "bg-slate-100"
                  }`}>
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-primary text-white" : "text-slate-600"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-primary text-white" : "text-slate-600"
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
                      ? "ring-2 ring-primary"
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
                        ? "bg-primary border-primary"
                        : "bg-white/80 border-slate-300 group-hover:border-primary"
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
                        {formatFileSize(image.size)}
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
                      Size
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
                        {formatFileSize(image.size)}
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
      </main>

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
                  className="flex-1 py-2.5 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
    </div>
  );
}
