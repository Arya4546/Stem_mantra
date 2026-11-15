"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is a STEM lab for schools?",
    a: "A STEM lab is a purpose-built learning environment where students actively engage with science, technology, engineering and mathematics through hands-on projects, experiments and problem-solving activities — rather than passive classroom instruction. STEMmantra designs STEM labs as complete learning ecosystems.",
  },
  {
    q: "What is the difference between a STEM Lab and a STEAM Lab?",
    a: "A STEM lab focuses on science, technology, engineering and mathematics. A STEAM lab adds arts and design to the ecosystem — including design thinking, creative problem solving and visual communication. STEMmantra offers both approaches, including the STEAMverse Lab for multidisciplinary STEAM learning.",
  },
  {
    q: "Which grades can use a STEM lab?",
    a: "STEMmantra's labs are designed for students across Grades 3–12. Each lab has grade-differentiated curriculum so the same lab environment serves different age groups with appropriate levels of complexity and challenge.",
  },
  {
    q: "What does a Robotics Lab include?",
    a: "STEMmantra's Robotics Lab is built around a structured learning curriculum — not just equipment. It includes robotics kits, electronics, sensors, programming tools, structured grade-wise curriculum and teacher enablement, alongside the physical equipment.",
  },
  {
    q: "Does STEMmantra provide teacher training?",
    a: "Yes. Educator enablement is a core part of every STEMmantra program. We provide structured teacher training so educators can confidently plan and deliver lab sessions. Ongoing support is also available through the school year.",
  },
  {
    q: "How long does it take to set up a school lab?",
    a: "Setup timelines depend on the lab type, school infrastructure and procurement requirements. We work with schools to plan the timeline clearly from the outset. Contact us for a specific estimate for your school.",
  },
  {
    q: "How does STEMmantra support schools after installation?",
    a: "STEMmantra provides ongoing curriculum, technical and implementation support through the school year. The specifics depend on the program and agreement with each school.",
  },
  {
    q: "What is a Composite Skill Lab?",
    a: "A Composite Skill Lab is a multidisciplinary practical learning environment for secondary school students (Grades 6–12). It develops hands-on skills across technology, engineering, design and fabrication through structured project work.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ProgramsFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 bg-transparent border-t border-gray-100">
      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          className="mb-10 text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Questions school leaders commonly ask about STEMmantra&apos;s programs and labs.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all ${
                  open === i
                    ? "bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg"
                    : "bg-transparent text-gray-900 hover:bg-gray-50 border border-gray-100 shadow-sm"
                }`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-semibold pr-4">{faq.q}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300">
                  {open === i ? (
                    <Minus className="w-5 h-5 text-white" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-500" />
                  )}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-transparent border border-t-0 border-gray-100 rounded-b-xl shadow-sm">
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
