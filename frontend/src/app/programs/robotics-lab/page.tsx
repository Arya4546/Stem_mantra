"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaRobot,
  FaMicrochip,
  FaBrain,
  FaCode,
  FaCog,
  FaLaptopCode,
  FaCheckCircle,
  FaTools,
} from "react-icons/fa";
import {
  ArrowRight,
  Sparkles,
  Cpu,
  Wrench,
  BookOpen,
  Zap,
  Award,
  Phone,
  CheckCircle,
  Bot,
  CircuitBoard,
  Settings,
  GraduationCap,
  Trophy,
  Target,
  Users
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Advanced Robotics Kits",
    description:
      "Industry-standard robotics platforms including Arduino, Raspberry Pi, and custom robot chassis for comprehensive learning.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: FaBrain,
    title: "AI & Machine Learning",
    description:
      "Hands-on AI modules covering computer vision, natural language processing, and neural networks for future-ready skills.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: CircuitBoard,
    title: "IoT Integration",
    description:
      "Smart device development with sensors, actuators, and cloud connectivity for building real-world IoT solutions.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: FaCode,
    title: "Programming Tools",
    description:
      "Multi-language support including Python, C++, block coding, and visual programming environments for all skill levels.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Settings,
    title: "Automation Systems",
    description:
      "Industrial automation concepts with PLCs, SCADA systems, and automated assembly line simulations.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: FaLaptopCode,
    title: "Software Suite",
    description:
      "Complete software stack including CAD tools, simulation software, and programming IDEs for comprehensive development.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Wrench,
    title: "Assembly & Fabrication",
    description:
      "Hands-on assembly tools, testing equipment, and fabrication facilities for building functional prototypes.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Award,
    title: "Certification Programs",
    description:
      "Industry-recognized certifications and project-based assessments to validate student skills and knowledge.",
    color: "from-orange-500 to-orange-600",
  },
];

const equipment = {
  "Robot Kits": [
    "Arduino-based Robot Cars",
    "Raspberry Pi Smart Robots",
    "Line Following Robots",
    "Obstacle Avoidance Robots",
    "Humanoid Robot Platforms",
    "Robotic Arms (5-DOF)",
    "Drone Programming Kits",
    "Modular Robot Building Sets",
  ],
  "AI & Computing": [
    "AI Development Boards",
    "Jetson Nano for Edge AI",
    "Computer Vision Cameras",
    "Speech Recognition Modules",
    "Pre-trained AI Models",
    "GPU-accelerated Workstations",
    "Machine Learning Datasets",
    "AI Training Software",
  ],
  "Electronics & IoT": [
    "Arduino Mega & Uno Boards",
    "Raspberry Pi 4 Systems",
    "ESP32 IoT Modules",
    "Sensor Kits (20+ types)",
    "Motor Controllers",
    "Power Management Units",
    "Breadboards & Components",
    "Soldering Equipment",
  ],
};

const curriculum = [
  {
    grade: "Grades 6-8",
    color: "from-teal-500 to-teal-600",
    topics: [
      "Introduction to Robotics",
      "Basic Electronics & Circuits",
      "Block-based Programming",
      "Simple Robot Assembly",
      "Sensor Integration",
      "Basic Automation",
    ],
  },
  {
    grade: "Grades 9-10",
    color: "from-orange-500 to-orange-600",
    topics: [
      "Advanced Robot Design",
      "Python Programming for Robotics",
      "IoT Project Development",
      "AI Fundamentals",
      "Computer Vision Basics",
      "Competition Robot Building",
    ],
  },
  {
    grade: "Grades 11-12",
    color: "from-teal-500 to-orange-500",
    topics: [
      "Industrial Robotics",
      "Machine Learning Projects",
      "Advanced AI Applications",
      "Autonomous Systems",
      "Research Projects",
      "Industry Internship Prep",
    ],
  },
];

const whyChooseUs = [
  { icon: Trophy, title: "Competition Ready", desc: "Prepare students for national and international robotics competitions" },
  { icon: GraduationCap, title: "Expert Training", desc: "Industry professionals and certified trainers for quality education" },
  { icon: Target, title: "Industry Aligned", desc: "Curriculum designed with Industry 4.0 requirements in mind" },
  { icon: Zap, title: "Hands-On Learning", desc: "80% practical sessions for maximum skill development" },
];

export default function RoboticsLabPage() {
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
            className="absolute bottom-40 left-[30%] text-orange-500/10 hidden md:block"
            animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaBrain className="w-14 h-14" />
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl mb-6 shadow-lg"
              >
                <FaRobot className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-sm font-semibold text-teal-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles className="w-4 h-4" />
                Future Technology Education
              </motion.span>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-orange-500 bg-clip-text text-transparent">
                  Robotics & AI Labs
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Build the future with cutting-edge robotics, artificial intelligence, 
                and automation technology for Industry 4.0 readiness
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Setup Your Lab <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="#features" 
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold border-2 border-teal-200 hover:border-teal-400 transition-all hover:scale-105"
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
                  Future-Ready <span className="text-teal-500">Robotics Education</span>
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Our Robotics & AI Labs provide comprehensive infrastructure for schools to deliver world-class 
                  education in robotics, artificial intelligence, machine learning, and automation. Students get 
                  hands-on experience with industry-standard tools and technologies used by leading tech companies.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  From basic robot assembly to advanced AI projects, our curriculum is designed to take students 
                  from beginners to innovators, preparing them for careers in Industry 4.0 and beyond.
                </p>
              </motion.div>
              
              {/* Why Choose Us */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${index % 2 === 0 ? 'from-teal-500 to-teal-600' : 'from-orange-500 to-orange-600'} flex items-center justify-center`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-teal-50/30">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-sm font-semibold text-teal-700 mb-4">
                <Sparkles className="w-4 h-4" />
                Lab Features
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What&apos;s <span className="text-teal-500">Included</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to build a comprehensive robotics and AI education program
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
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-semibold text-orange-700 mb-4">
                <Wrench className="w-4 h-4" />
                Equipment
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="text-orange-500">Equipment</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-standard robotics and AI equipment for comprehensive learning
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
                  <h3 className={`text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 ${index === 0 ? 'border-teal-300' : index === 1 ? 'border-orange-300' : 'border-teal-300'}`}>
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <FaCheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-teal-500' : index === 1 ? 'text-orange-500' : 'text-teal-500'}`} />
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
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-orange-50/30">
          <div className="container mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-sm font-semibold text-teal-700 mb-4">
                <BookOpen className="w-4 h-4" />
                Learning Path
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Grade-Wise <span className="text-teal-500">Curriculum</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Progressive learning from basics to advanced robotics and AI
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
                        <FaCheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-teal-500' : index === 1 ? 'text-orange-500' : 'text-teal-500'}`} />
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
        <section className="py-20 px-4 bg-gradient-to-br from-teal-500 to-orange-600 relative overflow-hidden">
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
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Get a comprehensive Robotics & AI Lab setup with complete training, curriculum, and ongoing support
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
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
