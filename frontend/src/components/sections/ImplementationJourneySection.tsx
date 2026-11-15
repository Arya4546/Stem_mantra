"use client";

import { motion } from "framer-motion";
import {
  FaChevronRight,
  FaChalkboardTeacher,
  FaHandshake,
  FaFileSignature,
  FaBookOpen,
  FaLaptopCode,
  FaTools,
  FaTrophy,
  FaClipboardCheck,
} from "react-icons/fa";

const stepIcons = [
  FaChalkboardTeacher,
  FaHandshake,
  FaFileSignature,
  FaBookOpen,
  FaLaptopCode,
  FaTools,
  FaTrophy,
  FaClipboardCheck,
];

const stepHex = ["#f97316", "#14b8a6", "#4338ca"];

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
    <section className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16">

        {/* Header — title + intro on the left, action on the right (desktop) */}
        <div className="mb-5 fit-mb flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 fit-gap">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 bg-orange-100/80 text-orange-700 rounded-full text-sm font-bold uppercase tracking-wider mb-3">
              Our Roadmap
            </span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight"
            >
              Implementation <span className="text-orange-500">Plan</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="fit-lead max-w-2xl text-lg text-gray-600"
            >
              Our meticulously structured 8-step roadmap ensures a seamless integration of STEM excellence into your institution.
            </motion.p>
          </div>

          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="fit-btn group self-center lg:self-auto shrink-0 px-7 py-3.5 bg-[#f97316] text-white rounded-xl font-bold text-base flex items-center gap-4 shadow-lg shadow-orange-500/25 hover:bg-orange-700 hover:-translate-y-0.5 transition-all duration-300"
          >
            Start Your Journey Today
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Roadmap — one continuous track inside a single glass panel */}
        <div className="relative overflow-hidden rounded-[2rem] bg-white/55 backdrop-blur-md border border-white/80 shadow-xl px-6 py-6 lg:px-10 lg:py-7 fit-pad">
          <div
            className="absolute inset-0 opacity-[0.35] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(249,115,22,0.35) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            aria-hidden
          />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-orange-300/25 blur-3xl pointer-events-none" aria-hidden />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-teal-300/25 blur-3xl pointer-events-none" aria-hidden />

          <ol className="relative grid xl:grid-cols-4 gap-x-8 gap-y-2 xl:gap-y-[clamp(0.6rem,3vh,3rem)]">
            {journeySteps.map((step, idx) => {
              const isRowEnd = idx % 4 === 3;
              const isLast = idx === journeySteps.length - 1;
              const Icon = stepIcons[idx];
              const from = stepHex[idx % 3];
              const to = stepHex[(idx + 1) % 3];
              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.12 }}
                  className="group relative flex xl:flex-col gap-5 xl:gap-[clamp(0.5rem,2vh,1.5rem)] pb-10 xl:pb-0"
                >
                  <span
                    className="absolute -bottom-4 right-0 xl:right-2 text-[5rem] leading-none font-black text-transparent opacity-[0.12] group-hover:opacity-25 transition-opacity duration-500 select-none pointer-events-none [-webkit-text-stroke:2px_currentColor]"
                    style={{ color: from }}
                    aria-hidden
                  >
                    {String(step.id).padStart(2, "0")}
                  </span>

                  {!isLast && (
                    <span className="xl:hidden absolute left-7 top-16 bottom-0 w-0.5 -translate-x-1/2" style={{ background: `linear-gradient(to bottom, ${from}, ${to})`, opacity: 0.35 }} aria-hidden />
                  )}
                  {!isRowEnd && (
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + (idx % 4) * 0.25, ease: "easeOut" }}
                      className="hidden xl:block absolute top-[calc(clamp(2.25rem,6vh,3rem)/2)] left-[calc(clamp(2.25rem,6vh,3rem)+0.5rem)] -right-8 h-1 -translate-y-1/2 origin-left rounded-full"
                      style={{ background: `linear-gradient(to right, ${from}, ${to})`, opacity: 0.55 }}
                      aria-hidden
                    />
                  )}

                  <div className="relative z-10 shrink-0 w-[clamp(2.25rem,6vh,3rem)] h-[clamp(2.25rem,6vh,3rem)]">
                    <span className={`absolute inset-0 rounded-full ${step.color} opacity-0 group-hover:opacity-30 group-hover:animate-ping`} aria-hidden />
                    <div className={`relative w-full h-full rounded-full ${step.color} text-white font-black text-base lg:text-[clamp(0.875rem,2.4vh,1.125rem)] flex items-center justify-center ring-[5px] ring-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] group-hover:scale-110 transition-transform duration-300`}>
                      {step.id}
                    </div>
                  </div>

                  <div className="pt-1 xl:pt-0 xl:pr-2 relative">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={`w-4 h-4 ${step.textColor}`} />
                      <span className={`text-xs font-bold uppercase tracking-[0.18em] ${step.textColor}`}>Step {step.id}</span>
                    </div>
                    <h3 className="fit-title text-lg font-black text-gray-900 mb-1 tracking-tight leading-snug group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="fit-lead text-gray-600 leading-relaxed text-sm md:text-base">
                      {step.description}
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
