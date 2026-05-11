"use client";

import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

const journeySteps = [
  {
    id: 1,
    title: "Program Details & Presentation",
    description: "STEMMANTRA team & school leadership team will connect for Presentation.",
  },
  {
    id: 2,
    title: "Customization Of Proposal",
    description: "STEMMANTRA team will discuss with decision makers for the budget & requirement of the school.",
  },
  {
    id: 3,
    title: "Signing MoU",
    description: "STEMMANTRA team and school leadership team will sign MoU.",
  },
  {
    id: 4,
    title: "Finalization of Curriculum",
    description: "STEMMANTRA Curriculum team & school Execution team will discuss to finalize the curriculum.",
  },
  {
    id: 5,
    title: "Access to learning Platform",
    description: "STEMMANTRA team will provide access to every student & teacher involved in Lab.",
  },
  {
    id: 6,
    title: "Execution of the Program",
    description: "STEMMANTRA team will visit school to set-up the lab & kick-start the training as per the mode of execution.",
  },
  {
    id: 7,
    title: "Exhibition at PTM",
    description: "STEMMANTRA Team will help students to conduct exhibition on every PTM to showcase the work to the parents.",
  },
  {
    id: 8,
    title: "Quarterly Assessment & Review Meeting",
    description: "STEMMANTRA Team will conduct quarterly assessment for every students and will do review meeting with the stakeholders on progress.",
  },
];

export default function ImplementationJourneySection() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-section)', backgroundColor: 'var(--color-white)' }}>
      <div className="max-w-content mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading inline-block pb-3 relative tracking-tight uppercase"
            style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}
          >
            Implementation Plan
            <div className="absolute bottom-0 left-0 w-full h-1 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }}></div>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mt-5"
            style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}
          >
            Our meticulously structured 8-step roadmap ensures a seamless integration of STEM excellence into your institution.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          
          {/* Vertical Center Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px" style={{ backgroundColor: 'var(--color-border)' }}></div>

          {/* Steps */}
          <div className="space-y-6 lg:space-y-0 relative">
            {journeySteps.map((step, idx) => (
              <div key={step.id} className="relative lg:min-h-[130px]">
                
                {/* Desktop Grid Layout */}
                <div className={`hidden lg:grid grid-cols-[1fr_72px_1fr] items-center w-full`}>
                  
                  {/* Left Column */}
                  <div className={`flex justify-end pr-8 ${idx % 2 !== 0 ? 'invisible opacity-0' : ''}`}>
                    <StepCard step={step} align="right" />
                  </div>

                  {/* Center Column (Number) */}
                  <div className="flex justify-center relative z-10">
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="w-11 h-11 rounded-lg flex items-center justify-center font-heading text-lg border-2"
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)',
                        borderColor: 'var(--color-white)',
                        color: 'white',
                      }}
                    >
                      {step.id}
                    </motion.div>
                  </div>

                  {/* Right Column */}
                  <div className={`flex justify-start pl-8 ${idx % 2 === 0 ? 'invisible opacity-0' : ''}`}>
                    <StepCard step={step} align="left" />
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="lg:hidden flex gap-4 pl-2 relative">
                  <div className="absolute left-[22px] top-12 bottom-0 w-px -z-10" style={{ backgroundColor: idx < journeySteps.length - 1 ? 'var(--color-border)' : 'transparent' }}></div>
                  
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-heading text-base shrink-0 z-10"
                    style={{
                      backgroundColor: idx % 2 === 0 ? 'var(--color-primary)' : 'var(--color-accent)',
                      color: 'white',
                    }}
                  >
                    {step.id}
                  </motion.div>

                  <div className="pb-6 flex-1">
                    <StepCard step={step} align="left" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Final CTA */}
        <div className="flex justify-center mt-10 md:mt-14">
            <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group px-8 py-4 text-white rounded-lg font-bold flex items-center gap-3 shadow-md hover:brightness-110 transition-all duration-200"
                style={{ backgroundColor: 'var(--color-accent)', fontSize: 'var(--text-lg)' }}
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
  return (
    <motion.div 
      initial={{ opacity: 0, x: align === 'right' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="w-full max-w-[560px] bg-white border rounded-xl p-5 md:p-6 hover:shadow-md transition-all duration-200 group"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-text-secondary)' }}>
              Step {step.id}
          </span>
      </div>
      <h3 className="font-bold mb-2 uppercase tracking-tight" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>
        {step.title}
      </h3>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
        {step.description}
      </p>
    </motion.div>
  );
}
