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
    color: "var(--color-accent)",
  },
  {
    id: "pbl",
    title: "Project-Based Learning",
    description: "Project-based learning is the intermediate stage where students apply their basic knowledge. They progress from concepts to creating simple projects that help solve everyday problems. This hands-on approach strengthens understanding and practical skills.",
    icon: FaTools,
    color: "var(--color-primary)",
  },
  {
    id: "ibl",
    title: "Innovation-Based Learning",
    description: "Innovation-based learning focuses on solving real-world problems. Students identify challenges and use their basic and intermediate knowledge to develop solutions while learning advanced concepts. This approach promotes creativity, critical thinking, and innovation.",
    icon: FaCog,
    color: "var(--color-primary-dark)",
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
    <section ref={ref} className="relative overflow-hidden" style={{ paddingTop: 'var(--space-section)', paddingBottom: '0', backgroundColor: 'var(--color-white)' }}>
      <FloatingAnimations variant="default" density="low" />

      <div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
        <div className="space-y-16 lg:space-y-20">

          {/* Intro Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading mb-6 leading-tight" style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text-primary)' }}>
              Pioneering the Future of <br className="hidden md:block" />
              <span style={{ color: 'var(--color-accent)' }}>
                Experiential Learning in India
              </span>
            </h2>
            <div className="w-16 h-1 mx-auto rounded-full mb-6" style={{ backgroundColor: 'var(--color-accent)' }}></div>
          </motion.div>

          {/* Heavy SEO Prose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-none text-left md:text-justify leading-relaxed"
            style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}
          >
            <p className="mb-6">
              STEMmantra is universally recognised as the premier educational lab partner across India.
              We specialise in the holistic development and deployment of advanced <strong style={{ color: 'var(--color-text-primary)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '1px' }}>Robotics, Artificial Intelligence &amp; Coding Labs and STEM/STEAM educational laboratories</strong> within progressive K-12 academic institutions.
            </p>
            <p className="mb-6">
              Traditional rote learning frameworks are fundamentally incompatible with the demands of the modern algorithmic economy.
              Our organization was established to bridge this critical deficit through rigorous, outcome-based, and heavily hands-on
              curricula carefully constructed by industry leader having decade of experience.
            </p>
            <p className="mb-6">
              From foundational introductory tinkering programs utilising basic electronics circuits to elite-tier competitive robotics
              geared towards national/International level of curriculum, STEMmantra architects learning continuum that scale precisely
              with student cognitive development and strict <strong style={{ color: 'var(--color-text-primary)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '1px' }}>National Education Policy (NEP 2020) &amp; National Curriculum Framework (NCF 2023)</strong> compliance guidelines.
            </p>
            {/* Pull Quote — distinctly styled */}
            <blockquote className="my-10 py-5 px-6 rounded-lg" style={{ borderLeft: '4px solid var(--color-accent)', backgroundColor: 'var(--color-accent-light)', fontSize: 'var(--text-xl)', color: 'var(--color-primary)', fontStyle: 'italic', fontWeight: 600 }}>
              &quot;Our aim is to reach 10 million+ students within the next 3 years, empowering the next generation of innovators.&quot;
            </blockquote>
          </motion.div>

          {/* Core Methodological Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Section header */}
            <div className="mb-10 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md mb-6 mx-auto" style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-border)' }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent-dark)' }}>Our Methodology</span>
              </div>
              <h2 className="font-heading mb-4 leading-tight text-center" style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text-primary)' }}>
                Our Core Methodological <span style={{ color: 'var(--color-accent)' }}>Philosophy</span>
              </h2>
              <p className="max-w-4xl mx-auto text-center" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                A progressive learning journey that transforms students from curious users to confident innovators through three proven frameworks — CBL, PBL, and IBL.
              </p>
            </div>

            {/* Methodology Cycle Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative mb-14 flex justify-center"
            >
              <div className="w-full max-w-[1200px] mx-auto flex justify-center">
                <Image
                  src="/images/methodology/imagee4.jpeg"
                  alt="STEMmantra Methodology Cycle - CBL, PBL, IBL learning progression from User to Maker to Creator to Innovator"
                  width={1049}
                  height={822}
                  className="w-full h-auto object-contain rounded-lg"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Three methodology descriptions */}
            <div className="grid md:grid-cols-3 gap-8 max-w-content mx-auto pb-10">
              {methodologyItems.map((item) => {
                const Icon = item.icon;
                const isOpen = openStates[item.id];
                return (
                  <div 
                    key={item.id}
                    className="flex flex-col rounded-xl bg-white p-6 border hover:shadow-md transition-all cursor-pointer group"
                    style={{ borderColor: 'var(--color-border)' }}
                    onClick={() => toggleCard(item.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-3">
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                          style={{ backgroundColor: 'var(--color-surface-alt)', color: item.color }}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-xl font-bold leading-tight" style={{ color: item.color }}>
                          {item.title}
                        </h4>
                      </div>
                      <motion.div 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        style={{ color: item.color, opacity: 0.4 }}
                        className="mt-2"
                      >
                        <FaChevronDown className="w-4 h-4" />
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
                          <p className="mt-5 leading-relaxed border-t pt-4" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)', borderColor: 'var(--color-border)' }}>
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {!isOpen && (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-wider opacity-40 group-hover:opacity-80 transition-opacity" style={{ color: item.color }}>
                        Click to explore
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-6 pt-8 border-t flex justify-center" style={{ borderColor: 'var(--color-border)' }}>
              <Link 
                href="/contact" 
                className="group inline-flex items-center gap-3 px-8 py-4 text-white font-bold rounded-lg hover:brightness-110 transition-all duration-200 shadow-md"
                style={{ backgroundColor: 'var(--color-accent)', fontSize: 'var(--text-lg)' }}
              >
                Connect with our Academic Directors <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
