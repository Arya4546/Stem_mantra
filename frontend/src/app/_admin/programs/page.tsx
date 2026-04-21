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
  Eye,
  BookOpen,
  Users,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Loader2,
  GraduationCap,
  School,
  X,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type ProgramType = "ATL_LAB" | "ROBOTICS_LAB" | "STEM_LAB" | "CODING_COURSE" | "TEACHER_TRAINING" | "WORKSHOP";
type ProgramStatus = "ACTIVE" | "UPCOMING" | "COMPLETED" | "CANCELLED";

interface Program {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  type: ProgramType;
  status: ProgramStatus;
  thumbnail?: string;
  duration?: string;
  price?: number;
  discountPrice?: number;
  features?: string[];
  isFeatured: boolean;
  _count?: {
    courses: number;
    enrollments: number;
    schools: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProgramMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ProgramFormData {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  type: ProgramType;
  status: ProgramStatus;
  thumbnail: string;
  duration: string;
  price: string;
  discountPrice: string;
  features: string;
  isFeatured: boolean;
}

const initialFormData: ProgramFormData = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  type: "ROBOTICS_LAB",
  status: "ACTIVE",
  thumbnail: "",
  duration: "",
  price: "",
  discountPrice: "",
  features: "",
  isFeatured: false,
};

const programTypes = [
  { value: "all", label: "All Types" },
  { value: "ATL_LAB", label: "ATL Lab" },
  { value: "ROBOTICS_LAB", label: "Robotics Lab" },
  { value: "STEM_LAB", label: "STEM Lab" },
  { value: "CODING_COURSE", label: "Coding Course" },
  { value: "TEACHER_TRAINING", label: "Teacher Training" },
  { value: "WORKSHOP", label: "Workshop" },
];

const programTypeOptions: { value: ProgramType; label: string }[] = [
  { value: "ATL_LAB", label: "ATL Lab" },
  { value: "ROBOTICS_LAB", label: "Robotics Lab" },
  { value: "STEM_LAB", label: "STEM Lab" },
  { value: "CODING_COURSE", label: "Coding Course" },
  { value: "TEACHER_TRAINING", label: "Teacher Training" },
  { value: "WORKSHOP", label: "Workshop" },
];

const programStatusOptions: { value: ProgramStatus; label: string }[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "UPCOMING", label: "Upcoming" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<ProgramMeta | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Modal states
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);
  const [formData, setFormData] = useState<ProgramFormData>(initialFormData);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch programs from API
  const fetchPrograms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "9");
      if (searchQuery) params.append("search", searchQuery);
      if (selectedType !== "all") params.append("type", selectedType);
      if (selectedStatus !== "all") params.append("status", selectedStatus);
      
      const response = await fetch(`${API_URL}/programs?${params.toString()}`);
      
      const data = await response.json();
      
      if (data.success) {
        setPrograms(data.data || []);
        setMeta(data.meta || null);
      } else {
        throw new Error(data.message || "Failed to fetch programs");
      }
    } catch (err: any) {
      console.error("Error fetching programs:", err);
      setError("Failed to load programs. Please try again.");
      toast.error("Failed to load programs");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedType, selectedStatus]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  // Lock body scroll when modal is open - more comprehensive approach
  useEffect(() => {
    if (showProgramModal || showDeleteModal || selectedProgram) {
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
  }, [showProgramModal, showDeleteModal, selectedProgram]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleOpenModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      setFormData({
        name: program.name,
        slug: program.slug,
        description: program.description || "",
        shortDescription: program.shortDescription || "",
        type: program.type,
        status: program.status,
        thumbnail: program.thumbnail || "",
        duration: program.duration || "",
        price: program.price?.toString() || "",
        discountPrice: program.discountPrice?.toString() || "",
        features: program.features?.join("\n") || "",
        isFeatured: program.isFeatured,
      });
    } else {
      setEditingProgram(null);
      setFormData(initialFormData);
    }
    setShowProgramModal(true);
  };

  const handleCloseModal = () => {
    setShowProgramModal(false);
    setEditingProgram(null);
    setFormData(initialFormData);
  };

  const handleFormChange = (field: keyof ProgramFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "name" && !editingProgram) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.description || !formData.duration || !formData.price) {
      toast.error("Please fill in all required fields (name, type, description, duration, price)");
      return;
    }

    try {
      setFormLoading(true);
      const token = localStorage.getItem("accessToken");
      
      const payload = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        shortDescription: formData.shortDescription || null,
        type: formData.type,
        status: formData.status,
        thumbnail: formData.thumbnail || null,
        duration: formData.duration,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : null,
        features: formData.features.split("\n").filter(Boolean),
        isFeatured: formData.isFeatured,
      };

      const url = editingProgram
        ? `${API_URL}/programs/${editingProgram.id}`
        : `${API_URL}/programs`;
      
      const method = editingProgram ? "PUT" : "POST";

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
        throw new Error(result.message || "Failed to save program");
      }

      toast.success(editingProgram ? "Program updated successfully" : "Program created successfully");
      handleCloseModal();
      fetchPrograms();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save program");
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDeleteModal = (program: Program) => {
    setProgramToDelete(program);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!programToDelete) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${API_URL}/programs/${programToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete program");
      }

      toast.success("Program deleted successfully");
      setShowDeleteModal(false);
      setProgramToDelete(null);
      fetchPrograms();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete program");
    }
  };

  const getTypeColor = (type: ProgramType) => {
    switch (type) {
      case "ATL_LAB":
        return "bg-blue-100 text-blue-700";
      case "ROBOTICS_LAB":
        return "bg-purple-100 text-purple-700";
      case "STEM_LAB":
        return "bg-green-100 text-green-700";
      case "CODING_COURSE":
        return "bg-orange-100 text-orange-700";
      case "TEACHER_TRAINING":
        return "bg-indigo-100 text-indigo-700";
      case "WORKSHOP":
        return "bg-pink-100 text-pink-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getTypeLabel = (type: ProgramType) => {
    const labels: Record<ProgramType, string> = {
      ATL_LAB: "ATL Lab",
      ROBOTICS_LAB: "Robotics Lab",
      STEM_LAB: "STEM Lab",
      CODING_COURSE: "Coding Course",
      TEACHER_TRAINING: "Teacher Training",
      WORKSHOP: "Workshop",
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: ProgramStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "UPCOMING":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-slate-100 text-slate-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const totalEnrollments = programs.reduce((sum, p) => sum + (p._count?.enrollments || 0), 0);
  const totalSchools = programs.reduce((sum, p) => sum + (p._count?.schools || 0), 0);
  const totalCourses = programs.reduce((sum, p) => sum + (p._count?.courses || 0), 0);

  // Loading skeleton
  if (loading && programs.length === 0) {
    return (
      <AdminLayout title="Programs">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="h-10 w-10 bg-slate-200 rounded-lg animate-pulse mb-2" />
              <div className="h-4 w-20 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-6 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
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
    <AdminLayout title="Programs">
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Programs</h1>
          <p className="text-slate-600">Manage courses and training programs</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPrograms}
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
            Add Program
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error loading programs</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchPrograms}
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
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Programs</p>
              <p className="text-xl font-bold text-slate-900">{meta?.total || programs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Enrollments</p>
              <p className="text-xl font-bold text-green-600">{totalEnrollments}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Partner Schools</p>
              <p className="text-xl font-bold text-yellow-600">{totalSchools}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-slate-500 text-sm">Total Courses</p>
              <p className="text-xl font-bold text-purple-600">{totalCourses}</p>
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
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {programTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
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
            <option value="ACTIVE">Active</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Programs Grid */}
      {programs.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No programs found</h3>
          <p className="text-slate-500 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSelectedStatus("all");
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-video bg-gradient-to-br from-indigo-500 to-purple-600">
                {program.thumbnail && program.thumbnail.length > 0 ? (
                  <Image
                    src={program.thumbnail}
                    alt={program.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-12 h-12 text-white/50" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(program.type)}`}>
                    {getTypeLabel(program.type)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(program.status)}`}>
                    {program.status}
                  </span>
                </div>
                {program.isFeatured && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-yellow-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Featured
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 line-clamp-1">{program.name}</h3>
                {program.shortDescription && (
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{program.shortDescription}</p>
                )}
                
                <div className="flex items-center gap-4 mt-4 text-sm text-slate-500">
                  {program.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {program._count?.enrollments || 0} enrolled
                  </span>
                  <span className="flex items-center gap-1">
                    <School className="w-4 h-4" />
                    {program._count?.schools || 0} schools
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm text-slate-500">
                    {program._count?.courses || 0} courses
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-slate-500" />
                    </button>
                    <button 
                      onClick={() => handleOpenModal(program)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors" 
                      title="Edit"
                    >
                      <Edit className="w-4 h-4 text-slate-500" />
                    </button>
                    <button 
                      onClick={() => handleOpenDeleteModal(program)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto my-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Program Details</h2>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="aspect-video relative rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600">
                {selectedProgram.thumbnail && selectedProgram.thumbnail.length > 0 ? (
                  <Image
                    src={selectedProgram.thumbnail}
                    alt={selectedProgram.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <BookOpen className="w-16 h-16 text-white/50" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(selectedProgram.type)}`}>
                  {getTypeLabel(selectedProgram.type)}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedProgram.status)}`}>
                  {selectedProgram.status}
                </span>
                {selectedProgram.isFeatured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedProgram.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedProgram.slug}</p>
              </div>
              
              {selectedProgram.description && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-600">{selectedProgram.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">{selectedProgram._count?.courses || 0}</p>
                  <p className="text-xs text-slate-500">Courses</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{selectedProgram._count?.enrollments || 0}</p>
                  <p className="text-xs text-slate-500">Enrollments</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{selectedProgram._count?.schools || 0}</p>
                  <p className="text-xs text-slate-500">Schools</p>
                </div>
              </div>
              
              {selectedProgram.features && selectedProgram.features.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-2">Features</p>
                  <ul className="space-y-1">
                    {selectedProgram.features.map((feature, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="text-xs text-slate-400">
                Created: {new Date(selectedProgram.createdAt).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-medium">{programs.length}</span> of{" "}
            <span className="font-medium">{meta.total}</span> programs
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

      {/* Create/Edit Program Modal */}
      {showProgramModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col my-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                {editingProgram ? "Edit Program" : "Add New Program"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Program Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Robotics Lab Setup"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleFormChange("slug", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="robotics-lab-setup"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleFormChange("duration", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 3 months"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Program Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleFormChange("type", e.target.value as ProgramType)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {programTypeOptions.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleFormChange("status", e.target.value as ProgramStatus)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {programStatusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Short Description
                  </label>
                  <input
                    type="text"
                    value={formData.shortDescription}
                    onChange={(e) => handleFormChange("shortDescription", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Brief description for cards and previews"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Detailed program description..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 15000"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => handleFormChange("discountPrice", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 12000"
                    min="0"
                    step="0.01"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => handleFormChange("features", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Hands-on learning&#10;Expert instructors&#10;Project-based curriculum"
                  />
                </div>
                
                <div className="col-span-2">
                  <ImageUpload
                    value={formData.thumbnail}
                    onChange={(url) => handleFormChange("thumbnail", url)}
                    folder="courses"
                    label="Program Thumbnail"
                    placeholder="Upload program thumbnail"
                    aspectRatio="video"
                  />
                </div>
                
                <div className="col-span-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => handleFormChange("isFeatured", e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
                    Featured Program
                  </label>
                </div>
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
                {editingProgram ? "Update Program" : "Create Program"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && programToDelete && (
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
                <h2 className="text-xl font-bold text-slate-900">Delete Program</h2>
                <p className="text-slate-500 text-sm">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-slate-600 mb-6">
              Are you sure you want to delete <strong>{programToDelete.name}</strong>? 
              {programToDelete._count?.enrollments && programToDelete._count.enrollments > 0 && (
                <span className="text-red-600 block mt-2">
                  Warning: This program has {programToDelete._count.enrollments} enrollment(s).
                </span>
              )}
            </p>
            
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setProgramToDelete(null);
                }}
                className="px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete Program
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
