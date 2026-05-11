"use client";

import { useState, useCallback, useRef } from "react";
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
    <section ref={ref} className="relative overflow-hidden" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-12)', backgroundColor: 'var(--color-surface)' }}>
      <FloatingAnimations variant="about" density="low" />

      <div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md mb-6"
            style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-border)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></span>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent-dark)' }}>Administrator Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading mb-5 leading-tight"
            style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text-primary)' }}
          >
            Validated by <span style={{ color: 'var(--color-accent)' }}>Academic Visionaries</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}
          >
            Listen to Principals & Directors from prestigious K-12 schools across India discuss the transformational impact of our Robotics Laboratories, AI Curriculums, and STEM integrations.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 md:px-12">
        <div className="relative h-[650px] sm:h-[550px] md:h-[480px] lg:h-[400px]">
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
                <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl border h-full flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center lg:items-center group overflow-hidden"
                  style={{ borderColor: 'var(--color-border)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                  {/* Left Side: Quote & Content */}
                  <div className="flex-1 flex flex-col w-full h-full">
                    <div>
                      <FaQuoteLeft className="w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-5" style={{ color: 'var(--color-border)' }} />
                      <div className="overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ maxHeight: '320px' }}>
                        <p className="text-left md:text-justify italic" style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-lg)', lineHeight: 1.7, fontWeight: 500 }}>
                          &ldquo;{testimonials[activeIndex].content}&rdquo;
                        </p>
                      </div>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1 pt-5 pb-4 md:pb-0">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Identity */}
                  <div className="w-full md:w-56 flex flex-col items-center text-center border-t md:border-t-0 md:border-l pt-5 md:pt-0 md:pl-8 flex-shrink-0 md:h-full justify-center"
                    style={{ borderColor: 'var(--color-border)' }}>
                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm overflow-hidden border"
                      style={{ borderColor: 'var(--color-border)' }}>
                      {testimonials[activeIndex].image ? (
                        <Image 
                          src={testimonials[activeIndex].image} 
                          alt={testimonials[activeIndex].name} 
                          fill
                          className="object-cover scale-[1.25]"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                          {testimonials[activeIndex].name.split(" ").map(n => n.replace(".", ""))[0][0]}
                          {testimonials[activeIndex].name.split(" ").slice(-1)[0][0]}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold lg:text-lg mb-1" style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-lg)' }}>{testimonials[activeIndex].name}</div>
                      <div className="font-semibold text-xs lg:text-sm uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-accent)' }}>{testimonials[activeIndex].role}</div>
                      <div className="text-sm leading-tight" style={{ color: 'var(--color-text-secondary)' }}>{testimonials[activeIndex].school}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center gap-5 mt-8 relative z-[100] pointer-events-auto">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center transition-all active:scale-95"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                  className={`h-2.5 rounded-full transition-all ${i === activeIndex ? "w-7" : "w-2.5"}`}
                  style={{ backgroundColor: i === activeIndex ? 'var(--color-accent)' : 'var(--color-border)' }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center transition-all active:scale-95"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-primary)' }}
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
