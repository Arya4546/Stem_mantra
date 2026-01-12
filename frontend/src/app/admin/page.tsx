"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Users,
  FileText,
  Image as ImageIcon,
  ShoppingCart,
  TrendingUp,
  Eye,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MoreVertical,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api-client";
import { AdminLayout } from "@/components/admin/AdminLayout";

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

interface RecentActivity {
  id: string;
  action: string;
  resource?: string;
  createdAt: string;
}

interface TopPage {
  path: string;
  views: number;
}

// Loading skeleton component
function StatSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="w-16 h-4 bg-slate-200 rounded" />
      </div>
      <div className="w-24 h-8 bg-slate-200 rounded mb-2" />
      <div className="w-20 h-4 bg-slate-200 rounded" />
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 animate-pulse">
      <div className="w-10 h-10 rounded-full bg-slate-200" />
      <div className="flex-1">
        <div className="w-3/4 h-4 bg-slate-200 rounded mb-2" />
        <div className="w-1/4 h-3 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState("7");

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [dashboardStats, recentActivities, popularPages] = await Promise.all([
        apiClient.get<DashboardStats>("/analytics/dashboard").catch(() => null),
        apiClient.get<RecentActivity[]>("/analytics/activities?limit=5").catch(() => []),
        apiClient.get<{ topPages: TopPage[] }>(`/analytics/page-views?days=${dateRange}`).catch(() => ({ topPages: [] })),
      ]);

      if (dashboardStats) {
        setStats(dashboardStats);
      }
      setActivities(Array.isArray(recentActivities) ? recentActivities : []);
      setTopPages(popularPages?.topPages || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  const statCards = stats
    ? [
        {
          title: "Total Users",
          value: formatNumber(stats.users.total),
          change: stats.users.thisMonth,
          changeLabel: "this month",
          trend: "up" as const,
          icon: Users,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Total Leads",
          value: formatNumber(stats.leads.total),
          change: stats.leads.thisMonth,
          changeLabel: "this month",
          trend: "up" as const,
          icon: FileText,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Page Views",
          value: formatNumber(stats.pageViews.thisMonth),
          change: stats.pageViews.today,
          changeLabel: "today",
          trend: "up" as const,
          icon: Eye,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Revenue",
          value: formatCurrency(stats.orders.revenue),
          change: stats.orders.revenueGrowth,
          changeLabel: "growth",
          trend: stats.orders.revenueGrowth >= 0 ? ("up" as const) : ("down" as const),
          icon: DollarSign,
          color: "from-orange-500 to-orange-600",
          isPercentage: true,
        },
      ]
    : [];

  if (error && !stats) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-900">Failed to Load Dashboard</h2>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here&apos;s what&apos;s happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
            title="Refresh data"
          >
            <RefreshCw className={`w-5 h-5 text-slate-600 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => <StatSkeleton key={i} />)
          : statCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.isPercentage ? `${stat.change}%` : `+${stat.change}`}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-slate-500 text-sm">
                  {stat.title}{" "}
                  <span className="text-xs text-slate-400">({stat.changeLabel})</span>
                </p>
              </motion.div>
            ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activities</h2>
            <Link href="/admin/analytics" className="text-sm text-indigo-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => <ActivitySkeleton key={i} />)
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 truncate">
                      {activity.action}
                      {activity.resource && `: ${activity.resource}`}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {getTimeAgo(activity.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500">
                <Clock className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p>No recent activities</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Top Pages</h2>
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-6 h-4 bg-slate-200 rounded" />
                    <div className="flex-1">
                      <div className="w-3/4 h-4 bg-slate-200 rounded mb-1" />
                      <div className="w-1/4 h-3 bg-slate-200 rounded" />
                    </div>
                  </div>
                ))
            ) : topPages.length > 0 ? (
              topPages.slice(0, 5).map((page, index) => (
                <div key={page.path} className="flex items-center gap-4">
                  <span className="w-6 text-center text-sm font-medium text-slate-400">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{page.path}</p>
                    <p className="text-xs text-slate-500">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500">
                <Eye className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No page view data</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/blog"
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <FileText className="w-8 h-8" />
            <span className="text-sm font-medium">New Blog Post</span>
          </Link>
          <Link
            href="/admin/gallery"
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <ImageIcon className="w-8 h-8" />
            <span className="text-sm font-medium">Upload Images</span>
          </Link>
          <Link
            href="/admin/users"
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <Users className="w-8 h-8" />
            <span className="text-sm font-medium">Manage Users</span>
          </Link>
          <Link
            href="/admin/analytics"
            className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <TrendingUp className="w-8 h-8" />
            <span className="text-sm font-medium">View Analytics</span>
          </Link>
        </div>
      </motion.div>
      </div>
    </AdminLayout>
  );
}
