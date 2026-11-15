import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: { absolute: "Sign in | STEMmantra Admin" },
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] flex bg-slate-50 font-sans">
      {/* Left: illustration & message (desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center items-center p-12 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/login-bg.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-left" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/30 to-orange-900/40" />
        <div className="relative z-10 text-center max-w-lg">
          <h2 className="text-5xl xl:text-6xl font-extrabold mb-6 text-white tracking-tight leading-tight">
            Manage <br />
            <span className="text-orange-300">STEMmantra.com</span>
          </h2>
          <p className="text-xl text-white/95 font-medium leading-relaxed">
            Publish blog posts, update the gallery, add clients and testimonials, and follow up on every enquiry.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <div className="bg-white/10 text-white px-6 py-3 rounded-2xl text-sm font-bold tracking-wider uppercase border border-white/20 backdrop-blur-sm">
              Website Admin
            </div>
            <div className="bg-orange-500/90 text-white px-6 py-3 rounded-2xl text-sm font-bold tracking-wider uppercase border border-orange-400/40">
              Secure Access
            </div>
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 sm:p-16 relative">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
