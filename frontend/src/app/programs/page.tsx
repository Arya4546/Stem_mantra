"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaRobot, FaFlask, FaBrain, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { GraduationCap, Building2, Globe, Users, ArrowRight, Target, Lightbulb, Wrench, BookOpen, Zap } from "lucide-react";
import FloatingAnimations from "@/components/animations/FloatingAnimations";
import ExecutionModeSection from "@/components/sections/ExecutionModeSection";

const programs = [
  {
    id: "pre-tinkering-lab",
    title: "Pre Tinkering Lab",
    subtitle: "Grades 3-5 Foundation",
    description: "Our Pre Tinkering curriculum uniquely focuses on leveraging foundational technology in education for primary grades (3rd to 5th). We believe in introducing young minds to innovation early. Filled with 'learning with fun' activities, this program transforms basic curiosity into actual tactile creation by incorporating introductory electronics, simple mechanical engineering play, and nature exploration kits.",
    image: "/images/stem-education-banner.png",
    features: [
      "Building blocks",
      "Puzzles and arts",
      "Simple machines",
      "Basic electronic concepts",
      "Nature exploration tools"
    ],
    href: "/programs/pre-tinkering-lab",
    icon: Wrench,
    accent: "border-l-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    checkColor: "text-orange-500",
  },
  {
    id: "steamverse-lab",
    title: "STEAMVERSE Lab",
    subtitle: "Robotics & STEM Setup",
    description: "An incredibly exciting and comprehensive ecosystem covering STEM, advanced Robotics, and dynamic IoT activities tailored for grades 3-12. This flagship program fosters deep hands-on learning outside traditional boundaries. We push students to explore structural engineering, complex circuitry, 3-D Printing architectures, and autonomous drone coding to become tomorrow's innovators.",
    image: "/images/kits/robotics-car-kit.png",
    features: [
      "5+ Micro-controllers & 40+ Sensors",
      "10+ DIY Kits",
      "3D Printing",
      "Drone technology",
      "IoT applications"
    ],
    href: "/programs/steamverse-lab",
    icon: Zap,
    accent: "border-l-teal-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    checkColor: "text-teal-500",
  },
  {
    id: "ai-coding-lab",
    title: "AI & Coding Lab",
    subtitle: "Python, AI & Computer Vision",
    description: "Take your students beyond standard academics with our highly technical coding program. We comprehensively teach the concepts of Python programming, Machine Learning, computational logic, Artificial Intelligence, and Computer Vision for grades 5-12. Utilizing state-of-the-art software, students will design their own software loops and visual processing logic.",
    image: "/images/ai-ml-kids.png",
    features: [
      "Python programming",
      "Machine learning basics",
      "Computer vision",
      "State of the art AI software",
      "Real-world problem solving"
    ],
    href: "/programs/ai-coding-lab",
    icon: FaBrain,
    accent: "border-l-blue-500",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    checkColor: "text-blue-500",
  },
  {
    id: "innoverse-lab",
    title: "INNOVERSE Lab",
    subtitle: "One-stop IoT & Tech solution",
    description: "The ultimate hands-on, one-stop technological solution for a modern institution. INNOVERSE is designed to fulfill all of a school's digital and experimental needs. With a highly progressive curriculum that adapts to individualized learning paths, it seamlessly caters to diverse skill levels across grades 3-12, encouraging continuous exploration, rapid skill development, and design thinking.",
    image: "/images/student-robotics.png",
    features: [
      "One stop IoT & Tech solution",
      "Progressive curriculum",
      "Individualized learning path",
      "Diverse skill level support",
      "Design thinking methodology"
    ],
    href: "/programs/innoverse-lab",
    icon: Target,
    accent: "border-l-purple-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    checkColor: "text-purple-500",
  },
  {
    id: "atl-lab",
    title: "ATL Lab",
    subtitle: "Atal Tinkering Labs",
    description: "A comprehensive end-to-end framework for establishing and maintaining Atal Tinkering Labs (ATL) strictly aligned with NITI Aayog guidelines. From initial equipment procurement to intense teacher training, and ongoing student mentorship for national innovation challenges, we handle everything. Ensure your institution is fully AIM compliant and consistently competitive.",
    image: "/images/gallery/session-1.png",
    features: [
      "AIM strict compliance",
      "End to end equipment setup",
      "Teacher & Student training",
      "Competition readiness prep",
      "Robotics, IoT & 3D printing equipment"
    ],
    href: "/programs/atl-lab",
    icon: FaFlask,
    accent: "border-l-indigo-500",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    checkColor: "text-indigo-500",
  }
];

const stats = [
  { value: "300+", label: "Schools Partnered", icon: Building2, color: "text-orange-500" },
  { value: "1,50,000+", label: "Students Trained", icon: GraduationCap, color: "text-teal-500" },
  { value: "18+", label: "States Covered", icon: Globe, color: "text-blue-500" },
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
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                NEP 2020 & NCF 2023 Aligned Programs
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                Our{" "}
                <span className="text-orange-500 underline decoration-orange-200 underline-offset-[12px]">
                  Programs
                </span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Transforming education through innovative STEM/STEAM programs that prepare
                students for the future. From ATL Labs to advanced Robotics & AI, we provide comprehensive solutions for schools across India.
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
        <section className="relative py-12 px-4 overflow-hidden">
          <FloatingAnimations variant="section" density="low" />
          <div className="mx-auto px-4 md:px-8 lg:px-16 space-y-16 relative z-10">
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
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50/50 border border-gray-100 shadow-sm">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-contain p-2"
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
          <div className="mx-auto px-4 md:px-8 lg:px-16">
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

        {/* Mode of Execution — Branded Section */}
        <ExecutionModeSection />

        {/* CTA — Contained card */}
        <section className="py-12 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
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
