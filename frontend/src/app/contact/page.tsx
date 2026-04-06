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
} from "lucide-react";
import { FaWhatsapp, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const contactInfo = [
  { icon: Phone, title: "Call Us", content: SITE_CONFIG.contact.mobile, subContent: SITE_CONFIG.contact.phone, href: `tel:${SITE_CONFIG.contact.mobile}`, color: "text-orange-500" },
  { icon: Mail, title: "Email Us", content: SITE_CONFIG.contact.email, subContent: "We reply within 24 hours", href: `mailto:${SITE_CONFIG.contact.email}`, color: "text-teal-500" },
  { icon: MapPin, title: "Visit Us", content: "C-104, 2nd Floor, Sector-10", subContent: "Noida, UP - 201301", href: "https://maps.google.com/?q=Noida+Sector+10", color: "text-orange-500" },
  { icon: Clock, title: "Working Hours", content: "Mon - Sat: 9:00 AM - 6:00 PM", subContent: "Sunday: Closed", href: "#", color: "text-teal-500" },
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
      // Error handled by API interceptor
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero — Left aligned, no floating icons */}
        <section className="pt-32 pb-10">
          <div className="site-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                We&apos;d Love to Hear From You
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get In <span className="bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Let&apos;s discuss how we can transform your school with world-class STEM education
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact cards — 2x2 with accent border */}
        <section className="py-6">
          <div className="site-container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-3 p-5 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <info.icon className={`w-5 h-5 ${info.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm mb-0.5">{info.title}</h3>
                    <p className={`font-semibold text-sm ${info.color}`}>{info.content}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{info.subContent}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="py-12">
          <div className="site-container">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form — Flat bordered with colored left sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex">
                  {/* Colored sidebar accent */}
                  <div className="w-1.5 bg-gradient-to-b from-orange-500 to-teal-500 hidden md:block" />
                  <div className="flex-1 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
                    <p className="text-gray-500 mb-6 text-sm">We&apos;ll get back to you within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors text-sm" placeholder="Your full name" />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                          <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors text-sm" placeholder="your@email.com" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                          <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors text-sm" placeholder="+91 98765 43210" />
                        </div>
                        <div>
                          <label htmlFor="school" className="block text-sm font-semibold text-gray-700 mb-1.5">School/Organization</label>
                          <input type="text" id="school" name="school" value={formData.school} onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors text-sm" placeholder="School name" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-1.5">I&apos;m Interested In *</label>
                        <select id="interest" name="interest" required value={formData.interest} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors text-sm bg-white">
                          <option value="">Select an option</option>
                          <option value="Robotics Lab-STEAMVERSE LAB">Robotics Lab - STEAMVERSE LAB</option>
                          <option value="AI & Coding Lab">AI &amp; Coding Lab</option>
                          <option value="Pre Tinkering Lab">Pre Tinkering Lab</option>
                          <option value="STEM/STEAM Lab-INNOVERSE LAB">STEM/STEAM Lab - INNOVERSE LAB</option>
                          <option value="ATL Lab Setup">Atal Tinkering Lab Setup</option>
                          <option value="Teacher Training/Curriculum Design">Teacher Training Programs / Curriculum Design</option>
                          <option value="Partnership">Partnership Opportunity</option>
                          <option value="Other">Other Inquiry</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Your Message *</label>
                        <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-colors resize-none text-sm" placeholder="Tell us about your requirements..." />
                      </div>
                      <button type="submit" disabled={submitContact.isPending}
                        className="w-full py-3.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm">
                        {submitContact.isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-5"
              >
                {/* Quick Connect — bordered card with accent top */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-teal-500" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Connect</h3>
                    <div className="space-y-3">
                      <a
                        href={`https://wa.me/${SITE_CONFIG.contact.mobile.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in learning more about STEMmantra's programs.`}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <FaWhatsapp className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-sm text-gray-900">WhatsApp Us</p>
                          <p className="text-xs text-gray-500">Quick response guaranteed</p>
                        </div>
                      </a>
                      <a href={`tel:${SITE_CONFIG.contact.mobile}`}
                        className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        <Phone className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-semibold text-sm text-gray-900">Call Us Now</p>
                          <p className="text-xs text-gray-500">{SITE_CONFIG.contact.mobile}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Our Location</h3>
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.566!2d77.318!3d28.593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzM0LjgiTiA3N8KwMTknMDQuOCJF!5e0!3m2!1sen!2sin!4v1"
                      width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade" className="w-full h-full"
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600">C-104, 2nd Floor, Sector-10, Noida, UP - 201301</p>
                  </div>
                </div>

                {/* Social */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a key={index} href={social.href} target="_blank" rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 transition-all ${social.color}`}
                        aria-label={social.label}>
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* RFP Request — Section 2.11 alignment */}
                <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wider">Request RFP Document</h3>
                  <p className="text-[10px] text-gray-600 mb-4 leading-relaxed font-semibold">
                    Institutions requiring a comprehensive descriptive evaluation for large-scale
                    multi-lab installations can request our official RFP documentation and technical specifications.
                  </p>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, interest: "RFP Request", message: "I would like to request the official RFP documentation and technical specifications for our institution." }));
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    className="w-full py-2.5 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Submit Request <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA — Contained card */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-3xl font-bold text-white mb-3">
                Ready to Transform <span className="text-orange-400">Your School?</span>
              </h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Join 300+ schools that have partnered with STEMmantra for world-class STEM education.
                All our labs are NEP 2020 & NCF 2023 aligned.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/programs"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors">
                  Explore Programs
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
