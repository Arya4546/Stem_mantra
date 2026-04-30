"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaCheckCircle, FaGraduationCap, FaClock,
  FaArrowLeft, FaStar, FaRocket, FaLightbulb, FaPhone, FaArrowRight, FaBolt
} from "react-icons/fa";
import ExecutionModeSection from "@/components/sections/ExecutionModeSection";

interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  image?: string;
  thumbnail?: string;
  duration?: string;
  gradeLevel?: string;
  features?: string[];
  learningOutcomes?: string[];
  prerequisites?: string[];
  curriculum?: string[];
  isFeatured?: boolean;
}

interface Props {
  program: Program;
}

export default function ProgramDetail({ program }: Props) {
  const typeData: Record<string, { label: string; accent: string; bg: string }> = {
    ATL_LAB: { label: "Atal Tinkering Lab", accent: "text-amber-600", bg: "bg-amber-50" },
    ROBOTICS_LAB: { label: "Robotics & AI Lab", accent: "text-blue-600", bg: "bg-blue-50" },
    STEM_LAB: { label: "STEM Innovation Lab", accent: "text-green-600", bg: "bg-green-50" },
    AI_ML: { label: "AI & Machine Learning", accent: "text-purple-600", bg: "bg-purple-50" },
    IOT: { label: "Internet of Things", accent: "text-cyan-600", bg: "bg-cyan-50" },
    CODING: { label: "Coding & Software", accent: "text-rose-600", bg: "bg-rose-50" },
  };

  const type = typeData[program.type] || { label: program.type, accent: "text-gray-600", bg: "bg-gray-50" };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <Link href="/programs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 mb-8 transition-colors">
              <FaArrowLeft className="w-3 h-3" /> Back to All Programs
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                      <FaStar className="w-3 h-3" /> Featured Program
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${type.bg} ${type.accent} rounded-full text-xs font-bold`}>
                    {type.label}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {program.name}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm">
                    Enroll Now
                  </Link>
                  <Link href="/contact" className="px-8 py-4 border border-gray-200 text-gray-900 font-bold rounded-xl hover:border-orange-500 transition-colors">
                    Request Demo
                  </Link>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full">
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                  <Image
                    src={program.thumbnail || program.image || "/images/programs/placeholder.jpg"}
                    alt={program.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-10 blur-2xl opacity-60" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Info Strip */}
        <section className="py-8 border-y border-gray-100 bg-gray-50/20 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto max-w-4xl">
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shadow-inner">
                  <FaClock className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-black">Duration</span>
                  <span className="text-lg font-bold text-gray-900">{program.duration}</span>
                </div>
              </div>
              <div className="w-px h-10 bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shadow-inner">
                  <FaGraduationCap className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-black">Grade Level</span>
                  <span className="text-lg font-bold text-gray-900">{program.gradeLevel}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Outcomes */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <FaRocket className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Program Features</h2>
                </div>
                <ul className="space-y-4">
                  {program.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                    <FaLightbulb className="w-6 h-6 text-teal-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Learning Outcomes</h2>
                </div>
                <ul className="space-y-4">
                  {program.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600 font-medium">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50/50 relative overflow-hidden">
          <div className="w-full mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-black uppercase tracking-widest mb-4">
                Curriculum
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">Course Modules</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                A carefully structured pathway designed to take students from fundamental concepts to advanced mastery through hands-on projects.
              </p>
              <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-8 rounded-full" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {program.curriculum?.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:border-orange-200 transition-all duration-300 shadow-sm hover:shadow-xl group relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FaBolt className="w-16 h-16 text-orange-500 rotate-12" />
                   </div>
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 border border-orange-100/50 group-hover:bg-orange-500 transition-colors duration-300">
                    <span className="text-xl font-black text-orange-600 group-hover:text-white">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ExecutionModeSection />

        {/* CTA */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden w-full">
              <div className="relative z-10 w-full">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-gray-400 text-lg mb-10 w-full">
                  Enroll your child or partner with us to bring this program to your school.
                  Our experts are ready to guide you.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg w-full sm:w-auto">
                    Register Now
                  </Link>
                  <a href="tel:+916356631515" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
                    <FaPhone className="w-4 h-4" /> 
                    <span>+91 6356631515</span>
                  </a>
                  <a href="tel:01203101774" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
                    <FaPhone className="w-4 h-4" /> 
                    <span>0120-3101774</span>
                  </a>
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
