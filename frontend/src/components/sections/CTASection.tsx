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
      {/* Heavy Split Level CTA instead of a weak single floating card */}
      <div className="mx-auto px-0 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto grid lg:grid-cols-2 shadow-2xl overflow-hidden rounded-none md:rounded-3xl"
        >

          {/* Left Side: Heavy Text / Action */}
          <div className="bg-orange-600 p-10 md:p-16 text-white flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 bg-black/20 font-black tracking-widest uppercase text-sm mb-6 w-fit">
              Institutional Partnership
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Establish A World-Class <br className="hidden md:block" />
              <span className="text-black bg-white px-2 mt-2 inline-block">STEM Laboratory</span>
            </h2>

            <p className="text-lg md:text-xl font-medium leading-relaxed mb-10 text-orange-50">
              Join the 300+ forward-thinking K-12 institutions across India utilizing STEMmantra&apos;s robust
              <strong> Robotics, STEM/STEAM-Robotics, AI &amp; Coding, and Atal Tinkering Lab (ATL)</strong> pedagogical frameworks. Prepare your students for the intellectual demands of tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-3 px-8 py-5 bg-black text-white rounded-none font-black hover:bg-gray-900 transition-colors shadow-xl"
              >
                Schedule Technical Consultation
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center justify-center gap-3 px-8 py-5 bg-orange-700 text-white rounded-none font-bold border-2 border-orange-500 hover:bg-orange-800 transition-colors"
              >
                <FaPhone className="w-5 h-5" />
                {SITE_CONFIG.contact.mobile}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-orange-500/50 pt-8 mt-auto">
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

          {/* Right Side: Informational Contact / Proof (No gradients) */}
          <div className="bg-gray-900 p-10 md:p-16 text-white flex flex-col justify-center border-l-8 border-orange-500">
            <h3 className="text-3xl font-extrabold mb-8 text-orange-500">Corporate Headquarters</h3>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded-none flex-shrink-0">
                  <FaBuilding className="text-gray-400 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-lg text-white mb-1">Corporate Address</div>
                  <div className="text-gray-400 leading-relaxed font-medium">
                    {SITE_CONFIG.contact.address}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-800 flex items-center justify-center rounded-none flex-shrink-0">
                  <FaChalkboardTeacher className="text-gray-400 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-lg text-white mb-1">Curriculum Support</div>
                  <div className="text-gray-400 leading-relaxed font-medium">
                    {SITE_CONFIG.contact.email}
                    <br />Support Hours: Mon-Sat, 9AM-6PM
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 border-l-4 border-orange-500">
              <div className="font-black text-xl mb-2">Request RFP Document</div>
              <p className="text-sm font-medium text-gray-400 leading-relaxed mb-4">
                Institutions requiring a comprehensive descriptive evaluation for large-scale multi-lab installations can request our official RFP documentation and technical specifications.
              </p>
              <Link href="/contact" className="text-orange-500 font-bold hover:text-orange-400 flex items-center gap-2 text-sm uppercase tracking-widest">
                Submit Request <FaArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
