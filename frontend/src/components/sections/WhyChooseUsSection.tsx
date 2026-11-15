"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaProjectDiagram,
  FaClipboardCheck,
  FaBullseye,
  FaCogs
} from "react-icons/fa";

const benefitsLeft = [
  {
    id: "discipline",
    title: "Discipline Expert",
    description: "Our mentors are highly qualified and well versed with STEM technologies.",
    color: "text-teal-600",
    iconColor: "text-teal-600",
    Icon: FaUserGraduate,
  },
  {
    id: "intuitive",
    title: "Intuitive Methodology",
    description: "Hands-on experimentation, and project-based learning to create an engaging and transformative educational experience.",
    color: "text-orange-600",
    iconColor: "text-orange-600",
    Icon: FaProjectDiagram,
  },
  {
    id: "result",
    title: "Result oriented",
    description: "All kits & curriculum focused on specific leaning outcome.",
    color: "text-purple-700",
    iconColor: "text-purple-700",
    Icon: FaBullseye,
  },
];

const benefitsRight = [
  {
    id: "hybrid",
    title: "Hybrid mode of Execution",
    description: "In person activities in lab as well as online session.",
    color: "text-indigo-800",
    iconColor: "text-indigo-800",
    Icon: FaLaptopCode,
  },
  {
    id: "ownership",
    title: "End to End ownership",
    description: "From lab setup to implementation, from project to exhibition.",
    color: "text-green-600",
    iconColor: "text-green-600",
    Icon: FaClipboardCheck,
  },
  {
    id: "curriculum",
    title: "Customized Curriculum",
    description: "Progressive curriculum based on student level & grade containing mix of technologies.",
    color: "text-rose-600",
    iconColor: "text-rose-600",
    Icon: FaCogs,
  },
];

const allBenefits = [...benefitsLeft, ...benefitsRight];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Gently cycle through the benefits until the visitor interacts
  useEffect(() => {
    if (paused || !isInView) return;
    const t = setInterval(() => setActive((i) => (i + 1) % allBenefits.length), 4500);
    return () => clearInterval(t);
  }, [paused, isInView]);

  const current = allBenefits[active];

  return (
    <section ref={ref} className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="grid lg:grid-cols-12 fit-gap gap-8 lg:gap-14 items-stretch">

          {/* Left — statement panel; icon + counter follow the active benefit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative overflow-hidden rounded-[2rem] bg-gray-900 text-white min-h-[360px] lg:min-h-[min(560px,calc(100svh_-_9rem))] flex flex-col justify-between p-8 md:p-12 fit-pad"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
              className="absolute -top-20 -right-24 text-white/[0.06]"
              aria-hidden
            >
              <svg width="480" height="480" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.32c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" /></svg>
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              className="absolute bottom-24 -left-16 text-orange-500/15"
              aria-hidden
            >
              <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.32c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" /></svg>
            </motion.div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.18),transparent_55%)]" />

            {/* Top: counter + active icon */}
            <div className="relative flex items-start justify-between">
              <div className="font-black leading-none tabular-nums">
                <span className="text-5xl md:text-6xl text-orange-500">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-xl text-white/40"> / {String(allBenefits.length).padStart(2, "0")}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center shadow-[0_0_60px_rgba(249,115,22,0.35)]"
                >
                  <current.Icon className="w-9 h-9 md:w-11 md:h-11 text-orange-400" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom: heading + progress */}
            <div className="relative">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-orange-400">Our Advantage</span>
              <h2 className="mt-4 text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-[0.95] fit-hero-b">
                Why<br />
                <span className="text-orange-500">STEM</span>mantra<span className="text-orange-500">?</span>
              </h2>
              <div className="mt-8 flex gap-2" role="tablist" aria-label="Benefits">
                {allBenefits.map((b, i) => (
                  <button
                    key={b.id}
                    role="tab"
                    aria-selected={i === active}
                    aria-label={b.title}
                    onClick={() => { setActive(i); setPaused(true); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-12 bg-orange-500" : "w-6 bg-white/25 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — numbered index; the active row is highlighted */}
          <ol
            className="lg:col-span-7 divide-y divide-gray-300 border-y border-gray-300 flex flex-col justify-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {allBenefits.map((item, idx) => {
              const isActive = idx === active;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  onMouseEnter={() => setActive(idx)}
                  onFocus={() => setActive(idx)}
                  onClick={() => setActive(idx)}
                  tabIndex={0}
                  className={`relative grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-x-4 sm:gap-x-6 px-2 sm:px-4 py-6 lg:py-7 fit-py items-start cursor-pointer outline-none transition-colors duration-300 ${isActive ? "bg-white/60" : "hover:bg-white/30"}`}
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-orange-500 origin-center transition-transform duration-300 ${isActive ? "scale-y-100" : "scale-y-0"}`}
                    aria-hidden
                  />
                  <span
                    className={`fit-num text-4xl sm:text-5xl font-black leading-none transition-all duration-300 ${isActive ? "text-orange-500 [-webkit-text-stroke:1.5px_#f97316]" : "text-transparent [-webkit-text-stroke:1.5px_#9ca3af]"}`}
                    aria-hidden
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className={`min-w-0 transition-transform duration-300 ${isActive ? "translate-x-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-1.5">
                      <item.Icon className={`w-5 h-5 shrink-0 ${item.iconColor}`} />
                      <h3 className={`fit-title text-xl lg:text-2xl font-black tracking-tight leading-tight ${item.color}`}>
                        {item.title}
                      </h3>
                    </div>
                    <p className={`fit-lead text-base lg:text-lg leading-relaxed max-w-2xl transition-colors ${isActive ? "text-gray-800" : "text-gray-600"}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

        </div>
      </div>
    </section>
  );
}
