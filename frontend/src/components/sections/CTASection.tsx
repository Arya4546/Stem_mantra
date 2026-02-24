"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaPhone, FaEnvelope } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Contained card — not full-width gradient */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Subtle geometric pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="white" strokeWidth="1" />
                <circle cx="100" cy="100" r="40" stroke="white" strokeWidth="1" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Transform{" "}
                  <span className="text-orange-400">Your School?</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-xl mx-auto">
                  Take the first step towards building future-ready innovators. Schedule a free demo today!
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20"
                >
                  Schedule a Demo
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <FaPhone className="w-4 h-4" />
                  Call Us Now
                </a>
              </div>

              {/* Compact contact info */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                <a href={`tel:${SITE_CONFIG.contact.mobile}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaPhone className="w-3 h-3" />
                  {SITE_CONFIG.contact.mobile}
                </a>
                <span className="hidden sm:block w-px h-4 bg-gray-600" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <FaEnvelope className="w-3 h-3" />
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              {/* Trust tags */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-500">
                {["Free Demo", "No Obligation", "Expert Consultation", "Response within 24 hrs"].map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
