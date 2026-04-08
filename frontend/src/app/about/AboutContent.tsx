"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
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

const stats = [
  { number: "1,50,000+", label: "Students Trained", icon: FaGraduationCap, color: "text-orange-500" },
  { number: "500+", label: "Schools Partnered", icon: FaSchool, color: "text-teal-500" },
  { number: "18+", label: "States Covered", icon: FaGlobeAsia, color: "text-blue-500" },
  { number: "20+", label: "Expert Trainers", icon: FaChalkboardTeacher, color: "text-purple-500" },
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
  { icon: FaRobot, title: "Robotics Labs - STEAMVERSE Lab", description: "Complete turnkey robotics lab solutions designed to build computational thinking. Includes premium hardware kits, structured age-appropriate curriculum, and full teacher training support to ensure successful implementation." },
  { icon: FaBrain, title: "AI-ML & Coding Labs", description: "Cutting-edge artificial intelligence and machine learning labs to prepare future-ready students. We provide specialized software environments and hardware to teach real-world automation, data analysis, and advanced coding." },
  { icon: FaCogs, title: "STEM Labs - INNOVERSE Labs", description: "Integrated Science, Technology, Engineering, and Mathematics laboratories for holistic, interactive learning. These spaces combine IoT, Electronics, DIY projects, and 3D printing to encourage collaborative cross-disciplinary student projects." },
  { icon: FaLightbulb, title: "ATL Labs", description: "Comprehensive Atal Tinkering Lab setup strictly adhering to NITI Aayog's guidelines. We provide specialized 3D printing tools, advanced mentorship, competition preparation, and continuous year-round support to foster innovation." },
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
        {/* Hero Section — Left aligned, no floating blobs */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
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
              <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
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
        <section ref={missionRef} className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto relative overflow-hidden">
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

        {/* Core Values — 2x2 bento with left accent borders */}
        <section ref={valuesRef} className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              className="mb-10"
            >
              <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-3">
                What Drives Us
              </span>
              <h2 className="text-3xl font-bold text-gray-900">Our Core Values</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.08 }}
                  className={`bg-white rounded-xl p-6 border border-gray-100 border-l-4 ${value.accent} shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 ${value.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <value.icon className={`w-5 h-5 ${value.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services — White bg, alternating list items */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-3">
                Our Solutions
              </span>
              <h2 className="text-3xl font-bold text-gray-900">Complete Lab Solutions</h2>
              <p className="text-gray-600 mt-2">
                End-to-end solutions for setting up world-class STEM, AI, and Robotics labs in schools.
              </p>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`flex items-center gap-5 bg-white rounded-xl p-5 border border-gray-100 shadow-sm ${index % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
                    }`}
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us — Numbered steps instead of checklist */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2">
                <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-3">
                  Why STEMmantra
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  What Makes Us Different
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We don&apos;t just set up labs - we build complete STEM education ecosystems with
                  ongoing support, training, and innovation.
                </p>

                {/* Compact stats */}
                <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
                  {[
                    { value: "100%", label: "Satisfaction", color: "text-orange-500" },
                    { value: "24/7", label: "Support", color: "text-teal-500" },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                      <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 space-y-3">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA — Contained card */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
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
