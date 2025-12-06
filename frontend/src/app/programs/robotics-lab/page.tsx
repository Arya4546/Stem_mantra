import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Robotics & AI Labs Setup | STEM Mantra",
  description:
    "Transform your school with advanced Robotics and AI labs. Complete setup, training, and curriculum for hands-on learning in robotics, AI, IoT, and automation.",
  openGraph: {
    title: "Robotics & AI Labs Setup | STEM Mantra",
    description:
      "Transform your school with advanced Robotics and AI labs. Complete setup, training, and curriculum for hands-on learning.",
    type: "website",
  },
};

const features = [
  {
    icon: FaRobot,
    title: "Advanced Robotics Kits",
    description:
      "Industry-standard robotics platforms including Arduino, Raspberry Pi, and custom robot chassis for comprehensive learning.",
  },
  {
    icon: FaBrain,
    title: "AI & Machine Learning",
    description:
      "Hands-on AI modules covering computer vision, natural language processing, and neural networks for future-ready skills.",
  },
  {
    icon: FaMicrochip,
    title: "IoT Integration",
    description:
      "Smart device development with sensors, actuators, and cloud connectivity for building real-world IoT solutions.",
  },
  {
    icon: FaCode,
    title: "Programming Tools",
    description:
      "Multi-language support including Python, C++, block coding, and visual programming environments for all skill levels.",
  },
  {
    icon: FaCog,
    title: "Automation Systems",
    description:
      "Industrial automation concepts with PLCs, SCADA systems, and automated assembly line simulations.",
  },
  {
    icon: FaLaptopCode,
    title: "Software Suite",
    description:
      "Complete software stack including CAD tools, simulation software, and programming IDEs for comprehensive development.",
  },
  {
    icon: FaTools,
    title: "Assembly & Fabrication",
    description:
      "Hands-on assembly tools, testing equipment, and fabrication facilities for building functional prototypes.",
  },
  {
    icon: FaCheckCircle,
    title: "Certification Programs",
    description:
      "Industry-recognized certifications and project-based assessments to validate student skills and knowledge.",
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

export default function RoboticsLabPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Soft blur backgrounds */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6 shadow-lg">
                <FaRobot className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">Robotics & AI Labs</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Build the future with cutting-edge robotics, artificial intelligence, and automation technology
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  Setup Your Lab
                </Link>
                <a href="#features" className="inline-block px-8 py-4 bg-white/80 backdrop-blur-sm text-indigo-600 font-bold rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                Future-Ready <span className="gradient-text">Robotics Education</span>
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
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="gradient-text">Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run a professional robotics and AI education program
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment List */}
        <section className="py-16 px-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="gradient-text">Equipment</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Industry-standard tools and technologies for comprehensive learning
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(equipment).map(([category, items], index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b-2 border-indigo-200">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Grade-Wise <span className="gradient-text">Curriculum</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Progressive learning path from basics to advanced robotics and AI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {curriculum.map((level, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="text-center mb-6">
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg mb-4">
                      {level.grade}
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {level.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get a comprehensive Robotics & AI Lab setup with complete training, curriculum, and ongoing support
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                Request a Demo
              </Link>
              <a href="tel:+916356631515" className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Call Now: +91-6356631515
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
