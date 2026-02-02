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
import { Sparkles, GraduationCap, Trophy, Users } from "lucide-react";

const labTypes = [
    {
        icon: FaRobot,
        title: "Robotics Labs",
        description: "Complete robotics laboratory setup with industrial-grade robots, programming interfaces, and hands-on training modules for students of all ages.",
        features: ["Arduino & Raspberry Pi", "Industrial Robots", "Sensor Integration", "Programming Courses"],
        color: "from-orange-500 to-orange-600",
    },
    {
        icon: FaMicrochip,
        title: "AI & ML Labs",
        description: "State-of-the-art artificial intelligence and machine learning labs equipped with GPU workstations, deep learning frameworks, and real-world project modules.",
        features: ["TensorFlow & PyTorch", "Computer Vision", "NLP Projects", "GPU Computing"],
        color: "from-teal-500 to-teal-600",
    },
    {
        icon: FaLaptopCode,
        title: "ATL Labs",
        description: "Atal Tinkering Labs designed to foster innovation and entrepreneurship among students with 3D printers, IoT devices, and maker tools.",
        features: ["3D Printing", "IoT Devices", "Electronics Kits", "Innovation Hub"],
        color: "from-blue-500 to-blue-600",
    },
    {
        icon: FaPrint,
        title: "STEM Labs",
        description: "Integrated Science, Technology, Engineering and Mathematics laboratories promoting experiential learning through hands-on experiments and projects.",
        features: ["Science Kits", "Math Manipulatives", "Engineering Models", "Tech Tools"],
        color: "from-purple-500 to-purple-600",
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
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-100/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-teal-100/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="text-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                            <Sparkles className="w-4 h-4" />
                            India&apos;s Most Trusted STEM Partner
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Why Schools Choose{" "}
                            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                                STEMmantra
                            </span>
                        </h2>
                    </div>

                    {/* SEO Content Paragraph */}
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        <strong>STEMmantra</strong> is India&apos;s leading provider of robotics, artificial intelligence,
                        and STEM education solutions for schools across the country. With over <strong>6 years of experience</strong>
                        and partnerships with <strong>500+ schools</strong> in <strong>15+ states</strong>, we have trained
                        more than <strong>10,000 students</strong> in cutting-edge technologies including robotics programming,
                        machine learning, IoT, 3D printing, and more.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our <strong>NEP 2020 aligned curriculum</strong> is designed by experts from IIT and NIT to ensure
                        students receive world-class education that prepares them for the future. From <strong>Atal Tinkering Labs (ATL)</strong>
                        to advanced <strong>AI & Robotics Labs</strong>, we provide complete turnkey solutions including
                        equipment, installation, teacher training, curriculum, and ongoing support.
                    </p>
                </motion.div>

                {/* Lab Types Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {labTypes.map((lab, index) => (
                        <motion.div
                            key={lab.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lab.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                                    <lab.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                        {lab.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">{lab.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {lab.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Benefits Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12"
                >
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                Complete STEM Education Ecosystem
                            </h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                We don&apos;t just set up labs – we build complete STEM education ecosystems.
                                Our comprehensive approach includes curriculum development, teacher training,
                                student assessments, competition preparation, and continuous support to ensure
                                maximum learning outcomes for your students.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="text-center p-4 bg-white/10 rounded-xl">
                                    <GraduationCap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">10,000+</div>
                                    <div className="text-sm text-gray-400">Students Trained</div>
                                </div>
                                <div className="text-center p-4 bg-white/10 rounded-xl">
                                    <Trophy className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">50+</div>
                                    <div className="text-sm text-gray-400">Awards Won</div>
                                </div>
                                <div className="text-center p-4 bg-white/10 rounded-xl">
                                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">200+</div>
                                    <div className="text-sm text-gray-400">Expert Trainers</div>
                                </div>
                                <div className="text-center p-4 bg-white/10 rounded-xl">
                                    <FaRobot className="w-8 h-8 text-purple-400 mx-auto" />
                                    <div className="text-2xl font-bold text-white mt-2">500+</div>
                                    <div className="text-sm text-gray-400">Labs Installed</div>
                                </div>
                            </div>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Get Started Today
                                <FaArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-white mb-6">What You Get</h4>
                            <div className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FaCheckCircle className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-gray-300">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SEO Rich Text Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 max-w-4xl mx-auto"
                >
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                        Transforming Education Across India
                    </h3>
                    <div className="prose prose-lg max-w-none text-gray-600">
                        <p>
                            At <strong>STEMmantra</strong>, we believe every student deserves access to quality
                            technology education. That&apos;s why we&apos;ve designed our programs to be accessible
                            to schools of all sizes – from small private institutions to large government schools.
                        </p>
                        <p>
                            Our <strong>robotics education program</strong> covers everything from basic electronics
                            and programming to advanced topics like computer vision, natural language processing,
                            and autonomous systems. Students learn by building real projects – from line-following
                            robots to AI-powered chatbots.
                        </p>
                        <p>
                            With our <strong>Atal Tinkering Lab setup services</strong>, we help schools establish
                            innovation centers that comply with NITI Aayog guidelines. Our ATL labs come equipped
                            with 3D printers, laser cutters, electronics workstations, and maker tools that inspire
                            creativity and entrepreneurship.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
