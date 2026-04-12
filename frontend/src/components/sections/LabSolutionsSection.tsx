"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    FaChalkboardTeacher,
    FaTools,
    FaCheckCircle,
    FaArrowRight
} from "react-icons/fa";
import Link from "next/link";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

// Content-heavy data for SEO instead of small generic cards
const labOfferings = [
    {
        title: "Comprehensive Robotics and AI Laboratories Setup",
        description: "Equip your institution with best in class robotics DIY kits, softwares and AI modules. Our setups are tailored to meet the National Education Policy (NEP) 2020 & National curriculum Framework(NCF)-2023 guidelines, providing students with experiential learning opportunities in automation, machine learning, and hardware engineering.",
        highlights: [
            "Best in class DIY Kits, Microcontroller",
            "Advanced sensor modules and motors",
            "AI&ML driven visual programming interfaces"
        ],
        icon: FaTools,
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        title: "Atal Tinkering Labs (ATL) Implementation",
        description: "Transform your school's educational approach with government-approved Atal Tinkering Labs. STEMmantra provides end-to-end guidance from equipment procurement (of Package 1,2,3 & 4 including 3D printers) to curriculum implementation and continuous mentor support for national innovation challenges.",
        highlights: [
            "NITI Aayog compliance and documentation support",
            "End to end setup & execution support.",
            "Maker space tools and electronics workbenches"
        ],
        icon: FaChalkboardTeacher,
        color: "text-teal-500",
        bg: "bg-teal-50"
    }
];

export default function LabSolutionsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="relative py-20 lg:py-28 bg-white overflow-hidden border-t border-gray-100">
            {/* Keeping floating animations as requested */}
            <FloatingAnimations variant="stem" density="low" />

            <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Heavy SEO Text & Intro */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-5 lg:sticky lg:top-32"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 mb-6">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                            <span className="text-sm font-bold text-teal-700 uppercase tracking-wider">End-to-End Lab Solutions</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Transform Your School with <span className="text-orange-500">World-Class STEM/Robotics Labs</span>
                        </h2>

                        <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
                            <p>
                            At STEMmantra, we recognise that practical, hands-on learning is the cornerstone of modern education.
                                Our comprehensive laboratory solutions are engineered to seamlessly integrate into your school&apos;s curriculum,
                                providing a robust foundation in <strong>Robotics, Artificial Intelligence, Coding, and IoT, Drone, 3-D Printing</strong>.
                            </p>
                            <p>
                                We don&apos;t just supply equipment; we architect complete learning ecosystems. From initial spatial planning and
                                hardware installation to rigorous teacher training and curriculum alignment with <strong>NEP 2020</strong>
                                standards, our turnkey solutions ensure that your institution remains at the forefront of pedagogical innovation.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-black text-gray-900">500+</span>
                                <span className="text-sm font-bold text-gray-500 uppercase leading-tight">Labs<br />Installed</span>
                            </div>
                            <div className="w-px h-10 bg-gray-200 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-black text-gray-900">100%</span>
                                <span className="text-sm font-bold text-gray-500 uppercase leading-tight">NEP 2020<br />Aligned</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Detailed Offerings (List format, NOT cards) */}
                    <div className="lg:col-span-7 space-y-16">
                        {labOfferings.map((offering, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative pl-8 md:pl-12"
                            >
                                {/* Vertical Accent Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 rounded-full">
                                    <div className="absolute top-0 left-0 w-1 h-3/4 bg-orange-500 rounded-full"></div>
                                </div>

                                <div className="flex items-start gap-5 mb-4">
                                    <div className={`w-14 h-14 rounded-2xl ${offering.bg} flex items-center justify-center flex-shrink-0`}>
                                        <offering.icon className={`w-6 h-6 ${offering.color}`} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight pt-2">
                                        {offering.title}
                                    </h3>
                                </div>

                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    {offering.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {offering.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                                            <span className="text-gray-700 font-medium">{highlight}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-700 transition-colors"
                                >
                                    Explore Setup Requirements <FaArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}

                        {/* Additional SEO Text Block without any borders/cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="pt-10 border-t border-gray-100"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Partner With Us for Lab Integration?</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Building a successful STEM Lab ecosystem requires more than just unpacking boxes of equipment. Our dedicated success team conducts in-depth educator workshops, ensuring teachers are confident in utilizing basic electronics components, block based kits, advanced robotics kits and programming software. We provide continuous technical support, curriculum updates, and targeted training for National/International robotics & STEM based competitions, ensuring your students consistently perform at the highest levels.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
                            >
                                Schedule a Free Lab Consultation
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
