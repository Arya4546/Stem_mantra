"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaArrowRight, FaPhone, FaBuilding, FaChalkboardTeacher, FaCheckCircle } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-0 bg-white">
      <div className="max-w-content mx-auto px-0 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto grid lg:grid-cols-2 overflow-hidden rounded-none md:rounded-xl"
          style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)' }}
        >

          {/* Left Side: Action */}
          <div className="p-8 md:p-14 text-white flex flex-col justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
            <div className="inline-block px-3 py-1.5 font-bold tracking-wider uppercase text-xs mb-6 w-fit rounded-md" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
              Institutional Partnership
            </div>

            <h2 className="font-heading mb-6 leading-tight" style={{ fontSize: 'var(--text-4xl)' }}>
              Establish A World-Class <br className="hidden md:block" />
              <span className="inline-block mt-2 px-2 py-0.5" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white' }}>STEM Laboratory</span>
            </h2>

            <p className="font-medium leading-relaxed mb-8" style={{ fontSize: 'var(--text-lg)', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.7 }}>
              Join the 300+ forward-thinking K-12 institutions across India utilizing STEMmantra&apos;s robust
              <strong> Robotics, STEM/STEAM-Robotics, AI &amp; Coding, and Atal Tinkering Lab (ATL)</strong> pedagogical frameworks. Prepare your students for the intellectual demands of tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-3 px-7 py-4 text-white rounded-lg font-bold transition-colors shadow-md"
                style={{ backgroundColor: 'var(--color-primary-dark)' }}
              >
                Schedule Technical Consultation
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center justify-center gap-3 px-7 py-4 text-white rounded-lg font-semibold border-2 transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.4)', backgroundColor: 'rgba(0,0,0,0.1)' }}
              >
                <FaPhone className="w-4 h-4" />
                {SITE_CONFIG.contact.mobile}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t pt-6 mt-auto" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              <div className="flex items-center gap-2 font-medium text-sm">
                <FaCheckCircle className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} /> NEP 2020 & NCF 2023 Aligned
              </div>
              <div className="flex items-center gap-2 font-medium text-sm">
                <FaCheckCircle className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} /> Turnkey Lab Solutions
              </div>
              <div className="flex items-center gap-2 font-medium text-sm">
                <FaCheckCircle className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} /> Expert Educator Training
              </div>
              <div className="flex items-center gap-2 font-medium text-sm">
                <FaCheckCircle className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.7)' }} /> NITI Aayog Compliant
              </div>
            </div>

          </div>

          {/* Right Side: Contact Info */}
          <div className="p-8 md:p-14 text-white flex flex-col justify-center" style={{ backgroundColor: 'var(--color-primary-dark)', borderLeft: '4px solid var(--color-accent)' }}>
            <h3 className="font-heading mb-8" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-accent)' }}>Corporate Headquarters</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <FaBuilding className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ fontSize: 'var(--text-base)' }}>Corporate Address</div>
                  <div className="font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>
                    {SITE_CONFIG.contact.address}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <FaChalkboardTeacher className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.5)' }} />
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ fontSize: 'var(--text-base)' }}>Curriculum Support</div>
                  <div className="font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-sm)' }}>
                    {SITE_CONFIG.contact.email}
                    <br />Support Hours: Mon-Sat, 9AM-6PM
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderLeft: '3px solid var(--color-accent)' }}>
              <div className="font-bold mb-2" style={{ fontSize: 'var(--text-lg)' }}>Request RFP Document</div>
              <p className="font-medium leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                Institutions requiring a comprehensive descriptive evaluation for large-scale multi-lab installations can request our official RFP documentation and technical specifications.
              </p>
              <Link href="/contact" className="font-bold hover:underline flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: 'var(--color-accent)' }}>
                Submit Request <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
