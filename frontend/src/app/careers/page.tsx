import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Briefcase, Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Careers | STEMmantra",
  description:
    "Join STEMmantra and help build the future of STEM, Robotics, AI and Coding education.",
};

const openings = [
  {
    title: "STEM Trainer",
    type: "Full-Time",
    location: "Noida / On-site",
  },
  {
    title: "Robotics Lab Instructor",
    type: "Full-Time",
    location: "Multiple Cities",
  },
  {
    title: "Curriculum Developer",
    type: "Full-Time",
    location: "Noida / Hybrid",
  },
];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-10">
          <div className="site-container">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              <Briefcase className="w-4 h-4" />
              We Are Hiring
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 leading-tight">
              Build The Future With{" "}
              <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                STEMmantra
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed">
              We are always looking for passionate educators, innovators, and creators who want to transform how students learn robotics, STEM, AI and coding.
            </p>
          </div>
        </section>

        <section className="pb-12">
          <div className="site-container grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Current Opportunities</h2>
              <div className="space-y-4">
                {openings.map((job) => (
                  <article
                    key={job.title}
                    className="rounded-2xl border border-gray-200 p-5 md:p-6 bg-white"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{job.type}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl border border-orange-200 bg-orange-50/60 p-6 md:p-7 h-fit">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Apply Now</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                Send your resume and a short introduction to our HR team.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:hr@stemmantra.com?subject=Application%20for%20Career%20Opportunity"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hr@stemmantra.com
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-300 text-gray-900 font-semibold hover:border-orange-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {SITE_CONFIG.contact.mobile}
                </a>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black transition-colors"
                >
                  Contact Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
