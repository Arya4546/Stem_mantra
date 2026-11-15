"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Minus, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Program } from "@/data/programs";
import { programs } from "@/data/programs";

interface Props {
  program: Program;
}

export default function ProgramDetailPage({ program }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Related labs (exclude current)
  const related = programs.filter((p) => p.id !== program.id).slice(0, 3);

  // JSON-LD for this lab page
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: program.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.stemmantra.com" },
      { "@type": "ListItem", position: 2, name: "Programs", item: "https://www.stemmantra.com/programs" },
      { "@type": "ListItem", position: 3, name: program.name, item: `https://www.stemmantra.com/programs/${program.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main className="min-h-screen bg-transparent">
        {/* ── Hero ── */}
        <section className="relative pt-28 pb-0 bg-transparent overflow-hidden">
          {/* Breadcrumb */}
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 pt-4 pb-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/programs" className="hover:text-gray-600 transition-colors">Programs</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-gray-700 font-medium">{program.name}</span>
            </nav>
          </div>

          {/* Hero content */}
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${program.accentBg} ${program.accentText}`}>
                  {program.gradeRange}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                  {program.seoSubtitle}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                {program.h1}
              </h1>
              <p className={`text-lg font-medium italic mb-5 ${program.accentText}`}>
                &ldquo;{program.positioning}&rdquo;
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-2xl">
                {program.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Request a Lab Proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Programs
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero image — 16:9 full width */}
          <motion.div
            className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-gray-100 shadow-lg mt-8 md:mt-0">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1600px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>
        </section>

        {/* ── What Is This Lab? ── */}
        <section className="py-16 px-4">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                  What is the {program.name}?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">{program.whatIsIt}</p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Curriculum Approach</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{program.curriculumApproach}</p>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Lab Infrastructure</h3>
                <p className="text-gray-600 leading-relaxed">{program.infrastructure}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Learning outcomes */}
                <div className={`rounded-2xl p-6 ${program.accentBg}`}>
                  <h3 className={`text-base font-bold mb-4 ${program.accentText}`}>
                    What Students Learn
                  </h3>
                  <ul className="space-y-2">
                    {program.learningOutcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${program.accentText}`} />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    Technologies &amp; Learning Domains
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {program.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Implementation ── */}
        <section className="py-16 px-4 bg-transparent">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                How STEMmantra Implements This
              </h2>
              <p className="text-gray-500">
                A structured process from first conversation to ongoing school support.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {program.implementationSteps.map((step, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <div className={`w-8 h-8 ${program.accentBg} rounded-lg flex items-center justify-center mb-3`}>
                    <span className={`text-xs font-black ${program.accentText}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {program.faqs.length > 0 && (
          <section className="py-16 px-4 bg-transparent">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                  Frequently Asked Questions
                </h2>
              </motion.div>
              <div className="max-w-2xl divide-y divide-gray-100">
                {program.faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded"
                      aria-expanded={openFaq === i}
                    >
                      <span className="text-sm font-semibold text-gray-800">{faq.question}</span>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        {openFaq === i ? (
                          <Minus className="w-3 h-3 text-gray-600" />
                        ) : (
                          <Plus className="w-3 h-3 text-gray-600" />
                        )}
                      </span>
                    </button>
                    {openFaq === i && (
                      <p className="pb-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-16 px-4 bg-transparent">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
            <div className="bg-gray-900 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-56 h-56 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 relative z-10">
                Interested in the{" "}
                <span className="text-orange-400">{program.name}</span>?
              </h2>
              <p className="text-gray-400 mb-7 max-w-lg mx-auto relative z-10">
                Get a detailed proposal designed for your school — including lab
                design, equipment, curriculum and implementation plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Request a Lab Proposal
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Labs ── */}
        <section className="py-16 px-4 bg-transparent">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
            <h2 className="text-2xl font-black text-gray-900 mb-8">Explore Other Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={rel.href}
                  className="group flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">{rel.gradeRange}</p>
                    <p className="font-bold text-gray-900 text-sm mb-1">{rel.name}</p>
                    <p className={`text-xs font-medium ${rel.accentText} flex items-center gap-1`}>
                      Explore Lab <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
