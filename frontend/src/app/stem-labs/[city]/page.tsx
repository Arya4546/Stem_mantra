import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StemLabCityDetail from "./StemLabCityDetail";

const cityData: Record<string, {
    name: string;
    state: string;
    description: string;
    specialties: string[];
    labs: number;
    schools: number;
}> = {
    delhi: {
        name: "Delhi",
        state: "Delhi NCR",
        description: "Delhi's educational landscape is being transformed by our STEM Innovation Labs. We provide comprehensive hands-on science and technology solutions to top schools across the capital.",
        specialties: ["Scientific Inquiry", "Engineering Design", "Technology Literacy", "Applied Mathematics", "Robotics Integration"],
        labs: 45,
        schools: 38,
    },
    mumbai: {
        name: "Mumbai",
        state: "Maharashtra",
        description: "In Mumbai, our STEM labs focus on fostering creativity and analytical thinking. We help schools build environments where students can experiment and innovate with real-world tools.",
        specialties: ["Practical Physics", "Creative Coding", "3D Modeling", "Environmental Science", "Design Thinking"],
        labs: 42,
        schools: 35,
    },
    bangalore: {
        name: "Bangalore",
        state: "Karnataka",
        description: "Bangalore's tech-forward schools partner with us to deliver world-class STEM education. Our labs feature integrated curricula that bridge the gap between theory and practice.",
        specialties: ["AI & Coding", "Advanced Robotics", "Digital Fabrication", "Scientific Research", "IoT Projects"],
        labs: 50,
        schools: 42,
    },
    hyderabad: {
        name: "Hyderabad",
        state: "Telangana",
        description: "Hyderabad's emerging educational hubs are adopting our STEM Innovation Labs to provide students with 21st-century skills. We offer end-to-end support from setup to training.",
        specialties: ["Electronics Basics", "STEM Pedagogy", "Innovation Challenges", "Hands-on Math", "Science Exploration"],
        labs: 38,
        schools: 30,
    },
    chennai: {
        name: "Chennai",
        state: "Tamil Nadu",
        description: "Chennai schools leverage our STEM labs to strengthen their core science and engineering foundations. Our curriculum is designed to complement the academic standards with practical learning.",
        specialties: ["Engineering Fundamentals", "Robotics Basics", "Mathematical Logic", "Practical Biology", "Tinkering Projects"],
        labs: 35,
        schools: 28,
    },
    pune: {
        name: "Pune",
        state: "Maharashtra",
        description: "Pune's rich academic culture is enhanced by our STEM Innovation Labs. We provide schools with the tools and training needed to nurture the next generation of innovators.",
        specialties: ["Makerspace Activities", "Circuit Design", "Scientific Method", "Applied Technology", "Collaboration Skills"],
        labs: 32,
        schools: 25,
    },
    lucknow: {
        name: "Lucknow",
        state: "Uttar Pradesh",
        description: "Lucknow is rapidly adopting STEM education through our Innovation Labs. We bring modern technology and hands-on learning to schools across the city, fostering a culture of innovation.",
        specialties: ["Foundation STEM", "Visual Programming", "Simple Machines", "Nature Study", "Problem Solving"],
        labs: 25,
        schools: 20,
    },
    noida: {
        name: "Noida",
        state: "Uttar Pradesh",
        description: "Noida's schools are at the forefront of STEM adoption with our Innovation Labs. We provide state-of-the-art equipment and specialized training to help students excel in technology.",
        specialties: ["Advanced Robotics", "AI Literacy", "Digital Design", "Experimental Science", "Creative Coding"],
        labs: 30,
        schools: 24,
    },
    gurugram: {
        name: "Gurugram",
        state: "Haryana",
        description: "Gurugram's international and premium schools trust our STEM Innovation Labs for their students. Our integrated approach ensures that students are ready for global challenges.",
        specialties: ["Design Thinking", "Entrepreneurship", "Advanced Tech", "Global Competitions", "Research Projects"],
        labs: 36,
        schools: 30,
    },
    kolkata: {
        name: "Kolkata",
        state: "West Bengal",
        description: "Kolkata's rich intellectual heritage is being complemented by our modern STEM labs. We help schools integrate hands-on learning into their traditional academic excellence.",
        specialties: ["Scientific Innovation", "Mechanical Design", "Electronics", "Applied Mathematics", "Digital Fabrication"],
        labs: 22,
        schools: 18,
    },
    ahmedabad: {
        name: "Ahmedabad",
        state: "Gujarat",
        description: "Ahmedabad's enterprising spirit is reflected in our STEM Innovation Labs. We provide tools for rapid prototyping and creative problem solving for schools across the city.",
        specialties: ["Entrepreneurship", "Design Thinking", "Product Design", "Electronics", "Coding"],
        labs: 28,
        schools: 22,
    },
    jaipur: {
        name: "Jaipur",
        state: "Rajasthan",
        description: "Jaipur is rapidly becoming a hub for STEM education. Our labs provide students with the opportunity to explore technology and engineering through hands-on projects.",
        specialties: ["Robotics Basics", "Electronics", "Science Experiments", "Coding", "Innovation Workshops"],
        labs: 20,
        schools: 15,
    },
};

export async function generateStaticParams() {
    return Object.keys(cityData).map((city) => ({
        city: city,
    }));
}

export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
    const data = cityData[params.city.toLowerCase()];
    if (!data) return { title: "City Not Found" };

    return {
        title: `STEM Innovation Labs in ${data.name}, ${data.state} | STEMmantra`,
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
