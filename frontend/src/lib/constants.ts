export const SITE_CONFIG = {
  name: "STEMmantra",
  tagline: "Master The Skills 'Drive Your Future...'/A step towards innovation",
  description:
    "STEM learning focusing on leveraging technology on K-12 Segment for Robotics,STEM(science, technology, engineering, and mathematics). We provide complete end to end solution for ATL , Robotics, STEM/STEAM,IoT,AI & Coding labs, teacher/Students training, and NEP 2020 & NCF 2023 aligned curriculum for schools.",
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
    phone: "+91-6356631515",
    mobile: "+91-6356631515",
    landline: "0120-3101774",
    email: "sales@stemmantra.com",
    address: "C-104 2nd Floor, Sector-10, Noida, Uttar Pradesh – 201301",
  },
} as const;

export const NAVIGATION = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Robotics Labs", href: "/programs/robotics-labs" },
  { name: "STEM Labs", href: "/programs/stem-labs" },
  { name: "ATL Labs", href: "/programs/atl-labs" },
  { name: "Gallery", href: "/gallery" },
  { name: "Learn", href: "https://learn.stemmantra.com/", external: true },
  { name: "Contact", href: "/contact" },
] as const;

export const STATS_DATA = [
  { label: "Partner Institutions", value: "300+", icon: "School" },
  { label: "Student Innovators", value: "1,50,000+", icon: "Users" },
  { label: "States Impacted", value: "16+", icon: "MapPin" },
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
    title: "Concept-Based Learning",
    description:
      "Concept-based learning focuses on building a strong foundation through basic concepts. Students learn these concepts using engaging activities in robotics and coding. This approach makes learning simple, interactive, and easy to understand.",
  },
  {
    step: "02",
    title: "Project-Based Learning",
    description:
      "Project-based learning is the intermediate stage where students apply their basic knowledge. They progress from concepts to creating simple projects that help solve everyday problems. This hands-on approach strengthens understanding and practical skills.",
  },
  {
    step: "03",
    title: "Innovation-Based Learning",
    description:
      "Innovation-based learning focuses on solving real-world problems. Students identify challenges and use their basic and intermediate knowledge to develop solutions while learning advanced concepts. This approach promotes creativity, critical thinking, and innovation.",
  },
] as const;
