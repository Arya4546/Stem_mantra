"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  BookOpen,
  Package,
  ArrowRight,
  Star,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// ============================================
// Types
// ============================================

interface WishlistItem {
  id: string;
  type: "course" | "product";
  itemId: string;
  addedAt: string;
  course?: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    price?: number;
    duration?: string;
    type: string;
  };
  product?: {
    id: string;
    name: string;
    slug: string;
    thumbnail?: string;
    price: number;
    compareAtPrice?: number;
  };
}

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ============================================
// Wishlist Page Component
// ============================================

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "courses" | "products">("all");
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<{ items: WishlistItem[] }>("/wishlist/me");
      // Transform API response to match our interface
      const items = response?.items?.map((item: any) => ({
        id: item.id,
        type: item.type === "program" ? "course" : item.type,
        itemId: item.productId || item.programId,
        addedAt: item.createdAt,
        course: item.program ? {
          id: item.program.id,
          name: item.program.name,
          slug: item.program.slug,
          description: item.program.description,
          image: item.program.thumbnail,
          price: item.program.price,
          duration: item.program.duration,
          type: item.program.type,
        } : undefined,
        product: item.product ? {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          thumbnail: item.product.thumbnail,
          price: Number(item.product.price),
          compareAtPrice: item.product.compareAtPrice ? Number(item.product.compareAtPrice) : undefined,
        } : undefined,
      })) || [];
      setWishlistItems(items);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (item: WishlistItem) => {
    setRemovingId(item.id);
    try {
      if (item.type === "product" && item.product) {
        await apiClient.delete(`/wishlist/product/${item.product.id}`);
      } else if (item.type === "course" && item.course) {
        await apiClient.delete(`/wishlist/program/${item.course.id}`);
      }
      setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success("Removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const addToCart = async (productId: string) => {
    try {
      await apiClient.post("/products/cart", { productId, quantity: 1 });
      toast.success("Added to cart!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const filteredItems = wishlistItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "courses") return item.type === "course";
    if (filter === "products") return item.type === "product";
    return true;
  });

  const courseCount = wishlistItems.filter((i) => i.type === "course").length;
  const productCount = wishlistItems.filter((i) => i.type === "product").length;

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Wishlist</h1>
            <p className="text-slate-600 mt-1">
              {wishlistItems.length} items saved for later
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <motion.div variants={itemVariants} className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All ({wishlistItems.length})
          </button>
          <button
            onClick={() => setFilter("courses")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "courses"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Courses ({courseCount})
          </button>
          <button
            onClick={() => setFilter("products")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "products"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Products ({productCount})
          </button>
        </motion.div>

        {/* Wishlist Items */}
        {filteredItems.length > 0 ? (
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {item.type === "course" && item.course ? (
                  <div className="flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                            Course
                          </span>
                          <h3 className="font-semibold text-slate-900 mt-2">
                            {item.course.name}
                          </h3>
                          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                            {item.course.description}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item)}
                          disabled={removingId === item.id}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          {removingId === item.id ? (
                            <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          {item.course.price ? (
                            <span className="font-bold text-slate-900">
                              {formatPrice(item.course.price)}
                            </span>
                          ) : (
                            <span className="text-green-600 font-medium">Free</span>
                          )}
                        </div>
                        <Link
                          href={`/dashboard/courses/${item.course.slug}`}
                          className="flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                        >
                          View Course <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : item.type === "product" && item.product ? (
                  <div className="flex">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                        <Package className="w-10 h-10 text-amber-600" />
                      </div>
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                            Product
                          </span>
                          <h3 className="font-semibold text-slate-900 mt-2">
                            {item.product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeFromWishlist(item)}
                          disabled={removingId === item.id}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          {removingId === item.id ? (
                            <div className="w-5 h-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-slate-900">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.compareAtPrice && (
                          <span className="text-sm text-slate-400 line-through">
                            {formatPrice(item.product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => addToCart(item.product!.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <Link
                          href={`/dashboard/store/${item.product.slug}`}
                          className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="text-center py-16 bg-white rounded-xl border border-slate-200"
          >
            <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-700">Your wishlist is empty</h3>
            <p className="text-slate-500 mt-1 mb-6">
              Save courses and products you like to your wishlist
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/dashboard/courses"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Browse Courses
              </Link>
              <Link
                href="/dashboard/store"
                className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Visit Store
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </UserLayout>
  );
}
