"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
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
  department?: string;
  location: string;
  compensation: string;
  type: string;
  applyLink: string;
  summary?: string;
  responsibilities: string[];
  skills: string[];
  preferredSkills?: string[];
  eligibility?: string[];
  benefits: string[];
  selectionProcess: string[];
}

// Single application form shared by all openings (position is selected inside the form)
const APPLICATION_FORM_URL = "https://forms.gle/42nAP2bzzsokAfEd8";

const jobs: Job[] = [
  {
    id: "stem-innovation-engineer",
    title: "STEM Innovation Engineer",
    location: "Delhi/NCR & Nearby Area",
    compensation: "₹2.5 - ₹4.5 LPA (Based on skills & interview performance)",
    type: "Full-Time",
    applyLink: APPLICATION_FORM_URL,
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
    applyLink: APPLICATION_FORM_URL,
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
      <main className="min-h-screen bg-transparent pt-24">
        {/* Hero Section */}
        <div className="pt-12 pb-4 md:pt-16 md:pb-6">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-5">
                Careers at STEMmantra
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-5 leading-tight">
                Join Our Mission to <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
                  Transform Education
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-0 leading-relaxed">
                Help us empower the next generation of innovators by bringing advanced STEM, Robotics, and AI learning to schools across India.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Why Join Us */}
        <div className="relative container mx-auto px-4 pt-10 pb-20 overflow-hidden">
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

            {/* Stacked accordion layout (all breakpoints) */}
            <div className="max-w-4xl mx-auto space-y-6">
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
                        {job.department && (
                          <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                            {job.department}
                          </span>
                        )}
                        
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
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm shadow-inner">
                  <FaGraduationCap className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black mb-4">Ready to Apply?</h3>
                <p className="text-teal-50 leading-relaxed font-medium">
                  Start your exciting journey with the STEMmantra family today.
                </p>
              </div>
              <div className="md:w-3/5 p-10 md:p-12 flex flex-col justify-center">
                <h4 className="text-2xl font-black text-slate-800 mb-4">Submit Your Application</h4>
                <p className="text-slate-600 mb-8 leading-relaxed text-base">
                  We are continually seeking passionate educators, curriculum developers, robotics trainers, and tech enthusiasts. Use our single application form for every opening and select the position you are applying for (STEM Innovation Engineer or Business Development Manager).
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href={APPLICATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-orange-600 text-white font-black px-8 py-4 rounded-xl hover:bg-orange-700 hover:scale-105 transition-all shadow-xl shadow-orange-500/20 text-lg"
                  >
                    Apply Now <FaArrowRight className="w-4 h-4" />
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
