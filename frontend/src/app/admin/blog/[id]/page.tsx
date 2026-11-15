"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, ExternalLink, Eye, EyeOff, Save, Send, X } from "lucide-react";
import { ApiError, adminApi, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUploader from "@/components/admin/ImageUploader";
import { formatDateTime, timeAgo, type FieldErrors } from "@/components/admin/format";
import { Badge, Button, Card, ErrorState, Field, Input, LoadingBlock, Textarea } from "@/components/admin/ui";

interface PostDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  updatedAt: string;
  cover: UploadedMedia | null;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: UploadedMedia | null;
  coverAlt: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
}

const EMPTY: FormState = { title: "", slug: "", excerpt: "", content: "", cover: null, coverAlt: "", metaTitle: "", metaDescription: "", tags: [] };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 200)
    .replace(/-+$/g, "");
}

function TagInput({ tags, onChange }: { tags: string[]; onChange: (tags: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const parts = raw
      .split(",")
      .map((t) => t.trim().replace(/\s+/g, " ").slice(0, 40))
      .filter(Boolean);
    const next = [...tags];
    for (const p of parts) if (!next.some((t) => t.toLowerCase() === p.toLowerCase()) && next.length < 10) next.push(p);
    onChange(next);
    setDraft("");
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (draft.trim()) add(draft);
    } else if (e.key === "Backspace" && !draft && tags.length) {
      onChange(tags.slice(0, -1));
    }
  };
  return (
    <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-white p-2 focus-within:ring-2 focus-within:ring-orange-400/60 focus-within:border-orange-400">
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold pl-2 pr-1 py-1">
          {t}
          <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))} className="rounded hover:bg-orange-100 p-0.5" aria-label={`Remove ${t}`}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {tags.length < 10 && (
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => draft.trim() && add(draft)}
          placeholder={tags.length ? "" : "e.g. Robotics, ATL"}
          className="flex-1 min-w-[100px] text-sm outline-none px-1 py-1"
          aria-label="Add tag"
        />
      )}
    </div>
  );
}

