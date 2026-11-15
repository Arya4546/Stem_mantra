"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, HelpCircle, PenTool, Wrench, Beaker, TrendingUp, Presentation, CheckCircle2 } from "lucide-react";

const processSteps = [
  {
    id: "explore",
    num: "01",
    name: "Explore",
    icon: Search,
    color: "text-orange-500",
    bg: "bg-orange-50",
    activeBg: "bg-orange-600",
    heading: "Curiosity-Driven Exploration.",
    description: "We don't just give answers; we encourage students to discover the 'why' and 'how'. Students dive into real-world phenomena, fostering natural curiosity before touching the tools.",
    checkmarks: ["Phenomenon-based learning", "Interactive digital simulations", "Real-world context bridging", "Identify the core problem"],
    bento1: { overline: "STAGE 1", title: "Ignite Curiosity.", points: ["Introduce the topic", "Ask open-ended questions", "Initial Brainstorming", "Define the objective"] },
    bento2: { overline: "OUTCOME", title: "A structured problem statement." }
  },
  {
    id: "question",
    num: "02",
    name: "Question",
    icon: HelpCircle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    activeBg: "bg-amber-600",
    heading: "Formulating the Right Questions.",
    description: "Moving from observation to inquiry. Students learn to frame testable hypotheses and identify core challenges to solve within their STEM lab environment.",
    checkmarks: ["Hypothesis generation", "Critical analysis parameters", "Problem framing", "Socratic questioning"],
    bento1: { overline: "STAGE 2", title: "Guide Inquiry.", points: ["Peer group discussions", "Parameter definition", "Resource identification", "Expected student outcome"] },
    bento2: { overline: "OUTCOME", title: "Clear project trajectory." }
  },
  {
    id: "design",
    num: "03",
    name: "Design",
    icon: PenTool,
    color: "text-teal-500",
    bg: "bg-teal-50",
    activeBg: "bg-teal-600",
    heading: "Engineering Solutions.",
    description: "Applying creativity and technical knowledge to draft solutions. From sketching to CAD modeling, students carefully plan their architecture before they build.",
    checkmarks: ["Design thinking methodology", "Technical sketching", "Resource planning", "Feasibility analysis"],
    bento1: { overline: "STAGE 3", title: "The Blueprint.", points: ["Idea selection", "Component mapping", "Circuit drafting", "Code structure planning"] },
    bento2: { overline: "OUTCOME", title: "A ready-to-build schematic." }
  },
  {
    id: "build",
    num: "04",
    name: "Build",
    icon: Wrench,
    color: "text-blue-500",
    bg: "bg-blue-50",
    activeBg: "bg-blue-600",
    heading: "Hands-On Construction.",
    description: "Turning ideas into reality. Students work with physical components, robotics kits, sensors, and microcontrollers to physically construct their prototypes.",
    checkmarks: ["Circuit assembly", "Robotics construction", "Safe tool usage", "Software integration"],
    bento1: { overline: "STAGE 4", title: "Making it Real.", points: ["Hardware assembly", "Coding integration", "Sensor calibration", "Mechanical troubleshooting"] },
    bento2: { overline: "OUTCOME", title: "A functional working prototype." }
  },
  {
    id: "test",
    num: "05",
    name: "Test",
    icon: Beaker,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    activeBg: "bg-indigo-600",
    heading: "Rigorous Evaluation.",
    description: "Does it work in the real world? Students put their prototypes to the test, gathering data, logging errors, and observing outcomes under controlled conditions.",
    checkmarks: ["Data collection", "Performance metrics", "Error logging", "Variable isolation"],
    bento1: { overline: "STAGE 5", title: "Validation Phase.", points: ["Controlled testing run", "Identify bugs", "Log system responses", "Peer review sessions"] },
    bento2: { overline: "OUTCOME", title: "Actionable performance data." }
  },
  {
    id: "improve",
    num: "06",
    name: "Improve",
    icon: TrendingUp,
    color: "text-violet-500",
    bg: "bg-violet-50",
    activeBg: "bg-violet-600",
    heading: "Iterative Refinement.",
    description: "Learning from failure is the core of engineering. Based on test data, students iterate on their designs, optimizing code and refining physical structures.",
    checkmarks: ["Root cause analysis", "Code debugging", "Structural optimization", "Efficiency improvements"],
    bento1: { overline: "STAGE 6", title: "The Optimization Loop.", points: ["Analyze fail points", "Implement targeted fixes", "Re-test parameters", "Finalize version"] },
    bento2: { overline: "OUTCOME", title: "A polished, reliable solution." }
  },
  {
    id: "present",
    num: "07",
    name: "Present",
    icon: Presentation,
    color: "text-pink-500",
    bg: "bg-pink-50",
    activeBg: "bg-pink-600",
    heading: "Communicating Innovation.",
    description: "The final step is sharing. Students learn to articulate their process, the challenges they faced, and the real-world value of their engineered solution.",
    checkmarks: ["Technical communication", "Presentation skills", "Defending design choices", "Public speaking"],
    bento1: { overline: "STAGE 7", title: "Showcasing Success.", points: ["Project documentation", "Live demonstrations", "Q&A handling", "Peer feedback"] },
    bento2: { overline: "OUTCOME", title: "Confidence and articulation." }
  }
];

