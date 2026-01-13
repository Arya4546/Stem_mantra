"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaRobot, FaHome, FaEnvelope } from "react-icons/fa";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-teal-50 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-200/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-orange-300/20 rounded-full filter blur-2xl" />
      </div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-32 left-[15%] text-orange-500/20 hidden md:block"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <FaRobot className="w-16 h-16" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-[15%] text-teal-500/20 hidden md:block"
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Number */}
        <motion.h1
          className="mb-4 font-heading text-[150px] md:text-[200px] font-bold leading-none"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-500 bg-clip-text text-transparent">
            404
          </span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          className="mb-4 font-heading text-3xl font-bold text-gray-900 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mb-8 text-lg text-gray-600 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track!
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-semibold text-white transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:scale-105"
          >
            <FaHome className="w-4 h-4" />
            Go to Homepage
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-orange-500 px-8 py-4 font-semibold text-orange-600 transition-all hover:bg-orange-50 hover:scale-105"
          >
            <FaEnvelope className="w-4 h-4" />
            Contact Us
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500 mb-4">Or try one of these:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "About Us", href: "/about" },
              { label: "Programs", href: "/programs" },
              { label: "Gallery", href: "/gallery" },
              { label: "Blog", href: "/blog" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white rounded-full border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-all hover:shadow-md"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
