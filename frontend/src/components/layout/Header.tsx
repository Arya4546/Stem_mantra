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
    { name: "Learn", href: "https://learn.stemmantra.com/", external: true },
    { name: "Clients", href: "/clients" },
    { name: "Contact", href: "/contact" },
  ];

  const programs = [
    {
      title: "Pre Tinkering Lab",
      href: "/programs/pre-tinkering-lab",
      description: "Grades 3-5 foundation learning",
      icon: <Microscope className="w-5 h-5 text-[var(--color-accent)]" />,
    },
    {
      title: "STEAMVERSE Lab",
      href: "/programs/steamverse-lab",
      description: "Robotics & IoT integration",
      icon: <Zap className="w-5 h-5 text-[var(--color-primary)]" />,
    },
    {
      title: "AI & Coding Lab",
      href: "/programs/ai-coding-lab",
      description: "Python & Machine Learning",
      icon: <Bot className="w-5 h-5 text-[var(--color-primary-light)]" />,
    },
    {
      title: "INNOVERSE Lab",
      href: "/programs/innoverse-lab",
      description: "Customized Tech solutions",
      icon: <Award className="w-5 h-5 text-[var(--color-accent)]" />,
    },
    {
      title: "ATL Lab",
      href: "/programs/atl-lab",
      description: "NITI Aayog compliance",
      icon: <Target className="w-5 h-5 text-[var(--color-primary)]" />,
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-sm shadow-sm py-3"
            : "bg-white py-4"
        } border-b border-[var(--color-border)] px-4 md:px-8 lg:px-16`}
      >
        <div className="w-full max-w-content mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="STEMmantra"
              className="h-12 w-auto object-contain"
              style={{ maxWidth: '240px' }}
              fetchPriority="high"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <nav className="flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setIsProgramsOpen(true)}
                  onMouseLeave={() => link.dropdown && setIsProgramsOpen(false)}
                >
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className={`px-3 py-2 text-[15px] font-semibold tracking-tight transition-all duration-200 flex items-center gap-1.5 rounded-md ${
                      pathname === link.href || (link.dropdown && pathname.startsWith("/programs"))
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
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
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[520px]"
                        >
                          <div className="bg-white rounded-xl shadow-lg border border-[var(--color-border)] p-4 grid grid-cols-2 gap-2">
                            {programs.map((prog) => (
                              <Link
                                key={prog.title}
                                href={prog.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-surface)] transition-all duration-200 group/item border border-transparent hover:border-[var(--color-border)]"
                              >
                                <div className="p-2 bg-[var(--color-surface-alt)] rounded-lg group-hover/item:bg-white transition-colors border border-[var(--color-border)]">
                                  {prog.icon}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-[var(--color-text-primary)] group-hover/item:text-[var(--color-accent)] transition-colors">{prog.title}</div>
                                  <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">{prog.description}</div>
                                </div>
                              </Link>
                            ))}
                            <Link 
                              href="/programs" 
                              className="col-span-2 mt-2 p-3 bg-[var(--color-primary)] rounded-lg text-center text-xs font-bold text-white hover:bg-[var(--color-primary-dark)] transition-all flex items-center justify-center gap-2 group"
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

            {/* Enquire Now Button */}
            <Link
              href="/contact"
              className="h-12 px-8 flex items-center justify-center bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg uppercase tracking-wider active:scale-[0.98]"
            >
              Enquire Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-alt)] rounded-lg border border-[var(--color-border)] transition-colors"
            aria-label="Toggle mobile menu"
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
            className="fixed inset-0 z-[60] bg-black/50 lg:hidden"
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
              <div className="flex items-center justify-between mb-10">
                 <img src="/images/logo.png" alt="STEMmantra" className="h-10 w-auto" />
                 <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-[var(--color-surface)] rounded-lg"
                  aria-label="Close menu"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={`block py-3 text-lg font-semibold ${
                        pathname === link.href ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <div className="mt-1 pl-4 space-y-1.5 border-l-2 border-[var(--color-accent)]/20 mb-4">
                        {programs.map((p) => (
                          <Link key={p.title} href={p.href} className="block py-1.5 text-[15px] font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]">
                            {p.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-auto py-8 border-t border-[var(--color-border)]">
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-center gap-3 p-3 bg-[var(--color-surface)] text-[var(--color-primary)] rounded-lg font-semibold mb-2"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>{SITE_CONFIG.contact.mobile}</span>
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.landline}`}
                  className="flex items-center gap-3 p-3 bg-[var(--color-surface)] text-[var(--color-primary)] rounded-lg font-semibold mb-4"
                >
                  <FaPhone className="w-4 h-4" />
                  <span>{SITE_CONFIG.contact.landline}</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full h-14 bg-[var(--color-primary)] text-white font-bold rounded-lg shadow-md uppercase tracking-wider"
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
