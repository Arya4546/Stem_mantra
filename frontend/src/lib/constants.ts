export const SITE_CONFIG = {
  name: "STEMmantra",
  tagline: "Empowering the Next Generation of Innovators",
  description:
    "India's leading provider of Robotics, AI, and STEM education solutions. Transitioning K-12 institutions with NEP 2020 & NCF 2023 aligned pedagogical frameworks.",
  url: "https://www.stemmantra.com",
  ogImage: "https://www.stemmantra.com/og-image.jpg",
  links: {
    facebook: "https://www.facebook.com/stemmantra",
    twitter: "https://x.com/stemmantra",
    linkedin: "https://www.linkedin.com/company/stemmantra/",
    youtube: "https://www.youtube.com/@STEMMantra",
    instagram: "https://www.instagram.com/stemmantra/",
  },
  social: {
    facebook: "https://www.facebook.com/stemmantra",
    twitter: "https://x.com/stemmantra",
    linkedin: "https://www.linkedin.com/company/stemmantra/",
    youtube: "https://www.youtube.com/@STEMMantra",
    instagram: "https://www.instagram.com/stemmantra/",
  },
  contact: {
    phone: "01203101774",
    mobile: "+91-6356631515",
    email: "sales@stemmantra.com",
    address: "C-104 2nd Floor, Noida Sec-10, UP – 201301",
  },
} as const;

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "ATL Labs", href: "/programs/atl-labs" },
  { name: "Robotics Labs", href: "/programs/robotics-labs" },
  { name: "STEM Labs", href: "/programs/stem-labs" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
] as const;

export const STATS_DATA = [
  { label: "Partner Schools", value: "300+", icon: "School" },
  { label: "Students Trained", value: "1.25L+", icon: "Users" },
  { label: "States Impacted", value: "18+", icon: "MapPin" },
  { label: "Lab Solutions", value: "15+", icon: "Cpu" },
] as const;

import { Microscope, Bot, Zap } from "lucide-react";

export const PROGRAMS = [
  {
    id: "steamverse-labs",
    title: "STEAMVERSE Lab (STEM Innovation)",
    slug: "steamverse-labs",
    description:
      "Comprehensive STEM lab covering Science, Technology, Engineering, and Mathematics with hands-on kits and 3D printing, aligned with NCF 2023.",
    features: [
      "Scientific Inquiry",
      "Engineering Design",
      "3D Printing & Prototyping",
      "NCF 2023 Aligned",
    ],
    icon: Microscope,
  },
  {
    id: "robotics-labs",
    title: "Robotics & AI Labs",
    slug: "robotics-labs",
    description:
      "Advanced robotics lab setup with AI & Machine Learning modules, focus on autonomous systems and competitive robotics.",
    features: [
      "Mechatronics",
      "AI & Machine Learning",
      "Computational Thinking",
      "Competition Prep",
    ],
    icon: Bot,
  },
  {
    id: "innoverse-labs",
    title: "INNOVERSE Labs (Advanced Maker Space)",
    slug: "innoverse-labs",
    description:
      "State-of-the-art maker space with IoT, electronics, and rapid fabrication tools for advanced student projects.",
    features: [
      "IoT & Smart Systems",
      "Advanced Electronics",
      "Rapid Fabrication",
      "Innovation & Troubleshooting",
    ],
    icon: Zap,
  },
] as const;

export const METHODOLOGY = [
  {
    step: "01",
    title: "Concept Based Learning",
    description:
      "Understanding underlying concepts behind technology. Our curriculum is designed so students understand basic concepts with ease.",
  },
  {
    step: "02",
    title: "Project Based Learning",
    description:
      "Learn by making real-world projects. Our PBL method allows students to learn technologies like electronics, 3D printing, IoT, and mechanics.",
  },
  {
    step: "03",
    title: "Innovation Based Learning",
    description:
      "Apply concepts creatively to solve real-world problems and develop innovative solutions.",
  },
] as const;
