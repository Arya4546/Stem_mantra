"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

/* ──────────────────────────────────────────
   Premium SVG Chart — Learning Retention
   ────────────────────────────────────────── */
const retentionData = [
  { label: "Lecture", value: 5, color1: "#cbd5e1", color2: "#94a3b8", textColor: "#64748b" },
  { label: "Reading", value: 10, color1: "#bae6fd", color2: "#7dd3fc", textColor: "#0284c7" },
  { label: "Audio Visual", value: 20, color1: "#93c5fd", color2: "#60a5fa", textColor: "#2563eb" },
  { label: "Observing", value: 50, color1: "#86efac", color2: "#4ade80", textColor: "#16a34a" },
  { label: "Discussion", value: 70, color1: "#2dd4bf", color2: "#14b8a6", textColor: "#0d9488" },
  { label: "Hands On", value: 90, color1: "#fdba74", color2: "#f97316", textColor: "#c2410c" },
];

function PremiumChart({ animate }: { animate: boolean }) {
  // Use horizontal layout for a more modern data-viz feel
  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col gap-4 mt-8">
      {retentionData.map((d, i) => (
        <div key={d.label} className="relative w-full flex items-center group">
          {/* Label */}
          <div className="w-24 md:w-32 flex-shrink-0 text-right pr-4">
            <span className="text-xs md:text-sm font-semibold text-gray-700 block line-clamp-1">{d.label}</span>
          </div>

          {/* Track and Bar */}
          <div className="flex-1 relative h-6 md:h-8 rounded-full bg-gray-100 overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={animate ? { width: `${d.value}%` } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${d.color1} 0%, ${d.color2} 100%)`,
                boxShadow: `0 2px 10px ${d.color2}55`
              }}
            />
          </div>

          {/* Percentage Value */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={animate ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
            className="w-12 md:w-16 flex-shrink-0 pl-3 md:pl-4"
          >
            <span className="text-xs md:text-sm font-bold" style={{ color: d.textColor }}>
              {d.value}%
            </span>
          </motion.div>
        </div>
      ))}

      {/* Axis Line */}
      <div className="absolute left-[6rem] md:left-[8rem] top-0 bottom-0 w-px bg-gray-200" />
    </div>
  );
}


/* ──────────────────────────────────────────
   Main Component
   ────────────────────────────────────────── */
export default function WhatIsStemSection() {
  const stemRef = useRef(null);
  const benefitRef = useRef(null);
  const isStemInView = useInView(stemRef, { once: true, amount: 0.2 });
  const isBenefitInView = useInView(benefitRef, { once: true, amount: 0.15 });

  const benefits = [
    {
      title: "Enhanced Understanding",
      text: "Hands-on learning helps students understand abstract concepts by allowing them to manipulate objects and materials.",
    },
    {
      title: "Increased Motivation",
      text: "This approach stimulates curiosity and intrinsic motivation, making learning enjoyable and meaningful.",
    },
    {
      title: "Critical Skills Development",
      text: "It fosters problem-solving, critical thinking, decision-making, and collaboration skills.",
    },
    {
      title: "Knowledge Application",
      text: "Hands-on learning bridges the gap between theoretical knowledge and practical real-world application.",
    },
  ];

  return (
    <>
      {/* ═══════════════════════════════════
          SECTION 1: What is STEM? - Sleek overlapping design
          ═══════════════════════════════════ */}
      <section ref={stemRef} className="relative py-16 lg:py-24 px-4 overflow-hidden bg-white">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-50 to-transparent rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Text Content - Clean, modern typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isStemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 mb-6">
                <span className="text-xs font-bold text-orange-700 uppercase tracking-widest">Introduction</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
                The Foundation of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                  Modern Education
                </span>
              </h2>
              
              <div className="space-y-6 mt-10">
                <div className="pl-6 border-l-4 border-orange-500">
                  <span className="block text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-400 mb-3">
                    What is STEM?
                  </span>
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium">
                    It stands for Science, Technology, Engineering, and Mathematics. 
                    But beyond the acronym, it is a revolutionary interdisciplinary approach to learning.
                  </p>
                </div>
                <p className="text-gray-500 text-lg leading-relaxed pl-6">
                  STEM education integrates these four critical disciplines, replacing isolated subject teaching with project-based, experiential learning. It emphasizes critical thinking, robust problem-solving, and practical application to prepare students for the complex, technology-driven careers of the future.
                </p>
              </div>
            </motion.div>

            {/* Right: Premium Image Presentation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={isStemInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full mx-auto">
                <Image
                  src="/images/stem-education-banner.png"
                  alt="STEM - Science, Technology, Engineering, Mathematics Collaboration"
                  fill
                  className="object-contain drop-shadow-xl z-10 relative"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          SECTION 2: Benefit of STEM Education 
          ═══════════════════════════════════ */}
      <section ref={benefitRef} className="py-20 lg:py-28 px-4 bg-gray-900 text-white relative overflow-hidden">
        {/* Dark theme premium background with subtle glow */}
        <div className="absolute inset-0 bg-[url('/images/ui/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

        <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10 w-full">
          
          <div className="text-center w-full mx-auto mb-16 lg:mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-white"
            >
              The Science of <span className="text-teal-400">Retention</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isBenefitInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-gray-300 text-lg md:text-xl"
            >
              Research consistently demonstrates that hands-on, experiential learning drastically outperforms traditional lecture-based pedagogies.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: The Premium Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isBenefitInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl relative"
            >
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-teal-500/30 blur-2xl rounded-full" />
              <h3 className="text-xl font-bold text-white mb-2 text-center">Learning Retention Rates</h3>
              <p className="text-sm text-gray-400 text-center mb-8">Comparison of instructional methodologies</p>
              
              <div className="bg-white rounded-xl p-4 md:p-6 shadow-inner">
                <PremiumChart animate={isBenefitInView} />
              </div>
            </motion.div>

            {/* Right: The Core Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBenefitInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + (i * 0.1), duration: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute -left-4 top-0 w-1 h-0 bg-teal-500 transition-all duration-300 group-hover:h-full rounded-full" />
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-teal-400 font-bold text-sm border border-white/5">
                      0{i + 1}
                    </div>
                    <h4 className="text-lg font-bold text-white leading-tight">{b.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed pl-11">
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
