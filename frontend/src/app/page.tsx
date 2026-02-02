import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingDemoButton from "@/components/ui/FloatingDemoButton";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import LabSolutionsSection from "@/components/sections/LabSolutionsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import GalleryPreview from "@/components/sections/GalleryPreview";
import PartnersSection from "@/components/sections/PartnersSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "STEMmantra - Master The Skills, Drive Your Future | Robotics & AI Education",
  description:
    "India's leading provider of robotics, AI, and STEM education solutions for schools. ATL Labs setup, teacher training, NEP 2020 aligned curriculum. Transform your school with cutting-edge technology education.",
  keywords: [
    "STEM education",
    "robotics education India",
    "ATL labs setup",
    "AI education for schools",
    "robotics lab",
    "STEM labs",
    "Atal Tinkering Labs",
    "coding for kids",
    "NEP 2020 curriculum",
    "school robotics program",
  ],
  openGraph: {
    title: "STEMmantra - Master The Skills, Drive Your Future",
    description:
      "India's leading provider of robotics, AI, and STEM education solutions for schools.",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STEMmantra - Master The Skills, Drive Your Future",
    description:
      "India's leading provider of robotics, AI, and STEM education solutions for schools.",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden">
        {/* Hero Section with Video Background */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Lab Solutions Section */}
        <LabSolutionsSection />

        {/* Why Choose Us - SEO Rich Content */}
        <WhyChooseUsSection />

        {/* Programs Section */}
        <ProgramsSection />

        {/* Stats Counter Section */}
        <StatsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* FAQ Section - SEO Rich Content */}
        <FAQSection />

        {/* Gallery Preview */}
        <GalleryPreview />

        {/* Partners/Clients Section */}
        <PartnersSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
      <FloatingDemoButton />
    </>
  );
}
