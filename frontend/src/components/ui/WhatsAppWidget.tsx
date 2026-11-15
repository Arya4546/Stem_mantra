"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWhatsapp,
  FaTimes,
  FaPaperPlane,
  FaPhoneAlt,
  FaFlask,
  FaRobot,
  FaChalkboardTeacher,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { SITE_CONFIG } from "@/lib/constants";
import logoIcon from "@/app/icon.png";

const WHATSAPP_NUMBER = "916356631515";
const SEEN_KEY = "stemmantra_wa_teaser_seen";

const topics: { icon: IconType; label: string; tint: string; message: string }[] = [
  { icon: FaFlask, label: "Set up a STEM / ATL Lab", tint: "bg-orange-100 text-orange-600", message: "I want to set up a STEM / ATL Lab in my school." },
  { icon: FaRobot, label: "Robotics & AI programs", tint: "bg-teal-100 text-teal-600", message: "I would like to know about your Robotics & AI programs." },
  { icon: FaChalkboardTeacher, label: "Teacher training", tint: "bg-blue-100 text-blue-600", message: "I am interested in teacher training with STEMmantra." },
  { icon: FaCalendarCheck, label: "Book a free demo", tint: "bg-purple-100 text-purple-600", message: "I would like to book a free demo for my school." },
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [typing, setTyping] = useState(true);
  const [name, setName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const buildLink = (message: string) => {
    const greeting = name.trim() ? `Hi, I'm ${name.trim()}. ` : "Hi, ";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(greeting + message)}`;
  };

  // One gentle nudge per session: a small speech bubble beside the launcher.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
    } catch {
      /* storage unavailable */
    }
    const show = setTimeout(() => setShowTeaser(true), 5000);
    const hide = setTimeout(() => setShowTeaser(false), 16000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // "Typing…" indicator before the greeting appears, like a real chat.
  useEffect(() => {
    if (!isOpen) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 900);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    // Close when clicking or tapping anywhere outside the widget
    const onOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [isOpen]);

  const toggle = () => {
    setIsOpen((v) => !v);
    setShowTeaser(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div ref={containerRef} className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Chat with STEMmantra on WhatsApp"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{ transformOrigin: "bottom right" }}
            className="w-[calc(100vw-2rem)] sm:w-[370px] max-h-[calc(100vh-7rem)] overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-5 py-5 text-white">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-500/30 blur-2xl" />
              <div className="absolute -bottom-12 -left-8 w-36 h-36 rounded-full bg-teal-500/20 blur-2xl" />
              <button
                onClick={toggle}
                aria-label="Close chat"
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
              <div className="relative flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-full bg-white p-1.5 shadow-lg ring-2 ring-orange-400/70">
                    <Image src={logoIcon} alt="STEMmantra" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#25D366] ring-2 ring-slate-800" />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 font-bold text-lg leading-tight">
                    STEMmantra <FaCheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" aria-label="Verified" />
                  </p>
                  <p className="text-xs text-gray-300">Robotics, AI &amp; STEM Lab experts</p>
                </div>
              </div>
            </div>

            {/* Chat body */}
            <div className="bg-[#efeae2] px-4 py-5 min-h-[120px]">
              <AnimatePresence mode="wait" initial={false}>
                {typing ? (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm"
                    aria-label="Typing"
                  >
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="msg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-gray-700 leading-relaxed shadow-sm"
                  >
                    <p className="text-xs font-bold text-orange-600 mb-1">STEMmantra</p>
                    👋 Hi there! How can we help you today? Choose a topic below and we&apos;ll open WhatsApp with your message ready.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-2.5">
              {topics.map((t) => (
                <a
                  key={t.label}
                  href={buildLink(t.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-800 hover:border-[#25D366] hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.tint}`}>
                    <t.icon className="w-4 h-4" />
                  </span>
                  <span className="flex-1">{t.label}</span>
                  <FaWhatsapp className="w-5 h-5 text-gray-300 group-hover:text-[#25D366] transition-colors" />
                </a>
              ))}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.open(buildLink("I am interested in STEMmantra programs."), "_blank", "noopener,noreferrer");
                }}
                className="flex items-center gap-2 pt-1"
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  maxLength={40}
                  className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-[#25D366] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#25D366]/15 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Start WhatsApp chat"
                  className="shrink-0 w-11 h-11 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white flex items-center justify-center shadow-md transition-colors"
                >
                  <FaPaperPlane className="w-4 h-4 -ml-0.5" />
                </button>
              </form>

              <a
                href={`tel:${SITE_CONFIG.contact.mobile}`}
                className="flex items-center justify-center gap-2 pt-1 text-xs font-semibold text-gray-500 hover:text-orange-600 transition-colors"
              >
                <FaPhoneAlt className="w-3 h-3" /> Prefer a call? Talk to us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teaser bubble */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.button
            onClick={toggle}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative max-w-[240px] rounded-2xl rounded-br-sm bg-white px-4 py-3 text-left text-sm font-medium text-gray-800 shadow-xl ring-1 ring-black/5"
          >
            <span className="block text-xs font-bold text-orange-600">STEMmantra</span>
            Need help with a STEM lab for your school? Chat with us 👋
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <button
        onClick={toggle}
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        aria-expanded={isOpen}
        className="group relative flex items-center gap-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-xl shadow-green-700/30 transition-all hover:scale-105 active:scale-95 h-14 pl-2 pr-2 sm:pr-5"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        )}
        <span className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
          {isOpen ? (
            <FaTimes className="w-5 h-5 text-gray-700" />
          ) : (
            <FaWhatsapp className="w-7 h-7 text-[#25D366]" />
          )}
        </span>
        <span className="relative hidden sm:inline text-sm font-bold">{isOpen ? "Close" : "Chat with us"}</span>
      </button>
    </div>
  );
}
