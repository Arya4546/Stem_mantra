"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Archive, ArchiveRestore, CheckCircle2, Circle, Inbox, Mail, MailOpen, MessageCircle, Phone, RefreshCw, Search, Send, Trash2, TriangleAlert } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/components/admin/AdminShell";
import { formatDateTime, timeAgo } from "@/components/admin/format";
import { Badge, Button, Card, ConfirmDialog, EmptyState, ErrorState, Input, LoadingBlock, Modal, PageHeader, PaginationBar, Select } from "@/components/admin/ui";
import type { Pagination } from "@/types/site";

type Status = "NEW" | "READ" | "ARCHIVED";
type EmailStatus = "PENDING" | "SENT" | "FAILED" | "SKIPPED";

interface Enquiry {
  id: string;
  type: "CONTACT" | "DEMO";
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  interest: string | null;
  message: string | null;
  status: Status;
  emailStatus: EmailStatus;
  sourcePath: string | null;
  createdAt: string;
}

const TABS: { value: "all" | Status; label: string }[] = [
  { value: "all", label: "Inbox" },
  { value: "NEW", label: "New" },
  { value: "READ", label: "Read" },
  { value: "ARCHIVED", label: "Archived" },
];

function EmailStatusBadge({ status }: { status: EmailStatus }) {
  if (status === "SENT") return <Badge tone="green">Emailed</Badge>;
  if (status === "FAILED") return <Badge tone="red">Email failed</Badge>;
  if (status === "SKIPPED") return <Badge tone="amber">Not emailed</Badge>;
  return <Badge>Sending…</Badge>;
}

function whatsappLink(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return digits.length >= 11 ? `https://wa.me/${digits}` : null;
}

