import { Metadata } from "next";
import AboutContent from "./AboutContent";

/* ===================== SEO METADATA ===================== */
export const metadata: Metadata = {
  title: { absolute: "About STEMmantra | STEM, Robotics & AI Lab Company in India" },
  description:
    "STEMmantra sets up STEM, robotics, AI & coding labs and Atal Tinkering Labs (ATL) in 300+ schools across India — NEP 2020 aligned curriculum, teacher training, plus our own LMS and online coding platform.",
  keywords: [
    "STEM education company in India",
    "robotics lab for schools",
    "STEM lab setup for schools",
    "Atal Tinkering Lab setup",
    "ATL lab setup company",
    "AI and coding lab for schools",
    "STEAM education",
    "NEP 2020 aligned curriculum",
    "NCF 2023 STEM curriculum",
    "school robotics program",
    "coding for kids",
    "learning management system for schools",
    "LMS for schools India",
    "online coding platform for students",
    "block coding and Arduino simulator",
    "teacher training STEM",
    "STEMmantra",
  ],
  openGraph: {
    title: "About STEMmantra | STEM, Robotics & AI Lab Company in India",
    description:
      "STEM, robotics, AI & coding labs and Atal Tinkering Labs for 300+ schools — with our own LMS (learn.stemmantra.com) and coding platform (code.stemmantra.com).",
    url: "https://www.stemmantra.com/about",
    type: "website",
    images: [
      {
        url: "https://learn.stemmantra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About STEMmantra - STEM, Robotics and AI education in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About STEMmantra | STEM, Robotics & AI Lab Company in India",
    description:
      "STEM, robotics, AI & coding labs and Atal Tinkering Labs for 300+ schools, plus our LMS and coding platform.",
    images: ["https://learn.stemmantra.com/og-image.png"],
  },
  alternates: {
    canonical: "https://www.stemmantra.com/about",
  },
};

/* Structured data: About page + the two digital platforms */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.stemmantra.com/about#page",
      url: "https://www.stemmantra.com/about",
      name: "About STEMmantra",
      description:
        "STEMmantra provides STEM, robotics, AI & coding labs and Atal Tinkering Labs to 300+ K-12 schools across India.",
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      name: "STEMmantra LMS",
      url: "https://learn.stemmantra.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description:
        "Learning management system for schools with courses, secure video and PDF lessons, online assessments, progress tracking and certificates.",
      publisher: { "@type": "Organization", name: "STEMmantra Technologies Pvt. Ltd." },
    },
    {
      "@type": "SoftwareApplication",
      name: "STEMmantra Code Platform",
      url: "https://code.stemmantra.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description:
        "Online coding platform for students with visual block coding, a C++ editor, a virtual board simulator, coding courses, XP and badges.",
      publisher: { "@type": "Organization", name: "STEMmantra Technologies Pvt. Ltd." },
    },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
