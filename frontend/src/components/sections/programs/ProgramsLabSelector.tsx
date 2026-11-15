"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const selectorData = [
  {
    objective: "Multidisciplinary STEAM & Robotics-focused learning",
    programs: [
      {
        lab: "STEAMverse Lab",
        href: "/programs/steamverse-lab",
        accent: "bg-teal-50 text-teal-700 hover:bg-teal-100",
      },
      {
        lab: "Robotics Lab",
        href: "/programs/robotics-lab",
        accent: "bg-blue-50 text-blue-700 hover:bg-blue-100",
      }
    ]
  },
  {
    objective: "Practical skill education",
    programs: [
      {
        lab: "Composite Skill Lab",
        href: "/programs/composite-skill-lab",
        accent: "bg-amber-50 text-amber-700 hover:bg-amber-100",
      }
    ]
  },
  {
    objective: "Early STEM exploration",
    programs: [
      {
        lab: "Pre-Tinkering Lab",
        href: "/programs/pre-tinkering-lab",
        accent: "bg-orange-50 text-orange-700 hover:bg-orange-100",
      }
    ]
  },
  {
    objective: "Coding and AI",
    programs: [
      {
        lab: "AI & Coding Lab",
        href: "/programs/ai-coding-lab",
        accent: "bg-violet-50 text-violet-700 hover:bg-violet-100",
      }
    ]
  },
  {
    objective: "Integrated innovation ecosystem",
    programs: [
      {
        lab: "Innoverse Lab",
        href: "/programs/innoverse-lab",
        accent: "bg-purple-50 text-purple-700 hover:bg-purple-100",
      }
    ]
  },
  {
    objective: "Innovation ecosystem under ATL",
    programs: [
      {
        lab: "Atal Tinkering Lab",
        href: "/programs/atal-tinkering-lab",
        accent: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
      }
    ]
  },
];

export default function ProgramsLabSelector() {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold mb-4">
            Lab Finder
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Which Lab Is Right for My School?
          </h2>
          <p className="text-gray-500 text-base max-w-xl">
            Match your school&apos;s objective to the right learning ecosystem.
          </p>
        </motion.div>

        {/* Decision table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
          <div className="hidden md:grid grid-cols-2 bg-gray-50 px-6 py-3 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              School Objective
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Recommended Program
            </span>
          </div>
          {selectorData.map((row, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 px-6 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center mb-3 md:mb-0">
                <span className="text-sm text-gray-700 font-medium">{row.objective}</span>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                {row.programs.map((prog, j) => (
                  <Link
                    key={j}
                    href={prog.href}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${prog.accent}`}
                  >
                    {prog.lab}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Not sure which lab is right for your school?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Talk to an Education Consultant
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
