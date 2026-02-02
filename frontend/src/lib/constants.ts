export const SITE_CONFIG = {
  name: "STEMmantra",
  tagline: "Master The Skills 'Drive Your Future...'",
  description:
    "STEM learning focusing on science, technology, engineering, and mathematics. We provide ATL Labs setup, Robotics Labs, STEM Labs, teacher training, and NEP 2020 aligned curriculum for schools.",
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

import { Microscope, Bot, Zap } from "lucide-react";

export const PROGRAMS = [
  {
    id: "atl-labs",
    title: "ATL Labs (Atal Tinkering Labs)",
    slug: "atl-labs",
    description:
      "Comprehensive end-to-end assistance in establishing and running Atal Tinkering Labs in schools, providing students with a stimulating environment for exploring STEM, tinkering, IoT, and entrepreneurship.",
    features: [
      "Complete lab setup and equipment",
      "Teacher training programs",
      "Curriculum development",
      "Ongoing support and mentorship",
    ],
    icon: Microscope,
  },
  {
    id: "robotics-labs",
    title: "Robotics & AI Labs",
    slug: "robotics-labs",
    description:
      "World-class robotics and AI lab setup for schools with age-appropriate kits, project-based learning curriculum, and expert training for grades 1-12.",
    features: [
      "Advanced robotics kits",
      "AI and machine learning modules",
      "IoT integration",
      "Competition preparation",
    ],
    icon: Bot,
  },
  {
    id: "stem-labs",
    title: "STEM Innovation Labs",
    slug: "stem-labs",
    description:
      "Complete STEM laboratory solutions with hands-on learning equipment, 3D printers, electronics kits, and comprehensive curriculum for innovative learning.",
    features: [
      "3D printing and design",
      "Electronics and circuits",
      "Coding and programming",
      "Project-based workshops",
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
