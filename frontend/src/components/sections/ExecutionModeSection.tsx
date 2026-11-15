"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, GraduationCap, CheckCircle2 } from "lucide-react";

export default function ExecutionModeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const models = [
    {
      Icon: Users,
      title: "Lead by STEMmantra Team",
      text: "A dedicated STEMmantra Engineer visits your school to conduct hands-on sessions for students directly, following a structured time schedule.",
      points: ["Zero hassle for school staff", "Expert-led instruction", "Predictable scheduling"],
      tile: "bg-orange-100 text-orange-600",
      check: "text-orange-500",
      border: "border-orange-100 hover:border-orange-300",
      glow: "bg-orange-100",
    },
    {
      Icon: GraduationCap,
      title: "Lead by School Teachers",
      text: "STEMmantra Engineers comprehensively train your school teachers, empowering them to confidently conduct sessions for their students.",
      points: ["Builds internal school capability", "Deepens teacher-student bonds", "Flexible scheduling"],
      tile: "bg-teal-100 text-teal-600",
      check: "text-teal-500",
      border: "border-teal-100 hover:border-teal-300",
      glow: "bg-teal-100",
    },
  ];

  return (
    <section ref={ref} className="fit relative py-10 lg:py-12 px-4 bg-transparent overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px] opacity-60 translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 fit-gap items-center">

          {/* Left: heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-bold uppercase tracking-wider mb-4 shadow-sm">
              Implementation
            </span>
            <h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-tight tracking-tight">
              Flexible Modes of <span className="text-orange-500">Execution</span>
            </h2>
            <div className="w-20 h-1.5 bg-orange-500 rounded-full mb-5 fit-mb" />
            <p className="fit-lead text-lg text-gray-600 leading-relaxed">
              We adapt to your school&apos;s operational needs. Choose to have our expert engineers lead the sessions, or empower your own teachers through our comprehensive training program.
            </p>
          </motion.div>

          {/* Right: two models joined by an OR marker */}
          <div className="lg:col-span-8 relative grid md:grid-cols-2 gap-6 fit-gap">
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border border-gray-200 items-center justify-center shadow-md z-20">
              <span className="text-sm font-bold text-gray-500">OR</span>
            </div>

            {models.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className={`relative group overflow-hidden rounded-3xl bg-white/90 border ${m.border} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-7 md:p-9 fit-pad`}
              >
                <div className={`absolute top-0 right-0 w-28 h-28 ${m.glow} rounded-bl-[100px] -z-0 opacity-70 transition-transform duration-500 group-hover:scale-110`} />
                <div className={`relative fit-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-5 fit-mb ${m.tile}`}>
                  <m.Icon className="w-1/2 h-1/2" />
                </div>
                <h3 className="relative fit-title text-xl md:text-2xl font-black text-gray-900 mb-3 leading-tight tracking-tight">{m.title}</h3>
                <p className="relative fit-lead text-gray-600 leading-relaxed mb-5 fit-mb">{m.text}</p>
                <ul className="relative space-y-3 fit-stack">
                  {m.points.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-medium fit-lead">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${m.check}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
