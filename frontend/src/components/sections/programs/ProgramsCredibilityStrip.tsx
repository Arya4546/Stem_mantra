"use client";
import { motion, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { School, Users, CalendarCheck, BadgeCheck } from "lucide-react";

interface StatItem {
  icon: React.ElementType;
  value: string;
  numericEnd: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: School, value: "300+", numericEnd: 300, suffix: "+", label: "Partner Schools" },
  { icon: Users, value: "1,50,000+", numericEnd: 150000, suffix: "+", label: "Students Reached" },
  { icon: CalendarCheck, value: "10+", numericEnd: 10, suffix: "+", label: "Years of Experience" },
  { icon: BadgeCheck, value: "100%", numericEnd: 100, suffix: "%", label: "NEP & NCF Aligned" },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, end, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => {
        setDisplay(Math.round(v).toLocaleString("en-IN"));
      },
    });
    return controls.stop;
  }, [inView, end]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export default function ProgramsCredibilityStrip() {
  return (
    <section className="bg-transparent border-y border-gray-100 py-8 px-4 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <stat.icon className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-xl font-black text-gray-900">
                  {stat.numericEnd > 0 ? (
                    <CountUp end={stat.numericEnd} suffix={stat.suffix} />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
