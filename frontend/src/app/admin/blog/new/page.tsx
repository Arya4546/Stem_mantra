"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
    Save,
    ArrowLeft,
    Image as ImageIcon,
    Eye,
    Tag,
    Loader2,
    Upload,
    X,
    Plus,
    FileText,
    Bold,
    Italic,
    List,
    ListOrdered,
    Link2,
    Quote,
    Heading1,
    Heading2,
    Code,
} from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function NewBlogPostPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // Form state
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [featuredImage, setFeaturedImage] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
    const [readTime, setReadTime] = useState(5);

    // Auto-generate slug from title
    useEffect(() => {
        const generatedSlug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        setSlug(generatedSlug);
    }, [title]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${API_URL}/blog/categories`);
                const data = await response.json();
                if (data.success) {
                    setCategories(data.data || []);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Handle image upload
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "blog");

            const token = localStorage.getItem("accessToken");
            const response = await fetch(`${API_URL}/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (data.success && data.data?.url) {
                setFeaturedImage(data.data.url);
                toast.success("Image uploaded successfully");
            } else {
                throw new Error(data.message || "Upload failed");
            }
        } catch (err: any) {
            console.error("Upload error:", err);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    // Handle tag addition
    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    // Handle form submission
    const handleSubmit = async (publishStatus: "DRAFT" | "PUBLISHED") => {
        if (!title.trim()) {
            toast.error("Please enter a title");
            return;
        }

        try {
            setSaving(true);
            const token = localStorage.getItem("accessToken");

            const postData = {
                title,
                slug,
                excerpt,
                content,
                featuredImage,
                status: publishStatus,
                readTime,
                tags,
                categoryIds: selectedCategories,
            };

            const response = await fetch(`${API_URL}/blog/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(publishStatus === "PUBLISHED" ? "Post published!" : "Draft saved!");
                router.push("/admin/blog");
            } else {
                throw new Error(data.message || "Failed to save post");
            }
        } catch (err: any) {
            console.error("Save error:", err);
            toast.error(err.message || "Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    // Simple text formatting for content (basic rich text)
    const insertFormatting = (format: string) => {
        const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);
        let formattedText = "";

        switch (format) {
            case "bold":
                formattedText = `<strong>${selectedText || "bold text"}</strong>`;
                break;
            case "italic":
                formattedText = `<em>${selectedText || "italic text"}</em>`;
                break;
            case "h1":
                formattedText = `<h1>${selectedText || "Heading 1"}</h1>`;
                break;
            case "h2":
                formattedText = `<h2>${selectedText || "Heading 2"}</h2>`;
                break;
            case "ul":
                formattedText = `<ul>\n<li>${selectedText || "List item"}</li>\n</ul>`;
                break;
            case "ol":
                formattedText = `<ol>\n<li>${selectedText || "List item"}</li>\n</ol>`;
                break;
            case "quote":
                formattedText = `<blockquote>${selectedText || "Quote"}</blockquote>`;
                break;
            case "code":
                formattedText = `<code>${selectedText || "code"}</code>`;
                break;
            case "link":
                formattedText = `<a href="URL">${selectedText || "Link text"}</a>`;
                break;
            case "image":
                formattedText = `<img src="IMAGE_URL" alt="${selectedText || "Image description"}" />`;
                break;
            default:
                formattedText = selectedText;
        }

        const newContent = content.substring(0, start) + formattedText + content.substring(end);
        setContent(newContent);
    };

    return (
        <AdminLayout title="New Blog Post">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/blog"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-500" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
                            <p className="text-gray-500">Write and publish your blog post</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => handleSubmit("DRAFT")}
                            disabled={saving}
                            className="px-4 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving && status === "DRAFT" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSubmit("PUBLISHED")}
                            disabled={saving}
                            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving && status === "PUBLISHED" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Eye className="w-4 h-4" />
                            )}
                            Publish
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your post title..."
                                className="w-full px-4 py-3 text-xl font-semibold border-0 focus:outline-none focus:ring-0 placeholder-gray-300"
                            />
                            <div className="mt-2 text-sm text-gray-400">
                                Slug: /{slug || "your-post-url"}
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Excerpt
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Write a short description for your post..."
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            />
                        </div>

                        {/* Content Editor */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>

                            {/* Formatting Toolbar */}
                            <div className="flex flex-wrap gap-1 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                {[
                                    { icon: Bold, format: "bold", title: "Bold" },
                                    { icon: Italic, format: "italic", title: "Italic" },
                                    { icon: Heading1, format: "h1", title: "Heading 1" },
                                    { icon: Heading2, format: "h2", title: "Heading 2" },
                                    { icon: List, format: "ul", title: "Bullet List" },
                                    { icon: ListOrdered, format: "ol", title: "Numbered List" },
                                    { icon: Quote, format: "quote", title: "Quote" },
                                    { icon: Code, format: "code", title: "Code" },
                                    { icon: Link2, format: "link", title: "Link" },
                                    { icon: ImageIcon, format: "image", title: "Image" },
                                ].map((tool) => (
                                    <button
                                        key={tool.format}
                                        type="button"
                                        onClick={() => insertFormatting(tool.format)}
                                        title={tool.title}
                                        className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 hover:text-orange-600"
                                    >
                                        <tool.icon className="w-4 h-4" />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                id="content-editor"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write your blog content here... You can use HTML for formatting."
                                rows={15}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y font-mono text-sm"
                            />
                            <p className="mt-2 text-xs text-gray-400">
                                Supports HTML formatting. Use the toolbar above for quick formatting.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Featured Image */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Featured Image
                            </label>
                            {featuredImage ? (
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                                    <Image
                                        src={featuredImage}
                                        alt="Featured"
                                        fill
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => setFeaturedImage("")}
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors"
                                    >
                                        <X className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">Click to upload</span>
                                        </>
                                    )}
                                </label>
                            )}
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Categories
                            </label>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {categories.map((cat) => (
                                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedCategories([...selectedCategories, cat.id]);
                                                } else {
                                                    setSelectedCategories(selectedCategories.filter((id) => id !== cat.id));
                                                }
                                            }}
                                            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                        />
                                        <span className="text-sm text-gray-700">{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                                    >
                                        {tag}
                                        <button
                                            onClick={() => setTags(tags.filter((_, idx) => idx !== i))}
                                            className="hover:text-orange-900"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                    placeholder="Add a tag..."
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <button
                                    onClick={addTag}
                                    className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Read Time */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Read Time (minutes)
                            </label>
                            <input
                                type="number"
                                value={readTime}
                                onChange={(e) => setReadTime(parseInt(e.target.value) || 0)}
                                min="1"
                                max="60"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