export default function PostEditorPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";
  const [postId, setPostId] = useState<string | null>(isNew ? null : params.id);
  const [loaded, setLoaded] = useState<PostDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [slugTouched, setSlugTouched] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState<null | "DRAFT" | "PUBLISHED">(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [words, setWords] = useState(0);
  const [ready, setReady] = useState(isNew);
  const saveRef = useRef<(target?: "DRAFT" | "PUBLISHED") => Promise<void>>();
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // Grow the title box with its text
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [form.title, ready]);

  useEffect(() => {
    if (isNew) return;
    adminApi
      .get<PostDetail>(`/admin/blog/${params.id}`)
      .then(({ data }) => {
        setLoaded(data);
        setStatus(data.status);
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          content: data.content,
          cover: data.cover,
          coverAlt: data.coverAlt ?? "",
          metaTitle: data.metaTitle ?? "",
          metaDescription: data.metaDescription ?? "",
          tags: data.tags,
        });
        setSlugTouched(true);
        setWords(data.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length);
        setReady(true);
      })
      .catch((err) => setLoadError((err as Error).message));
  }, [isNew, params.id]);

  const update = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  }, []);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const save = async (target: "DRAFT" | "PUBLISHED" = status) => {
    if (form.title.trim().length < 3) {
      setErrors({ title: "Give the post a title (at least 3 characters)." });
      toast.error("Give the post a title first.");
      return;
    }
    if (target === "PUBLISHED" && !form.content) {
      toast.error("Write some content before publishing.");
      return;
    }
    setSaving(target);
    setErrors({});
    const body: Record<string, unknown> = {
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      coverId: form.cover?.id ?? null,
      coverAlt: form.coverAlt,
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      tags: form.tags,
      status: target,
    };
    if (slugTouched && form.slug.trim() && form.slug !== loaded?.slug) body.slug = form.slug;
    try {
      const { data } = postId ? await adminApi.patch<PostDetail>(`/admin/blog/${postId}`, body) : await adminApi.post<PostDetail>("/admin/blog", body);
      setLoaded(data);
      setStatus(data.status);
      setForm((f) => ({ ...f, slug: data.slug, excerpt: f.excerpt }));
      setSlugTouched(true);
      setDirty(false);
      toast.success(target === "PUBLISHED" ? (status === "PUBLISHED" ? "Post updated" : "Post published 🎉") : status === "PUBLISHED" ? "Post moved back to drafts" : "Draft saved");
      if (!postId) {
        setPostId(data.id);
        // Swap the URL without remounting the page, so the editor keeps the cursor and undo history.
        window.history.replaceState(null, "", `/admin/blog/${data.id}`);
      }
    } catch (err) {
      setErrors((err as ApiError).fieldErrors ?? {});
      toast.error((err as Error).message);
    } finally {
      setSaving(null);
    }
  };
  saveRef.current = save;

  // Ctrl/Cmd + S saves
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        void saveRef.current?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (loadError) return <ErrorState message={loadError} />;
  if (!ready) return <LoadingBlock label="Loading post…" />;

  const published = status === "PUBLISHED";
  const autoSlug = slugify(form.title);
  const shownSlug = slugTouched ? form.slug : autoSlug;
  const seoTitle = (form.metaTitle || form.title || "Post title").trim();
  const seoDescription = (form.metaDescription || form.excerpt || "Add an excerpt or meta description so Google shows a helpful summary.").trim();
  const minutes = Math.max(1, Math.round(words / 200));

  return (
    <div className="pb-16">
      {/* Top bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-4 h-4" /> All posts
        </Link>
        {published ? <Badge tone="green">Published</Badge> : <Badge>Draft</Badge>}
        {loaded && (
          <span className="text-xs text-slate-400" title={formatDateTime(loaded.updatedAt)}>
            Saved {timeAgo(loaded.updatedAt)}
          </span>
        )}
        {dirty && <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>}
        <div className="ml-auto flex flex-wrap gap-2">
          {published && loaded && (
            <a href={`/blog/${loaded.slug}`} target="_blank" rel="noopener">
              <Button variant="ghost" icon={<ExternalLink className="w-4 h-4" />}>
                View
              </Button>
            </a>
          )}
          {published ? (
            <>
              <Button variant="secondary" icon={<EyeOff className="w-4 h-4" />} loading={saving === "DRAFT"} disabled={saving !== null} onClick={() => void save("DRAFT")}>
                Unpublish
              </Button>
              <Button icon={<Save className="w-4 h-4" />} loading={saving === "PUBLISHED"} disabled={saving !== null} onClick={() => void save("PUBLISHED")}>
                Update
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" icon={<Save className="w-4 h-4" />} loading={saving === "DRAFT"} disabled={saving !== null} onClick={() => void save("DRAFT")}>
                Save draft
              </Button>
              <Button icon={<Send className="w-4 h-4" />} loading={saving === "PUBLISHED"} disabled={saving !== null} onClick={() => void save("PUBLISHED")}>
                Publish
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">
        {/* Main column */}
        <div className="space-y-4 min-w-0">
          <div>
            <textarea
              ref={titleRef}
              value={form.title}
              onChange={(e) => {
                update("title", e.target.value.replace(/\n/g, " "));
                if (errors.title) setErrors((x) => ({ ...x, title: "" }));
              }}
              placeholder="Post title"
              rows={1}
              maxLength={200}
              aria-label="Post title"
              className={cn(
                "w-full resize-none overflow-hidden bg-transparent text-3xl sm:text-4xl font-black text-slate-900 placeholder:text-slate-300 focus:outline-none leading-tight",
                errors.title && "placeholder:text-red-300",
              )}
            />
            {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
          </div>
          <RichTextEditor
            initialHtml={form.content}
            onChange={(html, count) => {
              update("content", html);
              setWords(count);
            }}
          />
          <p className="text-xs text-slate-500">
            {words} words · about {minutes} min read · Tip: press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">Ctrl</kbd>+
            <kbd className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">S</kbd> to save.
          </p>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 xl:sticky xl:top-24">
          <Card className="p-4 space-y-4">
            <Field label="URL" htmlFor="post-slug" error={errors.slug} hint={published ? "Changing the URL of a published post breaks links already shared." : undefined}>
              <div className="flex items-center rounded-xl border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-orange-400/60 focus-within:border-orange-400 overflow-hidden">
                <span className="pl-3 text-xs text-slate-400 whitespace-nowrap">/blog/</span>
                <input
                  id="post-slug"
                  value={shownSlug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    update("slug", slugify(e.target.value.replace(/\s/g, "-")) + (e.target.value.endsWith("-") ? "-" : ""));
                  }}
                  onBlur={() => form.slug && update("slug", slugify(form.slug))}
                  className="flex-1 min-w-0 h-10 pr-3 text-sm outline-none bg-transparent"
                />
              </div>
            </Field>
            <Field label="Excerpt" htmlFor="post-excerpt" hint="Summary for the blog listing and Google. Leave empty to use the first lines." error={errors.excerpt} count={form.excerpt.length} max={400}>
              <Textarea id="post-excerpt" rows={3} maxLength={400} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} />
            </Field>
            <Field label="Tags" hint="Press Enter or comma after each tag (max 10)." error={errors.tags}>
              <TagInput tags={form.tags} onChange={(tags) => update("tags", tags)} />
            </Field>
          </Card>

          <Card className="p-4 space-y-3">
            <Field label="Cover image" hint="Shown at the top of the post and when shared on WhatsApp / LinkedIn (1200×630 works best).">
              <ImageUploader value={form.cover} onChange={(cover) => update("cover", cover)} purpose="blog-cover" aspect="aspect-[1200/630]" label="Upload cover" />
            </Field>
            {form.cover && (
              <Field label="Cover description (alt text)" htmlFor="cover-alt" count={form.coverAlt.length} max={250} error={errors.coverAlt}>
                <Input id="cover-alt" value={form.coverAlt} maxLength={250} onChange={(e) => update("coverAlt", e.target.value)} />
              </Field>
            )}
          </Card>

          <Card className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-slate-400" /> Search engine preview
              </h3>
              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs text-slate-500 truncate">www.stemmantra.com › blog › {shownSlug || "…"}</p>
                <p className="text-[17px] leading-snug text-[#1a0dab] line-clamp-2 mt-0.5">{seoTitle} | STEMmantra Blog</p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1">{seoDescription}</p>
              </div>
            </div>
            <Field label="SEO title" htmlFor="meta-title" hint="Optional. Defaults to the post title." count={form.metaTitle.length} max={70} error={errors.metaTitle}>
              <Input id="meta-title" value={form.metaTitle} maxLength={70} onChange={(e) => update("metaTitle", e.target.value)} />
            </Field>
            <Field label="Meta description" htmlFor="meta-desc" hint="Optional. Defaults to the excerpt." count={form.metaDescription.length} max={170} error={errors.metaDescription}>
              <Textarea id="meta-desc" rows={3} maxLength={170} value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} />
            </Field>
          </Card>
        </div>
      </div>
    </div>
  );
}
