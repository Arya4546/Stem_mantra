"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import React from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);


  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <section ref={ref} className="relative pt-16 pb-12 bg-gray-50 overflow-hidden">
      <FloatingAnimations variant="about" density="low" />

      <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-sm font-black text-orange-900 uppercase tracking-widest">Administrator Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            Validated by <span className="text-orange-500">Academic Visionaries</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 font-medium leading-relaxed"
          >
            Listen to Principals & Directors from prestigious K-12 schools across India discuss the transformational impact of our Robotics Laboratories, AI Curriculums, and STEM integrations.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
        <div className="relative h-[650px] sm:h-[550px] md:h-[480px] lg:h-[420px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full h-full"
              >
                <div className="bg-white p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-100 shadow-2xl h-full flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center lg:items-center group overflow-hidden">
                  {/* Left Side: Quote & Content */}
                  <div className="flex-1 flex flex-col w-full h-full">
                    <div>
                      <FaQuoteLeft className="w-10 h-10 md:w-12 md:h-12 text-orange-100 group-hover:text-orange-200 transition-colors mb-4 md:mb-6" />
                      <div className="overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ maxHeight: '350px' }}>
                        <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed font-semibold italic text-left md:text-justify max-w-full">
                          &ldquo;{testimonials[activeIndex].content}&rdquo;
                        </p>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1 pt-6 pb-4 md:pb-0">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-orange-400" />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Identity */}
                  <div className="w-full md:w-64 flex flex-col items-center text-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 flex-shrink-0 md:h-full justify-center">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white flex items-center justify-center mb-4 transform group-hover:rotate-6 transition-transform shadow-md overflow-hidden">
                      {testimonials[activeIndex].image ? (
                        <Image 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name} 
                          fill
                          className="object-cover scale-[1.25]"
                        />
                      ) : (
                        <span className="text-3xl font-black text-white">
                          {testimonials[activeIndex].name.split(" ").map(n => n.replace(".", ""))[0][0]}
                          {testimonials[activeIndex].name.split(" ").slice(-1)[0][0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-extrabold text-gray-900 text-xl lg:text-2xl mb-1">{testimonials[activeIndex].name}</div>
                      <div className="text-orange-600 font-bold text-sm lg:text-base uppercase tracking-widest mb-2">{testimonials[activeIndex].role}</div>
                      <div className="text-gray-500 font-medium text-sm lg:text-base leading-tight">{testimonials[activeIndex].school}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-6 mt-8 relative z-[100] pointer-events-auto">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                  className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? "bg-orange-500 w-8" : "bg-gray-300 hover:bg-gray-400"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
