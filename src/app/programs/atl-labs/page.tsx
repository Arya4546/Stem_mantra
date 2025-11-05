import type { Metadata } from "next";
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
  FaArrowRight,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "ATL Labs (Atal Tinkering Labs) - Complete Setup & Support | STEM Mantra",
  description:
    "Comprehensive end-to-end assistance in establishing and running Atal Tinkering Labs in schools. Expert training, NEP 2020 aligned curriculum, and year-long support for STEM innovation.",
  openGraph: {
    title: "ATL Labs (Atal Tinkering Labs) - Complete Setup & Support | STEM Mantra",
    description:
      "Comprehensive end-to-end assistance in establishing and running Atal Tinkering Labs. Expert training and NEP 2020 aligned curriculum.",
    type: "website",
  },
  keywords: [
    "ATL Labs",
    "Atal Tinkering Labs",
    "ATL setup",
    "tinkering lab for schools",
    "AIM ATL",
    "NITI Aayog",
    "innovation lab",
    "maker space",
  ],
};

const features = [
  {
    icon: FaTools,
    title: "Complete Lab Setup",
    description:
      "All equipment, tools, and technology as per NITI Aayog guidelines for world-class tinkering labs.",
  },
  {
    icon: FaUserGraduate,
    title: "Teacher Training",
    description:
      "Comprehensive training programs for ATL coordinators and teachers with certification.",
  },
  {
    icon: FaBook,
    title: "NEP 2020 Curriculum",
    description:
      "Structured curriculum aligned with National Education Policy for experiential learning.",
  },
  {
    icon: FaRobot,
    title: "Robotics & IoT",
    description:
      "Advanced robotics kits, Arduino, Raspberry Pi, and IoT modules for hands-on projects.",
  },
  {
    icon: FaCube,
    title: "3D Printing Lab",
    description:
      "3D printers, design software, and materials for rapid prototyping and innovation.",
  },
  {
    icon: FaFlask,
    title: "Science Experiments",
    description:
      "Complete science lab equipment for physics, chemistry, and biology experiments.",
  },
  {
    icon: FaTools,
    title: "DIY Workshop",
    description:
      "Power tools, hand tools, and fabrication equipment for building functional prototypes.",
  },
  {
    icon: FaHandshake,
    title: "Ongoing Support",
    description:
      "Year-long mentorship, workshops, technical support, and regular skill development programs.",
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

export default function ATLLabsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 blur-bg" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full filter blur-3xl" />
          
          <div className="container relative mx-auto px-4 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 glass rounded-2xl mb-6">
                <FaTools className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">ATL Labs</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Complete Atal Tinkering Labs setup with equipment, training, and NEP 2020 aligned curriculum
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2">
                  Setup Your Lab <FaArrowRight className="w-4 h-4" />
                </Link>
                <a href="#features" className="px-8 py-4 glass text-gray-900 rounded-full font-semibold border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:scale-105">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-24 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
                Future-Ready Robotics Education
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
        <section id="features" className="py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Lab <span className="gradient-text">Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to run a professional ATL program
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-indigo-600" />
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
        <section className="py-24 px-4 bg-gradient-to-b from-white to-indigo-50/30">
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
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Grade-Wise <span className="gradient-text">Curriculum</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Progressive learning path from basics to advanced tinkering
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {curriculum.map((level, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
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
        <section className="py-24 px-4 bg-gradient-to-br from-purple-600 to-pink-600">
          <div className="container mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Get a comprehensive Robotics & AI Lab setup with complete training, curriculum, and ongoing support
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2">
                Request a Demo <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link href="tel:+916356631515" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white/30 hover:bg-white/20 transition-all hover:scale-105">
                Call: +91-6356631515
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
