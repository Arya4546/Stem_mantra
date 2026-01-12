"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaFlask,
  FaCube,
  FaRobot,
  FaTools,
  FaUserGraduate,
  FaBook,
  FaCheckCircle,
  FaHandshake,
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
  Target,
  Users,
  GraduationCap,
  Building2,
  Lightbulb,
  Settings,
  Printer
} from "lucide-react";

const features = [
  {
    icon: Settings,
    title: "Complete Lab Setup",
    description:
      "All equipment, tools, and technology as per NITI Aayog guidelines for world-class tinkering labs.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: GraduationCap,
    title: "Teacher Training",
    description:
      "Comprehensive training programs for ATL coordinators and teachers with official certification.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: BookOpen,
    title: "NEP 2020 Curriculum",
    description:
      "Structured curriculum aligned with National Education Policy for experiential learning.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Cpu,
    title: "Robotics & IoT",
    description:
      "Advanced robotics kits, Arduino, Raspberry Pi, and IoT modules for hands-on projects.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Printer,
    title: "3D Printing Lab",
    description:
      "3D printers, design software, and materials for rapid prototyping and innovation.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: FaFlask,
    title: "Science Experiments",
    description:
      "Complete science lab equipment for physics, chemistry, and biology experiments.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Wrench,
    title: "DIY Workshop",
    description:
      "Power tools, hand tools, and fabrication equipment for building functional prototypes.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Users,
    title: "Ongoing Support",
    description:
      "Year-long mentorship, workshops, technical support, and regular skill development programs.",
    color: "from-teal-500 to-teal-600",
  },
];

const equipment = {
  "Electronics & Robotics": [
    "Arduino Boards & Kits",
    "Raspberry Pi Systems",
    "Robot Building Kits",
    "Sensors & Actuators",
    "Motor Controllers",
    "Electronic Components",
    "Breadboards & Tools",
    "IoT Development Boards",
  ],
  "Fabrication Tools": [
    "3D Printers (FDM)",
    "Laser Cutting Machine",
    "CNC Router (Optional)",
    "Power Tools Set",
    "Hand Tools Kit",
    "Soldering Station",
    "Drilling Machine",
    "Measuring Instruments",
  ],
  "Computing & Software": [
    "Desktop Computers",
    "Tablets for Students",
    "CAD Software Licenses",
    "Programming IDEs",
    "Design Software",
    "Simulation Tools",
    "Educational Apps",
    "Cloud Storage Access",
  ],
};

const curriculum = [
  {
    grade: "Grades 6-8",
    color: "from-orange-500 to-orange-600",
    topics: [
      "Introduction to Tinkering",
      "Basic Electronics & Circuits",
      "Block-based Programming",
      "Simple Robot Assembly",
      "3D Design Basics",
      "Scientific Method & Experiments",
    ],
  },
  {
    grade: "Grades 9-10",
    color: "from-teal-500 to-teal-600",
    topics: [
      "Advanced Electronics",
      "Python & C Programming",
      "IoT Project Development",
      "3D Printing Projects",
      "Sensor Integration",
      "Innovation Challenges",
    ],
  },
  {
    grade: "Grades 11-12",
    color: "from-orange-500 to-teal-500",
    topics: [
      "Complex Project Design",
      "AI & Machine Learning",
      "Industrial Automation",
      "Research & Development",
      "Entrepreneurship Skills",
      "Competition Preparation",
    ],
  },
];

const benefits = [
  "NITI Aayog approved equipment and curriculum",
  "Complete setup and installation support",
  "Teacher training with certification",
  "Year-round mentorship and workshops",
  "Competition preparation and guidance",
  "Technical support and maintenance",
];

export default function ATLLabsPage() {
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg"
              >
                <FaFlask className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-semibold text-orange-700 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Award className="w-4 h-4" />
                NITI Aayog Approved
              </motion.span>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600 bg-clip-text text-transparent">
                  ATL Labs
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Complete Atal Tinkering Labs setup with world-class equipment, 
                expert training, and NEP 2020 aligned curriculum
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  Setup Your Lab <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="#features" 
                  className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl font-semibold border-2 border-orange-200 hover:border-orange-400 transition-all hover:scale-105"
                >
                  Learn More
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
                  What is an <span className="text-orange-500">ATL Lab</span>?
                </h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Atal Tinkering Labs (ATL) are innovation workspaces established under the Atal Innovation Mission 
                  by NITI Aayog, Government of India. These labs provide students with access to state-of-the-art 
                  equipment and technologies to foster creativity, innovation, and entrepreneurial mindset.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  STEM Mantra provides comprehensive end-to-end assistance in establishing and running ATL Labs 
                  in schools. From equipment procurement to teacher training, we ensure your school&apos;s ATL 
                  becomes a hub of innovation and creativity.
                </p>
              </motion.div>
              
              {/* Benefits Grid */}
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </motion.div>
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
                What We Provide
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="text-orange-500">Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run a professional ATL program
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
                Equipment List
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="text-teal-500">Equipment</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-standard tools and technologies for comprehensive learning
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
                Progressive learning path from basics to advanced tinkering
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
        <section className="py-20 px-4 bg-gradient-to-br from-orange-500 to-teal-600 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-white rounded-full"></div>
          </div>
          
          <motion.div 
            className="container relative mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Setup Your ATL Lab?
            </h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
              Get a comprehensive ATL Lab setup with complete equipment, training, and ongoing support
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
