import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STEM Labs & Innovation Programs for Schools | STEMmantra",
  description:
    "Explore STEMmantra's STEM, STEAM, robotics, AI, coding, tinkering and skill labs for schools, with hands-on curriculum, teacher enablement and future-ready learning programs.",
  keywords: [
    "STEM lab for schools",
    "STEAM lab",
    "robotics lab",
    "AI coding lab",
    "Atal Tinkering Lab",
    "ATL setup",
    "pre-tinkering lab",
    "composite skill lab",
    "innovation lab for schools",
    "hands-on learning",
    "project-based learning",
    "STEM education India",
    "school innovation lab",
    "NEP 2020 STEM",
  ],
  openGraph: {
    title: "STEM Labs & Innovation Programs for Schools | STEMmantra",
    description:
      "Complete learning ecosystems for schools — STEM, STEAM, robotics, AI, coding and skill labs with hands-on curriculum, educator training and ongoing support.",
    url: "https://www.stemmantra.com/programs",
    type: "website",
    images: [
      {
        url: "https://www.stemmantra.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "STEMmantra Learning Ecosystems for Schools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STEM Labs & Innovation Programs for Schools | STEMmantra",
    description:
      "Future-ready learning ecosystems for schools — STEM, STEAM, robotics, AI, coding and skill labs.",
  },
  alternates: {
    canonical: "https://www.stemmantra.com/programs",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
