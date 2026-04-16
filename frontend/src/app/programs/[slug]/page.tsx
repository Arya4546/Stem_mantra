"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaCheckCircle, FaGraduationCap, FaClock, FaUsers,
  FaArrowLeft, FaStar, FaRocket, FaLightbulb, FaPhone, FaArrowRight
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
    image: "/images/kids-learning-robotics.png",
    thumbnail: "/images/kids-learning-robotics.png",
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
    image: "/images/student-robotics.png",
    thumbnail: "/images/student-robotics.png",
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
    image: "/images/kits/robotics-car-kit.png",
    thumbnail: "/images/kits/robotics-car-kit.png",
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
    image: "/images/ai-ml-kids.png",
    thumbnail: "/images/ai-ml-kids.png",
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
    image: "/images/kits/tank-robot-kit.png",
    thumbnail: "/images/kits/tank-robot-kit.png",
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
    image: "/images/innovation-teamwork.png",
    thumbnail: "/images/innovation-teamwork.png",
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
    image: "/images/gallery/session-1.png",
    thumbnail: "/images/gallery/session-1.png",
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
    image: "/images/gallery/session-3.png",
    thumbnail: "/images/gallery/session-3.png",
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
    image: "/images/stem-education-banner.png",
    thumbnail: "/images/stem-education-banner.png",
  },
  "pre-tinkering-lab": {
    id: "seo-pre-tinkering-lab",
    slug: "pre-tinkering-lab",
    name: "Pre Tinkering Lab",
    description: "Focuses on leveraging technology in education from grade 3 to 5th. Our curriculum is full of 'learning with fun' activities.",
    type: "STEM_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 3-5",
    features: ["Building blocks", "Puzzles and arts", "Simple machines", "Basic electronic concepts", "Nature exploration tools"],
    learningOutcomes: ["Early stage technological leaning", "Analytical thinking", "Creativity and Imagination", "Fine motor skills"],
    curriculum: ["Building Blocks", "Simple Machines", "Basic Electronics", "Nature Exploration"],
    isFeatured: true,
    image: "/images/stem-education-banner.png",
    thumbnail: "/images/stem-education-banner.png",
  },
  "steamverse-lab": {
    id: "seo-steamverse-lab",
    slug: "steamverse-lab",
    name: "STEAMVERSE Lab",
    description: "Exciting STEM, Robotics, IoT activities for grades 3-12, fostering hands-on learning, including 3-D Printing and Drones.",
    type: "ROBOTICS_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 3-12",
    features: ["5+ Micro-controllers", "40+ Sensors", "10+ DIY Kits", "3D Printing", "Drone technology"],
    learningOutcomes: ["Hands-on learning", "Advanced Robotics proficiency", "IoT application", "Tech literacy"],
    curriculum: ["Micro-Controllers", "Sensors & Circuits", "3D Design & Printing", "Drone Aviation"],
    isFeatured: true,
    image: "/images/kits/robotics-car-kit.png",
    thumbnail: "/images/kits/robotics-car-kit.png",
  },
  "ai-coding-lab": {
    id: "seo-ai-coding-lab",
    slug: "ai-coding-lab",
    name: "AI & Coding Lab",
    description: "Concept of Python, Machine learning, Artificial Intelligence & computer vision for grade 5-12th over & above schools academic curriculum.",
    type: "AI_ML",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 5-12",
    features: ["Python programming", "Machine learning basics", "Computer vision", "State of the art AI software"],
    learningOutcomes: ["Python proficiency", "AI fundamentals", "Machine learning concepts", "Real-world problem solving"],
    curriculum: ["Python Basics", "Machine Learning", "Computer Vision", "AI Real-world Applications"],
    isFeatured: true,
    image: "/images/ai-ml-kids.png",
    thumbnail: "/images/ai-ml-kids.png",
  },
  "innoverse-lab": {
    id: "seo-innoverse-lab",
    slug: "innoverse-lab",
    name: "INNOVERSE Lab",
    description: "Hands-on one stop solution activities for the school's all technological needs catering to diverse skill levels.",
    type: "STEM_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 3-12",
    features: ["One stop IoT & Tech solution", "Progressive curriculum", "Individualized learning path", "Diverse skill level support"],
    learningOutcomes: ["Technological independence", "Exploration and growth", "Progressive skill building", "Design thinking"],
    curriculum: ["IoT Systems", "Tech Exploration", "Skill Development", "Innovation Projects"],
    isFeatured: true,
    image: "/images/student-robotics.png",
    thumbnail: "/images/student-robotics.png",
  },
  "atl-lab": {
    id: "seo-atl-lab",
    slug: "atl-lab",
    name: "ATL Lab (Atal Tinkering Lab)",
    description: "Complete end to end solution for ATL lab from providing equipment to training, to competition with full AIM compliance.",
    type: "ATL_LAB",
    status: "ACTIVE",
    duration: "Full academic year",
    gradeLevel: "Class 6-12",
    features: ["AIM strict compliance", "End to end equipment setup", "Teacher & Student training", "Competition readiness prep"],
    learningOutcomes: ["Innovation mindset", "Prototyping setup execution", "Competition performance", "Design thinking"],
    curriculum: ["Design Thinking", "Tinkering Basics", "Project Execution", "Entrepreneurship"],
    isFeatured: true,
    image: "/images/gallery/session-1.png",
    thumbnail: "/images/gallery/session-1.png",
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
    image: "/images/gallery/session-4.png",
    thumbnail: "/images/gallery/session-4.png",
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
    image: "/images/gallery/session-8.png",
    thumbnail: "/images/gallery/session-8.png",
  },
};

