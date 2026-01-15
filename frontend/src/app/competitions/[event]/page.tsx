"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaTrophy, FaRobot, FaLightbulb, FaCode, FaFlask, FaCalendarAlt,
    FaCheckCircle, FaPhone, FaUsers, FaMedal, FaGlobe
} from "react-icons/fa";

// Competition data
const competitionData: Record<string, {
    name: string;
    fullName: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    description: string;
    longDescription: string;
    categories: { name: string; ageGroup: string; description: string }[];
    timeline: { month: string; activity: string }[];
    prizes: string[];
    eligibility: string[];
    registrationFee: string;
    levels: string[];
}> = {
    "robotics-olympiad": {
        name: "Robotics Olympiad",
        fullName: "National Robotics Olympiad & WRO Preparation",
        icon: FaRobot,
        color: "from-purple-600 to-blue-600",
        description: "Annual robotics competition for students from Class 1 to 12",
        longDescription: "The Robotics Olympiad is India's premier robotics competition that challenges students to design, build, and program robots to solve real-world problems. With categories for all age groups, this competition develops critical thinking, teamwork, and technical skills while preparing students for international events like WRO.",
        categories: [
            { name: "Elementary", ageGroup: "Class 1-5", description: "Basic robot building and simple programming challenges using block-based coding" },
            { name: "Junior", ageGroup: "Class 6-8", description: "Intermediate robotics with sensor integration and autonomous navigation tasks" },
            { name: "Senior", ageGroup: "Class 9-12", description: "Advanced challenges including AI integration and complex problem-solving" },
            { name: "Open Category", ageGroup: "All Ages", description: "Innovation projects addressing real-world problems with no restrictions" },
        ],
        timeline: [
            { month: "January", activity: "Registration opens" },
            { month: "February", activity: "Theme announcement and training begins" },
            { month: "March-April", activity: "Robot building and programming phase" },
            { month: "May", activity: "School-level competitions" },
            { month: "June", activity: "Regional qualifiers" },
            { month: "July", activity: "State-level championships" },
            { month: "August", activity: "National finals in Delhi" },
            { month: "September", activity: "WRO India finals for international qualifiers" },
        ],
        prizes: [
            "National Winner: ₹1,00,000 + Trophy + WRO representation",
            "First Runner-up: ₹50,000 + Trophy",
            "Second Runner-up: ₹25,000 + Trophy",
            "Category Winners: ₹10,000 each",
            "Participation certificates for all",
            "Scholarship opportunities for top performers",
        ],
        eligibility: [
            "Students from Class 1 to 12",
            "Teams of 2-3 students",
            "One adult coach per team",
            "Valid school ID required",
            "Prior robotics experience not mandatory",
        ],
        registrationFee: "₹2,000-5,000 per team (varies by category)",
        levels: ["School Level", "Regional Level", "State Level", "National Finals", "International (WRO)"],
    },
    "stem-challenge": {
        name: "STEM Challenge",
        fullName: "Annual STEM Innovation Challenge",
        icon: FaLightbulb,
        color: "from-orange-500 to-yellow-500",
        description: "Innovation competition focusing on real-world problem solving",
        longDescription: "The STEM Innovation Challenge invites students to identify real-world problems and develop innovative solutions using science, technology, engineering, and mathematics. From environmental issues to healthcare challenges, students learn to think like innovators and entrepreneurs.",
        categories: [
            { name: "Green Innovation", ageGroup: "All Classes", description: "Projects focused on environmental sustainability and climate solutions" },
            { name: "Health Tech", ageGroup: "Class 6-12", description: "Healthcare innovations including medical devices and wellness solutions" },
            { name: "Smart Cities", ageGroup: "Class 6-12", description: "Urban solutions for transportation, safety, and infrastructure" },
            { name: "AgriTech", ageGroup: "Class 6-12", description: "Agricultural innovations for farming and food security" },
        ],
        timeline: [
            { month: "August", activity: "Challenge theme announcement" },
            { month: "September", activity: "Team registration and mentor assignment" },
            { month: "October", activity: "Problem identification and research phase" },
            { month: "November", activity: "Prototype development" },
            { month: "December", activity: "School-level presentations" },
            { month: "January", activity: "Regional semifinals" },
            { month: "February", activity: "National finals in Bangalore" },
            { month: "March", activity: "Winner mentorship program begins" },
        ],
        prizes: [
            "Grand Prize: ₹2,00,000 + Incubation support",
            "Category Winners: ₹75,000 each",
            "Innovation Award: ₹50,000",
            "People's Choice Award: ₹25,000",
            "Patent filing support for top ideas",
            "Mentorship from industry experts",
        ],
        eligibility: [
            "Students from Class 1 to 12",
            "Individual or team (max 4 members)",
            "Original ideas required",
            "Working prototype expected for finals",
            "Parental consent for participation",
        ],
        registrationFee: "₹1,000-3,000 per entry",
        levels: ["School Level", "Regional Level", "National Finals"],
    },
    "atl-marathon": {
        name: "ATL Marathon",
        fullName: "Atal Tinkering Labs Marathon",
        icon: FaFlask,
        color: "from-teal-500 to-green-500",
        description: "Official AIM initiative for ATL students across India",
        longDescription: "The ATL Marathon is the flagship innovation challenge organized by Atal Innovation Mission, NITI Aayog for students of Atal Tinkering Labs across India. Students identify community problems and develop innovative solutions through design thinking, mentorship, and hands-on tinkering.",
        categories: [
            { name: "Student Innovator", ageGroup: "Class 6-12", description: "Individual innovation projects solving local community problems" },
            { name: "Team Innovation", ageGroup: "Class 6-12", description: "Team-based projects with multi-disciplinary solutions" },
            { name: "Young Scientist", ageGroup: "Class 6-10", description: "Science-based innovations with research component" },
            { name: "Tech for Good", ageGroup: "Class 8-12", description: "Technology solutions for social impact" },
        ],
        timeline: [
            { month: "April", activity: "ATL Marathon announcement by AIM" },
            { month: "May", activity: "Online registration and idea submission" },
            { month: "June-July", activity: "Mentor assignment and development phase" },
            { month: "August", activity: "Stage 1 evaluation (school level)" },
            { month: "September", activity: "Stage 2 evaluation (regional)" },
            { month: "October", activity: "Stage 3 bootcamps and mentoring" },
            { month: "November", activity: "National semifinal presentations" },
            { month: "December", activity: "Grand finale at national event" },
        ],
        prizes: [
            "Grand Prize: ₹5,00,000 + Patent support",
            "Top 100: ₹1,00,000 each + Incubation",
            "State Winners: ₹50,000 each",
            "Special recognition by NITI Aayog",
            "Mentorship from leading entrepreneurs",
            "Opportunity to present to investors",
        ],
        eligibility: [
            "Students of registered ATL schools only",
            "Class 6 to 12 students",
            "Valid ATL user ID required",
            "Teacher mentor mandatory",
            "Original innovation required",
        ],
        registrationFee: "Free (Government initiative)",
        levels: ["School", "District", "State", "National"],
    },
    coding: {
        name: "Coding Championship",
        fullName: "National Coding Championship",
        icon: FaCode,
        color: "from-blue-500 to-cyan-500",
        description: "Competitive programming contest for young coders",
        longDescription: "The National Coding Championship tests students' programming skills through challenging algorithmic problems. From basic problem-solving to advanced competitive programming, this competition identifies India's brightest young coders and prepares them for international olympiads.",
        categories: [
            { name: "Scratch Category", ageGroup: "Class 1-5", description: "Visual programming challenges using Scratch" },
            { name: "Python Beginners", ageGroup: "Class 5-8", description: "Basic Python programming problems" },
            { name: "Python Advanced", ageGroup: "Class 8-10", description: "Intermediate algorithms and data structures" },
            { name: "Competitive", ageGroup: "Class 9-12", description: "Advanced algorithmic challenges (C++, Python, Java)" },
        ],
        timeline: [
            { month: "June", activity: "Registration opens" },
            { month: "July", activity: "Online practice rounds begin" },
            { month: "August", activity: "Round 1: Online qualifier (all registrants)" },
            { month: "September", activity: "Round 2: Online advanced round" },
            { month: "October", activity: "Regional onsite competitions" },
            { month: "November", activity: "National finals in Hyderabad" },
            { month: "December", activity: "IOI training camp for winners" },
        ],
        prizes: [
            "National Champion: ₹1,50,000 + IOI training",
            "Category Winners: ₹50,000 each",
            "Special Awards: Best Newcomer, Best Girl Coder",
            "Internship opportunities with tech companies",
            "Coding bootcamp scholarships",
            "Books and programming resources",
        ],
        eligibility: [
            "Students from Class 1 to 12",
            "Individual participation only",
            "Valid school enrollment",
            "Internet access for online rounds",
            "Basic programming knowledge recommended",
        ],
        registrationFee: "₹500-1,500 (varies by category)",
        levels: ["Online Qualifier", "Online Advanced", "Regional Onsite", "National Finals"],
    },
    exhibitions: {
        name: "Science Exhibitions",
        fullName: "National Science Exhibition & Expo",
        icon: FaFlask,
        color: "from-pink-500 to-rose-500",
        description: "Platform to showcase student science projects and innovations",
        longDescription: "The National Science Exhibition provides students a platform to showcase their scientific projects, experiments, and innovations. From fundamental science concepts to cutting-edge research, students present their work to judges, peers, and the public, developing communication and presentation skills.",
        categories: [
            { name: "Working Models", ageGroup: "All Classes", description: "Functional models demonstrating scientific principles" },
            { name: "Scientific Research", ageGroup: "Class 8-12", description: "Original research projects with methodology and findings" },
            { name: "Environmental Science", ageGroup: "All Classes", description: "Projects focused on ecology and environmental conservation" },
            { name: "Mathematics Models", ageGroup: "All Classes", description: "Mathematical concepts demonstrated through models" },
            { name: "Medical Science", ageGroup: "Class 9-12", description: "Health and medical science innovations" },
        ],
        timeline: [
            { month: "September", activity: "Theme announcement and registration" },
            { month: "October", activity: "Project development and documentation" },
            { month: "November", activity: "School-level exhibition and selection" },
            { month: "December", activity: "District-level exhibition" },
            { month: "January", activity: "State-level exhibition" },
            { month: "February", activity: "National exhibition in major cities" },
            { month: "March", activity: "Special awards ceremony" },
        ],
        prizes: [
            "President's Award: ₹1,00,000 + National recognition",
            "Category Best: ₹50,000 each",
            "State Champions: ₹25,000 each",
            "Special jury awards",
            "Science olympiad recommendations",
            "Research internship opportunities",
        ],
        eligibility: [
            "Students from Class 1 to 12",
            "Individual or group (max 3)",
            "Working model required",
            "Project documentation mandatory",
            "Teacher guide/mentor required",
        ],
        registrationFee: "₹500-2,000 per project",
        levels: ["School", "District", "State", "National"],
    },
};

