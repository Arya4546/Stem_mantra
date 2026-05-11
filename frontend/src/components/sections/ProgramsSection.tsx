"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaGraduationCap, FaChevronDown } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

const offeredLabs = [
	{
		title: "PRE TINKERING LAB",
		description: "Focuses on leveraging technology in education from grade 3 to 5th.",
		highlights: [
			"It includes building blocks, puzzles, arts, simple machines, basic electronic concepts and nature exploration tools.",
			"Our curriculum is full of \"learning with fun\" activities."
		],
		href: "/programs/pre-tinkering-lab"
	},
	{
		title: "STEAMVERSE LAB",
		description: "Exciting STEM, Robotics, IoT activities for grades 3-12, fostering hands-on learning.",
		highlights: [
			"It also includes 3-D Printing, Drones, etc.",
			"Curriculum around 5+ micro-Controllers, 40+ sensors, 10+ DIY Kits."
		],
		href: "/programs/steamverse-lab"
	},
	{
		title: "AI (Artificial Intelligence) & Coding Lab",
		description: "Concept of Python, Machine learning, Artificial Intelligence & computer vision for grade 5-12th.",
		highlights: [
			"Over & above of schools academic curriculum.",
			"State of the art software for implementation of AI & Coding."
		],
		href: "/programs/ai-coding-lab"
	},
	{
		title: "INNOVERSE LAB",
		description: "Hands-on activities for grade 3-12th.",
		highlights: [
			"One stop solution for the school's all technological needs.",
			"Progressive curriculum and individualized learning cater to diverse skill levels, encouraging exploration and growth."
		],
		href: "/programs/innoverse-lab"
	},
	{
		title: "ATL Lab (ATAL TINKERING LAB)",
		description: "Complete end to end solution for ATL lab from providing equipment to training, to competition.",
		highlights: [
			"Ownership for all the compliance which is compulsory by AIM."
		],
		href: "/programs/atl-lab"
	}
];

