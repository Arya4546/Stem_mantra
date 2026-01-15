"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaRobot, FaFlask, FaLaptopCode, FaCogs, FaCube, FaMicrochip, FaTools,
    FaCheckCircle, FaPhone, FaArrowRight, FaLightbulb, FaGraduationCap
} from "react-icons/fa";

// Lab type data
const labTypes: Record<string, {
    name: string;
    fullName: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
    longDescription: string;
    equipment: string[];
    subjects: string[];
    ageGroup: string;
    benefits: string[];
    investment: string;
}> = {
    atl: {
        name: "ATL",
        fullName: "Atal Tinkering Labs",
        icon: FaLightbulb,
        color: "from-orange-500 to-red-500",
        description: "Government of India initiative to foster innovation and entrepreneurship among students",
        longDescription: "Atal Tinkering Labs (ATL) are workspaces where students can explore science, technology, engineering, and mathematics (STEM) concepts. Part of the Atal Innovation Mission by NITI Aayog, these labs provide students access to cutting-edge equipment like 3D printers, robotics kits, electronics, and IoT devices to foster creativity and innovation.",
        equipment: ["3D Printers", "Robotics Kits", "Electronics Components", "IoT Sensors", "Microcontrollers", "Hand Tools", "Workbenches", "Computers"],
        subjects: ["Design Thinking", "Prototyping", "Electronics", "Coding", "Innovation", "Entrepreneurship"],
        ageGroup: "Class 6 to Class 12",
        benefits: ["Government supported initiative", "Access to latest technology", "Innovation competitions", "Mentorship programs", "Startup ecosystem exposure", "National recognition"],
        investment: "₹10-20 Lakhs",
    },
    "robotics-ai": {
        name: "Robotics & AI",
        fullName: "Robotics & Artificial Intelligence Labs",
        icon: FaRobot,
        color: "from-purple-600 to-blue-600",
        description: "Advanced labs for building intelligent robots and AI-powered systems",
        longDescription: "Our Robotics & AI Labs combine the best of mechanical engineering, electronics, and artificial intelligence. Students learn to build autonomous robots that can see, think, and act. From basic line followers to advanced humanoid robots with computer vision, these labs prepare students for the future of automation.",
        equipment: ["Robot Kits (Basic to Advanced)", "AI Computing Modules", "Camera Systems", "Servo Motors", "Sensors Array", "Neural Network Processors", "Simulation Software"],
        subjects: ["Robotics", "Machine Learning", "Computer Vision", "Natural Language Processing", "Neural Networks", "Automation"],
        ageGroup: "Class 5 to Class 12",
        benefits: ["Industry-relevant skills", "Competition preparation", "Career readiness", "Research opportunities", "Global recognition", "Innovation mindset"],
        investment: "₹15-30 Lakhs",
    },
    "stem-innovation": {
        name: "STEM Innovation",
        fullName: "STEM Innovation Labs",
        icon: FaFlask,
        color: "from-teal-500 to-green-500",
        description: "Comprehensive labs covering Science, Technology, Engineering, and Mathematics",
        longDescription: "STEM Innovation Labs provide a holistic learning environment where students explore the interconnection between Science, Technology, Engineering, and Mathematics. These labs feature hands-on experiments, project-based learning, and real-world problem solving that prepare students for 21st-century challenges.",
        equipment: ["Science Experiment Kits", "Technology Tools", "Engineering Models", "Math Manipulatives", "Robotics Components", "Coding Stations", "Virtual Labs"],
        subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Engineering Design", "Technology Literacy"],
        ageGroup: "Class 1 to Class 12",
        benefits: ["NEP 2020 aligned", "Integrated learning", "Critical thinking", "Problem solving", "Scientific temper", "Holistic development"],
        investment: "₹8-15 Lakhs",
    },
    coding: {
        name: "Coding",
        fullName: "Coding & Programming Labs",
        icon: FaLaptopCode,
        color: "from-blue-500 to-cyan-500",
        description: "State-of-the-art computer labs for learning programming and software development",
        longDescription: "Our Coding Labs are designed to transform students into proficient programmers. From block-based coding for beginners to advanced Python, Java, and web development for seniors, these labs provide a structured pathway to software development mastery with industry-standard tools and environments.",
        equipment: ["High-Performance Computers", "Multiple Monitors", "Version Control Systems", "Cloud Computing Access", "Development IDEs", "Testing Frameworks", "Collaboration Tools"],
        subjects: ["Scratch", "Python", "Java", "Web Development", "App Development", "Game Development", "Data Science"],
        ageGroup: "Class 1 to Class 12",
        benefits: ["Industry-ready skills", "Logical thinking", "Problem decomposition", "Career opportunities", "Global language", "Creative expression"],
        investment: "₹5-12 Lakhs",
    },
    "3d-printing": {
        name: "3D Printing",
        fullName: "3D Printing & Additive Manufacturing Labs",
        icon: FaCube,
        color: "from-pink-500 to-purple-500",
        description: "Modern fabrication labs with industrial 3D printers and CAD software",
        longDescription: "3D Printing Labs bring manufacturing into the classroom. Students learn Computer-Aided Design (CAD), understand material science, and create physical prototypes of their ideas. From jewelry design to mechanical parts, these labs enable students to transform digital designs into tangible objects.",
        equipment: ["FDM 3D Printers", "Resin Printers", "CAD Workstations", "Slicing Software", "Finishing Tools", "Material Storage", "Post-Processing Equipment"],
        subjects: ["CAD Design", "3D Modeling", "Material Science", "Product Design", "Rapid Prototyping", "Manufacturing"],
        ageGroup: "Class 5 to Class 12",
        benefits: ["Design thinking", "Spatial visualization", "Prototyping skills", "Manufacturing awareness", "Entrepreneurship", "Innovation"],
        investment: "₹8-20 Lakhs",
    },
    "iot-electronics": {
        name: "IoT & Electronics",
        fullName: "IoT & Electronics Labs",
        icon: FaMicrochip,
        color: "from-green-600 to-teal-600",
        description: "Labs focused on Internet of Things, embedded systems, and electronic circuit design",
        longDescription: "IoT & Electronics Labs introduce students to the connected world of smart devices. From building simple circuits to creating complex IoT solutions that monitor and control the physical world, students learn electronics fundamentals, sensor integration, and cloud connectivity.",
        equipment: ["Arduino Boards", "Raspberry Pi", "IoT Sensors", "Actuators", "Breadboards", "Oscilloscopes", "Soldering Stations", "Cloud Platforms"],
        subjects: ["Electronics", "Circuit Design", "Embedded Systems", "IoT Protocols", "Cloud Computing", "Smart Systems"],
        ageGroup: "Class 6 to Class 12",
        benefits: ["Practical electronics", "System thinking", "Industry 4.0 ready", "Innovation skills", "Problem solving", "Future technologies"],
        investment: "₹6-15 Lakhs",
    },
    "maker-space": {
        name: "Maker Space",
        fullName: "Maker Space Labs",
        icon: FaTools,
        color: "from-yellow-500 to-orange-500",
        description: "Creative workshops for hands-on making, crafting, and prototype development",
        longDescription: "Maker Spaces are creative workshops where imagination meets reality. These labs combine traditional craftsmanship with modern technology, allowing students to work with wood, metal, textiles, electronics, and digital fabrication tools to create anything they can imagine.",
        equipment: ["Hand Tools", "Power Tools", "Laser Cutters", "CNC Machines", "Sewing Machines", "Craft Supplies", "Electronics Workbench", "Safety Equipment"],
        subjects: ["Woodworking", "Metalworking", "Textile Design", "Electronics", "Digital Fabrication", "Product Design"],
        ageGroup: "Class 3 to Class 12",
        benefits: ["Hands-on learning", "Creativity boost", "Self-expression", "Practical skills", "Confidence building", "Entrepreneurship"],
        investment: "₹10-25 Lakhs",
    },
};

