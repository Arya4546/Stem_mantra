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
        color: "var(--color-accent)",
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
        color: "var(--color-primary)",
    }
];

export default function LabSolutionsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="relative overflow-hidden border-t" style={{ paddingTop: 'var(--space-4)', paddingBottom: 'var(--space-section)', backgroundColor: 'var(--color-white)', borderColor: 'var(--color-border)' }}>
            <FloatingAnimations variant="stem" density="low" />

            <div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
                <div className="items-center mt-12">
                    {/* Centered Heavy SEO Text & Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md mb-6 mx-auto" style={{ backgroundColor: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-primary)' }}></span>
                            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>End-to-End Lab Solutions</span>
                        </div>

                        <h2 className="font-heading mb-6 leading-tight tracking-tight text-center" style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text-primary)' }}>
                            Transform Your School with <span style={{ color: 'var(--color-accent)' }}>World-Class STEM/Robotics Labs</span>
                        </h2>

                        <div className="max-w-none text-left md:text-justify leading-relaxed mt-8 mb-8 mx-auto" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                            <p className="mb-6">
                                At STEMmantra, we recognise that practical, hands-on learning is the cornerstone of modern education.
                                Our comprehensive laboratory solutions are engineered to seamlessly integrate into your school&apos;s curriculum,
                                providing a robust foundation in <strong style={{ color: 'var(--color-text-primary)' }}>Robotics, Artificial Intelligence, Coding, and IoT, Drone, 3-D Printing</strong>.
                            </p>
                            <p className="mb-6">
                                We don&apos;t just supply equipment; we architect complete learning ecosystems. From initial spatial planning and
                                hardware installation to rigorous teacher training and curriculum alignment with <strong style={{ color: 'var(--color-text-primary)' }}>NEP 2020 & </strong> <strong style={{ color: 'var(--color-text-primary)' }}>NCF 2023</strong> standards, our turnkey solutions ensure that your institution remains at the forefront of pedagogical innovation.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-8 justify-center pt-8 border-t w-full" style={{ borderColor: 'var(--color-border)' }}>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-heading" style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}>300+</span>
                                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>Labs Installed</span>
                            </div>
                            <div className="w-px h-16 hidden sm:block mt-2" style={{ backgroundColor: 'var(--color-border)' }}></div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="font-heading" style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}>100%</span>
                                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-secondary)' }}>NEP 2020 & NCF 2023 Aligned</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Why Partner With Us — Editorial two-column */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 pt-16 border-t w-full"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        <div className="lg:col-span-2 flex flex-col items-start">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md mb-6" style={{ backgroundColor: 'var(--color-accent-light)', border: '1px solid var(--color-border)' }}>
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }}></span>
                                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-accent-dark)' }}>Partnership</span>
                            </div>

                            <h2 className="font-heading mb-6 leading-tight tracking-tight" style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}>
                                Why <span style={{ color: 'var(--color-accent)' }}>Partner With Us</span> for Lab Integration?
                            </h2>

                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-md mt-4"
                                style={{ backgroundColor: 'var(--color-primary)' }}
                            >
                                Schedule a Free Lab Consultation
                            </Link>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="leading-relaxed" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                                <p>
                                    Building a successful STEM Lab ecosystem requires more than just unpacking boxes of equipment. Our dedicated success team conducts in-depth educator workshops, ensuring teachers are confident in utilizing basic electronics components, block based kits, advanced robotics kits and programming software. We provide continuous technical support, curriculum updates, and targeted training for National/International robotics & STEM based competitions, ensuring your students consistently perform at the highest levels.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
