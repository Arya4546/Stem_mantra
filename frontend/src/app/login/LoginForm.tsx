"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { apiRequest, ApiError } from "@/lib/admin-api";

function safeNext(next: string | null): string {
  return next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(searchParams.get("expired") ? "Your session has ended. Please sign in again." : null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiRequest("/auth/login", { method: "POST", body: { email: email.trim(), password } });
      router.replace(safeNext(searchParams.get("next")));
      router.refresh();
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr.status === 429 ? "Too many sign-in attempts. Please wait a few minutes and try again." : apiErr.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600 mb-10">
        <ArrowLeft className="w-4 h-4" /> Back to website
      </Link>

      <Image src="/images/logo.png" alt="STEMmantra" width={2708} height={591} className="h-10 w-auto mb-10" priority />

      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-none">Welcome Back</h1>
        <p className="text-slate-500 text-lg font-medium">Enter your credentials to access the admin portal</p>
      </div>

      {error && (
        <div role="alert" className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl mb-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold text-slate-500 tracking-wide uppercase ml-2">
            Email Address
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
            <input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="admin@stemmantra.com"
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-xs font-bold text-slate-500 tracking-wide uppercase ml-2">
            Password
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full mt-4 py-4 rounded-2xl bg-orange-500 text-white text-lg font-bold border-[3px] border-orange-600 shadow-[0_6px_0_0_#c2410c] hover:shadow-[0_2px_0_0_#c2410c] hover:translate-y-1 active:shadow-none active:translate-y-1.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_6px_0_0_#c2410c]"
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-label="Signing in">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Access Portal <ShieldCheck size={20} />
            </span>
          )}
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-slate-200/70 text-center">
        <p className="text-slate-500 text-xs">
          &copy; {new Date().getFullYear()} STEMmantra. All rights reserved. <br />
          <span className="opacity-70 text-[10px] mt-1 inline-block uppercase tracking-widest font-bold">Authorised staff only</span>
        </p>
      </div>
    </div>
  );
}
