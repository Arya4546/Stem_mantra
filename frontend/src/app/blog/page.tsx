"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Search,
    Calendar,
    User,
    ArrowRight,
    Clock,
    Tag,
    Sparkles,
} from "lucide-react";
import { FaRobot } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Author {
    id: string;
    name: string;
    avatar?: string;
}

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    featuredImage?: string;
    status: string;
    views: number;
    readTime?: number;
    tags?: string[];
    publishedAt?: string;
    createdAt: string;
    authors?: { author: Author }[];
    categories?: { category: Category }[];
}

interface BlogMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

// Skeleton component for loading states
function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-4">
                <div className="flex gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="h-7 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<BlogMeta | null>(null);

    // Fetch blog posts
    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", "9");
            params.append("status", "PUBLISHED");
            if (searchQuery) params.append("search", searchQuery);
            if (selectedCategory !== "all") params.append("category", selectedCategory);

            const response = await fetch(`${API_URL}/blog/posts?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setPosts(data.data || []);
                setMeta(data.meta || null);
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    }, [page, searchQuery, selectedCategory]);

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

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600" />
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />

                    {/* Floating Elements */}
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 7, repeat: Infinity }}
                    />

                    {/* Floating Icons */}
                    <motion.div
                        className="absolute top-32 left-[15%] text-white/20 hidden md:block"
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        <FaRobot className="w-14 h-14" />
                    </motion.div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            className="text-center text-white"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.span
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                            >
                                <Sparkles className="w-4 h-4" />
                                STEM Insights & Updates
                            </motion.span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Our{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                                    Blog
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                                Explore the latest in STEM education, robotics, AI innovations, and
                                educational insights to help shape the future of learning.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Search & Filter Section */}
                <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="bg-white rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setPage(1);
                            }}
                            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <BlogCardSkeleton key={i} />
                            ))}
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                                <FaRobot className="w-10 h-10 text-orange-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search or check back later for new content.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post, index) => (
                                    <motion.article
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                                    >
                                        <Link href={`/blog/${post.slug}`}>
                                            <div className="relative aspect-video bg-gradient-to-br from-orange-500 to-teal-500 overflow-hidden">
                                                {post.featuredImage ? (
                                                    <Image
                                                        src={post.featuredImage}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <FaRobot className="w-16 h-16 text-white/30" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {post.categories?.[0]?.category && (
                                                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                            {post.categories[0].category.name}
                                                        </span>
                                                    )}
                                                    {post.readTime && (
                                                        <span className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Clock className="w-3 h-3" />
                                                            {post.readTime} min read
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                    {post.title}
                                                </h3>
                                                {post.excerpt && (
                                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                        {post.excerpt}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Calendar className="w-4 h-4" />
                                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                    <span className="flex items-center gap-1 text-orange-600 font-medium text-sm group-hover:gap-2 transition-all">
                                                        Read More <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {meta && meta.totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-12">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                                            let pageNum = i + 1;
                                            if (meta.totalPages > 5) {
                                                if (page <= 3) pageNum = i + 1;
                                                else if (page >= meta.totalPages - 2) pageNum = meta.totalPages - 4 + i;
                                                else pageNum = page - 2 + i;
                                            }
                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === pageNum
                                                            ? "bg-orange-500 text-white"
                                                            : "hover:bg-gray-100 text-gray-600"
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
                                        className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