export default function ProgramsEcosystemIntro() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-20 px-4 bg-transparent relative z-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center border border-gray-200 rounded-full px-4 py-1.5 mb-6 bg-white shadow-sm">
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">The STEMmantra Implementation Ecosystem</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] tracking-tight">
            From lab setup to classroom delivery— <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500">
              We run complete STEM implementation
            </span>
          </h2>
        </div>

        {/* Interactive Tabs */}
        <div className="bg-white rounded-full p-2 border border-gray-100 shadow-xl shadow-gray-200/50 mb-8 overflow-x-auto no-scrollbar flex items-center justify-between min-w-max md:min-w-0">
          {processSteps.map((step, i) => {
            const isActive = activeStep === i;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(i)}
                className={`relative flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-full ${step.activeBg}`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-start text-left">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                    {step.num}
                  </span>
                  <div className="flex items-center gap-2">
                    <step.icon className={`w-4 h-4 ${isActive ? 'text-white' : step.color}`} />
                    <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                      {step.name}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Card Panel */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-[1.2fr_1fr] h-full"
            >
              {/* Left Panel */}
              <div className="p-8 lg:p-14 lg:pr-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${processSteps[activeStep].bg} flex items-center justify-center`}>
                    {(() => { const Icon = processSteps[activeStep].icon; return <Icon className={`w-7 h-7 ${processSteps[activeStep].color}`} />; })()}
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                      STEP {processSteps[activeStep].num}
                    </span>
                    <span className={`text-sm font-bold uppercase tracking-wider ${processSteps[activeStep].color}`}>
                      {processSteps[activeStep].name}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-black text-slate-800 mb-6 leading-tight">
                  {processSteps[activeStep].heading}
                </h3>
                
                <p className="text-slate-600 text-lg mb-10 leading-relaxed font-medium">
                  {processSteps[activeStep].description}
                </p>

                <div className="space-y-4">
                  {processSteps[activeStep].checkmarks.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                      <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" />
                      </div>
                      <span className="text-slate-700 font-medium text-sm">{check}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel (Bento Boxes) */}
              <div className="bg-slate-50 p-8 lg:p-14 flex flex-col gap-6">
                
                {/* Top Bento Box */}
                <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-xl">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    {processSteps[activeStep].bento1.overline}
                  </span>
                  <h4 className="text-2xl font-bold mb-8">
                    {processSteps[activeStep].bento1.title}
                  </h4>
                  
                  <div className="space-y-3">
                    {processSteps[activeStep].bento1.points.map((point, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-slate-700/50 rounded-xl px-5 py-3.5 border border-slate-600/50">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-200">{point}</span>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-[10px] font-bold text-orange-400">
                          {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bento Box */}
                <div className="bg-orange-50 border border-orange-100 rounded-3xl p-8 flex items-center gap-6 shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
                    {(() => { const Icon = processSteps[activeStep].icon; return <Icon className="w-6 h-6 text-white" />; })()}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 block mb-1">
                      {processSteps[activeStep].bento2.overline}
                    </span>
                    <h5 className="text-lg font-bold text-slate-800">
                      {processSteps[activeStep].bento2.title}
                    </h5>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
