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
      <>
        <section ref={ref} className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
            {/* Keeping floating animations as requested */}
            <FloatingAnimations variant="stem" density="low" />

            <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">

                {/* End-to-end solutions — text left, impact stats right */}
                <div className="grid lg:grid-cols-12 fit-gap gap-10 lg:gap-14 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-7"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 mb-5">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                            <span className="text-sm font-bold text-teal-700 uppercase tracking-wider">End-to-End Lab Solutions</span>
                        </div>

                        <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                            Transform Your School with <span className="text-orange-500">World-Class STEM/Robotics Labs</span>
                        </h2>

                        <div className="fit-stack space-y-5 text-gray-600 text-base md:text-lg fit-lead leading-relaxed">
                            <p>
                                At STEMmantra, we recognise that practical, hands-on learning is the cornerstone of modern education.
                                Our comprehensive laboratory solutions are engineered to seamlessly integrate into your school&apos;s curriculum,
                                providing a robust foundation in <strong className="text-gray-900">Robotics, Artificial Intelligence, Coding, and IoT, Drone, 3-D Printing</strong>.
                            </p>
                            <p>
                                We don&apos;t just supply equipment; we architect complete learning ecosystems. From initial spatial planning and
                                hardware installation to rigorous teacher training and curriculum alignment with <strong className="text-gray-900">NEP 2020 &amp; NCF 2023</strong> standards, our turnkey solutions ensure that your institution remains at the forefront of pedagogical innovation.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-5"
                    >
                        {[
                            { value: "300+", label: "Labs Installed", tint: "from-orange-500 to-amber-500" },
                            { value: "100%", label: "NEP 2020 & NCF 2023 Aligned", tint: "from-teal-500 to-emerald-500" },
                        ].map((stat) => (
                            <div key={stat.label} className="relative overflow-hidden flex items-center gap-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow fit-pad p-7 lg:p-8">
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${stat.tint}`} />
                                <span className={`fit-num text-5xl lg:text-6xl font-black bg-gradient-to-r ${stat.tint} bg-clip-text text-transparent leading-none`}>{stat.value}</span>
                                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider leading-snug">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>

        {/* Frame 2: partnership */}
        <section className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
            <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
                {/* Partnership — heading left, description + CTA right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg p-8 md:p-12 fit-pad grid lg:grid-cols-12 fit-gap gap-8 lg:gap-14 items-center"
                >
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />
                    <div className="lg:col-span-5 relative">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 mb-5">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">Partnership</span>
                        </div>
                        <h2 className="fit-h2 text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight">
                            Why <span className="text-orange-500">Partner With Us</span> for Lab Integration?
                        </h2>
                    </div>
                    <div className="lg:col-span-7 relative">
                        <p className="fit-lead text-gray-600 text-base md:text-lg leading-relaxed mb-8 fit-mb">
                            Building a successful STEM Lab ecosystem requires more than just unpacking boxes of equipment. Our dedicated success team conducts in-depth educator workshops, ensuring teachers are confident in utilizing basic electronics components, block based kits, advanced robotics kits and programming software. We provide continuous technical support, curriculum updates, and targeted training for National/International robotics &amp; STEM based competitions, ensuring your students consistently perform at the highest levels.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-all hover:-translate-y-0.5"
                        >
                            Schedule a Free Lab Consultation
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
      </>
    );
}
