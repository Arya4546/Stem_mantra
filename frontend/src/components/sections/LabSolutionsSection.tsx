"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    FaChalkboardTeacher,
    FaTools,
    FaLanguage,
    FaChartLine,
    FaBook,
    FaRobot,
    FaLaptopCode,
    FaPuzzlePiece,
} from "react-icons/fa";

const labFeatures = [
    {
        icon: FaChalkboardTeacher,
        title: "Certified Trainers",
        description: "Expert educators trained to deliver world-class STEM experiences",
        step: "01",
    },
    {
        icon: FaTools,
        title: "Custom Hardware",
        description: "Premium robotics kits and educational hardware tailored for schools",
        step: "02",
    },
    {
        icon: FaLanguage,
        title: "Multilingual Support",
        description: "Curriculum available in Hindi, English, and regional languages",
        step: "03",
    },
    {
        icon: FaLaptopCode,
        title: "AI-Driven Learning",
        description: "Adaptive learning tools powered by artificial intelligence",
        step: "04",
    },
    {
        icon: FaChartLine,
        title: "Performance Analytics",
        description: "Track student progress with detailed reports and insights",
        step: "05",
    },
    {
        icon: FaPuzzlePiece,
        title: "Turnkey Lab Setup",
        description: "Complete end-to-end lab setup with ongoing maintenance",
        step: "06",
    },
    {
        icon: FaBook,
        title: "Aligned Curriculum",
        description: "NEP 2020 and CBSE/ICSE aligned course materials",
        step: "07",
    },
    {
        icon: FaRobot,
        title: "Interactive Courses",
        description: "Hands-on projects that make learning fun and memorable",
        step: "08",
    },
];

const accentColors = [
    "bg-orange-500", "bg-teal-500", "bg-blue-500", "bg-purple-500",
    "bg-pink-500", "bg-green-500", "bg-amber-500", "bg-cyan-500",
];

export default function LabSolutionsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="relative py-16 lg:py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto mb-14"
                >
                    <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                        Complete Lab Solutions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Transform Your School with{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                            World-Class Labs
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        An innovative and comprehensive network of solutions designed to deliver
                        transformational STEM learning experiences.
                    </p>
                </motion.div>

                {/* Horizontal timeline layout */}
                <div className="max-w-6xl mx-auto">
                    {/* Desktop: Horizontal scrollable timeline */}
                    <div className="relative">
                        {/* Timeline connector line */}
                        <div className="hidden md:block absolute top-[52px] left-0 right-0 h-px border-t-2 border-dashed border-gray-300 z-0" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                            {labFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="relative text-center group"
                                >
                                    {/* Step dot on timeline */}
                                    <div className="hidden md:flex w-6 h-6 mx-auto mb-6 relative z-10">
                                        <div className={`w-full h-full rounded-full ${accentColors[index]} shadow-md group-hover:scale-125 transition-transform`} />
                                    </div>

                                    {/* Card */}
                                    <div className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all h-full">
                                        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg ${accentColors[index]} bg-opacity-10 flex items-center justify-center`}>
                                            <feature.icon className={`w-6 h-6 text-gray-700`} />
                                        </div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                                            Step {feature.step}
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-1 text-sm">
                                            {feature.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Highlight bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-10 flex flex-wrap justify-center gap-8 py-4 border-t border-gray-200"
                    >
                        {[
                            { value: "100%", label: "School Satisfaction" },
                            { value: "24/7", label: "Support Available" },
                            { value: "NEP 2020", label: "Fully Aligned" },
                            { value: "500+", label: "Labs Installed" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
