import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    FaRobot, FaFlask, FaLaptopCode, FaCube, FaMicrochip, FaTools, FaLightbulb
} from "react-icons/fa";
import LabTypeDetail from "./LabTypeDetail";

import { labTypes } from "@/data/lab-types";

export async function generateStaticParams() {
    return Object.keys(labTypes).map((type) => ({
        type: type,
    }));
}

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
    const data = labTypes[params.type.toLowerCase()];
    if (!data) return { title: "Lab Not Found" };

    return {
        title: { absolute: `${data.fullName} | STEMmantra` },
        alternates: { canonical: `https://www.stemmantra.com/labs/${params.type.toLowerCase()}` },
        description: data.description,
    };
}

export default function LabPage({ params }: { params: { type: string } }) {
    const data = labTypes[params.type.toLowerCase()];

    if (!data) {
        notFound();
    }

    return <LabTypeDetail data={data} />;
}
