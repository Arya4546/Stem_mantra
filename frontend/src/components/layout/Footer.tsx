"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaRobot, FaChevronRight, FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

// Location-based service pages - using the dynamic routes
const locationServices = {
  "STEM Labs": [
    { city: "Delhi", href: "/stem-labs/delhi" },
    { city: "Mumbai", href: "/stem-labs/mumbai" },
    { city: "Bangalore", href: "/stem-labs/bangalore" },
    { city: "Hyderabad", href: "/stem-labs/hyderabad" },
    { city: "Chennai", href: "/stem-labs/chennai" },
    { city: "Kolkata", href: "/stem-labs/kolkata" },
  ],
  "Robotics Labs": [
    { city: "Noida", href: "/robotics-labs/noida" },
    { city: "Gurgaon", href: "/robotics-labs/gurugram" },
    { city: "Pune", href: "/robotics-labs/pune" },
    { city: "Lucknow", href: "/robotics-labs/lucknow" },
    { city: "Delhi", href: "/robotics-labs/delhi" },
    { city: "Mumbai", href: "/robotics-labs/mumbai" },
  ],
  "ATL Labs": [
    { city: "Delhi NCR", href: "/labs/atl" },
    { city: "Mumbai", href: "/labs/atl" },
    { city: "Bangalore", href: "/labs/atl" },
    { city: "Hyderabad", href: "/labs/atl" },
    { city: "Chennai", href: "/labs/atl" },
    { city: "Pune", href: "/labs/atl" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // SEO Links Data
  const seoLinks = {
    labsByCity: {
      title: "STEM Labs By City",
      links: [
        { name: "STEM Labs in Delhi", href: "/stem-labs/delhi" },
        { name: "STEM Labs in Mumbai", href: "/stem-labs/mumbai" },
        { name: "STEM Labs in Bangalore", href: "/stem-labs/bangalore" },
        { name: "STEM Labs in Hyderabad", href: "/stem-labs/hyderabad" },
        { name: "STEM Labs in Chennai", href: "/stem-labs/chennai" },
        { name: "STEM Labs in Pune", href: "/stem-labs/pune" },
        { name: "STEM Labs in Gurugram", href: "/stem-labs/gurugram" },
        { name: "STEM Labs in Noida", href: "/stem-labs/noida" },
        { name: "STEM Labs in Kolkata", href: "/stem-labs/kolkata" },
        { name: "STEM Labs in Jaipur", href: "/stem-labs/jaipur" },
      ],
    },
    roboticsLabsByCity: {
      title: "Robotics Labs By City",
      links: [
        { name: "Robotics Labs in Delhi", href: "/robotics-labs/delhi" },
        { name: "Robotics Labs in Mumbai", href: "/robotics-labs/mumbai" },
        { name: "Robotics Labs in Bangalore", href: "/robotics-labs/bangalore" },
        { name: "Robotics Labs in Hyderabad", href: "/robotics-labs/hyderabad" },
        { name: "Robotics Labs in Chennai", href: "/robotics-labs/chennai" },
        { name: "Robotics Labs in Pune", href: "/robotics-labs/pune" },
        { name: "Robotics Labs in Gurugram", href: "/robotics-labs/gurugram" },
        { name: "Robotics Labs in Lucknow", href: "/robotics-labs/lucknow" },
      ],
    },
    labsByType: {
      title: "Labs By Type",
      links: [
        { name: "Atal Tinkering Labs (ATL)", href: "/labs/atl" },
        { name: "Robotics & AI Labs", href: "/labs/robotics-ai" },
        { name: "STEM Innovation Labs", href: "/labs/stem-innovation" },
        { name: "Coding & Programming Labs", href: "/labs/coding" },
        { name: "3D Printing Labs", href: "/labs/3d-printing" },
        { name: "IoT & Electronics Labs", href: "/labs/iot-electronics" },
        { name: "Maker Space Labs", href: "/labs/maker-space" },
      ],
    },
    programsByAge: {
      title: "Programs By Class",
      links: [
        { name: "STEM for Class 1-3", href: "/programs/class-1-3" },
        { name: "STEM for Class 4-5", href: "/programs/class-4-5" },
        { name: "Robotics for Class 6-8", href: "/programs/class-6-8" },
        { name: "AI & Coding for Class 9-10", href: "/programs/class-9-10" },
        { name: "Advanced Robotics Class 11-12", href: "/programs/class-11-12" },
        { name: "Teacher Training", href: "/programs/teacher-training" },
      ],
    },
    services: {
      title: "Our Services",
      links: [
        { name: "ATL Lab Setup", href: "/services/atl-lab-setup" },
        { name: "Robotics Lab Setup", href: "/services/robotics-lab-setup" },
        { name: "STEM Curriculum", href: "/services/curriculum" },
        { name: "Teacher Training", href: "/services/teacher-training" },
        { name: "Student Workshops", href: "/services/workshops" },
        { name: "Competition Prep", href: "/services/competitions" },
      ],
    },
    competitions: {
      title: "Competitions & Events",
      links: [
        { name: "Robotics Olympiad", href: "/competitions/robotics-olympiad" },
        { name: "STEM Challenge", href: "/competitions/stem-challenge" },
        { name: "ATL Marathon", href: "/competitions/atl-marathon" },
        { name: "Coding Championship", href: "/competitions/coding" },
        { name: "Science Exhibitions", href: "/competitions/exhibitions" },
      ],
    },
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* SEO Links Section - Before Main Footer */}
      <div className="relative bg-gray-950 py-10 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            Explore STEM Education{" "}
            <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">
              Solutions Across India
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(seoLinks).map(([key, category]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-orange-400 mb-3 border-b border-gray-700 pb-2">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-x-1 gap-y-0.5">
                  {category.links.map((link, index) => (
                    <span key={link.href} className="inline-flex items-center">
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-orange-400 text-xs transition-colors"
                      >
                        {link.name}
                      </Link>
                      {index < category.links.length - 1 && (
                        <span className="text-gray-600 mx-1">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs mt-6 text-center max-w-4xl mx-auto">
            <strong className="text-gray-400">STEM Mantra</strong> is India&apos;s premier provider of
            robotics labs, AI labs, STEM labs, and Atal Tinkering Labs (ATL) for schools. Complete
            turnkey lab solutions with equipment, NEP 2020 aligned curriculum, teacher training,
            and support across 500+ cities.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl" />
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <img
                  src="https://stemmantra.com/assets/img/Custom/Newlogo.jpeg"
                  alt="STEM Mantra Logo"
                  className="h-14 w-auto object-contain"
                  style={{ maxWidth: '180px' }}
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                India&apos;s leading provider of robotics, AI, and STEM education solutions for schools.
                Transforming education through innovation and hands-on learning.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, href: SITE_CONFIG.social.facebook, color: "hover:bg-blue-600", label: "Facebook" },
                { Icon: FaTwitter, href: SITE_CONFIG.social.twitter, color: "hover:bg-sky-500", label: "Twitter" },
                { Icon: FaLinkedinIn, href: SITE_CONFIG.social.linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
                { Icon: FaYoutube, href: SITE_CONFIG.social.youtube, color: "hover:bg-red-600", label: "YouTube" },
                { Icon: FaInstagram, href: SITE_CONFIG.social.instagram, color: "hover:bg-pink-600", label: "Instagram" },
                { Icon: FaWhatsapp, href: "https://wa.me/916356631515", color: "hover:bg-green-600", label: "WhatsApp" },
              ].map(({ Icon, href, color, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 ${color}`}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Contact Quick Links */}
            <div className="space-y-3">
              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <FaPhone className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{SITE_CONFIG.contact.mobile}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors"
              >
                <FaEnvelope className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{SITE_CONFIG.contact.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="w-4 h-4 text-orange-500 mt-0.5" />
                <span className="text-sm">{SITE_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-orange-500 rounded"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Programs", href: "/programs" },
                { label: "Blog", href: "/blog" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-teal-500 rounded"></span>
              Our Programs
            </h4>
            <ul className="space-y-3">
              {[
                { label: "ATL Labs", href: "/programs/atl-labs" },
                { label: "Robotics & AI Labs", href: "/programs/robotics-lab" },
                { label: "STEM Innovation Labs", href: "/programs/stem-lab" },
                { label: "Coding Programs", href: "/programs/coding" },
                { label: "Teacher Training", href: "/programs/teacher-training" },
                { label: "Summer Camps", href: "/programs/summer-camps" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-teal-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-teal-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location-Based Services - STEM Labs */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-purple-500 rounded"></span>
              STEM Labs By City
            </h4>
            <ul className="space-y-3">
              {locationServices["STEM Labs"].map((location, index) => (
                <li key={index}>
                  <Link
                    href={location.href}
                    className="text-gray-400 hover:text-purple-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-purple-500" />
                    STEM Lab in {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location-Based Services - Robotics Labs */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-blue-500 rounded"></span>
              Robotics Labs By City
            </h4>
            <ul className="space-y-3">
              {locationServices["Robotics Labs"].map((location, index) => (
                <li key={index}>
                  <Link
                    href={location.href}
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                    Robotics Lab in {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ATL Labs By State - Horizontal Row */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h4 className="text-white font-semibold mb-4 text-center">ATL Lab Setup By State</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {locationServices["ATL Labs"].map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="px-4 py-2 bg-white/5 hover:bg-orange-500/20 border border-gray-800 hover:border-orange-500/30 rounded-lg text-gray-400 hover:text-orange-500 text-sm transition-all duration-200"
              >
                ATL Lab in {location.city}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-orange-500/10 to-teal-500/10 rounded-2xl p-8 mb-12 border border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 text-sm">Get the latest updates on STEM education and programs</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/20 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© {currentYear} STEM Mantra Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="hover:text-orange-500 transition-colors">
                Refund Policy
              </Link>
              <Link href="/sitemap" className="hover:text-orange-500 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
