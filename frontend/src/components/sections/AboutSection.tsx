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
    <section ref={ref} className="relative py-16 lg:py-24 bg-white overflow-hidden">
      {/* Keeping floating animations as requested */}
      <FloatingAnimations variant="default" density="high" />

      <div className="site-container relative z-10">

        {/* Massive Text Layout for SEO */}
        <div className="space-y-16 lg:space-y-20">

          {/* Intro Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Our Core <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 drop-shadow-sm">
                Methodological Philosophy
              </span>
            </h2>
            <div className="w-28 h-1.5 bg-orange-500 rounded-full"></div>
          </motion.div>

          {/* Heavy SEO Prose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg md:prose-xl prose-gray text-gray-600 max-w-none leading-relaxed font-medium"
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
          </motion.div>

          {/* Flat Call Out Block (No Cards) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-8 md:p-12 bg-gray-50 border-l-8 border-orange-500 rounded-2xl"
          >
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Pioneering the Future of <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400">
                Experiential Learning in India
              </span>
            </h3>

            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Concept-Based Learning</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Concept-based learning focuses on building a strong foundation through basic concepts. Students learn these concepts using engaging activities in robotics and coding. This approach makes learning simple, interactive, and easy to understand.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Project-Based Learning</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Project-based learning is the intermediate stage where students apply their basic knowledge. They progress from concepts to creating simple projects that help solve everyday problems. This hands-on approach strengthens understanding and practical skills.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-orange-600">Innovation-Based Learning</h4>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Innovation-based learning focuses on solving real-world problems. Students identify challenges and use their basic and intermediate knowledge to develop solutions while learning advanced concepts. This approach promotes creativity, critical thinking, and innovation.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-gray-200 flex justify-end">
              <Link href="/contact" className="inline-flex items-center gap-3 text-gray-900 text-xl font-bold hover:text-orange-600 transition-colors">
                Connect with our Academic Directors <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Standalone Mission Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative py-16 px-8 md:px-10 bg-gray-50 border-2 border-orange-100 rounded-3xl shadow-[0_20px_50px_rgba(249,115,22,0.05)] overflow-hidden max-w-5xl"
          >
            <div className="absolute top-0 left-0 w-3 h-full bg-orange-500" />
            <p className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight italic">
              &quot;Our aim is to reach <span className="text-orange-600 underline decoration-orange-200 underline-offset-8">1 million students</span> within the next 3 years, empowering the next generation of innovators.&quot;
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
