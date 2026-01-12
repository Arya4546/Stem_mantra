"use client";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaSchool, FaUsers, FaAward, FaGlobeAsia, FaChalkboardTeacher, FaRobot } from "react-icons/fa";

const stats = [
  {
    icon: FaSchool,
    value: 500,
    suffix: "+",
    label: "Schools",
    description: "Partner institutions across India",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: FaUsers,
    value: 50000,
    suffix: "+",
    label: "Students",
    description: "Young innovators trained",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: FaChalkboardTeacher,
    value: 2000,
    suffix: "+",
    label: "Teachers",
    description: "Educators certified",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: FaGlobeAsia,
    value: 15,
    suffix: "+",
    label: "States",
    description: "Pan-India presence",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: FaAward,
    value: 100,
    suffix: "+",
    label: "Awards",
    description: "Recognition received",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: FaRobot,
    value: 1000,
    suffix: "+",
    label: "Labs",
    description: "Labs established",
    color: "from-rose-500 to-rose-600",
  },
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
      
      // Easing function for smooth animation
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
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <span ref={ref} className="counter-number">
      {formatNumber(count)}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Floating Icons Animation */}
      <SectionFloatingIcons count={2} zIndex={1} />
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-orange-400 rounded-full text-sm font-semibold mb-4 border border-white/10">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transforming Education{" "}
            <span className="bg-gradient-to-r from-orange-400 to-teal-400 bg-clip-text text-transparent">
              Across India
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            Numbers that speak for our commitment to quality STEM education
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card Glow */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500`}
              />
              
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 text-center h-full">
                {/* Icon */}
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>

                {/* Value */}
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-lg font-semibold text-white/90 mb-1">{stat.label}</div>

                {/* Description */}
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Growing Every Day</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <span className="text-gray-400">Join 500+ schools transforming education</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
