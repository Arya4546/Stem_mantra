"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaRobot, FaCogs, FaMicrochip, FaCode,
    FaCheckCircle, FaPhone, FaArrowRight, FaMapMarkerAlt,
    FaTrophy, FaUsers, FaSchool
} from "react-icons/fa";

// City-specific data for Robotics Labs
const cityData: Record<string, {
    name: string;
    state: string;
    description: string;
    specialties: string[];
    labs: number;
    competitions: number;
}> = {
    delhi: {
        name: "Delhi",
        state: "Delhi NCR",
        description: "Delhi leads in robotics education with our state-of-the-art labs featuring Arduino, Raspberry Pi, and advanced drone programming. Our robotics labs in Delhi prepare students for national and international competitions.",
        specialties: ["Industrial Robotics", "Drone Programming", "Arduino Projects", "AI Robotics", "IoT Integration"],
        labs: 65,
        competitions: 25,
    },
    mumbai: {
        name: "Mumbai",
        state: "Maharashtra",
        description: "Mumbai's robotics labs are equipped with cutting-edge technology for building autonomous robots, line followers, and maze solvers. We prepare students for competitions like WRO and FIRST Robotics.",
        specialties: ["Autonomous Robots", "Competition Robotics", "Humanoid Robots", "Marine Robotics", "Swarm Robotics"],
        labs: 58,
        competitions: 20,
    },
    bangalore: {
        name: "Bangalore",
        state: "Karnataka",
        description: "As India's tech capital, Bangalore demands excellence in robotics education. Our labs feature advanced AI-integrated robots, machine learning modules, and industry-grade equipment.",
        specialties: ["AI Robotics", "Machine Learning", "Computer Vision", "ROS Programming", "Industrial Automation"],
        labs: 52,
        competitions: 22,
    },
    hyderabad: {
        name: "Hyderabad",
        state: "Telangana",
        description: "Hyderabad's booming tech sector influences our robotics curriculum. Labs are equipped with advanced sensors, actuators, and programming environments for building smart robots.",
        specialties: ["Sensor Integration", "Smart Robotics", "Agricultural Robots", "Medical Robotics", "Space Robotics"],
        labs: 45,
        competitions: 18,
    },
    chennai: {
        name: "Chennai",
        state: "Tamil Nadu",
        description: "Chennai's strong engineering foundation makes it perfect for advanced robotics education. Our labs include industrial arms, CNC machines, and advanced control systems.",
        specialties: ["Industrial Arms", "CNC Machining", "PLC Programming", "Embedded Systems", "Control Systems"],
        labs: 40,
        competitions: 15,
    },
    pune: {
        name: "Pune",
        state: "Maharashtra",
        description: "Pune's automotive industry inspires our robotics labs. Students learn automotive robotics, assembly line automation, and advanced manufacturing technologies.",
        specialties: ["Automotive Robotics", "Assembly Automation", "3D Printing", "CAD/CAM", "Quality Control"],
        labs: 38,
        competitions: 14,
    },
    lucknow: {
        name: "Lucknow",
        state: "Uttar Pradesh",
        description: "Lucknow is emerging as a robotics education hub. Our labs provide comprehensive training in robotics fundamentals, programming, and hands-on project development.",
        specialties: ["Basic Robotics", "Arduino Programming", "Robot Design", "Sensor Networks", "Mechanical Design"],
        labs: 28,
        competitions: 10,
    },
    noida: {
        name: "Noida",
        state: "Uttar Pradesh",
        description: "Noida's proximity to Delhi and booming tech industry makes it ideal for advanced robotics education. Our labs feature cutting-edge equipment for building autonomous systems and AI-integrated robots.",
        specialties: ["Autonomous Systems", "AI Integration", "IoT Robotics", "Competition Prep", "Advanced Programming"],
        labs: 35,
        competitions: 12,
    },
    gurugram: {
        name: "Gurugram",
        state: "Haryana",
        description: "Gurugram's corporate ecosystem demands world-class robotics education. Our labs are designed to meet international standards with advanced robotics platforms and industry-grade equipment.",
        specialties: ["Enterprise Robotics", "Drone Technology", "AI & ML", "ROS Development", "Industrial IoT"],
        labs: 42,
        competitions: 18,
    },
};

