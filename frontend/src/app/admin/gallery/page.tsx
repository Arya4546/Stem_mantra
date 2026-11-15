"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  CheckSquare,
  Eye,
  EyeOff,
  FolderOpen,
  GripVertical,
  ImagePlus,
  Loader2,
  MoveRight,
  Pencil,
  Plus,
  Square,
  Star,
  StarOff,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { ACCEPTED_IMAGE_TYPES, ApiError, adminApi, uploadImage, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { SortableItem, SortableList } from "@/components/admin/Sortable";
import { MAX_UPLOAD_MB, previewUrl } from "@/components/admin/ImageUploader";
import type { FieldErrors } from "@/components/admin/format";
import {
  Badge,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  ErrorState,
  Field,
  IconButton,
  Input,
  LoadingBlock,
  Modal,
  PageHeader,
  Select,
  Switch,
  Textarea,
} from "@/components/admin/ui";

// ── Types ────────────────────────────────────────────────────────────

interface GalleryType {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string | null;
  accent: string;
  layout: "GRID" | "MASONRY";
  isActive: boolean;
  imageCount: number;
  publishedCount: number;
}

interface Photo {
  id: string;
  title: string | null;
  altText: string;
  caption: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  categoryId: string;
  media: UploadedMedia;
}

interface UploadJob {
  key: string;
  name: string;
  preview: string;
  progress: number;
  status: "queued" | "uploading" | "done" | "error";
  error?: string;
}

const ACCENTS: { name: string; hex: string }[] = [
  { name: "orange", hex: "#f97316" },
  { name: "teal", hex: "#14b8a6" },
  { name: "blue", hex: "#3b82f6" },
  { name: "indigo", hex: "#6366f1" },
  { name: "purple", hex: "#a855f7" },
  { name: "pink", hex: "#ec4899" },
  { name: "green", hex: "#22c55e" },
  { name: "amber", hex: "#f59e0b" },
  { name: "rose", hex: "#f43f5e" },
  { name: "slate", hex: "#475569" },
];
const accentHex = (name: string) => ACCENTS.find((a) => a.name === name)?.hex ?? "#f97316";

const CONCURRENCY = 3;

// ── Gallery type form ────────────────────────────────────────────────

type TypeForm = { name: string; tagline: string; description: string; accent: string; layout: "GRID" | "MASONRY"; isActive: boolean };
const emptyTypeForm: TypeForm = { name: "", tagline: "", description: "", accent: "orange", layout: "GRID", isActive: true };

function TypeModal({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: GalleryType | null;
  onSaved: (type: GalleryType) => void;
}) {
  const [form, setForm] = useState<TypeForm>(emptyTypeForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      editing
        ? {
            name: editing.name,
            tagline: editing.tagline ?? "",
            description: editing.description ?? "",
            accent: editing.accent,
            layout: editing.layout,
            isActive: editing.isActive,
          }
        : emptyTypeForm,
    );
  }, [open, editing]);

  const save = async () => {
    setSaving(true);
    setErrors({});
    try {
      const { data, message } = editing
        ? await adminApi.patch<GalleryType>(`/admin/gallery/categories/${editing.id}`, form)
        : await adminApi.post<GalleryType>("/admin/gallery/categories", form);
      toast.success(message);
      onSaved(data);
      onOpenChange(false);
    } catch (err) {
      setErrors((err as ApiError).fieldErrors ?? {});
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? "Edit gallery type" : "New gallery type"}
      description="Each type is its own section on the Gallery page."
      footer={
        <>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button loading={saving} onClick={save} disabled={form.name.trim().length < 2}>
            {editing ? "Save changes" : "Create type"}
          </Button>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <Field label="Name" required htmlFor="type-name" error={errors.name} count={form.name.length} max={80}>
          <Input id="type-name" value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Workshops & Events" invalid={!!errors.name} autoFocus />
        </Field>
        <Field label="Badge text" htmlFor="type-tagline" hint="Small label above the section title, e.g. “Hands-on Learning”." error={errors.tagline} count={form.tagline.length} max={60}>
          <Input id="type-tagline" value={form.tagline} maxLength={60} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </Field>
        <Field label="Description" htmlFor="type-description" error={errors.description} count={form.description.length} max={500}>
          <Textarea id="type-description" rows={3} value={form.description} maxLength={500} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>
        <Field label="Colour">
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map((a) => (
              <button
                key={a.name}
                type="button"
                onClick={() => setForm({ ...form, accent: a.name })}
                className={cn("w-8 h-8 rounded-full ring-offset-2 transition", form.accent === a.name ? "ring-2 ring-slate-900" : "hover:scale-110")}
                style={{ backgroundColor: a.hex }}
                aria-label={a.name}
                aria-pressed={form.accent === a.name}
              />
            ))}
          </div>
        </Field>
        <Field label="Layout">
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["GRID", "Grid", "Even tiles — best for photos"],
                ["MASONRY", "Masonry", "Natural shapes — best for newspaper clippings"],
              ] as const
            ).map(([value, label, help]) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, layout: value })}
                className={cn(
                  "text-left rounded-xl border p-3 transition-colors",
                  form.layout === value ? "border-orange-400 bg-orange-50 ring-1 ring-orange-400" : "border-slate-200 hover:border-slate-300",
                )}
              >
                <span className="block text-sm font-semibold text-slate-800">{label}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{help}</span>
              </button>
            ))}
          </div>
        </Field>
        <Switch checked={form.isActive} onChange={(v) => setForm({ ...form, isActive: v })} label="Show on website" description="Turn off to hide the whole section without deleting photos." />
        <button type="submit" className="hidden" />
      </form>
    </Modal>
  );
}

