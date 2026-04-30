"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaFlask, FaTools, FaMicrochip, FaCalculator,
    FaCheckCircle, FaPhone, FaArrowRight, FaSchool
} from "react-icons/fa";

interface CityData {
    name: string;
    state: string;
    description: string;
    specialties: string[];
    labs: number;
    schools: number;
}

interface Props {
    data: CityData;
}

const stemAreas = [
    {
        icon: FaFlask,
        name: "Practical Science",
        desc: "Hands-on experiments in Physics, Chemistry, and Biology",
        accent: "text-teal-500",
        bg: "bg-teal-50"
    },
    {
        icon: FaTools,
        name: "Engineering Design",
        desc: "Learn to build, test, and refine physical prototypes",
        accent: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        icon: FaMicrochip,
        name: "Modern Technology",
        desc: "Explore electronics, coding, and digital fabrication",
        accent: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: FaCalculator,
        name: "Applied Math",
        desc: "Logical thinking and real-world mathematical applications",
        accent: "text-purple-500",
        bg: "bg-purple-50"
    },
];

export default function StemLabCityDetail({ data }: Props) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-semibold mb-6 border border-teal-100">
                                <FaFlask className="w-4 h-4" />
                                {data.state} STEM Excellence
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                STEM Innovation Labs in <br />
                                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
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
                                    Setup a Lab
                                </Link>
                                <Link
                                    href="/labs/stem-innovation"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold border border-gray-200 hover:border-teal-400 transition-all"
                                >
                                    Explore Lab Types
                                    <FaArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-8 bg-gray-50 border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-between items-center gap-6 max-w-6xl mx-auto">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">{data.labs}+</div>
                                <div className="text-sm text-gray-500 leading-tight">Labs <br />Setup</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">{data.schools}+</div>
                                <div className="text-sm text-gray-500 leading-tight">Partner <br />Schools</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">50k+</div>
                                <div className="text-sm text-gray-500 leading-tight">Impacted <br />Students</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">200+</div>
                                <div className="text-sm text-gray-500 leading-tight">STEM <br />Projects</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* STEM Areas */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Holistic <span className="text-teal-600">STEM Learning</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl">
                                Our STEM Innovation Labs in {data.name} integrate various disciplines to provide a comprehensive learning experience.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stemAreas.map((area, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-teal-200 hover:shadow-lg transition-all"
                                >
                                    <div className={`w-12 h-12 ${area.bg} rounded-xl flex items-center justify-center mb-4`}>
                                        <area.icon className={`w-6 h-6 ${area.accent}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{area.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{area.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Specialties */}
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

                {/* CTA */}
                <section className="py-20 border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Empower Your School in <span className="text-teal-400">{data.name}</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                                    Join the network of {data.schools}+ schools in {data.name} that are transforming education with STEMmantra Innovation Labs.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20"
                                    >
                                        Request a Consultation
                                    </Link>
                                    <a
                                        href="tel:+916356631515"
                                        className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                                    >
                                        Talk to an Expert
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