export default function ProgramPage() {
  const params = useParams();
  const slug = params.slug as string;
  const program = staticPrograms[slug];

  if (!program) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-8">We couldn&apos;t find this program.</p>
            <Link href="/programs" className="text-orange-500 hover:underline">Return to Programs</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const typeData: Record<string, { label: string; accent: string; bg: string }> = {
    ATL_LAB: { label: "Atal Tinkering Lab", accent: "text-amber-600", bg: "bg-amber-50" },
    ROBOTICS_LAB: { label: "Robotics & AI Lab", accent: "text-blue-600", bg: "bg-blue-50" },
    STEM_LAB: { label: "STEM Innovation Lab", accent: "text-green-600", bg: "bg-green-50" },
    AI_ML: { label: "AI & Machine Learning", accent: "text-purple-600", bg: "bg-purple-50" },
    IOT: { label: "Internet of Things", accent: "text-cyan-600", bg: "bg-cyan-50" },
    CODING: { label: "Coding & Software", accent: "text-rose-600", bg: "bg-rose-50" },
  };

  const type = typeData[program.type] || { label: program.type, accent: "text-gray-600", bg: "bg-gray-50" };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section — Left Aligned, White Background */}
        <section className="pt-32 pb-12 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <Link href="/programs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 mb-8 transition-colors">
              <FaArrowLeft className="w-3 h-3" /> Back to All Programs
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {program.isFeatured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                      <FaStar className="w-3 h-3" /> Featured Program
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${type.bg} ${type.accent} rounded-full text-xs font-bold`}>
                    {type.label}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {program.name}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" className="px-8 py-4 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm">
                    Enroll Now
                  </Link>
                  <Link href="/contact" className="px-8 py-4 border border-gray-200 text-gray-900 font-bold rounded-xl hover:border-orange-500 transition-colors">
                    Request Demo
                  </Link>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full">
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                  <Image
                    src={program.thumbnail || program.image || "/images/programs/placeholder.jpg"}
                    alt={program.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-100 rounded-full -z-10 blur-2xl opacity-60" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Info Strip */}
        <section className="py-8 border-y border-gray-100 bg-gray-50/50 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <FaClock className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">Duration</span>
                  <span className="font-bold text-gray-900">{program.duration}</span>
                </div>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <FaGraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">Grade Level</span>
                  <span className="font-bold text-gray-900">{program.gradeLevel}</span>
                </div>
              </div>
              <div className="hidden md:block w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                  <FaUsers className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold">Enrollments</span>
                  <span className="font-bold text-gray-900">5,000+ Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Outcomes — Clean Cards */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Features */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
                    <FaRocket className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Program Features</h2>
                </div>
                <ul className="space-y-4">
                  {program.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm w-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                    <FaLightbulb className="w-6 h-6 text-teal-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Learning Outcomes</h2>
                </div>
                <ul className="space-y-4">
                  {program.learningOutcomes?.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FaCheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-600 font-medium">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum — Simple Numbered Grid */}
        <section className="py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="w-full mx-auto">
            <div className="text-center mb-16 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Curriculum Modules</h2>
              <p className="text-gray-600 w-full">A structured pathway designed to take students from basics to advanced proficiency.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {program.curriculum?.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors shadow-sm text-center">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <span className="text-orange-500 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-gray-900">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Boxed Dark Card */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="w-full mx-auto">
            <div className="bg-gray-900 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden w-full">
              <div className="relative z-10 w-full">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-gray-400 text-lg mb-10 w-full">
                  Enroll your child or partner with us to bring this program to your school.
                  Our experts are ready to guide you.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center px-10 py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg w-full sm:w-auto">
                    Register Now
                  </Link>
                  <a href="tel:+916356631515" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto">
                    <FaPhone className="w-4 h-4" /> 
                    <span>+91 6356631515</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
