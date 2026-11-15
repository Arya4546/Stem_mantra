"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const offeredLabs = [
	{
		title: "STEAM & Robotics Lab",
		description: "Exciting STEM, Robotics, IoT activities for grades 3-12, fostering hands-on learning.",
		highlights: [
			"It also includes 3-D Printing, Drones, etc.",
			"Curriculum around 5+ micro-Controllers, 40+ sensors, 10+ DIY Kits."
		],
		bg: "bg-teal-50/50",
		border: "border-teal-500",
		accent: "bg-teal-500",
		glow: "bg-teal-300/40",
		textColor: "text-teal-600",
		href: "/programs/steamverse-lab"
	},
	{
		title: "Composite Skill Lab",
		description: "A multidisciplinary practical learning environment for grades 6-12.",
		highlights: [
			"Combines technology, engineering, design, making and hands-on skill development."
		],
		bg: "bg-amber-50/50",
		border: "border-amber-500",
		accent: "bg-amber-500",
		glow: "bg-amber-300/40",
		textColor: "text-amber-600",
		href: "/programs/composite-skill-lab"
	},
	{
		title: "AI & Coding Lab",
		description: "Concept of Python, Machine learning, Artificial Intelligence & computer vision for grade 5-12th.",
		highlights: [
			"Over & above of schools academic curriculum.",
			"State of the art software for implementation of AI & Coding."
		],
		bg: "bg-blue-50/50",
		border: "border-blue-500",
		accent: "bg-blue-500",
		glow: "bg-blue-300/40",
		textColor: "text-blue-600",
		href: "/programs/ai-coding-lab"
	},
	{
		title: "Pre-Tinkering Lab",
		description: "Focuses on leveraging technology in education from grade 3 to 5th.",
		highlights: [
			"It includes building blocks, puzzles, arts, simple machines, basic electronic concepts and nature exploration tools.",
			"Our curriculum is full of \"learning with fun\" activities."
		],
		bg: "bg-orange-50/50",
		border: "border-orange-500",
		accent: "bg-orange-500",
		glow: "bg-orange-300/40",
		textColor: "text-orange-600",
		href: "/programs/pre-tinkering-lab"
	},
	{
		title: "Innoverse Lab",
		description: "Hands-on activities for grade 3-12th.",
		highlights: [
			"One stop solution for the school's all technological needs.",
			"Progressive curriculum and individualized learning cater to diverse skill levels, encouraging exploration and growth."
		],
		bg: "bg-purple-50/50",
		border: "border-purple-500",
		accent: "bg-purple-500",
		glow: "bg-purple-300/40",
		textColor: "text-purple-600",
		href: "/programs/innoverse-lab"
	},
	{
		title: "Atal Tinkering Lab",
		description: "Complete end to end solution for ATL lab from providing equipment to training, to competition.",
		highlights: [
			"Ownership for all the compliance which is compulsory by AIM."
		],
		bg: "bg-indigo-50/50",
		border: "border-indigo-500",
		accent: "bg-indigo-500",
		glow: "bg-indigo-300/40",
		textColor: "text-indigo-600",
		href: "/programs/atal-tinkering-lab"
	}
];

