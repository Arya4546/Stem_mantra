"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, CheckCircle, Award, Star } from "lucide-react";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

// Partner schools and organizations - real logos from STEMmantra brochure
const partners = [
  { name: "St. Thomas School", logo: "/images/partners/partner-1.png" },
  { name: "Shaheed Amar Singh Public School", logo: "/images/partners/partner-2.png" },
  { name: "Unique Global Academy", logo: "/images/partners/partner-3.png" },
  { name: "MBLM School", logo: "/images/partners/partner-4.png" },
  { name: "GD Goenka Signature School", logo: "/images/partners/partner-5.png" },
  { name: "Education Partner", logo: "/images/partners/partner-6.png" },
  { name: "Muslim Education Society", logo: "/images/partners/partner-7.png" },
  { name: "Prabhakar Sr. Sec. School", logo: "/images/partners/partner-8.png" },
  { name: "Partner School", logo: "/images/partners/partner-9.png" },
  { name: "Army School", logo: "/images/partners/partner-10.png" },
  { name: "Partner Institution", logo: "/images/partners/partner-11.png" },
  { name: "Mount Olympus School", logo: "/images/partners/partner-12.png" },
];

// Duplicate for seamless loop
const allPartners = [...partners, ...partners];

export default function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
      <FloatingAnimations variant="section" density="low" />
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 fit-mb"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-100/80 text-teal-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
            Trusted Partners
          </span>
          <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">
            Schools That{" "}
            <span className="text-orange-500">
              Trust Us
            </span>
          </h2>
          <p className="fit-lead text-lg text-gray-600">
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

          {/* Scrolling Container */}
          <div className="overflow-hidden py-8 lg:py-[clamp(0.25rem,1.6vh,2rem)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .marquee-content {
                animation: marquee-scroll 30s linear infinite;
              }
            `}</style>
            <div className="flex gap-8 md:gap-12 w-max marquee-content hover:[animation-play-state:paused]">

              {allPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-24 lg:h-[clamp(4rem,11vh,6rem)] bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-4 hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
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
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12 fit-mb"
        >
          {[
            { label: "GeM Registered", icon: CheckCircle },
            { label: "Gov Approved Institutions", icon: BookOpen },
            { label: "NEP 2020 Aligned", icon: Award },
            { label: "NCF-2023 Aligned", icon: Award },
            { label: "Top Private Schools", icon: Star },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/90 rounded-full shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
            >
              <span className="text-lg"><badge.icon className="w-5 h-5 text-orange-500" /></span>
              <span className="text-sm font-semibold text-gray-700">{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-16 fit-mb"
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
