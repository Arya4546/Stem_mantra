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
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
      style={{ backgroundColor: 'var(--color-primary-dark)' }}
    >
      {/* Video Background */}
      {/* TODO: Compress home_video.mp4 (57MB) to WebM format, target <5MB for acceptable web performance */}
      <div className="absolute top-20 left-0 right-0 bottom-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/stem-education-banner.png"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/home_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15, 37, 64, 0.78) 0%, rgba(15, 37, 64, 0.50) 100%)' }} />
      </div>

      <FloatingAnimations variant="about" density="low" />

      {/* Main Content */}
      <motion.div style={{ y, opacity }} className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-48 z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-12 max-w-content">
        <div className="max-w-4xl flex-1">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-md border"
              style={{ color: 'var(--color-accent)', backgroundColor: 'rgba(232, 121, 43, 0.12)', borderColor: 'rgba(232, 121, 43, 0.25)' }}>
              India&apos;s leading STEM, Robotics, AI &amp; Coding Lab Education Provider
            </span>
          </motion.div>
 
          {/* Heavy SEO Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6"
            style={{ lineHeight: 1.1 }}
          >
            <span className="text-white block font-heading" style={{ fontSize: 'var(--text-5xl)' }}>Transforming Schools With Advanced 21st Century Skills Like</span>
            <span className="block mt-3 font-heading" style={{ fontSize: 'var(--text-6xl)', color: 'var(--color-accent)' }}>
              Robotics, STEM/STEAM &amp; AI &amp; Coding Labs
            </span>
          </motion.h1>

          {/* SEO rich Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="max-w-3xl mb-12 xl:mb-0"
            style={{ fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)' }}
          >
            <p>
              Partner with STEMmantra to establish <strong className="text-white" style={{ borderBottom: '2px solid var(--color-accent)', paddingBottom: '1px' }}>NEP 2020 &amp; NCF 2023 Aligned</strong> Atal Tinkering Labs (ATL) and comprehensive K-12 STEM labs.
              We provide end-to-end curriculum integration, industrial-grade equipment, and expert educator training to domestic and international schools.
            </p>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row xl:flex-col items-center xl:items-stretch justify-end w-full xl:w-fit flex-shrink-0 gap-3 mt-8 pb-32 xl:pb-0"
        >
          <Link
            href="/programs"
            className="group flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-base rounded-lg hover:brightness-110 transition-all duration-200 shadow-lg whitespace-nowrap w-full sm:w-auto"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            Explore Our Programs
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-base border border-white/25 hover:bg-white/20 hover:border-white/40 rounded-lg transition-all duration-200 whitespace-nowrap w-full sm:w-auto"
          >
            <FaPlay className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
            Watch Facility Tour
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="absolute bottom-8 left-0 right-0 z-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-content"
      >
        <div className="flex flex-wrap gap-x-10 gap-y-4 p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 max-w-3xl">
          <div>
            <div className="font-heading text-white leading-none mb-1.5" style={{ fontSize: 'var(--text-4xl)' }}>300+</div>
            <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Partner Schools</div>
          </div>
          <div className="w-px bg-white/20 hidden md:block"></div>
          <div>
            <div className="font-heading text-white leading-none mb-1.5" style={{ fontSize: 'var(--text-4xl)' }}>1,50,000+</div>
            <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Active Students</div>
          </div>
          <div className="w-px bg-white/20 hidden md:block"></div>
          <div>
            <div className="font-heading text-white leading-none mb-1.5" style={{ fontSize: 'var(--text-4xl)' }}>10+ Years</div>
            <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Industry Leadership</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
