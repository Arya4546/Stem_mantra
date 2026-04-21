"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Star,
  Package,
  Truck,
  Shield,
  Check,
  Plus,
  Minus,
  Share2,
  ChevronLeft,
  ChevronRight,
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
  specifications?: Record<string, string>;
  thumbnail?: string;
  images?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  quantity?: number;
  trackInventory?: boolean;
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
}

interface Review {
  id: string;
  rating: number;
  title?: string;
  content: string;
  authorName: string;
  createdAt: string;
}

// ============================================
// Product Detail Page Component
// ============================================

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProduct();
      checkWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const productData = await apiClient.get<Product>(`/products/slug/${slug}`);
      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Product not found");
      router.push("/dashboard/store");
    } finally {
      setIsLoading(false);
    }
  };

  const checkWishlist = async () => {
    try {
      const wishlist = await apiClient.get<{ items: { productId: string }[] }>("/wishlist/me");
      const isInList = wishlist?.items?.some((item) => item.productId === product?.id);
      setIsInWishlist(isInList || false);
    } catch {
      // Wishlist may not exist
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      await apiClient.post("/products/cart", {
        productId: product.id,
        quantity,
      });
      toast.success("Added to cart!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;

    setIsTogglingWishlist(true);
    try {
      if (isInWishlist) {
        await apiClient.delete(`/wishlist/product/${product.id}`);
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await apiClient.post("/wishlist", {
          type: "product",
          itemId: product.id,
        });
        setIsInWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    } finally {
      setIsTogglingWishlist(false);
    }
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

  const allImages = product?.images?.length
    ? product.images
    : product?.thumbnail
    ? [product.thumbnail]
    : [];

  // Loading skeleton
  if (isLoading) {
    return (
      <UserLayout>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="h-8 w-32 bg-slate-200 rounded-lg animate-pulse" />
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
              <div className="h-32 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </UserLayout>
    );
  }

  if (!product) {
    return (
      <UserLayout>
        <div className="max-w-6xl mx-auto text-center py-16">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard/store"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Store
        </button>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              {allImages.length > 0 ? (
                <Image
                  src={allImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-4"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                  <Package className="w-24 h-24 text-slate-300" />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    NEW
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                    BESTSELLER
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    {calculateDiscount(product.price, product.compareAtPrice)}% OFF
                  </span>
                )}
              </div>

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title & SKU */}
            <div>
              <p className="text-sm text-slate-500 mb-1">SKU: {product.sku}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">{product.name}</h1>
            </div>

            {/* Rating */}
            {product._count?.reviews !== undefined && product._count.reviews > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4 ? "text-amber-400 fill-amber-400" : "text-slate-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-600">({product._count.reviews} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                    Save {formatPrice(product.compareAtPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-slate-600 leading-relaxed">{product.shortDescription}</p>
            )}

            {/* Stock Status */}
            {product.trackInventory && (
              <div className="flex items-center gap-2">
                {product.quantity && product.quantity > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">
                      In Stock ({product.quantity} available)
                    </span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 font-semibold min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || (product.trackInventory && product.quantity === 0)}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                disabled={isTogglingWishlist}
                className={`px-4 py-3 rounded-xl border transition-colors ${
                  isInWishlist
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-slate-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck className="w-6 h-6 text-primary" />
                <span className="text-xs text-slate-600">Free Shipping over ₹999</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-xs text-slate-600">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                <span className="text-xs text-slate-600">Easy Returns</span>
              </div>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <Share2 className="w-5 h-5" />
              Share this product
            </button>
          </motion.div>
        </div>

        {/* Description & Features Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="p-6 lg:p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Product Description</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h3>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Specifications</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">{key}</span>
                      <span className="font-medium text-slate-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </UserLayout>
  );
}
