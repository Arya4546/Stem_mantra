"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import MediaImage from "@/components/ui/MediaImage";
import Lightbox from "@/components/ui/Lightbox";
import type { GalleryPhoto, GallerySection } from "@/types/site";

// Full class names so Tailwind keeps them (accent is chosen per gallery type in the admin).
const ACCENTS: Record<string, { badge: string; text: string; bar: string; button: string; chip: string }> = {
  orange: { badge: "bg-orange-100/80 text-orange-700", text: "text-orange-500", bar: "bg-orange-500", button: "bg-orange-500 hover:bg-orange-600", chip: "hover:border-orange-300 hover:text-orange-700" },
  teal: { badge: "bg-teal-100/80 text-teal-700", text: "text-teal-600", bar: "bg-teal-500", button: "bg-teal-500 hover:bg-teal-600", chip: "hover:border-teal-300 hover:text-teal-700" },
  blue: { badge: "bg-blue-100/80 text-blue-700", text: "text-blue-600", bar: "bg-blue-500", button: "bg-blue-500 hover:bg-blue-600", chip: "hover:border-blue-300 hover:text-blue-700" },
  indigo: { badge: "bg-indigo-100/80 text-indigo-700", text: "text-indigo-600", bar: "bg-indigo-500", button: "bg-indigo-600 hover:bg-indigo-700", chip: "hover:border-indigo-300 hover:text-indigo-700" },
  purple: { badge: "bg-purple-100/80 text-purple-700", text: "text-purple-600", bar: "bg-purple-500", button: "bg-purple-600 hover:bg-purple-700", chip: "hover:border-purple-300 hover:text-purple-700" },
  pink: { badge: "bg-pink-100/80 text-pink-700", text: "text-pink-600", bar: "bg-pink-500", button: "bg-pink-500 hover:bg-pink-600", chip: "hover:border-pink-300 hover:text-pink-700" },
  green: { badge: "bg-green-100/80 text-green-700", text: "text-green-600", bar: "bg-green-500", button: "bg-green-600 hover:bg-green-700", chip: "hover:border-green-300 hover:text-green-700" },
  amber: { badge: "bg-amber-100/80 text-amber-700", text: "text-amber-500", bar: "bg-amber-500", button: "bg-amber-500 hover:bg-amber-600", chip: "hover:border-amber-300 hover:text-amber-700" },
  rose: { badge: "bg-rose-100/80 text-rose-700", text: "text-rose-500", bar: "bg-rose-500", button: "bg-rose-500 hover:bg-rose-600", chip: "hover:border-rose-300 hover:text-rose-700" },
  slate: { badge: "bg-slate-200/80 text-slate-700", text: "text-slate-700", bar: "bg-slate-600", button: "bg-slate-800 hover:bg-slate-900", chip: "hover:border-slate-400 hover:text-slate-900" },
};
const accentOf = (name: string) => ACCENTS[name] ?? ACCENTS.orange;

const INITIAL = 8;
const STEP = 12;

