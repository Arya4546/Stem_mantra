import type { Metadata } from "next";
import Link from "next/link";
import { FaRocket, FaGraduationCap, FaLightbulb, FaUsers, FaCertificate, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { testimonials } from "@/data/testimonials";
export const metadata: Metadata = {
  title: "STEM Mantra - Master The Skills, Drive Your Future",
  description: "Leading provider of robotics, AI, and STEM education solutions for schools. ATL Labs setup, teacher training, NEP 2020 aligned curriculum.",
};
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero with Soft Blur Background */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="absolute inset-0 blur-bg" />
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full filter blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-[30rem] h-[30rem] bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="relative container mx-auto px-4 py-20 text-center z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass shadow-sm hover-lift">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Leading STEM Education Provider in India</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="gradient-text">Master The Skills</span>
                <br />
                <span className="text-gray-900">Drive Your Future</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Empowering students with cutting-edge robotics, AI, and STEM education
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Link href="/contact" className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Get Started
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/programs/atl-labs" className="px-8 py-4 glass text-gray-900 rounded-full font-semibold border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 hover:scale-105">
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 relative bg-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/20 rounded-full filter blur-3xl" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Building Tomorrow&apos;s <span className="gradient-text">Innovators</span>
              </h2>
              <p className="text-lg text-gray-600">
                India&apos;s leading provider of robotics and STEM education solutions with NEP 2020 aligned curriculum
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: FaRocket, title: "Concept Based Learning", desc: "Strong foundation through interactive lessons" },
                { icon: FaGraduationCap, title: "Project Based Learning", desc: "Hands-on projects that develop practical skills" },
                { icon: FaLightbulb, title: "Innovation Based Learning", desc: "Encourage creativity and problem-solving" },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 relative bg-gradient-to-b from-white to-indigo-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Comprehensive <span className="gradient-text">STEM Solutions</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "ATL Labs",
                  subtitle: "Atal Tinkering Labs",
                  desc: "Complete setup with IoT, robotics, and 3D printing",
                  features: ["Lab Equipment", "Teacher Training", "Curriculum"],
                  gradient: "from-blue-500 to-indigo-600",
                  href: "/programs/atl-labs",
                },
                {
                  title: "Robotics & AI Labs",
                  subtitle: "Next-Gen Learning",
                  desc: "Advanced robotics and AI education labs",
                  features: ["Robots & Kits", "AI/ML Training", "Competitions"],
                  gradient: "from-purple-500 to-pink-600",
                  href: "/programs/robotics-lab",
                },
                {
                  title: "STEM Innovation Labs",
                  subtitle: "Hands-On Science",
                  desc: "Electronics, mechanics, coding labs",
                  features: ["Lab Setup", "Experiments", "Coding"],
                  gradient: "from-indigo-500 to-purple-600",
                  href: "/programs/stem-lab",
                },
              ].map((program, i) => (
                <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`h-2 bg-gradient-to-r ${program.gradient}`} />
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{program.title}</h3>
                      <p className="text-sm text-gray-500">{program.subtitle}</p>
                    </div>
                    <p className="text-gray-600">{program.desc}</p>
                    <ul className="space-y-2">
                      {program.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-700">
                          <FaCheckCircle className="w-5 h-5 text-green-500" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={program.href} className="inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-purple-600 group-hover:gap-3 transition-all">
                      Learn More <FaArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                What Schools <span className="gradient-text">Say About Us</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;{t.content}&quot;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-indigo-600">{t.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to Transform Your School?</h2>
              <p className="text-xl text-white/90">Join 500+ schools revolutionizing education</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Schedule a Demo <FaArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
