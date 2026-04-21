import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | STEMmantra - Join India's Leading STEM Education Company",
  description:
    "Join STEMmantra's team of educators, curriculum developers, robotics trainers, and tech enthusiasts. Help us transform STEM education for schools across India.",
  keywords:
    "STEMmantra careers, STEM education jobs, robotics trainer jobs, curriculum developer, education technology careers India",
  openGraph: {
    title: "Careers | STEMmantra",
    description:
      "Join our mission to transform education. We're hiring passionate educators, robotics trainers, and tech innovators.",
    url: "https://www.stemmantra.com/career",
    type: "website",
  },
  alternates: {
    canonical: "https://www.stemmantra.com/career",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
