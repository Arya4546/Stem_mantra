"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const seoLinks = {
    labsByCity: {
        title: "STEM Labs By City",
        links: [
            { name: "STEM Labs in Delhi", href: "/stem-labs/delhi" },
            { name: "STEM Labs in Mumbai", href: "/stem-labs/mumbai" },
            { name: "STEM Labs in Bangalore", href: "/stem-labs/bangalore" },
            { name: "STEM Labs in Hyderabad", href: "/stem-labs/hyderabad" },
            { name: "STEM Labs in Chennai", href: "/stem-labs/chennai" },
            { name: "STEM Labs in Pune", href: "/stem-labs/pune" },
            { name: "STEM Labs in Gurugram", href: "/stem-labs/gurugram" },
            { name: "STEM Labs in Noida", href: "/stem-labs/noida" },
            { name: "STEM Labs in Kolkata", href: "/stem-labs/kolkata" },
            { name: "STEM Labs in Jaipur", href: "/stem-labs/jaipur" },
        ],
    },
    roboticsLabsByCity: {
        title: "Robotics Labs By City",
        links: [
            { name: "Robotics Labs in Delhi", href: "/robotics-labs/delhi" },
            { name: "Robotics Labs in Mumbai", href: "/robotics-labs/mumbai" },
            { name: "Robotics Labs in Bangalore", href: "/robotics-labs/bangalore" },
            { name: "Robotics Labs in Hyderabad", href: "/robotics-labs/hyderabad" },
            { name: "Robotics Labs in Chennai", href: "/robotics-labs/chennai" },
            { name: "Robotics Labs in Pune", href: "/robotics-labs/pune" },
            { name: "Robotics Labs in Gurugram", href: "/robotics-labs/gurugram" },
            { name: "Robotics Labs in Lucknow", href: "/robotics-labs/lucknow" },
        ],
    },
    labsByType: {
        title: "Labs By Type",
        links: [
            { name: "Atal Tinkering Labs (ATL)", href: "/labs/atl" },
            { name: "Robotics & AI Labs", href: "/labs/robotics-ai" },
            { name: "STEM Innovation Labs", href: "/labs/stem-innovation" },
            { name: "Coding & Programming Labs", href: "/labs/coding" },
            { name: "3D Printing Labs", href: "/labs/3d-printing" },
            { name: "IoT & Electronics Labs", href: "/labs/iot-electronics" },
            { name: "Science & Math Labs", href: "/labs/science-math" },
            { name: "Maker Space Labs", href: "/labs/maker-space" },
        ],
    },
    programsByAge: {
        title: "Programs By Age Group",
        links: [
            { name: "STEM for Class 1-3", href: "/programs/class-1-3" },
            { name: "STEM for Class 4-5", href: "/programs/class-4-5" },
            { name: "Robotics for Class 6-8", href: "/programs/class-6-8" },
            { name: "AI & Coding for Class 9-10", href: "/programs/class-9-10" },
            { name: "Advanced Robotics for Class 11-12", href: "/programs/class-11-12" },
            { name: "Teacher Training Programs", href: "/programs/teacher-training" },
        ],
    },
    services: {
        title: "Our Services",
        links: [
            { name: "ATL Lab Setup", href: "/services/atl-lab-setup" },
            { name: "Robotics Lab Setup", href: "/services/robotics-lab-setup" },
            { name: "STEM Curriculum Development", href: "/services/curriculum" },
            { name: "Teacher Training & Certification", href: "/services/teacher-training" },
            { name: "Student Workshops", href: "/services/workshops" },
            { name: "Competition Preparation", href: "/services/competitions" },
            { name: "Lab Maintenance & Support", href: "/services/maintenance" },
        ],
    },
    competitions: {
        title: "Competitions & Events",
        links: [
            { name: "National Robotics Olympiad", href: "/competitions/robotics-olympiad" },
            { name: "STEM Innovation Challenge", href: "/competitions/stem-challenge" },
            { name: "ATL Marathon", href: "/competitions/atl-marathon" },
            { name: "Coding Championships", href: "/competitions/coding" },
            { name: "Science Exhibitions", href: "/competitions/exhibitions" },
            { name: "Inter-School Tech Fest", href: "/competitions/tech-fest" },
        ],
    },
};

export default function SEOLinksSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section ref={ref} className="relative py-12 bg-gray-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
                        backgroundSize: "30px 30px",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        Explore STEM Education{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                            Solutions
                        </span>
                    </h2>
                    <p className="text-gray-400 text-sm">
                        Quality STEM, Robotics & AI education across India
                    </p>
                </motion.div>

                {/* Links Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(seoLinks).map(([key, category], categoryIndex) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                        >
                            <h3 className="text-lg font-semibold text-orange-400 mb-4 border-b border-gray-700 pb-2">
                                {category.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {category.links.map((link, linkIndex) => (
                                    <span key={link.href} className="inline-flex items-center">
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-orange-400 text-sm transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                        {linkIndex < category.links.length - 1 && (
                                            <span className="text-gray-600 mx-1">|</span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom SEO Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-10 pt-8 border-t border-gray-800"
                >
                    <p className="text-gray-500 text-xs leading-relaxed text-center max-w-4xl mx-auto">
                        <strong className="text-gray-400">STEM Mantra</strong> is India&apos;s leading provider of
                        robotics labs, AI labs, STEM labs, and Atal Tinkering Labs (ATL) for schools. We provide
                        complete turnkey lab solutions including equipment, NEP 2020 aligned curriculum, teacher
                        training, and ongoing support across Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune,
                        Gurugram, Noida, Kolkata, Jaipur and 500+ cities in India. Our programs cover robotics
                        programming, artificial intelligence, machine learning, 3D printing, IoT, electronics,
                        coding, and more for students from Class 1 to Class 12.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
