"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
    FaRobot, FaFlask, FaLaptopCode, FaCogs, FaGraduationCap,
    FaCheckCircle, FaPhone, FaArrowRight, FaMapMarkerAlt,
    FaStar, FaUsers, FaSchool, FaAward
} from "react-icons/fa";

// City-specific data
const cityData: Record<string, {
    name: string;
    state: string;
    description: string;
    highlights: string[];
    schools: number;
    students: number;
}> = {
    delhi: {
        name: "Delhi",
        state: "Delhi NCR",
        description: "As India's capital, Delhi is at the forefront of educational innovation. Our STEM labs in Delhi schools are equipped with cutting-edge robotics kits, AI learning modules, and hands-on science equipment that prepare students for the future of technology.",
        highlights: ["Central Delhi schools", "South Delhi schools", "West Delhi schools", "North Delhi schools", "East Delhi schools"],
        schools: 85,
        students: 25000,
    },
    mumbai: {
        name: "Mumbai",
        state: "Maharashtra",
        description: "Mumbai, the financial capital of India, is home to some of the most prestigious schools. Our STEM lab solutions in Mumbai provide world-class robotics education, coding programs, and innovation centers that rival global standards.",
        highlights: ["South Mumbai schools", "Andheri schools", "Thane schools", "Navi Mumbai schools", "Bandra schools"],
        schools: 72,
        students: 21000,
    },
    bangalore: {
        name: "Bangalore",
        state: "Karnataka",
        description: "Known as India's Silicon Valley, Bangalore schools require cutting-edge STEM education. Our labs in Bangalore are designed with tech industry standards, featuring advanced robotics, AI/ML modules, and IoT learning kits.",
        highlights: ["Whitefield schools", "Electronic City schools", "Koramangala schools", "HSR Layout schools", "Indiranagar schools"],
        schools: 68,
        students: 19500,
    },
    hyderabad: {
        name: "Hyderabad",
        state: "Telangana",
        description: "Hyderabad's growing tech ecosystem demands quality STEM education. Our labs in Hyderabad schools combine traditional teaching with modern technology, creating innovation hubs that nurture young minds.",
        highlights: ["Hitech City schools", "Gachibowli schools", "Secunderabad schools", "Jubilee Hills schools", "Banjara Hills schools"],
        schools: 55,
        students: 16000,
    },
    chennai: {
        name: "Chennai",
        state: "Tamil Nadu",
        description: "Chennai, with its strong engineering heritage, is perfect for STEM education. Our labs in Chennai schools emphasize hands-on learning, robotics competitions, and real-world project development.",
        highlights: ["Anna Nagar schools", "T. Nagar schools", "Velachery schools", "OMR schools", "Adyar schools"],
        schools: 48,
        students: 14000,
    },
    pune: {
        name: "Pune",
        state: "Maharashtra",
        description: "Pune, the education hub of Maharashtra, has embraced our STEM lab solutions. Our labs in Pune schools focus on innovation, creativity, and practical application of science and technology concepts.",
        highlights: ["Kothrud schools", "Baner schools", "Hinjewadi schools", "Koregaon Park schools", "Viman Nagar schools"],
        schools: 52,
        students: 15500,
    },
    gurugram: {
        name: "Gurugram",
        state: "Haryana",
        description: "Gurugram, the millennium city, hosts many international and premium schools. Our STEM labs in Gurugram are designed to meet international standards with advanced robotics, AI, and coding labs.",
        highlights: ["DLF schools", "Sector 14 schools", "Sector 47 schools", "Sohna Road schools", "Golf Course Road schools"],
        schools: 45,
        students: 13500,
    },
    noida: {
        name: "Noida",
        state: "Uttar Pradesh",
        description: "Noida's rapidly growing education sector benefits from our comprehensive STEM lab solutions. Our labs in Noida schools provide students with hands-on experience in robotics, coding, and scientific innovation.",
        highlights: ["Sector 18 schools", "Sector 62 schools", "Greater Noida schools", "Sector 137 schools", "Sector 50 schools"],
        schools: 38,
        students: 11000,
    },
    kolkata: {
        name: "Kolkata",
        state: "West Bengal",
        description: "Kolkata, the cultural capital of India, is embracing modern STEM education. Our labs in Kolkata schools blend traditional academic excellence with cutting-edge technology learning.",
        highlights: ["Salt Lake schools", "Park Street schools", "Howrah schools", "South Kolkata schools", "North Kolkata schools"],
        schools: 42,
        students: 12500,
    },
    jaipur: {
        name: "Jaipur",
        state: "Rajasthan",
        description: "Jaipur, the pink city, is transforming its education landscape with our STEM labs. Our solutions in Jaipur schools provide students with access to modern technology and hands-on learning experiences.",
        highlights: ["Malviya Nagar schools", "Vaishali Nagar schools", "C-Scheme schools", "Mansarovar schools", "Tonk Road schools"],
        schools: 35,
        students: 10000,
    },
};

