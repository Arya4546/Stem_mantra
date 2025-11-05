"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRobot } from "react-icons/fa";
import { SITE_CONFIG, NAVIGATION } from "@/lib/constants";

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

  const programs = [
    {
      title: "ATL Labs",
      href: "/programs/atl-labs",
      description: "Atal Tinkering Labs setup & support",
    },
    {
      title: "Robotics & AI Labs",
      href: "/programs/robotics-lab",
      description: "Advanced robotics and AI education",
    },
    {
      title: "STEM Innovation Labs",
      href: "/programs/stem-lab",
      description: "Complete STEM learning solutions",
    }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group relative z-50"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <FaRobot className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading text-2xl font-bold">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                STEM
              </span>
              <span className={`${isScrolled ? 'text-gray-800' : 'text-gray-900'}`}>Mantra</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              About
            </NavLink>
            
            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProgramsOpen(true)}
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname.startsWith("/programs")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                }`}
              >
                Programs
                <svg
                  className={`inline-block ml-1 w-4 h-4 transition-transform duration-200 ${
                    isProgramsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProgramsOpen && (
                <div 
                  className="absolute top-full left-0 mt-0 pt-2 w-80"
                  onMouseEnter={() => setIsProgramsOpen(true)}
                  onMouseLeave={() => setIsProgramsOpen(false)}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-2">
                      {programs.map((program, index) => (
                        <Link
                          key={index}
                          href={program.href}
                          className="block p-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <div className="w-2 h-2 rounded-full bg-indigo-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                {program.title}
                              </div>
                              <div className="text-sm text-gray-500 mt-0.5">
                                {program.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink href="/gallery" active={pathname === "/gallery"}>
              Gallery
            </NavLink>
            <NavLink href="/contact" active={pathname === "/contact"}>
              Contact
            </NavLink>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-indigo-500/30 transform hover:scale-105 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-200">
            <div className="py-4 space-y-1">
              <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <div className="px-4 py-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Programs
                </div>
                {programs.map((program, index) => (
                  <Link
                    key={index}
                    href={program.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors mb-1"
                  >
                    <div className="font-medium text-gray-900">{program.title}</div>
                    <div className="text-sm text-gray-500">{program.description}</div>
                  </Link>
                ))}
              </div>
              <MobileNavLink href="/gallery" onClick={() => setIsMobileMenuOpen(false)}>
                Gallery
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>
              <div className="px-4 pt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "text-indigo-600 bg-indigo-50"
          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors rounded-lg mx-2"
    >
      {children}
    </Link>
  );
}
