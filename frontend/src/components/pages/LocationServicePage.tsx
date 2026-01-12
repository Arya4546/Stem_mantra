"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FaCheckCircle,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRobot,
  FaFlask,
  FaMicrochip,
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";
import { SITE_CONFIG } from "@/lib/constants";

interface LocationServicePageProps {
  title: string;
  city: string;
  state: string;
  serviceType: "stem-lab" | "robotics-lab" | "atl-lab";
  description: string;
}

const serviceDetails = {
  "stem-lab": {
    icon: FaMicrochip,
    color: "teal",
    gradient: "from-teal-500 to-cyan-600",
    features: [
      "Complete lab infrastructure setup",
      "3D printing and design equipment",
      "Electronics and circuit labs",
      "Coding and programming stations",
      "NEP 2020 aligned curriculum",
      "Teacher training programs",
      "Ongoing technical support",
      "Competition preparation",
    ],
    equipment: [
      "3D Printers & Scanners",
      "Arduino & Raspberry Pi Kits",
      "Electronic Components",
      "Coding Computers",
      "Science Equipment",
      "Maker Tools",
    ],
  },
  "robotics-lab": {
    icon: FaRobot,
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    features: [
      "Advanced robotics kits",
      "AI and Machine Learning modules",
      "IoT integration equipment",
      "Competition-ready robots",
      "Age-appropriate curriculum (Grades 1-12)",
      "Certified teacher training",
      "National competition support",
      "Industry certifications",
    ],
    equipment: [
      "Humanoid Robots",
      "AI/ML Kits",
      "Drone Building Kits",
      "Sensor Modules",
      "Motor Controllers",
      "Programming Software",
    ],
  },
  "atl-lab": {
    icon: FaFlask,
    color: "purple",
    gradient: "from-purple-500 to-indigo-600",
    features: [
      "Niti Aayog compliant setup",
      "Complete ATL equipment package",
      "IoT and electronics modules",
      "3D printing solutions",
      "Robotics components",
      "Mentor support program",
      "Student innovation projects",
      "ATL community access",
    ],
    equipment: [
      "ATL Standard Kit",
      "IoT Modules",
      "3D Printer",
      "Robotics Kit",
      "Electronics Kit",
      "Hand Tools",
    ],
  },
};

export default function LocationServicePage({
  title,
  city,
  state,
  serviceType,
  description,
}: LocationServicePageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const details = serviceDetails[serviceType];
  const IconComponent = details.icon;

  const colorClasses = {
    teal: {
      bg: "bg-teal-50",
      text: "text-teal-600",
      border: "border-teal-200",
      button: "from-teal-500 to-teal-600",
    },
    orange: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      button: "from-orange-500 to-orange-600",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      button: "from-purple-500 to-purple-600",
    },
  };

  const colors = colorClasses[details.color as keyof typeof colorClasses];

  return (
    <div ref={ref}>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <FloatingAnimations variant="hero" density="low" />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${details.gradient} opacity-20`} />

        <div className="container mx-auto px-4 py-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/programs" className="hover:text-white transition-colors">Programs</Link>
              <span>/</span>
              <span className="text-white">{city}</span>
            </div>

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${colors.bg} rounded-full mb-6`}>
              <IconComponent className={`w-5 h-5 ${colors.text}`} />
              <span className={`text-sm font-semibold ${colors.text}`}>
                {serviceType === "stem-lab" && "STEM Innovation Lab"}
                {serviceType === "robotics-lab" && "Robotics & AI Lab"}
                {serviceType === "atl-lab" && "Atal Tinkering Lab"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {description}
            </p>

            {/* Location Info */}
            <div className="flex items-center justify-center gap-6 text-gray-400 mb-10">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="w-4 h-4 text-orange-500" />
                <span>{city}, {state}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="w-4 h-4 text-teal-500" />
                <span>500+ Schools Served</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className={`flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${colors.button} text-white rounded-full font-semibold shadow-2xl transition-all`}
                >
                  Get Free Consultation
                  <FaArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <FaPhone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer in {city}
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive lab setup solutions tailored for schools in {city} and surrounding areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {details.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-6 rounded-2xl ${colors.bg} border ${colors.border} hover:shadow-lg transition-all`}
              >
                <FaCheckCircle className={`w-6 h-6 ${colors.text} mb-3`} />
                <p className="font-medium text-gray-800">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Lab Equipment Included
            </h2>
            <p className="text-lg text-gray-600">
              State-of-the-art equipment and tools for hands-on learning
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {details.equipment.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-white rounded-2xl shadow-lg text-center hover:shadow-xl transition-all"
              >
                <FaCog className={`w-8 h-8 ${colors.text} mx-auto mb-3`} />
                <p className="font-medium text-gray-800 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose STEM Mantra in {city}?
              </h2>
              <ul className="space-y-4">
                {[
                  { icon: FaGraduationCap, text: "10+ years of experience in STEM education" },
                  { icon: FaCertificate, text: "NEP 2020 and Niti Aayog compliant" },
                  { icon: FaUsers, text: "Trained 50,000+ students across India" },
                  { icon: FaCog, text: "End-to-end lab setup and support" },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <span className="text-gray-700 pt-2">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-3xl bg-gradient-to-br ${details.gradient} text-white`}
            >
              <h3 className="text-2xl font-bold mb-6">Get Started Today</h3>
              <p className="text-white/90 mb-6">
                Contact us for a free consultation and quote for your school in {city}.
              </p>
              <div className="space-y-4">
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                >
                  <FaPhone className="w-5 h-5" />
                  <span>{SITE_CONFIG.contact.mobile}</span>
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-3 text-white hover:text-white/80 transition-colors"
                >
                  <FaEnvelope className="w-5 h-5" />
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
                <div className="flex items-start gap-3 text-white/90">
                  <FaMapMarkerAlt className="w-5 h-5 mt-1" />
                  <span>{SITE_CONFIG.contact.address}</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Request a Quote
                <FaArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 bg-gradient-to-r ${details.gradient}`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your School in {city}?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join 500+ schools across India that have partnered with STEM Mantra for quality STEM education.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full font-bold shadow-2xl hover:shadow-white/30 transition-all"
          >
            Schedule a Free Demo
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
