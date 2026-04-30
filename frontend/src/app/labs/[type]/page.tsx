import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
    FaRobot, FaFlask, FaLaptopCode, FaCube, FaMicrochip, FaTools, FaLightbulb
} from "react-icons/fa";
import LabTypeDetail from "./LabTypeDetail";

const labTypes: Record<string, {
    name: string; fullName: string; icon: string;
    description: string; longDescription: string; equipment: string[];
    subjects: string[]; ageGroup: string; benefits: string[]; investment: string;
    accent: string; accentBg: string; accentText: string;
}> = {
    atl: {
        name: "ATL", fullName: "Atal Tinkering Labs", icon: "lightbulb",
        accent: "border-l-orange-500", accentBg: "bg-orange-50", accentText: "text-orange-600",
        description: "Government of India initiative to foster innovation and entrepreneurship among students",
        longDescription: "Atal Tinkering Labs (ATL) are workspaces where students can explore science, technology, engineering, and mathematics (STEM) concepts. Part of the Atal Innovation Mission by NITI Aayog, these labs provide students access to cutting-edge equipment like 3D printers, robotics kits, electronics, and IoT devices to foster creativity and innovation.",
        equipment: ["3D Printers", "Robotics Kits", "Electronics Components", "IoT Sensors", "Microcontrollers", "Hand Tools", "Workbenches", "Computers"],
        subjects: ["Design Thinking", "Prototyping", "Electronics", "Coding", "Innovation", "Entrepreneurship"],
        ageGroup: "Class 6 to Class 12", benefits: ["Government supported initiative", "Access to latest technology", "Innovation competitions", "Mentorship programs", "Startup ecosystem exposure", "National recognition"],
        investment: "₹2-15 Lakhs",
    },
    "robotics-ai": {
        name: "Robotics & AI", fullName: "Robotics & Artificial Intelligence Labs", icon: "robot",
        accent: "border-l-purple-500", accentBg: "bg-purple-50", accentText: "text-purple-600",
        description: "Advanced labs for building intelligent robots and AI-powered systems",
        longDescription: "Our Robotics & AI Labs combine the best of mechanical engineering, electronics, and artificial intelligence. Students learn to build autonomous robots that can see, think, and act. From basic line followers to advanced humanoid robots with computer vision, these labs prepare students for the future of automation.",
        equipment: ["Robot Kits (Basic to Advanced)", "AI Computing Modules", "Camera Systems", "Servo Motors", "Sensors Array", "Neural Network Processors", "Simulation Software"],
        subjects: ["Robotics", "Machine Learning", "Computer Vision", "Natural Language Processing", "Neural Networks", "Automation"],
        ageGroup: "Class 5 to Class 12", benefits: ["Industry-relevant skills", "Competition preparation", "Career readiness", "Research opportunities", "Global recognition", "Innovation mindset"],
        investment: "₹15-30 Lakhs",
    },
    "stem-innovation": {
        name: "STEM Innovation", fullName: "STEM Innovation Labs", icon: "flask",
        accent: "border-l-teal-500", accentBg: "bg-teal-50", accentText: "text-teal-600",
        description: "Comprehensive labs covering Science, Technology, Engineering, and Mathematics",
        longDescription: "STEM Innovation Labs provide a holistic learning environment where students explore the interconnection between Science, Technology, Engineering, and Mathematics. These labs feature hands-on experiments, project-based learning, and real-world problem solving that prepare students for 21st-century challenges.",
        equipment: ["Science Experiment Kits", "Technology Tools", "Engineering Models", "Math Manipulatives", "Robotics Components", "Coding Stations", "Virtual Labs"],
        subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Engineering Design", "Technology Literacy"],
        ageGroup: "Class 1 to Class 12", benefits: ["NEP 2020 & NCF 2023 aligned", "Integrated learning", "Critical thinking", "Problem solving", "Scientific temper", "Holistic development"],
        investment: "₹8-15 Lakhs",
    },
    coding: {
        name: "Coding", fullName: "Coding & Programming Labs", icon: "laptop",
        accent: "border-l-blue-500", accentBg: "bg-blue-50", accentText: "text-blue-600",
        description: "State-of-the-art computer labs for learning programming and software development",
        longDescription: "Our Coding Labs are designed to transform students into proficient programmers. From block-based coding for beginners to advanced Python, Java, and web development for seniors, these labs provide a structured pathway to software development mastery with industry-standard tools and environments.",
        equipment: ["High-Performance Computers", "Multiple Monitors", "Version Control Systems", "Cloud Computing Access", "Development IDEs", "Testing Frameworks", "Collaboration Tools"],
        subjects: ["Scratch", "Python", "Java", "Web Development", "App Development", "Game Development", "Data Science"],
        ageGroup: "Class 1 to Class 12", benefits: ["Industry-ready skills", "Logical thinking", "Problem decomposition", "Career opportunities", "Global language", "Creative expression"],
        investment: "₹5-12 Lakhs",
    },
    "3d-printing": {
        name: "3D Printing", fullName: "3D Printing & Additive Manufacturing Labs", icon: "cube",
        accent: "border-l-pink-500", accentBg: "bg-pink-50", accentText: "text-pink-600",
        description: "Modern fabrication labs with industrial 3D printers and CAD software",
        longDescription: "3D Printing Labs bring manufacturing into the classroom. Students learn Computer-Aided Design (CAD), understand material science, and create physical prototypes of their ideas. From jewelry design to mechanical parts, these labs enable students to transform digital designs into tangible objects.",
        equipment: ["FDM 3D Printers", "Resin Printers", "CAD Workstations", "Slicing Software", "Finishing Tools", "Material Storage", "Post-Processing Equipment"],
        subjects: ["CAD Design", "3D Modeling", "Material Science", "Product Design", "Rapid Prototyping", "Manufacturing"],
        ageGroup: "Class 5 to Class 12", benefits: ["Design thinking", "Spatial visualization", "Prototyping skills", "Manufacturing awareness", "Entrepreneurship", "Innovation"],
        investment: "₹8-20 Lakhs",
    },
    "iot-electronics": {
        name: "IoT & Electronics", fullName: "IoT & Electronics Labs", icon: "microchip",
        accent: "border-l-green-500", accentBg: "bg-green-50", accentText: "text-green-600",
        description: "Labs focused on Internet of Things, embedded systems, and electronic circuit design",
        longDescription: "IoT & Electronics Labs introduce students to the connected world of smart devices. From building simple circuits to creating complex IoT solutions that monitor and control the physical world, students learn electronics fundamentals, sensor integration, and cloud connectivity.",
        equipment: ["Arduino Boards", "Raspberry Pi", "IoT Sensors", "Actuators", "Breadboards", "Oscilloscopes", "Soldering Stations", "Cloud Platforms"],
        subjects: ["Electronics", "Circuit Design", "Embedded Systems", "IoT Protocols", "Cloud Computing", "Smart Systems"],
        ageGroup: "Class 6 to Class 12", benefits: ["Practical electronics", "System thinking", "Industry 4.0 ready", "Innovation skills", "Problem solving", "Future technologies"],
        investment: "₹6-15 Lakhs",
    },
    "maker-space": {
        name: "Maker Space", fullName: "Maker Space Labs", icon: "tools",
        accent: "border-l-yellow-500", accentBg: "bg-yellow-50", accentText: "text-yellow-600",
        description: "Creative workshops for hands-on making, crafting, and prototype development",
        longDescription: "Maker Spaces are creative workshops where imagination meets reality. These labs combine traditional craftsmanship with modern technology, allowing students to work with wood, metal, textiles, electronics, and digital fabrication tools to create anything they can imagine.",
        equipment: ["Hand Tools", "Power Tools", "Laser Cutters", "CNC Machines", "Sewing Machines", "Craft Supplies", "Electronics Workbench", "Safety Equipment"],
        subjects: ["Woodworking", "Metalworking", "Textile Design", "Electronics", "Digital Fabrication", "Product Design"],
        ageGroup: "Class 3 to Class 12", benefits: ["Hands-on learning", "Creativity boost", "Self-expression", "Practical skills", "Confidence building", "Entrepreneurship"],
        investment: "₹10-25 Lakhs",
    },
};

export async function generateStaticParams() {
    return Object.keys(labTypes).map((type) => ({
        type: type,
    }));
}

export async function generateMetadata({ params }: { params: { type: string } }): Promise<Metadata> {
    const data = labTypes[params.type.toLowerCase()];
    if (!data) return { title: "Lab Not Found" };

    return {
        title: `${data.fullName} | STEMmantra`,
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
