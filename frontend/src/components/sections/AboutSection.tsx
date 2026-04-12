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
      <FloatingAnimations variant="default" density="low" />

      <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="space-y-16 lg:space-y-24">

          {/* Intro Header - Kept at top as requested */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
              Pioneering the Future of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 drop-shadow-sm">
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
            className="prose prose-xl prose-gray md:prose-2xl text-gray-600 max-w-none text-left md:text-justify leading-relaxed font-medium"
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

        </div>
      </div>
    </section>
  );
}
