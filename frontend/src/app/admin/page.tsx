"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, FolderOpen, ImagePlus, Images, Inbox, MessageSquareQuote, Newspaper, PenSquare, Plus, School } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { useAdmin } from "@/components/admin/AdminShell";
import { Badge, Card, ErrorState, LoadingBlock, PageHeader } from "@/components/admin/ui";
import { formatDateTime, timeAgo } from "@/components/admin/format";

interface DashboardData {
  counts: {
    photos: number;
    galleryTypes: number;
    clients: number;
    testimonials: number;
    posts: number;
    drafts: number;
    newEnquiries: number;
    enquiriesThisWeek: number;
    failedEmails: number;
  };
  recentEnquiries: { id: string; type: "CONTACT" | "DEMO"; name: string; organization: string | null; status: string; createdAt: string }[];
  recentActivity: { id: string; action: string; entity: string; summary: string | null; createdAt: string; user: { fullName: string } | null }[];
}

const ENTITY_LABEL: Record<string, string> = {
  gallery_image: "photo",
  gallery_category: "gallery type",
  client: "client",
  testimonial: "testimonial",
  blog_post: "blog post",
  enquiry: "enquiry",
  user: "account",
};

export default function DashboardPage() {
  const { user, canManageEnquiries } = useAdmin();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    setError(null);
    adminApi
      .get<DashboardData>("/admin/dashboard")
      .then(({ data }) => setData(data))
      .catch((err) => setError(err.message));
  }, []);
  useEffect(load, [load]);

  if (error) return <ErrorState message={error} onRetry={load} />;
  if (!data) return <LoadingBlock />;
  const c = data.counts;

  const stats = [
    { label: "Gallery photos", value: c.photos, icon: Images, href: "/admin/gallery", tone: "bg-orange-50 text-orange-600" },
    { label: "Gallery types", value: c.galleryTypes, icon: FolderOpen, href: "/admin/gallery", tone: "bg-amber-50 text-amber-600" },
    { label: "Clients", value: c.clients, icon: School, href: "/admin/clients", tone: "bg-teal-50 text-teal-600" },
    { label: "Testimonials", value: c.testimonials, icon: MessageSquareQuote, href: "/admin/testimonials", tone: "bg-sky-50 text-sky-600" },
    { label: "Published posts", value: c.posts, sub: c.drafts ? `${c.drafts} draft${c.drafts === 1 ? "" : "s"}` : undefined, icon: Newspaper, href: "/admin/blog", tone: "bg-violet-50 text-violet-600" },
    ...(canManageEnquiries
      ? [{ label: "New enquiries", value: c.newEnquiries, sub: `${c.enquiriesThisWeek} this week`, icon: Inbox, href: "/admin/enquiries", tone: "bg-rose-50 text-rose-600" }]
      : []),
  ];

  return (
    <div>
      <PageHeader title={`Welcome, ${user.fullName.split(" ")[0]}`} description="Here is what's happening on stemmantra.com." />

      {canManageEnquiries && c.failedEmails > 0 && (
        <Link
          href="/admin/enquiries?status=all"
          className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 hover:bg-amber-100 transition-colors"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1">
            <strong>{c.failedEmails}</strong> enquiry notification email{c.failedEmails === 1 ? "" : "s"} could not be sent. Open the enquiry and use “Resend email”.
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, href, tone }) => (
          <Link key={label} href={href} className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 hover:border-orange-200 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tone}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
            {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: "Upload photos", href: "/admin/gallery", icon: ImagePlus },
          { label: "Write a post", href: "/admin/blog/new", icon: PenSquare },
          { label: "Add a client", href: "/admin/clients?new=1", icon: Plus },
          { label: "Add a testimonial", href: "/admin/testimonials?new=1", icon: Plus },
        ].map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} className="flex items-center gap-2.5 rounded-xl bg-slate-900 text-white px-4 py-3 text-sm font-semibold hover:bg-black transition-colors">
            <Icon className="w-4 h-4 text-orange-300" /> {label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {canManageEnquiries && (
          <Card>
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Latest enquiries</h2>
              <Link href="/admin/enquiries" className="text-sm font-semibold text-orange-600 hover:underline">
                View all
              </Link>
            </div>
            {data.recentEnquiries.length === 0 ? (
              <p className="px-5 py-10 text-sm text-slate-500 text-center">No enquiries yet. Contact and demo forms will appear here.</p>
            ) : (
              <ul className="divide-y divide-slate-100">
                {data.recentEnquiries.map((e) => (
                  <li key={e.id}>
                    <Link href={`/admin/enquiries?open=${e.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                      <Badge tone={e.type === "DEMO" ? "purple" : "blue"}>{e.type === "DEMO" ? "Demo" : "Contact"}</Badge>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-semibold text-slate-800 truncate">{e.name}</span>
                        {e.organization && <span className="block text-xs text-slate-500 truncate">{e.organization}</span>}
                      </span>
                      {e.status === "NEW" && <Badge tone="orange">New</Badge>}
                      <span className="text-xs text-slate-400 whitespace-nowrap" title={formatDateTime(e.createdAt)}>
                        {timeAgo(e.createdAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}

        <Card>
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Recent activity</h2>
          </div>
          {data.recentActivity.length === 0 ? (
            <p className="px-5 py-10 text-sm text-slate-500 text-center">Changes made in the admin will be listed here.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.recentActivity.map((a) => (
                <li key={a.id} className="flex items-start gap-3 px-5 py-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 flex-shrink-0" />
                  <span className="flex-1 min-w-0 text-sm text-slate-700">
                    <strong className="font-semibold">{a.user?.fullName ?? "System"}</strong> {a.action.replace(/_/g, " ")}{" "}
                    {ENTITY_LABEL[a.entity] ?? a.entity.replace(/_/g, " ")}
                    {a.summary && <span className="block text-xs text-slate-500 truncate">{a.summary}</span>}
                  </span>
                  <span className="text-xs text-slate-400 whitespace-nowrap" title={formatDateTime(a.createdAt)}>
                    {timeAgo(a.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
