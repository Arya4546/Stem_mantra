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
    <section ref={ref} className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
      {/* Floating Icons Animation */}
      <SectionFloatingIcons count={2} zIndex={1} />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 fit-mb"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
              Gallery
            </span>
            <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Moments of{" "}
              <span className="text-orange-500">
                Innovation
              </span>
            </h2>
            <p className="fit-lead text-lg text-gray-600 max-w-xl">
              Capturing the journey of young innovators as they explore, create, and transform ideas into reality.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/20 hover:-translate-y-0.5 transition-all group"
          >
            <FaImages className="w-4 h-4" />
            View Full Gallery
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Photo mosaic — fixed row height so it always fits the screen */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 fit-gap lg:[grid-auto-rows:clamp(7rem,27vh,17rem)]">
          {sessionImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow bg-gray-100 aspect-[4/3] lg:aspect-auto ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
