"use client";

import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

const journeySteps = [
  {
    id: 1,
    title: "Program Details & Presentation",
    description: "STEMMANTRA team & school leadership team will connect for Presentation.",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    id: 2,
    title: "Customization Of Proposal",
    description: "STEMMANTRA team will discuss with decision makers for the budget & requirement of the school.",
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
  {
    id: 3,
    title: "Signing MoU",
    description: "STEMMANTRA team and school leadership team will sign MoU.",
    color: "bg-indigo-700",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
  },
  {
    id: 4,
    title: "Finalization of Curriculum",
    description: "STEMMANTRA Curriculum team & school Execution team will discuss to finalize the curriculum.",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    id: 5,
    title: "Access to learning Platform",
    description: "STEMMANTRA team will provide access to every student & teacher involved in Lab.",
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
  {
    id: 6,
    title: "Execution of the Program",
    description: "STEMMANTRA team will visit school to set-up the lab & kick-start the training as per the mode of execution.",
    color: "bg-indigo-700",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
  },
  {
    id: 7,
    title: "Exhibition at PTM",
    description: "STEMMANTRA Team will help students to conduct exhibition on every PTM to showcase the work to the parents.",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    id: 8,
    title: "Quarterly Assessment & Review Meeting",
    description: "STEMMANTRA Team will conduct quarterly assessment for every students and will do review meeting with the stakeholders on progress.",
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    textColor: "text-teal-600",
  },
];

export default function ImplementationJourneySection() {
  return (
    <section className="relative pt-12 pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        
        {/* Header - Centered and Branded */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight uppercase inline-block pb-2 relative"
          >
            Implementation Plan
            <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 rounded-full"></div>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600 font-medium mt-6"
          >
            Our meticulously structured 8-step roadmap ensures a seamless integration of STEM excellence into your institution.
          </motion.p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          
          {/* Vertical Center Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-gray-200"></div>

          {/* Steps */}
          <div className="space-y-8 lg:space-y-0 relative">
            {journeySteps.map((step, idx) => (
              <div key={step.id} className="relative lg:min-h-[140px]">
                
                {/* Desktop Grid Layout */}
                <div className={`hidden lg:grid grid-cols-[1fr_80px_1fr] items-center w-full`}>
                  
                  {/* Left Column (Content for odd steps) */}
                  <div className={`flex justify-end pr-10 ${idx % 2 !== 0 ? 'invisible opacity-0' : ''}`}>
                    <StepCard step={step} align="right" />
                  </div>

                  {/* Center Column (Number Indicator) */}
                  <div className="flex justify-center relative z-10">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 rounded-full ${step.color} shadow-lg flex items-center justify-center text-white font-black text-xl border-4 border-white`}
                    >
                      {step.id}
                    </motion.div>
                  </div>

                  {/* Right Column (Content for even steps) */}
                  <div className={`flex justify-start pl-10 ${idx % 2 === 0 ? 'invisible opacity-0' : ''}`}>
                    <StepCard step={step} align="left" />
                  </div>
                </div>

                {/* Mobile/Tablet Layout (Single Column) */}
                <div className="lg:hidden flex gap-6 pl-4 relative">
                  {/* Vertical Line for Mobile */}
                  <div className="absolute left-10 top-12 bottom-0 w-0.5 border-l-2 border-dashed border-gray-200 -z-10 last:hidden"></div>
                  
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 rounded-full ${step.color} shadow-lg flex items-center justify-center text-white font-black text-xl border-4 border-white shrink-0 z-10`}
                  >
                    {step.id}
                  </motion.div>

                  <div className="pb-8">
                    <StepCard step={step} align="left" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Final CTA Button - Now Clickable and Branded */}
        <div className="flex justify-center mt-8 md:mt-16">
            <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group px-10 py-5 bg-[#f97316] text-white rounded-xl font-black text-lg md:text-xl flex items-center gap-4 shadow-xl shadow-orange-500/20 hover:bg-orange-700 hover:scale-105 transition-all duration-300"
            >
                Start Your Journey Today 
                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
        </div>

      </div>
    </section>
  );
}

function StepCard({ step, align }: { step: any, align: 'left' | 'right' }) {
  const isLeft = align === 'right';
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`group w-full max-w-[620px] bg-white border-2 border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl hover:border-orange-100 transition-all duration-300 relative`}
    >
      {/* Accent Corner Decor */}
      <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-14 h-14 ${step.lightColor} rounded-tr-3xl rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full ${step.lightColor} ${step.textColor} text-xs font-black uppercase tracking-widest`}>
                Step {step.id}
            </span>
        </div>
        <h3 className={`text-xl md:text-2xl font-black ${step.textColor} mb-3 uppercase tracking-tight`}>
          {step.title}
        </h3>
        <p className="text-gray-600 font-medium leading-relaxed text-sm md:text-base">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
