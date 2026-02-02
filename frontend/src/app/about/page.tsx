import { Metadata } from "next";
import AboutContent from "./AboutContent";

/* ===================== SEO METADATA ===================== */
export const metadata: Metadata = {
  title: "About Us | STEMmantra - Robotics, AI, ATL Labs & STEM Education",
  description:
    "Learn about STEMmantra's mission, vision, and impact. India’s leading provider of robotics, AI, and STEM education solutions for schools. ATL Labs setup, teacher training, NEP 2020 aligned curriculum.",
  keywords:
    "about STEMmantra, robotics education, STEM learning, ATL labs, AI education, teacher training, NEP 2020, school innovation, STEM curriculum, India",
  openGraph: {
    title: "About Us | STEMmantra",
    description:
      "Discover STEMmantra’s journey, values, and achievements in transforming STEM education across India.",
    url: "https://www.stemmantra.com/about",
    type: "website",
    images: ["https://www.stemmantra.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.stemmantra.com/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
