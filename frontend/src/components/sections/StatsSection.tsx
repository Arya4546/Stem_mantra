"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { FaSchool, FaUsers, FaGlobeAsia } from "react-icons/fa";
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
      } else if (spanRef.current) {
        spanRef.current.textContent = `${formatNumber(value)}${suffix}`;
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
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
    <section ref={ref} className="relative py-20 overflow-hidden" style={{ backgroundColor: 'var(--color-primary-dark)', borderTop: '4px solid var(--color-accent)', borderBottom: '4px solid var(--color-accent)' }}>
      <FloatingAnimations variant="stem" density="low" />
      <div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
        <div className="mx-auto flex flex-col lg:flex-row items-center gap-14">

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-4 py-1.5 font-bold tracking-wider uppercase text-xs mb-6 rounded-md" style={{ backgroundColor: 'rgba(232, 121, 43, 0.15)', color: 'var(--color-accent)' }}>
              Quantifiable Academic Impact
            </div>
            <h2 className="font-heading text-white mb-6 leading-tight" style={{ fontSize: 'var(--text-5xl)' }}>
              Powering India&apos;s
              <br />
              <span style={{ color: 'var(--color-accent)' }}>STEM Revolution</span>
            </h2>
            <p className="text-lg leading-relaxed mb-5 font-medium" style={{ color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.7 }}>
              Through comprehensive Robotics labs and Atal Tinkering Lab integrations, we have established a demonstrable track record of elevating pedagogical standards and fostering deep technological literacy on a national scale.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: 'var(--text-base)', lineHeight: 1.7 }}>
              Our data-driven approach to experiential learning ensures measurable outcomes in student engagement, critical thinking assessments, and participation in national/international coding competition.
            </p>
          </motion.div>

          {/* Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-8 lg:gap-10"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col pl-5 py-2 pb-6" style={{ borderLeft: '3px solid var(--color-accent)' }}>
                <stat.icon className="w-7 h-7 mb-4 opacity-70" style={{ color: 'var(--color-accent)' }} />
                <div className="font-heading text-white mb-2 tracking-tight break-words" style={{ fontSize: 'var(--text-4xl)', fontVariantNumeric: 'tabular-nums' }}>
                  <AnimatedCounter value={stat.value} trigger={isInView} suffix={stat.suffix} />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
