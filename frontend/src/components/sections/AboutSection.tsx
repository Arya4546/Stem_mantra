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

        {/* Massive Text Layout for SEO */}
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Intro Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Pioneering the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                Experiential Learning in India
              </span>
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
              STEMmantra is universally recognized as the premier educational infrastructure partner across India.
              We specialize in the holistic development and deployment of advanced <strong className="text-gray-900 border-b-2 border-orange-200">Robotics, Artificial Intelligence, and STEM educational laboratories</strong>
              within progressive K-12 academic institutions.
            </p>
            <p className="mb-8">
              Traditional rote learning frameworks are fundamentally incompatible with the demands of the modern algorithmic economy.
              Our organization was established to bridge this critical deficit through rigorous, outcome-based, and heavily hands-on
              curricula carefully constructed by alumni of India&apos;s top engineering institutions (IITs and NITs).
            </p>
            <p>
              From foundational introductory tinkering programs utilizing basic circuits to elite-tier competitive robotics
              geared towards international olympiads, STEMmantra architects learning continuums that scale precisely
              with student cognitive development and strict <strong className="text-gray-900 border-b-2 border-orange-200">National Education Policy (NEP 2020)</strong> compliance guidelines.
            </p>
          </motion.div>

          {/* Flat Call Out Block (No Cards) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-10 md:p-14 bg-gray-50 border-l-8 border-orange-500"
          >
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">Our Core Methodological Philosophy</h3>

            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Concept-Based Acquisition</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Prioritizing deep foundational comprehension of mechanics, physics, and logic over superficial software syntax memorization.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Project-Based Application</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Translating abstract theory into tangible, functional prototypes utilizing industry-grade microcontrollers and rapid prototyping tools.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Innovation-Based Evolution</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Encouraging lateral thinking by challenging student cohorts to engineer novel solutions to local environmental or social constraints.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-gray-200 flex justify-end">
              <Link href="/contact" className="inline-flex items-center gap-3 text-gray-900 text-xl font-bold hover:text-orange-600 transition-colors">
                Connect with our Academic Directors <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
