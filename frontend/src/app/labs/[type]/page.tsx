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

const labTypes: Record<string, {
    name: string; fullName: string; icon: React.ComponentType<{ className?: string }>;
    description: string; longDescription: string; equipment: string[];
    subjects: string[]; ageGroup: string; benefits: string[]; investment: string;
    accent: string; accentBg: string; accentText: string;
}> = {
    atl: {
        name: "ATL", fullName: "Atal Tinkering Labs", icon: FaLightbulb,
        accent: "border-l-orange-500", accentBg: "bg-orange-50", accentText: "text-orange-600",
        description: "Government of India initiative to foster innovation and entrepreneurship among students",
        longDescription: "Atal Tinkering Labs (ATL) are workspaces where students can explore science, technology, engineering, and mathematics (STEM) concepts. Part of the Atal Innovation Mission by NITI Aayog, these labs provide students access to cutting-edge equipment like 3D printers, robotics kits, electronics, and IoT devices to foster creativity and innovation.",
        equipment: ["3D Printers", "Robotics Kits", "Electronics Components", "IoT Sensors", "Microcontrollers", "Hand Tools", "Workbenches", "Computers"],
        subjects: ["Design Thinking", "Prototyping", "Electronics", "Coding", "Innovation", "Entrepreneurship"],
        ageGroup: "Class 6 to Class 12", benefits: ["Government supported initiative", "Access to latest technology", "Innovation competitions", "Mentorship programs", "Startup ecosystem exposure", "National recognition"],
        investment: "₹10-20 Lakhs",
    },
    "robotics-ai": {
        name: "Robotics & AI", fullName: "Robotics & Artificial Intelligence Labs", icon: FaRobot,
        accent: "border-l-purple-500", accentBg: "bg-purple-50", accentText: "text-purple-600",
        description: "Advanced labs for building intelligent robots and AI-powered systems",
        longDescription: "Our Robotics & AI Labs combine the best of mechanical engineering, electronics, and artificial intelligence. Students learn to build autonomous robots that can see, think, and act. From basic line followers to advanced humanoid robots with computer vision, these labs prepare students for the future of automation.",
        equipment: ["Robot Kits (Basic to Advanced)", "AI Computing Modules", "Camera Systems", "Servo Motors", "Sensors Array", "Neural Network Processors", "Simulation Software"],
        subjects: ["Robotics", "Machine Learning", "Computer Vision", "Natural Language Processing", "Neural Networks", "Automation"],
        ageGroup: "Class 5 to Class 12", benefits: ["Industry-relevant skills", "Competition preparation", "Career readiness", "Research opportunities", "Global recognition", "Innovation mindset"],
        investment: "₹15-30 Lakhs",
    },
    "stem-innovation": {
        name: "STEM Innovation", fullName: "STEM Innovation Labs", icon: FaFlask,
        accent: "border-l-teal-500", accentBg: "bg-teal-50", accentText: "text-teal-600",
        description: "Comprehensive labs covering Science, Technology, Engineering, and Mathematics",
        longDescription: "STEM Innovation Labs provide a holistic learning environment where students explore the interconnection between Science, Technology, Engineering, and Mathematics. These labs feature hands-on experiments, project-based learning, and real-world problem solving that prepare students for 21st-century challenges.",
        equipment: ["Science Experiment Kits", "Technology Tools", "Engineering Models", "Math Manipulatives", "Robotics Components", "Coding Stations", "Virtual Labs"],
        subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Engineering Design", "Technology Literacy"],
        ageGroup: "Class 1 to Class 12", benefits: ["NEP 2020 & NCF 2023 aligned", "Integrated learning", "Critical thinking", "Problem solving", "Scientific temper", "Holistic development"],
        investment: "₹8-15 Lakhs",
    },
    coding: {
        name: "Coding", fullName: "Coding & Programming Labs", icon: FaLaptopCode,
        accent: "border-l-blue-500", accentBg: "bg-blue-50", accentText: "text-blue-600",
        description: "State-of-the-art computer labs for learning programming and software development",
        longDescription: "Our Coding Labs are designed to transform students into proficient programmers. From block-based coding for beginners to advanced Python, Java, and web development for seniors, these labs provide a structured pathway to software development mastery with industry-standard tools and environments.",
        equipment: ["High-Performance Computers", "Multiple Monitors", "Version Control Systems", "Cloud Computing Access", "Development IDEs", "Testing Frameworks", "Collaboration Tools"],
        subjects: ["Scratch", "Python", "Java", "Web Development", "App Development", "Game Development", "Data Science"],
        ageGroup: "Class 1 to Class 12", benefits: ["Industry-ready skills", "Logical thinking", "Problem decomposition", "Career opportunities", "Global language", "Creative expression"],
        investment: "₹5-12 Lakhs",
    },
    "3d-printing": {
        name: "3D Printing", fullName: "3D Printing & Additive Manufacturing Labs", icon: FaCube,
        accent: "border-l-pink-500", accentBg: "bg-pink-50", accentText: "text-pink-600",
        description: "Modern fabrication labs with industrial 3D printers and CAD software",
        longDescription: "3D Printing Labs bring manufacturing into the classroom. Students learn Computer-Aided Design (CAD), understand material science, and create physical prototypes of their ideas. From jewelry design to mechanical parts, these labs enable students to transform digital designs into tangible objects.",
        equipment: ["FDM 3D Printers", "Resin Printers", "CAD Workstations", "Slicing Software", "Finishing Tools", "Material Storage", "Post-Processing Equipment"],
        subjects: ["CAD Design", "3D Modeling", "Material Science", "Product Design", "Rapid Prototyping", "Manufacturing"],
        ageGroup: "Class 5 to Class 12", benefits: ["Design thinking", "Spatial visualization", "Prototyping skills", "Manufacturing awareness", "Entrepreneurship", "Innovation"],
        investment: "₹8-20 Lakhs",
    },
    "iot-electronics": {
        name: "IoT & Electronics", fullName: "IoT & Electronics Labs", icon: FaMicrochip,
        accent: "border-l-green-500", accentBg: "bg-green-50", accentText: "text-green-600",
        description: "Labs focused on Internet of Things, embedded systems, and electronic circuit design",
        longDescription: "IoT & Electronics Labs introduce students to the connected world of smart devices. From building simple circuits to creating complex IoT solutions that monitor and control the physical world, students learn electronics fundamentals, sensor integration, and cloud connectivity.",
        equipment: ["Arduino Boards", "Raspberry Pi", "IoT Sensors", "Actuators", "Breadboards", "Oscilloscopes", "Soldering Stations", "Cloud Platforms"],
        subjects: ["Electronics", "Circuit Design", "Embedded Systems", "IoT Protocols", "Cloud Computing", "Smart Systems"],
        ageGroup: "Class 6 to Class 12", benefits: ["Practical electronics", "System thinking", "Industry 4.0 ready", "Innovation skills", "Problem solving", "Future technologies"],
        investment: "₹6-15 Lakhs",
    },
    "maker-space": {
        name: "Maker Space", fullName: "Maker Space Labs", icon: FaTools,
        accent: "border-l-yellow-500", accentBg: "bg-yellow-50", accentText: "text-yellow-600",
        description: "Creative workshops for hands-on making, crafting, and prototype development",
        longDescription: "Maker Spaces are creative workshops where imagination meets reality. These labs combine traditional craftsmanship with modern technology, allowing students to work with wood, metal, textiles, electronics, and digital fabrication tools to create anything they can imagine.",
        equipment: ["Hand Tools", "Power Tools", "Laser Cutters", "CNC Machines", "Sewing Machines", "Craft Supplies", "Electronics Workbench", "Safety Equipment"],
        subjects: ["Woodworking", "Metalworking", "Textile Design", "Electronics", "Digital Fabrication", "Product Design"],
        ageGroup: "Class 3 to Class 12", benefits: ["Hands-on learning", "Creativity boost", "Self-expression", "Practical skills", "Confidence building", "Entrepreneurship"],
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
                <main className="min-h-screen bg-white pt-32 pb-16">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lab Type Not Found</h1>
                        <p className="text-gray-600 mb-8">We couldn&apos;t find information for this lab type.</p>
                        <Link href="/" className="text-orange-500 hover:underline">Return to Home</Link>
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
            <main className="min-h-screen bg-white">
                {/* Hero — Left aligned */}
                <section className="pt-32 pb-10 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 ${data.accentBg} rounded-xl flex items-center justify-center`}>
                                    <IconComponent className={`w-6 h-6 ${data.accentText}`} />
                                </div>
                                <span className={`px-3 py-1 ${data.accentBg} ${data.accentText} rounded-full text-sm font-semibold`}>{data.name}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.fullName}</h1>
                            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-6">{data.longDescription}</p>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                                    <FaPhone className="w-4 h-4" /> Get a Quote
                                </Link>
                                <Link href="/programs" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-900 rounded-xl font-semibold hover:border-orange-500 transition-colors">
                                    View Programs <FaArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Info — Inline strip */}
                <section className="px-4 py-6 border-t border-gray-100">
                    <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-8">
                        <div className="flex items-center gap-2">
                            <FaGraduationCap className="w-5 h-5 text-orange-500" />
                            <span className="text-sm text-gray-500">Age:</span>
                            <span className="text-sm font-bold text-gray-900">{data.ageGroup}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCogs className="w-5 h-5 text-teal-500" />
                            <span className="text-sm text-gray-500">Equipment:</span>
                            <span className="text-sm font-bold text-gray-900">{data.equipment.length}+ Items</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaLightbulb className="w-5 h-5 text-purple-500" />
                            <span className="text-sm text-gray-500">Investment:</span>
                            <span className="text-sm font-bold text-gray-900">{data.investment}</span>
                        </div>
                    </div>
                </section>

                {/* Equipment — Simple grid */}
                <section className="py-10 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Lab Equipment Included</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {data.equipment.map((item, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }}
                                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-sm text-gray-700">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subjects — Tags */}
                <section className="py-10 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Subjects Covered</h2>
                        <div className="flex flex-wrap gap-3">
                            {data.subjects.map((subject, index) => (
                                <span key={index} className={`px-4 py-2 ${data.accentBg} ${data.accentText} rounded-lg text-sm font-medium border ${data.accent}`}>
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits — Two column */}
                <section className="py-10 px-4">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits of {data.name} Labs</h2>
                            <p className="text-gray-600 mb-6">{data.description}. Our comprehensive solutions ensure your school gets the best learning environment.</p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {data.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-900 rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-3">Complete Turnkey Solution</h3>
                            <p className="text-gray-300 mb-5 text-sm">We provide everything from lab design and equipment to curriculum development and teacher training.</p>
                            <ul className="space-y-2 mb-6 text-sm">
                                <li className="flex items-center gap-2"><FaCheckCircle className="w-3 h-3 text-orange-400" /> Lab Design & Setup</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="w-3 h-3 text-orange-400" /> Equipment & Materials</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="w-3 h-3 text-orange-400" /> Curriculum & Training</li>
                                <li className="flex items-center gap-2"><FaCheckCircle className="w-3 h-3 text-orange-400" /> Annual Maintenance</li>
                            </ul>
                            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors">Get Started</Link>
                        </div>
                    </div>
                </section>

                {/* CTA — Contained card */}
                <section className="py-12 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gray-900 rounded-2xl p-8 md:p-10 text-center">
                            <h2 className="text-3xl font-bold text-white mb-3">Ready to Setup a <span className="text-orange-400">{data.name} Lab?</span></h2>
                            <p className="text-gray-300 max-w-xl mx-auto mb-6">Transform your school with our comprehensive {data.fullName} solutions. Contact us for a free consultation.</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">Request a Demo</Link>
                                <a href="tel:+916356631515" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                                    <FaPhone className="w-3 h-3" /> +91 6356631515
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
