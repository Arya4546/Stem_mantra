"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaRobot, FaMicrochip, FaFlask } from "react-icons/fa";

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
		accentColor: "border-l-blue-500",
		iconBg: "bg-blue-50",
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
		accentColor: "border-l-orange-500",
		iconBg: "bg-orange-50",
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
		accentColor: "border-l-teal-500",
		iconBg: "bg-teal-50",
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
			className="relative py-16 lg:py-20 bg-gray-50 overflow-hidden"
		>
			<div className="container mx-auto px-4 relative z-10">
				{/* Section Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5 }}
					className="text-center max-w-3xl mx-auto mb-14"
				>
					<span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold mb-4">
						Our Programs
					</span>
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Comprehensive{" "}
						<span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
							STEM Solutions
						</span>
					</h2>
					<p className="text-lg text-gray-600">
						From concept to innovation, we provide end-to-end STEM education
						solutions tailored for schools across India.
					</p>
				</motion.div>

				{/* Featured card + sidebar stack layout */}
				<div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
					{/* Featured Card — First program (2/3 width) */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : {}}
						transition={{ duration: 0.5, delay: 0.1 }}
						className="lg:col-span-2 group"
					>
						<div className={`bg-white rounded-2xl overflow-hidden border border-gray-100 border-l-4 ${programs[0].accentColor} shadow-sm hover:shadow-lg transition-all h-full`}>
							<div className="p-8">
								<div className="flex items-start gap-4 mb-6">
									<div className={`w-14 h-14 ${programs[0].iconBg} rounded-xl flex items-center justify-center`}>
										{(() => { const Icon = programs[0].icon; return <Icon className={`w-7 h-7 ${programs[0].iconColor}`} />; })()}
									</div>
									<div>
										<div className="flex items-center gap-3 mb-1">
											<h3 className="text-2xl font-bold text-gray-900">{programs[0].title}</h3>
											<span className="px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
												{programs[0].stats.schools} Schools
											</span>
										</div>
										<p className="text-sm text-gray-500">{programs[0].subtitle}</p>
									</div>
								</div>
								<p className="text-gray-600 mb-6">{programs[0].description}</p>
								<ul className="grid sm:grid-cols-2 gap-3 mb-6">
									{programs[0].features.map((feature, idx) => (
										<li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
											<FaCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
											{feature}
										</li>
									))}
								</ul>
								<Link
									href={programs[0].href}
									className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group/btn"
								>
									Learn More
									<FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
								</Link>
							</div>
						</div>
					</motion.div>

					{/* Sidebar stack — Remaining programs (1/3 width) */}
					<div className="space-y-6">
						{programs.slice(1).map((program, index) => (
							<motion.div
								key={program.id}
								initial={{ opacity: 0, x: 20 }}
								animate={isInView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
							>
								<div className={`bg-white rounded-xl p-5 border border-gray-100 border-l-4 ${program.accentColor} shadow-sm hover:shadow-md transition-all`}>
									<div className="flex items-start gap-3 mb-3">
										<div className={`w-10 h-10 ${program.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
											<program.icon className={`w-5 h-5 ${program.iconColor}`} />
										</div>
										<div>
											<h3 className="font-bold text-gray-900 text-sm">{program.title}</h3>
											<p className="text-xs text-gray-500">{program.subtitle} • {program.stats.schools} Schools</p>
										</div>
									</div>
									<p className="text-sm text-gray-600 mb-3">{program.description}</p>
									<Link
										href={program.href}
										className="inline-flex items-center gap-1 text-orange-600 font-semibold text-xs hover:text-orange-700 transition-colors group/btn"
									>
										Learn More
										<FaArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
									</Link>
								</div>
							</motion.div>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.5, delay: 0.5 }}
					className="text-center mt-12"
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
