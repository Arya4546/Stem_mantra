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
    <footer className="relative text-white overflow-hidden" style={{ backgroundColor: 'var(--color-primary-dark)' }}>

      {/* Main Footer Content */}
      <div className="relative max-w-content mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <Link href="/" className="flex items-center mb-4">
                <img
                  src="/images/logo.png"
                  alt="STEMmantra Logo"
                  className="h-12 w-auto object-contain"
                  style={{ maxWidth: '170px' }}
                  loading="lazy"
                />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                India&apos;s leading provider of robotics, AI, and STEM education solutions for schools. 
                Transforming education through innovation and hands-on learning.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-2.5">
              {[
                { Icon: FaFacebookF, href: SITE_CONFIG.social.facebook, label: "Facebook" },
                { Icon: FaTwitter, href: SITE_CONFIG.social.twitter, label: "Twitter" },
                { Icon: FaLinkedinIn, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
                { Icon: FaYoutube, href: SITE_CONFIG.social.youtube, label: "YouTube" },
                { Icon: FaInstagram, href: SITE_CONFIG.social.instagram, label: "Instagram" },
                { Icon: FaWhatsapp, href: "https://wa.me/916356631515", label: "WhatsApp" },
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:opacity-100"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'rgba(255, 255, 255, 0.5)' }}
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Contact Quick Links */}
            <div className="space-y-2.5">
              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center gap-3 transition-colors hover:opacity-80"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                <FaPhone className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{SITE_CONFIG.contact.mobile}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.landline}`}
                className="flex items-center gap-3 transition-colors hover:opacity-80"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                <FaPhone className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{SITE_CONFIG.contact.landline} (Landline)</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-3 transition-colors hover:opacity-80"
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                <FaEnvelope className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{SITE_CONFIG.contact.email}</span>
              </a>
              <div className="flex items-start gap-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                <FaMapMarkerAlt className="w-3.5 h-3.5 mt-0.5" style={{ color: 'var(--color-accent)' }} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{SITE_CONFIG.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2" style={{ fontSize: 'var(--text-sm)' }}>
              <span className="w-6 h-0.5 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Programs", href: "/programs" },
                { label: "Career", href: "/career" },
                { label: "Learn", href: "https://learn.stemmantra.com/", external: true },
                { label: "Gallery", href: "/gallery" },
                { label: "Our Clients", href: "/clients" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-200 flex items-center group"
                      style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}
                    >
                      <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }} />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 flex items-center group"
                      style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}
                    >
                      <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }} />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2" style={{ fontSize: 'var(--text-sm)' }}>
              <span className="w-6 h-0.5 rounded" style={{ backgroundColor: 'var(--color-primary-light)' }}></span>
              Our Programs
            </h4>
            <ul className="space-y-2.5">
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
                    className="transition-colors duration-200 flex items-center group"
                    style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-primary-light)' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location-Based Services - STEM Labs */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2" style={{ fontSize: 'var(--text-sm)' }}>
              <span className="w-6 h-0.5 rounded" style={{ backgroundColor: 'var(--color-accent)' }}></span>
              STEM Labs By City
            </h4>
            <ul className="space-y-2.5">
              {locationServices["STEM Labs"].map((location, index) => (
                <li key={index}>
                  <Link
                    href={location.href}
                    className="transition-colors duration-200 flex items-center group"
                    style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-accent)' }} />
                    STEM Lab in {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Location-Based Services - Robotics Labs */}
          <div>
            <h4 className="text-white font-semibold mb-5 flex items-center gap-2" style={{ fontSize: 'var(--text-sm)' }}>
              <span className="w-6 h-0.5 rounded" style={{ backgroundColor: 'var(--color-primary-light)' }}></span>
              Robotics Labs By City
            </h4>
            <ul className="space-y-2.5">
              {locationServices["Robotics Labs"].map((location, index) => (
                <li key={index}>
                  <Link
                    href={location.href}
                    className="transition-colors duration-200 flex items-center group"
                    style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}
                  >
                    <FaChevronRight className="w-2 h-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-primary-light)' }} />
                    Robotics Lab in {location.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ATL Labs By State */}
        <div className="border-t pt-6 mb-6" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <h4 className="text-white font-semibold mb-4 text-center" style={{ fontSize: 'var(--text-sm)' }}>ATL Lab Setup By State</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {locationServices["ATL Labs"].map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="px-3.5 py-1.5 rounded-md transition-all duration-200"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}
              >
                ATL Lab in {location.city}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-xl p-6 sm:p-8 mb-10 border" style={{ backgroundColor: 'rgba(232, 121, 43, 0.06)', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-col items-center text-center md:text-left md:flex-row md:justify-between gap-5">
            <div>
              <h4 className="font-bold text-white mb-1.5" style={{ fontSize: 'var(--text-lg)' }}>Subscribe to Our Newsletter</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.45)', fontSize: 'var(--text-sm)' }}>Get the latest updates on STEM education and programs</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto md:w-60 px-4 py-3 rounded-lg text-white placeholder-gray-500 transition-colors"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', fontSize: 'var(--text-sm)' }}
              />
              <button className="w-full sm:w-auto px-5 py-3 text-white rounded-lg font-semibold hover:brightness-110 transition-all whitespace-nowrap"
                style={{ backgroundColor: 'var(--color-accent)', fontSize: 'var(--text-sm)' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4" style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: 'var(--text-sm)' }}>
            <p>© {currentYear} STEMmantra Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/privacy-policy" className="hover:opacity-80 transition-opacity">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:opacity-80 transition-opacity">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="hover:opacity-80 transition-opacity">
                Refund Policy
              </Link>
              <Link href="/sitemap" className="hover:opacity-80 transition-opacity">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Links Section - After Main Footer */}
      {/* 
      <div className="relative bg-gray-950 pt-10 pb-24 md:pb-10 border-t border-gray-800">
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
            <strong className="text-gray-400">STEMmantra</strong> is India&apos;s premier provider of
            robotics labs, AI labs, STEM labs, and Atal Tinkering Labs (ATL) for schools. Complete
            turnkey lab solutions with equipment, NEP 2020 aligned curriculum, teacher training,
            and support across 500+ cities.
          </p>
        </div>
      </div>
      */}
    </footer>
  );
}
