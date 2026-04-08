"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaEnvelope, FaBriefcase, FaGraduationCap, FaPaperPlane } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function CareerPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                Careers at STEMmantra
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Join Our Mission to <br className="hidden md:block"/> Transform Education
              </h1>
              <p className="text-lg md:text-xl text-orange-50 mb-0 leading-relaxed font-medium">
                Help us empower the next generation of innovators by bringing advanced STEM, Robotics, and AI learning to schools across India.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="relative container mx-auto px-4 py-20 overflow-hidden">
          <FloatingAnimations variant="section" density="low" />
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            {[
               { icon: FaBriefcase, title: "Innovative Work", desc: "Work with cutting-edge technology including AI, IoT, and Robotics to build comprehensive educational solutions." },
               { icon: FaGraduationCap, title: "Impactful Reach", desc: "Your work directly impacts millions of students, shaping their careers, skills, and computational thinking." },
               { icon: FaPaperPlane, title: "Growth & Learning", desc: "We foster an environment of continuous learning where your ideas are valued and your professional growth is supported." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                 <div className="w-16 h-16 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="w-8 h-8 text-orange-500" />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                 <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Apply Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-teal-600 p-10 text-white flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                  <FaEnvelope className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-teal-50 leading-relaxed">
                  Start your newest and most exciting journey with the STEMmantra family today.
                </p>
              </div>
              <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Current Openings</h4>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  We are continually seeking passionate educators, curriculum developers, robotics trainers, and tech enthusiasts. Even if you don&apos;t see a specific role, we would love to hear from you.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-xl hover:bg-orange-100 transition-colors">
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Drop your resume at</p>
                  <a 
                    href="mailto:hr@stemmantra.com" 
                    className="text-2xl md:text-3xl font-black text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-3"
                  >
                    hr@stemmantra.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
