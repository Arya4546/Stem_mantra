"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaRobot, FaMicrochip, FaFlask } from "react-icons/fa";
import SectionFloatingIcons from "@/components/animations/SectionFloatingIcons";

const programs = [
	{
		id: "atl-labs",
		icon: FaFlask,
		title: "ATL Labs",
		subtitle: "Atal Tinkering Labs",
		description:
			"Complete end-to-end assistance in establishing and running Atal Tinkering Labs with cutting-edge equipment and support.",
		features: [
			"Lab Equipment Setup",
			"Teacher Training",
			"Curriculum Development",
			"Ongoing Support",
		],
		gradient: "from-blue-500 to-indigo-600",
		bgGradient: "from-blue-50 to-indigo-50",
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		href: "/programs/atl-labs",
		stats: { schools: "200+", students: "25,000+" },
	},
	{
		id: "robotics-lab",
		icon: FaRobot,
		title: "Robotics & AI Labs",
		subtitle: "Next-Gen Learning",
		description:
			"World-class robotics and AI lab setup with age-appropriate kits, project-based curriculum for grades 1-12.",
		features: [
			"Advanced Robotics Kits",
			"AI/ML Modules",
			"Competition Prep",
			"Certification Programs",
		],
		gradient: "from-orange-500 to-red-500",
		bgGradient: "from-orange-50 to-red-50",
		iconBg: "bg-orange-100",
		iconColor: "text-orange-600",
		href: "/programs/robotics-lab",
		stats: { schools: "150+", students: "15,000+" },
	},
	{
		id: "stem-lab",
		icon: FaMicrochip,
		title: "STEM Innovation Labs",
		subtitle: "Hands-On Science",
		description:
			"Complete STEM laboratory solutions with 3D printers, electronics kits, and comprehensive innovation curriculum.",
		features: [
			"3D Printing & Design",
			"Electronics & Circuits",
			"Coding & Programming",
			"Project Workshops",
		],
		gradient: "from-teal-500 to-cyan-600",
		bgGradient: "from-teal-50 to-cyan-50",
		iconBg: "bg-teal-100",
		iconColor: "text-teal-600",
		href: "/programs/stem-lab",
		stats: { schools: "100+", students: "10,000+" },
	},
];

export default function ProgramsSection() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.1 });

	return (
		<section
			ref={ref}
			className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `radial-gradient(circle at 25% 25%, #f97316 1px, transparent 1px),
                              radial-gradient(circle at 75% 75%, #0891b2 1px, transparent 1px)`,
						backgroundSize: "40px 40px",
					}}
				/>
			</div>
			<SectionFloatingIcons count={2} zIndex={1} />

			<div className="container mx-auto px-4 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6 }}
					className="text-center max-w-3xl mx-auto mb-16"
				>
					<span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
						Our Programs
					</span>
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
						Comprehensive{" "}
						<span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
							STEM Solutions
						</span>
					</h2>
					<p className="text-lg md:text-xl text-gray-600">
						From concept to innovation, we provide end-to-end STEM education
						solutions tailored for schools across India.
					</p>
				</motion.div>

				{/* Program Cards */}
				<div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
					{programs.map((program, index) => (
						<motion.div
							key={program.id}
							initial={{ opacity: 0, y: 50 }}
							animate={isInView ? { opacity: 1, y: 0 } : {}}
							transition={{ duration: 0.6, delay: index * 0.2 }}
							className="group relative"
						>
							{/* Card Glow Effect */}
							<div
								className={`absolute -inset-1 bg-gradient-to-r ${program.gradient} rounded-[2rem] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
							/>

							<div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
								{/* Top Gradient Bar */}
								<div className={`h-2 bg-gradient-to-r ${program.gradient}`} />

								{/* Card Content */}
								<div className="p-8 flex-1 flex flex-col">
									{/* Icon and Badge */}
									<div className="flex items-start justify-between mb-6">
										<div
											className={`w-16 h-16 ${program.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
										>
											<program.icon
												className={`w-8 h-8 ${program.iconColor}`}
											/>
										</div>
										<div className="flex gap-2">
											<span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
												{program.stats.schools} Schools
											</span>
										</div>
									</div>

									{/* Title */}
									<div className="mb-4">
										<h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
											{program.title}
										</h3>
										<p className="text-sm text-gray-500">
											{program.subtitle}
										</p>
									</div>

									{/* Description */}
									<p className="text-gray-600 mb-6 flex-grow">
										{program.description}
									</p>

									{/* Features List */}
									<ul className="space-y-3 mb-8">
										{program.features.map((feature, idx) => (
											<motion.li
												key={idx}
												initial={{ opacity: 0, x: -10 }}
												animate={isInView ? { opacity: 1, x: 0 } : {}}
												transition={{
													duration: 0.3,
													delay: index * 0.2 + idx * 0.1,
												}}
												className="flex items-center gap-3"
											>
												<div
													className={`w-6 h-6 rounded-full bg-gradient-to-r ${program.gradient} flex items-center justify-center`}
												>
													<FaCheckCircle className="w-3 h-3 text-white" />
												</div>
												<span className="text-gray-700 text-sm">
													{feature}
												</span>
											</motion.li>
										))}
									</ul>

									{/* CTA Button */}
									<Link
										href={program.href}
										className={`group/btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${program.gradient} text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}
									>
										Learn More
										<FaArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
									</Link>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.6, delay: 0.8 }}
					className="text-center mt-16"
				>
					<Link
						href="/programs"
						className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors group"
					>
						View All Programs
						<FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
