"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is STEM Mantra and what services do you provide?",
        answer: "STEM Mantra is India's leading provider of robotics, AI, and STEM education solutions for schools. We provide complete turnkey lab solutions including equipment, curriculum, teacher training, and ongoing support. Our services include Robotics Labs, AI/ML Labs, Atal Tinkering Labs (ATL), STEM Labs, coding programs, and innovation workshops."
    },
    {
        question: "How is your curriculum aligned with NEP 2020?",
        answer: "Our curriculum is designed by experts from IIT and NIT institutions, fully aligned with National Education Policy 2020 guidelines. It emphasizes experiential learning, critical thinking, and 21st-century skills development. We cover all recommended areas including computational thinking, AI, robotics, and hands-on STEM activities."
    },
    {
        question: "What equipment comes with your lab setup?",
        answer: "Our lab packages include industrial-grade robotics kits (Arduino, Raspberry Pi, sensors, motors), 3D printers, programming workstations, IoT devices, electronics components, maker tools, and safety equipment. All equipment comes with warranties and we provide regular maintenance and upgrades."
    },
    {
        question: "Do you provide teacher training?",
        answer: "Yes, comprehensive teacher training is a core part of our offering. We provide initial intensive training sessions (40+ hours), ongoing professional development workshops, access to our online learning platform, lesson plans, and 24/7 technical support. Our trainers are certified educators with 5+ years of experience."
    },
    {
        question: "What grades/age groups do your programs cover?",
        answer: "Our programs are designed for students from Class 1 to Class 12. We have age-appropriate curriculum tracks: Junior STEM (Classes 1-5), Middle School Robotics (Classes 6-8), and Advanced AI & Robotics (Classes 9-12). Each track builds progressively on skills learned in previous levels."
    },
    {
        question: "How do you assess student progress?",
        answer: "We use a comprehensive assessment system including project-based evaluations, coding challenges, robotics competitions, peer reviews, and portfolio assessments. Schools receive detailed progress reports and analytics through our dashboard, helping identify areas for improvement and tracking skill development."
    },
    {
        question: "Can you help with ATL (Atal Tinkering Lab) setup?",
        answer: "Absolutely! We are specialized partners for Atal Tinkering Lab setup. We help schools with the complete ATL journey - from application assistance to lab design, equipment procurement, mentor training, and running innovation programs. Our ATL labs comply with all NITI Aayog guidelines."
    },
    {
        question: "What is the investment required for a robotics lab?",
        answer: "Lab investment varies based on school size, equipment selection, and program scope. We offer flexible packages starting from basic setups for smaller schools to advanced labs for larger institutions. Contact us for a customized quote based on your specific requirements and budget."
    },
];

export default function FAQSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section ref={ref} className="relative py-16 lg:py-20 bg-gradient-to-br from-orange-50/50 via-white to-teal-50/50 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
                        <HelpCircle className="w-4 h-4" />
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Everything You Need to Know About{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                            STEM Education
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600">
                        Get answers to common questions about our robotics labs, curriculum, training, and how we can help transform your school.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="mb-4"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all ${openIndex === index
                                        ? "bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg"
                                        : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-100 shadow-sm"
                                    }`}
                            >
                                <span className="font-semibold pr-4">{faq.question}</span>
                                <ChevronDown
                                    className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-5 bg-white border border-t-0 border-gray-100 rounded-b-xl">
                                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* SEO Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 max-w-3xl mx-auto text-center"
                >
                    <p className="text-gray-600">
                        Still have questions? Our team is ready to help you understand how STEM Mantra can
                        transform your school&apos;s technology education.
                        <a href="/contact" className="text-orange-600 font-semibold hover:underline ml-1">
                            Contact us today
                        </a> for a free consultation and school assessment.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
