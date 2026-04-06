"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, Calendar, ArrowRight, Clock } from "lucide-react";
import { FaRobot } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Author { id: string; name: string; avatar?: string; }
interface Category { id: string; name: string; slug: string; }
interface BlogPost {
    id: string; title: string; slug: string; excerpt?: string; featuredImage?: string;
    status: string; views: number; readTime?: number; tags?: string[];
    publishedAt?: string; createdAt: string;
    authors?: { author: Author }[]; categories?: { category: Category }[];
}
interface BlogMeta { page: number; limit: number; total: number; totalPages: number; }

function BlogCardSkeleton() {
    return (
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-5 space-y-3">
                <div className="flex gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-5 w-12 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
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
            if (data.success) { setPosts(data.data || []); setMeta(data.meta || null); }
        } catch (err) { console.error("Error fetching posts:", err); }
        finally { setLoading(false); }
    }, [page, searchQuery, selectedCategory]);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/blog/categories`);
            const data = await response.json();
            if (data.success) setCategories(data.data || []);
        } catch (err) { console.error("Error fetching categories:", err); }
    }, []);

    useEffect(() => { fetchPosts(); }, [fetchPosts]);
    useEffect(() => { fetchCategories(); }, [fetchCategories]);

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero — Left aligned, no gradient banner */}
                <section className="pt-32 pb-8">
                    <div className="site-container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                                STEM Insights & Updates
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Our{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                                    Blog
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Explore the latest in STEM education, robotics, AI innovations, and
                                educational insights to help shape the future of learning.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Search & Filter — Flat bar */}
                <section className="pb-8">
                    <div className="site-container">
                        <div className="flex flex-col md:flex-row gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text" placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 text-sm bg-white"
                                />
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
                                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 bg-white text-sm"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="pb-16">
                    <div className="site-container">
                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                    <FaRobot className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts available yet</h3>
                                <p className="text-gray-600 mb-4">Check back soon for new insights into STEM, Robotics, and AI!</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                    className="px-5 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map((post, index) => (
                                        <motion.article
                                            key={post.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.06 }}
                                            className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all"
                                        >
                                            <Link href={`/blog/${post.slug}`}>
                                                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                                    {post.featuredImage ? (
                                                        <Image
                                                            src={post.featuredImage} alt={post.title} fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full bg-gradient-to-br from-orange-50 to-teal-50">
                                                            <FaRobot className="w-12 h-12 text-gray-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                                        {post.categories?.[0]?.category && (
                                                            <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                                                                {post.categories[0].category.name}
                                                            </span>
                                                        )}
                                                        {post.readTime && (
                                                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                                                <Clock className="w-3 h-3" />
                                                                {post.readTime} min
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    {post.excerpt && (
                                                        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                                            {post.excerpt}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                        <span className="flex items-center gap-1.5 text-xs text-gray-400">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                                                month: 'short', day: 'numeric', year: 'numeric'
                                                            })}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-orange-600 font-medium text-xs">
                                                            Read More <ArrowRight className="w-3 h-3" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {meta && meta.totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                    <button key={i} onClick={() => setPage(pageNum)}
                                                        className={`px-3 py-2 rounded-lg text-sm font-medium ${page === pageNum ? "bg-orange-500 text-white" : "hover:bg-gray-100 text-gray-600"
                                                            }`}>
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <button
                                            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                                            disabled={page === meta.totalPages}
                                            className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