const robotTypes = [
    {
        icon: FaRobot,
        name: "Line Following Robots",
        desc: "Build robots that can autonomously follow paths using sensors",
        accent: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        icon: FaCogs,
        name: "Robotic Arms",
        desc: "Industrial-grade robotic arms for pick and place operations",
        accent: "text-teal-500",
        bg: "bg-teal-50"
    },
    {
        icon: FaMicrochip,
        name: "Autonomous Drones",
        desc: "Program drones for autonomous flight and surveillance",
        accent: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: FaCode,
        name: "AI-Powered Robots",
        desc: "Robots with machine learning and computer vision capabilities",
        accent: "text-purple-500",
        bg: "bg-purple-50"
    },
];

const curriculum = [
    "Introduction to Robotics & Mechanics",
    "Electronics & Circuit Design",
    "Programming (Python, C++, Arduino)",
    "Sensor Integration & Calibration",
    "Motor Control & Actuators",
    "Autonomous Navigation",
    "Computer Vision & AI",
    "Competition Preparation",
];

export default function RoboticsLabCityPage() {
    const params = useParams();
    const city = (params.city as string)?.toLowerCase();
    const data = cityData[city];

    if (!data) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white pt-32 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">City Not Found</h1>
                        <p className="text-gray-600 mb-8">We couldn&apos;t find robotics lab information for this city.</p>
                        <Link href="/" className="text-orange-500 hover:underline">
                            Return to Home
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section — Left aligned, white bg */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm font-semibold mb-6 border border-purple-100">
                                <FaRobot className="w-4 h-4" />
                                {data.state} Robotics Education
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Robotics Labs in <br />
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {data.name}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                                {data.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all shadow-sm"
                                >
                                    <FaPhone className="w-3 h-3" />
                                    Setup Your Lab
                                </Link>
                                <Link
                                    href="/programs"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold border border-gray-200 hover:border-purple-400 transition-all"
                                >
                                    Explore Programs
                                    <FaArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats — Horizontal Strip */}
                <section className="py-8 bg-gray-50 border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-between items-center gap-6 max-w-6xl mx-auto">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">{data.labs}+</div>
                                <div className="text-sm text-gray-500 leading-tight">Labs <br />Installed</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">{data.competitions}+</div>
                                <div className="text-sm text-gray-500 leading-tight">Events <br />Won</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">100+</div>
                                <div className="text-sm text-gray-500 leading-tight">Expert <br />Trainers</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">5k+</div>
                                <div className="text-sm text-gray-500 leading-tight">Active <br />Students</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Robot Types — Clean Grid */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Future-Ready <span className="text-purple-600">Robotics</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl">
                                Our labs in {data.name} provide hands-on experience with diverse robotic systems and technologies.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {robotTypes.map((robot, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all"
                                >
                                    <div className={`w-12 h-12 ${robot.bg} rounded-xl flex items-center justify-center mb-4`}>
                                        <robot.icon className={`w-6 h-6 ${robot.accent}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{robot.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{robot.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Specialties — Tags */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                                Specialized <br /> Modules
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {data.specialties.map((specialty, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium shadow-sm"
                                    >
                                        {specialty}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curriculum & Competition — Split Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">Comprehensive Curriculum</h2>
                                <div className="space-y-4">
                                    {curriculum.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4 group">
                                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                                        <FaTrophy className="w-8 h-8 text-orange-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Competition Excellence</h3>
                                    <p className="text-gray-300 mb-8 leading-relaxed">
                                        Our students from {data.name} have secured {data.competitions}+ podium finishes in
                                        WRO, FIRST Robotics, and National Innovation Challenges.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all"
                                    >
                                        Begin Your Journey
                                        <FaArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                                {/* Decorative geometric element */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA — Boxed Dark Card */}
                <section className="py-20 border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Set Up Your <span className="text-orange-400">Robotics Hub</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                                    Bring world-class robotics education to your school in {data.name}.
                                    Partner with us for equipment, curriculum, and expert training.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20"
                                    >
                                        Schedule a Free Demo
                                    </Link>
                                    <a
                                        href="tel:+916356631515"
                                        className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                                    >
                                        Call Us Directly
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
