"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import { useSubmitContact } from "@/hooks/useApi";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  MessageSquare,
  Building2,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    content: SITE_CONFIG.contact.mobile,
    subContent: SITE_CONFIG.contact.phone,
    href: `tel:${SITE_CONFIG.contact.mobile}`,
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: SITE_CONFIG.contact.email,
    subContent: "We reply within 24 hours",
    href: `mailto:${SITE_CONFIG.contact.email}`,
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "C-104, 2nd Floor, Sector-10",
    subContent: "Noida, UP - 201301",
    href: "https://maps.google.com/?q=Noida+Sector+10",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: "Mon - Sat: 9:00 AM - 6:00 PM",
    subContent: "Sunday: Closed",
    href: "#",
    color: "from-teal-500 to-teal-600",
  },
];

const reasons = [
  { icon: Building2, text: "500+ Schools Partnered" },
  { icon: Users, text: "Expert Team of 200+ Trainers" },
  { icon: CheckCircle, text: "NEP 2020 Aligned Curriculum" },
  { icon: Sparkles, text: "End-to-End Lab Setup Support" },
];

const socialLinks = [
  { icon: FaWhatsapp, href: `https://wa.me/${SITE_CONFIG.contact.mobile.replace(/[^0-9]/g, '')}`, label: "WhatsApp", color: "hover:text-green-500" },
  { icon: FaLinkedin, href: SITE_CONFIG.social.linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
  { icon: FaTwitter, href: SITE_CONFIG.social.twitter, label: "Twitter", color: "hover:text-blue-400" },
  { icon: FaFacebook, href: SITE_CONFIG.social.facebook, label: "Facebook", color: "hover:text-blue-500" },
  { icon: FaInstagram, href: SITE_CONFIG.social.instagram, label: "Instagram", color: "hover:text-pink-500" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    interest: "",
    message: "",
  });

  const submitContact = useSubmitContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContact.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `${formData.interest} - ${formData.school || formData.name}`,
        message: formData.message + (formData.school ? `\n\nSchool/Organization: ${formData.school}` : ""),
      });

      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", school: "", interest: "", message: "" });
    } catch (error) {
      // Error is handled by the API interceptor
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-teal-50/40">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 px-4">
          {/* Animated Background */}
          <div className="absolute top-20 -left-20 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-floatSlow"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl animate-float"></div>
          {/* Floating Icons - subtle, everywhere */}
          <motion.div
            className="absolute top-40 left-[10%] text-orange-500/20 hidden md:block"
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <MessageSquare className="w-14 h-14" />
          </motion.div>
          <motion.div
            className="absolute top-60 right-[15%] text-teal-500/20 hidden md:block"
            animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Mail className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-[20%] text-orange-500/10 hidden md:block"
            animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          >
            <Phone className="w-10 h-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 right-[10%] text-teal-500/10 hidden md:block"
            animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            <Users className="w-10 h-10" />
          </motion.div>

          <div className="container relative mx-auto">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-teal-100 rounded-full text-sm font-semibold text-gray-700 mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                We&apos;d Love to Hear From You
              </motion.span>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-teal-600 bg-clip-text text-transparent">
                  Get In Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Let&apos;s discuss how we can transform your school with world-class STEM education
              </p>

              {/* Quick Stats */}
              <motion.div
                className="flex flex-wrap justify-center gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {reasons.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-600">
                    <item.icon className={`w-5 h-5 ${index % 2 === 0 ? 'text-orange-500' : 'text-teal-500'}`} />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group text-center bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className={`font-semibold ${index % 2 === 0 ? 'text-orange-600' : 'text-teal-600'}`}>
                    {info.content}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{info.subContent}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label htmlFor="school" className="block text-sm font-semibold text-gray-700 mb-2">
                          School/Organization
                        </label>
                        <input
                          type="text"
                          id="school"
                          name="school"
                          value={formData.school}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="School name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-2">
                        I&apos;m Interested In *
                      </label>
                      <select
                        id="interest"
                        name="interest"
                        required
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Select an option</option>
                        <option value="ATL Lab Setup">ATL Lab Setup</option>
                        <option value="Robotics Lab Setup">Robotics & AI Lab Setup</option>
                        <option value="STEM Lab Setup">STEM Innovation Lab Setup</option>
                        <option value="Teacher Training">Teacher Training Programs</option>
                        <option value="Curriculum Design">Curriculum Design</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="Other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitContact.isPending}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitContact.isPending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Info Side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-orange-500 to-teal-600 rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Quick Connect</h3>
                  <p className="text-orange-100 mb-6">
                    Prefer a quick chat? Reach out to us directly on WhatsApp or give us a call.
                  </p>
                  <div className="space-y-4">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.contact.mobile.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in learning more about STEMmantra's programs.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                    >
                      <FaWhatsapp className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">WhatsApp Us</p>
                        <p className="text-sm text-orange-100">Quick response guaranteed</p>
                      </div>
                    </a>
                    <a
                      href={`tel:${SITE_CONFIG.contact.mobile}`}
                      className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors"
                    >
                      <Phone className="w-6 h-6" />
                      <div>
                        <p className="font-semibold">Call Us Now</p>
                        <p className="text-sm text-orange-100">{SITE_CONFIG.contact.mobile}</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
                  <div className="aspect-video rounded-2xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.566!2d77.318!3d28.593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzM0LjgiTiA3N8KwMTknMDQuOCJF!5e0!3m2!1sen!2sin!4v1"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-600">
                      C-104, 2nd Floor, Sector-10, Noida, Uttar Pradesh - 201301
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
          <motion.div
            className="container mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your School?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 500+ schools that have partnered with STEMmantra to bring world-class STEM education to their students.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
