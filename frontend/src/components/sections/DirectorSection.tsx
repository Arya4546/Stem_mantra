"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function DirectorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="director-section" className="relative py-16 lg:py-24 bg-white overflow-hidden z-20">
      {/* Floating animations pushed to sides */}
      <FloatingAnimations variant="about" density="low" />

      <div className="site-container relative z-10">
        <div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Column with requested cropping logic */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">
                {/* 
                   The 'scale-110' and 'object-top' are used to "cut just a little" from the edges 
                   as requested to fix the "white analyze" issue.
                */}
                <img
                  src="/images/director.png"
                  alt="Saurabh Agrahari - Director of STEMmantra"
                  className="w-full h-full object-cover scale-110 object-top transition-transform duration-700 group-hover:scale-115"
                />
                
                {/* Decorative overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-xl font-black text-gray-900">Saurabh Agrahari</div>
                  <div className="text-orange-600 font-bold text-sm uppercase tracking-widest">Director, STEMmantra</div>
                </div>
              </div>
              
              {/* Background accent */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full -z-10 mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-teal-100 rounded-full -z-10 mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700" />
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col"
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-black uppercase tracking-widest mb-6 w-fit">
                Visionary Leadership
              </span>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
                About the <span className="text-orange-500">Director</span>
              </h2>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-10">
                <p>
                  <strong className="text-gray-900 font-bold text-xl">Saurabh Agrahari</strong>, director of STEMMANTRA, leads the education technology company with visionary expertise in both education and technology.
                </p>
                <p>
                  He has successfully facilitated more than <strong className="text-orange-600">500+ schools</strong> in establishing state-of-the-art laboratories across <strong className="text-orange-600">16+ states</strong> in India. Under his guidance, STEMMANTRA develops innovative STEM learning tools that make science, technology, engineering, and mathematics engaging and accessible for all students.
                </p>
                <p>
                  Committed to excellence and inclusivity, Saurabh champions diversity in STEM education and fosters strategic partnerships with schools and institutions. His leadership ensures STEMMANTRA remains at the forefront of Ed-tech, creating interactive and immersive learning experiences that inspire and empower the next generation of learners.
                </p>
              </div>

              {/* Inspiration Quote Section from Brochure */}
              <div className="relative p-8 md:p-10 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <FaQuoteLeft className="text-orange-200 w-12 h-12 mb-4" />
                <blockquote className="text-xl md:text-2xl font-bold text-gray-900 mb-4 italic leading-relaxed relative z-10">
                  &quot;STEM is not just a collection of subjects. It is a philosophy, a way of thinking, and a way of approaching the world. It&apos;s about innovation, creativity, and problem-solving.&quot;
                </blockquote>
                <cite className="block w-fit ml-auto text-right text-gray-500 font-bold not-italic tracking-wider uppercase text-sm">
                  - Mae Jemison
                </cite>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

