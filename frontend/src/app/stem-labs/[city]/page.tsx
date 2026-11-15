import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StemLabCityDetail from "./StemLabCityDetail";

import { stemLabCities as cityData } from "@/data/stem-lab-cities";

export async function generateStaticParams() {
    return Object.keys(cityData).map((city) => ({
        city: city,
    }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const data = cityData[params.city.toLowerCase()];
    if (!data) return { title: "City Not Found" };

    return {
        title: { absolute: `STEM Innovation Labs in ${data.name}, ${data.state} | STEMmantra` },
        alternates: { canonical: `https://www.stemmantra.com/stem-labs/${params.city.toLowerCase()}` },
        description: data.description,
    };
}

export default function StemLabCityPage({ params }: { params: { city: string } }) {
    const data = cityData[params.city.toLowerCase()];

    if (!data) {
        notFound();
    }

    return <StemLabCityDetail data={data} />;
}
