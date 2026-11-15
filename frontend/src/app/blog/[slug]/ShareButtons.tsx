"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: FaWhatsapp, cls: "hover:bg-green-500" },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: FaLinkedinIn, cls: "hover:bg-sky-700" },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: FaXTwitter, cls: "hover:bg-black" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FaFacebookF, cls: "hover:bg-blue-600" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-semibold text-gray-500 mr-1">Share</span>
      {links.map(({ label, href, Icon, cls }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className={`w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:text-white flex items-center justify-center transition-colors ${cls}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard blocked */
          }
        }}
        aria-label="Copy link"
        className="w-10 h-10 rounded-full bg-gray-100 text-gray-700 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-colors"
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
