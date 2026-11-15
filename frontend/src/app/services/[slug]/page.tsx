import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LocationServicePage from "@/components/pages/LocationServicePage";

import { locationServices } from "@/data/location-services";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return Object.keys(locationServices).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = locationServices[params.slug];

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: { absolute: `${service.title} | STEMmantra` },
    alternates: { canonical: `https://www.stemmantra.com/services/${params.slug}` },
    description: service.description,
    keywords: [
      service.serviceType.replace("-", " "),
      `${service.serviceType.replace("-", " ")} ${service.city}`,
      `STEM education ${service.city}`,
      `robotics education ${service.city}`,
      `ATL lab ${service.city}`,
      `school lab setup ${service.city}`,
    ],
    openGraph: {
      title: service.title,
      description: service.description,
      type: "website",
    },
  };
}

export default function ServiceLocationPage({ params }: Props) {
  const service = locationServices[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent">
        <LocationServicePage
          title={service.title}
          city={service.city}
          state={service.state}
          serviceType={service.serviceType}
          description={service.description}
        />
      </main>
      <Footer />
    </>
  );
}
