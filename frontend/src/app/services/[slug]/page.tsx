import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingDemoButton from "@/components/ui/FloatingDemoButton";
import LocationServicePage from "@/components/pages/LocationServicePage";

// Define all location services
const locationServices: Record<string, {
  title: string;
  city: string;
  state: string;
  serviceType: "stem-lab" | "robotics-lab" | "atl-lab";
  description: string;
}> = {
  // STEM Labs
  "stem-lab-delhi": {
    title: "STEM Lab Setup in Delhi",
    city: "Delhi",
    state: "Delhi",
    serviceType: "stem-lab",
    description: "Premier STEM lab setup services in Delhi. Transform your school with cutting-edge technology education, 3D printing, electronics, and coding labs.",
  },
  "stem-lab-mumbai": {
    title: "STEM Lab Setup in Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    serviceType: "stem-lab",
    description: "Best STEM lab solutions in Mumbai. Complete lab setup with curriculum, training, and ongoing support for schools.",
  },
  "stem-lab-bangalore": {
    title: "STEM Lab Setup in Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    serviceType: "stem-lab",
    description: "Leading STEM education provider in Bangalore. NEP 2020 aligned curriculum with hands-on learning experiences.",
  },
  "stem-lab-hyderabad": {
    title: "STEM Lab Setup in Hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    serviceType: "stem-lab",
    description: "Comprehensive STEM lab solutions in Hyderabad. From equipment to teacher training, we cover everything.",
  },
  "stem-lab-chennai": {
    title: "STEM Lab Setup in Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    serviceType: "stem-lab",
    description: "Expert STEM lab setup in Chennai. Project-based learning with state-of-the-art equipment and curriculum.",
  },
  "stem-lab-kolkata": {
    title: "STEM Lab Setup in Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    serviceType: "stem-lab",
    description: "Quality STEM education solutions in Kolkata. Build future-ready innovators with our comprehensive programs.",
  },
  // Robotics Labs
  "robotics-lab-noida": {
    title: "Robotics Lab Setup in Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    serviceType: "robotics-lab",
    description: "Advanced robotics lab setup in Noida. AI, ML, and robotics education for students of all ages.",
  },
  "robotics-lab-gurgaon": {
    title: "Robotics Lab Setup in Gurgaon",
    city: "Gurgaon",
    state: "Haryana",
    serviceType: "robotics-lab",
    description: "Premium robotics lab solutions in Gurgaon. Competition prep, certifications, and hands-on training.",
  },
  "robotics-lab-pune": {
    title: "Robotics Lab Setup in Pune",
    city: "Pune",
    state: "Maharashtra",
    serviceType: "robotics-lab",
    description: "Expert robotics education in Pune. Complete lab setup with advanced robotics kits and curriculum.",
  },
  "robotics-lab-ahmedabad": {
    title: "Robotics Lab Setup in Ahmedabad",
    city: "Ahmedabad",
    state: "Gujarat",
    serviceType: "robotics-lab",
    description: "Leading robotics lab provider in Ahmedabad. From basic robotics to advanced AI education.",
  },
  "robotics-lab-jaipur": {
    title: "Robotics Lab Setup in Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    serviceType: "robotics-lab",
    description: "Best robotics education in Jaipur. Transform your school with our comprehensive robotics programs.",
  },
  "robotics-lab-lucknow": {
    title: "Robotics Lab Setup in Lucknow",
    city: "Lucknow",
    state: "Uttar Pradesh",
    serviceType: "robotics-lab",
    description: "Quality robotics lab setup in Lucknow. Age-appropriate curriculum from grades 1-12.",
  },
  // ATL Labs
  "atl-lab-delhi-ncr": {
    title: "ATL Lab Setup in Delhi NCR",
    city: "Delhi NCR",
    state: "Delhi",
    serviceType: "atl-lab",
    description: "Complete Atal Tinkering Lab setup in Delhi NCR. End-to-end support for ATL establishment and operations.",
  },
  "atl-lab-uttar-pradesh": {
    title: "ATL Lab Setup in Uttar Pradesh",
    city: "Uttar Pradesh",
    state: "Uttar Pradesh",
    serviceType: "atl-lab",
    description: "Trusted ATL lab provider in Uttar Pradesh. Government approved equipment and curriculum.",
  },
  "atl-lab-maharashtra": {
    title: "ATL Lab Setup in Maharashtra",
    city: "Maharashtra",
    state: "Maharashtra",
    serviceType: "atl-lab",
    description: "Expert ATL lab solutions across Maharashtra. IoT, robotics, and 3D printing equipment included.",
  },
  "atl-lab-karnataka": {
    title: "ATL Lab Setup in Karnataka",
    city: "Karnataka",
    state: "Karnataka",
    serviceType: "atl-lab",
    description: "Leading ATL lab setup in Karnataka. Complete tinkering lab with mentorship support.",
  },
  "atl-lab-tamil-nadu": {
    title: "ATL Lab Setup in Tamil Nadu",
    city: "Tamil Nadu",
    state: "Tamil Nadu",
    serviceType: "atl-lab",
    description: "Quality ATL lab setup in Tamil Nadu. Aligned with Niti Aayog guidelines and NEP 2020.",
  },
  "atl-lab-gujarat": {
    title: "ATL Lab Setup in Gujarat",
    city: "Gujarat",
    state: "Gujarat",
    serviceType: "atl-lab",
    description: "Comprehensive ATL lab solutions in Gujarat. From lab setup to teacher training and competitions.",
  },
  // SEO Service Pages  
  "atl-lab-setup": {
    title: "Atal Tinkering Lab Setup Service",
    city: "India",
    state: "All States",
    serviceType: "atl-lab",
    description: "Complete turnkey ATL lab setup services. End-to-end support from design to installation as per NITI Aayog guidelines.",
  },
  "robotics-lab-setup": {
    title: "Robotics Lab Setup Service",
    city: "India",
    state: "All States",
    serviceType: "robotics-lab",
    description: "State-of-the-art robotics lab setup with competition-grade equipment, curriculum, and teacher training.",
  },
  "curriculum": {
    title: "STEM Curriculum Development",
    city: "India",
    state: "All States",
    serviceType: "stem-lab",
    description: "NEP 2020 aligned STEM curriculum design with grade-wise content, assessments, and teacher guides.",
  },
  "teacher-training": {
    title: "Teacher Training & Certification",
    city: "India",
    state: "All States",
    serviceType: "stem-lab",
    description: "Comprehensive STEM teacher training program with hands-on workshops and certification.",
  },
  "workshops": {
    title: "Student STEM Workshops",
    city: "India",
    state: "All States",
    serviceType: "stem-lab",
    description: "Interactive STEM workshops for students covering robotics, coding, AI, and more.",
  },
  "competitions": {
    title: "Competition Preparation Service",
    city: "India",
    state: "All States",
    serviceType: "robotics-lab",
    description: "Expert coaching to prepare students for national and international robotics and STEM competitions.",
  },
};

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
    title: `${service.title} | STEM Mantra`,
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
      <main className="min-h-screen">
        <LocationServicePage
          title={service.title}
          city={service.city}
          state={service.state}
          serviceType={service.serviceType}
          description={service.description}
        />
      </main>
      <Footer />
      <FloatingDemoButton />
    </>
  );
}
