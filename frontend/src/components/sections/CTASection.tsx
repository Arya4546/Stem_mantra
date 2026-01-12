"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaPhone, FaEnvelope, FaRocket } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-teal-600" />
      
      {/* Animated Background */}
      <FloatingAnimations variant="section" density="low" className="opacity-10" />
      
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                            radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6"
            >
              <FaRocket className="w-4 h-4 animate-bounce-subtle" />
              Join 500+ Schools Transforming Education
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-shadow-lg">
              Ready to Transform{" "}
              <span className="text-yellow-300">Your School?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
              Take the first step towards building future-ready innovators. Schedule a free demo today!
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/30 transition-all duration-300"
                >
                  Schedule a Demo
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                >
                  <FaPhone className="w-4 h-4" />
                  Call Us Now
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Phone Card */}
            <a
              href={`tel:${SITE_CONFIG.contact.mobile}`}
              className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaPhone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">Call us directly</div>
                <div className="text-white text-xl font-bold">{SITE_CONFIG.contact.mobile}</div>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="group flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaEnvelope className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/70 text-sm mb-1">Email us</div>
                <div className="text-white text-xl font-bold">{SITE_CONFIG.contact.email}</div>
              </div>
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Free Demo
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              No Obligation
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Expert Consultation
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Response within 24 hrs
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
