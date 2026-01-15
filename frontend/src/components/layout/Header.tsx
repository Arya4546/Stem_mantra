"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaPhone } from "react-icons/fa";
import { LogOut, User, Settings, LayoutDashboard, ChevronDown, Menu, X, Microscope, Bot, Zap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { useAuth } from "@/providers/auth-provider";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const programs = [
    {
      title: "ATL Labs",
      href: "/programs/atl-labs",
      description: "Atal Tinkering Labs setup & support",
      icon: <Microscope className="w-6 h-6 text-orange-500" />,
    },
    {
      title: "Robotics & AI Labs",
      href: "/programs/robotics-lab",
      description: "Advanced robotics and AI education",
      icon: <Bot className="w-6 h-6 text-teal-500" />,
    },
    {
      title: "STEM Innovation Labs",
      href: "/programs/stem-lab",
      description: "Complete STEM learning solutions",
      icon: <Zap className="w-6 h-6 text-orange-500" />,
    },
  ];

  // Determine if on landing page
  const isHome = pathname === "/";
  let headerBg = "";
  let textColor = "text-gray-700";
  if (isScrolled) {
    headerBg = "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100";
    textColor = "text-gray-700";
  } else if (isHome) {
    headerBg = "bg-gray-900/80 backdrop-blur-sm";
    textColor = "text-white";
  } else {
    headerBg = "bg-white shadow-md border-b border-gray-100";
    textColor = "text-gray-700";
  }
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}
    >
      {/* Top Bar - Contact Info */}
      <div
        className={`hidden lg:block bg-gradient-to-r from-orange-500 to-orange-600 text-white transition-all duration-300 ${isScrolled ? "h-0 opacity-0 overflow-hidden" : "h-10"
          }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_CONFIG.contact.mobile}`} className="flex items-center gap-2 hover:text-orange-100 transition-colors">
              <FaPhone className="w-3 h-3" />
              <span>{SITE_CONFIG.contact.mobile}</span>
            </a>
            <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-orange-100 transition-colors">
              {SITE_CONFIG.contact.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>India&apos;s Leading STEM Education Provider</span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-50">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 md:h-14"
            >
              <img
                src="https://stemmantra.com/assets/img/Custom/Newlogo.jpeg"
                alt="STEM Mantra Logo"
                className="h-full w-auto object-contain"
                style={{ maxWidth: '180px' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLink href="/" active={pathname === "/"} isScrolled={isScrolled} textClass={isHome && !isScrolled ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-600"}>
              Home
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"} isScrolled={isScrolled} textClass={isHome && !isScrolled ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-600"}>
              About
            </NavLink>

            {/* Programs Link */}
            <NavLink href="/programs" active={pathname.startsWith("/programs")} isScrolled={isScrolled} textClass={isHome && !isScrolled ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-600"}>
              Programs
            </NavLink>

            <NavLink href="/blog" active={pathname.startsWith("/blog")} isScrolled={isScrolled} textClass={isHome && !isScrolled ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-600"}>
              Blog
            </NavLink>
            <NavLink href="/gallery" active={pathname === "/gallery"} isScrolled={isScrolled} textClass={isHome && !isScrolled ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-600"}>
              Gallery
            </NavLink>
            <NavLink href="/contact" active={pathname === "/contact"} isScrolled={isScrolled} textClass={isHome && !isScrolled ? "text-white hover:text-orange-400" : "text-gray-700 hover:text-orange-600"}>
              Contact
            </NavLink>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div
                className="relative ml-4"
                onMouseEnter={() => setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-orange-50 to-teal-50 border border-orange-100 hover:border-orange-200 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user?.firstName?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden xl:inline">
                    {user?.firstName || "User"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform ${isUserMenuOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56"
                    >
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-4 bg-gradient-to-r from-orange-50 to-teal-50 border-b border-gray-100">
                          <p className="font-semibold text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors"
                          >
                            <LayoutDashboard className="w-4 h-4 text-orange-500" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors"
                          >
                            <User className="w-4 h-4 text-orange-500" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors"
                          >
                            <Settings className="w-4 h-4 text-orange-500" />
                            <span>Settings</span>
                          </Link>
                          <hr className="my-2" />
                          <button
                            onClick={logout}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link
                  href="/login"
                  className={`px-5 py-2.5 text-sm font-medium transition-colors ${!isScrolled && pathname === "/"
                    ? "text-white hover:text-orange-400"
                    : "text-gray-700 hover:text-orange-600"
                    }`}
                >
                  Login
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-medium shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-orange-600" />
            ) : (
              <Menu className="w-6 h-6 text-orange-600" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-gray-100 bg-white">
                <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </MobileNavLink>
                <MobileNavLink href="/programs" onClick={() => setIsMobileMenuOpen(false)}>
                  Programs
                </MobileNavLink>
                <MobileNavLink href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
                  Blog
                </MobileNavLink>
                <MobileNavLink href="/gallery" onClick={() => setIsMobileMenuOpen(false)}>
                  Gallery
                </MobileNavLink>
                <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </MobileNavLink>

                {/* Mobile Auth Section */}
                <div className="px-4 pt-4 space-y-3 border-t border-gray-100 mt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-teal-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {user?.firstName?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-700 transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5 text-orange-500" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-700 transition-colors"
                      >
                        <User className="w-5 h-5 text-orange-500" />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-6 py-3.5 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold text-center hover:bg-orange-50 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block w-full px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-center shadow-lg shadow-orange-500/30"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Contact Info */}
                <div className="px-4 pt-4 border-t border-gray-100 mt-4">
                  <a
                    href={`tel:${SITE_CONFIG.contact.mobile}`}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium"
                  >
                    <FaPhone className="w-4 h-4" />
                    <span>Call Us: {SITE_CONFIG.contact.mobile}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

type NavLinkProps = {
  href: string;
  active: boolean;
  children: React.ReactNode;
  isScrolled: boolean;
  textClass?: string;
};
function NavLink({ href, active, children, isScrolled, textClass }: NavLinkProps) {
  let baseClass = "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200";
  if (active) {
    baseClass += " text-orange-600 bg-orange-50";
  } else if (textClass) {
    baseClass += ` ${textClass}`;
  } else if (isScrolled) {
    baseClass += " text-gray-700 hover:text-orange-600 hover:bg-orange-50";
  } else {
    baseClass += " text-gray-800 hover:text-orange-600 hover:bg-white/50";
  }
  return (
    <Link href={href} className={baseClass}>
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
      className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors rounded-xl mx-2 font-medium"
    >
      {children}
    </Link>
  );
}
