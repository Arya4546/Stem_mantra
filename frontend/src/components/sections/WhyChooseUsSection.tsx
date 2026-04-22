"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative pt-16 pb-12 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header - Matching Image precisely */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-orange-500 tracking-tight inline-block pb-2 border-b-[5px] border-gray-900 leading-none">
            WHY STEMmantra?
          </h2>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 mt-8">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10 z-10 order-2 lg:order-1">
            {benefitsLeft.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col lg:items-end lg:text-right"
              >
                <div className="flex items-center gap-4 lg:flex-row-reverse mb-2">
                  <div className={`w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center ${item.iconColor} shrink-0`}>
                    <item.Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-2xl font-black ${item.color} leading-none tracking-tight`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base max-w-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CENTER VISUAL */}
          <div className="hidden lg:flex w-full lg:w-[30%] justify-center relative h-[450px] items-center order-1 lg:order-2">


            {/* Orbit Glow */}
            <div className="absolute w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-50" />

            {/* Subtle Rotating Orbit Icons */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 40,
                ease: "linear"
              }}
              className="absolute w-full h-full flex items-center justify-center opacity-40 pointer-events-none"
            >
              {[
                { angle: 0, Icon: FaLaptopCode, color: "text-indigo-800" },
                { angle: 60, Icon: FaUserGraduate, color: "text-teal-600" },
                { angle: 120, Icon: FaClipboardCheck, color: "text-green-600" },
                { angle: 180, Icon: FaCogs, color: "text-rose-600" },
                { angle: 240, Icon: FaBullseye, color: "text-purple-700" },
                { angle: 300, Icon: FaProjectDiagram, color: "text-orange-600" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    transform: `
                      rotate(${item.angle}deg)
                      translate(140px)
                      rotate(-${item.angle}deg)
                    `,
                  }}
                >
                  <div className={`w-12 h-12 rounded-full bg-white shadow-lg border-2 border-white flex items-center justify-center ${item.color}`}>
                    <item.Icon className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CENTRAL GEAR */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                repeat: Infinity,
                duration: 50,
                ease: "linear"
              }}
              className="text-gray-200"
            >
              <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.32c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z" />
              </svg>
            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10 z-10 order-3">
            {benefitsRight.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className={`w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center ${item.iconColor} shrink-0`}>
                    <item.Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-2xl font-black ${item.color} leading-none tracking-tight`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base max-w-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}