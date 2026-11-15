"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { GripVertical, MessageSquareQuote, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { ApiError, adminApi, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import ImageUploader, { previewUrl } from "@/components/admin/ImageUploader";
import { SortableItem, SortableList } from "@/components/admin/Sortable";
import type { FieldErrors } from "@/components/admin/format";
import { Badge, Button, Card, ConfirmDialog, EmptyState, ErrorState, Field, IconButton, Input, LoadingBlock, Modal, PageHeader, Switch, Textarea } from "@/components/admin/ui";

interface Testimonial {
  id: string;
  authorName: string;
  designation: string | null;
  organization: string | null;
  content: string;
  rating: number;
  isPublished: boolean;
  photo: UploadedMedia | null;
}

type Form = { authorName: string; designation: string; organization: string; content: string; rating: number; isPublished: boolean; photo: UploadedMedia | null };
const emptyForm: Form = { authorName: "", designation: "", organization: "", content: "", rating: 5, isPublished: true, photo: null };

const initials = (name: string) =>
  name
    .replace(/^(mr|mrs|ms|dr|prof)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((p, i, all) => (i === 0 || i === all.length - 1 ? p[0] : ""))
    .join("")
    .toUpperCase();

function Avatar({ t, className = "w-12 h-12" }: { t: Pick<Testimonial, "authorName" | "photo">; className?: string }) {
  return t.photo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={previewUrl(t.photo)} alt="" className={cn("rounded-xl object-cover bg-slate-100 flex-shrink-0", className)} loading="lazy" />
  ) : (
    <span className={cn("rounded-xl bg-gradient-to-br from-orange-400 to-teal-500 text-white font-bold flex items-center justify-center flex-shrink-0", className)}>{initials(t.authorName) || "?"}</span>
  );
}

