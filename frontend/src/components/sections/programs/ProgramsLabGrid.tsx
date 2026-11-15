"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { programs } from "@/data/programs";

export default function ProgramsLabGrid() {
  const [activeStep, setActiveStep] = useState(0);

  const displayPrograms = programs
    .filter((p) => p.id !== "robotics-lab")
    .map((p) => {
      if (p.id === "steamverse-lab") {
        return {
          ...p,
          name: "STEAM & Robotics Lab",
          seoSubtitle: "STEAM & Robotics Innovation Lab for Schools",
          techTags: ["Robotics", "IoT", "Electronics", "3D Printing", "Sensors"],
        };
      }
      return p;
    });

  // Auto-advance tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % displayPrograms.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayPrograms.length]);

  return (
    <section id="lab-grid" className="py-8 md:py-12 px-4 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-[1.1] tracking-tight">
            Explore our state-of-the-art <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500">
              STEM & Innovation Labs
            </span>
          </h2>
        </div>

        {/* Interactive Tabs with Progress Bar */}
        <div className="bg-white rounded-full p-1.5 border border-gray-100 shadow-md shadow-gray-200/50 mb-6 overflow-x-auto no-scrollbar flex items-center justify-between min-w-max md:min-w-0">
          {displayPrograms.map((program, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={program.id}
                onClick={() => setActiveStep(i)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300 flex-1 whitespace-nowrap overflow-hidden ${isActive ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <div className="relative z-10 flex flex-col items-center w-full text-center">
                  <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    0{i + 1}
                  </span>
                  <span className={`text-xs md:text-sm font-bold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {program.name.replace(" Lab", "")}
                  </span>
                </div>
                {/* Progress Bar for Active Tab */}
                {isActive && (
                  <motion.div
                    key={`progress-${i}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute bottom-0 left-0 h-1 bg-orange-500 z-20"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Card Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1.2fr_1fr] h-full"
            >
              {/* Left Panel */}
              <div className="p-6 lg:p-10 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`px-3 py-1.5 rounded-full ${displayPrograms[activeStep].accentBg} flex items-center justify-center border border-gray-100`}>
                     <span className={`text-[10px] font-black uppercase tracking-widest ${displayPrograms[activeStep].accentText}`}>
                       {displayPrograms[activeStep].gradeRange}
                     </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                      {displayPrograms[activeStep].seoSubtitle}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-black text-slate-800 mb-4 leading-tight">
                  {displayPrograms[activeStep].name}
                </h3>
                
                <p className="text-slate-600 text-sm md:text-base mb-6 leading-relaxed font-medium line-clamp-3">
                  {displayPrograms[activeStep].description}
                </p>

                <div className="space-y-2 mb-6">
                  {displayPrograms[activeStep].learningOutcomes.slice(0, 3).map((outcome, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-1.5">
                      <div className={`w-5 h-5 rounded-full ${displayPrograms[activeStep].accentBg} flex items-center justify-center flex-shrink-0`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${displayPrograms[activeStep].accentText}`} />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                   <Link
                      href={displayPrograms[activeStep].href}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-600 hover:scale-105 transition-all shadow-md shadow-slate-900/20 group w-max text-sm"
                    >
                      Explore Lab Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </div>

              {/* Right Panel - Image & Details */}
              <div className="bg-slate-50 p-6 flex flex-col gap-4 relative">
                {/* Visible Lab Image (No dark overlay) */}
                <div className="relative w-full h-[200px] md:h-[220px] rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={displayPrograms[activeStep].image}
                      alt={displayPrograms[activeStep].imageAlt}
                      fill
                      className="object-cover"
                    />
                    {/* Floating Tech Tags on top of image */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
                         {displayPrograms[activeStep].techTags.slice(0,4).map((tag, idx) => (
                           <span key={idx} className="px-2.5 py-1 bg-white/90 backdrop-blur text-slate-800 shadow-sm text-[10px] font-bold uppercase tracking-wider rounded-md border border-white">
                             {tag}
                           </span>
                         ))}
                    </div>
                </div>

                {/* Infrastructure Details Bento */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-3">
                      INFRASTRUCTURE & SETUP
                    </span>
                    <div className="space-y-2">
                      {displayPrograms[activeStep].implementationSteps.slice(0, 3).map((point, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-gray-100">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" />
                            <span className="text-xs font-medium text-slate-700 truncate max-w-[250px]">{point}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
