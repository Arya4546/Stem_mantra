"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Trophy,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  Package,
  Play,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { useAuth } from "@/providers/auth-provider";
import { apiClient } from "@/lib/api-client";

// ============================================
// Types
// ============================================

interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  image?: string;
  duration?: string;
}

interface Enrollment {
  id: string;
  program: Program;
  progress: number;
  status: string;
  enrolledAt: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
}

interface DashboardStats {
  totalEnrollments: number;
  totalOrders: number;
  completedCourses: number;
  totalHours: number;
}

// ============================================
// Animation Variants
// ============================================

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ============================================
// Dashboard Page Component
// ============================================

export default function DashboardPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalEnrollments: 0,
    totalOrders: 0,
    completedCourses: 0,
    totalHours: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch programs for recommendations
      const programsRes = await apiClient.getPaginated<Program>("/programs?limit=4&isFeatured=true");
      setPrograms(programsRes.data || []);

      // Try to fetch user enrollments (if endpoint exists)
      try {
        const enrollmentsData = await apiClient.get<Enrollment[]>("/enrollments/me");
        setEnrollments(enrollmentsData || []);
        setStats((prev) => ({
          ...prev,
          totalEnrollments: enrollmentsData?.length || 0,
          completedCourses:
            enrollmentsData?.filter((e: Enrollment) => e.status === "completed")
              .length || 0,
        }));
      } catch {
        console.log("Enrollments endpoint not available");
      }

      // Try to fetch user orders
      try {
        const ordersData = await apiClient.get<Order[]>("/orders/me");
        setOrders(ordersData || []);
        setStats((prev) => ({
          ...prev,
          totalOrders: ordersData?.length || 0,
        }));
      } catch {
        console.log("Orders endpoint not available");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      label: "Enrolled Courses",
      value: stats.totalEnrollments,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Completed",
      value: stats.completedCourses,
      icon: GraduationCap,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Orders",
      value: stats.totalOrders,
      icon: Package,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Hours Learned",
      value: stats.totalHours || 0,
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Loading skeleton
  if (isLoading) {
    return (
      <UserLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-64 bg-slate-200 rounded-lg" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-2xl" />
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-slate-200 rounded-2xl" />
            <div className="h-96 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            Welcome back, {user?.firstName || "Learner"}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Continue your learning journey and achieve your goals.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statCards.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeIn}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`${stat.bgColor} px-2 py-1 rounded-lg`}>
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mt-4">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Continue Learning / Enrolled Courses */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                {enrollments.length > 0 ? "Continue Learning" : "Recommended Programs"}
              </h2>
              <Link
                href={enrollments.length > 0 ? "/dashboard/enrollments" : "/dashboard/courses"}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.slice(0, 3).map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {enrollment.program.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-600">
                          {enrollment.progress}%
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/programs/${enrollment.program.slug}`}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                    >
                      <Play className="w-5 h-5 ml-0.5" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {programs.length > 0 ? (
                  programs.slice(0, 3).map((program) => (
                    <Link
                      key={program.id}
                      href={`/programs/${program.slug}`}
                      className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{program.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-1">
                          {program.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {program.type.replace("_", " ")}
                          </span>
                          {program.duration && (
                            <span className="flex items-center text-xs text-slate-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {program.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No programs available</p>
                    <Link
                      href="/dashboard/courses"
                      className="text-primary hover:underline text-sm mt-2 inline-block"
                    >
                      Browse all courses
                    </Link>
                  </div>
                )}
              </div>
            )}

            {enrollments.length === 0 && programs.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <Link
                  href="/dashboard/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                  Explore All Programs
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick Actions & Recent Orders */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/dashboard/courses"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span className="text-xs font-medium text-blue-700">Browse Courses</span>
                </Link>
                <Link
                  href="/dashboard/store"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
                >
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                  <span className="text-xs font-medium text-purple-700">Visit Store</span>
                </Link>
                <Link
                  href="/dashboard/enrollments"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <GraduationCap className="w-6 h-6 text-green-600" />
                  <span className="text-xs font-medium text-green-700">My Courses</span>
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
                >
                  <Package className="w-6 h-6 text-orange-600" />
                  <span className="text-xs font-medium text-orange-700">My Orders</span>
                </Link>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                <Link
                  href="/dashboard/orders"
                  className="text-sm text-primary hover:underline"
                >
                  View all
                </Link>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          #{order.orderNumber}
                        </p>
                        <p className="text-xs text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          ₹{order.total}
                        </p>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : order.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No orders yet</p>
                  <Link
                    href="/dashboard/store"
                    className="text-primary hover:underline text-sm mt-2 inline-block"
                  >
                    Start shopping
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary via-primary to-secondary rounded-2xl p-6 lg:p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Start Your Learning Journey!</h3>
                <p className="text-white/80 mt-1">
                  Explore our programs and become a STEM innovator
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-lg"
            >
              Explore Programs
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </UserLayout>
  );
}
