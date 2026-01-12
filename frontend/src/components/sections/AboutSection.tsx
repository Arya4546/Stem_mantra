"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaRocket, FaGraduationCap, FaLightbulb, FaCogs, FaUsers, FaCertificate } from "react-icons/fa";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

const methodologies = [
  {
    icon: FaRocket,
    title: "Concept Based Learning",
    description: "Understanding underlying concepts behind technology. Our curriculum ensures students grasp fundamentals with ease.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: FaGraduationCap,
    title: "Project Based Learning",
    description: "Learn by making real-world projects. Electronics, 3D printing, IoT, and mechanics come alive through hands-on experience.",
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-500",
  },
  {
    icon: FaLightbulb,
    title: "Innovation Based Learning",
    description: "Foster creativity and problem-solving. Students develop solutions to real-world challenges using STEM principles.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];

const features = [
  { icon: FaCogs, label: "Hands-on Labs" },
  { icon: FaUsers, label: "Expert Trainers" },
  { icon: FaCertificate, label: "Certifications" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Floating Icons Animation */}
      <SectionFloatingIcons count={2} zIndex={1} />
      
      {/* Decorative Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-orange-100/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/40 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            About STEM Mantra
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Building Tomorrow&apos;s{" "}
            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              Innovators
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            STEM Mantra is India&apos;s leading provider of robotics and STEM education solutions 
            with NEP 2020 aligned curriculum, empowering students to become future-ready innovators.
          </p>
        </motion.div>

        {/* Methodology Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {methodologies.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl -z-10"
                style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
              />
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-500 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {String(index + 1).padStart(2, "0")}
                </div>
                
                {/* Icon */}
                <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className={`w-8 h-8 ${method.iconColor}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{method.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
            >
              <feature.icon className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-700">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 relative"
        >
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-500 rounded-3xl p-1">
            <div className="bg-white rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Transform Your School with STEM Education
                </h3>
                <p className="text-gray-600 mb-6">
                  From ATL Labs to Robotics & AI labs, we provide end-to-end solutions including 
                  equipment, training, curriculum, and ongoing support.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">15+</div>
                    <div className="text-sm text-gray-500">States Covered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600">500+</div>
                    <div className="text-sm text-gray-500">Schools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">10+</div>
                    <div className="text-sm text-gray-500">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full flex items-center justify-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-bold">NEP</div>
                      <div className="text-sm font-medium">2020 Aligned</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
