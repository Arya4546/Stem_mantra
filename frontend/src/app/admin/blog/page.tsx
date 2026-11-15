"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ExternalLink, FileText, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { adminApi, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { previewUrl } from "@/components/admin/ImageUploader";
import { formatDate, formatDateTime, timeAgo } from "@/components/admin/format";
import { Badge, Button, Card, ConfirmDialog, EmptyState, ErrorState, IconButton, Input, LoadingBlock, PageHeader, PaginationBar } from "@/components/admin/ui";
import type { Pagination } from "@/types/site";

interface PostRow {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  updatedAt: string;
  readingMinutes: number;
  tags: string[];
  cover: UploadedMedia | null;
  author: { fullName: string } | null;
}

const TABS = [
  { value: "all", label: "All" },
  { value: "PUBLISHED", label: "Published" },
  { value: "DRAFT", label: "Drafts" },
] as const;

export default function BlogAdminPage() {
  const [status, setStatus] = useState<(typeof TABS)[number]["value"]>("all");
  const [q, setQ] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<PostRow[] | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<PostRow | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(q.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [q]);

  const load = useCallback(async () => {
    try {
      const result = await adminApi.get<PostRow[]>("/admin/blog", { status, q: search, page, limit: 20 });
      setRows(result.data);
      setPagination(result.pagination ?? null);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [status, search, page]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div>
      <PageHeader
        title="Blog"
        description="Articles published at stemmantra.com/blog."
        actions={
          <Link href="/admin/blog/new">
            <Button icon={<Plus className="w-4 h-4" />}>New post</Button>
          </Link>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-100">
          <div className="flex rounded-xl bg-slate-100 p-1 text-sm">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setStatus(tab.value);
                  setPage(1);
                }}
                className={cn("px-3 py-1.5 rounded-lg font-semibold transition-colors", status === tab.value ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-800")}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative flex-1 min-w-[200px] max-w-sm ml-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles" className="pl-9 h-10" aria-label="Search posts" />
          </div>
        </div>

        {error && !rows ? (
          <ErrorState message={error} onRetry={() => void load()} />
        ) : !rows ? (
          <LoadingBlock />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={<FileText className="w-6 h-6" />}
            title={search || status !== "all" ? "No posts match" : "No posts yet"}
            description={search || status !== "all" ? undefined : "Share news, guides and success stories — great for SEO."}
            action={
              !search && status === "all" ? (
                <Link href="/admin/blog/new">
                  <Button>Write your first post</Button>
                </Link>
              ) : undefined
            }
          />
        ) : (
          <ul className="divide-y divide-slate-100">
            {rows.map((post) => (
              <li key={post.id} className="flex items-center gap-3 sm:gap-4 px-4 py-3">
                <div className="w-20 h-14 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 hidden sm:block">
                  {post.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl(post.cover)} alt="" className="w-full h-full object-cover" loading="lazy" />
                  )}
                </div>
                <Link href={`/admin/blog/${post.id}`} className="flex-1 min-w-0 group">
                  <span className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-800 group-hover:text-orange-600 line-clamp-1 break-all">{post.title}</span>
                    {post.status === "PUBLISHED" ? <Badge tone="green">Published</Badge> : <Badge tone="slate">Draft</Badge>}
                  </span>
                  <span className="block text-xs text-slate-500 mt-0.5 truncate">
                    {post.status === "PUBLISHED" ? `Published ${formatDate(post.publishedAt)}` : `Edited ${timeAgo(post.updatedAt)}`}
                    {" · "}
                    {post.readingMinutes} min read
                    {post.tags.length > 0 && ` · ${post.tags.join(", ")}`}
                  </span>
                </Link>
                <span className="hidden lg:block text-xs text-slate-400 whitespace-nowrap" title={formatDateTime(post.updatedAt)}>
                  {post.author?.fullName}
                </span>
                {post.status === "PUBLISHED" && (
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noopener" className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="View on website">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link href={`/admin/blog/${post.id}`} className="inline-flex w-9 h-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800" aria-label={`Edit ${post.title}`}>
                  <Pencil className="w-4 h-4" />
                </Link>
                <IconButton label={`Delete ${post.title}`} className="hover:text-red-600 hover:bg-red-50" onClick={() => setDeleting(post)}>
                  <Trash2 className="w-4 h-4" />
                </IconButton>
              </li>
            ))}
          </ul>
        )}
        {pagination && <PaginationBar page={pagination.page} totalPages={pagination.totalPages} total={pagination.total} onPage={setPage} />}
      </Card>

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete this post?"
        description={deleting ? `“${deleting.title}” will be removed${deleting.status === "PUBLISHED" ? " from the website" : ""}. This can't be undone.` : undefined}
        onConfirm={async () => {
          if (!deleting) return;
          try {
            await adminApi.del(`/admin/blog/${deleting.id}`);
            toast.success("Post deleted");
            await load();
          } catch (err) {
            toast.error((err as Error).message);
            throw err;
          }
        }}
      />
    </div>
  );
}