// ── Photo edit form ──────────────────────────────────────────────────

function PhotoModal({
  photo,
  types,
  onClose,
  onSaved,
  onDelete,
}: {
  photo: Photo | null;
  types: GalleryType[];
  onClose: () => void;
  onSaved: (photo: Photo) => void;
  onDelete: (photo: Photo) => void;
}) {
  const [form, setForm] = useState({ title: "", altText: "", caption: "", isPublished: true, isFeatured: false, categoryId: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!photo) return;
    setErrors({});
    setForm({
      title: photo.title ?? "",
      altText: photo.altText ?? "",
      caption: photo.caption ?? "",
      isPublished: photo.isPublished,
      isFeatured: photo.isFeatured,
      categoryId: photo.categoryId,
    });
  }, [photo]);

  const save = async () => {
    if (!photo) return;
    setSaving(true);
    try {
      const { data } = await adminApi.patch<Photo>(`/admin/gallery/images/${photo.id}`, form);
      toast.success("Photo updated");
      onSaved(data);
      onClose();
    } catch (err) {
      setErrors((err as ApiError).fieldErrors ?? {});
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={photo !== null}
      onOpenChange={(open) => !open && onClose()}
      title="Edit photo"
      size="lg"
      footer={
        <>
          <Button variant="ghost" className="mr-auto text-red-600 hover:bg-red-50" icon={<Trash2 className="w-4 h-4" />} onClick={() => photo && onDelete(photo)}>
            Delete
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={save}>
            Save
          </Button>
        </>
      }
    >
      {photo && (
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-5">
          <div>
            <div className="rounded-xl overflow-hidden bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl(photo.media)} alt="" className="w-full h-auto" />
            </div>
            <a href={photo.media.url} target="_blank" rel="noopener" className="block text-xs text-orange-600 font-semibold mt-2 hover:underline">
              Open full size
            </a>
            {photo.media.width && (
              <p className="text-xs text-slate-500 mt-1">
                {photo.media.width} × {photo.media.height} px
              </p>
            )}
          </div>
          <div className="space-y-4">
            <Field label="Title" htmlFor="ph-title" error={errors.title} count={form.title.length} max={150}>
              <Input id="ph-title" value={form.title} maxLength={150} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Robotics workshop at DPS Noida" />
            </Field>
            <Field
              label="Alt text"
              htmlFor="ph-alt"
              hint="Describe what is in the photo — used by Google Images and screen readers. Leave empty to use the title."
              error={errors.altText}
              count={form.altText.length}
              max={250}
            >
              <Input id="ph-alt" value={form.altText} maxLength={250} onChange={(e) => setForm({ ...form, altText: e.target.value })} />
            </Field>
            <Field label="Caption" htmlFor="ph-caption" error={errors.caption} count={form.caption.length} max={500}>
              <Textarea id="ph-caption" rows={2} value={form.caption} maxLength={500} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            </Field>
            <Field label="Gallery type" htmlFor="ph-type">
              <Select id="ph-type" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                {types.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="space-y-3 rounded-xl bg-slate-50 p-4">
              <Switch checked={form.isPublished} onChange={(v) => setForm({ ...form, isPublished: v })} label="Show on website" />
              <Switch checked={form.isFeatured} onChange={(v) => setForm({ ...form, isFeatured: v })} label="Feature on home page" description="Featured photos fill the “Moments of Innovation” section." />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ── Page ─────────────────────────────────────────────────────────────

export default function GalleryAdminPage() {
  const [types, setTypes] = useState<GalleryType[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "hidden">("all");
  const [selection, setSelection] = useState<Set<string>>(new Set());
  const [jobs, setJobs] = useState<UploadJob[]>([]);
  const [typeModal, setTypeModal] = useState<{ open: boolean; editing: GalleryType | null }>({ open: false, editing: null });
  const [deleteType, setDeleteType] = useState<GalleryType | null>(null);
  const [moveTarget, setMoveTarget] = useState("");
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string[] | null>(null);
  const [moveOpen, setMoveOpen] = useState(false);
  const [bulkBusy, setBulkBusy] = useState(false);
  const queue = useRef<{ file: File; key: string; categoryId: string }[]>([]);
  const active = useRef(0);
  const shownTypeRef = useRef<string | null>(null);
  const previews = useRef(new Map<string, string>());

  /** Removes an upload card and frees its local preview image. */
  const dropJob = useCallback((key: string) => {
    const url = previews.current.get(key);
    if (url) URL.revokeObjectURL(url);
    previews.current.delete(key);
    setJobs((list) => list.filter((j) => j.key !== key));
  }, []);

  useEffect(() => {
    const map = previews.current;
    return () => map.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  const selected = types?.find((t) => t.id === selectedId) ?? null;

  const loadTypes = useCallback(async () => {
    try {
      const { data } = await adminApi.get<GalleryType[]>("/admin/gallery/categories");
      setTypes(data);
      setSelectedId((current) => (current && data.some((t) => t.id === current) ? current : data[0]?.id ?? null));
      setLoadError(null);
    } catch (err) {
      setLoadError((err as Error).message);
    }
  }, []);

  const loadPhotos = useCallback(async (categoryId: string) => {
    try {
      const { data } = await adminApi.get<Photo[]>("/admin/gallery/images", { categoryId, limit: 1000 });
      setPhotos(data);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }, []);

  useEffect(() => {
    void loadTypes();
  }, [loadTypes]);

  useEffect(() => {
    shownTypeRef.current = selectedId;
    setSelection(new Set());
    setFilter("all");
    if (selectedId) {
      setPhotos(null);
      void loadPhotos(selectedId);
    }
  }, [selectedId, loadPhotos]);

  const refreshAll = useCallback(async () => {
    await loadTypes();
    if (selectedId) await loadPhotos(selectedId);
  }, [loadTypes, loadPhotos, selectedId]);

  // ── uploads ──
  const pump = useCallback(() => {
    while (active.current < CONCURRENCY && queue.current.length > 0) {
      const job = queue.current.shift()!;
      active.current += 1;
      const update = (patch: Partial<UploadJob>) => setJobs((list) => list.map((j) => (j.key === job.key ? { ...j, ...patch } : j)));
      update({ status: "uploading" });
      uploadImage(job.file, "gallery", (progress) => update({ progress }))
        .then((media) => adminApi.post<Photo>("/admin/gallery/images", { categoryId: job.categoryId, mediaId: media.id }))
        .then(({ data }) => {
          update({ status: "done", progress: 100 });
          // new photos are placed first (the API gives them the lowest sort order)
          setPhotos((list) => (list && data.categoryId === shownTypeRef.current ? [data, ...list] : list));
          setTypes((list) => list?.map((t) => (t.id === job.categoryId ? { ...t, imageCount: t.imageCount + 1, publishedCount: t.publishedCount + 1 } : t)) ?? null);
          setTimeout(() => dropJob(job.key), 2500);
        })
        .catch((err: Error) => update({ status: "error", error: err.message }))
        .finally(() => {
          active.current -= 1;
          pump();
        });
    }
  }, [dropJob]);

  const onDrop = useCallback(
    (files: File[]) => {
      if (!selectedId || files.length === 0) return;
      const added = files.map((file) => ({ file, key: `${Date.now()}-${Math.random().toString(36).slice(2)}`, categoryId: selectedId }));
      queue.current.push(...added);
      setJobs((list) => [
        ...list,
        ...added.map(({ file, key }) => {
          const preview = URL.createObjectURL(file);
          previews.current.set(key, preview);
          return { key, name: file.name, preview, progress: 0, status: "queued" as const };
        }),
      ]);
      pump();
    },
    [selectedId, pump],
  );

  const dropzone = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxSize: MAX_UPLOAD_MB * 1024 * 1024,
    disabled: !selectedId,
    onDropRejected: (rejections) => {
      const big = rejections.filter((r) => r.errors.some((e) => e.code === "file-too-large")).length;
      toast.error(big ? `${big} file(s) are larger than ${MAX_UPLOAD_MB} MB and were skipped.` : `${rejections.length} file(s) are not supported images.`);
    },
  });

  // ── derived ──
  const visiblePhotos = useMemo(() => {
    if (!photos) return [];
    if (filter === "published") return photos.filter((p) => p.isPublished);
    if (filter === "hidden") return photos.filter((p) => !p.isPublished);
    return photos;
  }, [photos, filter]);

  const allSelected = visiblePhotos.length > 0 && visiblePhotos.every((p) => selection.has(p.id));
  const toggle = (id: string) =>
    setSelection((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // ── actions ──
  const reorderTypes = async (next: GalleryType[]) => {
    const previous = types;
    setTypes(next);
    try {
      await adminApi.patch("/admin/gallery/categories/reorder", { ids: next.map((t) => t.id) });
    } catch (err) {
      setTypes(previous);
      toast.error((err as Error).message);
    }
  };

  const reorderPhotos = async (next: Photo[]) => {
    if (!selectedId) return;
    const previous = photos;
    setPhotos(next);
    try {
      await adminApi.patch("/admin/gallery/images/reorder", { categoryId: selectedId, ids: next.map((p) => p.id) });
    } catch (err) {
      setPhotos(previous);
      toast.error((err as Error).message);
      void refreshAll();
    }
  };

  const bulk = async (action: "publish" | "unpublish" | "feature" | "unfeature" | "move" | "delete", ids: string[], categoryId?: string) => {
    setBulkBusy(true);
    try {
      const { message } = await adminApi.post("/admin/gallery/images/bulk-action", { ids, action, categoryId });
      toast.success(action === "delete" ? `${ids.length} photo(s) deleted` : message);
      setSelection(new Set());
      await refreshAll();
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    } finally {
      setBulkBusy(false);
    }
  };

  const removeType = async () => {
    if (!deleteType) return;
    try {
      await adminApi.del(`/admin/gallery/categories/${deleteType.id}`, deleteType.imageCount > 0 ? { moveTo: moveTarget } : undefined);
      toast.success("Gallery type deleted");
      if (selectedId === deleteType.id) setSelectedId(moveTarget || null);
      await loadTypes();
    } catch (err) {
      toast.error((err as Error).message);
      throw err;
    }
  };

  if (loadError && !types) return <ErrorState message={loadError} onRetry={() => void loadTypes()} />;
  if (!types) return <LoadingBlock />;

  const counts = {
    all: photos?.length ?? 0,
    published: photos?.filter((p) => p.isPublished).length ?? 0,
    hidden: photos?.filter((p) => !p.isPublished).length ?? 0,
  };
  const otherTypes = types.filter((t) => t.id !== deleteType?.id);

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Photos for the Gallery page. Each gallery type is a section; drag to change the order."
        actions={
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setTypeModal({ open: true, editing: null })}>
            New gallery type
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        {/* Types */}
        <Card className="lg:sticky lg:top-24">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">Gallery types</h2>
            <span className="text-xs text-slate-400">{types.length}</span>
          </div>
          {types.length === 0 ? (
            <EmptyState icon={<FolderOpen className="w-6 h-6" />} title="No gallery types yet" description="Create one (e.g. “Session in Action”) to start uploading." />
          ) : (
            <SortableList items={types} onReorder={reorderTypes}>
              <ul className="p-2 space-y-1">
                {types.map((t) => (
                  <SortableItem key={t.id} id={t.id}>
                    {({ handleProps, isDragging }) => (
                      <li
                        className={cn(
                          "group flex items-center gap-1 rounded-xl pr-1 transition-colors",
                          t.id === selectedId ? "bg-orange-50 ring-1 ring-orange-200" : "hover:bg-slate-50",
                          isDragging && "shadow-lg bg-white",
                        )}
                      >
                        <button {...handleProps} className="p-2 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing touch-none" aria-label={`Drag to reorder ${t.name}`}>
                          <GripVertical className="w-4 h-4" />
                        </button>
                        <button className="flex-1 min-w-0 text-left py-2" onClick={() => setSelectedId(t.id)}>
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentHex(t.accent) }} />
                            <span className={cn("text-sm font-semibold truncate", t.isActive ? "text-slate-800" : "text-slate-400 line-through")}>{t.name}</span>
                          </span>
                          <span className="block text-xs text-slate-500 pl-[18px]">
                            {t.publishedCount} shown{t.imageCount !== t.publishedCount ? ` · ${t.imageCount - t.publishedCount} hidden` : ""}
                            {!t.isActive && " · section hidden"}
                          </span>
                        </button>
                        <IconButton label={`Edit ${t.name}`} className="opacity-0 group-hover:opacity-100 focus:opacity-100" onClick={() => setTypeModal({ open: true, editing: t })}>
                          <Pencil className="w-4 h-4" />
                        </IconButton>
                      </li>
                    )}
                  </SortableItem>
                ))}
              </ul>
            </SortableList>
          )}
        </Card>

        {/* Photos of the selected type */}
        {selected ? (
          <div className="space-y-4 min-w-0">
            <Card className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-900 truncate">{selected.name}</h2>
                    <Badge>{selected.layout === "MASONRY" ? "Masonry" : "Grid"}</Badge>
                    {!selected.isActive && <Badge tone="amber">Hidden on website</Badge>}
                  </div>
                  {selected.tagline && <p className="text-sm text-slate-500 mt-0.5">{selected.tagline}</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <a href={`/gallery#${selected.slug}`} target="_blank" rel="noopener" className="inline-flex items-center h-9 px-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100">
                    View on site
                  </a>
                  <Button variant="secondary" size="sm" icon={<Pencil className="w-4 h-4" />} onClick={() => setTypeModal({ open: true, editing: selected })}>
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4" />}
                    className="hover:text-red-600 hover:border-red-200"
                    onClick={() => {
                      setMoveTarget(types.find((t) => t.id !== selected.id)?.id ?? "");
                      setDeleteType(selected);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              {/* Upload */}
              <div
                {...dropzone.getRootProps()}
                className={cn(
                  "mt-4 rounded-2xl border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors",
                  dropzone.isDragActive ? "border-orange-400 bg-orange-50" : "border-slate-200 hover:border-orange-300 hover:bg-orange-50/40",
                )}
              >
                <input {...dropzone.getInputProps()} aria-label="Upload photos" />
                <UploadCloud className="w-8 h-8 mx-auto text-orange-400" />
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  {dropzone.isDragActive ? "Drop to upload" : <>Drop photos here or <span className="text-orange-600">browse</span></>}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Added to the top of “{selected.name}” · several at once · up to {MAX_UPLOAD_MB} MB each · resized & converted to WebP automatically
                </p>
              </div>

              {jobs.length > 0 && (
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  {jobs.map((job) => (
                    <li key={job.key} className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={job.preview} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-700 truncate">{job.name}</p>
                        {job.status === "error" ? (
                          <p className="text-xs text-red-600 line-clamp-2">{job.error}</p>
                        ) : (
                          <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div className={cn("h-full transition-all", job.status === "done" ? "bg-emerald-500" : "bg-orange-500")} style={{ width: `${job.progress}%` }} />
                          </div>
                        )}
                      </div>
                      {job.status === "error" ? (
                        <IconButton label="Dismiss" onClick={() => dropJob(job.key)}>
                          <X className="w-4 h-4" />
                        </IconButton>
                      ) : job.status !== "done" ? (
                        <Loader2 className="w-4 h-4 animate-spin text-slate-400 mr-2" />
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-slate-100">
                <div className="flex rounded-xl bg-slate-100 p-1 text-sm">
                  {(["all", "published", "hidden"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setFilter(f);
                        setSelection(new Set());
                      }}
                      className={cn("px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors", filter === f ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-800")}
                    >
                      {f === "published" ? "Shown" : f} <span className="text-slate-400 font-medium">{counts[f]}</span>
                    </button>
                  ))}
                </div>
                {visiblePhotos.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={allSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    onClick={() => setSelection(allSelected ? new Set() : new Set(visiblePhotos.map((p) => p.id)))}
                  >
                    {allSelected ? "Clear selection" : "Select all"}
                  </Button>
                )}
                <p className="ml-auto text-xs text-slate-500 hidden md:block">{filter === "all" ? "Drag photos to change their order." : "Switch to “All” to reorder."}</p>
              </div>

              {selection.size > 0 && (
                <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 bg-slate-900 text-white">
                  <span className="text-sm font-semibold mr-2">{selection.size} selected</span>
                  {[
                    { label: "Show", icon: Eye, action: "publish" as const },
                    { label: "Hide", icon: EyeOff, action: "unpublish" as const },
                    { label: "Feature", icon: Star, action: "feature" as const },
                    { label: "Unfeature", icon: StarOff, action: "unfeature" as const },
                  ].map(({ label, icon: Icon, action }) => (
                    <button
                      key={action}
                      disabled={bulkBusy}
                      onClick={() => void bulk(action, [...selection]).catch(() => undefined)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm hover:bg-white/10 disabled:opacity-50"
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </button>
                  ))}
                  {types.length > 1 && (
                    <button
                      disabled={bulkBusy}
                      onClick={() => {
                        setMoveTarget(types.find((t) => t.id !== selectedId)?.id ?? "");
                        setMoveOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm hover:bg-white/10 disabled:opacity-50"
                    >
                      <MoveRight className="w-4 h-4" /> Move
                    </button>
                  )}
                  <button
                    disabled={bulkBusy}
                    onClick={() => setConfirmDelete([...selection])}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-red-300 hover:bg-red-500/20 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                  {bulkBusy && <Loader2 className="w-4 h-4 animate-spin" />}
                </div>
              )}

              {photos === null ? (
                <LoadingBlock label="Loading photos…" />
              ) : visiblePhotos.length === 0 ? (
                <EmptyState
                  icon={<ImagePlus className="w-6 h-6" />}
                  title={filter === "all" ? "No photos in this type yet" : `No ${filter === "hidden" ? "hidden" : "shown"} photos`}
                  description={filter === "all" ? "Drop photos into the box above to add them." : undefined}
                />
              ) : (
                <SortableList items={visiblePhotos} onReorder={reorderPhotos} layout="grid" disabled={filter !== "all"}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 p-4">
                    {visiblePhotos.map((photo) => {
                      const checked = selection.has(photo.id);
                      return (
                        <SortableItem key={photo.id} id={photo.id}>
                          {({ handleProps, isDragging }) => (
                            <div
                              className={cn(
                                "group relative aspect-square rounded-xl overflow-hidden bg-slate-100 ring-offset-2 transition-shadow",
                                checked && "ring-2 ring-orange-500",
                                isDragging && "shadow-2xl opacity-90",
                              )}
                            >
                              <button className="absolute inset-0" onClick={() => setEditingPhoto(photo)} aria-label={`Edit ${photo.title || photo.altText}`}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={previewUrl(photo.media)} alt="" loading="lazy" className={cn("w-full h-full object-cover", !photo.isPublished && "opacity-50 grayscale")} />
                              </button>
                              <button
                                onClick={() => toggle(photo.id)}
                                className={cn(
                                  "absolute top-2 left-2 w-7 h-7 rounded-lg flex items-center justify-center shadow transition-opacity",
                                  checked ? "bg-orange-500 text-white" : "bg-white/90 text-slate-500 opacity-0 group-hover:opacity-100 focus:opacity-100",
                                  selection.size > 0 && "opacity-100",
                                )}
                                aria-label={checked ? "Deselect" : "Select"}
                                aria-pressed={checked}
                              >
                                {checked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                              </button>
                              {filter === "all" && (
                                <button
                                  {...handleProps}
                                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-white/90 text-slate-500 flex items-center justify-center shadow opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-grab active:cursor-grabbing touch-none"
                                  aria-label="Drag to reorder"
                                >
                                  <GripVertical className="w-4 h-4" />
                                </button>
                              )}
                              <div className="absolute bottom-2 left-2 right-2 flex gap-1 pointer-events-none">
                                {!photo.isPublished && <Badge tone="amber">Hidden</Badge>}
                                {photo.isFeatured && (
                                  <Badge tone="orange">
                                    <Star className="w-3 h-3 fill-current" /> Home
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </SortableItem>
                      );
                    })}
                  </div>
                </SortableList>
              )}
            </Card>
          </div>
        ) : (
          <Card>
            <EmptyState icon={<FolderOpen className="w-6 h-6" />} title="Create a gallery type to get started" action={<Button onClick={() => setTypeModal({ open: true, editing: null })}>New gallery type</Button>} />
          </Card>
        )}
      </div>

      <TypeModal
        open={typeModal.open}
        editing={typeModal.editing}
        onOpenChange={(open) => setTypeModal((s) => ({ ...s, open }))}
        onSaved={(t) => {
          void loadTypes().then(() => setSelectedId(t.id));
        }}
      />

      <PhotoModal
        photo={editingPhoto}
        types={types}
        onClose={() => setEditingPhoto(null)}
        onSaved={() => void refreshAll()}
        onDelete={(p) => {
          setEditingPhoto(null);
          setConfirmDelete([p.id]);
        }}
      />

      <ConfirmDialog
        open={confirmDelete !== null}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
        title={confirmDelete && confirmDelete.length > 1 ? `Delete ${confirmDelete.length} photos?` : "Delete this photo?"}
        description="The photos are removed from the website and from storage. This can't be undone."
        onConfirm={async () => {
          if (confirmDelete) await bulk("delete", confirmDelete);
        }}
      />

      <ConfirmDialog
        open={moveOpen}
        onOpenChange={setMoveOpen}
        title={`Move ${selection.size} photo(s)`}
        confirmLabel="Move"
        tone="primary"
        onConfirm={async () => {
          await bulk("move", [...selection], moveTarget);
        }}
      >
        <Field label="Move to" htmlFor="move-to">
          <Select id="move-to" value={moveTarget} onChange={(e) => setMoveTarget(e.target.value)}>
            {types
              .filter((t) => t.id !== selectedId)
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
          </Select>
        </Field>
      </ConfirmDialog>

      <ConfirmDialog
        open={deleteType !== null}
        onOpenChange={(open) => !open && setDeleteType(null)}
        title={`Delete “${deleteType?.name ?? ""}”?`}
        description={
          deleteType && deleteType.imageCount > 0
            ? `This type has ${deleteType.imageCount} photo(s). They will be moved to the type you choose.`
            : "The section is removed from the Gallery page."
        }
        onConfirm={removeType}
      >
        {deleteType && deleteType.imageCount > 0 &&
          (otherTypes.length > 0 ? (
            <Field label="Move its photos to" htmlFor="type-move">
              <Select id="type-move" value={moveTarget} onChange={(e) => setMoveTarget(e.target.value)}>
                {otherTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Select>
            </Field>
          ) : (
            <p className="text-sm text-red-600">Create another gallery type first, or delete the photos.</p>
          ))}
      </ConfirmDialog>
    </div>
  );
}
