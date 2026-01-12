"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaFlask,
  FaCube,
  FaBolt,
  FaMicroscope,
  FaAtom,
  FaLightbulb,
  FaCheckCircle,
  FaRulerCombined,
} from "react-icons/fa";
import {
  ArrowRight,
  Sparkles,
  Wrench,
  BookOpen,
  Zap,
  Award,
  Phone,
  CheckCircle,
  Beaker,
  Calculator,
  Microscope,
  Printer,
  Lightbulb,
  Shield,
  GraduationCap,
  Users,
  Target,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: Beaker,
    title: "Science Experiments",
    description:
      "200+ hands-on experiments covering physics, chemistry, and biology with modern lab equipment and safety protocols.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Calculator,
    title: "Mathematics Lab",
    description:
      "Interactive tools and manipulatives for teaching geometry, algebra, statistics, and advanced mathematics concepts.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Printer,
    title: "3D Design & Printing",
    description:
      "CAD software and 3D printers for turning ideas into physical models, teaching design thinking and prototyping.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Zap,
    title: "Electronics Workshop",
    description:
      "Complete electronics workbench with components, tools, and kits for circuit design and electrical engineering basics.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Microscope,
    title: "Research Tools",
    description:
      "Digital microscopes, data loggers, and measurement instruments for scientific investigation and research projects.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: FaAtom,
    title: "Physics Lab",
    description:
      "Mechanics, optics, thermodynamics, and modern physics equipment for comprehensive hands-on learning.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation Space",
    description:
      "Open workspace for brainstorming, prototyping, and collaborative projects with modern furniture and whiteboards.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Shield,
    title: "Safety Equipment",
    description:
      "Complete safety gear, first aid, and emergency equipment ensuring safe learning environment for all experiments.",
    color: "from-teal-500 to-teal-600",
  },
];

const equipment = {
  "Science Equipment": [
    "Digital Microscopes (40-1000x)",
    "Physics Experiment Kits",
    "Chemistry Lab Set",
    "Biology Model Sets",
    "Data Logger Systems",
    "Measurement Instruments",
    "Safety Equipment & Gear",
    "Lab Glassware & Chemicals",
  ],
  "Engineering Tools": [
    "3D Printers (FDM)",
    "Laser Cutting Machine",
    "Soldering Stations",
    "Power Tools Set",
    "Electronics Components",
    "CAD Software Licenses",
    "Testing Equipment",
    "Workshop Furniture",
  ],
  "Math & Technology": [
    "Geometry Tool Kits",
    "Math Manipulatives",
    "Graphing Calculators",
    "Statistics Lab Sets",
    "Computers & Tablets",
    "Interactive Displays",
    "Educational Software",
    "Math Modeling Tools",
  ],
};

const curriculum = [
  {
    grade: "Grades 6-8",
    color: "from-orange-500 to-orange-600",
    topics: [
      "Basic Scientific Method",
      "Simple Machines & Mechanics",
      "Geometry & Measurement",
      "Basic Chemistry Experiments",
      "Introduction to 3D Design",
      "Environmental Science Projects",
    ],
  },
  {
    grade: "Grades 9-10",
    color: "from-teal-500 to-teal-600",
    topics: [
      "Advanced Physics Concepts",
      "Organic Chemistry Labs",
      "Algebra & Trigonometry",
      "Engineering Design Process",
      "3D Printing Projects",
      "Research Methodology",
    ],
  },
  {
    grade: "Grades 11-12",
    color: "from-orange-500 to-teal-500",
    topics: [
      "Modern Physics & Quantum",
      "Advanced Chemistry Analysis",
      "Calculus & Statistics",
      "Complex Engineering Projects",
      "Scientific Research Papers",
      "Innovation Challenges",
    ],
  },
];

