"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  FaEnvelope, 
  FaBriefcase, 
  FaGraduationCap, 
  FaPaperPlane,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaArrowRight
} from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  compensation: string;
  type: string;
  applyLink: string;
  about: string;
  summary?: string;
  responsibilities: string[];
  skills: string[];
  preferredSkills?: string[];
  eligibility?: string[];
  benefits: string[];
  selectionProcess: string[];
}

const jobs: Job[] = [
  {
    id: "stem-innovation-engineer",
    title: "STEM Innovation Engineer",
    department: "Research & Development",
    location: "Delhi/NCR & Nearby Area",
    compensation: "₹2.5 - ₹4.5 LPA (Based on skills & interview performance)",
    type: "Full-Time",
    applyLink: "https://forms.gle/1qjwoSjBq2iC2GzT9",
    about: "STEMmantra is universally recognized as the premier educational lab partner across India. We specialize in the holistic development and deployment of advanced Robotics, Artificial Intelligence & Coding Labs and STEM/STEAM educational laboratories within progressive K-12 academic institutions.",
    summary: "STEMMANTRA Technologies is looking for a motivated and creative Innovation Engineer who will contribute in implementation of STEM-based innovative solutions to school and do research, development and prototyping. The candidate will also work with the R&D team to bring new ideas to life and support product development for academic projects.",
    responsibilities: [
      "Working 4-5 days a week in schools for training & development of school students & teachers.",
      "Managing and executing innovation projects in schools.",
      "Support R&D in electronics, robotics, IoT and AI & ML or related domains.",
      "Prepare technical documentation, reports, and project presentations.",
      "Collaborate with cross-functional teams for product improvements.",
      "Conduct product demonstrations and provide technical support when needed.",
      "Assist in developing training materials for workshops and client programs."
    ],
    skills: [
      "Bachelor's degree in Engineering (ECE/EEE/EIE/Robotics/Mechatronics) or related fields.",
      "Hands-on experience in electronics, sensors, programming, or prototyping.",
      "Proficiency in basic tools (MS Office, Excel, PPT).",
      "Creative thinking and problem-solving approach.",
      "Good communication and documentation skills.",
      "Ability to work independently and as part of a team."
    ],
    preferredSkills: [
      "Experience in robotics, IoT, AI, 3D printing, or automation projects.",
      "Knowledge of programming languages such as C/C++, or Arduino, Python.",
      "Prior participation in innovation competitions, hackathons, or product development challenges will be preferred.",
      "Familiarity with product design tools (Tinkercad, SolidWorks, etc.)"
    ],
    benefits: [
      "Opportunity to develop expertise in Innovation Management and Project Management (Required for managerial position and future growth).",
      "Enhance your problem-solving, critical thinking, and analytical skills.",
      "Improve your communication and interpersonal skills.",
      "Gain valuable experience in the Electronics and STEM Education fields.",
      "Engage in cutting-edge research and development projects."
    ],
    selectionProcess: [
      "Initial Screening(Over call)",
      "Assignment (Optional)",
      "Technical Round(Virtual over GM)",
      "Final Management Round(F2F or NCR Candidates)."
    ]
  },
  {
    id: "business-development-manager",
    title: "Business Development Manager/Executive (BDM)",
    department: "Sales & Business Development",
    location: "Delhi NCR (Travel-Based Role)",
    compensation: "As per industry standard (based on experience and performance)",
    type: "Full-Time",
    applyLink: "https://forms.gle/sng8fdT2t3iZc7eZ9",
    about: "STEMmantra is universally recognized as the premier educational lab partner across India. We specialize in the holistic development and deployment of advanced Robotics, Artificial Intelligence & Coding Labs and STEM/STEAM educational laboratories within progressive K-12 academic institutions.",
    responsibilities: [
      "Identifying and developing new business opportunities in schools, and corporate segments (CSR).",
      "Conducting presentations and product demonstrations.",
      "Preparing and delivering impact PPT presentations.",
      "Managing lead generation, follow-ups, proposals, and closures.",
      "Working closely with operations and academic teams for execution if needed.",
      "Participating in educational expos, events, and outreach programs.",
      "Preparing weekly and monthly business performance reports.",
      "Travelling as & whenever required."
    ],
    skills: [
      "Excellent communication and interpersonal skills.",
      "Strong presentation and PPT - making skills.",
      "Good command over MS Excel.",
      "Confident public speaking ability.",
      "Ability to build and maintain client relationships.",
      "Comfortable with frequent travelling.",
      "Strong negotiation and persuasion skills.",
      "Target-driven and self-motivated."
    ],
    eligibility: [
      "Any Graduate; BBA/MBA in Marketing/Business preferred.",
      "Freshers and experienced candidates may apply."
    ],
    benefits: [
      "Salary: As per industry standard (based on experience and performance)",
      "Lucrative performance-based incentives.",
      "Travel allowances as per company policy.",
      "Rapid growth opportunities in a fast-expanding Ed-Tech company."
    ],
    selectionProcess: [
      "Initial Screening(Over call)",
      "Presentation Round(Virtual over GM)",
      "Final Management Round(F2F or NCR Candidates)."
    ]
  }
];

