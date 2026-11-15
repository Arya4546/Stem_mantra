"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

const partners = Array.from({ length: 12 }, (_, i) => `/images/partners/partner-${i + 1}.png`);

export default function ProgramsTrustSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  return (
    <section className="py-20 bg-transparent overflow-hidden border-y border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4 tracking-wide">
            Trusted by Leaders
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Transforming Schools <span className="text-orange-500">Across India</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Don&apos;t just take our word for it. Hear from the principals and educators who partner with us to bring these ecosystems to life.
          </p>
        </motion.div>

        {/* Partners Marquee */}
        <div className="mb-20 relative w-full overflow-hidden flex flex-col items-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
            STEMmantra is implemented in leading schools
          </p>
          
          <div className="relative">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

            <div className="overflow-hidden w-full relative group py-4">
              <style>{`
                @keyframes marquee-scroll-programs {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
                .marquee-programs {
                  animation: marquee-scroll-programs 40s linear infinite;
                }
              `}</style>
              <div className="flex gap-6 md:gap-8 w-max marquee-programs hover:[animation-play-state:paused]">
                {[...partners, ...partners].map((src, i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 w-32 md:w-40 h-24 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center p-3 md:p-4 hover:shadow-md hover:border-orange-200 transition-all duration-300"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={`School Partner ${i}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 128px, 160px"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-5xl mx-auto relative">
          <div className="relative min-h-[420px] md:min-h-[340px] bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex items-center justify-center">
            
            {/* Background accent quote icon */}
            <Quote className="absolute top-8 left-8 w-24 h-24 text-gray-50 opacity-50 -z-10" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
              >
                {/* Author Info (Left on Desktop, Top on Mobile) */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0 w-full md:w-64 md:border-r border-gray-100 md:pr-8">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100 bg-transparent">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{testimonials[activeIndex].name}</h3>
                  <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2">
                    {testimonials[activeIndex].role}
                  </p>
                  <p className="text-gray-500 text-sm font-medium leading-snug">
                    {testimonials[activeIndex].school}
                  </p>
                  <div className="flex gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <Quote className="w-8 h-8 text-orange-300 mb-4 hidden md:block" />
                  <p className="text-gray-700 text-base md:text-xl leading-relaxed italic font-medium relative z-10">
                    &ldquo;{testimonials[activeIndex].content}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === activeIndex ? "bg-orange-500 w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
