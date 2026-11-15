"use client";
import { motion } from "framer-motion";
import { Search, HelpCircle, PenTool, Wrench, Beaker, TrendingUp, Presentation } from "lucide-react";

const processSteps = [
  { name: "Explore", icon: Search, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200", shadow: "shadow-orange-500/20" },
  { name: "Question", icon: HelpCircle, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", shadow: "shadow-amber-500/20" },
  { name: "Design", icon: PenTool, color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200", shadow: "shadow-teal-500/20" },
  { name: "Build", icon: Wrench, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", shadow: "shadow-blue-500/20" },
  { name: "Test", icon: Beaker, color: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200", shadow: "shadow-indigo-500/20" },
  { name: "Improve", icon: TrendingUp, color: "text-violet-500", bg: "bg-violet-50", border: "border-violet-200", shadow: "shadow-violet-500/20" },
  { name: "Present", icon: Presentation, color: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200", shadow: "shadow-pink-500/20" }
];

export default function ProgramsEcosystemIntro() {
  return (
    <section className="py-12 px-4 bg-transparent relative z-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        
        <div className="bg-white/70 backdrop-blur-md rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 md:p-16 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-br from-orange-50/50 to-teal-50/50 rounded-full blur-3xl opacity-60 -z-10 translate-x-1/3 -translate-y-1/3" />
          
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-800 mb-2">The STEMmantra Learning Journey</h2>
              <p className="text-slate-500 font-medium">How we take students from curiosity to innovation</p>
            </div>
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-[7.25rem] left-[6%] right-[6%] h-0.5 bg-gradient-to-r from-orange-300 via-teal-300 to-pink-300 -z-10 opacity-60" />
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  className="flex flex-col items-center group cursor-default w-full md:w-auto"
                >
                  <div className={`w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-2xl flex items-center justify-center ${step.bg} border ${step.border} shadow-md hover:shadow-xl ${step.shadow} hover:border-transparent transition-all duration-300 mb-4 relative overflow-hidden transform group-hover:-translate-y-1`}>
                    <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                    <step.icon className={`w-7 h-7 md:w-8 md:h-8 ${step.color} group-hover:scale-110 transition-transform duration-300 relative z-10`} />
                  </div>
                  <span className={`text-sm md:text-base font-black text-gray-800 transition-colors uppercase tracking-widest text-center group-hover:${step.color}`}>
                    {step.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
