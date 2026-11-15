"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Small client wrapper so Server Components can use the fade-up entrance animation. */
export default function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}
