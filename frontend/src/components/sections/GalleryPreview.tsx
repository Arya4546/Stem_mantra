
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
    src: "/images/gallery/robotics-lab-1.jpg",
    alt: "Students working on robotics project",
    category: "Robotics Lab",
  },
  {
    id: 2,
    src: "/images/gallery/atl-lab-1.jpg",
    alt: "ATL Lab setup in school",
    category: "ATL Labs",
  },
  {
    id: 3,
    src: "/images/gallery/students-1.jpg",
    alt: "Students with their robot creations",
    category: "Student Projects",
  },
  {
    id: 4,
    src: "/images/gallery/training-1.jpg",
    alt: "Teacher training session",
    category: "Training",
  },
  {
    id: 5,
    src: "/images/gallery/competition-1.jpg",
    alt: "Robotics competition",
    category: "Competitions",
  },
  {
    id: 6,
    src: "/images/gallery/workshop-1.jpg",
    alt: "STEM workshop in progress",
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
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"
                }`}
              >
                {/* Placeholder gradient for missing images */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-teal-100 flex items-center justify-center">
                  <div className="text-center p-4">
                    <FaImages className="w-12 h-12 text-orange-300 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">{image.category}</span>
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                      {image.category}
                    </span>
                    <p className="text-white text-sm md:text-base">{image.alt}</p>
                  </div>
                </div>

                {/* Scale Effect on Hover */}
                <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-500" />
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
