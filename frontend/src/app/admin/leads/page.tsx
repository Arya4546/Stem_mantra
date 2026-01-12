"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Search,
  Filter,
  Eye,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  X,
  Clock,
  MessageSquare,
  RefreshCw,
  Users,
  TrendingUp,
  Star,
  AlertCircle,
  Loader2,
  User,
  Building,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "NEGOTIATING" | "WON" | "LOST";
type LeadSource = "WEBSITE" | "REFERRAL" | "SOCIAL_MEDIA" | "ADVERTISEMENT" | "EVENT" | "COLD_CALL" | "PARTNER" | "OTHER";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  designation?: string;
  city?: string;
  state?: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  interests?: string[];
  budget?: string;
  timeline?: string;
  notes?: string;
  assignedTo?: string;
  nextFollowUp?: string;
  lastContactAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    activities: number;
  };
}

interface LeadStats {
  total: number;
  highValue: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [updating, setUpdating] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  // Fetch leads from API
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("accessToken");
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("limit", "10");
      if (searchQuery) params.append("search", searchQuery);
      if (selectedStatus !== "all") params.append("status", selectedStatus);
      if (selectedSource !== "all") params.append("source", selectedSource);
      
      const response = await fetch(`${API_URL}/leads/leads?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setLeads(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      } else {
        throw new Error(data.message || "Failed to fetch leads");
      }
    } catch (err: any) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Please try again.");
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, selectedStatus, selectedSource]);

  // Fetch lead statistics
  const fetchStats = useCallback(async () => {
    try {
      setStatsLoading(true);
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/leads/leads/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Error fetching lead stats:", err);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Lock body scroll when modal is open - comprehensive approach
  useEffect(() => {
    if (selectedLead) {
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
  }, [selectedLead]);

  // Update lead status
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      setUpdating(leadId);
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/leads/leads/${leadId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`Lead status updated to ${newStatus}`);
        fetchLeads();
        fetchStats();
        if (selectedLead?.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (err: any) {
      console.error("Error updating lead status:", err);
      toast.error("Failed to update lead status");
    } finally {
      setUpdating(null);
    }
  };

  // Add note to lead
  const handleAddNote = async () => {
    if (!selectedLead || !noteText.trim()) return;
    
    try {
      setAddingNote(true);
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/leads/leads/${selectedLead.id}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: noteText }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("Note added successfully");
        setNoteText("");
        fetchLeads();
      } else {
        throw new Error(data.message || "Failed to add note");
      }
    } catch (err: any) {
      console.error("Error adding note:", err);
      toast.error("Failed to add note");
    } finally {
      setAddingNote(false);
    }
  };

  // Export leads
  const handleExport = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      
      const response = await fetch(`${API_URL}/leads/leads?limit=1000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        const csvContent = [
          ["Name", "Email", "Phone", "School", "City", "Status", "Source", "Score", "Created At"],
          ...data.data.map((lead: Lead) => [
            lead.name,
            lead.email,
            lead.phone || "",
            lead.schoolName || "",
            lead.city || "",
            lead.status,
            lead.source,
            lead.score,
            new Date(lead.createdAt).toLocaleDateString(),
          ]),
        ]
          .map((row) => row.join(","))
          .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
        toast.success("Leads exported successfully");
      }
    } catch (err) {
      console.error("Error exporting leads:", err);
      toast.error("Failed to export leads");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-700";
      case "CONTACTED":
        return "bg-yellow-100 text-yellow-700";
      case "QUALIFIED":
        return "bg-purple-100 text-purple-700";
      case "NEGOTIATING":
        return "bg-orange-100 text-orange-700";
      case "WON":
        return "bg-green-100 text-green-700";
      case "LOST":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 50) return "text-green-600";
    if (score >= 30) return "text-yellow-600";
    return "text-slate-600";
  };

  const getSourceLabel = (source: LeadSource) => {
    const labels: Record<LeadSource, string> = {
      WEBSITE: "Website",
      REFERRAL: "Referral",
      SOCIAL_MEDIA: "Social Media",
      ADVERTISEMENT: "Ad",
      EVENT: "Event",
      COLD_CALL: "Cold Call",
      PARTNER: "Partner",
      OTHER: "Other",
    };
    return labels[source] || source;
  };

  // Loading skeleton
  if (loading && leads.length === 0) {
    return (
      <AdminLayout title="Leads">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="h-4 w-16 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-8 w-12 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
              <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Leads">
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-600">Manage and track sales leads</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              fetchLeads();
              fetchStats();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 font-medium">Error loading leads</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
          <button
            onClick={fetchLeads}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statsLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="h-4 w-16 bg-slate-200 rounded animate-pulse mb-2" />
              <div className="h-8 w-12 bg-slate-200 rounded animate-pulse" />
            </div>
          ))
        ) : (
          <>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-slate-400" />
                <p className="text-slate-500 text-sm">Total Leads</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stats?.total || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <p className="text-slate-500 text-sm">High Value</p>
              </div>
              <p className="text-2xl font-bold text-yellow-600">{stats?.highValue || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <p className="text-slate-500 text-sm">New</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats?.byStatus?.NEW || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-purple-500" />
                <p className="text-slate-500 text-sm">Qualified</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats?.byStatus?.QUALIFIED || 0}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-green-500" />
                <p className="text-slate-500 text-sm">Won</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{stats?.byStatus?.WON || 0}</p>
            </div>
          </>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or school..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="NEGOTIATING">Negotiating</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
          <select
            value={selectedSource}
            onChange={(e) => {
              setSelectedSource(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Sources</option>
            <option value="WEBSITE">Website</option>
            <option value="REFERRAL">Referral</option>
            <option value="SOCIAL_MEDIA">Social Media</option>
            <option value="ADVERTISEMENT">Advertisement</option>
            <option value="EVENT">Event</option>
            <option value="COLD_CALL">Cold Call</option>
            <option value="PARTNER">Partner</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Lead</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Contact</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">School</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Source</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Score</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">No leads found</p>
                      <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{lead.name}</p>
                          {lead.designation && (
                            <p className="text-sm text-slate-500">{lead.designation}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-600 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-slate-400" />
                          {lead.email}
                        </p>
                        {lead.phone && (
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-slate-400" />
                            {lead.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-600">{lead.schoolName || "-"}</p>
                        {lead.city && (
                          <p className="text-sm text-slate-400">{lead.city}{lead.state ? `, ${lead.state}` : ""}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                        {getSourceLabel(lead.source)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                        {lead.score >= 50 && <Star className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(lead.id, "WON");
                          }}
                          disabled={updating === lead.id || lead.status === "WON"}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Mark as Won"
                        >
                          {updating === lead.id ? (
                            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4 text-green-500" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(lead.id, "LOST");
                          }}
                          disabled={updating === lead.id || lead.status === "LOST"}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Mark as Lost"
                        >
                          <X className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto my-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Lead Header */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {selectedLead.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{selectedLead.name}</h3>
                  {selectedLead.designation && (
                    <p className="text-slate-500">{selectedLead.designation}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span>
                    <span className={`text-sm font-semibold ${getScoreColor(selectedLead.score)}`}>
                      Score: {selectedLead.score}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">{selectedLead.phone || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">School</p>
                  <p className="font-medium text-slate-900">{selectedLead.schoolName || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Location</p>
                  <p className="font-medium text-slate-900">
                    {selectedLead.city || "-"}
                    {selectedLead.state && `, ${selectedLead.state}`}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Source</p>
                  <p className="font-medium text-slate-900">{getSourceLabel(selectedLead.source)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Timeline</p>
                  <p className="font-medium text-slate-900">{selectedLead.timeline || "-"}</p>
                </div>
              </div>

              {/* Interests */}
              {selectedLead.interests && selectedLead.interests.length > 0 && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-2">Interests</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.interests.map((interest, idx) => (
                      <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedLead.notes && (
                <div className="p-4 bg-slate-50 rounded-xl">
                  <p className="text-sm text-slate-500 mb-2">Notes</p>
                  <p className="text-slate-900">{selectedLead.notes}</p>
                </div>
              )}

              {/* Add Note */}
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-2">Add Note</p>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter a note..."
                  className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
                <button
                  onClick={handleAddNote}
                  disabled={!noteText.trim() || addingNote}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {addingNote ? (
                    <>
                      <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Note"
                  )}
                </button>
              </div>

              {/* Timestamps */}
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Created: {new Date(selectedLead.createdAt).toLocaleDateString()}
                </div>
                {selectedLead.lastContactAt && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    Last Contact: {new Date(selectedLead.lastContactAt).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Status Change Buttons */}
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 mb-2">Change Status</p>
                <div className="flex flex-wrap gap-2">
                  {(["NEW", "CONTACTED", "QUALIFIED", "NEGOTIATING", "WON", "LOST"] as LeadStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedLead.id, status)}
                      disabled={updating === selectedLead.id || selectedLead.status === status}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors disabled:opacity-50 ${
                        selectedLead.status === status
                          ? getStatusColor(status)
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-center"
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Send Email
                </a>
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 transition-colors text-center"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing <span className="font-medium">{leads.length}</span> of{" "}
          <span className="font-medium">{totalCount}</span> leads
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
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
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
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
