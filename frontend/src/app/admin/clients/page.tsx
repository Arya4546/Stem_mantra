"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ExternalLink, GripVertical, MapPin, Pencil, Plus, School, Search, Trash2 } from "lucide-react";
import { ApiError, adminApi, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import ImageUploader, { previewUrl } from "@/components/admin/ImageUploader";
import { SortableItem, SortableList } from "@/components/admin/Sortable";
import type { FieldErrors } from "@/components/admin/format";
import { Badge, Button, Card, ConfirmDialog, EmptyState, ErrorState, Field, IconButton, Input, LoadingBlock, Modal, PageHeader, Switch, Textarea } from "@/components/admin/ui";

interface Client {
  id: string;
  name: string;
  location: string | null;
  description: string | null;
  websiteUrl: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  logo: UploadedMedia | null;
}

type Form = { name: string; location: string; description: string; websiteUrl: string; isPublished: boolean; isFeatured: boolean; logo: UploadedMedia | null };
const emptyForm: Form = { name: "", location: "", description: "", websiteUrl: "", isPublished: true, isFeatured: true, logo: null };

function ClientModal({ open, editing, onClose, onSaved }: { open: boolean; editing: Client | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setForm(
      editing
        ? {
            name: editing.name,
            location: editing.location ?? "",
            description: editing.description ?? "",
            websiteUrl: editing.websiteUrl ?? "",
            isPublished: editing.isPublished,
            isFeatured: editing.isFeatured,
            logo: editing.logo,
          }
        : emptyForm,
    );
  }, [open, editing]);

  const save = async () => {
    setSaving(true);
    setErrors({});
    const website = form.websiteUrl.trim();
    const body = {
      name: form.name,
      location: form.location,
      description: form.description,
      websiteUrl: website && !/^https?:\/\//i.test(website) ? `https://${website}` : website,
      isPublished: form.isPublished,
      isFeatured: form.isFeatured,
      logoId: form.logo?.id ?? null,
    };
    try {
      const { message } = editing ? await adminApi.patch(`/admin/clients/${editing.id}`, body) : await adminApi.post("/admin/clients", body);
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

  return (
    <Modal
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title={editing ? "Edit client" : "Add client"}
      description="Schools and organisations shown on the Clients page."
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button loading={saving} onClick={save} disabled={form.name.trim().length < 2}>
            {editing ? "Save changes" : "Add client"}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
        <div>
          <Field label="Logo">
            <ImageUploader value={form.logo} onChange={(logo) => setForm({ ...form, logo })} purpose="client-logo" fit="contain" label="Upload logo" hint="PNG or SVG with transparent background works best" />
          </Field>
        </div>
        <div className="space-y-4">
          <Field label="School / organisation name" required htmlFor="cl-name" error={errors.name} count={form.name.length} max={150}>
            <Input id="cl-name" value={form.name} maxLength={150} onChange={(e) => setForm({ ...form, name: e.target.value })} invalid={!!errors.name} autoFocus />
          </Field>
          <Field label="Location" htmlFor="cl-location" error={errors.location} count={form.location.length} max={120}>
            <Input id="cl-location" value={form.location} maxLength={120} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Noida, Uttar Pradesh" />
          </Field>
          <Field
            label="About this client"
            htmlFor="cl-desc"
            hint="Shown on the client card (first 3 lines) with “Read more” for the rest."
            error={errors.description}
            count={form.description.length}
            max={2000}
          >
            <Textarea id="cl-desc" rows={5} value={form.description} maxLength={2000} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Website" htmlFor="cl-web" error={errors.websiteUrl}>
            <Input id="cl-web" value={form.websiteUrl} maxLength={300} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://" invalid={!!errors.websiteUrl} />
          </Field>
          <div className="space-y-3 rounded-xl bg-slate-50 p-4">
            <Switch checked={form.isPublished} onChange={(v) => setForm({ ...form, isPublished: v })} label="Show on website" />
            <Switch
              checked={form.isFeatured}
              onChange={(v) => setForm({ ...form, isFeatured: v })}
              label="Show in logo strips"
              description={form.logo ? "Scrolling logos on the home, programs and clients pages." : "Add a logo to appear in the scrolling logo strips."}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function ClientsAdminPage() {
  const [clients, setClients] = useState<Client[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<{ open: boolean; editing: Client | null }>({ open: false, editing: null });
  const [deleting, setDeleting] = useState<Client | null>(null);

  const load = useCallback(async () => {
    try {
      const { data } = await adminApi.get<Client[]>("/admin/clients", { limit: 500 });
      setClients(data);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  useEffect(() => {
    void load();
    if (new URLSearchParams(window.location.search).get("new")) setModal({ open: true, editing: null });
  }, [load]);

  const filtered = useMemo(() => {
    if (!clients) return [];
    const q = query.trim().toLowerCase();
    return q ? clients.filter((c) => `${c.name} ${c.location ?? ""}`.toLowerCase().includes(q)) : clients;
  }, [clients, query]);

  const reorder = async (next: Client[]) => {
    const previous = clients;
    setClients(next);
    try {
      await adminApi.patch("/admin/clients/reorder", { ids: next.map((c) => c.id) });
    } catch (err) {
      setClients(previous);
      toast.error((err as Error).message);
    }
  };

  if (error && !clients) return <ErrorState message={error} onRetry={() => void load()} />;
  if (!clients) return <LoadingBlock />;

  return (
    <div>
      <PageHeader
        title="Clients"
        description="Schools shown on the Clients page and in the logo strips. Drag to change the order."
        actions={
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModal({ open: true, editing: null })}>
            Add client
          </Button>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-slate-100">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or city" className="pl-9 h-10" aria-label="Search clients" />
          </div>
          <span className="text-sm text-slate-500">
            {clients.length} client{clients.length === 1 ? "" : "s"} · {clients.filter((c) => c.isPublished).length} shown
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<School className="w-6 h-6" />}
            title={clients.length === 0 ? "No clients yet" : "No clients match your search"}
            action={clients.length === 0 ? <Button onClick={() => setModal({ open: true, editing: null })}>Add your first client</Button> : undefined}
          />
        ) : (
          <SortableList items={filtered} onReorder={reorder} disabled={query.trim() !== ""}>
            <ul className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <SortableItem key={c.id} id={c.id}>
                  {({ handleProps, isDragging }) => (
                    <li className={cn("flex items-center gap-3 px-3 sm:px-4 py-3 bg-white", isDragging && "shadow-xl rounded-xl")}>
                      <button
                        {...handleProps}
                        disabled={query.trim() !== ""}
                        className="p-1.5 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing touch-none disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label={`Drag to reorder ${c.name}`}
                      >
                        <GripVertical className="w-4 h-4" />
                      </button>
                      <div className="w-16 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {c.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={previewUrl(c.logo)} alt="" className="max-w-full max-h-full object-contain p-1" loading="lazy" />
                        ) : (
                          <School className="w-5 h-5 text-slate-300" />
                        )}
                      </div>
                      <button className="flex-1 min-w-0 text-left" onClick={() => setModal({ open: true, editing: c })}>
                        <span className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-800 truncate max-w-full">{c.name}</span>
                          {!c.isPublished && <Badge tone="amber">Hidden</Badge>}
                          {c.isFeatured && c.logo && c.isPublished && <Badge tone="green">Logo strip</Badge>}
                        </span>
                        <span className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                          {c.location && (
                            <span className="inline-flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3" /> {c.location}
                            </span>
                          )}
                          {c.description && <span className="hidden md:inline truncate max-w-md">{c.description}</span>}
                        </span>
                      </button>
                      {c.websiteUrl && (
                        <a href={c.websiteUrl} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex w-9 h-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Open website">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <IconButton label={`Edit ${c.name}`} onClick={() => setModal({ open: true, editing: c })}>
                        <Pencil className="w-4 h-4" />
                      </IconButton>
                      <IconButton label={`Delete ${c.name}`} className="hover:text-red-600 hover:bg-red-50" onClick={() => setDeleting(c)}>
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

      <ClientModal open={modal.open} editing={modal.editing} onClose={() => setModal({ open: false, editing: null })} onSaved={() => void load()} />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Delete “${deleting?.name ?? ""}”?`}
        description="The client and its logo are removed from the website."
        onConfirm={async () => {
          if (!deleting) return;
          try {
            await adminApi.del(`/admin/clients/${deleting.id}`);
            toast.success("Client deleted");
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
