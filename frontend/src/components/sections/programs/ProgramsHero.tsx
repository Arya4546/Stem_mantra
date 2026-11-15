"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function ProgramsHero() {
  return (
    <section className="relative pt-32 pb-16 px-4 bg-transparent overflow-hidden">
      {/* Subtle top-right accent blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-6 tracking-wide">
            NEP 2020 &amp; NCF 2023 Aligned
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
            Learning Ecosystems{" "}
            <span className="text-orange-500">Built for the Future.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
            From curiosity to creation — future-ready learning environments
            designed for schools, combining hands-on curriculum, technology,
            educator enablement and measurable student outcomes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#lab-grid"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-base"
            >
              Explore Our Labs
              <ChevronDown className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors text-base"
            >
              Talk to an Education Expert
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
