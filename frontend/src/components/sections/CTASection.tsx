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
    <section ref={ref} className="fit py-10 lg:py-12 bg-transparent">
      {/* Heavy Split Level CTA instead of a weak single floating card */}
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto grid lg:grid-cols-2 shadow-2xl overflow-hidden rounded-2xl md:rounded-3xl ring-1 ring-black/5"
        >

          {/* Left Side: Heavy Text / Action */}
          <div className="bg-gradient-to-br from-orange-600 via-orange-600 to-orange-500 p-8 md:p-12 lg:p-14 fit-pad text-white flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 bg-black/20 rounded-full font-bold tracking-wider uppercase text-sm mb-5 w-fit">
              Institutional Partnership
            </div>

            <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Establish A World-Class <br className="hidden md:block" />
              <span className="text-orange-600 bg-white px-3 py-0.5 mt-2 inline-block rounded-lg">STEM Laboratory</span>
            </h2>

            <p className="fit-lead text-base md:text-lg leading-relaxed mb-8 fit-mb text-orange-50">
              Join the 300+ forward-thinking K-12 institutions across India utilizing STEMmantra&apos;s robust
              <strong> Robotics, STEM/STEAM-Robotics, AI &amp; Coding, and Atal Tinkering Lab (ATL)</strong> pedagogical frameworks. Prepare your students for the intellectual demands of tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 fit-mb">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-3 fit-btn px-7 py-3.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black hover:-translate-y-0.5 transition-all shadow-xl"
              >
                Schedule Technical Consultation
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center justify-center gap-3 fit-btn px-7 py-3.5 bg-white/10 text-white rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition-colors"
              >
                <FaPhone className="w-4 h-4" />
                {SITE_CONFIG.contact.mobile}
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm border-t border-white/20 pt-6 mt-auto">
              <div className="flex items-center gap-2 font-semibold">
                <FaCheckCircle className="text-orange-300 w-5 h-5" /> NEP 2020 & NCF 2023 Aligned
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <FaCheckCircle className="text-orange-300 w-5 h-5" /> Turnkey Lab Solutions
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <FaCheckCircle className="text-orange-300 w-5 h-5" /> Expert Educator Training
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <FaCheckCircle className="text-orange-300 w-5 h-5" /> NITI Aayog Compliant
              </div>
            </div>

          </div>

          {/* Right Side: Informational Contact / Proof */}
          <div className="relative overflow-hidden bg-gray-900 p-8 md:p-12 lg:p-14 fit-pad text-white flex flex-col justify-center">
            <h3 className="fit-h2 text-2xl md:text-3xl font-black mb-8 text-orange-500 tracking-tight">Corporate Headquarters</h3>

            <div className="space-y-8 fit-stack mb-12 fit-mb">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-white/10 flex items-center justify-center rounded-xl flex-shrink-0">
                  <FaBuilding className="text-gray-400 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-base text-white mb-1">Corporate Address</div>
                  <div className="text-gray-400 text-sm fit-lead leading-relaxed">
                    {SITE_CONFIG.contact.address}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-white/10 flex items-center justify-center rounded-xl flex-shrink-0">
                  <FaChalkboardTeacher className="text-gray-400 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-base text-white mb-1">Curriculum Support</div>
                  <div className="text-gray-400 text-sm fit-lead leading-relaxed">
                    {SITE_CONFIG.contact.email}
                    <br />Support Hours: Mon-Sat, 9AM-6PM
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 fit-pad">
              <div className="font-bold text-lg mb-2">Request RFP Document</div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Institutions requiring a comprehensive descriptive evaluation for large-scale multi-lab installations can request our official RFP documentation and technical specifications.
              </p>
              <Link href="/contact" className="text-orange-500 font-bold hover:text-orange-400 flex items-center gap-2 text-sm uppercase tracking-wider">
                Submit Request <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
