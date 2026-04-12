"use client";
import { galleryImages } from "@/data/gallery";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function GalleryContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Session in Action", "STEMmantra Exhibition", "STEMmantra In Media"];
  
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-white pt-32">
      <article ref={ref} className="mx-auto px-4 md:px-8 lg:px-16 pb-16">
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
          <p className="text-lg text-gray-600">
            Explore our gallery to see real students, teachers, and schools in action—building, learning, and innovating with STEMmantra. Every photo is a testament to hands-on learning, creativity, and achievement in STEM education.
          </p>
        </motion.header>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" 
                  : "bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid — Clean, no floating icons or dot pattern */}
        <section className="grid grid-cols-2 md:grid-cols-3 gap-4" aria-label="Gallery Images">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.figure
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative rounded-xl overflow-hidden group"
                itemProp="associatedMedia" itemScope itemType="https://schema.org/ImageObject"
              >
                <div className="relative w-full h-64 md:h-72">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 rounded-full text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm">
                  {image.category}
                </span>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-base mb-1" itemProp="name">{image.category}</h3>
                    <p className="text-gray-200 text-xs md:text-sm line-clamp-2 leading-relaxed" itemProp="caption">{image.alt}</p>
                  </div>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </section>
      </article>
    </main>
  );
}