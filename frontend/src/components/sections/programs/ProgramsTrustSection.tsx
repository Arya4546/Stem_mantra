"use client";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { ExpandableQuote, RatingStars, TestimonialAvatar } from "@/components/sections/testimonial-parts";
import type { ClientItem, TestimonialItem } from "@/types/site";

export default function ProgramsTrustSection({
  clients,
  testimonials,
}: {
  clients: ClientItem[];
  testimonials: TestimonialItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;
  const hasLogos = clients.some((c) => c.logo);

  const nextSlide = useCallback(() => setActiveIndex((prev) => (prev + 1) % Math.max(count, 1)), [count]);
  const prevSlide = useCallback(() => setActiveIndex((prev) => (prev - 1 + count) % Math.max(count, 1)), [count]);

  // Auto-play (paused while the visitor hovers, focuses or expands a long testimonial)
  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [paused, count, nextSlide]);

  if (count === 0 && !hasLogos) return null;
  const current = count ? testimonials[Math.min(activeIndex, count - 1)] : null;

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) nextSlide();
    else if (info.offset.x > 60) prevSlide();
  };

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
        {hasLogos && (
          <div className="mb-20">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">
              STEMmantra is implemented in leading schools
            </p>
            <div className="py-4">
              <LogoMarquee
                clients={clients}
                gapPx={28}
                secondsPerLogo={3.3}
                tileClassName="w-32 md:w-40 h-24 bg-white rounded-xl shadow-sm border border-gray-100 p-3 md:p-4"
              />
            </div>
          </div>
        )}

        {/* Testimonials Slider */}
        {current && (
          <div
            className="max-w-5xl mx-auto relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div className="relative min-h-[420px] md:min-h-[340px] bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
              <Quote className="absolute top-8 left-8 w-24 h-24 text-gray-50 opacity-50 pointer-events-none" aria-hidden />

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  drag={count > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={onDragEnd}
                  className="relative w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12"
                >
                  {/* Author */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left flex-shrink-0 w-full md:w-64 md:border-r border-gray-100 md:pr-8">
                    <TestimonialAvatar testimonial={current} className="w-24 h-24 rounded-2xl mb-4 border border-gray-100" sizes="96px" />
                    <h3 className="font-bold text-gray-900 text-lg mb-1 break-words">{current.authorName}</h3>
                    {current.designation && (
                      <p className="text-orange-600 font-semibold text-sm uppercase tracking-wider mb-2 break-words">{current.designation}</p>
                    )}
                    {current.organization && (
                      <p className="text-gray-500 text-sm font-medium leading-snug break-words">{current.organization}</p>
                    )}
                    <div className="mt-4">
                      <RatingStars rating={current.rating} />
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <Quote className="w-8 h-8 text-orange-300 mb-4 hidden md:block" aria-hidden />
                    <ExpandableQuote
                      text={current.content}
                      lines={7}
                      onExpandedChange={(open) => setPaused(open)}
                      className="text-gray-700 text-base md:text-xl leading-relaxed italic font-medium"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {count > 1 && (
              <div className="flex items-center justify-center gap-6 mt-8">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2 flex-wrap justify-center max-w-[60vw]">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2.5 rounded-full transition-all ${
                        i === activeIndex ? "bg-orange-500 w-8" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Show testimonial ${i + 1} of ${count}`}
                      aria-current={i === activeIndex}
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
            )}
          </div>
        )}
      </div>
    </section>
  );
}
