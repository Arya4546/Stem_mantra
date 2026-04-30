import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProgramDetail from "./ProgramDetail";

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

export async function generateStaticParams() {
  return Object.keys(staticPrograms).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const program = staticPrograms[params.slug];
  if (!program) return { title: "Program Not Found" };

  return {
    title: `${program.name} | STEMmantra`,
    description: program.description,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = staticPrograms[params.slug];

  if (!program) {
    notFound();
  }

  return <ProgramDetail program={program} />;
}
