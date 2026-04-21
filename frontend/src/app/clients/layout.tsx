import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Clients | STEMmantra - 300+ Partner Schools Across India",
  description:
    "See the 300+ prestigious schools and educational institutions that trust STEMmantra for their STEM, Robotics, and AI lab solutions. Trusted by top institutions across 16+ states in India.",
  keywords:
    "STEMmantra clients, partner schools, STEM lab schools India, robotics education partners, school testimonials, ATL lab schools",
  openGraph: {
    title: "Our Clients | STEMmantra",
    description:
      "Trusted by 300+ schools across India for world-class STEM, Robotics, and AI lab solutions.",
    url: "https://www.stemmantra.com/clients",
    type: "website",
  },
  alternates: {
    canonical: "https://www.stemmantra.com/clients",
  },
};

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
