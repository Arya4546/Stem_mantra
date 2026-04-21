"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  Search,
  Filter,
  ChevronRight,
  Star,
  Users,
  GraduationCap,
  Cpu,
  Cog,
  Lightbulb,
  Brain,
  Wifi,
  Code,
  X,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
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
  status: string;
  image?: string;
  thumbnail?: string;
  duration?: string;
  gradeLevel?: string;
  features?: string[];
  learningOutcomes?: string[];
  isFeatured?: boolean;
  price?: number;
  discountPrice?: number;
  _count?: {
    courses?: number;
    enrollments?: number;
  };
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ============================================
// Program Type Icons & Colors
// ============================================

const programTypeConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
  ATL_LAB: {
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  ROBOTICS_LAB: {
    icon: <Cpu className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  STEM_LAB: {
    icon: <Cog className="w-5 h-5" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  AI_ML: {
    icon: <Brain className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  IOT: {
    icon: <Wifi className="w-5 h-5" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  CODING: {
    icon: <Code className="w-5 h-5" />,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
  },
};

const programTypes = [
  { value: "", label: "All Programs" },
  { value: "ATL_LAB", label: "ATL Labs" },
  { value: "ROBOTICS_LAB", label: "Robotics Lab" },
  { value: "STEM_LAB", label: "STEM Lab" },
  { value: "AI_ML", label: "AI & ML" },
  { value: "IOT", label: "IoT" },
  { value: "CODING", label: "Coding" },
];

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// ============================================
// Courses Page Component
// ============================================

export default function CoursesPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPrograms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, currentPage]);

  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", "9");
      params.append("status", "ACTIVE");
      if (selectedType) {
        params.append("type", selectedType);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await apiClient.getPaginated<Program>(`/programs?${params.toString()}`);
      setPrograms(response.data || []);
      setPagination(response.meta || null);
    } catch (error) {
      console.error("Error fetching programs:", error);
      setPrograms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPrograms();
  };

  const getTypeConfig = (type: string) => {
    return (
      programTypeConfig[type] || {
        icon: <BookOpen className="w-5 h-5" />,
        color: "text-slate-600",
        bgColor: "bg-slate-50",
      }
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Loading skeleton
  if (isLoading && programs.length === 0) {
    return (
      <UserLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-10 w-64 bg-slate-200 rounded-lg animate-pulse" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-2xl animate-pulse" />
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Browse Programs
            </h1>
            <p className="text-slate-600 mt-1">
              Explore our STEM programs and start learning today
            </p>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs..."
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-slate-600" />
              <span className="hidden sm:inline text-slate-700">Filters</span>
            </button>
          </form>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex flex-wrap gap-2">
              {programTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => {
                    setSelectedType(type.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedType === type.value
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {type.label}
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
              {programTypes.find((t) => t.value === selectedType)?.label}
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {programs.length > 0 ? (
            programs.map((program) => {
              const typeConfig = getTypeConfig(program.type);

              return (
                <motion.div key={program.id} variants={itemVariants}>
                  <Link
                    href={`/dashboard/courses/${program.slug}`}
                    className="group block bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                      {(program.thumbnail && program.thumbnail.length > 0) || (program.image && program.image.length > 0) ? (
                        <Image
                          src={program.thumbnail || program.image || ""}
                          alt={program.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className={`w-20 h-20 rounded-2xl ${typeConfig.bgColor} flex items-center justify-center`}
                          >
                            <span className={`${typeConfig.color} scale-150`}>
                              {typeConfig.icon}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {program.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                            <Star className="w-3 h-3 fill-current" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${typeConfig.bgColor} ${typeConfig.color} text-xs font-semibold`}
                        >
                          {typeConfig.icon}
                          {program.type.replace("_", " ")}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                        {program.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        {program.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                        {program.duration && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {program.duration}
                          </span>
                        )}
                        {program._count?.courses !== undefined && (
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {program._count.courses} Courses
                          </span>
                        )}
                        {program._count?.enrollments !== undefined && (
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {program._count.enrollments}
                          </span>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                        {/* Price Display */}
                        <div>
                          {program.discountPrice && program.price && program.discountPrice < program.price ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-slate-900">
                                {formatPrice(program.discountPrice)}
                              </span>
                              <span className="text-sm text-slate-400 line-through">
                                {formatPrice(program.price)}
                              </span>
                              <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                {calculateDiscount(program.price, program.discountPrice)}% OFF
                              </span>
                            </div>
                          ) : program.price && program.price > 0 ? (
                            <span className="text-lg font-bold text-slate-900">
                              {formatPrice(program.price)}
                            </span>
                          ) : (
                            <span className="text-lg font-bold text-green-600">Free</span>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full">
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No programs found
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
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
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
              ))}
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
