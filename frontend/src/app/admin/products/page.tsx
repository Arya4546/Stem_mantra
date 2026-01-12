"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUpload, MultiImageUpload } from "@/components/ui/ImageUpload";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  IndianRupee,
  Tag,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
  X,
  Upload,
  AlertCircle,
  Loader2,
  RefreshCw,
  Star,
  Archive,
  Check,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type ProductType = "PHYSICAL" | "DIGITAL" | "COURSE" | "KIT";
type ProductStatus = "ACTIVE" | "DRAFT" | "ARCHIVED";

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  type: ProductType;
  status: ProductStatus;
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  description: string;
  features: string[];
  thumbnail?: string;
  images: string[];
  trackInventory: boolean;
  quantity: number;
  lowStockAlert: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  categories?: { category: ProductCategory }[];
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  slug: string;
  sku: string;
  type: ProductType;
  status: ProductStatus;
  price: string;
  compareAtPrice: string;
  shortDescription: string;
  description: string;
  features: string;
  thumbnail: string;
  images: string;
  trackInventory: boolean;
  quantity: string;
  lowStockAlert: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  categoryIds: string[];
}

const initialFormData: ProductFormData = {
  name: "",
  slug: "",
  sku: "",
  type: "PHYSICAL",
  status: "DRAFT",
  price: "",
  compareAtPrice: "",
  shortDescription: "",
  description: "",
  features: "",
  thumbnail: "",
  images: "",
  trackInventory: false,
  quantity: "0",
  lowStockAlert: "5",
  isFeatured: false,
  isNew: false,
  isBestSeller: false,
  categoryIds: [],
};

const productTypes: { value: ProductType; label: string }[] = [
  { value: "PHYSICAL", label: "Physical" },
  { value: "DIGITAL", label: "Digital" },
  { value: "COURSE", label: "Course" },
  { value: "KIT", label: "Kit" },
];

