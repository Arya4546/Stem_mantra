"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Keeping floating animations as requested */}
      <FloatingAnimations variant="default" density="high" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Intro Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
              Pioneering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 drop-shadow-sm">Experiential Learning in India</span>
            </h2>
            <div className="w-24 h-2 bg-orange-500 mx-auto rounded-full mb-8"></div>
          </motion.div>

          {/* Heavy SEO Prose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-xl prose-gray md:prose-2xl text-gray-600 max-w-none text-justify md:text-left leading-relaxed font-medium"
          >
            <p className="mb-8">
              STEMmantra is universally recognised as the premier educational lab partner across India.
              We specialise in the holistic development and deployment of advanced <strong className="text-gray-900 border-b-2 border-orange-200">Robotics, Artificial Intelligence &amp; Coding Labs, and STEM/STEAM educational laboratories</strong>
              within progressive K-12 academic institutions.
            </p>
            <p className="mb-8">
              Traditional rote learning frameworks are fundamentally incompatible with the demands of the modern algorithmic economy.
              Our organization was established to bridge this critical deficit through rigorous, outcome-based, and heavily hands-on
              curricula carefully constructed by industry leader having decade of experience.
            </p>
            <p className="mb-8">
              From foundational introductory tinkering programs utilising basic electronics circuits to elite-tier competitive robotics
              geared towards national/International level of curriculum, STEMmantra architects learning continuum that scale precisely
              with student cognitive development and strict <strong className="text-gray-900 border-b-2 border-orange-200">National Education Policy (NEP 2020) &amp; NCF (National Curriculum framework)2023</strong> compliance guidelines.
            </p>
            <p className="text-2xl font-bold text-orange-600 italic border-l-4 border-orange-500 pl-6 my-10">
              &quot;Our aim is to reach 1 million students within the next 3 years, empowering the next generation of innovators.&quot;
            </p>
          </motion.div>

          {/* Complete Lab Solutions — Brand New Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="pt-16 border-t border-gray-100"
          >
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Complete Lab Solutions</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide end-to-end turnkey solutions for schools looking to establish world-class innovation centers and technology laboratories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: "Robotics & AI Lab",
                  desc: "Comprehensive setup with DIY robotics kits, autonomous systems, and advanced AI & Machine Learning modules for deep technical exploration."
                },
                {
                  title: "STEM/STEAM Lab",
                  desc: "Integrated learning spaces focusing on Science, Tech, Engineering, Art, and Math through inquiry-based projects and rapid prototyping."
                },
                {
                  title: "Coding & AI Labs",
                  desc: "Digital centers focused on computational thinking, algorithmic reasoning, and software development using industry-standard tools."
                },
                {
                  title: "ATL Lab Setup",
                  desc: "Seamless implementation of Atal Tinkering Labs with NITI Aayog compliance, specialized equipment, and continuous mentorship."
                },
                {
                  title: "IoT & Drone Lab",
                  desc: "Exploring the world of connected devices and aerial robotics through specialized sensor kits and flight-tech hardware."
                },
                {
                  title: "3-D Printing Lab",
                  desc: "Empowering students to turn ideas into physical reality with high-precision fabrication tools and additive manufacturing technology."
                }
              ].map((solution, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all group">
                  <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">{solution.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {solution.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-orange-600 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
              {/* Subtle SVG Background Pattern */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5,5" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M10 10 L90 90 M90 10 L10 90" stroke="currentColor" strokeWidth="0.5" />
              </svg>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                <div className="max-w-xl">
                  <h4 className="text-3xl md:text-4xl font-black mb-4">Ready to Transform Your School?</h4>
                  <p className="text-xl text-orange-100 italic">
                    Join 500+ progressive institutions already pioneering experiential education with STEMmantra.
                  </p>
                </div>
                <Link href="/contact" className="px-10 py-5 bg-white text-orange-600 font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl">
                  Get a Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 pt-10 border-t border-gray-200 flex justify-end">
            <Link href="/contact" className="inline-flex items-center gap-3 text-gray-900 text-xl font-bold hover:text-orange-600 transition-colors">
              Connect with our Academic Directors <FaArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
