"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaProjectDiagram,
  FaClipboardCheck,
  FaBullseye,
  FaCogs
} from "react-icons/fa";

const allBenefits = [
  {
    id: "discipline",
    number: "01",
    title: "Discipline Expert",
    description: "Our mentors are highly qualified and well versed with STEM technologies.",
    Icon: FaUserGraduate,
  },
  {
    id: "intuitive",
    number: "02",
    title: "Intuitive Methodology",
    description: "Hands-on experimentation, and project-based learning to create an engaging and transformative educational experience.",
    Icon: FaProjectDiagram,
  },
  {
    id: "result",
    number: "03",
    title: "Result oriented",
    description: "All kits & curriculum focused on specific leaning outcome.",
    Icon: FaBullseye,
  },
  {
    id: "hybrid",
    number: "04",
    title: "Hybrid mode of Execution",
    description: "In person activities in lab as well as online session.",
    Icon: FaLaptopCode,
  },
  {
    id: "ownership",
    number: "05",
    title: "End to End ownership",
    description: "From lab setup to implementation, from project to exhibition.",
    Icon: FaClipboardCheck,
  },
  {
    id: "curriculum",
    number: "06",
    title: "Customized Curriculum",
    description: "Progressive curriculum based on student level & grade containing mix of technologies.",
    Icon: FaCogs,
  },
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden border-t" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-12)', backgroundColor: 'var(--color-white)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-content mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="font-heading inline-block pb-3 leading-none" style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-primary)', borderBottom: '4px solid var(--color-accent)' }}>
            WHY STEMmantra?
          </h2>
        </div>

        {/* Benefits Grid — Clean numbered list layout */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
          {allBenefits.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex gap-5 items-start group"
            >
              {/* Number indicator */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border-2 group-hover:border-[var(--color-accent)] transition-colors" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                <span className="font-heading text-lg" style={{ color: 'var(--color-primary)' }}>{item.number}</span>
              </div>
              
              <div className="flex-1 border-l-2 pl-5" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-bold mb-2 leading-tight" style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}