const productStatuses: { value: ProductStatus; label: string; color: string }[] = [
  { value: "ACTIVE", label: "Active", color: "bg-green-100 text-green-700" },
  { value: "DRAFT", label: "Draft", color: "bg-yellow-100 text-yellow-700" },
  { value: "ARCHIVED", label: "Archived", color: "bg-slate-100 text-slate-700" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  
  // Modal states
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [formLoading, setFormLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    outOfStock: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12",
        ...(searchQuery && { search: searchQuery }),
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        // Always send status - 'all' means fetch all statuses
        status: selectedStatus === "all" ? "all" : selectedStatus,
        ...(selectedType !== "all" && { type: selectedType }),
      });

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/products?${params}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      setProducts(result.data || []);
      setTotalPages(result.pagination?.totalPages || 1);
      setTotalProducts(result.pagination?.total || 0);
      
      // Calculate stats from fetched data
      const allProducts = result.data || [];
      setStats({
        total: result.pagination?.total || allProducts.length,
        active: allProducts.filter((p: Product) => p.status === "ACTIVE").length,
        draft: allProducts.filter((p: Product) => p.status === "DRAFT").length,
        outOfStock: allProducts.filter((p: Product) => p.trackInventory && p.quantity === 0).length,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedCategory, selectedStatus, selectedType]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/products/categories`);
      if (response.ok) {
        const result = await response.json();
        setCategories(result.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Lock body scroll when modal is open - more comprehensive approach
  useEffect(() => {
    if (showProductModal || showDeleteModal) {
      // Get current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
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
    };
  }, [showProductModal, showDeleteModal]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const generateSku = () => {
    return `SKU-${Date.now().toString(36).toUpperCase()}`;
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        type: product.type,
        status: product.status,
        price: product.price.toString(),
        compareAtPrice: product.compareAtPrice?.toString() || "",
        shortDescription: product.shortDescription || "",
        description: product.description,
        features: product.features?.join("\n") || "",
        thumbnail: product.thumbnail || "",
        images: product.images?.join("\n") || "",
        trackInventory: product.trackInventory,
        quantity: product.quantity.toString(),
        lowStockAlert: product.lowStockAlert.toString(),
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller,
        categoryIds: product.categories?.map((c) => c.category.id) || [],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        ...initialFormData,
        sku: generateSku(),
      });
    }
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setEditingProduct(null);
    setFormData(initialFormData);
  };

  const handleFormChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name" && !editingProduct) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setFormLoading(true);
      const token = localStorage.getItem("accessToken");
      
      const payload = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        sku: formData.sku || generateSku(),
        type: formData.type,
        status: formData.status,
        price: parseFloat(formData.price),
        compareAtPrice: formData.compareAtPrice ? parseFloat(formData.compareAtPrice) : null,
        shortDescription: formData.shortDescription || null,
        description: formData.description,
        features: formData.features.split("\n").filter(Boolean),
        thumbnail: formData.thumbnail || null,
        images: formData.images.split("\n").filter(Boolean),
        trackInventory: formData.trackInventory,
        quantity: parseInt(formData.quantity) || 0,
        lowStockAlert: parseInt(formData.lowStockAlert) || 5,
        isFeatured: formData.isFeatured,
        isNew: formData.isNew,
        isBestSeller: formData.isBestSeller,
        categoryIds: formData.categoryIds,
      };

      const url = editingProduct
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`;
      
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      toast.success(editingProduct ? "Product updated successfully" : "Product created successfully");
      handleCloseModal();
      fetchProducts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/products/${productToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/products/${productId}/stock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stock: newStock }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      toast.success("Stock updated successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to update stock");
    }
  };

  const getStatusColor = (status: ProductStatus) => {
    const statusConfig = productStatuses.find((s) => s.value === status);
    return statusConfig?.color || "bg-slate-100 text-slate-700";
  };

  const getTypeColor = (type: ProductType) => {
    switch (type) {
      case "PHYSICAL":
        return "bg-blue-100 text-blue-700";
      case "DIGITAL":
        return "bg-purple-100 text-purple-700";
      case "COURSE":
        return "bg-green-100 text-green-700";
      case "KIT":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  if (loading && products.length === 0) {
    return (
      <AdminLayout title="Products">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading products...</p>
        </div>
      </div>
      </AdminLayout>
    );
  }

  if (error && products.length === 0) {
    return (
      <AdminLayout title="Products">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-slate-900 font-medium mb-2">Failed to load products</p>
          <p className="text-slate-600 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Products">
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600">Manage your product catalog</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Products</p>
              <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Active</p>
              <p className="text-xl font-bold text-slate-900">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Drafts</p>
              <p className="text-xl font-bold text-slate-900">{stats.draft}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Out of Stock</p>
              <p className="text-xl font-bold text-slate-900">{stats.outOfStock}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            {productStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            {productTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : "text-slate-500"
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-white shadow-sm" : "text-slate-500"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={fetchProducts}
            className="p-2.5 border border-slate-200 rounded-lg hover:bg-slate-50"
            title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Package className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
          <p className="text-slate-600 mb-4">
            {searchQuery || selectedStatus !== "all" || selectedType !== "all"
              ? "Try adjusting your filters"
              : "Get started by creating your first product"}
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-slate-100">
                {product.thumbnail && product.thumbnail.length > 0 ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-slate-300" />
                  </div>
                )}
                {product.isFeatured && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </div>
                )}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900 line-clamp-1">{product.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(product.type)}`}>
                    {product.type}
                  </span>
                  <span className="text-xs text-slate-500">SKU: {product.sku}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
                  {product.compareAtPrice && product.compareAtPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                {product.trackInventory && (
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-600">Stock:</span>
                    <span className={product.quantity <= product.lowStockAlert ? "text-red-600 font-medium" : "text-slate-900"}>
                      {product.quantity} units
                    </span>
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <Edit className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setProductToDelete(product);
                      setShowDeleteModal(true);
                    }}
                    className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">SKU</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 relative overflow-hidden flex-shrink-0">
                          {product.thumbnail && product.thumbnail.length > 0 ? (
                            <Image
                              src={product.thumbnail}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          {product.isFeatured && (
                            <span className="text-xs text-yellow-600 flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{product.sku}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(product.type)}`}>
                        {product.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium text-slate-900">{formatPrice(product.price)}</span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {product.trackInventory ? (
                        <span className={product.quantity <= product.lowStockAlert ? "text-red-600 font-medium" : "text-slate-900"}>
                          {product.quantity}
                        </span>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-600">
            Showing {(page - 1) * 12 + 1} to {Math.min(page * 12, totalProducts)} of {totalProducts} products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                    page === pageNum
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col my-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleFormChange("slug", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      SKU *
                    </label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => handleFormChange("sku", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleFormChange("type", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {productTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleFormChange("status", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {productStatuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleFormChange("price", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Compare at Price (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.compareAtPrice}
                      onChange={(e) => handleFormChange("compareAtPrice", e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => handleFormChange("shortDescription", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    maxLength={200}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => handleFormChange("features", e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                {/* Media */}
                <div className="grid md:grid-cols-2 gap-6">
                  <ImageUpload
                    value={formData.thumbnail}
                    onChange={(url) => handleFormChange("thumbnail", url)}
                    folder="products"
                    label="Product Thumbnail"
                    placeholder="Upload product thumbnail"
                    aspectRatio="square"
                  />
                  <div>
                    <MultiImageUpload
                      values={formData.images ? formData.images.split("\n").filter(Boolean) : []}
                      onChange={(urls) => handleFormChange("images", urls.join("\n"))}
                      folder="products"
                      label="Additional Images"
                      maxImages={10}
                    />
                  </div>
                </div>

                {/* Inventory */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="trackInventory"
                      checked={formData.trackInventory}
                      onChange={(e) => handleFormChange("trackInventory", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <label htmlFor="trackInventory" className="text-sm font-medium text-slate-700">
                      Track Inventory
                    </label>
                  </div>
                  {formData.trackInventory && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => handleFormChange("quantity", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Low Stock Alert
                        </label>
                        <input
                          type="number"
                          value={formData.lowStockAlert}
                          onChange={(e) => handleFormChange("lowStockAlert", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          min="0"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onChange={(e) => handleFormChange("isFeatured", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
                      Featured
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isNew"
                      checked={formData.isNew}
                      onChange={(e) => handleFormChange("isNew", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <label htmlFor="isNew" className="text-sm font-medium text-slate-700">
                      New Arrival
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isBestSeller"
                      checked={formData.isBestSeller}
                      onChange={(e) => handleFormChange("isBestSeller", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded"
                    />
                    <label htmlFor="isBestSeller" className="text-sm font-medium text-slate-700">
                      Best Seller
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                  disabled={formLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  disabled={formLoading}
                >
                  {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && productToDelete && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Product</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete &ldquo;{productToDelete.name}&rdquo;? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setProductToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
