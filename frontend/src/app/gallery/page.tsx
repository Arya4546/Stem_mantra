export const metadata = {
  title: "Gallery | STEM Mantra - Robotics, AI, ATL Labs & STEM Education",
  description: "Explore our gallery of real STEM, Robotics, ATL, and Innovation activities in schools across India. See students, teachers, and schools in action with STEM Mantra.",
  keywords: "STEM gallery, robotics photos, ATL labs, STEM education, student projects, teacher training, innovation, workshops, competitions",
  openGraph: {
    title: "Gallery | STEM Mantra",
    description: "See our students, teachers, and schools in action—building, learning, and innovating with STEM Mantra.",
    type: "website",
    url: "https://www.stemmantra.com/gallery",
    images: ["https://www.stemmantra.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://www.stemmantra.com/gallery",
  },
};

import GalleryContent from "./GalleryContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function GalleryPage() {
  return (
    <>
      <Header />
      <GalleryContent />
      <Footer />
    </>
  );
}
