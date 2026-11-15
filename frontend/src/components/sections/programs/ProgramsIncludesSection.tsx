"use client";
import {
  Ruler,
  Package,
  BookOpen,
  GraduationCap,
  Monitor,
  Wrench,
  Trophy,
  Headphones,
} from "lucide-react";

const includes = [
  {
    number: "01",
    icon: Ruler,
    title: "Space Design",
    description:
      "Purpose-built lab layout and dedicated learning zones designed around how students actually work.",
  },
  {
    number: "02",
    icon: Package,
    title: "Equipment",
    description:
      "Age-appropriate hardware, kits and technology selected for each lab type and grade range.",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Curriculum",
    description:
      "Structured grade-wise learning pathways with clear objectives and project milestones.",
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Educator Training",
    description:
      "Teacher enablement so educators can confidently plan and deliver the program.",
  },
  {
    number: "05",
    icon: Monitor,
    title: "Digital Learning",
    description:
      "Digital resources and platform support where applicable to the program.",
  },
  {
    number: "06",
    icon: Wrench,
    title: "Implementation",
    description:
      "Lab setup, onboarding and program launch — handled end-to-end.",
  },
  {
    number: "07",
    icon: Trophy,
    title: "Competitions & Projects",
    description:
      "Support for exhibitions, competitions and innovation projects where applicable.",
  },
  {
    number: "08",
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "Curriculum, technical and implementation support through the school year.",
  },
];

export default function ProgramsIncludesSection() {
  return (
    <section className="py-24 px-4 bg-transparent border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-bold tracking-wide uppercase mb-4">
            Complete Ecosystem
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            A Lab Is More Than <br className="hidden md:block" />
            <span className="text-orange-500">Four Walls.</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            STEMmantra provides complete learning ecosystems — not equipment
            catalogues. Every lab includes eight core components designed for
            absolute success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {includes.map((item) => (
            <div
              key={item.number}
              className="group relative bg-transparent border border-gray-200 rounded-2xl p-8 hover:border-orange-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Subtle top accent line on hover */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-md origin-left" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-orange-300/70 group-hover:text-orange-500 transition-colors duration-300">
                  {item.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
