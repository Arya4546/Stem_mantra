"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaRobot,
  FaFlask,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";
import {
  GraduationCap,
  Building2,
  Globe,
  Users,
  ArrowRight,
  Sparkles,
  Cpu,
  Wrench,
  BookOpen,
  Zap,
  Award,
  Target,
  Lightbulb
} from "lucide-react";

const programs = [
  {
    id: "atl-labs",
    title: "ATL Labs",
    subtitle: "Atal Tinkering Labs",
    description:
      "Comprehensive end-to-end assistance in establishing and running Atal Tinkering Labs in schools as per NITI Aayog guidelines. Complete setup, teacher training, and year-long support for fostering innovation and creativity.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    features: [
      "Complete lab setup as per NITI Aayog guidelines",
      "Teacher training & certification programs",
      "NEP 2020 aligned curriculum",
      "Year-round mentorship and support",
      "Competition preparation",
      "3D printing & electronics equipment",
    ],
    href: "/programs/atl-labs",
    icon: FaFlask,
  },
  {
    id: "robotics-lab",
    title: "Robotics & AI Lab",
    subtitle: "Future Technology Education",
    description:
      "State-of-the-art robotics and AI labs with hands-on learning experiences. Build, program, and innovate with cutting-edge technology including Arduino, Raspberry Pi, and advanced robotics platforms.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
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
  },
  {
    id: "stem-lab",
    title: "STEM Innovation Lab",
    subtitle: "Integrated STEM Learning",
    description:
      "Holistic STEM education combining science, technology, engineering, and mathematics through project-based learning and real-world applications. Develop critical thinking and problem-solving skills.",
    image: "https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?w=800&q=80",
    color: "from-orange-500 to-teal-500",
    bgColor: "bg-gradient-to-r from-orange-50 to-teal-50",
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
  },
];

const stats = [
  { value: "500+", label: "Schools Partnered", icon: Building2 },
  { value: "50,000+", label: "Students Trained", icon: GraduationCap },
  { value: "15+", label: "States Covered", icon: Globe },
  { value: "200+", label: "Expert Trainers", icon: Users },
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
      <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-floatSlow"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          {/* Floating Icons - subtle, everywhere */}
          <motion.div
            className="absolute top-32 left-[15%] text-white/20 hidden md:block"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Cpu className="w-14 h-14" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-[20%] text-white/20 hidden md:block"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <FaRobot className="w-12 h-12" />
          </motion.div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <GraduationCap className="w-4 h-4" />
                NEP 2020 Aligned Programs
              </motion.span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                  Programs
                </span>
              </h1>
              <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Transforming education through innovative STEM programs that prepare
                students for the future. From ATL Labs to advanced Robotics & AI, we provide
                comprehensive solutions for schools across India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative -mt-10 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-teal-600">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Programs Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-semibold text-orange-700 mb-4">
              <Sparkles className="w-4 h-4" />
              Choose Your Program
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive STEM <span className="text-orange-500">Solutions</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Select from our range of comprehensive STEM education programs
              designed to foster innovation and creativity.
            </p>
          </motion.div>

          <div className="space-y-20">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 lg:gap-16 items-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <motion.div
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-30`} />
                    <div className="absolute top-6 left-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center text-white shadow-lg`}>
                        <program.icon className="w-7 h-7" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <span className={`inline-block text-sm font-medium px-3 py-1 rounded-full mb-3 ${program.bgColor} ${index === 0 ? 'text-orange-700' : index === 1 ? 'text-teal-700' : 'text-orange-700'}`}>
                    {program.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    {program.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    {program.description}
                  </p>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FaCheckCircle className={`w-5 h-5 flex-shrink-0 ${index === 0 ? 'text-orange-500' : index === 1 ? 'text-teal-500' : 'text-orange-500'}`} />
                        <span className="text-slate-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={program.href}
                    className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${program.color} text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-sm font-semibold text-teal-700 mb-4">
                <Zap className="w-4 h-4" />
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                How We <span className="text-teal-500">Work</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Our streamlined process ensures smooth implementation from consultation to ongoing support
              </p>
            </motion.div>

            <div className="grid md:grid-cols-5 gap-6">
              {processSteps.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-300 to-teal-300" />
                  )}
                  <motion.div
                    className={`relative w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${index % 2 === 0 ? 'from-orange-500 to-orange-600' : 'from-teal-500 to-teal-600'} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <item.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <span className="text-xs font-bold text-gray-400 mb-1 block">{item.step}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"></div>
          </div>

          <motion.div
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of schools that have already partnered with STEMmantra
              to bring world-class STEM education to their students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Get Started Today
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
