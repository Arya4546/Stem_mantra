"use client";

import { motion } from "framer-motion";
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
    color: "text-teal-500",
    iconColor: "text-purple-600",
    Icon: FaUserGraduate,
  },
  {
    id: "intuitive",
    title: "Intuitive Methodology",
    description: "Hands-on experimentation, and project-based learning to create an engaging and transformative educational experience.",
    color: "text-red-500",
    iconColor: "text-red-500",
    Icon: FaProjectDiagram,
  },
  {
    id: "result",
    title: "Result oriented",
    description: "All kits & curriculum focused on specific leaning outcome.",
    color: "text-purple-800",
    iconColor: "text-purple-800",
    Icon: FaBullseye,
  },
];

const benefitsRight = [
  {
    id: "hybrid",
    title: "Hybrid mode of Execution",
    description: "In person activities in lab as well as online session.",
    color: "text-indigo-800",
    iconColor: "text-orange-500",
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
    color: "text-red-500",
    iconColor: "text-indigo-800",
    Icon: FaCogs,
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header matching page-05.png */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-orange-500 tracking-tight border-b-4 border-gray-900 inline-block pb-1">
            WHY STEMmantra?
          </h2>
        </div>

        {/* Centralized Layout for Desktop, Grid for Mobile */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 mt-8">
          
          {/* Left Column */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10 z-10">
            {benefitsLeft.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col lg:items-end lg:text-right"
              >
                <div className="flex items-center gap-3 lg:flex-row-reverse mb-2">
                  <div className={`w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center ${item.iconColor} shrink-0`}>
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${item.color}`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-700 font-medium text-sm md:text-base max-w-sm pl-14 lg:pl-0 lg:pr-14 leading-snug">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Graphic Container - Hidden on small screens to save vertical space */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex w-[30%] justify-center relative shrink-0 z-0 h-[400px] items-center"
          >
            {/* Base SVG drawing of interlocking gears from page-05.png abstraction */}
            <div className="relative w-[320px] h-[320px]">
              
              {/* Center Gear SVG (Dark Blue/Gray) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-300 animate-spin-slow opacity-80">
                <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.32c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
                </svg>
              </div>

              {/* Connecting Nodes representing the colorful outer gears */}
              <div className="absolute top-[8%] left-[18%] w-14 h-14 rounded-full border-4 border-purple-600 bg-white flex items-center justify-center animate-bounce-subtle z-20">
                <FaUserGraduate className="text-purple-600 w-5 h-5"/>
              </div>
              <div className="absolute top-[8%] right-[18%] w-14 h-14 rounded-full border-4 border-orange-500 bg-white flex items-center justify-center animate-bounce-subtle delay-100 z-20">
                <FaLaptopCode className="text-orange-500 w-5 h-5"/>
              </div>
              <div className="absolute top-[45%] left-[2%] w-14 h-14 rounded-full border-4 border-red-500 bg-white flex items-center justify-center animate-bounce-subtle delay-200 z-20">
                <FaProjectDiagram className="text-red-500 w-5 h-5"/>
              </div>
              <div className="absolute top-[45%] right-[2%] w-14 h-14 rounded-full border-4 border-green-600 bg-white flex items-center justify-center animate-bounce-subtle delay-300 z-20">
                <FaClipboardCheck className="text-green-600 w-5 h-5"/>
              </div>
              <div className="absolute bottom-[8%] left-[25%] w-14 h-14 rounded-full border-4 border-purple-800 bg-white flex items-center justify-center animate-bounce-subtle delay-500 z-20">
                <FaBullseye className="text-purple-800 w-5 h-5"/>
              </div>
              <div className="absolute bottom-[8%] right-[25%] w-14 h-14 rounded-full border-4 border-indigo-800 bg-white flex items-center justify-center animate-bounce-subtle delay-700 z-20">
                <FaCogs className="text-indigo-800 w-5 h-5"/>
              </div>

            </div>
          </motion.div>

          {/* Right Column */}
          <div className="w-full lg:w-[35%] flex flex-col gap-10 z-10 mt-10 lg:mt-0">
            {benefitsRight.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col lg:items-start lg:text-left"
              >
                <div className="flex items-center gap-3 lg:flex-row mb-2">
                  <div className={`w-12 h-12 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center ${item.iconColor} shrink-0`}>
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold ${item.color}`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-700 font-medium text-sm md:text-base max-w-sm pl-14 lg:pl-14 lg:pr-0 leading-snug">
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
