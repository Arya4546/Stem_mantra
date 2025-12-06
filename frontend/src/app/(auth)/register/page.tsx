"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Shield } from "lucide-react";
import { apiClient } from "@/lib/api";

// Validation schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type OTPFormData = z.infer<typeof otpSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Email form
  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", firstName: "" },
  });

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  // Handle email submission
  const handleEmailSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    try {
      await apiClient.post("/auth/register/send-otp", {
        email: data.email,
        firstName: data.firstName,
      });
      
      setEmail(data.email);
      setFirstName(data.firstName);
      setStep("otp");
      setCountdown(60);
      toast.success("OTP sent to your email!");
    } catch (error) {
      // Error handled by API interceptor
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
    
    // Auto-focus next input
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
      const response = await apiClient.post<{
        user: { id: string; email: string; firstName: string };
        accessToken: string;
        refreshToken: string;
      }>("/auth/register/verify-otp", {
        email,
        otp,
        firstName,
      });
      
      // Store tokens
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      
      setStep("success");
      toast.success("Account created successfully!");
      
      // Redirect after animation
      setTimeout(() => router.push(redirect), 2000);
    } catch (error) {
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
      await apiClient.post("/auth/register/send-otp", {
        email,
        firstName,
      });
      setCountdown(60);
      setOtpValues(["", "", "", "", "", ""]);
      toast.success("New OTP sent!");
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute w-20 h-20 bg-white/10 rounded-2xl"
              style={{
                left: `${20 + i * 15}%`,
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
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <span className="text-primary font-bold text-xl">SM</span>
              </div>
              <span className="text-2xl font-bold">STEM Mantra</span>
            </Link>

            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Start Your Journey to
              <br />
              <span className="text-yellow-300">Innovation Today</span>
            </h1>
            
            <p className="text-white/80 text-lg mb-8 max-w-md">
              Join thousands of students learning robotics, AI, and STEM skills 
              with hands-on projects and expert guidance.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Access to 100+ courses and projects",
                "Learn from industry experts",
                "Get certified and stand out",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-yellow-300" />
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">SM</span>
              </div>
              <span className="text-xl font-bold text-slate-900">STEM Mantra</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Email */}
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                  <p className="text-slate-600">
                    Enter your details to get started
                  </p>
                </div>

                <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      {...emailForm.register("firstName")}
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    {emailForm.formState.errors.firstName && (
                      <p className="mt-1 text-sm text-red-500">
                        {emailForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>

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
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
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
                    className="w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Continue <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-slate-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>

                {/* Social signup divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-slate-50 text-slate-500">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Social buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                    <Image src="/images/google.svg" alt="Google" width={20} height={20} />
                    <span className="text-sm font-medium text-slate-600">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                    <Image src="/images/microsoft.svg" alt="Microsoft" width={20} height={20} />
                    <span className="text-sm font-medium text-slate-600">Microsoft</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: OTP Verification */}
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
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Verify Your Email</h2>
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
                      className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  ))}
                </div>

                <button
                  onClick={handleOtpSubmit}
                  disabled={isLoading || otpValues.some((v) => !v)}
                  className="w-full py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Verify & Create Account <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-slate-600">
                    Didn&apos;t receive the code?{" "}
                    <button
                      onClick={handleResendOtp}
                      disabled={countdown > 0 || isLoading}
                      className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, delay: 0.2 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </motion.div>

                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    Welcome to STEM Mantra!
                  </h2>
                  <p className="text-slate-600">
                    Your account has been created successfully.
                    <br />
                    Redirecting to your dashboard...
                  </p>
                </div>

                <div className="flex justify-center">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-slate-500">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
