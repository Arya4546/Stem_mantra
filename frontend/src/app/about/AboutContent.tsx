"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaGraduationCap,
  FaRobot,
  FaLightbulb,
  FaUsers,
  FaAward,
  FaSchool,
  FaHandshake,
  FaChalkboardTeacher,
  FaGlobeAsia,
  FaCheckCircle,
  FaArrowRight,
  FaCogs,
  FaBrain,
} from "react-icons/fa";
import { Target, Eye } from "lucide-react";
import FloatingAnimations from "@/components/animations/FloatingAnimations";
import DirectorSection from "@/components/sections/DirectorSection";
import WhatIsStemSection from "@/components/sections/WhatIsStemSection";
import ExecutionModeSection from "@/components/sections/ExecutionModeSection";
import PlatformsSection from "@/components/sections/PlatformsSection";

const stats = [
  { number: "1,50,000+", label: "Students Trained", icon: FaGraduationCap, color: "text-orange-500" },
  { number: "300+", label: "Schools Partnered", icon: FaSchool, color: "text-teal-500" },
  { number: "16+", label: "States Covered", icon: FaGlobeAsia, color: "text-blue-500" },
];

const coreValues = [
  {
    icon: FaLightbulb,
    title: "Innovation First",
    description: "We believe in pushing boundaries and embracing cutting-edge technologies to shape the future of education.",
    accent: "border-l-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    icon: FaUsers,
    title: "Student-Centric",
    description: "Every program is designed with students at the center, ensuring engaging, accessible, and impactful learning experiences.",
    accent: "border-l-teal-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    icon: FaHandshake,
    title: "Collaborative Growth",
    description: "We partner with schools, educators, NGO's and communities to create sustainable STEM education ecosystems.",
    accent: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: FaAward,
    title: "Excellence in Delivery",
    description: "Our commitment to quality ensures every workshop, lab setup, and training program meets the highest standards.",
    accent: "border-l-purple-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const services = [
  { 
    icon: FaRobot, 
    title: "STEAM & Robotics Lab", 
    href: "/programs/steamverse-lab",
    image: "/images/labs/web/steamverse-lab.jpg",
    accent: "orange",
    description: "Complete turnkey robotics lab solutions with premium kits, structured Class 3–12 curriculum, and full teacher certification to build computational thinking from the ground up." 
  },
  { 
    icon: FaCogs, 
    title: "Composite Skill Lab", 
    href: "/programs/composite-skill-lab",
    image: "/images/labs/web/composite-skill-lab.jpg",
    accent: "amber",
    description: "A multidisciplinary practical learning environment for Grades 6–12, combining technology, engineering, design, making and hands-on skill development." 
  },
  { 
    icon: FaBrain, 
    title: "AI & Coding Lab", 
    href: "/programs/ai-coding-lab",
    image: "/images/labs/web/ai-coding-lab.jpg",
    accent: "blue",
    description: "Cutting-edge AI and coding labs equipped with specialized software environments (Python, Scratch) and dedicated hardware for computer vision and machine learning experiments." 
  },
  { 
    icon: FaGraduationCap, 
    title: "Pre-Tinkering Lab", 
    href: "/programs/pre-tinkering-lab",
    image: "/images/labs/web/pre-tinkering-lab.jpg",
    accent: "rose",
    description: "Grades 3-5 foundation learning designed to introduce young minds to STEM basics through play and exploration. We focus on spatial reasoning and motor skills using age-appropriate kits." 
  },
  { 
    icon: FaCogs, 
    title: "Innoverse Lab", 
    href: "/programs/innoverse-lab",
    image: "/images/labs/web/innoverse-lab.jpg",
    accent: "purple",
    description: "Integrated STEM laboratories for holistic, project-based learning. Combines IoT sensors, 3D printing stations, and prototyping tools for cross-disciplinary innovation." 
  },
  { 
    icon: FaLightbulb, 
    title: "Atal Tinkering Lab", 
    href: "/programs/atal-tinkering-lab",
    image: "/images/labs/web/atal-tinkering-lab.jpg",
    accent: "indigo",
    description: "Comprehensive Atal Tinkering Lab setup adhering to NITI Aayog standards, including equipment procurement, mentor training, and contest preparation." 
  },
];

const whyChooseUs = [
  "NEP 2020 & NCF 2023 aligned curriculum designed by experts",
  "Complete turnkey lab solutions",
  "Certified and experienced trainers",
  "Continuous support and maintenance",
  "National & International Competition preparation",
  "Industry partnerships and certifications",
];

const accentMap: Record<string, { bar: string; text: string; ring: string; chip: string }> = {
  orange: { bar: "bg-orange-500", text: "text-orange-600", ring: "ring-orange-300", chip: "bg-orange-500" },
  amber: { bar: "bg-amber-500", text: "text-amber-600", ring: "ring-amber-300", chip: "bg-amber-500" },
  blue: { bar: "bg-blue-500", text: "text-blue-600", ring: "ring-blue-300", chip: "bg-blue-500" },
  rose: { bar: "bg-rose-500", text: "text-rose-600", ring: "ring-rose-300", chip: "bg-rose-500" },
  purple: { bar: "bg-purple-500", text: "text-purple-600", ring: "ring-purple-300", chip: "bg-purple-500" },
  indigo: { bar: "bg-indigo-500", text: "text-indigo-600", ring: "ring-indigo-300", chip: "bg-indigo-500" },
};

function LabShowcase() {
  const [active, setActive] = useState(0);
  const current = services[active];
  const t = accentMap[current.accent];

  return (
    <section className="fit relative py-10 lg:py-12 px-4 bg-transparent">
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 w-full">
        <div className="mb-8 fit-mb flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 fit-gap text-center lg:text-left items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-3">
              Our Solutions
            </span>
            <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Complete Lab Solutions</h2>
          </div>
          <p className="fit-lead text-gray-600 text-lg max-w-2xl">
            End-to-end solutions for setting up world-class STEM, AI, and Robotics labs in schools, strictly aligned with NEP 2020 guidelines.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 fit-gap items-stretch">
          {/* Lab selector */}
          <ul className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0" role="tablist" aria-label="Lab solutions">
            {services.map((sv, i) => {
              const a = accentMap[sv.accent];
              const isActive = i === active;
              return (
                <li key={sv.title} className="shrink-0 lg:shrink lg:flex-1">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={`relative w-full h-full flex items-center gap-3 text-left rounded-2xl px-4 py-3 fit-py transition-all duration-300 border ${
                      isActive ? "bg-white shadow-lg border-white translate-x-1" : "bg-white/50 border-transparent hover:bg-white/80"
                    }`}
                  >
                    <span className={`absolute left-0 top-3 bottom-3 w-1 rounded-full ${a.bar} transition-transform duration-300 ${isActive ? "scale-y-100" : "scale-y-0"}`} />
                    <span className={`fit-icon w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${isActive ? `${a.bar} text-white` : "bg-white text-gray-500"}`}>
                      <sv.icon className="w-1/2 h-1/2" />
                    </span>
                    <span className={`fit-title text-base lg:text-lg font-bold leading-tight ${isActive ? "text-gray-900" : "text-gray-600"}`}>{sv.title}</span>
                    <span className={`ml-auto text-sm font-black tabular-nums hidden sm:block ${isActive ? a.text : "text-gray-300"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Detail with lab photo */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 min-h-[320px] lg:min-h-[clamp(20rem,58vh,34rem)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={`${current.title} in a school – STEM and robotics lab setup by STEMmantra`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/10" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 fit-pad text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-2xl"
                >
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-3 ${t.chip}`}>
                    Solution {String(active + 1).padStart(2, "0")}
                  </span>
                  <h3 className="fit-h2 text-2xl md:text-3xl font-black mb-2 tracking-tight">{current.title}</h3>
                  <p className="fit-lead text-gray-200 leading-relaxed mb-4 fit-mb">{current.description}</p>
                  <Link
                    href={current.href}
                    className="fit-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-orange-500 hover:text-white transition-colors group/btn"
                  >
                    Explore Solution
                    <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const seoKeywords = [
  "STEM Lab Setup for Schools",
  "Robotics & AI Education",
  "Atal Tinkering Lab (ATL)",
  "NEP 2020 Aligned Curriculum",
  "Coding for Kids",
];

export default function AboutContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pt-[5.5rem]">

        {/* ── Frame 1: who we are · mission · vision ── */}
        <section className="fit relative py-10 lg:py-12 px-4 overflow-hidden">
          <FloatingAnimations variant="section" density="low" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
            className="absolute -left-40 -bottom-40 text-orange-300/20 pointer-events-none"
            aria-hidden
          >
            <svg width="520" height="520" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.32c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" /></svg>
          </motion.div>
          <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 fit-gap items-center">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                  India&apos;s Leading STEM Education Provider
                </span>
                <h1 className="fit-hero-b text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-5 tracking-tight leading-[1.02]">
                  About{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                    STEMmantra
                  </span>
                </h1>
                <p className="fit-lead text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">
                  STEMmantra is a leading provider of STEM, Robotics, and AI education solutions,
                  dedicated to fostering curiosity, creativity, and critical thinking in students
                  across India. With a decade of experience, we provide a holistic learning
                  ecosystem for 300+ progressive K-12 institutions.
                </p>

                <div className="flex flex-wrap gap-2 mt-5 fit-mb">
                  {seoKeywords.map((k) => (
                    <span key={k} className="px-3.5 py-1.5 rounded-full bg-white/80 border border-orange-100 text-xs sm:text-sm font-bold text-gray-700 shadow-sm">
                      {k}
                    </span>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="mt-7 fit-mb max-w-2xl grid grid-cols-3 divide-x divide-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm border border-white shadow-lg overflow-hidden"
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-4 sm:px-6 py-4 fit-py">
                      <stat.icon className={`w-5 h-5 mb-2 ${stat.color}`} />
                      <div className={`fit-num text-2xl sm:text-3xl font-black leading-none ${stat.color}`}>{stat.number}</div>
                      <div className="text-xs text-gray-500 mt-1.5 font-semibold">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Mission & Vision */}
              <div className="lg:col-span-5 flex flex-col gap-5 fit-gap">
                {[
                  {
                    Icon: Target, title: "Our Mission", tint: "orange",
                    text: "To democratize STEM education by providing schools with world-class robotics labs, AI-powered learning tools, and trained educators. We aim to nurture curiosity, foster innovation, and prepare students for the challenges of tomorrow.",
                  },
                  {
                    Icon: Eye, title: "Our Vision", tint: "teal",
                    text: "To be India's most trusted partner in STEM education, reaching 100 million students by 2030. We envision a future where every school has access to cutting-edge technology labs and every student has the opportunity to become an innovator.",
                  },
                ].map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                    className={`relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg p-6 md:p-7 fit-pad ${c.tint === "orange" ? "hover:border-orange-200" : "hover:border-teal-200"} transition-colors`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${c.tint === "orange" ? "bg-orange-500" : "bg-teal-500"}`} />
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${c.tint === "orange" ? "bg-orange-50" : "bg-teal-50"}`}>
                        <c.Icon className={`w-5 h-5 ${c.tint === "orange" ? "text-orange-600" : "text-teal-600"}`} />
                      </div>
                      <h2 className="fit-title text-xl font-black text-gray-900">{c.title}</h2>
                    </div>
                    <p className="fit-lead text-gray-600 leading-relaxed">{c.text}</p>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── Frames 2–3: what is STEM/STEAM · benefits ── */}
        <WhatIsStemSection />

        {/* ── Frame 4: director ── */}
        <DirectorSection />

        {/* ── Frame 5: core values — editorial strip, no boxes ── */}
        <section className="fit relative py-10 lg:py-12 px-4">
          <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 w-full">
            <div className="mb-8 fit-mb flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 fit-gap text-center lg:text-left items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-teal-100/80 text-teal-700 rounded-full text-sm font-bold uppercase tracking-wider mb-3">
                  What Drives Us
                </span>
                <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">Our Core Values</h2>
              </div>
              <div className="hidden lg:block h-1.5 w-40 rounded-full bg-gradient-to-r from-orange-500 via-teal-500 to-blue-500 mb-3" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x divide-gray-300/80 border-y border-gray-300/80">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative px-6 py-7 fit-py lg:px-8 hover:bg-white/60 transition-colors duration-300"
                >
                  <span className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-orange-500 to-teal-500" />
                  <div className="flex items-center justify-between mb-4 fit-mb">
                    <div className={`fit-icon w-12 h-12 ${value.iconBg} rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                      <value.icon className={`w-1/2 h-1/2 ${value.iconColor}`} />
                    </div>
                    <span className="fit-num text-5xl font-black leading-none text-transparent [-webkit-text-stroke:1.5px_#9ca3af] group-hover:[-webkit-text-stroke:1.5px_#f97316] transition-all" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="fit-title text-xl font-black text-gray-900 mb-2 tracking-tight">{value.title}</h3>
                  <p className="fit-lead text-gray-600 leading-relaxed text-base">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Frame 6: complete lab solutions — interactive showcase with lab photos ── */}
        <LabShowcase />

        {/* ── Frame 7: why choose us ── */}
        <section className="fit relative py-10 lg:py-12 px-4 bg-transparent overflow-hidden">
          <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 w-full">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 fit-gap items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                  Why STEMmantra
                </span>
                <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 tracking-tight">
                  What Makes Us <span className="text-orange-500">Different</span>
                </h2>
                <p className="fit-lead text-gray-600 text-lg leading-relaxed mb-8 fit-mb">
                  We don&apos;t just set up labs - we build complete STEM education ecosystems with
                  ongoing support, training, and innovation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-8 fit-mb">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheckCircle className="w-3 h-3 text-orange-500" />
                      </div>
                      <span className="fit-lead text-gray-700 text-sm font-medium leading-snug">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-12 pt-6 border-t border-gray-200/70">
                  {[
                    { value: "100%", label: "Satisfaction", color: "text-orange-500" },
                    { value: "24/7", label: "Support", color: "text-teal-500" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className={`fit-num text-3xl font-black ${s.color}`}>{s.value}</div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative flex justify-center"
              >
                <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-3xl -z-10" />
                <div className="relative bg-white rounded-[2rem] p-4 md:p-6 shadow-2xl border border-gray-50 overflow-hidden">
                  <Image
                    src="/images/pdf_pages/image.copy.png"
                    alt="STEMmantra STEM education ecosystem: robotics labs, AI and coding, teacher training and competitions"
                    width={800}
                    height={800}
                    className="w-auto h-auto max-w-full lg:max-h-[calc(100svh_-_12rem)] object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Frame 8: modes of execution ── */}
        <ExecutionModeSection />

        {/* ── Frame 9: LMS + coding platform ── */}
        <PlatformsSection />

        {/* ── Frame 10: call to action ── */}
        <section className="fit relative py-10 lg:py-12 px-4">
          <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 w-full">
            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 fit-pad text-center relative overflow-hidden shadow-2xl">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-orange-500/25 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-teal-500/20 blur-3xl" />
              <div className="relative z-10">
                <h2 className="fit-h2 text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  Ready to Transform <span className="text-orange-400">Your School?</span>
                </h2>
                <p className="fit-lead text-gray-300 mb-8 fit-mb max-w-2xl mx-auto text-lg">
                  Join 300+ schools that have already partnered with STEMmantra to bring
                  world-class STEM education to their students. All programs are strictly
                  aligned with NEP 2020 & NCF 2023 guidelines.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="fit-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 hover:-translate-y-0.5 transition-all shadow-lg shadow-orange-500/30"
                  >
                    Get Started Today
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/programs"
                    className="fit-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/25 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Explore Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
