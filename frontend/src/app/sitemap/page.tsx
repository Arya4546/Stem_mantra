import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { FaHome, FaInfoCircle, FaFlask, FaImages, FaEnvelope, FaBriefcase, FaShieldAlt, FaFileContract, FaUndo, FaRobot, FaBrain, FaHandshake } from "react-icons/fa";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Sitemap | STEMmantra - STEM, Robotics & AI Education",
  description:
    "Navigate STEMmantra's complete website structure. Find all pages including programs, lab solutions, gallery, contact, and legal pages for STEM education services.",
  robots: { index: true, follow: true },
};

const siteLinks = [
  {
    category: "Main Pages",
    links: [
      { name: "Home", href: "/", icon: FaHome, desc: "Landing page with an overview of STEMmantra's STEM education solutions" },
      { name: "About Us", href: "/about", icon: FaInfoCircle, desc: "Learn about STEMmantra's mission, vision, core values, and leadership" },
      { name: "Our Programs", href: "/programs", icon: FaFlask, desc: "Explore Robotics, STEM/STEAM, AI & Coding, and ATL lab programs" },
      { name: "Gallery", href: "/gallery", icon: FaImages, desc: "View sessions in action, exhibitions, and media coverage" },
      { name: "Our Clients", href: "/clients", icon: FaHandshake, desc: "See the schools and educational institutions we partner with across India" },
      { name: "Contact Us", href: "/contact", icon: FaEnvelope, desc: "Get in touch for lab setup inquiries, demo requests, and partnerships" },
      { name: "Careers", href: "/career", icon: FaBriefcase, desc: "Join STEMmantra's team of educators and innovators" },
    ],
  },
  {
    category: "Programs",
    links: [
      { name: "Robotics & AI Lab", href: "/programs/robotics-lab", icon: FaRobot, desc: "STEAMVERSE Labs with Arduino, Raspberry Pi, and advanced robotics platforms" },
      { name: "STEM Innovation Lab", href: "/programs/stem-lab", icon: FaBrain, desc: "INNOVERSE Labs combining IoT, 3D printing, electronics, and cross-disciplinary STEM" },
      { name: "ATL Labs", href: "/programs/atl-labs", icon: FaFlask, desc: "Atal Tinkering Lab setup as per NITI Aayog guidelines with full mentorship" },
    ],
  },
  {
    category: "Resources",
    links: [
      { name: "Learn Portal", href: "https://learn.stemmantra.com/", icon: BookOpen, desc: "Access STEMmantra's online learning platform for students and educators" },
    ],
  },
  {
    category: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy", icon: FaShieldAlt, desc: "How we collect, use, and protect your personal information" },
      { name: "Terms of Service", href: "/terms-of-service", icon: FaFileContract, desc: "Terms governing the use of our website and services" },
      { name: "Refund Policy", href: "/refund-policy", icon: FaUndo, desc: "Refund and cancellation terms for products and services" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-4">
          <div className="mx-auto px-4 md:px-8 lg:px-16">
            <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Navigation
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Site{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                Map
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Find everything on STEMmantra&apos;s website — all pages organized for easy navigation.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {siteLinks.map((group) => (
                <div key={group.category}>
                  <h2 className="text-xl font-bold text-gray-900 mb-5 pb-3 border-b-2 border-orange-200">
                    {group.category}
                  </h2>
                  <div className="space-y-3">
                    {group.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-orange-50 hover:border-orange-200 transition-all group"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200 group-hover:border-orange-300 transition-colors">
                          <link.icon className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{link.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{link.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
