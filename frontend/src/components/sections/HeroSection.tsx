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

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-[860px] flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-40 pb-16"
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
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Floating Animations - Higher Density & Visibility */}
      <FloatingAnimations variant="about" density="high" />

      {/* Main Content — Wider Layout */}
      <motion.div
        style={{ y, opacity }}
        className="site-container-wide relative z-10"
      >
        <div className="w-full max-w-5xl space-y-8 text-center md:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-orange-400 uppercase tracking-widest bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-500/20 backdrop-blur-sm">
              India&apos;s leading STEM, Robotics, AI &amp; Coding Lab Education Provider
            </span>
          </motion.div>
 
          {/* Main Headline - One Line goal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight"
          >
            <span className="text-white drop-shadow-2xl [text-shadow:_0_4px_8px_rgba(0,0,0,0.5)]">Master The Skills </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300 drop-shadow-sm">
              Drive Your Future...
            </span>
          </motion.h1>

          {/* Detailed Sub Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-[1.2] mb-2"
          >
            <span className="text-white/90 drop-shadow-2xl">Transforming Schools With Advanced 21st Century Skills Like</span>
            <br className="hidden lg:block" />
            <span className="text-orange-500 drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl lg:text-5xl mt-4 block font-black">
              Robotics, STEM/STEAM &amp; AI &amp; Coding Labs
            </span>
          </motion.h2>

          {/* SEO rich Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-gray-200 max-w-4xl mb-6 leading-relaxed font-medium drop-shadow-md"
          >
            <p>
              Partner with STEMmantra to establish <strong className="text-white border-b-2 border-orange-500 px-1">NEP 2020 &amp; NCF 2023 Aligned</strong> Atal Tinkering Labs (ATL) and comprehensive K-12 STEM labs.
              We provide end-to-end curriculum integration, industrial-grade equipment, and expert educator training to domestic and international schools.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-4 mb-10"
          >
            <Link
              href="/programs"
              className="group flex items-center justify-center gap-3 px-8 lg:px-10 py-4 bg-orange-600 text-white font-black text-lg lg:text-xl rounded-xl hover:bg-orange-700 hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-orange-900/50"
            >
              Explore Our Curriculums
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="group flex items-center justify-center gap-3 px-8 lg:px-10 py-4 bg-black/50 backdrop-blur-md text-white font-bold text-lg lg:text-xl border-2 border-white/20 hover:bg-black/80 hover:border-white/40 rounded-xl transition-all duration-300"
            >
              <FaPlay className="w-5 h-5 text-orange-400" />
              Watch Facility Tour
            </Link>
          </motion.div>

          {/* Stats Section - Broadened */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 md:p-8 bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 max-w-4xl md:max-w-none mx-auto md:mx-0"
          >
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-black text-white leading-none mb-2">500+</div>
              <div className="text-sm text-gray-400 uppercase font-black tracking-[0.2em]">Partner Schools</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-black text-white leading-none mb-2">1,50,000+</div>
              <div className="text-sm text-gray-400 uppercase font-black tracking-[0.2em]">Active Students</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-black text-white leading-none mb-2">10+ Years</div>
              <div className="text-sm text-gray-400 uppercase font-black tracking-[0.2em]">Industry Leadership</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
