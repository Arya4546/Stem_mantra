"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

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
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRange = useMotionValue(0);

  // ResizeObserver guarantees perfectly accurate width tracking even on slow mobile hydration
  useEffect(() => {
    if (!containerRef.current) return;

    const updateRange = () => {
      if (containerRef.current) {
        // We add a safety buffer of 150px at the end
        scrollRange.set(containerRef.current.scrollWidth - window.innerWidth + 150);
      }
    };

    updateRange();
    const observer = new ResizeObserver(updateRange);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [scrollRange]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  // RCA Fix: useTransform with a callback dynamically recalculates every frame!
  // By querying the motion value (.get()) every frame, we bypass all React closure lockups.
  const xTransform = useTransform(smoothProgress, (p) => -1 * (p * scrollRange.get()));

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white pt-16 md:pt-0 pb-12 md:pb-0">

      {/* Container - sticky horizontal track */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">

        {/* Header content pinned at the top */}
        <div className="absolute top-16 md:top-24 left-0 w-full px-4 md:px-8 lg:px-16 pointer-events-none z-10 block mb-8 md:mb-0">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase inline-block border-b-4 border-orange-500 pb-2 pointer-events-auto">
              Implementation Plan
            </h2>
            <p className="max-w-2xl text-base md:text-lg text-gray-600 font-medium mt-4 pointer-events-auto">
              Scroll down to journey through our 8-step execution roadmap.
            </p>
          </div>
        </div>

        {/* The horizontally translating track utilizing Framer Motion */}
        <div className="relative mt-12 md:mt-24 w-full">
          <motion.div
            ref={containerRef}
            style={{ x: xTransform }}
            className="flex items-center gap-4 md:gap-6 px-4 md:px-8 lg:px-16 w-max pb-12 pt-4 md:pt-8 will-change-transform"
          >

            {/* Render Cards matching the brochure identically */}
            {journeySteps.map((step, idx) => (
              <div key={step.id} className="flex items-center shrink-0">

                {/* 1. The Card */}
                <div className="w-[300px] sm:w-[340px] md:w-[400px] h-[130px] md:h-[140px] bg-white border-2 border-[#8c9c80] rounded-[24px] overflow-hidden flex items-stretch shadow-sm relative shrink-0 transition-shadow hover:shadow-md">

                  {/* Left Content Area */}
                  <div className="flex-1 py-4 px-4 md:px-5 pr-8 flex flex-col justify-center bg-white relative z-10">
                    <h3 className="text-[15px] md:text-[17px] font-bold text-gray-900 leading-tight mb-1 font-sans">
                      {step.title}
                    </h3>
                    <p className="text-[12px] md:text-sm text-gray-700 leading-snug">
                      {step.description}
                    </p>
                  </div>

                  {/* Right Number Area - Built using precise chevron clip-path matching the brochure */}
                  <div
                    className="w-[75px] md:w-[85px] bg-[#92a088] flex items-center justify-center shrink-0 relative z-0"
                    style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 20% 100%, 0 50%)" }}
                  >
                    <span
                      className="text-[54px] md:text-[64px] font-black text-gray-900 leading-none pl-3 select-none"
                      style={{ opacity: 0.85, textShadow: "2px 2px 0px rgba(255,255,255,0.2)" }}
                    >
                      {step.id}
                    </span>
                  </div>

                </div>

                {/* 2. The Connecting Arrow (matches brochure arrow) */}
                {idx < journeySteps.length - 1 && (
                  <div className="w-8 md:w-16 flex items-center justify-center shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#a4c735] w-6 h-6 md:w-7 md:h-7">
                      <path d="M5 12h14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {/* Safe end buffer */}
            <div className="w-[10vw] shrink-0" />

          </motion.div>
        </div>

      </div>
    </section>
  );
}
