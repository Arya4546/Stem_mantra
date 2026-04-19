"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const offeredLabs = [
	{
		title: "PRE TINKERING LAB",
		description: "Focuses on leveraging technology in education from grade 3 to 5th.",
		highlights: [
			"It includes building blocks, puzzles, arts, simple machines, basic electronic concepts and nature exploration tools.",
			"Our curriculum is full of \"learning with fun\" activities."
		],
		bg: "bg-orange-50/50",
		border: "border-orange-500",
		textColor: "text-orange-600",
		href: "/programs/pre-tinkering-lab"
	},
	{
		title: "STEAMVERSE LAB",
		description: "Exciting STEM, Robotics, IoT activities for grades 3-12, fostering hands-on learning.",
		highlights: [
			"It also includes 3-D Printing, Drones, etc.",
			"Curriculum around 5+ micro-Controllers, 40+ sensors, 10+ DIY Kits."
		],
		bg: "bg-teal-50/50",
		border: "border-teal-500",
		textColor: "text-teal-600",
		href: "/programs/steamverse-lab"
	},
	{
		title: "AI (Artificial Intelligence) & Coding Lab",
		description: "Concept of Python, Machine learning, Artificial Intelligence & computer vision for grade 5-12th.",
		highlights: [
			"Over & above of schools academic curriculum.",
			"State of the art software for implementation of AI & Coding."
		],
		bg: "bg-blue-50/50",
		border: "border-blue-500",
		textColor: "text-blue-600",
		href: "/programs/ai-coding-lab"
	},
	{
		title: "INNOVERSE LAB",
		description: "Hands-on activities for grade 3-12th.",
		highlights: [
			"One stop solution for the school's all technological needs.",
			"Progressive curriculum and individualized learning cater to diverse skill levels, encouraging exploration and growth."
		],
		bg: "bg-purple-50/50",
		border: "border-purple-500",
		textColor: "text-purple-600",
		href: "/programs/innoverse-lab"
	},
	{
		title: "ATL Lab (ATAL TINKERING LAB)",
		description: "Complete end to end solution for ATL lab from providing equipment to training, to competition.",
		highlights: [
			"Ownership for all the compliance which is compulsory by AIM."
		],
		bg: "bg-indigo-50/50",
		border: "border-indigo-500",
		textColor: "text-indigo-600",
		href: "/programs/atl-lab"
	}
];

export default function ProgramsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<section
			ref={ref}
			className="relative pt-12 lg:pt-16 pb-12 bg-white overflow-hidden border-t border-gray-100"
		>
			<FloatingAnimations variant="services" density="low" />

			<div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="text-center mb-16 flex flex-col items-center w-full"
				>
					<span className="inline-block px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm mx-auto">
						Curriculum Offerings
					</span>
					<h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight text-center">
						Comprehensive <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">K-12 Educational Programs</span>
					</h2>
					<div className="w-full lg:px-8">
						<p className="text-xl md:text-2xl text-gray-600 leading-relaxed text-center font-medium">
							At STEMmantra, we deploy meticulously structured learning pathways that evolve with the student.
							Our programs range from primary level kinetic learning to advanced senior secondary courses in Robotics, STEM/STEAM, artificial Intelligence & Machine learning.
						</p>
					</div>
				</motion.div>

				{/* Educational Structure Full-Width Narrative */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-16 w-full"
				>
					<div className="flex justify-center w-full mb-8">
						<h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 flex items-center gap-4 text-center">
							<FaGraduationCap className="text-orange-500 w-12 h-12 lg:w-16 lg:h-16" />
							Educational Structure
						</h3>
					</div>
					
					<div className="prose prose-xl prose-gray md:prose-2xl text-gray-600 max-w-none text-left md:text-justify leading-relaxed font-medium mb-12">
						<p className="mb-8">
							Our curriculum implementation framework guarantees that every syllabus we offer conforms rigorously to current
							<strong> Central Board of Secondary Education (CBSE)</strong>, <strong>ICSE</strong>, and international academic standards &amp; State Boards.
							We believe that STEM education is not an extracurricular activity, but a fundamental academic necessity.
						</p>
						<p>
							When your institution partners with us for an <strong>Robotics, STEM/STEM Labs or AI &amp; Coding lab setups</strong> or an integrated <strong>Robotics Masterclass</strong>,
							you receive a turnkey pedagogical solution encompassing year-long lesson plans, proprietary workbook materials,
							and continuous educator evaluation metrics.
						</p>
					</div>

					<div className="flex justify-center md:justify-start mb-16">
						<Link
							href="/programs"
							className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
						>
							View Detailed Course Catalogs
							<FaArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</motion.div>

				{/* Highly descriptive list - using EXACT existing UI styling in a balanced grid */}
				<div className="grid md:grid-cols-2 gap-10 border-t border-gray-100 pt-16">
					{offeredLabs.map((lab, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.2 + (index % 2) * 0.1 }}
							className="h-full group hover:-translate-y-1 transition-transform"
						>
							<Link href={lab.href} className={`p-8 ${lab.bg} border-l-8 border-transparent group-hover:${lab.border} rounded-r-2xl flex flex-col h-full bg-opacity-80 hover:bg-opacity-100 transition-all ${lab.border.replace('border-', 'border-l-')}`}>
								<div className="flex justify-between items-start mb-3">
									<h4 className={`text-2xl md:text-3xl font-black ${lab.textColor} tracking-tight`}>{lab.title}</h4>
									<FaArrowRight className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${lab.textColor} -rotate-45 mt-1`} />
								</div>
								<p className="text-gray-700 mb-4 leading-relaxed font-medium flex-grow">
									{lab.description}
								</p>
								<ul className="space-y-2 mt-auto pt-4 border-t border-gray-200/50">
									{lab.highlights.map((highlight, idx) => (
										<li key={idx} className="flex items-start gap-2">
											<FaCheckCircle className="text-green-500 w-4 h-4 mt-1 flex-shrink-0" />
											<span className="text-gray-700">{highlight}</span>
										</li>
									))}
								</ul>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
