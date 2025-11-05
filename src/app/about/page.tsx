import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaAward,
  FaChartLine,
  FaHandshake,
  FaGraduationCap,
  FaCertificate,
} from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About STEM Mantra | Leading STEM Education Provider in India",
  description:
    "Learn about STEM Mantra's mission to revolutionize STEM education in India. Over 1000+ students trained, 50+ schools transformed, and 10+ states reached.",
  openGraph: {
    title: "About STEM Mantra | Leading STEM Education Provider in India",
    description:
      "Learn about STEM Mantra's mission to revolutionize STEM education in India. Over 1000+ students trained, 50+ schools transformed.",
    type: "website",
  },
};

const stats = [
  { value: "1000+", label: "Students Trained", icon: FaGraduationCap },
  { value: "50+", label: "Schools Partnered", icon: FaHandshake },
  { value: "10+", label: "States Covered", icon: FaChartLine },
  { value: "100+", label: "Teachers Trained", icon: FaCertificate },
];

const values = [
  {
    icon: FaLightbulb,
    title: "Innovation First",
    description:
      "We believe in fostering creativity and innovation through hands-on learning experiences that challenge students to think beyond textbooks.",
  },
  {
    icon: FaUsers,
    title: "Student-Centric",
    description:
      "Every program is designed with students at the center, ensuring they gain practical skills and confidence in STEM subjects.",
  },
  {
    icon: FaAward,
    title: "Excellence in Quality",
    description:
      "We maintain the highest standards in curriculum design, equipment, and training to deliver world-class STEM education.",
  },
  {
    icon: FaHandshake,
    title: "Partnership Approach",
    description:
      "We work closely with schools, teachers, and parents to create a comprehensive ecosystem for STEM learning.",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Foundation",
    description: "STEM Mantra was founded with a vision to transform STEM education in India.",
  },
  {
    year: "2019",
    title: "First ATL Lab",
    description: "Successfully setup our first Atal Tinkering Lab in partnership with NITI Aayog.",
  },
  {
    year: "2020",
    title: "Expansion",
    description: "Reached 10+ schools across 3 states, training over 500 students.",
  },
  {
    year: "2021",
    title: "Digital Innovation",
    description: "Launched online training modules and virtual labs during the pandemic.",
  },
  {
    year: "2022",
    title: "Recognition",
    description: "Received multiple awards for excellence in STEM education delivery.",
  },
  {
    year: "2023",
    title: "Scale Up",
    description: "Expanded to 50+ schools across 10+ states with 1000+ students trained.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Soft blur backgrounds */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">About STEM Mantra</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Empowering the next generation of innovators through world-class STEM education
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <FaRocket className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our <span className="gradient-text">Mission</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To revolutionize STEM education in India by providing cutting-edge labs, 
                  comprehensive training, and innovative curriculum that prepares students 
                  for the challenges of tomorrow. We aim to make quality STEM education 
                  accessible to every school and inspire young minds to become future innovators.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <FaLightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Our <span className="gradient-text">Vision</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be India&apos;s leading STEM education provider, transforming schools into 
                  innovation hubs where students don&apos;t just learn concepts but create solutions. 
                  We envision a future where every child has hands-on experience with robotics, 
                  AI, and emerging technologies, building a generation ready for Industry 4.0.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="container relative mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
              Our Impact in Numbers
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Core <span className="gradient-text">Values</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at STEM Mantra
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From a small startup to India&apos;s trusted STEM education partner
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {item.year}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Schools Choose <span className="gradient-text">STEM Mantra</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                We don&apos;t just setup labs, we transform educational experiences. Our comprehensive 
                approach includes world-class equipment, expert training, innovative curriculum, 
                and ongoing support to ensure your school stays at the forefront of STEM education.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  Get Started Today
                </Link>
                <Link href="/programs/atl-labs" className="inline-block px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
