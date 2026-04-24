"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
    icon: FaGraduationCap, 
    title: "Pre Tinkering Lab", 
    href: "/programs/pre-tinkering-lab",
    description: "Grades 3-5 foundation learning designed to introduce young minds to STEM basics through play and exploration. We focus on spatial reasoning and motor skills using age-appropriate kits." 
  },
  { 
    icon: FaRobot, 
    title: "STEAMVERSE Lab", 
    href: "/programs/steamverse-lab",
    description: "Complete turnkey robotics lab solutions with premium kits, structured Class 3–12 curriculum, and full teacher certification to build computational thinking from the ground up." 
  },
  { 
    icon: FaBrain, 
    title: "AI & Coding Lab", 
    href: "/programs/ai-coding-lab",
    description: "Cutting-edge AI and coding labs equipped with specialized software environments (Python, Scratch) and dedicated hardware for computer vision and machine learning experiments." 
  },
  { 
    icon: FaCogs, 
    title: "INNOVERSE Lab", 
    href: "/programs/innoverse-lab",
    description: "Integrated STEM laboratories for holistic, project-based learning. Combines IoT sensors, 3D printing stations, and prototyping tools for cross-disciplinary innovation." 
  },
  { 
    icon: FaLightbulb, 
    title: "ATL Lab", 
    href: "/programs/atl-lab",
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

export default function AboutContent() {
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true });
  const isValuesInView = useInView(valuesRef, { once: true });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-12 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                India&apos;s Leading STEM Education Provider
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                  STEMmantra
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                STEMmantra is a leading provider of STEM, Robotics, and AI education solutions,
                dedicated to fostering curiosity, creativity, and critical thinking in students
                across India. With a decade of experience, we provide a holistic learning
                ecosystem for 300+ progressive K-12 institutions.
              </p>
            </motion.div>

            {/* Stats — Inline horizontal strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap items-center gap-8 mt-10 pt-6 border-t border-gray-100"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.number}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision — Stacked cards, no gradient blobs */}
        <section ref={missionRef} className="pt-12 pb-6 px-4 bg-gray-50">
          <div className="mx-auto px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <FloatingAnimations variant="section" density="low" />
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-8 border-l-4 border-l-orange-500 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To democratize STEM education by providing schools with world-class robotics labs,
                  AI-powered learning tools, and trained educators. We aim to nurture curiosity,
                  foster innovation, and prepare students for the challenges of tomorrow.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMissionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-8 border-l-4 border-l-teal-500 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-teal-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be India&apos;s most trusted partner in STEM education, reaching 100 million students by 2030. We envision a future where every school has access to cutting-edge technology labs and every student has the opportunity to become an innovator.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What is STEM? + Benefits of STEM Education */}
        <WhatIsStemSection />

        {/* About Director Section */}
        <DirectorSection />

        {/* Core Values — Centered Header & Premium Grid */}
        <section ref={valuesRef} className="pt-20 pb-8 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 bg-teal-100/80 text-teal-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900">Our Core Values</h2>
              <div className="w-20 h-1.5 bg-teal-500 mx-auto mt-6 rounded-full" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-14 h-14 ${value.iconBg} rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform shadow-inner`}>
                    <value.icon className={`w-7 h-7 ${value.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services — Centered Header & Grid Cards */}
        <section className="pt-8 pb-20 px-4 bg-gray-50">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                Our Solutions
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900">Complete Lab Solutions</h2>
              <p className="text-gray-600 mt-6 text-lg">
                End-to-end solutions for setting up world-class STEM, AI, and Robotics labs in schools, strictly aligned with NEP 2020 guidelines.
              </p>
              <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-6 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors duration-300 shadow-inner">
                    <service.icon className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 h-12 flex items-center leading-tight">{service.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>
                  <Link 
                    href={service.href} 
                    className="inline-flex items-center gap-2 text-orange-600 font-bold text-xs group/btn"
                  >
                    Explore Solution
                    <FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us — Visual + Context */}
        <section className="py-20 px-4 bg-white overflow-hidden">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                    Why STEMmantra
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                    What Makes Us <span className="text-orange-500">Different</span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-10">
                    We don&apos;t just set up labs - we build complete STEM education ecosystems with
                    ongoing support, training, and innovation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-12">
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
                        <span className="text-gray-700 text-sm font-medium leading-tight">{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Compact stats */}
                  <div className="flex items-center gap-12 pt-8 border-t border-gray-100">
                    {[
                      { value: "100%", label: "Satisfaction", color: "text-orange-500" },
                      { value: "24/7", label: "Support", color: "text-teal-500" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-3xl -z-10" />
                <div className="relative bg-white rounded-[2.5rem] p-4 md:p-8 shadow-2xl border border-gray-50 overflow-hidden">
                  <Image
                    src="/images/pdf_pages/image.copy.png"
                    alt="STEMmantra Differentiation Ecosystem"
                    width={800}
                    height={800}
                    className="w-full h-auto object-contain"
                  />


                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mode of Execution — Branded Section */}
        <ExecutionModeSection />

        {/* CTA — Contained card */}
        <section className="py-12 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Ready to Transform <span className="text-orange-400">Your School?</span>
                </h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Join 300+ schools that have already partnered with STEMmantra to bring
                  world-class STEM education to their students. All programs are strictly
                  aligned with NEP 2020 & NCF 2023 guidelines.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Get Started Today
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
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
