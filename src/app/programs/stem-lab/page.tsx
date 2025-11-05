import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "STEM Innovation Labs Setup | STEM Mantra",
  description:
    "Complete STEM Innovation Lab setup for schools. Hands-on learning in science, mathematics, engineering with modern equipment, experiments, and project-based curriculum.",
  openGraph: {
    title: "STEM Innovation Labs Setup | STEM Mantra",
    description:
      "Complete STEM Innovation Lab setup for schools. Hands-on learning in science, mathematics, engineering with modern equipment.",
    type: "website",
  },
};

const features = [
  {
    icon: FaFlask,
    title: "Science Experiments",
    description:
      "200+ hands-on experiments covering physics, chemistry, and biology with modern lab equipment and safety protocols.",
  },
  {
    icon: FaRulerCombined,
    title: "Mathematics Lab",
    description:
      "Interactive tools and manipulatives for teaching geometry, algebra, statistics, and advanced mathematics concepts.",
  },
  {
    icon: FaCube,
    title: "3D Design & Printing",
    description:
      "CAD software and 3D printers for turning ideas into physical models, teaching design thinking and prototyping.",
  },
  {
    icon: FaBolt,
    title: "Electronics Workshop",
    description:
      "Complete electronics workbench with components, tools, and kits for circuit design and electrical engineering basics.",
  },
  {
    icon: FaMicroscope,
    title: "Research Tools",
    description:
      "Digital microscopes, data loggers, and measurement instruments for scientific investigation and research projects.",
  },
  {
    icon: FaAtom,
    title: "Physics Lab",
    description:
      "Mechanics, optics, thermodynamics, and modern physics equipment for comprehensive hands-on learning.",
  },
  {
    icon: FaLightbulb,
    title: "Innovation Space",
    description:
      "Open workspace for brainstorming, prototyping, and collaborative projects with modern furniture and whiteboards.",
  },
  {
    icon: FaCheckCircle,
    title: "Safety Equipment",
    description:
      "Complete safety gear, first aid, and emergency equipment ensuring safe learning environment for all experiments.",
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
  "Hands-on learning improves concept retention by 75%",
  "Project-based approach develops critical thinking",
  "Interdisciplinary learning connects real-world applications",
  "Prepares students for STEM careers and higher education",
  "Builds confidence through successful experiments",
  "Develops teamwork and collaboration skills",
];

export default function StemLabPage() {
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
                <FaFlask className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">STEM Innovation Labs</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Comprehensive labs for hands-on learning in science, technology, engineering, and mathematics
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  Setup Your Lab
                </Link>
                <a href="#features" className="inline-block px-8 py-4 bg-white/80 backdrop-blur-sm text-indigo-600 font-bold rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Explore Features
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
                Transform Theory into <span className="gradient-text">Practice</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                STEM Innovation Labs bridge the gap between theoretical knowledge and practical application. 
                Our labs provide complete infrastructure for schools to deliver experiential learning across 
                all STEM disciplines, making complex concepts tangible and exciting for students.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                With 200+ experiments, project-based curriculum, and modern equipment, students develop 
                critical thinking, problem-solving, and innovation skills essential for the 21st century.
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
                Everything you need for comprehensive STEM education
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

        {/* Benefits */}
        <section className="py-16 px-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Why <span className="gradient-text">STEM Innovation Labs</span> Matter
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Research shows that hands-on, experiential learning significantly improves student 
                  engagement, understanding, and retention of STEM concepts. Our innovation labs create 
                  an environment where students become active learners and innovators.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">200+</div>
                    <div className="text-gray-700">Hands-on Experiments</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">4</div>
                    <div className="text-gray-700">STEM Disciplines Covered</div>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
                    <div className="text-gray-700">NEP 2020 Aligned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment List */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="gradient-text">Equipment</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Modern tools and equipment for comprehensive STEM learning
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
        <section className="py-16 px-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Grade-Wise <span className="gradient-text">Curriculum</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Progressive learning path aligned with national education standards
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
              Ready to Ignite Innovation?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Get a complete STEM Innovation Lab with equipment, training, curriculum, and ongoing support
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
