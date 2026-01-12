import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaCheckCircle,
  FaGraduationCap,
  FaClock,
  FaUsers,
  FaArrowLeft,
  FaStar,
  FaRocket,
  FaLightbulb,
} from "react-icons/fa";

// ============================================
// Types
// ============================================

interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  image?: string;
  thumbnail?: string;
  duration?: string;
  gradeLevel?: string;
  features?: string[];
  learningOutcomes?: string[];
  prerequisites?: string[];
  curriculum?: string[];
  isFeatured?: boolean;
  _count?: {
    courses?: number;
    enrollments?: number;
  };
}

// ============================================
// Fetch Program Data
// ============================================

async function getProgram(slug: string): Promise<Program | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/programs/slug/${slug}`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching program:", error);
    return null;
  }
}

// ============================================
// Generate Metadata
// ============================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const program = await getProgram(resolvedParams.slug);

  if (!program) {
    return {
      title: "Program Not Found | STEM Mantra",
      description: "The program you're looking for doesn't exist.",
    };
  }

  return {
    title: `${program.name} - STEM Education Program | STEM Mantra`,
    description: program.description,
    openGraph: {
      title: `${program.name} | STEM Mantra`,
      description: program.description,
      images: program.image ? [program.image] : [],
    },
  };
}

// ============================================
// Program Detail Page
// ============================================

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const program = await getProgram(resolvedParams.slug);

  if (!program) {
    notFound();
  }

  const typeColors: Record<string, { bg: string; text: string; gradient: string }> = {
    ATL_LAB: { bg: "bg-amber-100", text: "text-amber-700", gradient: "from-amber-500 to-orange-500" },
    ROBOTICS_LAB: { bg: "bg-blue-100", text: "text-blue-700", gradient: "from-blue-500 to-indigo-500" },
    STEM_LAB: { bg: "bg-green-100", text: "text-green-700", gradient: "from-green-500 to-teal-500" },
    AI_ML: { bg: "bg-purple-100", text: "text-purple-700", gradient: "from-purple-500 to-pink-500" },
    IOT: { bg: "bg-cyan-100", text: "text-cyan-700", gradient: "from-cyan-500 to-blue-500" },
    CODING: { bg: "bg-rose-100", text: "text-rose-700", gradient: "from-rose-500 to-red-500" },
  };

  const colors = typeColors[program.type] || { bg: "bg-slate-100", text: "text-slate-700", gradient: "from-slate-500 to-gray-500" };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        {/* Hero Section */}
        <section className={`relative py-20 lg:py-28 overflow-hidden bg-gradient-to-r ${colors.gradient}`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Link */}
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Programs
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                {/* Badges */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {program.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-sm font-semibold">
                      <FaStar className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-semibold`}>
                    {program.type.replace("_", " ")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {program.name}
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                  {program.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 text-white/80">
                  {program.duration && (
                    <span className="flex items-center gap-2">
                      <FaClock className="w-5 h-5" />
                      {program.duration}
                    </span>
                  )}
                  {program.gradeLevel && (
                    <span className="flex items-center gap-2">
                      <FaGraduationCap className="w-5 h-5" />
                      {program.gradeLevel}
                    </span>
                  )}
                  {program._count?.enrollments !== undefined && (
                    <span className="flex items-center gap-2">
                      <FaUsers className="w-5 h-5" />
                      {program._count.enrollments} Students
                    </span>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 mt-10">
                  <Link
                    href="/contact"
                    className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/contact"
                    className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Request Demo
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  {(program.thumbnail && program.thumbnail.length > 0) || (program.image && program.image.length > 0) ? (
                    <Image
                      src={program.thumbnail || program.image || ""}
                      alt={program.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                      <FaRocket className="w-24 h-24 text-white/40" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Learning Outcomes */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Features */}
            {program.features && program.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}>
                    <FaLightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>
                </div>
                <ul className="space-y-4">
                  {program.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learning Outcomes */}
            {program.learningOutcomes && program.learningOutcomes.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center`}>
                    <FaGraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">What You&apos;ll Learn</h2>
                </div>
                <ul className="space-y-4">
                  {program.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-slate-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Curriculum */}
        {program.curriculum && program.curriculum.length > 0 && (
          <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Curriculum
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  A comprehensive learning journey designed by industry experts
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.curriculum.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors.gradient} flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <p className="text-slate-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className={`py-20 bg-gradient-to-r ${colors.gradient}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join hundreds of schools that have already partnered with STEM Mantra 
              to bring world-class STEM education to their students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login?redirect=/dashboard/courses"
                className="px-10 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors"
              >
                Enroll Now
              </Link>
              <Link
                href="/programs"
                className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              >
                Explore Other Programs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
