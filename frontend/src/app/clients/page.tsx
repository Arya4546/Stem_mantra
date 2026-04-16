"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap, FaMapMarkerAlt, FaSchool } from "react-icons/fa";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Generate an array of 12 partner image paths
const partners = Array.from({ length: 12 }, (_, i) => `/images/partners/partner-${i + 1}.png`);

export default function ClientsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50/50 pt-20">
        
        {/* PREMIUM HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 lg:py-32">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 lg:px-16 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                Trusted by Top Educational Institutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-teal-400">Across India</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We take pride in partnering with the nation's most forward-thinking schools to deploy state-of-the-art STEM, Robotics, and AI laboratories.
              </p>
            </motion.div>

            {/* INTEGRATED METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x divide-gray-700/50 text-center mx-auto max-w-5xl border-t border-gray-700/50 pt-12">
              {[
                { value: "500+", label: "Partner Schools" },
                { value: "100,000+", label: "Students Impacted" },
                { value: "50+", label: "Cities Reached" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400 font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFINITE SCROLLING MARQUEE */}
        <section className="py-20 overflow-hidden bg-white border-y border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide uppercase">Recognized By Industry Leaders</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="relative w-full overflow-hidden flex whitespace-nowrap bg-white py-10">
            {/* Left and Right Fade Gradients */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <motion.div 
              className="flex items-center space-x-12 px-6"
              animate={{ x: [0, -1035] }} // Adjust based on total width to loop
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            >
              {/* Duplicate the partner array twice for a seamless infinite loop effect */}
              {[...partners, ...partners].map((logo, idx) => (
                <div key={idx} className="relative w-56 h-28 flex-shrink-0">
                  <Image 
                    src={logo} 
                    alt={`Partner ${idx + 1}`} 
                    fill 
                    className="object-contain" 
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURED INSTITUTIONS MATRIX */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
          <div className="w-full mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">Our Esteemed Clients</h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                We empower visionary institutions with comprehensive STEM ecosystems. See who is leading the technological revolution in education.
              </p>
            </div>

            <div className="rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 gap-px">
                {partners.map((logo, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 md:p-12 flex items-center justify-center aspect-[4/3] lg:aspect-video relative transition-colors hover:bg-gray-50/50"
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={logo} 
                        alt={`Client Logo ${idx + 1}`} 
                        fill 
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FULL WIDTH CALL TO ACTION */}
        <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
          <div className="w-full mx-auto max-w-6xl">
             <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-12 md:p-20 text-center shadow-2xl">
               <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
               <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
               
               <div className="relative z-10 max-w-3xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Join the Next Generation of Educational Leaders</h2>
                 <p className="text-xl text-gray-300 mb-10">
                   Transform your school's curriculum with our custom-built ATL, Robotics, and STEM laboratories today.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                   <a href="/contact" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 transition-all">
                     Partner With Us
                   </a>
                   <a href="/programs" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-md transition-all border border-white/10">
                     Explore Programs
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
