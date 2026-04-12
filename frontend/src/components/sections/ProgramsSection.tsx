"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import FloatingAnimations from "@/components/animations/FloatingAnimations";

export default function ProgramsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<section
			ref={ref}
			className="relative py-20 lg:py-28 bg-white overflow-hidden border-t border-gray-100"
		>
			<FloatingAnimations variant="services" density="low" />

			<div className="mx-auto px-4 md:px-8 lg:px-16 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="text-center md:text-left mb-16"
				>
					<span className="inline-block px-5 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-black uppercase tracking-widest mb-6 border border-blue-100 shadow-sm">
						Curriculum Offerings
					</span>
					<h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
						Comprehensive <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">K-12 Educational Programs</span>
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
						At STEMmantra, we deploy meticulously structured learning pathways that evolve with the student.
						Our programs range from primary level kinetic learning to advanced senior secondary courses in Robotics ,STEM/STEAM,artificial Intelligence &amp; Machine learning.
					</p>
				</motion.div>

				{/* Left Text / Right List Layout (No uniform cards) */}
				<div className="grid lg:grid-cols-12 gap-16 items-start">

					{/* The Narrative Left Column */}
					<div className="lg:col-span-6 space-y-12">
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							<h3 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 flex items-center gap-3">
								<FaGraduationCap className="text-orange-500 w-10 h-10" />
								Educational Structure
							</h3>
							<div className="prose prose-lg text-gray-600 mb-6 max-w-none text-justify">
								<p>
									Our curriculum implementation framework guarantees that every syllabus we offer conforms rigorously to current
									<strong> Central Board of Secondary Education (CBSE)</strong>, <strong>ICSE</strong>, and international academic standards &amp; State Boards.
									We believe that STEM education is not an extracurricular activity, but a fundamental academic necessity.
								</p>
								<p>
									When your institution partners with us for an <strong>Robotics ,STEM/STEM Labs or AI &amp; Coding lab setups</strong> or an integrated <strong>Robotics Masterclass</strong>,
									you receive a turnkey pedagogical solution encompassing year-long lesson plans, proprietary workbook materials,
									and continuous educator evaluation metrics.
								</p>
							</div>

							<Link
								href="/programs"
								className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors"
							>
								View Detailed Course Catalogs
								<FaArrowRight className="w-4 h-4" />
							</Link>
						</motion.div>
					</div>

					{/* Highly descriptive list Right Column */}
					<div className="lg:col-span-6 space-y-10">

						{/* Robotics Item */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="p-8 bg-orange-50/50 border-l-8 border-orange-500 rounded-r-2xl"
						>
							<h4 className="text-2xl md:text-3xl font-black text-orange-600 mb-3 tracking-tight">STEM/STEAM-Robotics Labs</h4>
							<p className="text-gray-700 mb-4 leading-relaxed font-medium">
								From basic gear mechanisms for primary school to inverse kinematics and autonomous navigation protocols for K-12 students.
							</p>
							<ul className="space-y-2">
								<li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 w-4 h-4" /> Certified Master Trainers</li>
								<li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 w-4 h-4" /> Unique Robotics methodologies</li>
							</ul>
						</motion.div>

						{/* AI Item */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="p-8 bg-teal-50/50 border-l-8 border-teal-500 rounded-r-2xl"
						>
							<h4 className="text-2xl md:text-3xl font-black text-teal-600 mb-3 tracking-tight">Artificial Intelligence & Coding</h4>
							<p className="text-gray-700 mb-4 leading-relaxed font-medium">
								We utilize visual programming interfaces transitioning strictly into high-level language parsing (Python/C++) for machine learning applications.
							</p>
							<ul className="space-y-2">
								<li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 w-4 h-4" /> Computer Vision Algorithms</li>
								<li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 w-4 h-4" /> Natural Language Processing</li>
							</ul>
						</motion.div>

						{/* ATL Item */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="p-8 bg-blue-50/50 border-l-8 border-blue-500 rounded-r-2xl"
						>
							<h4 className="text-2xl md:text-3xl font-black text-blue-600 mb-3 tracking-tight">Atal Tinkering Labs (ATL)</h4>
							<p className="text-gray-700 mb-4 leading-relaxed font-medium">
								Full compliance lifecycle management for NITI Aayog funded ATL labs. We train students in 3D modeling, intermediate circuitry, and rapid IoT prototyping.
							</p>
							<ul className="space-y-2">
								<li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 w-4 h-4" /> NITI Aayog Dashboard Maintenance</li>
								<li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 w-4 h-4" /> Tinkering Festival Preparation</li>
							</ul>
						</motion.div>

					</div>
				</div>
			</div>
		</section>
	);
}
