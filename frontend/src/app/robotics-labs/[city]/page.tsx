import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoboticsLabCityDetail from "./RoboticsLabCityDetail";

// City-specific data for Robotics Labs
const cityData: Record<string, {
    name: string;
    state: string;
    description: string;
    specialties: string[];
    labs: number;
    competitions: number;
}> = {
    delhi: {
        name: "Delhi",
        state: "Delhi NCR",
        description: "Delhi leads in robotics education with our state-of-the-art labs featuring Arduino, Raspberry Pi, and advanced drone programming. Our robotics labs in Delhi prepare students for national and international competitions.",
        specialties: ["Industrial Robotics", "Drone Programming", "Arduino Projects", "AI Robotics", "IoT Integration"],
        labs: 65,
        competitions: 25,
    },
    mumbai: {
        name: "Mumbai",
        state: "Maharashtra",
        description: "Mumbai's robotics labs are equipped with cutting-edge technology for building autonomous robots, line followers, and maze solvers. We prepare students for competitions like WRO and FIRST Robotics.",
        specialties: ["Autonomous Robots", "Competition Robotics", "Humanoid Robots", "Marine Robotics", "Swarm Robotics"],
        labs: 58,
        competitions: 20,
    },
    bangalore: {
        name: "Bangalore",
        state: "Karnataka",
        description: "As India's tech capital, Bangalore demands excellence in robotics education. Our labs feature advanced AI-integrated robots, machine learning modules, and industry-grade equipment.",
        specialties: ["AI Robotics", "Machine Learning", "Computer Vision", "ROS Programming", "Industrial Automation"],
        labs: 52,
        competitions: 22,
    },
    hyderabad: {
        name: "Hyderabad",
        state: "Telangana",
        description: "Hyderabad's booming tech sector influences our robotics curriculum. Labs are equipped with advanced sensors, actuators, and programming environments for building smart robots.",
        specialties: ["Sensor Integration", "Smart Robotics", "Agricultural Robots", "Medical Robotics", "Space Robotics"],
        labs: 45,
        competitions: 18,
    },
    chennai: {
        name: "Chennai",
        state: "Tamil Nadu",
        description: "Chennai's strong engineering foundation makes it perfect for advanced robotics education. Our labs include industrial arms, CNC machines, and advanced control systems.",
        specialties: ["Industrial Arms", "CNC Machining", "PLC Programming", "Embedded Systems", "Control Systems"],
        labs: 40,
        competitions: 15,
    },
    pune: {
        name: "Pune",
        state: "Maharashtra",
        description: "Pune's automotive industry inspires our robotics labs. Students learn automotive robotics, assembly line automation, and advanced manufacturing technologies.",
        specialties: ["Automotive Robotics", "Assembly Automation", "3D Printing", "CAD/CAM", "Quality Control"],
        labs: 38,
        competitions: 14,
    },
    lucknow: {
        name: "Lucknow",
        state: "Uttar Pradesh",
        description: "Lucknow is emerging as a robotics education hub. Our labs provide comprehensive training in robotics fundamentals, programming, and hands-on project development.",
        specialties: ["Basic Robotics", "Arduino Programming", "Robot Design", "Sensor Networks", "Mechanical Design"],
        labs: 28,
        competitions: 10,
    },
    noida: {
        name: "Noida",
        state: "Uttar Pradesh",
        description: "Noida's proximity to Delhi and booming tech industry makes it ideal for advanced robotics education. Our labs feature cutting-edge equipment for building autonomous systems and AI-integrated robots.",
        specialties: ["Autonomous Systems", "AI Integration", "IoT Robotics", "Competition Prep", "Advanced Programming"],
        labs: 35,
        competitions: 12,
    },
    gurugram: {
        name: "Gurugram",
        state: "Haryana",
        description: "Gurugram's corporate ecosystem demands world-class robotics education. Our labs are designed to meet international standards with advanced robotics platforms and industry-grade equipment.",
        specialties: ["Enterprise Robotics", "Drone Technology", "AI & ML", "ROS Development", "Industrial IoT"],
        labs: 42,
        competitions: 18,
    },
    kolkata: {
        name: "Kolkata",
        state: "West Bengal",
        description: "Kolkata's robotics labs combine tradition with innovation. We provide students with the tools to build advanced robots, focusing on both mechanical engineering and intelligent programming.",
        specialties: ["Mechanical Engineering", "Arduino", "AI Robotics", "Competition Prep", "Robot Design"],
        labs: 25,
        competitions: 8,
    },
    ahmedabad: {
        name: "Ahmedabad",
        state: "Gujarat",
        description: "Ahmedabad's robotics labs are centers for technical excellence. Students learn to build complex autonomous systems, preparing them for industrial robotics and automation challenges.",
        specialties: ["Autonomous Systems", "Industrial Robotics", "IoT Integration", "Coding", "Drone Tech"],
        labs: 32,
        competitions: 15,
    },
    jaipur: {
        name: "Jaipur",
        state: "Rajasthan",
        description: "Jaipur is emerging as a strong competitor in robotics education. Our labs provide state-of-the-art equipment for students to explore the world of robotics and automation.",
        specialties: ["Robotics Fundamentals", "Sensor Networks", "Microcontrollers", "AI Basics", "Competition Prep"],
        labs: 22,
        competitions: 10,
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
        title: `Robotics Labs in ${data.name}, ${data.state} | STEMmantra`,
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
