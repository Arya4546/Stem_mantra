"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, CheckCircle, Award, Star } from "lucide-react";

// Partner schools and organizations
const partners = [
  { name: "Kendriya Vidyalaya", logo: "/images/partners/kv-logo.png" },
  { name: "Delhi Public School", logo: "/images/partners/dps-logo.png" },
  { name: "Army Public School", logo: "/images/partners/aps-logo.png" },
  { name: "DAV Schools", logo: "/images/partners/dav-logo.png" },
  { name: "St. Thomas School", logo: "/images/partners/st-thomas-logo.png" },
  { name: "Ryan International", logo: "/images/partners/ryan-logo.png" },
  { name: "Amity International", logo: "/images/partners/amity-logo.png" },
  { name: "Jawahar Navodaya", logo: "/images/partners/jnv-logo.png" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
            Trusted Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Schools That{" "}
            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              Trust Us
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Partnering with India&apos;s leading educational institutions to deliver world-class STEM education
          </p>
        </motion.div>

        {/* Partner Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="overflow-hidden py-8">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-12"
            >
              {allPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-24 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center p-4 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
                >
                  {/* Placeholder for logo */}
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto bg-gradient-to-br from-orange-100 to-teal-100 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <span className="text-orange-500 font-bold text-lg">
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 line-clamp-1">{partner.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12"
        >
          {[
            { label: "Government Approved", icon: CheckCircle },
            { label: "NEP 2020 Aligned", icon: BookOpen },
            { label: "ISO Certified", icon: Award },
            { label: "CBSE Recommended", icon: Star },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
            >
              <span className="text-lg"><badge.icon className="w-5 h-5 text-orange-500" /></span>
              <span className="text-sm font-medium text-gray-700">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">Want to partner with us?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            Become a Partner
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
