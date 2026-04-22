"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  IndianRupee,
  Calendar,
  RefreshCw,
  AlertCircle,
  Loader2,
  CreditCard,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  User,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED";
type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  sku?: string;
  price: number;
  quantity: number;
  total: number;
  product?: {
    id: string;
    name: string;
    thumbnail?: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  userId?: string;
  shippingAddress?: any;
  billingAddress?: any;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  paymentId?: string;
  couponCode?: string;
  couponDiscount?: number;
  notes?: string;
  items?: OrderItem[];
  _count?: {
    items: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: Record<string, number>;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderDetailLoading, setOrderDetailLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [updating, setUpdating] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>("PENDING");
  const [newPaymentStatus, setNewPaymentStatus] = useState<PaymentStatus>("PENDING");

  // Fetch orders from API
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("accessToken");
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      if (searchQuery) params.append("search", searchQuery);
      if (selectedStatus !== "all") params.append("status", selectedStatus);
      if (selectedPaymentStatus !== "all") params.append("paymentStatus", selectedPaymentStatus);
      
      const response = await fetch(`${API_URL}/orders?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (err: any) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedStatus, selectedPaymentStatus]);

  // Fetch order statistics
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/orders/stats/overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching order stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  // Fetch single order with full details
  const fetchOrderDetails = async (orderId: string) => {
    try {
      setOrderDetailLoading(true);
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSelectedOrder(data.data);
        setNewStatus(data.data.status);
        setNewPaymentStatus(data.data.paymentStatus);
      } else {
        throw new Error(data.message || "Failed to fetch order details");
      }
    } catch (err: any) {
      console.error("Error fetching order details:", err);
      toast.error("Failed to load order details");
    } finally {
      setOrderDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Lock body scroll when modal is open - comprehensive approach
  useEffect(() => {
    if (selectedOrder) {
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
  }, [selectedOrder]);

  // Update order status
  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    
    try {
      setUpdating("status");
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/orders/${selectedOrder.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        setSelectedOrder({ ...selectedOrder, status: newStatus });
        fetchOrders();
        fetchStats();
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (err: any) {
      console.error("Error updating order status:", err);
      toast.error("Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  // Update payment status
  const handlePaymentStatusUpdate = async () => {
    if (!selectedOrder) return;
    
    try {
      setUpdating("payment");
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/orders/${selectedOrder.id}/payment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentStatus: newPaymentStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Payment status updated to ${newPaymentStatus}`);
        setSelectedOrder({ ...selectedOrder, paymentStatus: newPaymentStatus });
        fetchOrders();
        fetchStats();
      } else {
        throw new Error(data.message || "Failed to update payment status");
      }
    } catch (err: any) {
      console.error("Error updating payment status:", err);
      toast.error("Failed to update payment status");
    } finally {
      setUpdating(null);
    }
  };

  // Export orders
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/orders?limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        const csvContent = [
          ["Order Number", "Customer", "Email", "Phone", "Total", "Status", "Payment", "Date"],
          ...data.data.map((order: Order) => [
            order.orderNumber,
            order.customerName,
            order.customerEmail,
            order.customerPhone,
            order.total,
            order.status,
            order.paymentStatus,
            new Date(order.createdAt).toLocaleDateString(),
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        toast.success("Orders exported successfully");
      }
    } catch (err) {
      console.error("Error exporting orders:", err);
      toast.error("Failed to export orders");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";
      case "PROCESSING":
        return "bg-purple-100 text-purple-700";
      case "SHIPPED":
        return "bg-indigo-100 text-indigo-700";
      case "DELIVERED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "REFUNDED":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "FAILED":
        return "bg-red-100 text-red-700";
      case "REFUNDED":
        return "bg-slate-100 text-slate-700";
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

  // Loading skeleton
  if (loading && orders.length === 0) {
    return (
      <AdminLayout title="Orders">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="h-10 w-10 bg-slate-200 rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Orders">
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-600">Manage customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchOrders();
              fetchStats();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error loading orders</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="h-10 w-10 bg-slate-200 rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))
        ) : (
          <>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Orders</p>
                  <p className="text-xl font-bold text-slate-900">{stats?.totalOrders || 0}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Total Revenue</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatPrice(stats?.totalRevenue || 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {stats?.ordersByStatus?.PENDING || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm">Shipped</p>
                  <p className="text-xl font-bold text-purple-600">
                    {stats?.ordersByStatus?.SHIPPED || 0}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order number, customer name, or email..."
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
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
          </select>
          <select
            value={selectedPaymentStatus}
            onChange={(e) => {
              setSelectedPaymentStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Payment Status</option>
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="FAILED">Failed</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Order</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Items</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Total</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Payment</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <ShoppingBag className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">No orders found</p>
                      <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{order.orderNumber}</p>
                        <p className="text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{order.customerName}</p>
                        <p className="text-sm text-slate-500">{order.customerEmail}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {order._count?.items || order.items?.length || 0} item(s)
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => fetchOrderDetails(order.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-slate-500" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto my-auto"
          >
            {orderDetailLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedOrder.orderNumber}</h2>
                    <p className="text-sm text-slate-500">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status Badges */}
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                    {selectedOrder.paymentMethod && (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                        {selectedOrder.paymentMethod}
                      </span>
                    )}
                  </div>

                  {/* Customer Info */}
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Customer Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-500">Name</p>
                        <p className="font-medium">{selectedOrder.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> Email
                        </p>
                        <p className="font-medium">{selectedOrder.customerEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> Phone
                        </p>
                        <p className="font-medium">{selectedOrder.customerPhone}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  {selectedOrder.shippingAddress && (
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Shipping Address
                      </h3>
                      <p className="text-slate-600">
                        {typeof selectedOrder.shippingAddress === 'object' 
                          ? `${selectedOrder.shippingAddress.street || ''}, ${selectedOrder.shippingAddress.city || ''}, ${selectedOrder.shippingAddress.state || ''} ${selectedOrder.shippingAddress.pincode || ''}`
                          : selectedOrder.shippingAddress}
                      </p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Items
                    </h3>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="text-left px-4 py-3 text-sm font-medium text-slate-600">Item</th>
                            <th className="text-center px-4 py-3 text-sm font-medium text-slate-600">Qty</th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">Price</th>
                            <th className="text-right px-4 py-3 text-sm font-medium text-slate-600">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedOrder.items?.map((item, i) => (
                            <tr key={i}>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  {item.product?.thumbnail && (
                                    <Image 
                                      src={item.product.thumbnail} 
                                      alt={item.name}
                                      width={40}
                                      height={40}
                                      className="w-10 h-10 rounded-lg object-cover"
                                    />
                                  )}
                                  <div>
                                    <p className="font-medium text-slate-900">{item.name}</p>
                                    {item.sku && <p className="text-xs text-slate-500">SKU: {item.sku}</p>}
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-center">{item.quantity}</td>
                              <td className="px-4 py-3 text-right">{formatPrice(item.price)}</td>
                              <td className="px-4 py-3 text-right font-medium">
                                {formatPrice(item.total || item.price * item.quantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-slate-50">
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-slate-600">Subtotal</td>
                            <td className="px-4 py-2 text-right font-medium">{formatPrice(selectedOrder.subtotal)}</td>
                          </tr>
                          {selectedOrder.discount > 0 && (
                            <tr>
                              <td colSpan={3} className="px-4 py-2 text-right text-green-600">
                                Discount {selectedOrder.couponCode && `(${selectedOrder.couponCode})`}
                              </td>
                              <td className="px-4 py-2 text-right font-medium text-green-600">
                                -{formatPrice(selectedOrder.discount)}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-slate-600">Tax (18% GST)</td>
                            <td className="px-4 py-2 text-right font-medium">{formatPrice(selectedOrder.tax)}</td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="px-4 py-2 text-right text-slate-600">Shipping</td>
                            <td className="px-4 py-2 text-right font-medium">
                              {selectedOrder.shipping === 0 ? "Free" : formatPrice(selectedOrder.shipping)}
                            </td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td colSpan={3} className="px-4 py-3 text-right font-semibold">Total</td>
                            <td className="px-4 py-3 text-right font-bold text-lg">
                              {formatPrice(selectedOrder.total)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedOrder.notes && (
                    <div className="p-4 bg-yellow-50 rounded-xl">
                      <h3 className="font-semibold text-slate-900 mb-2">Order Notes</h3>
                      <p className="text-slate-600">{selectedOrder.notes}</p>
                    </div>
                  )}

                  {/* Status Update */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Update Order Status
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                          <option value="REFUNDED">Refunded</option>
                        </select>
                        <button
                          onClick={handleStatusUpdate}
                          disabled={updating === "status" || newStatus === selectedOrder.status}
                          className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updating === "status" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Update Payment Status
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={newPaymentStatus}
                          onChange={(e) => setNewPaymentStatus(e.target.value as PaymentStatus)}
                          className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PAID">Paid</option>
                          <option value="FAILED">Failed</option>
                          <option value="REFUNDED">Refunded</option>
                        </select>
                        <button
                          onClick={handlePaymentStatusUpdate}
                          disabled={updating === "payment" || newPaymentStatus === selectedOrder.paymentStatus}
                          className="px-4 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updating === "payment" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-medium">{orders.length}</span> of{" "}
          <span className="font-medium">{totalCount}</span> orders
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
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
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    page === pageNum
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-100 text-slate-600"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
