"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaHandshake,
  FaHeart,
  FaMedal,
  FaAward,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import { 
  Target, 
  Eye, 
  Cpu, 
  Wrench, 
  Users, 
  Trophy, 
  BookOpen, 
  Zap,
  Building2,
  GraduationCap,
  Globe,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Rocket
} from "lucide-react";

const stats = [
  { value: "10,000+", label: "Students Trained", icon: GraduationCap, color: "from-orange-500 to-orange-600" },
  { value: "500+", label: "Schools Partnered", icon: Building2, color: "from-teal-500 to-teal-600" },
  { value: "15+", label: "States Covered", icon: Globe, color: "from-orange-500 to-orange-600" },
  { value: "200+", label: "Expert Trainers", icon: Award, color: "from-teal-500 to-teal-600" },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "We believe in fostering creativity and innovation through hands-on learning experiences that challenge students to think beyond textbooks and create real-world solutions.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Student-Centric Approach",
    description:
      "Every program is designed with students at the center, ensuring they gain practical skills, confidence, and a passion for STEM subjects that lasts a lifetime.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Trophy,
    title: "Excellence in Quality",
    description:
      "We maintain the highest standards in curriculum design, equipment quality, and training delivery to provide world-class STEM education to every school we partner with.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: FaHandshake,
    title: "Partnership Approach",
    description:
      "We work closely with schools, teachers, and parents to create a comprehensive ecosystem for STEM learning that extends beyond the classroom.",
    color: "from-teal-500 to-teal-600",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Foundation & Vision",
    description: "STEM Mantra was founded with a bold vision to transform STEM education across India, starting with our first robotics lab setup.",
    icon: Rocket,
  },
  {
    year: "2019",
    title: "ATL Partnership",
    description: "Successfully partnered with NITI Aayog to setup Atal Tinkering Labs, bringing world-class innovation facilities to schools.",
    icon: Building2,
  },
  {
    year: "2020",
    title: "National Expansion",
    description: "Expanded operations to 10+ states, training over 5,000 students and 500 teachers despite pandemic challenges through hybrid learning.",
    icon: Globe,
  },
  {
    year: "2021",
    title: "Digital Innovation",
    description: "Launched comprehensive online training modules, virtual labs, and remote mentorship programs reaching rural areas.",
    icon: Cpu,
  },
  {
    year: "2022",
    title: "Industry Recognition",
    description: "Received multiple awards for excellence in STEM education delivery, including Best EdTech Initiative recognition.",
    icon: Trophy,
  },
  {
    year: "2023",
    title: "Scaling New Heights",
    description: "Crossed 500+ school partnerships across 15+ states with 10,000+ students trained in robotics, AI, and emerging technologies.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Launched AI & Machine Learning curriculum, 3D printing labs, and competitive robotics programs preparing students for global competitions.",
    icon: Sparkles,
  },
];

const achievements = [
  { icon: FaMedal, title: "Best STEM Education Provider 2023", org: "EdTech India Awards" },
  { icon: FaAward, title: "Excellence in Innovation", org: "NITI Aayog Recognition" },
  { icon: FaStar, title: "Top 10 Robotics Companies", org: "Education World Magazine" },
  { icon: FaShieldAlt, title: "ISO 9001:2015 Certified", org: "Quality Management" },
];

const teamExpertise = [
  { area: "Robotics & AI Specialists", count: "50+" },
  { area: "Curriculum Designers", count: "20+" },
  { area: "Teacher Trainers", count: "100+" },
  { area: "Technical Support Staff", count: "30+" },
];

export default function AboutContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Animated Background Elements */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-floatSlow"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/20 to-teal-100/20 rounded-full blur-3xl animate-floatFast"></div>
          {/* Floating Icons - subtle, everywhere */}
          <motion.div 
            className="absolute top-40 left-[10%] text-orange-500/20 hidden md:block"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Cpu className="w-14 h-14" />
          </motion.div>
          <motion.div 
            className="absolute top-60 right-[15%] text-teal-500/20 hidden md:block"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-[20%] text-orange-500/10 hidden md:block"
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <Award className="w-12 h-12" />
          </motion.div>
          <motion.div 
            className="absolute bottom-32 right-[10%] text-teal-500/10 hidden md:block"
            animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Users className="w-10 h-10" />
          </motion.div>
          <motion.div 
            className="absolute top-60 right-[15%] text-teal-500/20"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Wrench className="w-12 h-12" />
          </motion.div>
          <motion.div 
            className="absolute bottom-40 left-[20%] text-orange-500/20"
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <BookOpen className="w-14 h-14" />
          </motion.div>
          <div className="container relative mx-auto">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-teal-100 rounded-full text-sm font-semibold text-gray-700 mb-6"
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                India&apos;s Leading STEM Education Provider
              </motion.div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600 bg-clip-text text-transparent">
                  STEM Mantra
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Empowering the next generation of innovators through world-class STEM education,
                cutting-edge robotics labs, and transformative learning experiences.
              </p>
              {/* Quick Stats Row */}
              <motion.div 
                className="flex flex-wrap justify-center gap-8 mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* ...existing About page content... */}
      </main>
      <Footer />
    </>
  );
}
