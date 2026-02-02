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
        description: "Gurugram, the millennium city, hosts many international and premium schools. Our STEM labs in Gurugram are designed to meet international standards with advanced robotics, AI, and coding infrastructure.",
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
    },
    {
        icon: FaLaptopCode,
        title: "Coding Workstations",
        description: "Modern computer systems with programming software and development environments",
    },
    {
        icon: FaFlask,
        title: "Science Equipment",
        description: "Complete science lab equipment for physics, chemistry, and biology experiments",
    },
    {
        icon: FaCogs,
        title: "3D Printing",
        description: "Industrial-grade 3D printers for prototyping and design thinking projects",
    },
];

const benefits = [
    "NEP 2020 aligned curriculum",
    "Trained and certified instructors",
    "Regular workshops and training",
    "Competition preparation support",
    "Annual maintenance included",
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
                <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40 pt-32 pb-16">
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
            <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-teal-500 opacity-10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
                                <FaMapMarkerAlt className="w-4 h-4" />
                                {data.state}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                STEM Labs in{" "}
                                <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                                    {data.name}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                                {data.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
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

                {/* Stats Section */}
                <section className="py-12 bg-white border-y border-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-orange-500">{data.schools}+</div>
                                <div className="text-gray-600">Schools Served</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-teal-500">{data.students.toLocaleString()}+</div>
                                <div className="text-gray-600">Students Trained</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-purple-500">50+</div>
                                <div className="text-gray-600">Expert Trainers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-500">98%</div>
                                <div className="text-gray-600">Satisfaction Rate</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                What Our STEM Labs in {data.name} Include
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Complete turnkey STEM lab solutions designed for schools in {data.name}
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Areas Covered */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Areas We Cover in {data.name}
                            </h2>
                            <p className="text-gray-600">
                                We provide STEM lab solutions across all major areas in {data.name}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {data.highlights.map((area, index) => (
                                <span
                                    key={index}
                                    className="px-6 py-3 bg-white rounded-full text-gray-700 font-medium shadow-sm border border-gray-200"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Why Choose STEMmantra for Your School in {data.name}?
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    We provide comprehensive STEM education solutions that transform classrooms into
                                    innovation labs. Our proven methodology has helped thousands of students develop
                                    critical thinking and problem-solving skills.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-500 to-teal-500 rounded-3xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">Get Started Today</h3>
                                <p className="mb-6 opacity-90">
                                    Transform your school with our comprehensive STEM lab solutions.
                                    Contact us for a free consultation and quote.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-500 rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    <FaPhone className="w-4 h-4" />
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Set Up a STEM Lab in Your {data.name} School?
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                            Join {data.schools}+ schools in {data.name} that have already transformed their
                            education with STEMmantra&apos;s comprehensive lab solutions.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
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
