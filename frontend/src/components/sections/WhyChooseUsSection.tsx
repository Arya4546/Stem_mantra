"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const corePillars = [
    {
        title: "Comprehensive Turnkey Implementation",
        description: "We eliminate the friction of adopting new technology. STEMmantra handles the entirety of your lab setup—procuring equipment, installing lab software, and providing continuous maintenance so your educators can focus on what they do best training.",
        colorClass: "text-orange-600",
        gradientClass: "from-orange-500"
    },
    {
        title: "Expert Educator Training and Certification",
        description: "Technology is only as effective as the educators wielding it. We conduct intensive, multi-modal training programs for your existing staff, supplemented by our own certified STEM trainers. Our goal is to build long-term institutional capacity rather than short-term reliance.",
        colorClass: "text-blue-600",
        gradientClass: "from-blue-500"
    },
    {
        title: "National STEM Competition Readiness",
        description: "We actively prepare your student body for prestigious national and international robotics, AI, and coding competitions. Our advanced competitive curriculum ensures your institution stands out as a beacon of academic and technical excellence.",
        colorClass: "text-teal-600",
        gradientClass: "from-teal-500"
    },
    {
        title: "National Education Policy (NEP 2020) Alignment",
        description: "Every curriculum module, from Basic electronic to robotics, Robotics to IoT, IoT to AI & Coding technology, is strictly designed around the NEP 2020 framework. We ensure that your school not only meets government standards but excels in delivering 21st-century skills such as critical thinking, logical thinking, algorithmic reasoning, and collaborative problem-solving.",
        colorClass: "text-purple-600",
        gradientClass: "from-purple-500"
    },
    {
        title: "National Curriculum Framework (NCF-2023) Compliance",
        description: "STEMMANTRA Technologies enables experiential and competency-based learning through Robotics, STEM/STEAM, AI & Coding, and IoT labs. Our solutions foster critical thinking, problem-solving, and hands-on learning as recommended by NCF-2023. We provide end-to-end support including lab setup, curriculum integration, and teacher training. STEMMANTRA empowers schools to effectively implement next-generation education practices.",
        colorClass: "text-indigo-600",
        gradientClass: "from-indigo-500"
    }
];

export default function WhyChooseUsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="relative py-20 lg:py-28 bg-gray-50 overflow-hidden border-t border-gray-100">
            {/* Keeping floating animations as requested */}
            <FloatingAnimations variant="about" density="low" />

            <div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">

                {/* Section Header - Centered Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 mb-6 mx-auto">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                        <span className="text-sm font-bold text-orange-700 uppercase tracking-wider">India&apos;s Academic Partner</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight text-center">
                        Why Top Indian Schools Choose <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">STEMmantra</span>
                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto text-center">
                        With over a decade experience leadership team, STEMmantra has been the trusted catalyst for educational transformation.
                        We don&apos;t just sell equipment; we partner with forward-thinking institutions to architect
                        comprehensive, future-proof ecosystems in <strong className="text-gray-900">Robotics, STEM/STEAM, Artificial Intelligence &amp; Coding</strong>.
                    </p>
                </motion.div>

                {/* Content Layout - Split 50/50 without cards */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left side: The Pillars (Text heavy) */}
                    <div className="space-y-12">
                        {corePillars.map((pillar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="relative pl-6"
                            >
                                <div className={`absolute left-0 top-1.5 bottom-0 w-1 bg-gradient-to-b ${pillar.gradientClass} to-transparent rounded-full`}></div>
                                <h3 className={`text-2xl md:text-3xl font-black ${pillar.colorClass} mb-3 tracking-tight`}>{pillar.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right side: SEO Text Block & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white p-8 md:p-12 lg:sticky lg:top-32 shadow-xl shadow-orange-900/5 rounded-3xl border border-orange-100/50"
                    >
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-6">The STEMmantra Advantage</h3>

                        <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
                            <p>
                                Implementing an effectively functioning <strong>Atal Tinkering Lab (ATL)</strong> or
                                dedicated <strong>Robotics and AI &amp; Coding Laboratory</strong> requires specialized pedagogical expertise.
                                Many schools struggle with underutilized equipment due to a lack of proper curriculum integration.
                            </p>
                            <p>
                                STEMmantra solves this by providing proprietary, grade-level appropriate learning modules
                                that span from foundational block-based coding to intermediate level to advanced Robotics,AI &amp; machine learning utilizing Python.
                                We guarantee that every piece of hardware—from simple Arduino boards to complex equipment&apos;s to drone&amp; 3-D printing kits—is
                                actively utilized in student-led innovation projects.
                            </p>
                        </div>

                        <ul className="space-y-4 mb-10">
                            {[
                                "Customised curriculum for grades 3 to 12",
                                "Annual maintenance and hardware replacement contracts",
                                "Direct mentor-ship from industry engineers",
                                "Seamless academic integration with existing subjects",
                                "LMS-Learning Managemnt sysytem to support teachers"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-lg font-medium text-gray-800">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/about"
                            className="group flex w-full items-center justify-center gap-3 px-8 py-5 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all text-lg"
                        >
                            Read Our Success Stories <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
