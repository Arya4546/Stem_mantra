"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  User,
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  FileText,
  Calendar,
  Tag,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

interface Author {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  status: PostStatus;
  views: number;
  readTime?: number;
  tags?: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  authors?: { author: Author }[];
  categories?: { category: { id: string; name: string; slug: string } }[];
}

interface BlogMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch blog posts from API
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("accessToken");
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "9");
      // Always send status - 'all' for admin to see all posts
      params.append("status", selectedStatus === "all" ? "all" : selectedStatus);
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      
      const response = await fetch(`${API_URL}/blog/posts?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data || []);
        setMeta(data.meta || null);
      } else {
        throw new Error(data.message || "Failed to fetch posts");
      }
    } catch (err: any) {
      console.error("Error fetching posts:", err);
      setError("Failed to load blog posts. Please try again.");
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedCategory, selectedStatus]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/blog/categories`);
      const data = await response.json();
      
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Delete post
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }
    
    try {
      setDeleting(id);
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/blog/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Post deleted successfully");
        fetchPosts();
      } else {
        throw new Error(data.message || "Failed to delete post");
      }
    } catch (err: any) {
      console.error("Error deleting post:", err);
      toast.error("Failed to delete post");
    } finally {
      setDeleting(null);
    }
  };

  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";
      case "ARCHIVED":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const publishedCount = posts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;

  // Loading skeleton
  if (loading && posts.length === 0) {
    return (
      <AdminLayout title="Blog">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100">
          <div className="h-10 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-100">
              <div className="aspect-video bg-slate-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Blog">
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-slate-600">Manage your blog content</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Post
          </Link>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error loading posts</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Posts</p>
              <p className="text-xl font-bold text-slate-900">{meta?.total || posts.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Views</p>
              <p className="text-xl font-bold text-green-600">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Published</p>
              <p className="text-xl font-bold text-purple-600">{publishedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Drafts</p>
              <p className="text-xl font-bold text-yellow-600">{draftCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.slug}>
                {cat.name} {cat._count?.posts ? `(${cat._count.posts})` : ""}
              </option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          <div className="flex items-center bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : "text-slate-500"
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list" ? "bg-white shadow-sm" : "text-slate-500"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Posts Grid/List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No posts found</h3>
          <p className="text-slate-500 mb-4">Try adjusting your search or filters</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Your First Post
          </Link>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gradient-to-br from-indigo-500 to-purple-600">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="w-12 h-12 text-white/50" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                  {post.categories?.[0]?.category && (
                    <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-xs">
                      {post.categories[0].category.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {post.views || 0}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-indigo-600" />
                    </div>
                    <span className="text-xs text-slate-500">
                      {post.authors?.[0]?.author?.name || "Admin"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-slate-500" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={deleting === post.id}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete"
                    >
                      {deleting === post.id ? (
                        <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Post</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Views</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post, index) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 overflow-hidden relative">
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <FileText className="w-6 h-6 text-white/50" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 line-clamp-1">{post.title}</p>
                        <p className="text-sm text-slate-500">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {post.categories?.[0]?.category ? (
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                        {post.categories[0].category.name}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {(post.views || 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-slate-500" />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-slate-500" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        disabled={deleting === post.id}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        {deleting === post.id ? (
                          <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4 text-red-500" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium">{posts.length}</span> of{" "}
            <span className="font-medium">{meta.total}</span> posts
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
              {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                let pageNum;
                if (meta.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= meta.totalPages - 2) {
                  pageNum = meta.totalPages - 4 + i;
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
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              disabled={page === meta.totalPages}
              className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
