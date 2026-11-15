"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaLightbulb, FaTools, FaCog, FaChevronDown, FaQuoteLeft } from "react-icons/fa";
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

  // Open the first framework by default only when the screen is tall enough to fit it
  useEffect(() => {
    if (window.innerHeight >= 760) setOpenStates({ cbl: true });
  }, []);

  const toggleCard = (id: string) => {
    setOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {/* ── Frame 1: introduction ── */}
      <section ref={ref} className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
        <FloatingAnimations variant="default" density="low" />

        <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-12 fit-gap gap-10 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 relative overflow-hidden rounded-3xl bg-white/75 backdrop-blur-sm border border-gray-100 shadow-lg p-8 md:p-10 fit-pad flex flex-col justify-center"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 via-orange-400 to-teal-500" />
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />
              <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
                Pioneering the Future of <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
                  Experiential Learning in India
                </span>
              </h2>
              <div className="w-20 h-1.5 bg-orange-500 rounded-full mb-6 fit-mb" />

              <div className="fit-stack space-y-5 text-gray-600 text-base md:text-lg fit-lead leading-relaxed">
                <p>
                  STEMmantra is universally recognised as the premier educational lab partner across India.
                  We specialise in the holistic development and deployment of advanced <strong className="text-gray-900 border-b-2 border-orange-200">Robotics, Artificial Intelligence &amp; Coding Labs and STEM/STEAM educational laboratories</strong> within progressive K-12 academic institutions.
                </p>
                <p>
                  Traditional rote learning frameworks are fundamentally incompatible with the demands of the modern algorithmic economy.
                  Our organization was established to bridge this critical deficit through rigorous, outcome-based, and heavily hands-on
                  curricula carefully constructed by industry leader having decade of experience.
                </p>
                <p>
                  From foundational introductory tinkering programs utilising basic electronics circuits to elite-tier competitive robotics
                  geared towards national/International level of curriculum, STEMmantra architects learning continuum that scale precisely
                  with student cognitive development and strict <strong className="text-gray-900 border-b-2 border-orange-200">National Education Policy (NEP 2020) &amp; National Curriculum Framework (NCF 2023)</strong> compliance guidelines.
                </p>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col fit-gap gap-6"
            >
              <div className="relative flex-1 flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 md:p-10 fit-pad text-white shadow-2xl">
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-orange-500/30 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full bg-teal-500/20 blur-3xl" />
                <FaQuoteLeft className="relative w-10 h-10 text-orange-400 mb-6 fit-mb" />
                <p className="relative text-xl md:text-2xl fit-title font-bold leading-snug">
                  &quot;Our aim is to reach <span className="text-orange-400">10 million+ students</span> within the next 3 years, empowering the next generation of innovators.&quot;
                </p>
                <div className="relative mt-8 h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-500 to-teal-400" />
              </div>

              <div className="rounded-3xl bg-white/75 backdrop-blur-sm border border-gray-100 shadow-lg p-6 fit-pad flex flex-wrap gap-2.5">
                {["Robotics", "AI & Coding", "STEM/STEAM", "NEP 2020", "NCF 2023", "K-12 Schools"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-white border border-orange-100 text-sm font-bold text-gray-700 shadow-sm hover:border-orange-300 hover:text-orange-600 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* ── Frame 2: methodology ── */}
      <section className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
        <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
          <div className="mb-8 fit-mb flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 fit-gap text-center lg:text-left items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 mb-3">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Our Methodology</span>
              </div>
              <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                Our Core Methodological <span className="text-orange-500">Philosophy</span>
              </h2>
            </div>
            <p className="fit-lead text-lg text-gray-600 leading-relaxed max-w-2xl">
              A progressive learning journey that transforms students from curious users to confident innovators through three proven frameworks — CBL, PBL, and IBL.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 fit-gap gap-8 lg:gap-12 items-center">
            {/* Methodology Cycle Image — height-limited so it always fits */}
            <div className="lg:col-span-7 rounded-3xl bg-white/70 backdrop-blur-sm border border-gray-100 shadow-xl p-3 md:p-4 fit-py flex justify-center">
              <Image
                src="/images/methodology/imagee4.jpeg"
                alt="STEMmantra Methodology Cycle - CBL, PBL, IBL learning progression from User to Maker to Creator to Innovator"
                width={1049}
                height={822}
                className="w-auto h-auto max-w-full lg:max-h-[calc(100svh_-_19rem)] object-contain rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>

            {/* Three frameworks + CTA */}
            <div className="lg:col-span-5 flex flex-col fit-gap gap-4">
              {methodologyItems.map((item) => {
                const Icon = item.icon;
                const isOpen = openStates[item.id];
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border ${item.border} bg-white px-4 py-3 fit-py shadow-sm ${item.shadow} ${item.hoverBorder} hover:shadow-lg transition-all cursor-pointer group`}
                    onClick={() => toggleCard(item.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className={`flex-1 text-lg fit-title font-black ${item.color} leading-tight`}>
                        {item.title}
                      </h4>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={`${item.color} opacity-50`}>
                        <FaChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className={`mt-2 text-gray-600 leading-relaxed text-sm fit-lead border-t ${item.border} pt-3`}>
                            {item.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <Link
                href="/contact"
                className="fit-btn group inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#f97316] text-white text-base font-bold rounded-xl hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-orange-500/25"
              >
                Connect with our Academic Directors <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
