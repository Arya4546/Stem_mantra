"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCheckCircle, FaArrowRight, FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaRobot, FaFlask, FaMicrochip,
  FaGraduationCap, FaCertificate, FaUsers, FaCog,
} from "react-icons/fa";
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
    accent: "text-teal-600",
    bg: "bg-teal-50",
    borderColor: "border-teal-200",
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
      "3D Printers", "Arduino Kits", "Electronic Components",
      "Coding Computers", "Science Equipment", "Maker Tools",
    ],
  },
  "robotics-lab": {
    icon: FaRobot,
    accent: "text-orange-600",
    bg: "bg-orange-50",
    borderColor: "border-orange-200",
    features: [
      "Advanced robotics kits",
      "AI and Machine Learning modules",
      "IoT integration equipment",
      "Competition-ready robots",
      "Age-appropriate curriculum",
      "Certified teacher training",
      "National competition support",
      "Industry certifications",
    ],
    equipment: [
      "Humanoid Robots", "AI/ML Kits", "Drone Building Kits",
      "Sensor Modules", "Motor Controllers", "Software IDEs",
    ],
  },
  "atl-lab": {
    icon: FaFlask,
    accent: "text-purple-600",
    bg: "bg-purple-50",
    borderColor: "border-purple-200",
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
      "ATL Standard Kit", "IoT Modules", "3D Printer",
      "Robotics Kit", "Electronics Kit", "Hand Tools",
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
  const details = serviceDetails[serviceType];
  const IconComponent = details.icon;

  return (
    <div className="bg-white">
      {/* Hero Section — Left Aligned, White BG */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 ${details.bg} rounded-xl flex items-center justify-center`}>
                <IconComponent className={`w-6 h-6 ${details.accent}`} />
              </div>
              <span className={`px-4 py-1.5 ${details.bg} ${details.accent} rounded-full text-sm font-bold`}>
                📍 Local Service Specialist
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-sm">
                Request a Quote <FaArrowRight className="w-4 h-4" />
              </Link>
              <a href={`tel:${SITE_CONFIG.contact.mobile}`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold border border-gray-200 hover:border-orange-500 transition-all">
                <FaPhone className="w-3 h-3" /> {SITE_CONFIG.contact.mobile}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="py-8 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-10">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-orange-500" />
              <div className="text-sm">
                <span className="block text-gray-500 uppercase text-[10px] font-bold tracking-wider">Location</span>
                <span className="font-bold text-gray-900">{city}, {state}</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-3">
              <FaUsers className="w-5 h-5 text-teal-500" />
              <div className="text-sm">
                <span className="block text-gray-500 uppercase text-[10px] font-bold tracking-wider">Trust</span>
                <span className="font-bold text-gray-900">500+ Schools Served</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200" />
            <div className="flex items-center gap-3">
              <FaCertificate className="w-5 h-5 text-purple-500" />
              <div className="text-sm">
                <span className="block text-gray-500 uppercase text-[10px] font-bold tracking-wider">Compliance</span>
                <span className="font-bold text-gray-900">NEP 2020 Aligned</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer in {city}</h2>
            <p className="text-gray-600 max-w-2xl">Tailored laboratory solutions designed for the educational landscape of {city}.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                className={`p-6 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 hover:shadow-lg transition-all`}>
                <FaCheckCircle className={`w-6 h-6 ${details.accent} mb-4`} />
                <p className="font-bold text-gray-800 text-sm leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">State-of-the-art Equipment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We provide industry-standard tools and machines to ensure the best learning experience.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {details.equipment.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm text-center group hover:border-orange-200 transition-all">
                <FaCog className={`w-8 h-8 ${details.accent} mx-auto mb-3 group-hover:rotate-45 transition-transform`} />
                <p className="font-bold text-gray-800 text-xs">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Info Card */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Schools in {city} <br />Partner With Us?</h2>
            <div className="space-y-6">
              {[
                { icon: FaGraduationCap, text: "10+ years of dedicated STEM education focus" },
                { icon: FaCertificate, text: "Official NEP 2020 and Niti Aayog guidelines compliance" },
                { icon: FaUsers, text: "Successfully trained over 50,000 students nationwide" },
                { icon: FaCog, text: "Full turnkey solutions from setup to annual support" },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className={`w-10 h-10 ${details.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${details.accent}`} />
                  </div>
                  <p className="text-gray-600 font-medium pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-6">Expert Consultation</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">Schedule a free site survey and consultation for your school in {city}. Our experts will create a customized lab blueprint.</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <FaPhone className="w-5 h-5 text-orange-400" />
                <span className="font-bold">{SITE_CONFIG.contact.mobile}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-orange-400" />
                <span className="font-bold">{SITE_CONFIG.contact.email}</span>
              </div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all">
              Request a Free Survey <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — Contained Card */}
      <section className="py-12 px-4 mb-20">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Elevate Education Standards</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Join the revolution of practical learning in {city}. Partner with India's leading STEM laboratory provider.</p>
            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-900/40">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
