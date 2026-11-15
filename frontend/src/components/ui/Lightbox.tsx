"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MediaImage from "@/components/ui/MediaImage";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import type { GalleryPhoto } from "@/types/site";

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  label?: string;
}

/** Full-screen photo viewer: arrow keys / swipe to navigate, Esc to close. */
export default function Lightbox({ photos, index, onClose, onIndexChange, label = "Photo viewer" }: LightboxProps) {
  const open = index !== null && photos.length > 0;
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useBodyScrollLock(open);

  const count = photos.length;
  const go = useCallback(
    (step: number) => {
      if (index === null) return;
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const photo = open ? photos[Math.min(index!, count - 1)] : null;
  const neighbours = open && count > 1 ? [photos[(index! + 1) % count], photos[(index! - 1 + count) % count]] : [];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -70) go(1);
    else if (info.offset.x > 70) go(-1);
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-3 text-white/80 text-sm">
            <span aria-live="polite">
              {index! + 1} / {count}
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 min-h-0" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={photo.id}
                className="absolute inset-0 mx-2 md:mx-20"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
              >
                <MediaImage media={photo.media} alt={photo.altText} fill sizes="100vw" className="object-contain select-none" draggable={false} priority />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>

          <div className="px-4 md:px-6 py-4 min-h-[64px] text-center text-white">
            {(photo.title || photo.caption) && (
              <div className="max-w-3xl mx-auto">
                {photo.title && <p className="font-semibold">{photo.title}</p>}
                {photo.caption && <p className="text-white/70 text-sm mt-1 line-clamp-3">{photo.caption}</p>}
              </div>
            )}
          </div>

          {/* Warm the cache for the neighbouring photos */}
          <div className="hidden" aria-hidden>
            {neighbours.map((p) => (
              <MediaImage key={p.id} media={p.media} alt="" fill sizes="100vw" loading="eager" />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