export default function EnquiriesPage() {
  const { refreshBadges } = useAdmin();
  const [status, setStatus] = useState<"all" | Status>("all");
  const [type, setType] = useState<"all" | "CONTACT" | "DEMO">("all");
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<Enquiry | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(q.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    try {
      const result = await adminApi.get<Enquiry[]>("/admin/enquiries", { status, type, q: search, page, limit: 25 });
      setRows(result.data);
      setPagination(result.pagination ?? null);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [status, type, search, page]);

  useEffect(() => {
    void load();
    setSelection(new Set());
  }, [load]);

  const openEnquiry = useCallback(
    async (enquiry: Enquiry) => {
      setOpen(enquiry);
      if (enquiry.status === "NEW") {
        try {
          const { data } = await adminApi.patch<Enquiry>(`/admin/enquiries/${enquiry.id}`, { status: "READ" });
          setOpen((current) => (current?.id === data.id ? data : current));
          setRows((list) => list?.map((r) => (r.id === data.id ? data : r)) ?? null);
          refreshBadges();
        } catch {
          /* non-critical */
        }
      }
    },
    [refreshBadges],
  );

  // Deep link from the dashboard: /admin/enquiries?open=<id>
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("open");
    if (!id) return;
    adminApi
      .get<Enquiry>(`/admin/enquiries/${id}`)
      .then(({ data }) => void openEnquiry(data))
      .catch(() => undefined);
  }, [openEnquiry]);

  const setOne = async (enquiry: Enquiry, next: Status) => {
    try {
      const { data } = await adminApi.patch<Enquiry>(`/admin/enquiries/${enquiry.id}`, { status: next });
      setOpen((current) => (current?.id === data.id ? data : current));
      toast.success(next === "ARCHIVED" ? "Archived" : next === "NEW" ? "Marked as unread" : "Moved to inbox");
      refreshBadges();
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const bulk = async (action: "read" | "unread" | "archive" | "delete", ids: string[]) => {
    setBusy(true);
    try {
      const { message } = await adminApi.post("/admin/enquiries/bulk-action", { ids, action });
      toast.success(message);
      setSelection(new Set());
      refreshBadges();
      await load();
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    } finally {
      setBusy(false);
    }
  };

  const resend = async (enquiry: Enquiry) => {
    setBusy(true);
    try {
      await adminApi.post(`/admin/enquiries/${enquiry.id}/resend`);
      toast.success("Email sent to the sales team");
      const { data } = await adminApi.get<Enquiry>(`/admin/enquiries/${enquiry.id}`);
      setOpen(data);
      await load();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const allSelected = !!rows?.length && rows.every((r) => selection.has(r.id));
  const toggle = (id: string) =>
    setSelection((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div>
      <PageHeader title="Enquiries" description="Messages from the contact form and “Book a demo” requests. Each one is also emailed to the sales team." />

      <Card>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-100">
          <div className="flex rounded-xl bg-slate-100 p-1 text-sm overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setStatus(tab.value);
                  setPage(1);
                }}
                className={cn("px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap", status === tab.value ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-800")}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Select
            value={type}
            onChange={(e) => {
              setType(e.target.value as typeof type);
              setPage(1);
            }}
            className="h-10 w-auto"
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="DEMO">Demo requests</option>
            <option value="CONTACT">Contact messages</option>
          </Select>
          <div className="relative flex-1 min-w-[200px] max-w-sm ml-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email, phone or school" className="pl-9 h-10" aria-label="Search enquiries" />
          </div>
          <Button variant="ghost" size="sm" icon={<RefreshCw className="w-4 h-4" />} onClick={() => void load()} aria-label="Refresh" />
        </div>

        {selection.size > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm">
            <span className="font-semibold mr-2">{selection.size} selected</span>
            <button disabled={busy} onClick={() => void bulk("read", [...selection]).catch(() => undefined)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10">
              <MailOpen className="w-4 h-4" /> Mark read
            </button>
            <button disabled={busy} onClick={() => void bulk("unread", [...selection]).catch(() => undefined)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10">
              <Mail className="w-4 h-4" /> Mark unread
            </button>
            <button disabled={busy} onClick={() => void bulk("archive", [...selection]).catch(() => undefined)} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-white/10">
              <Archive className="w-4 h-4" /> Archive
            </button>
            <button disabled={busy} onClick={() => setConfirmDelete([...selection])} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-red-300 hover:bg-red-500/20">
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        )}

        {error && !rows ? (
          <ErrorState message={error} onRetry={() => void load()} />
        ) : !rows ? (
          <LoadingBlock />
        ) : rows.length === 0 ? (
          <EmptyState icon={<Inbox className="w-6 h-6" />} title={search ? "No enquiries match your search" : status === "ARCHIVED" ? "Nothing archived" : "No enquiries here"} />
        ) : (
          <ul className="divide-y divide-slate-100">
            <li className="hidden md:flex items-center gap-3 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400 bg-slate-50/60">
              <input type="checkbox" checked={allSelected} onChange={() => setSelection(allSelected ? new Set() : new Set(rows.map((r) => r.id)))} className="w-4 h-4 accent-orange-500" aria-label="Select all" />
              <span className="flex-1">From</span>
              <span className="w-56">School / interest</span>
              <span className="w-28">Email</span>
              <span className="w-24 text-right">Received</span>
            </li>
            {rows.map((e) => (
              <li key={e.id} className={cn("flex items-start md:items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer", e.status === "NEW" && "bg-orange-50/40")} onClick={() => void openEnquiry(e)}>
                <input
                  type="checkbox"
                  checked={selection.has(e.id)}
                  onChange={() => toggle(e.id)}
                  onClick={(ev) => ev.stopPropagation()}
                  className="mt-1 md:mt-0 w-4 h-4 accent-orange-500"
                  aria-label={`Select enquiry from ${e.name}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {e.status === "NEW" ? <Circle className="w-2.5 h-2.5 fill-orange-500 text-orange-500" aria-label="New" /> : null}
                    <span className={cn("truncate", e.status === "NEW" ? "font-bold text-slate-900" : "font-medium text-slate-700")}>{e.name}</span>
                    <Badge tone={e.type === "DEMO" ? "purple" : "blue"}>{e.type === "DEMO" ? "Demo" : "Contact"}</Badge>
                    {e.status === "ARCHIVED" && <Badge>Archived</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 truncate">
                    {e.email}
                    {e.phone ? ` · ${e.phone}` : ""}
                  </p>
                  {e.message && <p className="text-xs text-slate-500 truncate md:hidden mt-0.5">{e.message}</p>}
                </div>
                <div className="hidden md:block w-56 min-w-0 text-sm text-slate-600">
                  <p className="truncate">{e.organization || "—"}</p>
                  {e.interest && <p className="text-xs text-slate-400 truncate">{e.interest}</p>}
                </div>
                <div className="hidden md:block w-28">
                  <EmailStatusBadge status={e.emailStatus} />
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap md:w-24 md:text-right" title={formatDateTime(e.createdAt)}>
                  {timeAgo(e.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
        {pagination && <PaginationBar page={pagination.page} totalPages={pagination.totalPages} total={pagination.total} onPage={setPage} />}
      </Card>

      <Modal open={open !== null} onOpenChange={(o) => !o && setOpen(null)} title={open ? `${open.type === "DEMO" ? "Demo request" : "Message"} from ${open.name}` : ""} size="lg">
        {open && (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${open.email}?subject=${encodeURIComponent(open.type === "DEMO" ? "Your STEMmantra demo request" : "Re: your message to STEMmantra")}`}>
                <Button size="sm" icon={<Send className="w-4 h-4" />}>
                  Reply by email
                </Button>
              </a>
              {open.phone && (
                <a href={`tel:${open.phone.replace(/[^\d+]/g, "")}`}>
                  <Button size="sm" variant="secondary" icon={<Phone className="w-4 h-4" />}>
                    Call
                  </Button>
                </a>
              )}
              {open.phone && whatsappLink(open.phone) && (
                <a href={whatsappLink(open.phone)!} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" variant="secondary" icon={<MessageCircle className="w-4 h-4" />}>
                    WhatsApp
                  </Button>
                </a>
              )}
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Name", open.name],
                ["Email", open.email],
                ["Phone", open.phone],
                ["School / organisation", open.organization],
                ["Interested in", open.interest],
                ["Received", formatDateTime(open.createdAt)],
                ["Sent from page", open.sourcePath],
              ].map(([label, value]) =>
                value ? (
                  <div key={label} className="min-w-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
                    <dd className="text-slate-800 break-words">{value}</dd>
                  </div>
                ) : null,
              )}
            </dl>

            {open.message && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Message</p>
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-sm text-slate-800 whitespace-pre-wrap break-words max-h-72 overflow-y-auto">{open.message}</div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 p-3">
              {open.emailStatus === "SENT" ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <TriangleAlert className="w-5 h-5 text-amber-500" />}
              <span className="text-sm text-slate-600 flex-1 min-w-[180px]">
                {open.emailStatus === "SENT"
                  ? "Notification emailed to the sales team."
                  : open.emailStatus === "PENDING"
                    ? "The notification email is being sent."
                    : "The notification email was not delivered."}
              </span>
              {open.emailStatus !== "SENT" && (
                <Button size="sm" variant="secondary" loading={busy} onClick={() => void resend(open)}>
                  Resend email
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 pt-4">
              <Button size="sm" variant="ghost" icon={<Mail className="w-4 h-4" />} onClick={() => void setOne(open, "NEW")} disabled={open.status === "NEW"}>
                Mark unread
              </Button>
              {open.status === "ARCHIVED" ? (
                <Button size="sm" variant="ghost" icon={<ArchiveRestore className="w-4 h-4" />} onClick={() => void setOne(open, "READ")}>
                  Move to inbox
                </Button>
              ) : (
                <Button size="sm" variant="ghost" icon={<Archive className="w-4 h-4" />} onClick={() => void setOne(open, "ARCHIVED")}>
                  Archive
                </Button>
              )}
              <Button size="sm" variant="ghost" className="ml-auto text-red-600 hover:bg-red-50" icon={<Trash2 className="w-4 h-4" />} onClick={() => setConfirmDelete([open.id])}>
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={confirmDelete !== null}
        onOpenChange={(o) => !o && setConfirmDelete(null)}
        title={confirmDelete && confirmDelete.length > 1 ? `Delete ${confirmDelete.length} enquiries?` : "Delete this enquiry?"}
        description="This can't be undone. Consider archiving instead."
        onConfirm={async () => {
          if (!confirmDelete) return;
          await bulk("delete", confirmDelete);
          setOpen(null);
        }}
      />
    </div>
  );
}
