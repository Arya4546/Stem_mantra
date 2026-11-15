"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

/** Styled, keyboard-accessible replacement for a native <select>. */
export default function FormSelect({ id, name, value, options, onChange, placeholder = "Select an option", required }: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number; width: number; above: boolean } | null>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (wrapRef.current && !wrapRef.current.contains(t) && !(listRef.current && listRef.current.contains(t))) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
    };
  }, [open]);

  // Render the list in a portal so it is never clipped by a card's overflow:hidden
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const r = wrapRef.current?.getBoundingClientRect();
      if (!r) return;
      const listH = Math.min(288, options.length * 44 + 12);
      const above = window.innerHeight - r.bottom < listH + 16 && r.top > listH + 16;
      setPos({ left: r.left, top: above ? r.top - 8 : r.bottom + 8, width: r.width, above });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, options.length]);

  const openList = () => {
    setHighlight(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openList();
      setHighlight((h) => Math.min(options.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      setHighlight((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) return openList();
      if (highlight >= 0) choose(options[highlight].value);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      {/* Hidden input keeps native `required` validation working */}
      <input
        tabIndex={-1}
        aria-hidden
        required={required}
        name={name}
        value={value}
        onChange={() => {}}
        onFocus={() => document.getElementById(id)?.focus()}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      />
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg border bg-white text-left text-sm transition-colors focus:outline-none ${
          open ? "border-orange-500 ring-1 ring-orange-500" : "border-gray-200 hover:border-orange-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        }`}
      >
        <span className={selected || value ? "text-gray-900" : "text-gray-400"}>{selected?.label ?? (value || placeholder)}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180 text-orange-500" : ""}`} />
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && pos && (
              <motion.ul
                ref={listRef}
                role="listbox"
                initial={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: pos.above ? 6 : -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "fixed",
                  left: pos.left,
                  width: pos.width,
                  top: pos.above ? undefined : pos.top,
                  bottom: pos.above ? window.innerHeight - pos.top : undefined,
                }}
                className="z-[100] max-h-72 overflow-auto rounded-xl bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
              >
                {options.map((o, i) => {
                  const isSelected = o.value === value;
                  return (
                    <li
                      key={o.value}
                      role="option"
                      aria-selected={isSelected}
                      onMouseEnter={() => setHighlight(i)}
                      onClick={() => choose(o.value)}
                      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
                        isSelected ? "bg-orange-50 text-orange-700 font-semibold" : i === highlight ? "bg-gray-50 text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {o.label}
                      {isSelected && <Check className="w-4 h-4 text-orange-500 shrink-0" />}
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
