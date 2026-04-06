"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaSchool, FaUsers, FaAward, FaGlobeAsia } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const stats = [
  { icon: FaSchool, value: 500, suffix: "+", label: "Partner Institutions" },
  { icon: FaUsers, value: 150000, suffix: "+", label: "Student Innovators" },
  { icon: FaGlobeAsia, value: 16, suffix: "+", label: "States Impacted" },
];

function AnimatedCounter({ value, suffix = "", duration = 2000 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <span ref={ref}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-16 lg:py-20 bg-gray-900 border-y-8 border-orange-500 overflow-hidden">
      <FloatingAnimations variant="stem" density="low" />
      <div className="site-container relative z-10">

        {/* Massive text block instead of card grid */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16">

          {/* The Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-4 py-1.5 bg-gray-800 text-orange-400 font-black tracking-widest uppercase text-sm mb-6 rounded-none">
              Quantifiable Academic Impact
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
              Powering India&apos;s
              <br />
              <span className="text-orange-500">STEM Revolution</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
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
            className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col border-l-4 border-orange-500 pl-6 py-2 pb-6">
                <stat.icon className="w-8 h-8 text-orange-500 mb-4 opacity-80" />
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
