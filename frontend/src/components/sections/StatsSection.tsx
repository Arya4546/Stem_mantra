"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FaSchool, FaUsers, FaAward, FaGlobeAsia } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const stats = [
  { icon: FaSchool, value: 300, suffix: "+", label: "Partner Institutions" },
  { icon: FaUsers, value: 150000, suffix: "+", label: "Student Innovators" },
  { icon: FaGlobeAsia, value: 16, suffix: "+", label: "States Impacted" },
];

function AnimatedCounter({ value, suffix = "", duration = 2000, trigger = true }: { value: number; suffix?: string; duration?: number; trigger?: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const formatNumber = useCallback((num: number) => {
    return num.toLocaleString('en-IN');
  }, []);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number;
    let animationFrame: number;
    let finished = false;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * value);

      // Direct DOM update — avoids React re-render on every frame
      if (spanRef.current) {
        spanRef.current.textContent = `${formatNumber(current)}${suffix}`;
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        finished = true;
        if (spanRef.current) spanRef.current.textContent = `${formatNumber(value)}${suffix}`;
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrame);
      // If interrupted (e.g. dev StrictMode re-run), allow the animation to restart
      if (!finished) hasAnimated.current = false;
    };
  }, [trigger, value, duration, suffix, formatNumber]);

  return (
    <span ref={spanRef} style={{ willChange: 'contents' }}>
      {formatNumber(0)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="fit relative py-16 lg:py-20 bg-gray-900 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <FloatingAnimations variant="stem" density="low" />
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* The Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-4 py-1.5 bg-white/10 border border-white/10 text-orange-300 font-bold tracking-wider uppercase text-sm mb-5 rounded-full">
              Quantifiable Academic Impact
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
              Powering India&apos;s
              <br />
              <span className="text-orange-500">STEM Revolution</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-5">
              Through comprehensive Robotics labs and Atal Tinkering Lab integrations, we have established a demonstrable track record of elevating pedagogical standards and fostering deep technological literacy on a national scale.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Our data-driven approach to experiential learning ensures measurable outcomes in student engagement, critical thinking assessments, and participation in national/international coding competition.
            </p>
          </motion.div>

          {/* The Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-1/2 flex flex-col gap-4 w-full"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="group flex items-center gap-5 sm:gap-7 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-orange-500/50 hover:bg-white/10 hover:translate-x-1 transition-all rounded-2xl p-5 sm:p-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500/25 to-orange-500/5 border border-orange-500/20 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-orange-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent mb-1 tracking-tight break-words leading-none">
                    <AnimatedCounter value={stat.value} trigger={isInView} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
