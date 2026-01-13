"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    Calendar,
    User,
    Clock,
    ArrowLeft,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    Eye,
    Tag,
    ChevronRight,
} from "lucide-react";
import { FaRobot, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Author {
    id: string;
    name: string;
    bio?: string;
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
    content?: string;
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

// Skeleton Loading
function BlogPostSkeleton() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-4">
                <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex gap-4">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse" />
            <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${Math.random() * 40 + 60}%` }} />
                ))}
            </div>
        </div>
    );
}

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/blog/posts/${slug}`);
                const data = await response.json();

                if (data.success) {
                    setPost(data.data.post);
                    setRelatedPosts(data.data.relatedPosts || []);
                } else {
                    setError("Post not found");
                }
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load post");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const shareLinks = [
        { icon: FaFacebook, href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, color: "hover:text-blue-600" },
        { icon: FaTwitter, href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${post?.title}`, color: "hover:text-sky-500" },
        { icon: FaLinkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post?.title}`, color: "hover:text-blue-700" },
        { icon: FaWhatsapp, href: `https://wa.me/?text=${post?.title} ${shareUrl}`, color: "hover:text-green-500" },
    ];

    if (loading) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 pt-24">
                    <BlogPostSkeleton />
                </main>
                <Footer />
            </>
        );
    }

    if (error || !post) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 pt-24 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                            <FaRobot className="w-10 h-10 text-orange-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
                        <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Blog
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
                {/* Hero / Featured Image */}
                <section className="relative pt-24 pb-16">
                    {post.featuredImage ? (
                        <div className="relative h-[400px] md:h-[500px]">
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        </div>
                    ) : (
                        <div className="h-[300px] bg-gradient-to-br from-orange-500 to-teal-500" />
                    )}

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 pb-8 px-4">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Breadcrumb */}
                                <nav className="flex items-center gap-2 text-white/80 text-sm mb-4">
                                    <Link href="/" className="hover:text-white">Home</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <Link href="/blog" className="hover:text-white">Blog</Link>
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-white truncate max-w-[200px]">{post.title}</span>
                                </nav>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.categories?.map((cat, i) => (
                                        <span key={i} className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium">
                                            {cat.category.name}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                    {post.title}
                                </h1>

                                {/* Meta */}
                                <div className="flex flex-wrap items-center gap-4 text-white/90">
                                    {post.authors?.[0]?.author && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <span>{post.authors[0].author.name}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}</span>
                                    </div>
                                    {post.readTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime} min read</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        <span>{post.views.toLocaleString()} views</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Main Content */}
                            <article className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                                >
                                    {/* Blog Content */}
                                    <div
                                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-orange-600 prose-img:rounded-xl"
                                        dangerouslySetInnerHTML={{ __html: post.content || post.excerpt || '' }}
                                    />

                                    {/* Tags */}
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="mt-8 pt-8 border-t border-gray-100">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <Tag className="w-4 h-4 text-gray-500" />
                                                {post.tags.map((tag, i) => (
                                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Share */}
                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <p className="text-sm font-medium text-gray-700 mb-4">Share this article:</p>
                                        <div className="flex items-center gap-3">
                                            {shareLinks.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 transition-colors ${link.color}`}
                                                >
                                                    <link.icon className="w-5 h-5" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Author Bio */}
                                {post.authors?.[0]?.author && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mt-8 bg-gradient-to-br from-orange-50 to-teal-50 rounded-2xl p-6 border border-orange-100"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
                                                {post.authors[0].author.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">Written by</p>
                                                <h3 className="font-bold text-gray-900">{post.authors[0].author.name}</h3>
                                                {post.authors[0].author.bio && (
                                                    <p className="text-gray-600 text-sm mt-2">{post.authors[0].author.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </article>

                            {/* Sidebar - Related Posts */}
                            <aside className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <h3 className="font-bold text-gray-900 mb-4">Related Articles</h3>
                                    <div className="space-y-4">
                                        {relatedPosts.length > 0 ? (
                                            relatedPosts.map((relPost) => (
                                                <Link
                                                    key={relPost.id}
                                                    href={`/blog/${relPost.slug}`}
                                                    className="block bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow"
                                                >
                                                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 hover:text-orange-600 transition-colors">
                                                        {relPost.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        {new Date(relPost.publishedAt || relPost.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No related articles found.</p>
                                        )}
                                    </div>

                                    {/* Back to Blog */}
                                    <Link
                                        href="/blog"
                                        className="mt-6 flex items-center gap-2 text-orange-600 font-medium text-sm hover:gap-3 transition-all"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to all articles
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
