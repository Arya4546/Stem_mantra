"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const journeySteps = [
  {
    stage: "EXPLORE",
    lab: "Pre-Tinkering Lab",
    grades: "Gr. 3–5",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    description: "Curiosity, making, observation",
    href: "/programs/pre-tinkering-lab",
  },
  {
    stage: "MAKE",
    lab: "STEAMverse Lab",
    grades: "Gr. 3–12",
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    description: "STEAM, robotics, design thinking",
    href: "/programs/steamverse-lab",
  },
  {
    stage: "BUILD",
    lab: "Robotics Lab",
    grades: "Gr. 4–12",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    description: "Engineering, programming, iteration",
    href: "/programs/robotics-lab",
  },
  {
    stage: "CODE",
    lab: "AI & Coding Lab",
    grades: "Gr. 5–12",
    color: "bg-violet-500",
    lightColor: "bg-violet-50",
    textColor: "text-violet-700",
    borderColor: "border-violet-200",
    description: "Python, AI, machine learning",
    href: "/programs/ai-coding-lab",
  },
  {
    stage: "INNOVATE",
    lab: "Innoverse Lab",
    grades: "Gr. 3–12",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    description: "Idea → prototype → solution",
    href: "/programs/innoverse-lab",
  },
  {
    stage: "APPLY",
    lab: "Composite Skill / ATL",
    grades: "Gr. 6–12",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
    description: "Real-world skills, innovation ecosystem",
    href: "/programs/composite-skill-lab",
  },
];

export default function ProgramsLearningJourney() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold mb-4">
            K–12 Learning Pathway
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
            One Learning Journey.{" "}
            <span className="text-orange-500">Multiple Levels of Possibility.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Schools can configure this pathway based on their students&apos; age,
            curriculum goals and objectives. Every path is valid.
          </p>
        </motion.div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden md:flex items-start gap-0 relative">
          {/* Connector line */}
          <div className="absolute top-7 left-[40px] right-[40px] h-0.5 bg-gray-200 z-0" />

          {journeySteps.map((step, i) => (
            <motion.div
              key={step.stage}
              className="flex-1 flex flex-col items-center relative z-10 px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Dot */}
              <div
                className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mb-4 shadow-md flex-shrink-0`}
              >
                <span className="text-white text-[10px] font-black tracking-widest text-center leading-tight px-1">
                  {step.stage}
                </span>
              </div>
              {/* Card */}
              <Link
                href={step.href}
                className={`w-full border ${step.borderColor} ${step.lightColor} rounded-xl p-3 text-center hover:shadow-sm transition-shadow`}
              >
                <p className={`text-xs font-black ${step.textColor} mb-1 leading-snug`}>
                  {step.lab}
                </p>
                <p className="text-xs text-gray-400 mb-1">{step.grades}</p>
                <p className="text-xs text-gray-500 leading-snug">{step.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="md:hidden flex flex-col gap-0 relative">
          <div className="absolute left-7 top-4 bottom-4 w-0.5 bg-gray-200" />
          {journeySteps.map((step, i) => (
            <motion.div
              key={step.stage}
              className="flex items-start gap-4 pl-4 pb-5 relative"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div
                className={`w-7 h-7 ${step.color} rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-sm mt-1`}
              >
                <span className="text-white text-[7px] font-black">{i + 1}</span>
              </div>
              <Link
                href={step.href}
                className={`flex-1 border ${step.borderColor} ${step.lightColor} rounded-xl p-3`}
              >
                <p className={`text-sm font-black ${step.textColor}`}>
                  {step.stage} — {step.lab}
                </p>
                <p className="text-xs text-gray-400 mb-0.5">{step.grades}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10 max-w-lg mx-auto">
          Not every school needs every lab. STEMmantra works with you to design
          the right combination for your institution.
        </p>
      </div>
    </section>
  );
}
