"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Filter,
  ShoppingCart,
  Star,
  Package,
  Tag,
  X,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// ============================================
// Types
// ============================================

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  type: string;
  status: string;
  price: number;
  compareAtPrice?: number;
  shortDescription?: string;
  description: string;
  features?: string[];
  thumbnail?: string;
  images?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  quantity?: number;
  trackInventory?: boolean;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface Cart {
  id: string;
  items: CartItem[];
}

// ============================================
// Product Type Config
// ============================================

const productTypeLabels: Record<string, string> = {
  PHYSICAL: "Kit",
  DIGITAL: "Digital",
  SUBSCRIPTION: "Subscription",
  COURSE: "Course",
  BUNDLE: "Bundle",
};

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// ============================================
// Store Page Component
// ============================================

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, currentPage]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", "12");
      params.append("status", "ACTIVE");
      if (selectedType) {
        params.append("type", selectedType);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await apiClient.getPaginated<Product>(`/products?${params.toString()}`);
      setProducts(response.data || []);
      setPagination(response.meta || null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCartCount = async () => {
    try {
      const cart = await apiClient.get<Cart>("/products/cart/me");
      if (cart?.items) {
        const count = cart.items.reduce(
          (acc: number, item: CartItem) => acc + item.quantity,
          0
        );
        setCartCount(count);
      }
    } catch {
      // Cart may not exist yet
    }
  };

  const handleAddToCart = async (productId: string) => {
    setAddingToCart(productId);
    try {
      await apiClient.post("/products/cart", {
        productId,
        quantity: 1,
      });
      toast.success("Added to cart!");
      fetchCartCount();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (price: number, compareAtPrice: number) => {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
  };

  // Loading skeleton
  if (isLoading && products.length === 0) {
    return (
      <UserLayout cartCount={cartCount}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout cartCount={cartCount}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Store</h1>
            <p className="text-slate-600 mt-1">
              Shop robotics kits, learning materials, and more
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full sm:w-56 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <Filter className="w-5 h-5 text-slate-600" />
              </button>
            </form>

            {/* Cart Link */}
            <Link
              href="/dashboard/cart"
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
          >
            <p className="text-sm font-medium text-slate-700 mb-3">Product Type</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setSelectedType("");
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === ""
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Products
              </button>
              {Object.entries(productTypeLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => {
                    setSelectedType(value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === value
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active Filter Badge */}
        {selectedType && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Filtered by:</span>
            <button
              onClick={() => setSelectedType("")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              {productTypeLabels[selectedType] || selectedType}
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {products.length > 0 ? (
            products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <div className="group bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <Link
                    href={`/dashboard/store/${product.slug}`}
                    className="relative block aspect-square bg-slate-50"
                  >
                    {(product.thumbnail && product.thumbnail.length > 0) || (product.images?.[0] && product.images[0].length > 0) ? (
                      <Image
                        src={product.thumbnail || product.images?.[0] || ""}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-16 h-16 text-slate-300" />
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-2.5 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                          New
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                          Bestseller
                        </span>
                      )}
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
                          -{calculateDiscount(product.price, product.compareAtPrice)}%
                        </span>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-medium">
                        {productTypeLabels[product.type] || product.type}
                      </span>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    <Link href={`/dashboard/store/${product.slug}`}>
                      <h3 className="font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 min-h-[48px]">
                        {product.name}
                      </h3>
                    </Link>

                    {product.shortDescription && (
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                        {product.shortDescription}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xl font-bold text-slate-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-sm text-slate-400 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    {product.trackInventory && (
                      <div className="mt-2">
                        {product.quantity && product.quantity > 0 ? (
                          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            In Stock
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 font-medium">
                            Out of Stock
                          </span>
                        )}
                      </div>
                    )}

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      disabled={
                        addingToCart === product.id ||
                        (product.trackInventory && (!product.quantity || product.quantity === 0))
                      }
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                    >
                      {addingToCart === product.id ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : "Try adjusting your filters"}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("");
                  }}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let page: number;
                if (pagination.totalPages <= 5) {
                  page = i + 1;
                } else if (currentPage <= 3) {
                  page = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  page = pagination.totalPages - 4 + i;
                } else {
                  page = currentPage - 2 + i;
                }

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(pagination.totalPages, prev + 1))
              }
              disabled={currentPage >= pagination.totalPages}
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