export default function LabTypePage() {
    const params = useParams();
    const type = (params.type as string)?.toLowerCase();
    const data = labTypes[type];

    if (!data) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 pt-32 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lab Type Not Found</h1>
                        <p className="text-gray-600 mb-8">We couldn&apos;t find information for this lab type.</p>
                        <Link href="/" className="text-orange-500 hover:underline">
                            Return to Home
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const IconComponent = data.icon;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-10`} />
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${data.color} rounded-2xl mb-6`}>
                                <IconComponent className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                {data.fullName}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                {data.longDescription}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${data.color} text-white rounded-xl font-semibold hover:shadow-xl transition-all`}
                                >
                                    <FaPhone className="w-4 h-4" />
                                    Get a Quote
                                </Link>
                                <Link
                                    href="/programs"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-orange-500 transition-all"
                                >
                                    View Programs
                                    <FaArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Info */}
                <section className="py-12 bg-white border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <FaGraduationCap className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                                <div className="text-lg font-bold text-gray-900">Age Group</div>
                                <div className="text-gray-600">{data.ageGroup}</div>
                            </div>
                            <div className="text-center">
                                <FaCogs className="w-8 h-8 mx-auto text-teal-500 mb-2" />
                                <div className="text-lg font-bold text-gray-900">Equipment</div>
                                <div className="text-gray-600">{data.equipment.length}+ Items</div>
                            </div>
                            <div className="text-center">
                                <FaLightbulb className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                                <div className="text-lg font-bold text-gray-900">Investment</div>
                                <div className="text-gray-600">{data.investment}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Equipment */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                            Lab Equipment Included
                        </h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {data.equipment.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center"
                                >
                                    <FaCheckCircle className="w-5 h-5 text-green-500 mx-auto mb-2" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subjects */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                            Subjects Covered
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.subjects.map((subject, index) => (
                                <span
                                    key={index}
                                    className={`px-6 py-3 bg-gradient-to-r ${data.color} text-white rounded-full font-medium shadow-lg`}
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Benefits of {data.name} Labs
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    {data.description}. Our comprehensive solutions ensure your school gets
                                    the best learning environment for students.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {data.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`bg-gradient-to-br ${data.color} rounded-3xl p-8 text-white`}>
                                <h3 className="text-2xl font-bold mb-4">Complete Turnkey Solution</h3>
                                <p className="mb-6 opacity-90">
                                    We provide everything from lab design and equipment to curriculum
                                    development and teacher training. Just provide the space!
                                </p>
                                <ul className="space-y-2 mb-6">
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4" />
                                        Lab Design & Setup
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4" />
                                        Equipment & Materials
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4" />
                                        Curriculum & Training
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4" />
                                        Annual Maintenance
                                    </li>
                                </ul>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Setup a {data.name} Lab?
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            Transform your school with our comprehensive {data.fullName} solutions.
                            Contact us for a free consultation and customized quote.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${data.color} text-white rounded-xl font-semibold hover:shadow-xl transition-all`}
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
