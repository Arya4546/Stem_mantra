"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import { ChevronDown, Menu, X, Microscope, Bot, Zap, Award, Target, Wrench, BookOpen, Code2, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isLearnOpen, setIsLearnOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs", dropdown: true },
    { name: "Gallery", href: "/gallery" },
    { name: "Clients", href: "/clients" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Digital platforms shown under the "Learn" button (opens in a new tab)
  const platforms = [
    {
      title: "STEMmantra LMS",
      host: "learn.stemmantra.com",
      href: "https://learn.stemmantra.com/",
      description: "Courses, lessons & assessments for schools",
      Icon: BookOpen,
      tile: "bg-orange-100 text-orange-600",
    },
    {
      title: "STEMmantra Code Platform",
      host: "code.stemmantra.com",
      href: "https://code.stemmantra.com/",
      description: "Block coding, C++ & board simulator",
      Icon: Code2,
      tile: "bg-teal-100 text-teal-600",
    },
  ];

  const programs = [
    {
      title: "STEAM & Robotics Lab",
      href: "/programs/steamverse-lab",
      description: "Robotics & IoT integration",
      icon: <Zap className="w-5 h-5 text-teal-500" />,
    },
    {
      title: "Composite Skill Lab",
      href: "/programs/composite-skill-lab",
      description: "Grades 6–12 Practical Learning",
      icon: <Wrench className="w-5 h-5 text-amber-500" />,
    },
    {
      title: "AI & Coding Lab",
      href: "/programs/ai-coding-lab",
      description: "Python & Machine Learning",
      icon: <Bot className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Pre-Tinkering Lab",
      href: "/programs/pre-tinkering-lab",
      description: "Grades 3-5 foundation learning",
      icon: <Microscope className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "Innoverse Lab",
      href: "/programs/innoverse-lab",
      description: "Customized Tech solutions",
      icon: <Award className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "Atal Tinkering Lab",
      href: "/programs/atal-tinkering-lab",
      description: "NITI Aayog compliance",
      icon: <Target className="w-5 h-5 text-indigo-500" />,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gradient-to-r from-white/90 via-orange-50/85 to-teal-50/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(249,115,22,0.10)] py-4"
            : "bg-gradient-to-r from-white/90 via-orange-50/90 to-teal-50/90 backdrop-blur-xl py-6"
        } border-b border-white/60 px-4 md:px-8 lg:px-16`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo - Static Style (Not touched) */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="STEMmantra"
              className="h-14 w-auto object-contain"
              style={{ maxWidth: '260px' }}
            />
          </Link>

          {/* Desktop Navigation - Right Side Highlighting */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <nav className="flex items-center gap-1 xl:gap-3">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setIsProgramsOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsProgramsOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-[15px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 ${
                      pathname === link.href || (link.dropdown && pathname.startsWith("/programs"))
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-orange-600"
                    }`}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProgramsOpen ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* Program Dropdown */}
                  {link.dropdown && (
                    <AnimatePresence>
                      {isProgramsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[550px]"
                        >
                          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white/70 ring-1 ring-black/5 p-5 grid grid-cols-2 gap-3">
                            {programs.map((prog) => (
                              <Link
                                key={prog.title}
                                href={prog.href}
                                className="flex items-start gap-4 p-4 rounded-xl hover:bg-orange-50 transition-all duration-300 group/item border border-transparent hover:border-orange-100"
                              >
                                <div className="p-2.5 bg-gray-50 rounded-xl group-hover/item:bg-white transition-colors border border-gray-100">
                                  {prog.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-[14px] font-bold text-gray-900 group-hover/item:text-orange-600 transition-colors">{prog.title}</div>
                                  <div className="text-xs text-gray-500 mt-1 truncate">{prog.description}</div>
                                </div>
                              </Link>
                            ))}
                            <Link 
                              href="/programs" 
                              className="col-span-2 mt-3 p-3.5 bg-gray-900 rounded-xl text-center text-xs font-bold tracking-wider text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group"
                            >
                              EXPLORE ALL PROGRAMS <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Two clear actions: Enquire Now (soft) + Learn (solid, opens our platforms) */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="relative h-12 px-6 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/25 hover:shadow-xl hover:-translate-y-0.5 uppercase tracking-wider active:scale-95"
              >
                <span className="absolute inset-0 rounded-xl bg-orange-500 opacity-60 animate-ping pointer-events-none" aria-hidden />
                <span className="relative">Enquire Now</span>
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsLearnOpen(true)}
                onMouseLeave={() => setIsLearnOpen(false)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isLearnOpen}
                  onClick={() => setIsLearnOpen((v) => !v)}
                  className="h-12 pl-6 pr-5 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/25 hover:shadow-xl hover:-translate-y-0.5 uppercase tracking-wider active:scale-95"
                >
                  Learn
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isLearnOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isLearnOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full pt-3 w-[340px] z-50"
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-white/70 ring-1 ring-black/5 p-2.5">
                        {platforms.map((pf) => (
                          <a
                            key={pf.host}
                            role="menuitem"
                            href={pf.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item flex items-center gap-3.5 p-3.5 rounded-xl hover:bg-orange-50 transition-colors"
                          >
                            <span className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${pf.tile}`}>
                              <pf.Icon className="w-5 h-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[14px] font-bold text-gray-900 group-hover/item:text-orange-600 transition-colors">{pf.title}</span>
                              <span className="block text-xs text-gray-500 truncate">{pf.description}</span>
                              <span className="block text-[11px] font-semibold text-orange-600 mt-0.5">{pf.host}</span>
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-300 group-hover/item:text-orange-500 shrink-0 transition-colors" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-gray-900 bg-white/70 hover:bg-white rounded-xl border border-white/80 shadow-sm backdrop-blur transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-b from-white/95 via-orange-50/95 to-teal-50/95 backdrop-blur-xl shadow-2xl flex flex-col p-6 overflow-y-auto border-l border-white/70"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-12">
                 <img src="/images/logo.png" alt="STEMmantra" className="h-10 w-auto" />
                 <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-white/80 hover:bg-white rounded-lg shadow-sm transition-colors"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`block py-2.5 text-lg font-semibold tracking-tight ${
                        pathname === link.href ? "text-orange-600" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="mt-1 pl-4 space-y-2 border-l-2 border-orange-500/20 mb-4">
                        {programs.map((p) => (
                          <Link key={p.title} href={p.href} className="block py-1 text-[15px] font-medium text-gray-600 hover:text-orange-600">
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600 mb-3">Learn</p>
                <div className="space-y-2.5">
                  {platforms.map((pf) => (
                    <a
                      key={pf.host}
                      href={pf.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                    >
                      <span className="w-10 h-10 shrink-0 rounded-lg bg-white/20 flex items-center justify-center">
                        <pf.Icon className="w-5 h-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{pf.title}</span>
                        <span className="block text-xs text-orange-100">{pf.host}</span>
                      </span>
                      <ExternalLink className="w-4 h-4 text-orange-100" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 pb-4 border-t border-orange-100">
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-center gap-3 p-3.5 bg-white/80 text-orange-600 rounded-xl font-semibold text-sm shadow-sm mb-3"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>{SITE_CONFIG.contact.mobile}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.landline}`}
                  className="flex items-center gap-3 p-3.5 bg-white/80 text-orange-600 rounded-xl font-semibold text-sm shadow-sm mb-4"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>{SITE_CONFIG.contact.landline}</span>
                </a>
                <Link
                  href="/contact"
                  className="relative flex items-center justify-center w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-600/25 uppercase tracking-wider transition-colors"
                >
                  <span className="absolute inset-0 rounded-xl bg-orange-500 opacity-60 animate-ping pointer-events-none" aria-hidden />
                  <span className="relative">Enquire Now</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
