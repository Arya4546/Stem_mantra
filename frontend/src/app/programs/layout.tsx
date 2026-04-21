import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs | STEMmantra - Robotics, STEM, AI & ATL Lab Solutions",
  description:
    "Explore STEMmantra's NEP 2020 & NCF 2023 aligned programs: Pre Tinkering Labs, STEAMVERSE Robotics Labs, AI & Coding Labs, INNOVERSE Labs, and Atal Tinkering Labs for grades 3-12.",
  keywords:
    "STEM programs, robotics lab programs, ATL lab, AI coding lab, STEAMVERSE, INNOVERSE, pre tinkering lab, school STEM programs India, NEP 2020",
  openGraph: {
    title: "Our Programs | STEMmantra",
    description:
      "Comprehensive STEM, Robotics, AI & ATL Lab programs for schools across India. Grades 3-12.",
    url: "https://www.stemmantra.com/programs",
    type: "website",
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
