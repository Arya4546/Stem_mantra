"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-24"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/home_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
      </div>

      {/* Adding back Floating blobls instead of simple geometry */}
      <FloatingAnimations variant="about" density="low" />

      {/* Main Content — Responsive Flex Layout */}
      <motion.div style={{ y, opacity }} className="fit-hero-pad relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-48 z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-12">
        <div className="max-w-4xl flex-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-orange-300 uppercase tracking-wider bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-400/25 backdrop-blur-sm">
              India&apos;s leading STEM, Robotics, AI &amp; Coding Lab Education Provider
            </span>
          </motion.div>
 
          {/* Heavy SEO Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="fit-hero-a text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 tracking-tight"
          >
            <span className="text-white drop-shadow-2xl [text-shadow:_0_4px_8px_rgba(0,0,0,0.5)]">Transforming Schools With Advanced 21st Century Skills Like</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 fit-hero-b bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3 block font-black leading-[1.05]">
              Robotics, STEM/STEAM &amp; AI &amp; Coding Labs
            </span>
          </motion.h1>

          {/* SEO rich Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="fit-lead text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mb-12 xl:mb-0 leading-relaxed drop-shadow-md"
          >
            <p>
              Partner with STEMmantra to establish <strong className="text-white border-b-2 border-orange-500 px-1">NEP 2020 &amp; NCF 2023 Aligned</strong> Atal Tinkering Labs (ATL) and comprehensive K-12 STEM labs.
              We provide end-to-end curriculum integration, industrial-grade equipment, and expert educator training to domestic and international schools.
            </p>
          </motion.div>
        </div>

        {/* CTA Buttons - Firmly on the right side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row xl:flex-col items-center xl:items-stretch justify-end w-full xl:w-fit flex-shrink-0 gap-4 mt-8 pb-32 xl:pb-0"
        >
          <Link
            href="/programs"
            className="fit-btn group flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white font-bold text-base rounded-xl hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-orange-900/40 whitespace-nowrap w-full sm:w-auto"
          >
            Explore Our Programs
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="fit-btn group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold text-base border border-white/25 hover:bg-white/20 hover:border-white/40 rounded-xl transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
          >
            <FaPlay className="w-4 h-4 text-orange-400" />
            Watch Facility Tour
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats - Separated from parallax so it stays visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="absolute bottom-8 left-0 right-0 z-20 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-wrap gap-x-10 gap-y-5 px-6 py-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl max-w-3xl">
          <div>
            <div className="fit-num text-3xl font-black text-white leading-none mb-1.5">300+</div>
            <div className="text-xs text-gray-300 uppercase font-semibold tracking-wider">Partner Schools</div>
          </div>
          <div className="w-px bg-white/20 hidden md:block"></div>
          <div>
            <div className="fit-num text-3xl font-black text-white leading-none mb-1.5">1,50,000+</div>
            <div className="text-xs text-gray-300 uppercase font-semibold tracking-wider">Active Students</div>
          </div>
          <div className="w-px bg-white/20 hidden md:block"></div>
          <div>
            <div className="fit-num text-3xl font-black text-white leading-none mb-1.5">10+ Years</div>
            <div className="text-xs text-gray-300 uppercase font-semibold tracking-wider">Industry Leadership</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
