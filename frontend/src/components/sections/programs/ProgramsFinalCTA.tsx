"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function ProgramsFinalCTA() {
  return (
    <section className="py-20 px-4 bg-transparent relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <motion.div
          className="bg-gray-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Subtle accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <span className="inline-block px-4 py-1.5 bg-transparent/10 text-orange-400 rounded-full text-sm font-semibold mb-6 relative z-10">
            Ready to Begin?
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 max-w-2xl mx-auto leading-tight relative z-10">
            Ready to Build a Future-Ready{" "}
            <span className="text-orange-400">Learning Environment?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-base relative z-10">
            Join schools across India that have partnered with STEMmantra to
            design and enable complete learning ecosystems for their students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors text-base"
            >
              Request a Lab Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white rounded-xl font-semibold hover:bg-transparent/10 transition-colors text-base"
            >
              <Phone className="w-4 h-4" />
              Book a Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
