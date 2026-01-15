"use client";
import { galleryImages } from "@/data/gallery";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FloatingIcons from "@/components/animations/FloatingIcons";

export default function GalleryContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 relative pt-32">
      {/* Floating icons for the whole page, behind everything */}
      <FloatingIcons count={3} zIndex={0} />
      <article ref={ref} className="relative pb-16 bg-white overflow-hidden" itemScope itemType="https://schema.org/ImageGallery">
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

        {/* Floating icons for this section */}
        <FloatingIcons count={2} zIndex={1} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                Gallery
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Moments of <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">Innovation</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Explore our gallery to see real students, teachers, and schools in action—building, learning, and innovating with STEM Mantra. Every photo is a testament to hands-on learning, creativity, and achievement in STEM education.
              </p>
            </div>
          </motion.header>

          {/* Gallery Grid */}
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" aria-label="Gallery Images">
            {galleryImages.map((image, index) => (
              <motion.figure
                key={image.id}
                className="relative rounded-2xl overflow-hidden shadow-lg group bg-white/80 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                itemProp="associatedMedia" itemScope itemType="https://schema.org/ImageObject"
              >
                <div className="relative w-full h-56">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <figcaption className="absolute top-4 left-4 bg-white/80 rounded-full px-3 py-1 flex items-center gap-2 shadow text-xs font-semibold">
                  {image.category}
                </figcaption>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-bold mb-1" itemProp="name">{image.category}</h3>
                  <p className="text-white/80 text-xs mb-1" itemProp="caption">{image.alt}</p>
                  <p className="text-white/70 text-xs">{image.description}</p>
                </div>
              </motion.figure>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}