const features = [
    {
        icon: FaRobot,
        title: "Robotics Kits",
        description: "Age-appropriate robotics kits from basic to advanced levels for hands-on learning",
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        icon: FaLaptopCode,
        title: "Coding Stations",
        description: "Modern computer systems with programming software and development environments",
        color: "text-blue-500",
        bg: "bg-blue-50"
    },
    {
        icon: FaFlask,
        title: "Science Equipment",
        description: "Complete science lab equipment for physics, chemistry, and biology experiments",
        color: "text-teal-500",
        bg: "bg-teal-50"
    },
    {
        icon: FaCogs,
        title: "3D Printing",
        description: "Industrial-grade 3D printers for prototyping and design thinking projects",
        color: "text-purple-500",
        bg: "bg-purple-50"
    },
];

const benefits = [
    "NEP 2020 & NCF 2023 aligned curriculum",
    "Trained and certified instructors",
    "Regular workshops and training",
    "Competition preparation support",
    "Student progress tracking",
    "Parent engagement programs",
    "Certificate courses for students",
];

export default function STEMLabCityPage() {
    const params = useParams();
    const city = (params.city as string)?.toLowerCase();
    const data = cityData[city];

    if (!data) {
        return (
            <>
                <Header />
                <main className="min-h-screen bg-white pt-32 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">City Not Found</h1>
                        <p className="text-gray-600 mb-8">We couldn&apos;t find information for this city.</p>
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
            <main className="min-h-screen bg-white">
                {/* Hero Section — Left aligned, white bg */}
                <section className="relative pt-32 pb-12 overflow-hidden">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-sm font-semibold mb-6 border border-orange-100">
                                <FaMapMarkerAlt className="w-4 h-4" />
                                {data.state} STEM Education Hub
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                STEM Labs in <br />
                                <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
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
                                    Get a Quote
                                </Link>
                                <Link
                                    href="/programs"
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 rounded-xl font-semibold border border-gray-200 hover:border-orange-400 transition-all"
                                >
                                    View Programs
                                    <FaArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section — Horizontal Strip */}
                <section className="py-8 bg-gray-50 border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-between items-center gap-6 max-w-6xl mx-auto">
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">{data.schools}+</div>
                                <div className="text-sm text-gray-500 leading-tight">Partner <br />Schools</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">{data.students.toLocaleString()}+</div>
                                <div className="text-sm text-gray-500 leading-tight">Students <br />Trained</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">50+</div>
                                <div className="text-sm text-gray-500 leading-tight">Expert <br />Trainers</div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-gray-200" />
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-bold text-gray-900">98%</div>
                                <div className="text-sm text-gray-500 leading-tight">Success <br />Rate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section — Clean Grid */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Integrated <span className="text-orange-500">Innovation</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl">
                                Complete turnkey STEM lab solutions designed for the educational needs of {data.name}.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all"
                                >
                                    <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Areas Covered — Inline Tags */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 flex-shrink-0">
                                Serving <br /> {data.name}
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {data.highlights.map((area, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium shadow-sm"
                                    >
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section — Two Column */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">
                                    Why Schools in {data.name} <br />Trust STEMmantra
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed max-w-xl">
                                    We provide comprehensive STEM education solutions that transform classrooms into
                                    innovation hubs. Our methodology has helped thousands of students develop
                                    21st-century skills.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-gray-900 rounded-3xl p-10 text-white relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                                        <FaAward className="w-8 h-8 text-orange-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        Transform your school into a center of excellence.
                                        Contact us for a free consultation and customized lab blueprint.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all"
                                    >
                                        <FaPhone className="w-3 h-3" />
                                        Contact Our Experts
                                    </Link>
                                </div>
                                {/* Decorative geometric element */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section — Boxed Dark Card */}
                <section className="py-20 border-t border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto bg-gray-900 rounded-[2.5rem] p-12 md:p-16 text-center relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    Ignite <span className="text-teal-400">Innovation</span> in Your School
                                </h2>
                                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                                    Join {data.schools}+ schools in {data.name} that have already transformed their
                                    education with STEMmantra&apos;s comprehensive lab solutions.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <Link
                                        href="/contact"
                                        className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-900/20"
                                    >
                                        Request a Demo
                                    </Link>
                                    <a
                                        href="tel:+916356631515"
                                        className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                                    >
                                        Call: +91 6356631515
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
