"use client";

import { usePathname } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingDemoButton from "@/components/ui/FloatingDemoButton";

/** Smooth scrolling + the floating "Book a demo" button — public pages only, not /login or /admin. */
export default function PublicSiteExtras() {
  const pathname = usePathname() ?? "";
  if (pathname === "/login" || pathname.startsWith("/admin")) return null;
  return (
    <>
      <SmoothScroll />
      <FloatingDemoButton />
    </>
  );
}
