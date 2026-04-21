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
      <div className="absolute top-20 left-0 right-0 bottom-0 z-0">
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

      {/* Adding back Floating blobls instead of simple geometry */}
      <FloatingAnimations variant="about" density="low" />

      {/* Main Content — Responsive Flex Layout */}
      <motion.div style={{ y, opacity }} className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-48 z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-12">
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
            <span className="text-sm font-bold text-orange-400 uppercase tracking-widest bg-orange-900/30 px-4 py-1.5 rounded-full border border-orange-500/20 backdrop-blur-sm">
              India&apos;s leading STEM, Robotics, AI &amp; Coding Lab Education Provider
            </span>
          </motion.div>
 
          {/* Heavy SEO Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6"
          >
            <span className="text-white drop-shadow-2xl [text-shadow:_0_4px_8px_rgba(0,0,0,0.5)]">Transforming Schools With Advanced 21st Century Skills Like</span>
            <br />
            <span className="text-orange-500 drop-shadow-2xl [text-shadow:_0_4px_12px_rgba(249,115,22,0.3)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-4 block font-black">
              Robotics, STEM/STEAM &amp; AI &amp; Coding Labs
            </span>
          </motion.h1>

          {/* SEO rich Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mb-12 xl:mb-0 leading-relaxed font-medium drop-shadow-md"
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
            className="group flex items-center justify-center gap-4 px-10 py-5 bg-orange-600 text-white font-black text-lg xl:text-xl rounded-xl hover:bg-orange-700 hover:scale-105 transition-all duration-300 shadow-xl shadow-orange-900/50 whitespace-nowrap w-full sm:w-auto"
          >
            Explore Our Programs
            <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="group flex items-center justify-center gap-4 px-10 py-5 bg-black/50 backdrop-blur-md text-white font-bold text-lg xl:text-xl border-2 border-white/20 hover:bg-black/80 hover:border-white/40 rounded-xl transition-all duration-300 whitespace-nowrap w-full sm:w-auto"
          >
            <FaPlay className="w-5 h-5 text-orange-400" />
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
        <div className="flex flex-wrap gap-x-12 gap-y-6 p-6 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 max-w-4xl">
          <div>
            <div className="text-4xl font-black text-white leading-none mb-2">300+</div>
            <div className="text-sm text-gray-400 uppercase font-bold tracking-widest">Partner Schools</div>
          </div>
          <div className="w-px bg-white/20 hidden md:block"></div>
          <div>
            <div className="text-4xl font-black text-white leading-none mb-2">1,50,000+</div>
            <div className="text-xs uppercase tracking-wider font-bold text-white/60">Active Students</div>
          </div>
          <div className="w-px bg-white/20 hidden md:block"></div>
          <div>
            <div className="text-4xl font-black text-white leading-none mb-2">10+ Years</div>
            <div className="text-sm text-gray-400 uppercase font-bold tracking-widest">Industry Leadership</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
