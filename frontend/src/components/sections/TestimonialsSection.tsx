
"use client";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Floating Icons Animation */}
      <SectionFloatingIcons count={2} zIndex={1} />
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/50 to-transparent rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/50 to-transparent rounded-full blur-3xl translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Schools{" "}
            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Trusted by 500+ schools across India for quality STEM education
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Image Section */}
                <div className="md:col-span-2 relative bg-gradient-to-br from-orange-500 to-purple-600 p-8 flex flex-col justify-center items-center min-h-[300px] md:min-h-[400px]">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="absolute top-8 left-8 w-12 h-12 text-white/20" />

                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/20 flex items-center justify-center">
                      {testimonials[activeIndex].image ? (
                        <Image
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : null}
                      {/* Fallback Initials */}
                      <span className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl font-bold text-white">
                        {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    {/* Video Play Button (if video exists) */}
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <FaPlay className="w-4 h-4 text-orange-500 ml-1" />
                    </button>
                  </div>

                  {/* Name and Role */}
                  <div className="text-center text-white">
                    <h4 className="text-xl md:text-2xl font-bold mb-1">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-white/80 text-sm md:text-base">
                      {testimonials[activeIndex].role}
                    </p>
                    <p className="text-white/60 text-xs md:text-sm mt-1">
                      {testimonials[activeIndex].school}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>

                  {/* Quote */}
                  <AnimatePresence mode="wait">
                    <motion.blockquote
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic"
                    >
                      &ldquo;{testimonials[activeIndex].content}&rdquo;
                    </motion.blockquote>
                  </AnimatePresence>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === activeIndex
                            ? "w-8 bg-orange-500"
                            : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition-colors group"
                      >
                        <FaChevronLeft className="w-4 h-4 text-gray-600 group-hover:text-orange-600" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors"
                      >
                        <FaChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 mt-8 overflow-x-auto pb-4"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 transition-all duration-300 bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center ${index === activeIndex
                  ? "border-orange-500 scale-110 shadow-lg"
                  : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              {testimonial.image ? (
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover absolute inset-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : null}
              <span className="text-white font-bold text-lg">
                {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Video Modal */}
        <AnimatePresence>
          {showVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setShowVideo(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-black rounded-2xl overflow-hidden max-w-4xl w-full aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center z-10 transition-colors"
                >
                  <span className="text-white text-xl">&times;</span>
                </button>
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>Video testimonial coming soon...</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
