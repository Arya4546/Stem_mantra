"use client";
import { motion } from "framer-motion";
import { Cpu, Sparkles, Award, Users, Bot, Zap, Microscope } from "lucide-react";

const ICONS = [
  { icon: Cpu, color: "text-orange-500/20", size: "w-14 h-14", duration: 5, x: "left-[10%]", y: "top-40" },
  { icon: Sparkles, color: "text-teal-500/20", size: "w-10 h-10", duration: 6, x: "right-[15%]", y: "top-60" },
  { icon: Award, color: "text-orange-500/10", size: "w-12 h-12", duration: 7, x: "left-[20%]", y: "bottom-20" },
  { icon: Users, color: "text-teal-500/10", size: "w-10 h-10", duration: 8, x: "right-[10%]", y: "bottom-32" },
  { icon: Bot, color: "text-orange-500/10", size: "w-12 h-12", duration: 6, x: "left-[30%]", y: "bottom-40" },
  { icon: Microscope, color: "text-teal-500/10", size: "w-10 h-10", duration: 7, x: "right-[25%]", y: "top-80" },
  { icon: Zap, color: "text-orange-500/10", size: "w-10 h-10", duration: 5, x: "left-[40%]", y: "top-96" },
];

export default function FloatingIcons({
  icons = ICONS,
  count = 2,
  className = "",
  style = {},
  zIndex = 0,
}: {
  icons?: typeof ICONS;
  count?: number;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
}) {
  // Pick a subset of icons for each section
  const selected = icons.slice(0, count);
  return (
    <>
      {selected.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className={`pointer-events-none absolute ${item.y} ${item.x} ${item.color} hidden md:block z-[${zIndex}] ${className}`}
            animate={{ y: [0, i % 2 === 0 ? -20 : 20, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: item.duration, repeat: Infinity }}
            style={style}
            aria-hidden="true"
          >
            <Icon className={item.size} />
          </motion.div>
        );
      })}
    </>
  );
}
