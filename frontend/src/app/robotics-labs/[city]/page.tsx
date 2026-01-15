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
    },
    {
        icon: FaCogs,
        name: "Robotic Arms",
        desc: "Industrial-grade robotic arms for pick and place operations",
    },
    {
        icon: FaMicrochip,
        name: "Autonomous Drones",
        desc: "Program drones for autonomous flight and surveillance",
    },
    {
        icon: FaCode,
        name: "AI-Powered Robots",
        desc: "Robots with machine learning and computer vision capabilities",
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
                <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 pt-32 pb-16">
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
            <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-6">
                                <FaRobot className="w-4 h-4" />
                                Robotics Education
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Robotics Labs in{" "}
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {data.name}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                {data.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                                >
                                    <FaPhone className="w-4 h-4" />
                                    Setup Your Lab
                                </Link>
                                <Link
                                    href="/programs"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-purple-500 transition-all"
                                >
                                    Explore Programs
                                    <FaArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-12 bg-white border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-purple-600">{data.labs}+</div>
                                <div className="text-gray-600">Labs Installed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600">{data.competitions}+</div>
                                <div className="text-gray-600">Competitions Won</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-teal-500">100+</div>
                                <div className="text-gray-600">Trained Teachers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-orange-500">5000+</div>
                                <div className="text-gray-600">Students Trained</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Robot Types */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Types of Robots Students Build
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Our robotics labs in {data.name} enable students to build various types of robots
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {robotTypes.map((robot, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow"
                                >
                                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                                        <robot.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{robot.name}</h3>
                                    <p className="text-gray-600 text-sm">{robot.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Specialties */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Our Robotics Specialties in {data.name}
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.specialties.map((specialty, index) => (
                                <span
                                    key={index}
                                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium shadow-lg"
                                >
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Curriculum */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Comprehensive Robotics Curriculum
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Our robotics curriculum is designed to take students from basics to advanced
                                    level, preparing them for national and international competitions.
                                </p>
                                <div className="space-y-4">
                                    {curriculum.map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <span className="text-gray-700">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
                                <FaTrophy className="w-12 h-12 mb-4 opacity-80" />
                                <h3 className="text-2xl font-bold mb-4">Competition Success</h3>
                                <p className="mb-6 opacity-90">
                                    Our students from {data.name} have won {data.competitions}+ competitions including
                                    WRO, FIRST Robotics, and national robotics olympiads.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    Start Your Journey
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Setup a Robotics Lab in {data.name}?
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            Join leading schools in {data.name} with world-class robotics education facilities.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                            >
                                Request a Demo
                            </Link>
                            <a
                                href="tel:+916356631515"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors"
                            >
                                <FaPhone className="w-4 h-4" />
                                Call: +91 6356631515
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
