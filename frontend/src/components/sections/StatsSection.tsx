"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaSchool, FaUsers, FaAward, FaGlobeAsia, FaChalkboardTeacher, FaRobot } from "react-icons/fa";

const stats = [
  { icon: FaSchool, value: 500, suffix: "+", label: "Schools", color: "text-orange-500" },
  { icon: FaUsers, value: 50000, suffix: "+", label: "Students", color: "text-teal-500" },
  { icon: FaChalkboardTeacher, value: 2000, suffix: "+", label: "Teachers", color: "text-purple-500" },
  { icon: FaGlobeAsia, value: 15, suffix: "+", label: "States", color: "text-blue-500" },
  { icon: FaAward, value: 100, suffix: "+", label: "Awards", color: "text-amber-500" },
  { icon: FaRobot, value: 1000, suffix: "+", label: "Labs", color: "text-rose-500" },
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
    if (num >= 1000) {
      return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "K";
    }
    return num.toString();
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
    <section ref={ref} className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Compact horizontal strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Minimal header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Impact{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Across India
              </span>
            </h2>
          </div>

          {/* Stats in a single row with separators */}
          <div className="flex flex-wrap justify-center items-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center"
              >
                <div className="text-center px-6 py-4 md:px-8">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    <span className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
                {/* Separator */}
                {index < stats.length - 1 && (
                  <div className="hidden md:block w-px h-10 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
