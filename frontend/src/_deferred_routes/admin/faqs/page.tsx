"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  X,
  Tag,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FAQFormData {
  question: string;
  answer: string;
  category: string;
  sortOrder: string;
  isPublished: boolean;
}

const initialFormData: FAQFormData = {
  question: "",
  answer: "",
  category: "General",
  sortOrder: "0",
  isPublished: true,
};

const defaultCategories = ["General", "Courses", "Programs", "Pricing", "Support", "Registration"];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [faqToDelete, setFaqToDelete] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState<FAQFormData>(initialFormData);
  const [formLoading, setFormLoading] = useState(false);

  const fetchFAQs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      
      // Fetch FAQs - admin sees all, not just published
      const params = new URLSearchParams();
      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      const response = await fetch(`${API_URL}/content/faq?${params}`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const result = await response.json();

      if (result.success) {
        let faqList = result.data || [];
        
        // Filter by search query
        if (searchQuery) {
          faqList = faqList.filter(
            (faq: FAQ) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setFaqs(faqList);
      } else {
        throw new Error(result.message || "Failed to fetch FAQs");
      }

      // Fetch categories
      const catResponse = await fetch(`${API_URL}/content/faq/categories`, {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const catResult = await catResponse.json();
      if (catResult.success && catResult.data?.length > 0) {
        setCategories([...new Set([...defaultCategories, ...catResult.data])]);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setError("Failed to load FAQs");
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

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

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleOpenModal = (faq?: FAQ) => {
    if (faq) {
      setEditingFAQ(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || "General",
        sortOrder: faq.sortOrder.toString(),
        isPublished: faq.isPublished,
      });
    } else {
      setEditingFAQ(null);
      setFormData(initialFormData);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFAQ(null);
    setFormData(initialFormData);
  };

  const handleFormChange = (field: keyof FAQFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question || !formData.answer) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setFormLoading(true);
      const token = localStorage.getItem("accessToken");

      const payload = {
        question: formData.question,
        answer: formData.answer,
        category: formData.category || "General",
        sortOrder: parseInt(formData.sortOrder) || 0,
        isPublished: formData.isPublished,
      };

      const url = editingFAQ
        ? `${API_URL}/content/faq/${editingFAQ.id}`
        : `${API_URL}/content/faq`;

      const method = editingFAQ ? "PUT" : "POST";

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
        throw new Error(result.message || "Failed to save FAQ");
      }

      toast.success(editingFAQ ? "FAQ updated" : "FAQ created");
      handleCloseModal();
      fetchFAQs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save FAQ");
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDeleteModal = (faq: FAQ) => {
    setFaqToDelete(faq);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/content/faq/${faqToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete FAQ");
      }

      toast.success("FAQ deleted");
      setShowDeleteModal(false);
      setFaqToDelete(null);
      fetchFAQs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete FAQ");
    }
  };

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const cat = faq.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <AdminLayout title="FAQs">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">FAQs</h1>
            <p className="text-slate-600">Manage frequently asked questions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchFAQs}
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
              Add FAQ
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchFAQs}
              className="ml-auto px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 animate-pulse">
                <div className="h-5 w-3/4 bg-slate-200 rounded mb-3" />
                <div className="h-3 w-1/2 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : faqs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No FAQs found</h3>
            <p className="text-slate-500 mb-4">Add your first FAQ to get started</p>
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
            >
              Add FAQ
            </button>
          </div>
        ) : selectedCategory === "all" ? (
          // Grouped view
          <div className="space-y-8">
            {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-semibold text-slate-900">{category}</h2>
                  <span className="text-sm text-slate-500">({categoryFaqs.length})</span>
                </div>
                <div className="space-y-3">
                  {categoryFaqs.map((faq, index) => (
                    <FAQItem
                      key={faq.id}
                      faq={faq}
                      index={index}
                      expanded={expandedIds.has(faq.id)}
                      onToggle={() => toggleExpand(faq.id)}
                      onEdit={() => handleOpenModal(faq)}
                      onDelete={() => handleOpenDeleteModal(faq)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Flat list
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                expanded={expandedIds.has(faq.id)}
                onToggle={() => toggleExpand(faq.id)}
                onEdit={() => handleOpenModal(faq)}
                onDelete={() => handleOpenDeleteModal(faq)}
              />
            ))}
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
                  {editingFAQ ? "Edit FAQ" : "Add FAQ"}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Question <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => handleFormChange("question", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How do I enroll in a course?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Answer <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => handleFormChange("answer", e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Provide a detailed answer..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleFormChange("category", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Sort Order</label>
                    <input
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => handleFormChange("sortOrder", e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => handleFormChange("isPublished", e.target.checked)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Published</span>
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
                  {editingFAQ ? "Update" : "Create"}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && faqToDelete && (
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
                  <h2 className="text-xl font-bold text-slate-900">Delete FAQ</h2>
                  <p className="text-slate-500 text-sm">This action cannot be undone</p>
                </div>
              </div>

              <p className="text-slate-600 mb-6">
                Are you sure you want to delete the FAQ:{" "}
                <strong className="line-clamp-2">{faqToDelete.question}</strong>?
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setFaqToDelete(null);
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

// FAQ Item Component
function FAQItem({
  faq,
  index,
  expanded,
  onToggle,
  onEdit,
  onDelete,
}: {
  faq: FAQ;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <HelpCircle className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          <span className="font-medium text-slate-900 truncate">{faq.question}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              faq.isPublished ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            {faq.isPublished ? "Published" : "Draft"}
          </span>
          <span className="text-xs text-slate-400">#{faq.sortOrder}</span>
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="px-4 pb-4 border-t border-slate-100"
        >
          <p className="text-slate-600 text-sm mt-4 whitespace-pre-wrap">{faq.answer}</p>
          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4 text-slate-500" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
