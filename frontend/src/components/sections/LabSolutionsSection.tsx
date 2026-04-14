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
                <div className="max-w-4xl mx-auto items-center mt-12">
                    {/* Centered Heavy SEO Text & Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 mb-6 mx-auto">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                            <span className="text-sm font-bold text-teal-700 uppercase tracking-wider">End-to-End Lab Solutions</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight text-center">
                            Transform Your School with <span className="text-orange-500">World-Class STEM/Robotics Labs</span>
                        </h2>

                        <div className="prose prose-lg text-gray-600 mb-10 max-w-none mx-auto text-center md:text-center">
                            <p className="mb-6">
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

                        <div className="flex flex-wrap gap-8 justify-center pt-8 border-t border-gray-100 w-full">
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-4xl md:text-5xl font-black text-gray-900">500+</span>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider leading-tight">Labs Installed</span>
                            </div>
                            <div className="w-px h-16 bg-gray-200 hidden sm:block mt-2"></div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-4xl md:text-5xl font-black text-gray-900">100%</span>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider leading-tight">NEP 2020 Aligned</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Additional SEO Text Block properly full width at bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 pt-16 border-t border-gray-100 w-full flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Partnership</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                        Why <span className="text-orange-500">Partner With Us</span> for Lab Integration?
                    </h2>

                    <p className="text-gray-600 mb-10 leading-relaxed text-lg max-w-4xl mx-auto md:text-center">
                        Building a successful STEM Lab ecosystem requires more than just unpacking boxes of equipment. Our dedicated success team conducts in-depth educator workshops, ensuring teachers are confident in utilizing basic electronics components, block based kits, advanced robotics kits and programming software. We provide continuous technical support, curriculum updates, and targeted training for National/International robotics & STEM based competitions, ensuring your students consistently perform at the highest levels.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-transform hover:scale-105"
                    >
                        Schedule a Free Lab Consultation
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
