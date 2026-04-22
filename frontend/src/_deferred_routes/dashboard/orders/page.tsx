"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Receipt,
  Calendar,
  MapPin,
  Ban,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// ============================================
// Types
// ============================================

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  product?: {
    thumbnail?: string;
    slug: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: string;
  shippingAddress?: {
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
}

// ============================================
// Status Config
// ============================================

const statusConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string; label: string }
> = {
  PENDING: {
    icon: <Clock className="w-4 h-4" />,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    label: "Pending",
  },
  CONFIRMED: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    label: "Confirmed",
  },
  PROCESSING: {
    icon: <Package className="w-4 h-4" />,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    label: "Processing",
  },
  SHIPPED: {
    icon: <Truck className="w-4 h-4" />,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
    label: "Shipped",
  },
  DELIVERED: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-600",
    bgColor: "bg-green-100",
    label: "Delivered",
  },
  CANCELLED: {
    icon: <XCircle className="w-4 h-4" />,
    color: "text-red-600",
    bgColor: "bg-red-100",
    label: "Cancelled",
  },
  REFUNDED: {
    icon: <Receipt className="w-4 h-4" />,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    label: "Refunded",
  },
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
// Orders Page Component
// ============================================

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [cancellingOrder, setCancellingOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.getPaginated<Order>("/orders/me");
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    
    setCancellingOrder(orderId);
    try {
      await apiClient.patch(`/orders/${orderId}/cancel`, {});
      toast.success("Order cancelled successfully");
      fetchOrders();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingOrder(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusConfig = (status: string) => {
    return (
      statusConfig[status] || {
        icon: <Package className="w-4 h-4" />,
        color: "text-slate-600",
        bgColor: "bg-slate-100",
        label: status,
      }
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  // Loading skeleton
  if (isLoading) {
    return (
      <UserLayout>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-slate-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Orders</h1>
          <p className="text-slate-600 mt-1">Track and manage your orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { value: "all", label: "All Orders" },
            { value: "PENDING", label: "Pending" },
            { value: "PROCESSING", label: "Processing" },
            { value: "SHIPPED", label: "Shipped" },
            { value: "DELIVERED", label: "Delivered" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab.value
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {filteredOrders.map((order) => {
              const statusConf = getStatusConfig(order.status);
              const isExpanded = expandedOrder === order.id;

              return (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${statusConf.bgColor} flex items-center justify-center flex-shrink-0`}
                        >
                          <span className={statusConf.color}>{statusConf.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-slate-900">
                              Order #{order.orderNumber}
                            </h3>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConf.bgColor} ${statusConf.color}`}
                            >
                              {statusConf.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(order.createdAt)}
                            </span>
                            <span>{order.items.length} items</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-slate-900">
                            {formatPrice(order.total)}
                          </p>
                          <p className="text-xs text-slate-500">Total Amount</p>
                        </div>
                        <button
                          onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">Details</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-slate-100"
                    >
                      <div className="p-5 space-y-6">
                        {/* Order Items */}
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 mb-3">
                            Order Items
                          </h4>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4 p-3 rounded-xl bg-slate-50"
                              >
                                <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  {item.product?.thumbnail && item.product.thumbnail.length > 0 ? (
                                    <Image
                                      src={item.product.thumbnail}
                                      alt={item.name}
                                      width={64}
                                      height={64}
                                      className="object-cover"
                                    />
                                  ) : (
                                    <Package className="w-8 h-8 text-slate-300" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-slate-900 truncate">
                                    {item.name}
                                  </h5>
                                  <p className="text-sm text-slate-500">
                                    {formatPrice(item.price)} × {item.quantity}
                                  </p>
                                </div>
                                <p className="font-semibold text-slate-900">
                                  {formatPrice(item.total)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-3">
                              Price Breakdown
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Subtotal</span>
                                <span>{formatPrice(order.subtotal)}</span>
                              </div>
                              {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Discount</span>
                                  <span>-{formatPrice(order.discount)}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-slate-600">Shipping</span>
                                <span>
                                  {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                                </span>
                              </div>
                              {order.tax > 0 && (
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Tax</span>
                                  <span>{formatPrice(order.tax)}</span>
                                </div>
                              )}
                              <div className="flex justify-between pt-2 border-t border-slate-200 font-semibold">
                                <span className="text-slate-900">Total</span>
                                <span className="text-slate-900">{formatPrice(order.total)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Shipping Address */}
                          {order.shippingAddress && (
                            <div>
                              <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Shipping Address
                              </h4>
                              <div className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3">
                                <p className="font-medium text-slate-900">
                                  {order.shippingAddress.name}
                                </p>
                                <p>{order.shippingAddress.address}</p>
                                <p>
                                  {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
                                  {order.shippingAddress.pincode}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                          >
                            View Full Details
                          </Link>
                          {order.status === "SHIPPED" && (
                            <Link
                              href={`/orders/track/${order.orderNumber}`}
                              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                              Track Order
                            </Link>
                          )}
                          {order.status === "DELIVERED" && (
                            <button className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                              Download Invoice
                            </button>
                          )}
                          {(order.status === "PENDING" || order.status === "CONFIRMED") && (
                            <button
                              onClick={() => handleCancelOrder(order.id)}
                              disabled={cancellingOrder === order.id}
                              className="px-4 py-2 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                              <Ban className="w-4 h-4" />
                              {cancellingOrder === order.id ? "Cancelling..." : "Cancel Order"}
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {filter === "all" ? "No orders yet" : `No ${filter.toLowerCase()} orders`}
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              {filter === "all"
                ? "Start shopping and your orders will appear here."
                : "No orders match this filter."}
            </p>
            <Link
              href="/dashboard/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Store
            </Link>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
