"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Show up to 6 testimonials in a masonry-style grid
  const displayTestimonials = testimonials.slice(0, 6);

  return (
    <section ref={ref} className="relative py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Schools{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Trusted by 500+ schools across India for quality STEM education
          </p>
        </motion.div>

        {/* Masonry-style card grid — 3 columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 max-w-6xl mx-auto">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="break-inside-avoid mb-5"
            >
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                {/* Quote icon */}
                <FaQuoteLeft className="w-5 h-5 text-orange-300 mb-3" />

                {/* Content */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-3.5 h-3.5 text-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-teal-400 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                        onLoad={(e) => {
                          const target = e.target as HTMLImageElement;
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span
                      className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white"
                      style={{ display: testimonial.image ? "none" : "flex" }}
                    >
                      {testimonial.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                    {testimonial.school && (
                      <div className="text-xs text-gray-400">{testimonial.school}</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
