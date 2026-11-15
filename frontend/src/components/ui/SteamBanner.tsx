"use client";

import { motion } from "framer-motion";
import { FaFlask, FaMicrochip, FaCogs, FaPalette, FaRulerCombined } from "react-icons/fa";

const tiles = [
  { letter: "S", word: "Science", Icon: FaFlask, from: "from-orange-500", to: "to-orange-600", text: "text-orange-600" },
  { letter: "T", word: "Technology", Icon: FaMicrochip, from: "from-teal-400", to: "to-teal-500", text: "text-teal-600" },
  { letter: "E", word: "Engineering", Icon: FaCogs, from: "from-sky-500", to: "to-blue-600", text: "text-blue-600" },
  { letter: "A", word: "Arts", Icon: FaPalette, from: "from-pink-500", to: "to-rose-500", text: "text-rose-600" },
  { letter: "M", word: "Mathematics", Icon: FaRulerCombined, from: "from-amber-400", to: "to-yellow-500", text: "text-amber-600" },
];

/** Vector STEAM illustration – Science · Technology · Engineering · Arts · Mathematics. */
export default function SteamBanner() {
  return (
    <div
      role="img"
      aria-label="STEAM: Science, Technology, Engineering, Arts and Mathematics"
      className="relative w-full rounded-[2rem] bg-white/70 backdrop-blur-sm border border-white/80 shadow-xl p-4 md:p-6 overflow-hidden"
    >
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-teal-200/40 blur-3xl pointer-events-none" aria-hidden />

      <div className="relative grid grid-cols-5 gap-2 md:gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.letter}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group flex flex-col items-center"
          >
            <div
              className={`relative w-full rounded-2xl bg-gradient-to-b ${t.from} ${t.to} shadow-lg overflow-hidden flex flex-col items-center justify-between py-[clamp(0.5rem,2vh,1.25rem)] group-hover:-translate-y-1.5 transition-transform duration-300`}
              style={{ height: "clamp(8.5rem, 34vh, 20rem)" }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" aria-hidden />
              <span className="relative w-[clamp(1.75rem,4.2vh,2.75rem)] h-[clamp(1.75rem,4.2vh,2.75rem)] rounded-full bg-white/25 flex items-center justify-center">
                <t.Icon className="w-1/2 h-1/2 text-white" />
              </span>
              <span className="relative font-black text-white leading-none drop-shadow-md" style={{ fontSize: "clamp(2.25rem, 9vh, 5.5rem)" }}>
                {t.letter}
              </span>
              <span className="relative h-1.5 w-1/3 rounded-full bg-white/50" aria-hidden />
            </div>
            <span className={`mt-3 text-[10px] sm:text-xs lg:text-[clamp(0.6rem,1.2vw,0.8rem)] font-black uppercase tracking-wide ${t.text} text-center leading-tight`}>
              {t.word}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
