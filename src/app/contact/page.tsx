"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaArrowRight,
} from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", school: "", message: "" });
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 blur-bg" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full filter blur-3xl" />
          
          <div className="container relative mx-auto px-4 z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">Get In Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Let's discuss how we can transform your school with world-class STEM education
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPhoneAlt className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Call Us
                </h3>
                <a
                  href={`tel:${SITE_CONFIG.contact.mobile}`}
                  className="text-indigo-600 hover:text-purple-600 font-semibold"
                >
                  {SITE_CONFIG.contact.mobile}
                </a>
                <p className="text-sm text-gray-600 mt-1">
                  {SITE_CONFIG.contact.phone}
                </p>
              </div>

              <div className="text-center bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEnvelope className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Email Us
                </h3>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-indigo-600 hover:text-purple-600 font-semibold break-all"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div className="text-center bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMapMarkerAlt className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Visit Us
                </h3>
                <p className="text-gray-600 text-sm">
                  {SITE_CONFIG.contact.address}
                </p>
              </div>

              <div className="text-center bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaClock className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Working Hours
                </h3>
                <p className="text-gray-600 text-sm">
                  Mon - Sat: 9:00 AM - 6:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours. Whether you want to setup a lab, get training, or just learn more about our programs.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="school"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      School/Organization Name
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="Your school or organization"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-green-700">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {!isSubmitting && <FaPaperPlane className="w-5 h-5" />}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Map Section */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Visit Our Office
                </h2>
                <div className="h-[500px] p-0 overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.3864183629824!2d77.31569331508!3d28.61396099442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce57b6f2e7b47%3A0x5e7c3c9f7b4c6f2d!2sSector%2010%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1636380000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="STEM Mantra Office Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