function PhotoTile({ photo, masonry, onOpen, priority }: { photo: GalleryPhoto; masonry: boolean; onOpen: () => void; priority?: boolean }) {
  const label = photo.title || photo.altText;
  return (
    <figure className={`relative group overflow-hidden bg-gray-100 rounded-2xl shadow-sm ${masonry ? "mb-4 md:mb-6 break-inside-avoid" : "aspect-[4/3]"}`}>
      <button type="button" onClick={onOpen} className="block w-full h-full text-left focus-visible:outline focus-visible:outline-4 focus-visible:outline-orange-400" aria-label={`Open photo: ${label}`}>
        {masonry ? (
          <MediaImage
            media={photo.media}
            alt={photo.altText}
            variant="thumb"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={priority}
          />
        ) : (
          <MediaImage
            media={photo.media}
            alt={photo.altText}
            variant="thumb"
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            priority={priority}
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Expand className="w-4 h-4" />
        </span>
        {(photo.title || photo.caption) && (
          <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-semibold line-clamp-1">{photo.title || photo.caption}</span>
          </figcaption>
        )}
      </button>
    </figure>
  );
}

function GalleryTypeSection({ section, eager }: { section: GallerySection; eager: boolean }) {
  const [visible, setVisible] = useState(INITIAL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const accent = accentOf(section.accent);
  const masonry = section.layout === "MASONRY";
  const shown = section.images.slice(0, visible);
  const words = section.name.trim().split(/\s+/);
  const lastWord = words.pop();
  const remaining = section.images.length - visible;

  return (
    <section id={section.slug} className="py-16 md:py-20 border-t border-gray-100 scroll-mt-28" aria-labelledby={`${section.slug}-title`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-12 md:mb-16 text-center max-w-3xl mx-auto"
      >
        {section.tagline && (
          <span className={`inline-block px-4 py-1.5 ${accent.badge} rounded-full text-sm font-bold uppercase tracking-widest mb-4`}>
            {section.tagline}
          </span>
        )}
        <h2 id={`${section.slug}-title`} className="text-4xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight break-words">
          {words.join(" ")}
          {words.length > 0 && " "}
          <span className={accent.text}>{lastWord}</span>
        </h2>
        {section.description && <p className="text-lg text-gray-600 leading-relaxed">{section.description}</p>}
        <div className={`w-20 h-1.5 ${accent.bar} mx-auto mt-8 rounded-full`} />
      </motion.div>

      <div className={masonry ? "columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6" : "grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"}>
        {shown.map((photo, i) => (
          <PhotoTile key={photo.id} photo={photo} masonry={masonry} priority={eager && i < 4} onOpen={() => setLightboxIndex(i)} />
        ))}
      </div>

      {section.images.length > INITIAL && (
        <div className="mt-10 md:mt-12 flex flex-col items-center gap-3">
          <p className="text-sm text-gray-500">
            Showing {Math.min(visible, section.images.length)} of {section.images.length} photos
          </p>
          <div className="flex gap-3">
            {remaining > 0 && (
              <button
                onClick={() => setVisible((v) => v + STEP)}
                className={`px-8 py-3.5 ${accent.button} text-white font-bold rounded-xl transition-all shadow-sm`}
              >
                Show {Math.min(STEP, remaining)} more
              </button>
            )}
            {visible > INITIAL && (
              <button
                onClick={() => {
                  setVisible(INITIAL);
                  document.getElementById(section.slug)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Show less
              </button>
            )}
          </div>
        </div>
      )}

      <Lightbox
        photos={section.images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={(i) => {
          setLightboxIndex(i);
          if (i >= visible) setVisible(Math.ceil((i + 1) / STEP) * STEP);
        }}
        label={`${section.name} photos`}
      />
    </section>
  );
}

export default function GalleryContent({ sections }: { sections: GallerySection[] }) {
  const total = useMemo(() => sections.reduce((n, s) => n + s.images.length, 0), [sections]);

  return (
    <main className="min-h-screen bg-transparent pt-32 pb-24 font-sans">
      <article className="mx-auto px-4 md:px-8 lg:px-16 max-w-screen-2xl">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tighter">
            Our <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">Journeys</span> in Action
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed">
            A visual diary of empowerment. Step into our world of immersive education, grand exhibitions, and widespread inspiration.
          </p>
        </motion.header>

        {sections.length > 1 && (
          <nav aria-label="Gallery sections" className="mb-8 flex flex-wrap justify-center gap-2 md:gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.slug}`}
                className={`px-4 py-2 rounded-full bg-white/90 border border-gray-200 text-sm font-semibold text-gray-700 shadow-sm transition-colors ${accentOf(s.accent).chip}`}
              >
                {s.name} <span className="text-gray-400 font-medium">({s.images.length})</span>
              </a>
            ))}
          </nav>
        )}

        {total === 0 ? (
          <p className="text-center text-gray-500 py-24">New photos are on their way. Please check back soon!</p>
        ) : (
          sections.map((section, i) => <GalleryTypeSection key={section.id} section={section} eager={i === 0} />)
        )}
      </article>
    </main>
  );
}
