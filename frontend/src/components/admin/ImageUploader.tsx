"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ACCEPTED_IMAGE_TYPES, uploadImage, type UploadPurpose, type UploadedMedia } from "@/lib/admin-api";
import { cn } from "@/lib/utils";

export const MAX_UPLOAD_MB = 15;

/** Preview URL for any media (uploaded → thumbnail; bundled → the file itself). */
export function previewUrl(media: Pick<UploadedMedia, "url" | "thumbUrl">): string {
  return media.thumbUrl ?? media.url;
}

/**
 * Single image field: drop / pick a file, see upload progress, replace or remove it.
 * The image is uploaded immediately; the parent stores the returned media and saves its id.
 */
export default function ImageUploader({
  value,
  onChange,
  purpose,
  aspect = "aspect-[3/2]",
  fit = "cover",
  label = "Upload image",
  hint = `JPG, PNG, WebP, GIF, AVIF or SVG · up to ${MAX_UPLOAD_MB} MB`,
  disabled,
}: {
  value: UploadedMedia | null;
  onChange: (media: UploadedMedia | null) => void;
  purpose: UploadPurpose;
  aspect?: string;
  fit?: "cover" | "contain";
  label?: string;
  hint?: string;
  disabled?: boolean;
}) {
  const [progress, setProgress] = useState<number | null>(null);
  const uploading = progress !== null;

  const onDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setProgress(0);
    try {
      const media = await uploadImage(file, purpose, setProgress);
      onChange(media);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setProgress(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPTED_IMAGE_TYPES,
    maxFiles: 1,
    multiple: false,
    maxSize: MAX_UPLOAD_MB * 1024 * 1024,
    disabled: disabled || uploading,
    noClick: Boolean(value),
    onDropRejected: (rejections) => {
      const code = rejections[0]?.errors[0]?.code;
      toast.error(code === "file-too-large" ? `The image is larger than ${MAX_UPLOAD_MB} MB.` : "Please choose a JPG, PNG, WebP, GIF, AVIF or SVG image.");
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-dashed transition-colors",
          aspect,
          isDragActive ? "border-orange-400 bg-orange-50" : value ? "border-transparent bg-slate-100" : "border-slate-300 bg-slate-50 hover:border-orange-300 hover:bg-orange-50/40 cursor-pointer",
        )}
      >
        <input {...getInputProps()} aria-label={label} />
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl(value)} alt="" className={cn("absolute inset-0 w-full h-full", fit === "contain" ? "object-contain p-3" : "object-cover")} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <ImagePlus className="w-8 h-8 text-slate-400 mb-2" />
            <p className="text-sm font-semibold text-slate-700">{isDragActive ? "Drop the image here" : label}</p>
            <p className="text-xs text-slate-500 mt-1">Drag & drop or click · {hint}</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/85 flex flex-col items-center justify-center gap-2">
            <div className="w-2/3 h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full bg-orange-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs font-semibold text-slate-600">{progress! < 100 ? `Uploading… ${progress}%` : "Optimising…"}</p>
          </div>
        )}
      </div>
      {value && !uploading && (
        <div className="flex gap-2 mt-2">
          <button type="button" onClick={open} disabled={disabled} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 px-2 py-1 rounded-lg hover:bg-orange-50">
            <RefreshCw className="w-3.5 h-3.5" /> Replace
          </button>
          <button type="button" onClick={() => onChange(null)} disabled={disabled} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50">
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}