const benefits = [
  { icon: TrendingUp, text: "Hands-on learning improves concept retention by 75%" },
  { icon: Target, text: "Project-based approach develops critical thinking" },
  { icon: Zap, text: "Interdisciplinary learning connects real-world applications" },
  { icon: GraduationCap, text: "Prepares students for STEM careers and higher education" },
  { icon: Award, text: "Builds confidence through successful experiments" },
  { icon: Users, text: "Develops teamwork and collaboration skills" },
];

export default function StemLabPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-teal-50/30">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Animated Background */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl"></div>
          
          {/* Floating Icons */}
          <motion.div 
            className="absolute top-40 left-[10%] text-orange-500/20 hidden lg:block"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Beaker className="w-16 h-16" />
          </motion.div>
          <motion.div 
            className="absolute top-60 right-[15%] text-teal-500/20 hidden lg:block"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Calculator className="w-12 h-12" />
          </motion.div>
          <motion.div 
            className="absolute bottom-40 left-[20%] text-orange-500/20 hidden lg:block"
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Microscope className="w-14 h-14" />
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
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-teal-500 rounded-2xl mb-6 shadow-lg"
              >
                <Beaker className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-teal-100 rounded-full text-sm font-semibold text-gray-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                Integrated STEM Learning
              </motion.span>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-teal-500 to-teal-600 bg-clip-text text-transparent">
                  STEM Innovation Labs
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Comprehensive labs for hands-on learning in science, technology, 
                engineering, and mathematics with project-based curriculum
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Setup Your Lab <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="#features" 
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold border-2 border-orange-200 hover:border-orange-400 transition-all hover:scale-105"
                >
                  Explore Features
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                  Transform Theory into <span className="text-orange-500">Practice</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  STEM Innovation Labs bridge the gap between theoretical knowledge and practical application. 
                  Our labs provide complete infrastructure for schools to deliver experiential learning across 
                  all STEM subjects with NEP 2020 aligned curriculum and project-based learning methodology.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  From basic science experiments to complex engineering projects, students learn by doing, 
                  developing critical thinking, problem-solving, and collaboration skills essential for 
                  21st-century success.
                </p>
              </motion.div>
              
              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${index % 2 === 0 ? 'from-orange-500 to-orange-600' : 'from-teal-500 to-teal-600'} flex items-center justify-center flex-shrink-0`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-orange-50/30">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-semibold text-orange-700 mb-4">
                <Sparkles className="w-4 h-4" />
                Lab Features
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What&apos;s <span className="text-orange-500">Included</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive STEM lab infrastructure for complete experiential learning
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment List */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-sm font-semibold text-teal-700 mb-4">
                <Wrench className="w-4 h-4" />
                Equipment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="text-teal-500">Equipment</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modern equipment for science, technology, engineering, and mathematics education
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {Object.entries(equipment).map(([category, items], index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className={`text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 ${index === 0 ? 'border-orange-300' : index === 1 ? 'border-teal-300' : 'border-orange-300'}`}>
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <FaCheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-orange-500' : index === 1 ? 'text-teal-500' : 'text-orange-500'}`} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-teal-50/30">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-semibold text-orange-700 mb-4">
                <BookOpen className="w-4 h-4" />
                Learning Path
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Grade-Wise <span className="text-orange-500">Curriculum</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Progressive STEM learning path from fundamentals to advanced projects
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {curriculum.map((level, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-center mb-6">
                    <div className={`inline-block px-6 py-2 bg-gradient-to-r ${level.color} text-white rounded-full font-bold text-lg`}>
                      {level.grade}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {level.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <FaCheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-orange-500' : index === 1 ? 'text-teal-500' : 'text-orange-500'}`} />
                        <span className="text-gray-700 font-medium">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-orange-500 via-orange-600 to-teal-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"></div>
          </div>
          
          <motion.div 
            className="container relative mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Learning?
            </h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
              Get a comprehensive STEM Innovation Lab with complete equipment, curriculum, and teacher training
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Request a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="tel:+916356631515" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                Call: +91-6356631515
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
