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
    <section ref={ref} className="relative overflow-hidden" style={{ paddingTop: 'var(--space-8)', paddingBottom: 'var(--space-section)', background: 'linear-gradient(to bottom, var(--color-surface), var(--color-white))' }}>
      <FloatingAnimations variant="section" density="low" />
      <div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="inline-block px-3 py-1.5 rounded-md text-xs font-semibold mb-4"
            style={{ backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
            Trusted Partners
          </span>
          <h2 className="font-heading mb-5" style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}>
            Schools That{" "}
            <span style={{ color: 'var(--color-accent)' }}>
              Trust Us
            </span>
          </h2>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)' }}>
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
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10" style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }} />

          {/* Scrolling Container */}
          <div className="overflow-hidden py-6">
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
              .marquee-content {
                animation: marquee-scroll 30s linear infinite;
              }
            `}</style>
            <div className="flex gap-6 md:gap-8 w-max marquee-content hover:[animation-play-state:paused]">

              {allPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-36 h-20 bg-white rounded-lg border flex items-center justify-center p-3 hover:shadow-md transition-all duration-200 group"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  {/* Placeholder for logo */}
                  <div className="text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: 'var(--color-surface-alt)' }}>
                      <span className="font-heading text-base" style={{ color: 'var(--color-primary)' }}>
                        {partner.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[10px] line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>{partner.name}</span>
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
          className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-10"
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
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:shadow-sm transition-all"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <badge.icon className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
              <span className="text-xs font-medium" style={{ color: 'var(--color-text-primary)' }}>{badge.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p style={{ color: 'var(--color-text-secondary)' }} className="mb-3">Want to partner with us?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 font-semibold hover:underline transition-colors"
            style={{ color: 'var(--color-accent)' }}
          >
            Become a Partner
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
