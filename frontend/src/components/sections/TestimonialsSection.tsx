"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "@/data/testimonials";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Let's just use 4 for a solid 2x2 grid that doesn't look like an AI generated masonry wall
  const displayTestimonials = testimonials.slice(0, 4);

  return (
    <section ref={ref} className="relative py-24 bg-white overflow-hidden">
      <FloatingAnimations variant="about" density="medium" />

      <div className="container mx-auto px-4 relative z-10">

        <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto items-center">

          {/* The Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-blue-50 border-l-4 border-blue-600 mb-6">
              <span className="text-sm font-black text-blue-900 uppercase tracking-widest">Administrator Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Validated by <span className="text-orange-500">Academic Visionaries</span>
            </h2>
            <div className="prose prose-lg text-gray-600 font-medium leading-relaxed">
              <p>
                The true measure of an educational technology provider is the sustained success and satisfaction of its institutional partners.
              </p>
              <p>
                Listen to Principals &amp; Directors from prestigious K-12 schools across India discuss the transformational impact of our <strong>Robotics Laboratories, AI Curriculums, and Atal Tinkering Labs (ATL)</strong> integrations.
              </p>
            </div>
          </motion.div>

          {/* The Strict 2x2 Grid (No Masonry) */}
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
            {displayTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="bg-gray-50 p-8 rounded-none border border-gray-200 border-t-8 border-t-orange-500 shadow-xl shadow-gray-200/50"
              >
                <FaQuoteLeft className="w-8 h-8 text-gray-300 mb-6" />

                <p className="text-gray-700 text-lg leading-relaxed font-semibold mb-8 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-orange-400" />
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div className="w-12 h-12 rounded-none bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-black text-white">
                      {testimonial.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-extrabold text-gray-900 text-base">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{testimonial.role}</div>
                    {testimonial.school && (
                      <div className="text-sm font-bold text-orange-600 mt-1">{testimonial.school}</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
