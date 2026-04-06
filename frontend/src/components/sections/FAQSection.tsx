"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "What is STEMmantra and what services do you provide?",
        answer: "STEMmantra is India's leading provider of robotics, AI, and STEM education solutions for schools. We provide complete turnkey lab solutions including equipment, curriculum, teacher training, and ongoing support. Our services include Robotics Labs, AI/ML Labs, Atal Tinkering Labs (ATL), STEM Labs, coding programs, and innovation workshops."
    },
    {
        question: "How is your curriculum aligned with NEP 2020 & NCF 2023?",
        answer: "Our curriculum is designed by expert engineers which is fully aligned with National Education Policy 2020 and National Curriculum Framework 2023 guidelines. It emphasizes experiential learning, critical thinking, and 21st-century skills development. We cover all recommended areas including computational thinking, AI, robotics, and hands-on STEM activities."
    },
    {
        question: "What equipment comes with your lab setup?",
        answer: "Our lab packages include best in class Basic Electronics components, Robotics components, IoT components, DIY (Do It Yourself) Kits, 3D printers, programming platforms, workstations, maker tools, and safety equipment. All equipment comes with warranties and we provide regular maintenance and upgrades (wherever applicable)."
    },
    {
        question: "Do you provide teacher training?",
        answer: "Yes, comprehensive teacher training is a core part of our offering. We provide initial intensive training sessions in offline & online modes as per mode of collaboration with organization, ongoing professional development workshops, access to our online learning platform-LMS, lesson plans/curriculum, and 24/7 technical support. Our trainers are certified educators with years of experience."
    },
    {
        question: "What grades/age groups do your programs cover?",
        answer: "Our programs are designed for students from Class 3 to Class 12. We have age-appropriate curriculum tracks: Junior STEM (Classes 3-5), Middle School Robotics (Classes 6-8), and Advanced AI & Robotics (Classes 9-12). Each track builds progressively on skills learned in previous levels."
    },
    {
        question: "How do you assess student progress?",
        answer: "We use a comprehensive assessment system including project-based evaluations, coding challenges, robotics competitions, online assessment. Schools receive detailed progress reports and analytics through our dashboard, helping identify areas for improvement and tracking skill development."
    },
    {
        question: "What is the investment required for a robotics lab?",
        answer: "Lab investment varies based on no. of student per class/section, equipment selection, and program scope. We offer flexible packages starting from basic setups for smaller schools to advanced labs for larger institutions which start from 2L to 10-15L. Contact us for a customized quote based on your specific requirements and budget."
    },
    {
        question: "Can you help with ATL (Atal Tinkering Lab) setup?",
        answer: "Absolutely! We are specialized partners for Atal Tinkering Lab setup. We help schools with the complete ATL journey - from application assistance to lab design, equipment procurement, mentor training, and running innovation programs. Our ATL labs comply with all NITI Aayog guidelines."
    },
];

export default function FAQSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section ref={ref} className="relative py-16 lg:py-24 bg-gradient-to-br from-orange-50/50 via-white to-teal-50/50 overflow-hidden">
            <div className="site-container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mb-14"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
                        <HelpCircle className="w-4 h-4" />
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                        Everything You Need to Know About{" "}
                        <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                            STEM Education
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed">
                        Get answers to common questions about our robotics labs, curriculum, training, and how we can help transform your school.
                    </p>
                </motion.div>

                {/* FAQ Accordion - Two Columns on Large Screens */}
                <div className="max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-x-12 gap-y-4 items-start">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="mb-2"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className={`w-full flex items-center justify-between p-6 rounded-2xl text-left transition-all ${openIndex === index
                                        ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-xl"
                                        : "bg-white text-gray-900 hover:bg-orange-50 border border-gray-100 shadow-sm"
                                        }`}
                                >
                                    <span className="font-bold text-lg pr-4">{faq.question}</span>
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
                                            <div className="p-6 bg-white border border-t-0 border-gray-100 rounded-b-2xl shadow-inner text-lg leading-relaxed text-gray-600">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* SEO Content Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-14 max-w-3xl"
                >
                    <p className="text-gray-600 text-lg">
                        Still have questions? Our team is ready to help you understand how STEMmantra can
                        transform your school&apos;s technology education. 
                        <br className="hidden md:block" />
                        <a href="/contact" className="text-orange-600 font-black hover:underline mt-2 inline-block">
                            Contact us today for a free consultation and school assessment.
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
