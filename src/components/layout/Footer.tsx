import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      {/* Decorative blur elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-100/30 rounded-full filter blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  STEM
                </span>
                <span className="text-gray-800">Mantra</span>
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Master The Skills, Drive Your Future. Leading provider of robotics, AI, and STEM education solutions for schools across India.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: FaFacebookF, href: SITE_CONFIG.social.facebook, color: "hover:bg-blue-600" },
                { Icon: FaTwitter, href: SITE_CONFIG.social.twitter, color: "hover:bg-sky-500" },
                { Icon: FaLinkedinIn, href: SITE_CONFIG.social.linkedin, color: "hover:bg-blue-700" },
                { Icon: FaYoutube, href: SITE_CONFIG.social.youtube, color: "hover:bg-red-600" },
                { Icon: FaInstagram, href: SITE_CONFIG.social.instagram, color: "hover:bg-pink-600" },
              ].map(({ Icon, href, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg ${color}`}
                  aria-label={`Social link ${index + 1}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Gallery", href: "/gallery" },
                { label: "Contact", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-600 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Our Programs</h4>
            <ul className="space-y-3">
              {[
                { label: "ATL Labs", href: "/programs/atl-labs" },
                { label: "Robotics & AI Labs", href: "/programs/robotics-lab" },
                { label: "STEM Innovation Labs", href: "/programs/stem-lab" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-600 transition-all duration-200 mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="flex items-start gap-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <FaPhone className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Call Us</div>
                    <div className="text-sm">{SITE_CONFIG.contact.mobile}</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-start gap-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <FaEnvelope className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email Us</div>
                    <div className="text-sm break-all">{SITE_CONFIG.contact.email}</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Visit Us</div>
                    <div className="text-sm">{SITE_CONFIG.contact.address}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© {currentYear} STEM Mantra. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
