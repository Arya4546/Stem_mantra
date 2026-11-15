"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView, type PanInfo } from "framer-motion";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";
import { ExpandableQuote, RatingStars, TestimonialAvatar } from "@/components/sections/testimonial-parts";
import type { TestimonialItem } from "@/types/site";

export default function TestimonialsSection({ testimonials }: { testimonials: TestimonialItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const count = testimonials.length;

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setActiveIndex((prev) => (prev + step + count) % count);
    },
    [count],
  );

  if (count === 0) return null;
  const current = testimonials[Math.min(activeIndex, count - 1)];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section ref={ref} className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden" aria-roledescription="carousel" aria-label="Testimonials">
      <FloatingAnimations variant="about" density="low" />

      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 fit-mb">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Administrator Testimonials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            Validated by <span className="text-orange-500">Academic Visionaries</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="fit-lead text-lg text-gray-600 leading-relaxed"
          >
            Listen to Principals & Directors from prestigious K-12 schools across India discuss the transformational impact of our Robotics Laboratories, AI Curriculums, and STEM integrations.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto px-0 md:px-12">
          <div className="relative min-h-[420px] md:min-h-[360px] flex items-center">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.article
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -60 : 60 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={onDragEnd}
                className="w-full"
                aria-roledescription="slide"
                aria-label={`${activeIndex + 1} of ${count}`}
              >
                <div className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-100 shadow-xl flex flex-col md:flex-row gap-6 md:gap-10 items-center group">
                  {/* Quote */}
                  <div className="flex-1 flex flex-col w-full min-w-0">
                    <FaQuoteLeft className="w-10 h-10 md:w-12 md:h-12 text-orange-100 group-hover:text-orange-200 transition-colors mb-4 md:mb-6" />
                    <ExpandableQuote
                      text={current.content}
                      lines={6}
                      className="fit-lead text-gray-700 text-base md:text-lg leading-relaxed font-medium italic"
                    />
                    <div className="pt-6 pb-2 md:pb-0">
                      <RatingStars rating={current.rating} />
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="w-full md:w-64 flex flex-col items-center text-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8 flex-shrink-0">
                    <TestimonialAvatar
                      testimonial={current}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-2xl mb-4 transform group-hover:rotate-6 transition-transform bg-white"
                    />
                    <div className="min-w-0 max-w-full">
                      <div className="font-bold text-gray-900 text-lg lg:text-xl mb-1 break-words">{current.authorName}</div>
                      {current.designation && (
                        <div className="text-orange-600 font-bold text-xs lg:text-sm uppercase tracking-wider mb-2 break-words">{current.designation}</div>
                      )}
                      {current.organization && <div className="text-gray-500 text-sm leading-tight break-words">{current.organization}</div>}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <div className="flex justify-center gap-6 mt-8 fit-mb relative z-10">
              <button
                onClick={() => go(-1)}
                className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95"
                aria-label="Previous testimonial"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 flex-wrap justify-center max-w-[60vw]">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setDirection(i > activeIndex ? 1 : -1);
                      setActiveIndex(i);
                    }}
                    className={`h-3 rounded-full transition-all ${i === activeIndex ? "bg-orange-500 w-8" : "w-3 bg-gray-300 hover:bg-gray-400"}`}
                    aria-label={`Show testimonial ${i + 1} of ${count}`}
                    aria-current={i === activeIndex}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center text-gray-900 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all active:scale-95"
                aria-label="Next testimonial"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