export default function ProgramsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });
	const [activeTab, setActiveTab] = useState(0);

	return (
		<section
			ref={ref}
			className="relative overflow-hidden border-t"
			style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-12)', backgroundColor: 'var(--color-white)', borderColor: 'var(--color-border)' }}
		>
			<FloatingAnimations variant="services" density="low" />

			<div className="max-w-content mx-auto px-4 md:px-8 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="text-center mb-14 flex flex-col items-center w-full"
				>
					<span className="inline-block px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider mb-6 mx-auto" style={{ backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
						Curriculum Offerings
					</span>
					<h2 className="font-heading mb-6 leading-tight tracking-tight text-center" style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text-primary)' }}>
						Comprehensive <span style={{ color: 'var(--color-accent)' }}>K-12 Educational Programs</span>
					</h2>
					<div className="w-full lg:px-8">
						<p className="text-center" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
							At STEMmantra, we deploy meticulously structured learning pathways that evolve with the student.
							Our programs range from primary level kinetic learning to advanced senior secondary courses in Robotics, STEM/STEAM, artificial Intelligence & Machine learning.
						</p>
					</div>
				</motion.div>

				{/* Educational Structure */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="mt-14 w-full"
				>
					<div className="flex justify-center w-full mb-6">
						<h3 className="font-heading flex items-center gap-3 text-center" style={{ fontSize: 'var(--text-4xl)', color: 'var(--color-text-primary)' }}>
							<FaGraduationCap style={{ color: 'var(--color-accent)' }} className="w-10 h-10 lg:w-12 lg:h-12" />
							Educational Structure
						</h3>
					</div>
					
					<div className="max-w-none text-left md:text-justify leading-relaxed mb-10 mx-auto" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
						<p className="mb-6">
							Our curriculum implementation framework guarantees that every syllabus we offer conforms rigorously to current
							<strong style={{ color: 'var(--color-text-primary)' }}> Central Board of Secondary Education (CBSE)</strong>, <strong style={{ color: 'var(--color-text-primary)' }}>ICSE</strong>, and international academic standards &amp; State Boards.
							We believe that STEM education is not an extracurricular activity, but a fundamental academic necessity.
						</p>
						<p>
							When your institution partners with us for an <strong style={{ color: 'var(--color-text-primary)' }}>Robotics, STEM/STEM Labs or AI &amp; Coding lab setups</strong> or an integrated <strong style={{ color: 'var(--color-text-primary)' }}>Robotics Masterclass</strong>,
							you receive a turnkey pedagogical solution encompassing year-long lesson plans, proprietary workbook materials,
							and continuous educator evaluation metrics.
						</p>
					</div>

					<div className="flex justify-center md:justify-start mb-14">
						<Link
							href="/programs"
							className="inline-flex items-center gap-3 px-6 py-3 text-white font-bold rounded-lg transition-colors"
							style={{ backgroundColor: 'var(--color-primary)', fontSize: 'var(--text-base)' }}
						>
							View Detailed Course Catalogs
							<FaArrowRight className="w-4 h-4" />
						</Link>
					</div>
				</motion.div>

				{/* Programs — Tabbed layout on desktop, accordion on mobile */}
				<div className="border-t pt-14" style={{ borderColor: 'var(--color-border)' }}>
					
					{/* Desktop: Tab layout */}
					<div className="hidden lg:grid grid-cols-5 gap-0 min-h-[360px]">
						{/* Left: Tab list */}
						<div className="col-span-2 pr-8 border-r" style={{ borderColor: 'var(--color-border)' }}>
							{offeredLabs.map((lab, index) => (
								<button
									key={index}
									onClick={() => setActiveTab(index)}
									className={`w-full text-left p-4 mb-1 rounded-lg transition-all duration-200 block ${
										activeTab === index ? 'font-bold' : 'font-medium'
									}`}
									style={{
										backgroundColor: activeTab === index ? 'var(--color-accent-light)' : 'transparent',
										borderLeft: activeTab === index ? '3px solid var(--color-accent)' : '3px solid transparent',
										color: activeTab === index ? 'var(--color-accent-dark)' : 'var(--color-text-secondary)',
										fontSize: 'var(--text-base)',
									}}
								>
									{lab.title}
								</button>
							))}
						</div>

						{/* Right: Detail panel */}
						<div className="col-span-3 pl-10">
							<AnimatePresence mode="wait">
								<motion.div
									key={activeTab}
									initial={{ opacity: 0, x: 10 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -10 }}
									transition={{ duration: 0.25 }}
									className="h-full flex flex-col"
								>
									<div className="flex justify-between items-start mb-4">
										<h4 className="font-bold tracking-tight" style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)' }}>
											{offeredLabs[activeTab].title}
										</h4>
										<Link href={offeredLabs[activeTab].href}>
											<FaArrowRight className="w-4 h-4 -rotate-45 mt-1" style={{ color: 'var(--color-accent)' }} />
										</Link>
									</div>
									<p className="mb-6 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
										{offeredLabs[activeTab].description}
									</p>
									<ul className="space-y-3 mt-auto pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
										{offeredLabs[activeTab].highlights.map((highlight, idx) => (
											<li key={idx} className="flex items-start gap-2.5">
												<FaCheckCircle className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
												<span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>{highlight}</span>
											</li>
										))}
									</ul>
									<Link
										href={offeredLabs[activeTab].href}
										className="mt-8 inline-flex items-center gap-2 font-semibold transition-colors"
										style={{ color: 'var(--color-accent)', fontSize: 'var(--text-base)' }}
									>
										Learn more about this program <FaArrowRight className="w-3 h-3" />
									</Link>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>

					{/* Mobile: Accordion */}
					<div className="lg:hidden space-y-3">
						{offeredLabs.map((lab, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={isInView ? { opacity: 1, y: 0 } : {}}
								transition={{ duration: 0.4, delay: index * 0.05 }}
								className="border rounded-xl overflow-hidden"
								style={{ borderColor: 'var(--color-border)' }}
							>
								<button
									onClick={() => setActiveTab(activeTab === index ? -1 : index)}
									className="w-full flex items-center justify-between p-5 text-left"
									style={{ backgroundColor: activeTab === index ? 'var(--color-accent-light)' : 'var(--color-white)' }}
								>
									<span className="font-bold pr-4" style={{ color: activeTab === index ? 'var(--color-accent-dark)' : 'var(--color-text-primary)', fontSize: 'var(--text-base)' }}>
										{lab.title}
									</span>
									<FaChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${activeTab === index ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-secondary)' }} />
								</button>
								<AnimatePresence>
									{activeTab === index && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{ duration: 0.25 }}
											className="overflow-hidden"
										>
											<div className="p-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
												<p className="mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-base)' }}>
													{lab.description}
												</p>
												<ul className="space-y-2">
													{lab.highlights.map((h, idx) => (
														<li key={idx} className="flex items-start gap-2">
															<FaCheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
															<span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>{h}</span>
														</li>
													))}
												</ul>
												<Link href={lab.href} className="mt-4 inline-flex items-center gap-2 font-semibold" style={{ color: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>
													Learn more <FaArrowRight className="w-3 h-3" />
												</Link>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
