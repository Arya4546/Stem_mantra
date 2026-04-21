import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | STEMmantra - Get In Touch for STEM Lab Setup",
  description:
    "Contact STEMmantra for Robotics Lab setup, ATL Lab implementation, teacher training, and STEM education solutions. Schedule a free consultation for your school. Based in Noida, serving schools across India.",
  keywords:
    "contact STEMmantra, STEM lab enquiry, robotics lab setup, ATL lab consultation, school partnership, STEM education India",
  openGraph: {
    title: "Contact Us | STEMmantra",
    description:
      "Get in touch with STEMmantra for world-class STEM, Robotics, and AI lab setup for your school.",
    url: "https://www.stemmantra.com/contact",
    type: "website",
  },
  alternates: {
    canonical: "https://www.stemmantra.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
