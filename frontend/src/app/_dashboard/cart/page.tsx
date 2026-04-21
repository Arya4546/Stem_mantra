"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Package,
  ArrowRight,
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Tag,
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
  price: number;
  thumbnail?: string;
  images?: string[];
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  productId: string;
}

interface Cart {
  id: string;
  items: CartItem[];
}

// ============================================
// Cart Page Component
// ============================================

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(
    null
  );

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await apiClient.get<Cart>("/products/cart/me");
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingItem(itemId);
    try {
      await apiClient.patch(`/products/cart/${productId}`, { quantity });
      fetchCart();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    } finally {
      setUpdatingItem(null);
    }
  };

  const removeItem = async (productId: string, itemId: string) => {
    setUpdatingItem(itemId);
    try {
      await apiClient.delete(`/products/cart/${productId}`);
      toast.success("Item removed from cart");
      fetchCart();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    } finally {
      setUpdatingItem(null);
    }
  };

  const clearCart = async () => {
    try {
      await apiClient.delete("/products/cart/clear");
      toast.success("Cart cleared");
      setCart(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cart?.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  ) || 0;
  const discount = appliedCoupon?.discount || 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;
  const cartCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // Loading skeleton
  if (isLoading) {
    return (
      <UserLayout>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
            <div className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
          </div>
        </div>
      </UserLayout>
    );
  }

  // Empty cart
  if (!cart || cart.items.length === 0) {
    return (
      <UserLayout cartCount={0}>
        <div className="space-y-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Shopping Cart</h1>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added any items to your cart yet. Explore our store
              and find something you&apos;ll love!
            </p>
            <Link
              href="/dashboard/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Store
            </Link>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout cartCount={cartCount}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Shopping Cart</h1>
            <p className="text-slate-600 mt-1">{cartCount} items in your cart</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link
                    href={`/dashboard/store/${item.product.slug}`}
                    className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl bg-slate-50 flex-shrink-0 overflow-hidden"
                  >
                    {(item.product.thumbnail && item.product.thumbnail.length > 0) || (item.product.images?.[0] && item.product.images[0].length > 0) ? (
                      <Image
                        src={item.product.thumbnail || item.product.images?.[0] || ""}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-10 h-10 text-slate-300" />
                      </div>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/dashboard/store/${item.product.slug}`}>
                      <h3 className="font-semibold text-slate-900 hover:text-primary transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-slate-900 mt-1">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.id, item.quantity - 1)}
                          disabled={updatingItem === item.id || item.quantity <= 1}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.id, item.quantity + 1)}
                          disabled={updatingItem === item.id}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-slate-900">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.productId, item.id)}
                          disabled={updatingItem === item.id}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/dashboard/store"
              className="flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>

              {/* Coupon Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                    />
                  </div>
                  <button
                    onClick={() => {
                      // TODO: Implement coupon validation
                      toast.info("Coupon validation coming soon!");
                    }}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-slate-500">
                    Free shipping on orders above ₹999
                  </p>
                )}
                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between text-base">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="font-bold text-slate-900">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/dashboard/checkout"
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Shield className="w-6 h-6 mx-auto text-green-600 mb-1" />
                  <p className="text-xs text-slate-600">Secure Payment</p>
                </div>
                <div>
                  <Truck className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                  <p className="text-xs text-slate-600">Fast Delivery</p>
                </div>
                <div>
                  <CreditCard className="w-6 h-6 mx-auto text-purple-600 mb-1" />
                  <p className="text-xs text-slate-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
