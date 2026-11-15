import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programs, getProgramBySlug, getProgramStaticParams } from "@/data/programs";
import ProgramDetailPage from "./ProgramDetail";

// ===================================================
// Static params — builds all 7 lab pages at build time
// ===================================================
export async function generateStaticParams() {
  // Also include legacy slugs for backward compatibility
  const programSlugs = getProgramStaticParams();
  const legacySlugs = [
    { slug: "atl-lab" },
    { slug: "class-1-3" },
    { slug: "class-4-5" },
    { slug: "class-6-8" },
    { slug: "class-9-10" },
    { slug: "class-11-12" },
    { slug: "teacher-training" },
    { slug: "atl-labs" },
    { slug: "robotics-labs" },
    { slug: "stem-lab" },
    { slug: "stem-labs" },
    { slug: "coding" },
    { slug: "summer-camps" },
  ];
  return [...programSlugs, ...legacySlugs];
}

// ===================================================
// Dynamic metadata per lab
// ===================================================
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    // Legacy slug fallback title
    return {
      title: "Program | STEMmantra",
      description: "Explore STEMmantra's learning programs for schools.",
    };
  }

  return {
    title: program.seoTitle,
    description: program.metaDescription,
    openGraph: {
      title: program.seoTitle,
      description: program.metaDescription,
      url: `https://www.stemmantra.com/programs/${program.slug}`,
      type: "website",
      images: [
        {
          url: `https://www.stemmantra.com${program.image}`,
          width: 1200,
          height: 675,
          alt: program.imageAlt,
        },
      ],
    },
    alternates: {
      canonical: `https://www.stemmantra.com/programs/${program.slug}`,
    },
  };
}

// ===================================================
// Page
// ===================================================
export default function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = getProgramBySlug(params.slug);

  if (!program) {
    // Unknown slug → 404
    notFound();
  }

  return <ProgramDetailPage program={program} />;
}
