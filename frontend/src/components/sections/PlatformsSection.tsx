"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaBookOpen, FaCode } from "react-icons/fa";
import {
  Users,
  Video,
  ClipboardCheck,
  BarChart3,
  Award,
  Blocks,
  Cpu,
  Trophy,
  Layers,
  Code2,
} from "lucide-react";

const platforms = [
  {
    id: "lms",
    name: "STEMmantra LMS",
    tagline: "Learning Management System for Schools",
    url: "https://learn.stemmantra.com",
    host: "learn.stemmantra.com",
    Icon: FaBookOpen,
    accent: "orange",
    description:
      "A secure school learning management system where students, teachers and school admins access STEM courses, video lessons, PDFs and assessments in one place — aligned with the classroom lab programme.",
    features: [
      { Icon: Layers, label: "Course & curriculum management" },
      { Icon: Video, label: "Protected video, PDF & image lessons" },
      { Icon: ClipboardCheck, label: "Online quizzes & timed assessments" },
      { Icon: BarChart3, label: "Student progress tracking" },
      { Icon: Users, label: "Multi-school, role-based access" },
      { Icon: Award, label: "Certificates on completion" },
    ],
    cta: "Open the LMS",
  },
  {
    id: "code",
    name: "STEMmantra Code Platform",
    tagline: "Online Coding & Electronics Learning Platform",
    url: "https://code.stemmantra.com",
    host: "code.stemmantra.com",
    Icon: FaCode,
    accent: "teal",
    description:
      "A child-friendly online coding platform where students move from drag-and-drop block coding to real C++ for Arduino and ESP boards — and test their ideas in a virtual simulator before touching hardware.",
    features: [
      { Icon: Blocks, label: "Visual block coding & C++ editor" },
      { Icon: Cpu, label: "Virtual board & circuit simulator" },
      { Icon: Layers, label: "Structured coding courses & lessons" },
      { Icon: Trophy, label: "XP, badges & daily streaks" },
      { Icon: Code2, label: "Save, share & showcase projects" },
    ],
    cta: "Open the Code Platform",
  },
];

const theme = {
  orange: { tile: "bg-orange-100 text-orange-600", chip: "bg-orange-50 text-orange-600", btn: "bg-orange-600 hover:bg-orange-700 shadow-orange-600/25", glow: "bg-orange-300/40", ring: "hover:border-orange-200", url: "text-orange-600" },
  teal: { tile: "bg-teal-100 text-teal-600", chip: "bg-teal-50 text-teal-600", btn: "bg-teal-600 hover:bg-teal-700 shadow-teal-600/25", glow: "bg-teal-300/40", ring: "hover:border-teal-200", url: "text-teal-600" },
} as const;

export default function PlatformsSection() {
  return (
    <section id="platforms" className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
        <div className="mb-8 fit-mb flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 fit-gap text-center lg:text-left items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-bold uppercase tracking-wider mb-3">
              Digital Learning Platforms
            </span>
            <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Learning Continues <span className="text-orange-500">Beyond the Lab</span>
            </h2>
          </div>
          <p className="fit-lead text-lg text-gray-600 leading-relaxed max-w-2xl">
            Alongside our robotics, AI &amp; coding labs, STEMmantra runs its own school LMS and online coding platform — so every student can learn, practise and build at school and at home.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 fit-gap lg:gap-8">
          {platforms.map((p, i) => {
            const t = theme[p.accent as keyof typeof theme];
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`group relative overflow-hidden rounded-3xl bg-white/85 backdrop-blur-sm border border-gray-100 ${t.ring} shadow-lg hover:shadow-2xl transition-all duration-300 p-7 md:p-9 fit-pad flex flex-col`}
              >
                <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl ${t.glow} opacity-60 group-hover:opacity-100 transition-opacity`} aria-hidden />

                <div className="relative flex items-start gap-4 mb-4 fit-mb">
                  <span className={`fit-icon shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${t.tile}`}>
                    <p.Icon className="w-1/2 h-1/2" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="fit-title text-xl md:text-2xl font-black text-gray-900 tracking-tight leading-tight">{p.name}</h3>
                    <p className={`text-sm font-bold ${t.url}`}>{p.tagline}</p>
                  </div>
                </div>

                <p className="relative fit-lead text-gray-600 text-base leading-relaxed mb-5 fit-mb">{p.description}</p>

                <ul className="relative grid sm:grid-cols-2 gap-x-4 gap-y-2.5 mb-6 fit-mb">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 fit-lead">
                      <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${t.chip}`}>
                        <f.Icon className="w-3.5 h-3.5" />
                      </span>
                      {f.label}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`fit-btn inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-all hover:-translate-y-0.5 ${t.btn}`}
                  >
                    {p.cta} <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  </a>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={`text-sm font-bold ${t.url} hover:underline`}>
                    {p.host}
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
