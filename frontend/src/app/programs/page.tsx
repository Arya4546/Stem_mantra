"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaRobot, FaFlask, FaBrain, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { GraduationCap, Building2, Globe, Users, ArrowRight, Target, Lightbulb, Wrench, BookOpen, Zap } from "lucide-react";

const programs = [
  {
    id: "atl-labs",
    title: "ATL Labs",
    subtitle: "Atal Tinkering Labs",
    description:
      "Comprehensive end-to-end assistance in establishing and running Atal Tinkering Labs in schools as per NITI Aayog guidelines. Complete setup, teacher training, and year-long support for fostering innovation and creativity.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    features: [
      "Complete lab setup as per NITI Aayog guidelines",
      "Teacher training & certification programs",
      "NEP 2020 & NCF 2023 aligned curriculum",
      "Year-round mentorship and support",
      "Competition preparation",
      "3D printing & electronics equipment",
    ],
    href: "/programs/atl-labs",
    icon: FaFlask,
    accent: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    checkColor: "text-blue-500",
  },
  {
    id: "robotics-lab",
    title: "Robotics & AI Lab",
    subtitle: "Future Technology Education",
    description:
      "State-of-the-art robotics and AI labs with hands-on learning experiences. Build, program, and innovate with cutting-edge technology including Arduino, Raspberry Pi, and advanced robotics platforms.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    features: [
      "Advanced robotics kits & platforms",
      "AI & Machine Learning modules",
      "IoT and automation systems",
      "Competition preparation & mentorship",
      "Industry expert guidance",
      "Certification programs",
    ],
    href: "/programs/robotics-lab",
    icon: FaRobot,
    accent: "border-l-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    checkColor: "text-orange-500",
  },
  {
    id: "stem-lab",
    title: "STEM Innovation Lab",
    subtitle: "Integrated STEM Learning",
    description:
      "Holistic STEM education combining science, technology, engineering, and mathematics through project-based learning and real-world applications. Develop critical thinking and problem-solving skills.",
    image: "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=800&q=80",
    features: [
      "Integrated STEM curriculum",
      "Hands-on experiments & projects",
      "3D design and printing",
      "Research methodology training",
      "Science fair preparation",
      "Cross-disciplinary learning",
    ],
    href: "/programs/stem-lab",
    icon: FaBrain,
    accent: "border-l-teal-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    checkColor: "text-teal-500",
  },
];

const stats = [
  { value: "300+", label: "Schools Partnered", icon: Building2, color: "text-orange-500" },
  { value: "1.25L+", label: "Students Trained", icon: GraduationCap, color: "text-teal-500" },
  { value: "18+", label: "States Covered", icon: Globe, color: "text-blue-500" },
  { value: "200+", label: "Expert Trainers", icon: Users, color: "text-purple-500" },
];

const processSteps = [
  { step: "01", title: "Consultation", desc: "Understand your school's needs and goals", icon: Target },
  { step: "02", title: "Design", desc: "Customized lab layout and equipment selection", icon: Lightbulb },
  { step: "03", title: "Setup", desc: "Professional installation and configuration", icon: Wrench },
  { step: "04", title: "Training", desc: "Comprehensive teacher training programs", icon: BookOpen },
  { step: "05", title: "Support", desc: "Ongoing mentorship and technical assistance", icon: Zap },
];

export default function ProgramsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero — Left aligned, white bg */}
        <section className="pt-32 pb-10 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                NEP 2020 & NCF 2023 Aligned Programs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our{" "}
                <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                  Programs
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                Transforming education through innovative STEM programs that prepare
                students for the future. From ATL Labs to advanced Robotics & AI.
              </p>
            </motion.div>

            {/* Stats — Inline strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap items-center gap-8 mt-8 pt-6 border-t border-gray-100"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Programs — Alternating layout with accent borders */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-12 items-center`}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${program.iconBg} rounded-lg flex items-center justify-center`}>
                      <program.icon className={`w-5 h-5 ${program.iconColor}`} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 font-medium">{program.subtitle}</span>
                      <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-5">{program.description}</p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <FaCheckCircle className={`w-4 h-4 flex-shrink-0 ${program.checkColor}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={program.href}
                    className={`inline-flex items-center gap-2 ${program.iconColor} font-semibold text-sm hover:underline group`}
                  >
                    Learn More
                    <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process — Horizontal step bar */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-3">
                Our Process
              </span>
              <h2 className="text-3xl font-bold text-gray-900">
                How We <span className="text-teal-500">Work</span>
              </h2>
            </div>

            {/* Steps as horizontal bar on desktop, stacked on mobile */}
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gray-300" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {processSteps.map((item, index) => (
                  <motion.div
                    key={index}
                    className="relative text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center relative z-10">
                      <span className="text-sm font-bold text-gray-900">{item.step}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA — Contained card */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-3">
                Ready to Transform <span className="text-orange-400">Your School?</span>
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Join hundreds of schools that have already partnered with STEMmantra
                for world-class STEM education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Get Started Today
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
