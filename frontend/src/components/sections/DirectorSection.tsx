"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function DirectorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} id="director-section" className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden z-20">
      <FloatingAnimations variant="about" density="low" />

      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 fit-gap items-center">

          {/* Photo — height follows the screen so the whole section stays in frame */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:col-span-4 xl:col-span-4"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] group aspect-[4/5] lg:aspect-auto lg:h-[clamp(20rem,calc(100svh_-_11rem),40rem)]">
              <img
                src="/images/director.png"
                alt="Saurabh Agrahari - Director of STEMmantra"
                className="w-full h-full object-cover scale-110 object-top transition-transform duration-700 group-hover:scale-[1.15]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-5 left-5 right-5 px-5 py-4 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <div className="text-lg font-black text-gray-900">Saurabh Agrahari</div>
                <div className="text-orange-600 font-bold text-xs uppercase tracking-widest">Director, STEMmantra</div>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full -z-10 mix-blend-multiply filter blur-2xl opacity-70 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-teal-100 rounded-full -z-10 mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col lg:col-span-8"
          >
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4 w-fit">
              Visionary Leadership
            </span>

            <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              About the <span className="text-orange-500">Director</span>
            </h2>

            <div className="fit-stack space-y-4 fit-lead text-base md:text-lg text-gray-600 leading-relaxed text-left mb-6 fit-mb">
              <p>
                <strong className="text-gray-900 font-bold">Saurabh Agrahari</strong>, director of STEMMANTRA, leads the education technology company with visionary expertise in both education and technology.
              </p>
              <p>
                He has successfully facilitated more than <strong className="text-orange-600">300+ schools</strong> in establishing state-of-the-art laboratories across <strong className="text-orange-600">16+ states</strong> in India. Under his guidance, STEMMANTRA develops innovative STEM learning tools that make science, technology, engineering, and mathematics engaging and accessible for all students.
              </p>
              <p>
                Committed to excellence and inclusivity, Saurabh champions diversity in STEM education and fosters strategic partnerships with schools and institutions. His leadership ensures STEMMANTRA remains at the forefront of Ed-tech, creating interactive and immersive learning experiences that inspire and empower the next generation of learners.
              </p>
            </div>

            <div className="relative px-7 py-5 fit-py bg-white/90 rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-500 to-teal-500" />
              <FaQuoteLeft className="text-orange-200 w-8 h-8 mb-2" />
              <blockquote className="fit-title text-lg md:text-xl font-bold text-gray-900 mb-2 italic leading-relaxed relative z-10">
                &quot;STEM is not just a collection of subjects. It is a philosophy, a way of thinking, and a way of approaching the world. It&apos;s about innovation, creativity, and problem-solving.&quot;
              </blockquote>
              <cite className="block text-right text-gray-500 font-bold not-italic tracking-wider uppercase text-xs">
                — Mae Jemison
              </cite>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
