"use client";
import { galleryImages } from "@/data/gallery";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function GalleryContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen bg-white pt-32">
      <article ref={ref} className="container mx-auto px-4 pb-16">
        {/* Section Header — Left aligned */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
          itemScope itemType="https://schema.org/ImageGallery"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            Gallery
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Moments of{" "}
            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              Innovation
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore our gallery to see real students, teachers, and schools in action—building, learning, and innovating with STEMmantra. Every photo is a testament to hands-on learning, creativity, and achievement in STEM education.
          </p>
        </motion.header>

        {/* Gallery Grid — Clean, no floating icons or dot pattern */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4" aria-label="Gallery Images">
          {galleryImages.map((image, index) => (
            <motion.figure
              key={image.id}
              className="relative rounded-xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              itemProp="associatedMedia" itemScope itemType="https://schema.org/ImageObject"
            >
              <div className="relative w-full h-56">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Category badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-700">
                {image.category}
              </span>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-sm mb-0.5" itemProp="name">{image.category}</h3>
                  <p className="text-white/80 text-xs" itemProp="caption">{image.alt}</p>
                </div>
              </div>
            </motion.figure>
          ))}
        </section>
      </article>
    </main>
  );
}