
"use client";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaImages } from "react-icons/fa";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
    alt: "Students working on robotics project",
    category: "Robotics Lab",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    alt: "Modern robotics and AI technology",
    category: "ATL Labs",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    alt: "Electronics and circuit boards",
    category: "Electronics",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&q=80",
    alt: "AI and coding visualization",
    category: "AI & Coding",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
    alt: "3D printing in action",
    category: "3D Printing",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    alt: "Students in STEM workshop",
    category: "Workshops",
  },
];

export default function GalleryPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Moments of{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Capturing the journey of young innovators as they explore, create, and transform ideas into reality.
            </p>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-semibold transition-colors group"
          >
            <FaImages className="w-4 h-4" />
            View Full Gallery
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
            >
              <div
                className={`relative ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                  }`}
              >
                {/* Actual Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                      {image.category}
                    </span>
                    <p className="text-white text-sm md:text-base">{image.alt}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-12 pt-12 border-t border-gray-100"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500">1000+</div>
            <div className="text-sm text-gray-500">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-teal-500">500+</div>
            <div className="text-sm text-gray-500">Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-500">50+</div>
            <div className="text-sm text-gray-500">Competitions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-500">15+</div>
            <div className="text-sm text-gray-500">States</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
