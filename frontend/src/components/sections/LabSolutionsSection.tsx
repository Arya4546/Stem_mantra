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
import { Sparkles } from "lucide-react";

const labFeatures = [
    {
        icon: FaChalkboardTeacher,
        title: "Certified Trainers",
        description: "Expert educators trained to deliver world-class STEM experiences",
        position: "left-top",
        color: "border-orange-400",
    },
    {
        icon: FaTools,
        title: "Custom Hardware",
        description: "Premium robotics kits and educational hardware tailored for schools",
        position: "right-top",
        color: "border-teal-400",
    },
    {
        icon: FaLanguage,
        title: "Multilingual Support",
        description: "Curriculum available in Hindi, English, and regional languages",
        position: "left-middle",
        color: "border-blue-400",
    },
    {
        icon: FaLaptopCode,
        title: "AI-Driven Learning",
        description: "Adaptive learning tools powered by artificial intelligence",
        position: "right-middle",
        color: "border-purple-400",
    },
    {
        icon: FaChartLine,
        title: "Performance Analytics",
        description: "Track student progress with detailed reports and insights",
        position: "left-bottom",
        color: "border-pink-400",
    },
    {
        icon: FaPuzzlePiece,
        title: "Turnkey Lab Setup",
        description: "Complete end-to-end lab setup with ongoing maintenance",
        position: "right-bottom",
        color: "border-green-400",
    },
    {
        icon: FaBook,
        title: "Aligned Curriculum",
        description: "NEP 2020 and CBSE/ICSE aligned course materials",
        position: "left-last",
        color: "border-amber-400",
    },
    {
        icon: FaRobot,
        title: "Interactive Courses",
        description: "Hands-on projects that make learning fun and memorable",
        position: "right-last",
        color: "border-cyan-400",
    },
];

export default function LabSolutionsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="relative py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/30 to-teal-100/30 rounded-full blur-3xl -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-100 to-teal-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                        <Sparkles className="w-4 h-4" />
                        Complete Lab Solutions
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Transform Your School with{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                            World-Class Labs
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        An innovative and comprehensive network of solutions designed to deliver
                        transformational STEM learning experiences in your school.
                    </p>
                </motion.div>

                {/* Circular Lab Solutions Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {labFeatures
                                .filter((_, i) => i % 2 === 0)
                                .map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <div className={`flex items-center gap-4 p-4 bg-white rounded-2xl border-2 ${feature.color} shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-x-1`}>
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                <feature.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {labFeatures
                                .filter((_, i) => i % 2 === 1)
                                .map((feature, index) => (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                                        className="group"
                                    >
                                        <div className={`flex items-center gap-4 p-4 bg-white rounded-2xl border-2 ${feature.color} shadow-md hover:shadow-xl transition-all duration-300 hover:translate-x-1`}>
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                                <feature.icon className="w-7 h-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                        </div>
                    </div>

                    {/* Center Logo - Mobile visible, Desktop absolute center */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex justify-center mt-10"
                    >
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                                    <img
                                        src="/images/logo.png"
                                        alt="STEMmantra"
                                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                    />
                                </div>
                            </div>
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 rounded-full border-4 border-orange-400/30 animate-ping" />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                >
                    {[
                        { value: "100%", label: "School Satisfaction" },
                        { value: "24/7", label: "Support Available" },
                        { value: "NEP 2020", label: "Fully Aligned" },
                        { value: "500+", label: "Labs Installed" },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