export default function CompetitionPage() {
    const params = useParams();
    const event = (params.event as string)?.toLowerCase();
    const data = competitionData[event];

    if (!data) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 pt-32 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Competition Not Found</h1>
                        <p className="text-gray-600 mb-8">We couldn&apos;t find this competition.</p>
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
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
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
                                    <FaTrophy className="w-4 h-4" />
                                    Register Now
                                </Link>
                                <a
                                    href="tel:+916356631515"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-orange-500 transition-all"
                                >
                                    <FaPhone className="w-4 h-4" />
                                    Contact Us
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Quick Info */}
                <section className="py-8 bg-white border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-8">
                            <div className="flex items-center gap-3">
                                <FaMedal className="w-5 h-5 text-orange-500" />
                                <span className="text-gray-700"><strong>Registration:</strong> {data.registrationFee}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaGlobe className="w-5 h-5 text-teal-500" />
                                <span className="text-gray-700"><strong>Levels:</strong> {data.levels.join(" → ")}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                            Competition Categories
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {data.categories.map((category, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                                        <span className={`px-3 py-1 bg-gradient-to-r ${data.color} text-white text-sm rounded-full`}>
                                            {category.ageGroup}
                                        </span>
                                    </div>
                                    <p className="text-gray-600">{category.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                            Competition Timeline
                        </h2>
                        <div className="max-w-3xl mx-auto">
                            <div className="relative">
                                {data.timeline.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-4 mb-6 relative"
                                    >
                                        <div className={`w-24 text-right font-bold text-sm pt-1`}>
                                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${data.color}`}>
                                                {item.month}
                                            </span>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${data.color} flex-shrink-0 mt-1`} />
                                        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                                            <p className="text-gray-700">{item.activity}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prizes */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                            Prizes & Recognition
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {data.prizes.map((prize, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`p-6 rounded-2xl ${index === 0 ? `bg-gradient-to-r ${data.color} text-white` : 'bg-white shadow-lg border border-gray-100'}`}
                                >
                                    <FaTrophy className={`w-8 h-8 mb-3 ${index === 0 ? 'text-yellow-300' : 'text-orange-500'}`} />
                                    <p className={index === 0 ? 'text-white' : 'text-gray-700'}>{prize}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Eligibility */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                                Who Can Participate?
                            </h2>
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <ul className="space-y-4">
                                    {data.eligibility.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Compete in the {data.name}?
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            Register your school or team today. Our experts will guide you through
                            preparation, training, and competition success.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${data.color} text-white rounded-xl font-semibold hover:shadow-xl transition-all`}
                            >
                                Register Now
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