export default function CareerPage() {
  const [selectedJobId, setSelectedJobId] = useState<string>("stem-innovation-engineer");

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                Careers at STEMmantra
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                Join Our Mission to <br className="hidden md:block" /> Transform Education
              </h1>
              <p className="text-lg md:text-xl text-orange-50 mb-0 leading-relaxed font-medium">
                Help us empower the next generation of innovators by bringing advanced STEM, Robotics, and AI learning to schools across India.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="relative container mx-auto px-4 py-20 overflow-hidden">
          <FloatingAnimations variant="section" density="low" />
          <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
            {[
              { icon: FaBriefcase, title: "Innovative Work", desc: "Work with cutting-edge technology including AI, IoT, and Robotics to build comprehensive educational solutions." },
              { icon: FaGraduationCap, title: "Impactful Reach", desc: "Your work directly impacts millions of students, shaping their careers, skills, and computational thinking." },
              { icon: FaPaperPlane, title: "Growth & Learning", desc: "We foster an environment of continuous learning where your ideas are valued and your professional growth is supported." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current Openings & Apply Section */}
        <div className="relative container mx-auto px-4 pb-20">
          {/* Current Openings */}
          <div className="max-w-6xl mx-auto mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">Current Openings</h2>
              <p className="text-gray-600">Join our growing team and make a difference in STEM education.</p>
            </div>

            {/* Desktop & Tablet Split Layout (lg and up) */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Pane: Job Selector Cards */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
                {jobs.map((job) => {
                  const isSelected = selectedJobId === job.id;
                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                        isSelected
                          ? "bg-white border-orange-500 shadow-md ring-1 ring-orange-500"
                          : "bg-white border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-500" />
                      )}
                      
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <span className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          {job.department}
                        </span>
                        
                        {/* Compact Apply button on the card */}
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // Prevent selecting the card
                          className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors shadow-sm flex-shrink-0"
                        >
                          Apply
                        </a>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-3 pr-4 leading-snug">
                        {job.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-orange-500" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaClock className="text-blue-500" /> {job.type}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Pane: Selected Job Details */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 min-h-[500px]">
                <AnimatePresence mode="wait">
                  {(() => {
                    const activeJob = jobs.find((j) => j.id === selectedJobId);
                    if (!activeJob) return null;
                    return (
                      <motion.div
                        key={activeJob.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-8"
                      >
                        {/* Header card area with Apply button at top */}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-gray-100">
                          <div className="space-y-3">
                            <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                              {activeJob.department}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                              {activeJob.title}
                            </h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <FaMapMarkerAlt className="text-orange-500" /> {activeJob.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <FaClock className="text-blue-500" /> {activeJob.type}
                              </span>
                            </div>
                          </div>
                          
                          {/* Apply Now button at the top of details */}
                          <div className="flex-shrink-0">
                            <a
                              href={activeJob.applyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg"
                            >
                              Apply Now
                              <FaArrowRight />
                            </a>
                          </div>
                        </div>

                        {/* About STEMmantra */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                            About STEMmantra Technologies Pvt Ltd
                          </h4>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            {activeJob.about}
                          </p>
                        </div>

                        {/* Job Summary */}
                        {activeJob.summary && (
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                              Job Summary
                            </h4>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                              {activeJob.summary}
                            </p>
                          </div>
                        )}

                        {/* Job Responsibilities */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                            Job Responsibilities
                          </h4>
                          <ul className="space-y-3">
                            {activeJob.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                <FaCheck className="text-teal-500 mt-1 flex-shrink-0" />
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Required Skills */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                            {activeJob.id === "stem-innovation-engineer" ? "Required Skills & Qualifications" : "Required Skills"}
                          </h4>
                          <ul className="space-y-3">
                            {activeJob.skills.map((skill, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                <FaCheck className="text-orange-500 mt-1 flex-shrink-0" />
                                <span className="leading-relaxed">{skill}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Preferred Skills */}
                        {activeJob.preferredSkills && (
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                              Preferred Skills
                            </h4>
                            <ul className="space-y-3">
                              {activeJob.preferredSkills.map((ps, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                  <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                                  <span className="leading-relaxed">{ps}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Eligibility */}
                        {activeJob.eligibility && (
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                              Eligibility
                            </h4>
                            <ul className="space-y-3">
                              {activeJob.eligibility.map((el, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                  <FaCheck className="text-purple-500 mt-1 flex-shrink-0" />
                                  <span className="leading-relaxed">{el}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Benefits & Advantages */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                            {activeJob.id === "stem-innovation-engineer" ? "Benefits & Advantages" : "Benefits & Advantages"}
                          </h4>
                          <ul className="space-y-3">
                            {activeJob.benefits.map((b, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                <FaCheck className="text-emerald-500 mt-1 flex-shrink-0" />
                                <span className="leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Selection Process */}
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
                            Selection Process
                          </h4>
                          <div className="relative pl-6 space-y-4 border-l border-orange-100 ml-3">
                            {activeJob.selectionProcess.map((step, i) => (
                              <div key={i} className="relative">
                                <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-orange-500 border border-white ring-4 ring-orange-50 flex items-center justify-center text-[10px] font-bold text-white">
                                  {i + 1}
                                </div>
                                <h5 className="text-sm font-bold text-gray-800 leading-tight pl-2">
                                  {step}
                                </h5>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Layout (below lg breakpoint) */}
            <div className="lg:hidden space-y-6">
              {jobs.map((job) => {
                const isExpanded = selectedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Accordion Trigger */}
                    <button
                      onClick={() => setSelectedJobId(selectedJobId === job.id ? "" : job.id)}
                      className="w-full text-left p-6 flex flex-col gap-4 focus:outline-none"
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          {job.department}
                        </span>
                        
                        {/* Compact Apply button always visible on mobile card at top */}
                        <a
                          href={job.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                        >
                          Apply
                        </a>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-orange-500" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaClock className="text-blue-500" /> {job.type}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-orange-500 font-bold">
                        <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-50 bg-gray-50/50"
                        >
                          <div className="p-6 space-y-6">
                            {/* About STEMmantra */}
                            <div>
                              <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                About STEMmantra Technologies Pvt Ltd
                              </h4>
                              <p className="text-gray-600 leading-relaxed text-sm">
                                {job.about}
                              </p>
                            </div>

                            {/* Job Summary */}
                            {job.summary && (
                              <div>
                                <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                  Job Summary
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                  {job.summary}
                                </p>
                              </div>
                            )}

                            {/* Job Responsibilities */}
                            <div>
                              <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                Job Responsibilities
                              </h4>
                              <ul className="space-y-2.5">
                                {job.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <FaCheck className="text-teal-500 mt-1 flex-shrink-0 text-xs" />
                                    <span className="leading-relaxed">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Required Skills */}
                            <div>
                              <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                {job.id === "stem-innovation-engineer" ? "Required Skills & Qualifications" : "Required Skills"}
                              </h4>
                              <ul className="space-y-2.5">
                                {job.skills.map((skill, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <FaCheck className="text-orange-500 mt-1 flex-shrink-0 text-xs" />
                                    <span className="leading-relaxed">{skill}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Preferred Skills */}
                            {job.preferredSkills && (
                              <div>
                                <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                  Preferred Skills
                                </h4>
                                <ul className="space-y-2.5">
                                  {job.preferredSkills.map((ps, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                      <FaCheck className="text-blue-500 mt-1 flex-shrink-0 text-xs" />
                                      <span className="leading-relaxed">{ps}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Eligibility */}
                            {job.eligibility && (
                              <div>
                                <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                  Eligibility
                                </h4>
                                <ul className="space-y-2.5">
                                  {job.eligibility.map((el, i) => (
                                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                      <FaCheck className="text-purple-500 mt-1 flex-shrink-0 text-xs" />
                                      <span className="leading-relaxed">{el}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Benefits & Advantages */}
                            <div>
                              <h4 className="text-base font-bold text-gray-900 mb-2 border-l-4 border-orange-500 pl-3">
                                {job.id === "stem-innovation-engineer" ? "Benefits & Advantages" : "Benefits & Advantages"}
                              </h4>
                              <ul className="space-y-2.5">
                                {job.benefits.map((b, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                    <FaCheck className="text-emerald-500 mt-1 flex-shrink-0 text-xs" />
                                    <span className="leading-relaxed">{b}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Selection Process */}
                            <div>
                              <h4 className="text-base font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
                                Selection Process
                              </h4>
                              <div className="relative pl-5 space-y-3.5 border-l border-orange-100 ml-2">
                                {job.selectionProcess.map((step, i) => (
                                  <div key={i} className="relative">
                                    <div className="absolute -left-[27px] top-0.5 w-3.5 h-3.5 rounded-full bg-orange-500 border border-white ring-4 ring-orange-50 flex items-center justify-center text-[8px] font-bold text-white">
                                      {i + 1}
                                    </div>
                                    <h5 className="text-xs font-bold text-gray-800 leading-tight pl-2">
                                      {step}
                                    </h5>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Apply Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-gradient-to-br from-teal-500 to-teal-600 p-10 text-white flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                  <FaEnvelope className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-teal-50 leading-relaxed">
                  Start your newest and most exciting journey with the STEMmantra family today.
                </p>
              </div>
              <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Current Openings</h4>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                  We are continually seeking passionate educators, curriculum developers, robotics trainers, and tech enthusiasts. Even if you don&apos;t see a specific role, we would love to hear from you.
                </p>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-xl hover:bg-orange-100 transition-colors">
                  <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-2">Drop your resume at</p>
                  <a
                    href="mailto:hr@stemmantra.com"
                    className="text-2xl md:text-3xl font-black text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-3"
                  >
                    hr@stemmantra.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