export default function ProgramsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<>
		<section
			ref={ref}
			className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden"
		>
			<FloatingAnimations variant="services" density="low" />

			<div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="text-center mb-12 fit-mb flex flex-col items-center w-full"
				>
					<span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold uppercase tracking-wider mb-5 border border-blue-100 shadow-sm mx-auto">
						Curriculum Offerings
					</span>
					<h2 className="fit-h2 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tight text-center">
						Comprehensive <span className="text-orange-500">K-12 Educational Programs</span>
					</h2>
					<p className="fit-lead max-w-4xl text-lg text-gray-600 leading-relaxed text-center">
						At STEMmantra, we deploy meticulously structured learning pathways that evolve with the student.
						Our programs range from primary level kinetic learning to advanced senior secondary courses in Robotics, STEM/STEAM, artificial Intelligence & Machine learning.
					</p>
				</motion.div>

				{/* Educational Structure — title card left, narrative right */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="grid lg:grid-cols-12 fit-gap gap-8 lg:gap-12 items-stretch"
				>
					<div className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 p-8 md:p-10 fit-pad text-white shadow-xl flex flex-col justify-between gap-8 fit-gap">
						<div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-orange-500/30 blur-3xl" />
						<div className="absolute -bottom-16 -left-10 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl" />
						<div className="relative">
							<div className="fit-icon w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-6 fit-mb">
								<FaGraduationCap className="text-orange-400 w-7 h-7" />
							</div>
							<h3 className="fit-h2 text-3xl md:text-4xl font-black leading-tight tracking-tight">
								Educational <span className="text-orange-400">Structure</span>
							</h3>
						</div>
						<Link
							href="/programs"
							className="relative inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-900/30 hover:bg-orange-500 hover:-translate-y-0.5 transition-all"
						>
							View Detailed Course Catalogs
							<FaArrowRight className="w-4 h-4" />
						</Link>
					</div>

					<div className="lg:col-span-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm p-8 md:p-10 fit-pad fit-stack space-y-5 text-gray-600 text-base md:text-lg fit-lead leading-relaxed flex flex-col justify-center">
						<p>
							Our curriculum implementation framework guarantees that every syllabus we offer conforms rigorously to current
							<strong className="text-gray-900"> Central Board of Secondary Education (CBSE)</strong>, <strong className="text-gray-900">ICSE</strong>, and international academic standards &amp; State Boards.
							We believe that STEM education is not an extracurricular activity, but a fundamental academic necessity.
						</p>
						<p>
							When your institution partners with us for an <strong className="text-gray-900">Robotics, STEM/STEM Labs or AI &amp; Coding lab setups</strong> or an integrated <strong className="text-gray-900">Robotics Masterclass</strong>,
							you receive a turnkey pedagogical solution encompassing year-long lesson plans, proprietary workbook materials,
							and continuous educator evaluation metrics.
						</p>
					</div>
				</motion.div>

			</div>
		</section>

		{/* Frame 2: the six labs */}
		<section className="fit relative py-10 lg:py-12 bg-transparent overflow-hidden">
			<div className="max-w-[1680px] mx-auto px-4 md:px-8 lg:px-16 relative z-10">
				{/* Highly descriptive list - using EXACT existing UI styling in a balanced grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 fit-gap gap-6 lg:gap-8">
					{offeredLabs.map((lab, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.2 + (index % 2) * 0.1 }}
							className="h-full group hover:-translate-y-1 transition-transform"
						>
							<Link href={lab.href} className="relative overflow-hidden p-7 lg:p-8 fit-pad bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-2xl group-hover:border-transparent transition-all duration-300 flex flex-col h-full">
								<span className={`absolute left-0 top-0 right-0 h-1 ${lab.accent}`} aria-hidden />
								<span className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl ${lab.glow} opacity-60 group-hover:opacity-100 transition-opacity`} aria-hidden />
								<span className={`absolute top-4 right-20 text-5xl font-black ${lab.textColor} opacity-10 select-none`} aria-hidden>{String(index + 1).padStart(2, "0")}</span>
								<div className="relative flex justify-between items-start gap-4 mb-3">
									<h4 className={`fit-title text-xl md:text-2xl font-black ${lab.textColor} tracking-tight`}>{lab.title}</h4>
									<span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${lab.accent} text-white group-hover:scale-110 group-hover:rotate-0 -rotate-45 transition-all duration-300`}>
										<FaArrowRight className="w-3.5 h-3.5" />
									</span>
								</div>
								<p className="fit-lead relative text-gray-600 mb-3 fit-mb leading-relaxed flex-grow">
									{lab.description}
								</p>
								<ul className="relative space-y-2 fit-stack mt-auto pt-3 fit-py border-t border-gray-200/60">
									{lab.highlights.map((highlight, idx) => (
										<li key={idx} className="flex items-start gap-2">
											<FaCheckCircle className="text-green-500 w-4 h-4 mt-1 flex-shrink-0" />
											<span className="text-gray-600 text-sm fit-lead leading-relaxed">{highlight}</span>
										</li>
									))}
								</ul>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
		</>
	);
}