function TestimonialModal({ open, editing, onClose, onSaved }: { open: boolean; editing: Testimonial | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      editing
        ? {
            authorName: editing.authorName,
            designation: editing.designation ?? "",
            organization: editing.organization ?? "",
            content: editing.content,
            rating: editing.rating,
            isPublished: editing.isPublished,
            photo: editing.photo,
          }
        : emptyForm,
    );
  }, [open, editing]);

  const save = async () => {
    setSaving(true);
    setErrors({});
    const { photo, ...rest } = form;
    const body = { ...rest, photoId: photo?.id ?? null };
    try {
      const { message } = editing ? await adminApi.patch(`/admin/testimonials/${editing.id}`, body) : await adminApi.post("/admin/testimonials", body);
      toast.success(message);
      onSaved();
      onClose();
    } catch (err) {
      setErrors((err as ApiError).fieldErrors ?? {});
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const contentLength = form.content.trim().length;

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={editing ? "Edit testimonial" : "Add testimonial"}
      description="Shown in the testimonial sliders on the home and programs pages."
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={save} disabled={form.authorName.trim().length < 2 || contentLength < 20}>
            {editing ? "Save changes" : "Add testimonial"}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-5">
        <Field label="Photo" hint="Optional — initials are shown without a photo.">
          <ImageUploader value={form.photo} onChange={(photo) => setForm({ ...form, photo })} purpose="testimonial" aspect="aspect-square" label="Upload photo" hint="square photo works best" />
        </Field>
        <div className="space-y-4">
          <Field label="Name" required htmlFor="t-name" error={errors.authorName} count={form.authorName.length} max={120}>
            <Input id="t-name" value={form.authorName} maxLength={120} onChange={(e) => setForm({ ...form, authorName: e.target.value })} placeholder="e.g. Mrs. Anita Sharma" autoFocus invalid={!!errors.authorName} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Designation" htmlFor="t-role" error={errors.designation} count={form.designation.length} max={120}>
              <Input id="t-role" value={form.designation} maxLength={120} onChange={(e) => setForm({ ...form, designation: e.target.value })} placeholder="Principal" />
            </Field>
            <Field label="School / organisation" htmlFor="t-org" error={errors.organization} count={form.organization.length} max={200}>
              <Input id="t-org" value={form.organization} maxLength={200} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
            </Field>
          </div>
          <Field
            label="Testimonial"
            required
            htmlFor="t-content"
            error={errors.content}
            hint={contentLength > 0 && contentLength < 20 ? "Write at least 20 characters." : "Long testimonials are shortened with a “Read more” link on the website."}
            count={form.content.length}
            max={2000}
          >
            <Textarea id="t-content" rows={6} value={form.content} maxLength={2000} onChange={(e) => setForm({ ...form, content: e.target.value })} invalid={!!errors.content} />
          </Field>
          <Field label="Rating">
            <div className="flex gap-1" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" role="radio" aria-checked={form.rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => setForm({ ...form, rating: n })} className="p-1">
                  <Star className={cn("w-6 h-6 transition-colors", n <= form.rating ? "fill-orange-400 text-orange-400" : "text-slate-300 hover:text-orange-300")} />
                </button>
              ))}
            </div>
          </Field>
          <Switch checked={form.isPublished} onChange={(v) => setForm({ ...form, isPublished: v })} label="Show on website" />
        </div>
      </div>
    </Modal>
  );
}

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ open: boolean; editing: Testimonial | null }>({ open: false, editing: null });
  const [deleting, setDeleting] = useState<Testimonial | null>(null);

  const load = useCallback(async () => {
    try {
      const { data } = await adminApi.get<Testimonial[]>("/admin/testimonials");
      setItems(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    void load();
    if (new URLSearchParams(window.location.search).get("new")) setModal({ open: true, editing: null });
  }, [load]);

  const reorder = async (next: Testimonial[]) => {
    const previous = items;
    setItems(next);
    try {
      await adminApi.patch("/admin/testimonials/reorder", { ids: next.map((t) => t.id) });
    } catch (err) {
      setItems(previous);
      toast.error((err as Error).message);
    }
  };

  if (error && !items) return <ErrorState message={error} onRetry={() => void load()} />;
  if (!items) return <LoadingBlock />;

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="What principals and educators say about STEMmantra. Drag to change the order of the slider."
        actions={
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModal({ open: true, editing: null })}>
            Add testimonial
          </Button>
        }
      />

      <Card>
        {items.length === 0 ? (
          <EmptyState
            icon={<MessageSquareQuote className="w-6 h-6" />}
            title="No testimonials yet"
            description="The testimonial sections stay hidden on the website until you add one."
            action={<Button onClick={() => setModal({ open: true, editing: null })}>Add testimonial</Button>}
          />
        ) : (
          <SortableList items={items} onReorder={reorder}>
            <ul className="divide-y divide-slate-100">
              {items.map((t) => (
                <SortableItem key={t.id} id={t.id}>
                  {({ handleProps, isDragging }) => (
                    <li className={cn("flex items-start gap-3 px-3 sm:px-4 py-4 bg-white", isDragging && "shadow-xl rounded-xl")}>
                      <button {...handleProps} className="mt-3 p-1.5 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing touch-none" aria-label={`Drag to reorder ${t.authorName}`}>
                        <GripVertical className="w-4 h-4" />
                      </button>
                      <Avatar t={t} />
                      <button className="flex-1 min-w-0 text-left" onClick={() => setModal({ open: true, editing: t })}>
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800">{t.authorName}</span>
                          {!t.isPublished && <Badge tone="amber">Hidden</Badge>}
                          <span className="inline-flex items-center gap-0.5 text-xs text-orange-500" aria-label={`${t.rating} stars`}>
                            {t.rating} <Star className="w-3 h-3 fill-current" />
                          </span>
                        </span>
                        {(t.designation || t.organization) && (
                          <span className="block text-xs text-slate-500 truncate">{[t.designation, t.organization].filter(Boolean).join(" · ")}</span>
                        )}
                        <span className="block text-sm text-slate-600 mt-1.5 line-clamp-2 break-words">“{t.content}”</span>
                      </button>
                      <IconButton label={`Edit ${t.authorName}`} onClick={() => setModal({ open: true, editing: t })}>
                        <Pencil className="w-4 h-4" />
                      </IconButton>
                      <IconButton label={`Delete ${t.authorName}`} className="hover:text-red-600 hover:bg-red-50" onClick={() => setDeleting(t)}>
                        <Trash2 className="w-4 h-4" />
                      </IconButton>
                    </li>
                  )}
                </SortableItem>
              ))}
            </ul>
          </SortableList>
        )}
      </Card>

      <TestimonialModal open={modal.open} editing={modal.editing} onClose={() => setModal({ open: false, editing: null })} onSaved={() => void load()} />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete this testimonial?"
        description={deleting ? `From ${deleting.authorName}. This can't be undone.` : undefined}
        onConfirm={async () => {
          if (!deleting) return;
          try {
            await adminApi.del(`/admin/testimonials/${deleting.id}`);
            toast.success("Testimonial deleted");
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
