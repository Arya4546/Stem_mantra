"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaPlay, FaRocket, FaUsers, FaAward } from "react-icons/fa";

const stats = [
  { icon: FaUsers, value: "500+", label: "Schools" },
  { icon: FaRocket, value: "50,000+", label: "Students" },
  { icon: FaAward, value: "100+", label: "Awards" },
];

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Subtle geometric accent — top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.07] hidden md:block">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="100" r="200" stroke="#f97316" strokeWidth="1" />
          <circle cx="400" cy="100" r="140" stroke="#14b8a6" strokeWidth="1" />
          <circle cx="400" cy="100" r="80" stroke="#f97316" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Content — Left aligned */}
      <motion.div style={{ y, opacity }} className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/15 border border-orange-500/30 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-orange-300">
              India&apos;s #1 STEM Education Provider
            </span>
          </motion.div>

          {/* Main Heading — No typing animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
          >
            <span className="text-white">Master The Skills,</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
              Drive Your Future
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 leading-relaxed"
          >
            Empowering students with cutting-edge{" "}
            <span className="text-orange-400 font-semibold">Robotics</span>,{" "}
            <span className="text-teal-400 font-semibold">AI</span>, and{" "}
            <span className="text-purple-400 font-semibold">STEM Education</span>
          </motion.p>

          {/* CTA Buttons — Left aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-start gap-4 mb-16"
          >
            <Link
              href="/programs"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:translate-y-[-2px] transition-all duration-300"
            >
              Explore Programs
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/15 hover:border-white/40 transition-all duration-300"
            >
              <FaPlay className="w-4 h-4" />
              Watch Video
            </Link>
          </motion.div>

          {/* Stats — Small cards in a row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex flex-wrap gap-4"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-5 py-3 bg-white/[0.08] backdrop-blur-sm rounded-xl border border-white/10"
              >
                <stat.icon className="w-5 h-5 text-orange-400" />
                <div>
                  <div className="text-xl font-bold text-white leading-tight">{stat.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-xs uppercase tracking-widest">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Diagonal bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80H1440V20L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
