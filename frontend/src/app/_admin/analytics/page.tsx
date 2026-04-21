"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Clock,
  IndianRupee,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  AlertCircle,
  Loader2,
  ShoppingBag,
  UserPlus,
  Mail,
  Target,
  CalendarDays,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface DashboardStats {
  users: {
    total: number;
    today: number;
    thisMonth: number;
  };
  leads: {
    total: number;
    thisMonth: number;
  };
  orders: {
    total: number;
    thisMonth: number;
    revenue: number;
    revenueGrowth: number;
  };
  pageViews: {
    today: number;
    thisMonth: number;
  };
  other: {
    newsletterSubscribers: number;
    upcomingEvents: number;
    pendingDemos: number;
  };
}

interface PopularPage {
  path: string;
  title?: string;
  views: number;
}

interface RevenueData {
  date: string;
  revenue: number;
}

interface LeadsData {
  date: string;
  count: number;
}

interface TrafficData {
  source: string;
  visits: number;
  percentage: number;
}

export default function AdminAnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [popularPages, setPopularPages] = useState<PopularPage[]>([]);
  const [revenueChart, setRevenueChart] = useState<RevenueData[]>([]);
  const [leadsChart, setLeadsChart] = useState<LeadsData[]>([]);
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("30");

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("accessToken");
      
      // Fetch main dashboard stats
      const response = await fetch(`${API_URL}/analytics/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch analytics");
      }
    } catch (err: any) {
      console.error("Error fetching analytics:", err);
      setError("Failed to load analytics. Please try again.");
      toast.error("Failed to load analytics");
      
      // Set demo data as fallback
      setStats({
        users: { total: 0, today: 0, thisMonth: 0 },
        leads: { total: 0, thisMonth: 0 },
        orders: { total: 0, thisMonth: 0, revenue: 0, revenueGrowth: 0 },
        pageViews: { today: 0, thisMonth: 0 },
        other: { newsletterSubscribers: 0, upcomingEvents: 0, pendingDemos: 0 },
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch popular pages
  const fetchPopularPages = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/analytics/pageviews/popular?days=${dateRange}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPopularPages(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching popular pages:", err);
    }
  }, [dateRange]);

  // Fetch traffic overview
  const fetchTrafficOverview = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/analytics/traffic/overview?days=${dateRange}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Process referrer data into traffic sources
        const sources = data.data.referrers || [];
        const total = sources.reduce((sum: number, s: any) => sum + s.visits, 0);
        setTrafficData(sources.map((s: any) => ({
          ...s,
          percentage: total > 0 ? Math.round((s.visits / total) * 100) : 0,
        })));
      }
    } catch (err) {
      console.error("Error fetching traffic overview:", err);
      // Set demo data
      setTrafficData([
        { source: "Direct", visits: 0, percentage: 0 },
        { source: "Organic Search", visits: 0, percentage: 0 },
        { source: "Social Media", visits: 0, percentage: 0 },
      ]);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchDashboardStats();
    fetchPopularPages();
    fetchTrafficOverview();
  }, [fetchDashboardStats, fetchPopularPages, fetchTrafficOverview]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTrafficSourceColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-yellow-500",
      "bg-red-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-cyan-500",
    ];
    return colors[index % colors.length];
  };

  // Loading skeleton
  if (loading) {
    return (
      <AdminLayout title="Analytics">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100">
              <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse mb-4" />
              <div className="h-8 w-20 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-100">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-8 bg-slate-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Analytics">
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">Track website performance and user engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
            {[
              { label: "7 days", value: "7" },
              { label: "30 days", value: "30" },
              { label: "90 days", value: "90" },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  dateRange === range.value
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              fetchDashboardStats();
              fetchPopularPages();
              fetchTrafficOverview();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error loading analytics</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Today</span>
              <p className="text-sm font-semibold text-green-600">+{stats?.users?.today || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900">{stats?.users?.total || 0}</p>
            <p className="text-sm text-slate-500 mt-1">Total Users</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">Today</span>
              <p className="text-sm font-semibold text-green-600">+{stats?.pageViews?.today || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900">{stats?.pageViews?.thisMonth || 0}</p>
            <p className="text-sm text-slate-500 mt-1">Page Views (Month)</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500">This Month</span>
              <p className="text-sm font-semibold text-purple-600">+{stats?.leads?.thisMonth || 0}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900">{stats?.leads?.total || 0}</p>
            <p className="text-sm text-slate-500 mt-1">Total Leads</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
        >
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <IndianRupee className="w-6 h-6 text-yellow-600" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                (stats?.orders?.revenueGrowth || 0) >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {(stats?.orders?.revenueGrowth || 0) >= 0 ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              {Math.abs(stats?.orders?.revenueGrowth || 0)}%
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-slate-900">{formatPrice(stats?.orders?.revenue || 0)}</p>
            <p className="text-sm text-slate-500 mt-1">Revenue (Month)</p>
          </div>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-indigo-500" />
            <div>
              <p className="text-xl font-bold text-slate-900">{stats?.orders?.total || 0}</p>
              <p className="text-xs text-slate-500">Total Orders</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <UserPlus className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xl font-bold text-slate-900">{stats?.users?.thisMonth || 0}</p>
              <p className="text-xs text-slate-500">New Users (Month)</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xl font-bold text-slate-900">{stats?.other?.newsletterSubscribers || 0}</p>
              <p className="text-xs text-slate-500">Subscribers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-xl font-bold text-slate-900">{stats?.other?.upcomingEvents || 0}</p>
              <p className="text-xs text-slate-500">Upcoming Events</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xl font-bold text-slate-900">{stats?.other?.pendingDemos || 0}</p>
              <p className="text-xs text-slate-500">Pending Demos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders This Month */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Monthly Overview</h2>
              <p className="text-sm text-slate-500">Orders and revenue for this month</p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-slate-900">{stats?.orders?.thisMonth || 0}</p>
              <p className="text-sm text-slate-500">Orders This Month</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{formatPrice(stats?.orders?.revenue || 0)}</p>
              <p className="text-sm text-slate-500">Revenue This Month</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">{stats?.users?.thisMonth || 0}</p>
              <p className="text-sm text-slate-500">New Users</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">{stats?.leads?.thisMonth || 0}</p>
              <p className="text-sm text-slate-500">New Leads</p>
            </div>
          </div>
          
          {/* Revenue Growth Indicator */}
          <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Revenue Growth vs Last Month</p>
                <p className={`text-2xl font-bold ${(stats?.orders?.revenueGrowth || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(stats?.orders?.revenueGrowth || 0) >= 0 ? '+' : ''}{stats?.orders?.revenueGrowth || 0}%
                </p>
              </div>
              <div className={`p-3 rounded-full ${(stats?.orders?.revenueGrowth || 0) >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {(stats?.orders?.revenueGrowth || 0) >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Traffic Sources</h2>
              <p className="text-sm text-slate-500">Where visitors come from</p>
            </div>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {trafficData.length > 0 ? (
              trafficData.map((source, index) => (
                <motion.div
                  key={source.source}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">{source.source}</span>
                    <span className="text-sm text-slate-500">{source.visits.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`h-full ${getTrafficSourceColor(index)} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No traffic data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Top Pages</h2>
              <p className="text-sm text-slate-500">Most visited pages on your website</p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-500">#</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-slate-500">Page</th>
                <th className="text-right py-3 px-6 text-sm font-medium text-slate-500">Views</th>
              </tr>
            </thead>
            <tbody>
              {popularPages.length > 0 ? (
                popularPages.map((page, index) => (
                  <motion.tr
                    key={page.path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                  >
                    <td className="py-4 px-6 text-sm text-slate-500">{index + 1}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-slate-900">{page.path}</p>
                      {page.title && <p className="text-xs text-slate-500">{page.title}</p>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm font-semibold text-slate-900">{page.views.toLocaleString()}</span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center">
                    <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-slate-500 text-sm">No page view data available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Quick Summary</h3>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
          <p className="text-5xl font-bold mb-2">{stats?.users?.total || 0}</p>
          <p className="text-indigo-200 text-sm">Total registered users</p>
          <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div>
              <p className="text-2xl font-bold">{stats?.orders?.total || 0}</p>
              <p className="text-xs text-indigo-200">Orders</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.leads?.total || 0}</p>
              <p className="text-xs text-indigo-200">Leads</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.other?.newsletterSubscribers || 0}</p>
              <p className="text-xs text-indigo-200">Subscribers</p>
            </div>
          </div>
        </div>

        {/* Conversion Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-900 mb-4">Conversion Overview</h3>
          <div className="space-y-4">
            {[
              { 
                stage: "Page Views (Month)", 
                value: stats?.pageViews?.thisMonth || 0, 
                percentage: 100,
                color: "from-blue-500 to-blue-600"
              },
              { 
                stage: "Total Users", 
                value: stats?.users?.total || 0, 
                percentage: stats?.pageViews?.thisMonth 
                  ? Math.min(100, Math.round((stats?.users?.total / stats?.pageViews?.thisMonth) * 100)) 
                  : 0,
                color: "from-green-500 to-green-600"
              },
              { 
                stage: "Total Leads", 
                value: stats?.leads?.total || 0, 
                percentage: stats?.users?.total 
                  ? Math.min(100, Math.round((stats?.leads?.total / stats?.users?.total) * 100))
                  : 0,
                color: "from-purple-500 to-purple-600"
              },
              { 
                stage: "Total Orders", 
                value: stats?.orders?.total || 0, 
                percentage: stats?.leads?.total 
                  ? Math.min(100, Math.round((stats?.orders?.total / stats?.leads?.total) * 100))
                  : 0,
                color: "from-orange-500 to-orange-600"
              },
            ].map((item, index) => (
              <div key={item.stage}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-600">{item.stage}</span>
                  <span className="text-sm font-medium text-slate-900">{item.value.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
