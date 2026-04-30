"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaRobot, FaCogs, FaCheckCircle, FaPhone, FaArrowRight, FaLightbulb, FaGraduationCap,
    FaFlask, FaLaptopCode, FaCube, FaMicrochip, FaTools
} from "react-icons/fa";

interface LabData {
    name: string; fullName: string; icon: string;
    description: string; longDescription: string; equipment: string[];
    subjects: string[]; ageGroup: string; benefits: string[]; investment: string;
    accent: string; accentBg: string; accentText: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    robot: FaRobot,
    flask: FaFlask,
    laptop: FaLaptopCode,
    cube: FaCube,
    microchip: FaMicrochip,
    tools: FaTools,
    lightbulb: FaLightbulb,
};

interface Props {
    data: LabData;
}

export default function LabTypeDetail({ data }: Props) {
    const IconComponent = ICON_MAP[data.icon] || FaLightbulb;

    return (
        <>
            <Header />
            <main className="min-h-screen bg-white">
                {/* Hero */}
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

                {/* Quick Info */}
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

                {/* Equipment */}
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

                {/* Subjects */}
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

                {/* Benefits */}
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

                {/* CTA */}
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
                                <a href="tel:01203101774" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                                    <FaPhone className="w-3 h-3" /> 0120-3101774
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
