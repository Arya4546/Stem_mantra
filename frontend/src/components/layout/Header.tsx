"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaArrowRight } from "react-icons/fa";
import { ChevronDown, Menu, X, Microscope, Bot, Zap, Award, Target } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
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
    { name: "Career", href: "/career" },
    { name: "Gallery", href: "/gallery" },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  const programs = [
    {
      title: "Pre Tinkering Lab",
      href: "/programs/pre-tinkering-lab",
      description: "Grades 3-5 foundation learning",
      icon: <Microscope className="w-5 h-5 text-orange-500" />,
    },
    {
      title: "STEAMVERSE Lab",
      href: "/programs/steamverse-lab",
      description: "Robotics & IoT integration",
      icon: <Zap className="w-5 h-5 text-teal-500" />,
    },
    {
      title: "AI & Coding Lab",
      href: "/programs/ai-coding-lab",
      description: "Python & Machine Learning",
      icon: <Bot className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "INNOVERSE Lab",
      href: "/programs/innoverse-lab",
      description: "Customized Tech solutions",
      icon: <Award className="w-5 h-5 text-purple-500" />,
    },
    {
      title: "ATL Lab",
      href: "/programs/atl-lab",
      description: "NITI Aayog compliance",
      icon: <Target className="w-5 h-5 text-indigo-500" />,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-4" : "bg-white py-6"
        } border-b border-gray-100 px-4 md:px-8 lg:px-16`}
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
                    className={`px-3 py-2 text-[16px] font-bold tracking-tight transition-all duration-300 flex items-center gap-1.5 ${
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
                          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-gray-100 p-5 grid grid-cols-2 gap-3">
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
                                  <div className="text-[14px] font-black text-gray-900 group-hover/item:text-orange-600 transition-colors">{prog.title}</div>
                                  <div className="text-[11px] text-gray-400 mt-1 truncate">{prog.description}</div>
                                </div>
                              </Link>
                            ))}
                            <Link 
                              href="/programs" 
                              className="col-span-2 mt-3 p-4 bg-gray-900 rounded-xl text-center text-xs font-black text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group"
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

            {/* Enquire Now Button - Professional Highlighting */}
            <Link
              href="/contact"
              className="h-14 px-10 flex items-center justify-center bg-orange-600 hover:bg-gray-900 text-white font-black text-[15px] rounded-2xl transition-all duration-300 shadow-xl shadow-orange-600/25 uppercase tracking-widest active:scale-95"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors"
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
            className="fixed inset-0 z-[60] bg-black/60 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col p-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-12">
                 <img src="/images/logo.png" alt="STEMmantra" className="h-10 w-auto" />
                 <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-gray-100 rounded-lg"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      className={`block py-3 text-xl font-bold tracking-tight ${
                        pathname === link.href ? "text-orange-600" : "text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="mt-1 pl-4 space-y-2 border-l-2 border-orange-500/20 mb-4">
                        {programs.map((p) => (
                          <Link key={p.title} href={p.href} className="block py-1 text-[16px] font-semibold text-gray-500 hover:text-orange-600">
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto py-10 border-t border-gray-100">
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-center gap-3 p-4 bg-orange-50 text-orange-600 rounded-2xl font-bold mb-3"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>{SITE_CONFIG.contact.mobile}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.landline}`}
                  className="flex items-center gap-3 p-4 bg-orange-50 text-orange-600 rounded-2xl font-bold mb-4"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>{SITE_CONFIG.contact.landline}</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full h-16 bg-orange-600 text-white font-bold rounded-2xl shadow-xl shadow-orange-600/20 uppercase tracking-widest"
                >
                  Get A Quote
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
