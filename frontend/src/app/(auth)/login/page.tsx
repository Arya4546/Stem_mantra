"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Lock, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

// Validation schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

// Loading component for Suspense
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-600" />
        <p className="text-slate-600">Loading...</p>
      </div>
    </div>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const { login, loginWithOTP, sendOTP, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();

  const [loginMethod, setLoginMethod] = useState<"otp" | "password">("otp");
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      // Redirect admin users to admin dashboard
      if (isAdmin && redirect === "/dashboard") {
        router.push("/admin");
      } else {
        router.push(redirect);
      }
    }
  }, [authLoading, isAuthenticated, isAdmin, redirect, router]);

  // Forms
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { email: "", password: "" },
  });

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Handle email submission (OTP method)
  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      const result = await sendOTP(data.email, "login");
      if (result.success) {
        setEmail(data.email);
        setStep("otp");
        setCountdown(60);
        // In development, show OTP for testing
        if (result.otp) {
          toast.info(`Development OTP: ${result.otp}`, { duration: 10000 });
        }
      }
    } catch {
      // Error handled by auth provider
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password login
  const handlePasswordSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      if (success) {
        // Redirect will be handled by the useEffect above
      }
    } catch {
      // Error handled by auth provider
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(-1);
    setOtpValues(newOtpValues);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtpValues = [...otpValues];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newOtpValues[i] = char;
    });
    setOtpValues(newOtpValues);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  // Handle OTP verification
  const handleOtpSubmit = async () => {
    const otp = otpValues.join("");
    if (otp.length !== 6) {
      toast.error("Please enter the complete OTP");
      return;
    }

    setIsLoading(true);
    try {
      const success = await loginWithOTP(email, otp);
      if (success) {
        // Redirect will be handled by the useEffect above
      }
    } catch {
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      const result = await sendOTP(email, "login");
      if (result.success) {
        setCountdown(60);
        setOtpValues(["", "", "", "", "", ""]);
        // In development, show OTP for testing
        if (result.otp) {
          toast.info(`Development OTP: ${result.otp}`, { duration: 10000 });
        }
      }
    } catch {
      // Error handled by auth provider
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Panel - Decorative (Fixed) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-teal-600 overflow-hidden fixed inset-y-0 left-0">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />

        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-20 h-20 bg-white/10 rounded-2xl backdrop-blur-sm"
              style={{
                right: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-orange-600 font-bold text-xl">SM</span>
              </div>
              <span className="text-2xl font-bold">STEMmantra</span>
            </Link>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Welcome Back,
              <br />
              <span className="text-teal-300">Future Innovator!</span>
            </h1>

            <p className="text-white/80 text-lg mb-8 max-w-md">
              Continue your learning journey and explore new courses,
              projects, and opportunities in STEM education.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: "50K+", label: "Students" },
                { value: "500+", label: "Schools" },
                { value: "100+", label: "Courses" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-teal-300">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form (Scrollable) */}
      <div className="w-full lg:w-1/2 lg:ml-[50%] min-h-screen overflow-y-auto flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md my-auto py-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">SM</span>
              </div>
              <span className="text-xl font-bold text-slate-900">STEMmantra</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {/* Email Step (for OTP) or Password Login */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign In</h2>
                  <p className="text-slate-600">
                    Welcome back! Please enter your details
                  </p>
                </div>

                {/* Login method toggle */}
                <div className="flex bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setLoginMethod("otp")}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === "otp"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    OTP Login
                  </button>
                  <button
                    onClick={() => setLoginMethod("password")}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === "password"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    Password Login
                  </button>
                </div>

                {loginMethod === "otp" ? (
                  <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          {...emailForm.register("email")}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                      </div>
                      {emailForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {emailForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Send OTP <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          {...passwordForm.register("email")}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                      </div>
                      {passwordForm.formState.errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {passwordForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          {...passwordForm.register("password")}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {passwordForm.formState.errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                          {passwordForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500" />
                        <span className="text-sm text-slate-600">Remember me</span>
                      </label>
                      <Link href="/forgot-password" className="text-sm text-orange-600 hover:underline font-medium">
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Sign In <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="text-center">
                  <p className="text-slate-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-orange-600 font-semibold hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>
              </motion.div>
            )}

            {/* OTP Verification Step */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <button
                  onClick={() => setStep("email")}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </button>

                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Enter OTP</h2>
                  <p className="text-slate-600">
                    We&apos;ve sent a 6-digit code to
                    <br />
                    <span className="font-semibold text-slate-900">{email}</span>
                  </p>
                </div>

                {/* OTP Input */}
                <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                  {otpValues.map((value, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={value}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={handleOtpSubmit}
                  disabled={isLoading || otpValues.some((v) => !v)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify & Sign In <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-slate-600">
                    Didn&apos;t receive the code?{" "}
                    <button
                      onClick={handleResendOtp}
                      disabled={countdown > 0 || isLoading}
                      className="text-orange-600 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            Protected by reCAPTCHA and subject to our{" "}
            <Link href="/terms" className="text-orange-600 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-orange-600 hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}
