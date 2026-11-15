import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoboticsLabCityDetail from "./RoboticsLabCityDetail";

import { roboticsLabCities as cityData } from "@/data/robotics-lab-cities";

export async function generateStaticParams() {
    return Object.keys(cityData).map((city) => ({
        city: city,
    }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const data = cityData[params.city.toLowerCase()];
    if (!data) return { title: "City Not Found" };

    return {
        title: { absolute: `Robotics Labs in ${data.name}, ${data.state} | STEMmantra` },
        alternates: { canonical: `https://www.stemmantra.com/robotics-labs/${params.city.toLowerCase()}` },
        description: data.description,
    };
}

export default function RoboticsLabCityPage({ params }: { params: { city: string } }) {
    const data = cityData[params.city.toLowerCase()];

    if (!data) {
        notFound();
    }

    return <RoboticsLabCityDetail data={data} />;
}
