"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRocket, FaGraduationCap, FaLightbulb, FaCogs, FaUsers, FaCertificate } from "react-icons/fa";

const methodologies = [
  {
    icon: FaRocket,
    title: "Concept Based Learning",
    description: "Understanding underlying concepts behind technology. Our curriculum ensures students grasp fundamentals with ease.",
    accent: "border-l-orange-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: FaGraduationCap,
    title: "Project Based Learning",
    description: "Learn by making real-world projects. Electronics, 3D printing, IoT, and mechanics come alive through hands-on experience.",
    accent: "border-l-teal-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
  },
  {
    icon: FaLightbulb,
    title: "Innovation Based Learning",
    description: "Foster creativity and problem-solving. Students develop solutions to real-world challenges using STEM principles.",
    accent: "border-l-purple-500",
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const trustIndicators = [
  { icon: FaCogs, label: "Hands-on Labs" },
  { icon: FaUsers, label: "Expert Trainers" },
  { icon: FaCertificate, label: "Certifications" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-16 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Two-column asymmetric layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          {/* Left — Large text panel (3/5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              About STEMmantra
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Building Tomorrow&apos;s{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Innovators
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              STEMmantra is India&apos;s leading provider of robotics and STEM education solutions
              with NEP 2020 aligned curriculum, empowering students to become future-ready innovators.
            </p>

            {/* Trust indicators — inline */}
            <div className="flex flex-wrap gap-6 mb-8">
              {trustIndicators.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <item.icon className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Stats inline bar */}
            <div className="flex flex-wrap gap-8 pt-6 border-t border-gray-100">
              {[
                { value: "15+", label: "States Covered", color: "text-orange-600" },
                { value: "500+", label: "Schools", color: "text-teal-600" },
                { value: "10+", label: "Years Experience", color: "text-purple-600" },
              ].map((stat, index) => (
                <div key={index}>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Stacked horizontal strip cards (2/5) */}
          <div className="lg:col-span-2 space-y-4">
            {methodologies.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className={`flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 border-l-4 ${method.accent} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-11 h-11 ${method.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <method.icon className={`w-5 h-5 ${method.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{method.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Banner — Box shadow instead of gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Transform Your School with STEM Education
              </h3>
              <p className="text-gray-600 mb-0">
                From ATL Labs to Robotics & AI labs, we provide end-to-end solutions including
                equipment, training, curriculum, and ongoing support.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-white rounded-xl border border-gray-200">
              <span className="text-2xl font-bold text-orange-600">NEP 2020</span>
              <span className="text-sm text-gray-500">Aligned</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
