"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import MediaImage, { isUploadedMedia } from "@/components/ui/MediaImage";
import type { TestimonialItem } from "@/types/site";

export function initials(name: string): string {
  const parts = name
    .replace(/^(mr|mrs|ms|dr|prof|shri|smt)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "?";
  return ((parts[0][0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}

export function TestimonialAvatar({
  testimonial,
  className = "w-24 h-24 rounded-2xl",
  sizes = "128px",
}: {
  testimonial: TestimonialItem;
  className?: string;
  sizes?: string;
}) {
  const photo = testimonial.photo;
  return (
    <div className={`relative overflow-hidden shadow-md flex-shrink-0 ${className}`}>
      {photo ? (
        <MediaImage
          media={photo}
          alt={testimonial.authorName}
          variant="thumb"
          fill
          sizes={sizes}
          // the original portraits have a white frame, which this crops away
          className={`object-cover ${isUploadedMedia(photo.url) ? "" : "scale-[1.25]"}`}
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 to-teal-500 text-white font-black text-2xl md:text-3xl"
        >
          {initials(testimonial.authorName)}
        </div>
      )}
    </div>
  );
}

export function RatingStars({ rating, className = "w-4 h-4" }: { rating: number; className?: string }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${className} ${i <= rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

/**
 * Quote text that is clamped to a few lines with a "Read more" toggle when it is long,
 * so very long testimonials never break the card layout.
 */
export function ExpandableQuote({
  text,
  lines = 6,
  className = "",
  onExpandedChange,
}: {
  text: string;
  lines?: 4 | 5 | 6 | 7 | 8;
  className?: string;
  onExpandedChange?: (expanded: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 2);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  const clamp = { 4: "line-clamp-4", 5: "line-clamp-5", 6: "line-clamp-6", 7: "line-clamp-7", 8: "line-clamp-[8]" }[lines];

  return (
    <div>
      <p ref={ref} className={`${className} ${expanded ? "" : clamp} whitespace-pre-line break-words`}>
        &ldquo;{text}&rdquo;
      </p>
      {(overflowing || expanded) && (
        <button
          type="button"
          onClick={() => {
            setExpanded((v) => !v);
            onExpandedChange?.(!expanded);
          }}
          className="mt-3 text-sm font-semibold text-orange-600 hover:text-orange-700 underline-offset-4 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
