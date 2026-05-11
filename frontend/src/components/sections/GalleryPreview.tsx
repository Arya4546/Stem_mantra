"use client";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaImages } from "react-icons/fa";

import { galleryImages } from "@/data/gallery";

const sessionImages = galleryImages
  .filter(img => img.category === "Session in Action")
  .slice(0, 7);

export default function GalleryPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-12)', background: 'linear-gradient(to bottom, var(--color-surface), var(--color-white))' }}>
      <SectionFloatingIcons count={2} zIndex={1} />

      <div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <span className="inline-block px-3 py-1.5 rounded-md text-xs font-semibold mb-4"
              style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent-dark)' }}>
              Gallery
            </span>
            <h2 className="font-heading mb-3" style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}>
              Moments of{" "}
              <span style={{ color: 'var(--color-accent)' }}>
                Innovation
              </span>
            </h2>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', maxWidth: '32rem' }}>
              Capturing the journey of young innovators as they explore, create, and transform ideas into reality.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-3 text-white rounded-lg font-semibold transition-colors group"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <FaImages className="w-4 h-4" />
            View Full Gallery
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
          {sessionImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-xl w-full break-inside-avoid border"
              style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                loading="lazy"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
