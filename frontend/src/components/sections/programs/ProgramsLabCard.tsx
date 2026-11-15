"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Program } from "@/data/programs";

interface Props {
  program: Program;
  index?: number;
}

export default function ProgramsLabCard({ program, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image — Shortened to aspect-[2/1] or fixed height to save space */}
      <div className="relative h-[160px] w-full overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading={index < 3 ? "eager" : "lazy"}
        />
        {/* Grade badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-gray-800 rounded-full text-[10px] uppercase font-bold shadow-sm tracking-wider">
            {program.gradeRange}
          </span>
        </div>
      </div>

      {/* Content - Compact padding */}
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-black text-gray-900 mb-0.5 leading-snug">
            {program.name}
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
            {program.seoSubtitle}
          </p>
          <p className={`text-xs font-semibold italic mb-2 ${program.accentText}`}>
            {program.positioning}
          </p>
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
            {program.shortDescription}
          </p>
        </div>

        <div className="mt-auto">
          {/* Tech tags - Compact */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {program.techTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 text-[9px] uppercase font-bold rounded-md ${program.accentBg} ${program.accentText}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={program.href}
            className={`inline-flex items-center gap-1.5 text-xs font-bold ${program.accentText} hover:underline group/link`}
            aria-label={`Explore ${program.name}`}
          >
            Explore Lab
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
