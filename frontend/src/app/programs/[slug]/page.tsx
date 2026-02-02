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
// Static SEO Program Data
// ============================================

const staticPrograms: Record<string, Program> = {
  "class-1-3": {
    id: "seo-class-1-3",
    slug: "class-1-3",
    name: "STEM Foundation Program for Class 1-3",
    description: "Fun-filled introduction to STEM concepts through play-based learning for young learners aged 6-8 years.",
    type: "STEM_LAB",
    status: "ACTIVE",
    duration: "9 months",
    gradeLevel: "Class 1-3 (6-8 years)",
    features: ["Play-based learning", "Hands-on activities", "Age-appropriate robotics", "Basic coding with Scratch Jr"],
    learningOutcomes: ["Scientific curiosity", "Basic logical thinking", "Motor skill development", "Teamwork skills"],
    curriculum: ["Discover Science", "Basic Coding", "Simple Machines", "Creative Building"],
    isFeatured: true,
  },
  "class-4-5": {
    id: "seo-class-4-5",
    slug: "class-4-5",
    name: "STEM Explorer Program for Class 4-5",
    description: "Hands-on exploration of science, coding, and basic robotics for students aged 9-10 years.",
    type: "STEM_LAB",
    status: "ACTIVE",
    duration: "9 months",
    gradeLevel: "Class 4-5 (9-10 years)",
    features: ["Science experiments", "Visual programming", "Basic robotics", "Math & logic puzzles"],
    learningOutcomes: ["Scientific method understanding", "Coding fundamentals", "Basic robotics skills", "Critical thinking"],
    curriculum: ["Science Experiments", "Visual Programming", "Basic Robotics", "Math & Logic"],
    isFeatured: true,
  },
  "class-6-8": {
    id: "seo-class-6-8",
    slug: "class-6-8",
    name: "Robotics & Coding Program for Class 6-8",
    description: "Advanced robotics, text-based coding, and electronics fundamentals for students aged 11-13 years.",
    type: "ROBOTICS_LAB",
    status: "ACTIVE",
    duration: "10 months",
    gradeLevel: "Class 6-8 (11-13 years)",
    features: ["Python programming", "Advanced robotics", "Electronics basics", "3D design"],
    learningOutcomes: ["Python proficiency", "Advanced robotics", "Electronics basics", "Competition readiness"],
    curriculum: ["Python Programming", "Advanced Robotics", "Electronics", "3D Design"],
    isFeatured: true,
  },
  "class-9-10": {
    id: "seo-class-9-10",
    slug: "class-9-10",
    name: "AI & Advanced Coding for Class 9-10",
    description: "AI/ML basics, advanced programming, and IoT project development for students aged 14-15 years.",
    type: "AI_ML",
    status: "ACTIVE",
    duration: "10 months",
    gradeLevel: "Class 9-10 (14-15 years)",
    features: ["AI & Machine Learning", "Advanced Python", "IoT Development", "Web Development"],
    learningOutcomes: ["AI/ML foundations", "Advanced programming", "IoT project skills", "Career preparation"],
    curriculum: ["AI & Machine Learning", "Advanced Python", "IoT Development", "Web Development"],
    isFeatured: true,
  },
  "class-11-12": {
    id: "seo-class-11-12",
    slug: "class-11-12",
    name: "Advanced Robotics & Research for Class 11-12",
    description: "Industry-level robotics, research projects, and competition preparation for students aged 16-17 years.",
    type: "ROBOTICS_LAB",
    status: "ACTIVE",
    duration: "12 months",
    gradeLevel: "Class 11-12 (16-17 years)",
    features: ["Autonomous systems", "Deep learning", "Research methods", "Competition preparation"],
    learningOutcomes: ["Research skills", "Advanced AI/ML", "Autonomous systems", "University readiness"],
    curriculum: ["Autonomous Systems", "Deep Learning", "Research Methods", "Competition Prep"],
    isFeatured: true,
  },
  "teacher-training": {
    id: "seo-teacher-training",
    slug: "teacher-training",
    name: "STEM Educator Certification Program",
    description: "Comprehensive training for teachers to conduct STEM classes effectively with certification.",
    type: "CODING",
    status: "ACTIVE",
    duration: "3-6 months",
    gradeLevel: "Educators",
    features: ["STEM pedagogy", "Robotics training", "Coding instruction", "Lab management"],
    learningOutcomes: ["STEM teaching skills", "Lab management expertise", "Student mentoring", "Certification"],
    curriculum: ["STEM Pedagogy", "Robotics Training", "Coding Instruction", "Lab Management"],
    isFeatured: true,
  },
  "atl-labs": {
    id: "seo-atl-labs",
    slug: "atl-labs",
    name: "Atal Tinkering Labs Program",
    description: "Government of India initiative fostering innovation and entrepreneurship for Class 6-12 students.",
    type: "ATL_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 6-12",
    features: ["Design thinking", "Tinkering basics", "Innovation projects", "Entrepreneurship"],
    learningOutcomes: ["Innovation mindset", "Design thinking", "Prototyping skills", "Problem-solving"],
    curriculum: ["Design Thinking", "Tinkering Basics", "Innovation Projects", "Entrepreneurship"],
    isFeatured: true,
  },
  "robotics-lab": {
    id: "seo-robotics-lab",
    slug: "robotics-lab",
    name: "Robotics & AI Labs Program",
    description: "Build, program, and compete with advanced robots for students from Class 3-12.",
    type: "ROBOTICS_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 3-12",
    features: ["Robot building", "Programming", "AI integration", "Competition training"],
    learningOutcomes: ["Robot building skills", "Programming proficiency", "AI basics", "Competition readiness"],
    curriculum: ["Robot Building", "Programming", "AI Integration", "Competition Training"],
    isFeatured: true,
  },
  "stem-lab": {
    id: "seo-stem-lab",
    slug: "stem-lab",
    name: "STEM Innovation Labs Program",
    description: "Integrated science, technology, engineering, and math education for Class 1-12.",
    type: "STEM_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 1-12",
    features: ["Science exploration", "Technology literacy", "Engineering design", "Mathematical thinking"],
    learningOutcomes: ["Scientific inquiry", "Tech literacy", "Engineering mindset", "Critical thinking"],
    curriculum: ["Science Exploration", "Technology Literacy", "Engineering Design", "Mathematical Thinking"],
    isFeatured: true,
  },
  "coding": {
    id: "seo-coding",
    slug: "coding",
    name: "Coding & Programming Mastery",
    description: "From block coding to advanced programming languages for students from Class 1-12.",
    type: "CODING",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 1-12",
    features: ["Block coding", "Python programming", "Web development", "Advanced topics"],
    learningOutcomes: ["Computational thinking", "Multiple languages", "Web development", "Problem-solving"],
    curriculum: ["Block Coding", "Python Programming", "Web Development", "Advanced Topics"],
    isFeatured: true,
  },
  "summer-camps": {
    id: "seo-summer-camps",
    slug: "summer-camps",
    name: "STEM Summer Camp Programs",
    description: "Intensive STEM learning during summer vacation with fun activities for Class 1-12.",
    type: "STEM_LAB",
    status: "ACTIVE",
    duration: "1-4 weeks",
    gradeLevel: "Class 1-12",
    features: ["Robotics bootcamp", "Coding marathon", "Science adventure", "Innovation week"],
    learningOutcomes: ["Skill acceleration", "Project completion", "New friendships", "Fun learning"],
    curriculum: ["Robotics Bootcamp", "Coding Marathon", "Science Adventure", "Innovation Week"],
    isFeatured: true,
  },
};

// ============================================
// Fetch Program Data
// ============================================

async function getProgram(slug: string): Promise<Program | null> {
  // First check static programs
  if (staticPrograms[slug]) {
    return staticPrograms[slug];
  }

  // Then try API
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
      title: "Program Not Found | STEMmantra",
      description: "The program you're looking for doesn't exist.",
    };
  }

  return {
    title: `${program.name} - STEM Education Program | STEMmantra`,
    description: program.description,
    openGraph: {
      title: `${program.name} | STEMmantra`,
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
              Join hundreds of schools that have already partnered with STEMmantra
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
