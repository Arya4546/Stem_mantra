import type { Metadata } from "next";
import GalleryContent from "./GalleryContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { absoluteUrl, SITE_URL, siteApi } from "@/lib/site-api";
import { jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Gallery | STEMmantra - Robotics, AI, ATL Labs & STEM Education" },
  description: "Explore our gallery of real STEM, Robotics, ATL, and Innovation activities in schools across India. See students, teachers, and schools in action with STEMmantra.",
  keywords: "STEM gallery, robotics photos, ATL labs, STEM education, student projects, teacher training, innovation, workshops, competitions",
  openGraph: {
    title: "Gallery | STEMmantra",
    description: "See our students, teachers, and schools in action—building, learning, and innovating with STEMmantra.",
    type: "website",
    url: "https://www.stemmantra.com/gallery",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "https://www.stemmantra.com/gallery",
  },
};

// Photos and gallery types are managed in the admin panel.
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const sections = (await siteApi.gallery()).filter((s) => s.images.length > 0);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "STEMmantra Gallery",
    url: `${SITE_URL}/gallery`,
    description: "Photos of STEMmantra sessions, labs, exhibitions and media coverage from schools across India.",
    image: sections
      .flatMap((s) =>
        s.images.slice(0, 15).map((img) => ({
          "@type": "ImageObject",
          contentUrl: absoluteUrl(img.media.url),
          name: img.title || img.altText,
          caption: img.caption || img.altText,
          ...(img.media.width && img.media.height ? { width: img.media.width, height: img.media.height } : {}),
        })),
      )
      .slice(0, 60),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <GalleryContent sections={sections} />
      <Footer />
    </>
  );
}
