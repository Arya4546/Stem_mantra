"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
    FaRobot,
    FaMicrochip,
    FaLaptopCode,
    FaPrint,
    FaCheckCircle,
    FaArrowRight,
} from "react-icons/fa";

const labTypes = [
    {
        icon: FaRobot,
        title: "Robotics Labs",
        description: "Complete robotics laboratory setup with industrial-grade robots, programming interfaces, and hands-on training modules for students of all ages.",
        features: ["Arduino & Raspberry Pi", "Industrial Robots", "Sensor Integration", "Programming Courses"],
        accentColor: "border-l-orange-500",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
        size: "large",
    },
    {
        icon: FaMicrochip,
        title: "AI & ML Labs",
        description: "State-of-the-art artificial intelligence and machine learning labs equipped with GPU workstations, deep learning frameworks, and real-world project modules.",
        features: ["TensorFlow & PyTorch", "Computer Vision", "NLP Projects", "GPU Computing"],
        accentColor: "border-l-teal-500",
        iconBg: "bg-teal-50",
        iconColor: "text-teal-600",
        size: "large",
    },
    {
        icon: FaLaptopCode,
        title: "ATL Labs",
        description: "Atal Tinkering Labs designed to foster innovation and entrepreneurship among students with 3D printers, IoT devices, and maker tools.",
        features: ["3D Printing", "IoT Devices", "Electronics Kits", "Innovation Hub"],
        accentColor: "border-l-blue-500",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        size: "small",
    },
    {
        icon: FaPrint,
        title: "STEM Labs",
        description: "Integrated Science, Technology, Engineering and Mathematics laboratories promoting experiential learning through hands-on experiments.",
        features: ["Science Kits", "Math Manipulatives", "Engineering Models", "Tech Tools"],
        accentColor: "border-l-purple-500",
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
        size: "small",
    },
];

const benefits = [
    "NEP 2020 aligned curriculum designed by IIT/NIT experts",
    "Complete turnkey solution - equipment, training, and maintenance",
    "Certified trainers with 5+ years of teaching experience",
    "Continuous assessment and progress tracking dashboard",
    "Competition preparation for national and international olympiads",
    "Lifetime curriculum updates and technical support",
];

export default function WhyChooseUsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} className="relative py-16 lg:py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header — Left aligned */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                        India&apos;s Most Trusted STEM Partner
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Why Schools Choose{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                            STEMmantra
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        <strong>STEMmantra</strong> is India&apos;s leading provider of robotics, artificial intelligence,
                        and STEM education solutions for schools across the country. With over <strong>10+ years of leadership experience</strong>
                        {" "}and partnerships with <strong>500+ schools</strong> in <strong>15+ states</strong>.
                    </p>
                </motion.div>

                {/* Bento Grid — 2 large + 2 small */}
                <div className="grid md:grid-cols-2 gap-5 mb-12">
                    {labTypes.map((lab, index) => (
                        <motion.div
                            key={lab.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className={`border-l-4 ${lab.accentColor} bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 ${lab.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                    <lab.icon className={`w-6 h-6 ${lab.iconColor}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{lab.title}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{lab.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {lab.features.map((feature) => (
                                            <span key={feature} className="px-2.5 py-1 bg-white text-gray-600 rounded-md text-xs border border-gray-200">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits — Side-by-side strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="grid lg:grid-cols-5 gap-8 items-start bg-gray-50 rounded-2xl p-8"
                >
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                            Complete STEM Education Ecosystem
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            We don&apos;t just set up labs – we build complete STEM education ecosystems with continuous support.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold text-sm hover:bg-orange-600 transition-colors"
                        >
                            Get Started Today
                            <FaArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="lg:col-span-3 grid sm:grid-cols-2 gap-3">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                                className="flex items-start gap-2"
                            >
                                <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{benefit}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* SEO Rich Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 max-w-4xl"
                >
                    <div className="prose prose-gray max-w-none text-gray-600 text-sm leading-relaxed">
                        <p>
                            Our <strong>robotics education program</strong> covers everything from basic electronics
                            and programming to advanced topics like computer vision, natural language processing,
                            and autonomous systems. Students learn by building real projects.
                        </p>
                        <p>
                            With our <strong>Atal Tinkering Lab setup services</strong>, we help schools establish
                            innovation centers that comply with NITI Aayog guidelines. Our ATL labs come equipped
                            with 3D printers, laser cutters, electronics workstations, and maker tools.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
