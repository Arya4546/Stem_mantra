"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUpload } from "@/components/ui/ImageUpload";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Quote,
  User,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  X,
  Check,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface Testimonial {
  id: string;
  name: string;
  designation: string;
  schoolName: string;
  content: string;
  rating: number;
  avatar?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialFormData {
  name: string;
  designation: string;
  schoolName: string;
  content: string;
  rating: string;
  avatar: string;
  isApproved: boolean;
  isFeatured: boolean;
}

const initialFormData: TestimonialFormData = {
  name: "",
  designation: "",
  schoolName: "",
  content: "",
  rating: "5",
  avatar: "",
  isApproved: true,
  isFeatured: false,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(initialFormData);
  const [formLoading, setFormLoading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      if (searchQuery) params.append("search", searchQuery);

      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/content/testimonials?${params}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const result = await response.json();

      if (result.success) {
        setTestimonials(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
        setTotal(result.pagination?.total || 0);
      } else {
        throw new Error(result.message || "Failed to fetch testimonials");
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      setError("Failed to load testimonials");
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Lock body scroll when modal is open - comprehensive approach
  useEffect(() => {
    if (showModal || showDeleteModal) {
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
  }, [showModal, showDeleteModal]);

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        designation: testimonial.designation,
        schoolName: testimonial.schoolName || "",
        content: testimonial.content,
        rating: testimonial.rating.toString(),
        avatar: testimonial.avatar || "",
        isApproved: testimonial.isApproved,
        isFeatured: testimonial.isFeatured,
      });
    } else {
      setEditingTestimonial(null);
      setFormData(initialFormData);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTestimonial(null);
    setFormData(initialFormData);
  };

  const handleFormChange = (field: keyof TestimonialFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setFormLoading(true);
      const token = localStorage.getItem("accessToken");

      const payload = {
        name: formData.name,
        designation: formData.designation || "Student",
        schoolName: formData.schoolName || "",
        content: formData.content,
        rating: parseInt(formData.rating) || 5,
        avatar: formData.avatar || null,
        isApproved: formData.isApproved,
        isFeatured: formData.isFeatured,
      };

      const url = editingTestimonial
        ? `${API_URL}/content/testimonials/${editingTestimonial.id}`
        : `${API_URL}/content/testimonials`;

      const method = editingTestimonial ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save testimonial");
      }

      toast.success(editingTestimonial ? "Testimonial updated" : "Testimonial created");
      handleCloseModal();
      fetchTestimonials();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save testimonial");
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDeleteModal = (testimonial: Testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!testimonialToDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/content/testimonials/${testimonialToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete testimonial");
      }

      toast.success("Testimonial deleted");
      setShowDeleteModal(false);
      setTestimonialToDelete(null);
      fetchTestimonials();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete testimonial");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-slate-300"}`}
      />
    ));
  };

  return (
    <AdminLayout title="Testimonials">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
            <p className="text-slate-600">Manage customer testimonials and reviews</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchTestimonials}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={() => handleOpenModal()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Testimonial
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchTestimonials}
              className="ml-auto px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-slate-200" />
                  <div className="flex-1">
                    <div className="h-4 w-32 bg-slate-200 rounded mb-2" />
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                  </div>
                </div>
                <div className="h-20 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
            <Quote className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No testimonials found</h3>
            <p className="text-slate-500 mb-4">Add your first testimonial to get started</p>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Add Testimonial
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                      <p className="text-sm text-slate-500">{testimonial.designation}</p>
                      {testimonial.schoolName && (
                        <p className="text-xs text-slate-400">{testimonial.schoolName}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {testimonial.isFeatured && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        testimonial.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {testimonial.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">{renderStars(testimonial.rating)}</div>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenModal(testimonial)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-slate-500" />
                  </button>
                  <button
                    onClick={() => handleOpenDeleteModal(testimonial)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {testimonials.length} of {total} testimonials
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-4 py-2 text-sm font-medium">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Create/Edit Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col my-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => handleFormChange("designation", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Student / Teacher / Parent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">School Name</label>
                    <input
                      type="text"
                      value={formData.schoolName}
                      onChange={(e) => handleFormChange("schoolName", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="School / Institution"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Testimonial <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleFormChange("content", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Share their experience..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                    <select
                      value={formData.rating}
                      onChange={(e) => handleFormChange("rating", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {[5, 4, 3, 2, 1].map((r) => (
                        <option key={r} value={r}>
                          {r} Star{r > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <ImageUpload
                    value={formData.avatar}
                    onChange={(url) => handleFormChange("avatar", url)}
                    folder="avatars"
                    label="Avatar"
                    placeholder="Upload avatar image"
                    aspectRatio="square"
                    maxSize={2}
                  />
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isApproved}
                      onChange={(e) => handleFormChange("isApproved", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Approved</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => handleFormChange("isFeatured", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Featured</span>
                  </label>
                </div>
              </form>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={formLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingTestimonial ? "Update" : "Create"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && testimonialToDelete && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Delete Testimonial</h2>
                  <p className="text-slate-500 text-sm">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-slate-600 mb-6">
                Are you sure you want to delete the testimonial from <strong>{testimonialToDelete.name}</strong>?
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setTestimonialToDelete(null);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
