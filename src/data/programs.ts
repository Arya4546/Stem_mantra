export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  features: string[];
  benefits: string[];
  targetAudience: string;
  duration?: string;
}

export const programs: Program[] = [
  {
    id: "atl-labs",
    title: "ATL Labs (Atal Tinkering Labs)",
    slug: "atl-labs",
    description:
      "Comprehensive end-to-end assistance in establishing and running Atal Tinkering Labs in schools. We provide students with a stimulating environment for exploring and mastering STEM, tinkering, IoT, and entrepreneurship.",
    features: [
      "Complete ATL lab setup with all required equipment",
      "Comprehensive teacher training programs",
      "NEP 2020 aligned curriculum development",
      "Year-long support and mentorship",
      "Regular workshops and competitions",
      "Project-based learning modules",
    ],
    benefits: [
      "Hands-on learning experience",
      "Development of critical thinking skills",
      "Exposure to latest technologies",
      "Government-recognized certification",
      "Innovation and entrepreneurship development",
    ],
    targetAudience: "Schools (Classes 6-12)",
    duration: "Year-long program",
  },
  {
    id: "robotics-labs",
    title: "Robotics & AI Labs",
    slug: "robotics-labs",
    description:
      "World-class robotics and AI laboratory setup for schools with age-appropriate robotics kits, AI modules, and comprehensive project-based learning curriculum for grades 1-12.",
    features: [
      "Advanced robotics kits and components",
      "AI and Machine Learning modules",
      "IoT integration and smart devices",
      "Coding and programming platforms",
      "Competition preparation and guidance",
      "Expert trainer support",
    ],
    benefits: [
      "Develop computational thinking",
      "Learn real-world AI applications",
      "Hands-on robotics experience",
      "Prepare for robotics competitions",
      "Career readiness in tech fields",
    ],
    targetAudience: "Schools (Classes 1-12)",
    duration: "Ongoing program",
  },
  {
    id: "stem-labs",
    title: "STEM Innovation Labs",
    slug: "stem-labs",
    description:
      "Complete STEM laboratory solutions with hands-on learning equipment, 3D printers, electronics kits, and comprehensive curriculum for fostering innovation and creativity.",
    features: [
      "3D printing and design tools",
      "Electronics and circuit kits",
      "Coding and programming platforms",
      "Project-based workshop modules",
      "STEM curriculum for all grades",
      "Teacher training and support",
    ],
    benefits: [
      "Multidisciplinary learning approach",
      "Creativity and innovation development",
      "Problem-solving skills",
      "Practical application of concepts",
      "Collaboration and teamwork",
    ],
    targetAudience: "Schools (Classes 1-12)",
    duration: "Customizable program",
  },
];
