"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaLightbulb, FaTools, FaCog, FaChevronDown } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const methodologyItems = [
  {
    id: "cbl",
    title: "Concept-Based Learning",
    description: "Concept-based learning focuses on building a strong foundation through basic concepts. Students learn these concepts using engaging activities in robotics and coding. This approach makes learning simple, interactive, and easy to understand.",
    icon: FaLightbulb,
    color: "text-[#f97316]",
    bg: "bg-orange-50/50",
    border: "border-orange-100",
    hoverBorder: "hover:border-orange-200",
    shadow: "shadow-orange-500/5"
  },
  {
    id: "pbl",
    title: "Project-Based Learning",
    description: "Project-based learning is the intermediate stage where students apply their basic knowledge. They progress from concepts to creating simple projects that help solve everyday problems. This hands-on approach strengthens understanding and practical skills.",
    icon: FaTools,
    color: "text-[#5bc0be]",
    bg: "bg-teal-50/50",
    border: "border-teal-100",
    hoverBorder: "hover:border-teal-200",
    shadow: "shadow-teal-500/5"
  },
  {
    id: "ibl",
    title: "Innovation-Based Learning",
    description: "Innovation-based learning focuses on solving real-world problems. Students identify challenges and use their basic and intermediate knowledge to develop solutions while learning advanced concepts. This approach promotes creativity, critical thinking, and innovation.",
    icon: FaCog,
    color: "text-[#3d5a80]",
    bg: "bg-slate-50/50",
    border: "border-slate-100",
    hoverBorder: "hover:border-slate-200",
    shadow: "shadow-slate-500/5"
  }
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section ref={ref} className="relative pt-20 lg:pt-28 pb-0 bg-white overflow-hidden">
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
              &quot;Our aim is to reach 10 million+ students within the next 3 years, empowering the next generation of innovators.&quot;
            </p>
          </motion.div>

          {/* Our Core Methodological Philosophy — Redesigned with brochure images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Section header - centered to match previous section header */}
            <div className="mb-12 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6 mx-auto">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Our Methodology</span>
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight text-center">
                Our Core Methodological <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">Philosophy</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto text-center">
                A progressive learning journey that transforms students from curious users to confident innovators through three proven frameworks — CBL, PBL, and IBL.
              </p>
            </div>

            {/* Methodology Cycle Image - centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative mb-16 flex justify-center"
            >
              <div className="w-full max-w-[1400px] mx-auto flex justify-center">
                <Image
                  src="/images/methodology/imagee4.jpeg"
                  alt="STEMmantra Methodology Cycle - CBL, PBL, IBL learning progression from User to Maker to Creator to Innovator"
                  width={1049}
                  height={822}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 1536px) 100vw, 1400px"
                />
              </div>
            </motion.div>

            {/* Three methodology descriptions */}
            <div className="grid md:grid-cols-3 gap-10 max-w-[1400px] mx-auto pb-10">
              {methodologyItems.map((item) => {
                const Icon = item.icon;
                const isOpen = openStates[item.id];
                return (
                  <div 
                    key={item.id}
                    className={`flex flex-col rounded-2xl border ${item.border} bg-white p-6 shadow-sm ${item.shadow} ${item.hoverBorder} hover:shadow-md transition-all cursor-pointer group`}
                    onClick={() => toggleCard(item.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h4 className={`text-2xl font-black ${item.color} leading-tight`}>
                          {item.title}
                        </h4>
                      </div>
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className={`${item.color} opacity-40 mt-2`}
                      >
                        <FaChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className={`mt-6 text-gray-600 leading-relaxed text-lg border-t ${item.border} pt-4`}>
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {!isOpen && (
                      <p className={`mt-4 text-sm font-bold ${item.color} opacity-40 uppercase tracking-widest group-hover:opacity-100 transition-opacity`}>
                        Click to explore
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-10 border-t border-gray-100 flex justify-center">
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[#f97316] text-white text-lg md:text-xl font-black rounded-xl hover:bg-orange-700 hover:scale-105 transition-all duration-300 shadow-xl shadow-orange-500/20"
              >
                Connect with our Academic Directors <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
