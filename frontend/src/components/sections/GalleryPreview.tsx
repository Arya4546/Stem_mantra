"use client";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaImages } from "react-icons/fa";

const sessionImages = [
  {
    id: 1,
    src: "/images/gallery/session-1.png",
    alt: "Students collaborating on STEM building project in lab",
    category: "Session in Action",
  },
  {
    id: 2,
    src: "/images/gallery/session-4.png",
    alt: "Students working on electronics experiments with LEDs",
    category: "Session in Action",
  },
  {
    id: 3,
    src: "/images/gallery/session-5.png",
    alt: "Teacher guiding students during hands-on STEM activity",
    category: "Session in Action",
  },
  {
    id: 4,
    src: "/images/gallery/session-2.png",
    alt: "Students engaged in electronics and circuit building",
    category: "Session in Action",
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

      <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">
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

        {/* Premium Bento Grid - Session in Action */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">
          {/* Main Large Image (Left Col) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-[2rem] shadow-sm bg-gray-100 min-h-[300px] md:min-h-0"
          >
            <img
              src={sessionImages[0].src}
              alt={sessionImages[0].alt}
              className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            />

          </motion.div>

          {/* Top Right Small Image 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-sm bg-gray-100 min-h-[250px] md:min-h-0"
          >
            <img
              src={sessionImages[1].src}
              alt={sessionImages[1].alt}
              className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            />

          </motion.div>

          {/* Top Right Small Image 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-sm bg-gray-100 min-h-[250px] md:min-h-0"
          >
            <img
              src={sessionImages[2].src}
              alt={sessionImages[2].alt}
              className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
            />

          </motion.div>

          {/* Bottom Right Wide Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-sm bg-gray-100 min-h-[250px] md:min-h-0 flex items-center justify-center p-8 bg-gradient-to-br from-indigo-50 to-blue-50"
          >
            <img
              src={sessionImages[3].src}
              alt={sessionImages[3].alt}
              className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
            />

          </motion.div>
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
            <div className="text-3xl md:text-4xl font-bold text-blue-500">16+</div>
            <div className="text-xs uppercase tracking-widest font-black text-gray-500 mt-1">States</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
