"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingAnimations from "@/components/animations/FloatingAnimations";
import {
  FaGraduationCap,
  FaRobot,
  FaLightbulb,
  FaUsers,
  FaAward,
  FaSchool,
  FaHandshake,
  FaChalkboardTeacher,
  FaGlobeAsia,
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaHeart,
  FaStar,
  FaCogs,
  FaBrain,
} from "react-icons/fa";
import {
  Sparkles,
  Target,
  Eye,
  Award,
  BookOpen,
  Users,
  Zap,
  Trophy,
  CheckCircle,
} from "lucide-react";

const stats = [
  { number: "10,000+", label: "Students Trained", icon: FaGraduationCap, color: "from-orange-500 to-orange-600" },
  { number: "500+", label: "Schools Partnered", icon: FaSchool, color: "from-teal-500 to-teal-600" },
  { number: "15+", label: "States Covered", icon: FaGlobeAsia, color: "from-blue-500 to-blue-600" },
  { number: "200+", label: "Expert Trainers", icon: FaChalkboardTeacher, color: "from-purple-500 to-purple-600" },
];

const coreValues = [
  {
    icon: FaLightbulb,
    title: "Innovation First",
    description: "We believe in pushing boundaries and embracing cutting-edge technologies to shape the future of education.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: FaUsers,
    title: "Student-Centric",
    description: "Every program is designed with students at the center, ensuring engaging, accessible, and impactful learning experiences.",
    color: "bg-teal-100 text-teal-600",
  },
  {
    icon: FaHandshake,
    title: "Collaborative Growth",
    description: "We partner with schools, educators, and communities to create sustainable STEM education ecosystems.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FaAward,
    title: "Excellence in Delivery",
    description: "Our commitment to quality ensures every workshop, lab setup, and training program meets the highest standards.",
    color: "bg-purple-100 text-purple-600",
  },
];

const timeline = [
  { year: "2018", title: "The Beginning", description: "STEMmantra was founded with a vision to revolutionize STEM education in India." },
  { year: "2019", title: "First 100 Schools", description: "Expanded our reach to 100+ schools across 5 states with hands-on robotics programs." },
  { year: "2020", title: "ATL Lab Expertise", description: "Became a leading partner for Atal Tinkering Lab setup and training programs." },
  { year: "2021", title: "NEP 2020 Alignment", description: "Redesigned curriculum to align with National Education Policy 2020 guidelines." },
  { year: "2022", title: "AI Integration", description: "Introduced AI and Machine Learning modules to our robotics curriculum." },
  { year: "2023", title: "10,000 Students", description: "Reached the milestone of training 10,000+ students across India." },
  { year: "2024", title: "National Expansion", description: "Expanded to 15+ states with specialized STEM, AI, and Robotics Labs." },
];

const services = [
  {
    icon: FaRobot,
    title: "Robotics Labs",
    description: "Complete turnkey robotics lab solutions with curriculum, hardware, and training support.",
  },
  {
    icon: FaBrain,
    title: "AI & ML Labs",
    description: "Cutting-edge artificial intelligence and machine learning labs for future-ready students.",
  },
  {
    icon: FaLightbulb,
    title: "ATL Labs",
    description: "Atal Tinkering Lab setup, mentorship, and innovation programs aligned with government initiatives.",
  },
  {
    icon: FaCogs,
    title: "STEM Labs",
    description: "Integrated Science, Technology, Engineering, and Mathematics laboratories for holistic learning.",
  },
];

const whyChooseUs = [
  "NEP 2020 aligned curriculum designed by experts",
  "Complete turnkey lab solutions",
  "Certified and experienced trainers",
  "Continuous support and maintenance",
  "Competition and olympiad preparation",
  "Industry partnerships and certifications",
];

export default function AboutContent() {
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);
  const isMissionInView = useInView(missionRef, { once: true });
  const isValuesInView = useInView(valuesRef, { once: true });
  const isTimelineInView = useInView(timelineRef, { once: true });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-16 px-4">
          {/* Animated Background Elements */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl"></div>
          <FloatingAnimations density="low" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-teal-500/10 rounded-full text-sm font-medium text-orange-600 border border-orange-200">
                <Sparkles className="w-4 h-4" />
                India&apos;s Leading STEM Education Provider
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  STEM
                </span>{" "}
                <span className="text-gray-900">Mantra</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Empowering the next generation of innovators through world-class STEM education,
                cutting-edge robotics labs, and transformative learning experiences. We are on a mission
                to make quality STEM education accessible to every student in India.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section ref={missionRef} className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
                  <div className="relative bg-gradient-to-br from-orange-50 to-teal-50 rounded-3xl p-8 border border-orange-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To democratize STEM education by providing schools with world-class robotics labs,
                      AI-powered learning tools, and trained educators. We aim to nurture curiosity,
                      foster innovation, and prepare students for the challenges of tomorrow.
                    </p>
                  </div>
                </div>

                <div className="relative mt-8">
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl"></div>
                  <div className="relative bg-gradient-to-br from-teal-50 to-orange-50 rounded-3xl p-8 border border-teal-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      To be India&apos;s most trusted partner in STEM education, reaching 1 million students
                      by 2030. We envision a future where every school has access to cutting-edge
                      technology labs and every student has the opportunity to become an innovator.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isMissionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-orange-100 via-white to-teal-100 flex items-center justify-center p-8">
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-xl bg-white p-4">
                    <img
                      src="https://stemmantra.com/assets/img/Custom/Newlogo.jpeg"
                      alt="STEMmantra Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full flex items-center justify-center">
                      <FaRocket className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">6+ Years</div>
                      <div className="text-gray-600">of Excellence</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section ref={valuesRef} className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 rounded-full text-sm font-medium text-teal-700 mb-4">
                <FaHeart className="w-4 h-4" />
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from designing curriculum to partnering with schools.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 rounded-xl ${value.color} flex items-center justify-center mb-4`}>
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-sm font-medium text-orange-400 mb-4">
                <Zap className="w-4 h-4" />
                Our Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete Lab Solutions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                End-to-end solutions for setting up world-class STEM, AI, and Robotics labs in schools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-medium text-orange-700 mb-4">
                <Trophy className="w-4 h-4" />
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The STEMmantra Story</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From a small startup to India&apos;s leading STEM education provider - our journey of innovation and impact.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-500 via-teal-500 to-orange-500 rounded-full hidden lg:block"></div>

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 mb-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-full text-sm font-bold mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-orange-50 to-teal-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-sm font-medium text-orange-700 mb-4">
                  <FaStar className="w-4 h-4" />
                  Why STEMmantra
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  What Makes Us Different
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  We don&apos;t just set up labs - we build complete STEM education ecosystems with
                  ongoing support, training, and innovation.
                </p>

                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
                      <div className="text-sm text-gray-600">School Satisfaction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-teal-500 mb-2">24/7</div>
                      <div className="text-sm text-gray-600">Support Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-500 mb-2">50+</div>
                      <div className="text-sm text-gray-600">Awards Won</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-500 mb-2">15+</div>
                      <div className="text-sm text-gray-600">States Covered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Transform Your School?
                </h2>
                <p className="text-orange-100 mb-8 max-w-2xl mx-auto text-lg">
                  Join 500+ schools that have already partnered with STEMmantra to bring
                  world-class STEM education to their students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Get Started Today
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
                  >
                    Explore Programs
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
