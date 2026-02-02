"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaTimes, FaPhone, FaEnvelope, FaUser, FaSchool, FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

interface DemoFormData {
  name: string;
  email: string;
  phone: string;
  school: string;
  message: string;
}

export default function FloatingDemoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<DemoFormData>({
    name: "",
    email: "",
    phone: "",
    school: "",
    message: "",
  });

  useEffect(() => {
    // Show button after scrolling 300px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    // Also show after 3 seconds regardless of scroll
    const timer = setTimeout(() => setIsVisible(true), 3000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "floating_demo_button",
          type: "demo_request",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setIsOpen(false);
          setSubmitted(false);
          setFormData({ name: "", email: "", phone: "", school: "", message: "" });
        }, 3000);
      }
    } catch {
      // Handle error silently, form will stay open
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed right-6 bottom-6 z-50"
          >
            <motion.button
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(249, 115, 22, 0.4)",
                  "0 0 40px rgba(249, 115, 22, 0.6)",
                  "0 0 20px rgba(249, 115, 22, 0.4)",
                ],
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                },
              }}
            >
              <FaPlay className="w-5 h-5" />
              <span className="hidden sm:inline">Book a Demo</span>

              {/* Ping animation */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-300"></span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Request Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 w-[calc(100%-2rem)] sm:w-[400px] max-h-[90vh] overflow-y-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                  <h3 className="text-2xl font-bold mb-2">Book a Free Demo</h3>
                  <p className="text-white/90 text-sm">
                    Experience our STEM solutions firsthand
                  </p>
                </div>

                {submitted ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg
                        className="w-10 h-10 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                    <p className="text-gray-600">
                      We&apos;ll contact you within 24 hours to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                      />
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                      />
                    </div>

                    {/* School Input */}
                    <div className="relative">
                      <FaSchool className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        name="school"
                        placeholder="School/Organization Name"
                        value={formData.school}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all"
                      />
                    </div>

                    {/* Message Input */}
                    <textarea
                      name="message"
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/20 transition-all resize-none"
                    />

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        "Request Demo"
                      )}
                    </motion.button>

                    {/* Quick Contact */}
                    <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Or contact us:</span>
                      <a
                        href={`https://wa.me/916356631515`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${SITE_CONFIG.contact.mobile}`}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors"
                      >
                        <FaPhone className="w-4 h-4" />
                        Call
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* WhatsApp Quick Button (always visible) */}
      <a
        href="https://wa.me/916356631515?text=Hi,%20I%20am%20interested%20in%20STEM%20Mantra%20programs"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed left-6 bottom-6 z-40 w-14 h-14 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all group"
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
        <span className="absolute left-16 bg-black/80 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Chat on WhatsApp
        </span>
      </a>
    </>
  );
}
