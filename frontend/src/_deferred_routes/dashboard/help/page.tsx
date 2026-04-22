"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  FileText,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  BookOpen,
  ShoppingBag,
  CreditCard,
  User,
  Settings,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { toast } from "sonner";

// ============================================
// Types
// ============================================

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ============================================
// FAQ Data
// ============================================

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, browse our courses page, select the course you're interested in, and click the 'Enroll Now' button. If it's a paid course, you'll be directed to complete the payment process.",
    category: "courses",
  },
  {
    id: "2",
    question: "Can I get a refund for a course?",
    answer: "Yes, we offer a 7-day refund policy for paid courses. If you're not satisfied with the course, contact our support team within 7 days of purchase for a full refund.",
    category: "courses",
  },
  {
    id: "3",
    question: "How do I track my order?",
    answer: "You can track your order from the 'My Orders' section in your dashboard. Click on any order to see its current status and tracking information.",
    category: "orders",
  },
  {
    id: "4",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and popular wallets. Cash on Delivery is also available for physical products.",
    category: "payments",
  },
  {
    id: "5",
    question: "How do I update my profile information?",
    answer: "Go to your Profile page from the sidebar or settings. Click 'Edit Profile' to update your personal information, contact details, or profile picture.",
    category: "account",
  },
  {
    id: "6",
    question: "How do I reset my password?",
    answer: "Go to Settings > Security and click on 'Change Password'. You'll need to enter your current password and then set a new one.",
    category: "account",
  },
  {
    id: "7",
    question: "Do you offer certificates?",
    answer: "Yes! Upon successful completion of a course, you'll receive a digital certificate that you can download and share on your profile or LinkedIn.",
    category: "courses",
  },
  {
    id: "8",
    question: "What is the delivery time for products?",
    answer: "Standard delivery takes 5-7 business days. Express delivery (available in select areas) takes 2-3 business days. You'll receive tracking information once your order ships.",
    category: "orders",
  },
];

const categories = [
  { id: "all", label: "All Topics", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "courses", label: "Courses", icon: <BookOpen className="w-4 h-4" /> },
  { id: "orders", label: "Orders", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "payments", label: "Payments", icon: <CreditCard className="w-4 h-4" /> },
  { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
];

// ============================================
// Animation Variants
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ============================================
// Help Page Component
// ============================================

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent! We'll get back to you soon.");
      setContactForm({ subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
            How can we help you?
          </h1>
          <p className="text-slate-600 mt-2">
            Search our knowledge base or browse categories below
          </p>

          {/* Search */}
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Link
            href="/contact"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="p-3 bg-primary/10 rounded-full">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <span className="font-medium text-slate-900">Contact Us</span>
          </Link>
          <Link
            href="mailto:support@stemmantra.com"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="p-3 bg-green-100 rounded-full">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <span className="font-medium text-slate-900">Email Support</span>
          </Link>
          <Link
            href="tel:+916356631515"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="p-3 bg-blue-100 rounded-full">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <span className="font-medium text-slate-900">Call Us</span>
          </Link>
          <Link
            href="/about"
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-primary hover:shadow-md transition-all"
          >
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <span className="font-medium text-slate-900">About Us</span>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* FAQ Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Frequently Asked Questions
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <motion.div
                    key={faq.id}
                    layout
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="font-medium text-slate-900">
                        {faq.question}
                      </span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                      >
                        <p className="text-slate-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 bg-white rounded-xl border border-slate-200">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600">
                    No results found. Try a different search term.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Still need help?
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Can&apos;t find what you&apos;re looking for? Send us a message and we&apos;ll get
                back to you as soon as possible.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, subject: e.target.value })
                    }
                    placeholder="What do you need help with?"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    placeholder="Describe your issue..."
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="text-sm font-medium text-slate-900 mb-3">
                  Or reach us directly
                </h4>
                <div className="space-y-2 text-sm">
                  <a
                    href="mailto:support@stemmantra.com"
                    className="flex items-center gap-2 text-slate-600 hover:text-primary"
                  >
                    <Mail className="w-4 h-4" />
                    support@stemmantra.com
                  </a>
                  <a
                    href="tel:+916356631515"
                    className="flex items-center gap-2 text-slate-600 hover:text-primary"
                  >
                    <Phone className="w-4 h-4" />
                    +91 6356631515
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </UserLayout>
  );
}
