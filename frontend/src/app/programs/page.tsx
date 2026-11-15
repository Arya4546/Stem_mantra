import Header from "@/components/layout/Header";
import { orEmpty, siteApi } from "@/lib/site-api";
import Footer from "@/components/layout/Footer";
import ProgramsHero from "@/components/sections/programs/ProgramsHero";
import ProgramsCredibilityStrip from "@/components/sections/programs/ProgramsCredibilityStrip";
import ProgramsEcosystemIntro from "@/components/sections/programs/ProgramsEcosystemIntro";
import ProgramsLabGrid from "@/components/sections/programs/ProgramsLabGrid";
import ProgramsIncludesSection from "@/components/sections/programs/ProgramsIncludesSection";
import ProgramsLabSelector from "@/components/sections/programs/ProgramsLabSelector";
import ProgramsGallerySection from "@/components/sections/programs/ProgramsGallerySection";
import ProgramsTrustSection from "@/components/sections/programs/ProgramsTrustSection";
import ProgramsFAQ from "@/components/sections/programs/ProgramsFAQ";
import ProgramsFinalCTA from "@/components/sections/programs/ProgramsFinalCTA";

// Client logos and testimonials are managed in the admin panel.
export const dynamic = "force-dynamic";

export default async function ProgramsPage() {
  const [clients, testimonials] = await Promise.all([
    orEmpty(siteApi.clients(), [], "clients"),
    orEmpty(siteApi.testimonials(), [], "testimonials"),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent">
        {/* 1. Hero */}
        <ProgramsHero />

        {/* 2. Credibility strip */}
        <ProgramsCredibilityStrip />

        {/* 3. Learning ecosystem intro */}
        <ProgramsEcosystemIntro />

        {/* 4. Lab card grid */}
        <ProgramsLabGrid />

        {/* 6. What every lab includes */}
        <ProgramsIncludesSection />

        {/* 7. Lab selector */}
        <ProgramsLabSelector />

        {/* 8. Real students gallery */}
        <ProgramsGallerySection />

        {/* 8b. Trust & Testimonials */}
        <ProgramsTrustSection clients={clients.filter((c) => c.isFeatured)} testimonials={testimonials} />

        {/* 9. FAQ */}
        <ProgramsFAQ />

        {/* 10. Final CTA */}
        <ProgramsFinalCTA />
      </main>
      <Footer />
    </>
  );
}
