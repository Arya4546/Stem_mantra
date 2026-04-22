"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaTrophy, FaRobot, FaLightbulb, FaCode, FaFlask, FaCalendarAlt,
    FaCheckCircle, FaPhone, FaUsers, FaMedal, FaGlobe, FaArrowRight
} from "react-icons/fa";

// Competition data
const competitionData: Record<string, {
    name: string;
    fullName: string;
    icon: React.ComponentType<{ className?: string }>;
    accent: string;
    accentBg: string;
    accentText: string;
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
        accent: "border-purple-500",
        accentBg: "bg-purple-50",
        accentText: "text-purple-600",
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
            "National Winner: ₹1,00,000 + Trophy + WRO representative",
            "First Runner-up: ₹50,000 + Trophy",
            "Second Runner-up: ₹25,000 + Trophy",
            "Category Winners: ₹10,000 each",
            "Participation certificates for all",
            "Scholarship opportunities for performers",
        ],
        eligibility: [
            "Students from Class 1 to 12",
            "Teams of 2-3 students",
            "One adult coach per team",
            "Valid school ID required",
            "Prior robotics experience not mandatory",
        ],
        registrationFee: "₹2,000-5,000 per team",
        levels: ["School", "Regional", "State", "National", "WRO"],
    },
    "stem-challenge": {
        name: "STEM Challenge",
        fullName: "Annual STEM Innovation Challenge",
        icon: FaLightbulb,
        accent: "border-orange-500",
        accentBg: "bg-orange-50",
        accentText: "text-orange-600",
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
        levels: ["School", "Regional", "National"],
    },
    "atl-marathon": {
        name: "ATL Marathon",
        fullName: "Atal Tinkering Labs Marathon",
        icon: FaFlask,
        accent: "border-teal-500",
        accentBg: "bg-teal-50",
        accentText: "text-teal-600",
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
        registrationFee: "Free (Govt initiative)",
        levels: ["School", "District", "State", "National"],
    },
    coding: {
        name: "Coding Championship",
        fullName: "National Coding Championship",
        icon: FaCode,
        accent: "border-blue-500",
        accentBg: "bg-blue-50",
        accentText: "text-blue-600",
        description: "Competitive programming contest for young coders",
        longDescription: "The National Coding Championship tests students' programming skills through challenging algorithmic problems. From basic problem-solving to advanced competitive programming, this competition identifies India's brightest young coders and prepares them for international olympiads.",
        categories: [
            { name: "Scratch Category", ageGroup: "Class 1-5", description: "Visual programming challenges using Scratch" },
            { name: "Beginners", ageGroup: "Class 5-8", description: "Basic Python programming problems" },
            { name: "Intermediate", ageGroup: "Class 8-10", description: "Intermediate algorithms and data structures" },
            { name: "Competitive", ageGroup: "Class 9-12", description: "Advanced algorithmic challenges (C++, Python, Java)" },
        ],
        timeline: [
            { month: "June", activity: "Registration opens" },
            { month: "July", activity: "Online practice rounds begin" },
            { month: "August", activity: "Round 1: Online qualifier" },
            { month: "September", activity: "Round 2: Online advanced round" },
            { month: "October", activity: "Regional onsite competitions" },
            { month: "November", activity: "National finals in Hyderabad" },
            { month: "December", activity: "IOI training camp for winners" },
        ],
        prizes: [
            "National Champion: ₹1,50,000 + Training",
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
        registrationFee: "₹500-1,500 per head",
        levels: ["Qualifier", "Advanced", "Regional", "National"],
    },
    exhibitions: {
        name: "Science Exhibitions",
        fullName: "National Science Exhibition & Expo",
        icon: FaFlask,
        accent: "border-orange-500",
        accentBg: "bg-orange-50",
        accentText: "text-orange-600",
        description: "Platform to showcase student science projects and innovations",
        longDescription: "The National Science Exhibition provides students a platform to showcase their scientific projects, experiments, and innovations. From fundamental science concepts to cutting-edge research, students present their work to judges, peers, and the public, developing communication and presentation skills.",
        categories: [
            { name: "Working Models", ageGroup: "All Classes", description: "Functional models demonstrating scientific principles" },
            { name: "Research", ageGroup: "Class 8-12", description: "Original research projects with methodology and findings" },
            { name: "Eco Science", ageGroup: "All Classes", description: "Projects focused on ecology and environmental conservation" },
            { name: "Math Models", ageGroup: "All Classes", description: "Mathematical concepts demonstrated through models" },
        ],
        timeline: [
            { month: "September", activity: "Theme announcement and registration" },
            { month: "October", activity: "Project development and documentation" },
            { month: "November", activity: "School-level exhibition" },
            { month: "December", activity: "District-level exhibition" },
            { month: "January", activity: "State-level exhibition" },
            { month: "February", activity: "National exhibition" },
            { month: "March", activity: "Awards ceremony" },
        ],
        prizes: [
            "President's Award: ₹1,00,000 + Recognition",
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
                <main className="min-h-screen bg-white pt-32 pb-16">
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
            <main className="min-h-screen bg-white">
                {/* Hero — Left Aligned */}
                <section className="pt-32 pb-12 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-12 h-12 ${data.accentBg} rounded-xl flex items-center justify-center`}>
                                    <IconComponent className={`w-6 h-6 ${data.accentText}`} />
                                </div>
                                <span className={`px-4 py-1.5 ${data.accentBg} ${data.accentText} rounded-full text-sm font-bold`}>
                                    🏆 Annual Competition
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                {data.fullName}
                            </h1>
                            <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mb-8">
                                {data.longDescription}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-sm">
                                    Register Now <FaArrowRight className="w-4 h-4" />
                                </Link>
                                <a href="tel:+916356631515" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold border border-gray-200 hover:border-orange-500 transition-all">
                                    <FaPhone className="w-3 h-3" /> +91 6356631515
                                </a>
                                <a href="tel:01203101774" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold border border-gray-200 hover:border-orange-500 transition-all">
                                    <FaPhone className="w-3 h-3" /> 0120-3101774
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Info Strip */}
                <section className="py-6 border-y border-gray-100 bg-gray-50/50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center md:justify-start gap-10">
                            <div className="flex items-center gap-3">
                                <FaMedal className="w-5 h-5 text-orange-500" />
                                <div className="text-sm">
                                    <span className="block text-gray-500">Registration</span>
                                    <span className="font-bold text-gray-900">{data.registrationFee}</span>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <FaGlobe className="w-5 h-5 text-teal-500" />
                                <div className="text-sm">
                                    <span className="block text-gray-500">Levels</span>
                                    <span className="font-bold text-gray-900">{data.levels.join(" → ")}</span>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <FaUsers className="w-5 h-5 text-purple-500" />
                                <div className="text-sm">
                                    <span className="block text-gray-500">Open For</span>
                                    <span className="font-bold text-gray-900">Class 1-12</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-10">Competition Categories</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.categories.map((category, index) => (
                                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                                    className={`p-6 bg-white border-l-4 ${data.accent} border-r border-t border-b border-gray-100 rounded-xl hover:shadow-lg transition-all`}>
                                    <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-md text-[10px] font-bold text-gray-600 mb-3 uppercase tracking-wider">{category.ageGroup}</span>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline — Clean List */}
                <section className="py-20 px-4 bg-gray-50">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Timeline</h2>
                            <p className="text-gray-600 mb-8">Stay updated with the competition phase. We provide training and mentorship at every step of the journey.</p>
                            <div className="space-y-4">
                                {data.timeline.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-start group">
                                        <div className="w-24 flex-shrink-0 text-sm font-bold text-orange-600 pt-0.5">{item.month}</div>
                                        <div className="relative pt-1.5 flex-shrink-0">
                                            <div className="w-2.5 h-2.5 rounded-full bg-orange-200 border-2 border-orange-500 group-last:mb-0" />
                                            {index !== data.timeline.length - 1 && <div className="absolute top-4 left-[0.3rem] w-px h-full bg-gray-200" />}
                                        </div>
                                        <div className="pb-8 group-last:pb-0">
                                            <p className="text-gray-700 font-medium">{item.activity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gray-900 rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-6">Prizes & Recognition</h3>
                            <div className="space-y-4">
                                {data.prizes.map((prize, index) => (
                                    <div key={index} className="flex items-start gap-4 p-4 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                                        <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {index === 0 ? <FaTrophy className="w-5 h-5 text-orange-400" /> : <FaMedal className="w-5 h-5 text-teal-400" />}
                                        </div>
                                        <span className="text-sm text-gray-300 font-medium">{prize}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eligibility — Simple Box */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-10 items-center">
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Can Participate?</h2>
                                <p className="text-gray-600 mb-6">We invite passionate innovators, coders, and makers to showcase their talent. Whether you&apos;re a beginner or an expert, there&apos;s a category for everyone.</p>
                            </div>
                            <div className="flex-1 space-y-3">
                                {data.eligibility.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA — Boxed Card */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gray-900 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Become the Next <span className="text-orange-400">Industry Leader</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                                    Don&apos;t miss the chance to compete at national and international levels.
                                    Register your team today and start your journey towards excellence.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link href="/contact" className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg">
                                        Register Your School
                                    </Link>
                                    <a href="tel:+916356631515" className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                                        +91 6356631515
                                    </a>
                                    <a href="tel:01203101774" className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                                        0120-3101774
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
