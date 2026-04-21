"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowLeft,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  GraduationCap,
  Lightbulb,
  Cpu,
  Cog,
  Brain,
  Wifi,
  Code,
  Target,
  Calendar,
  Award,
  Heart,
  IndianRupee,
  CreditCard,
  Shield,
  Loader2,
} from "lucide-react";
import { UserLayout } from "@/components/user/UserLayout";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

// ============================================
// Types
// ============================================

interface Program {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: string;
  status: string;
  image?: string;
  thumbnail?: string;
  duration?: string;
  gradeLevel?: string;
  features?: string[];
  learningOutcomes?: string[];
  prerequisites?: string[];
  curriculum?: string[];
  isFeatured?: boolean;
  price?: number;
  discountPrice?: number;
  _count?: {
    courses?: number;
    enrollments?: number;
  };
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface EnrollmentPaymentResponse {
  programId: string;
  programName: string;
  amount: number;
  originalPrice: number;
  currency: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
  enrollmentOrderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// ============================================
// Program Type Config
// ============================================

const programTypeConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string; label: string }> = {
  ATL_LAB: {
    icon: <Lightbulb className="w-5 h-5" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    label: "ATL Lab",
  },
  ROBOTICS_LAB: {
    icon: <Cpu className="w-5 h-5" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    label: "Robotics Lab",
  },
  STEM_LAB: {
    icon: <Cog className="w-5 h-5" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    label: "STEM Lab",
  },
  AI_ML: {
    icon: <Brain className="w-5 h-5" />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    label: "AI & ML",
  },
  IOT: {
    icon: <Wifi className="w-5 h-5" />,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    label: "IoT",
  },
  CODING: {
    icon: <Code className="w-5 h-5" />,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    label: "Coding",
  },
};

// ============================================
// Course Detail Page Component
// ============================================

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProgram();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (program?.id) {
      checkEnrollment();
      checkWishlist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program?.id]);

  const fetchProgram = async () => {
    setIsLoading(true);
    try {
      const programData = await apiClient.get<Program>(`/programs/slug/${slug}`);
      setProgram(programData);
    } catch (error) {
      console.error("Error fetching program:", error);
      toast.error("Program not found");
      router.push("/dashboard/courses");
    } finally {
      setIsLoading(false);
    }
  };

  const checkEnrollment = async () => {
    try {
      const enrollments = await apiClient.get<{ programId: string }[]>("/enrollments/me");
      const enrolled = enrollments?.some((e) => e.programId === program?.id);
      setIsEnrolled(enrolled || false);
    } catch {
      // Not enrolled or not logged in
    }
  };

  const checkWishlist = async () => {
    try {
      const result = await apiClient.get<{ isInWishlist: boolean }>(
        `/wishlist/check?type=program&itemId=${program?.id}`
      );
      setIsInWishlist(result?.isInWishlist || false);
    } catch {
      // Wishlist may not exist
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  // Initialize Razorpay payment for enrollment
  const initializeEnrollmentPayment = useCallback(async () => {
    if (!program) return;

    setIsEnrolling(true);
    try {
      // Get payment data from backend
      const paymentData = await apiClient.post<EnrollmentPaymentResponse>("/payments/enrollment/initiate", {
        programId: program.id,
      });

      const options = {
        key: paymentData.razorpayKeyId,
        amount: paymentData.amount * 100,
        currency: paymentData.currency,
        name: "STEMmantra",
        description: `Enrollment: ${paymentData.programName}`,
        order_id: paymentData.razorpayOrderId,
        prefill: {
          name: paymentData.customerName,
          email: paymentData.customerEmail,
          contact: paymentData.customerPhone,
        },
        notes: {
          programId: program.id,
          programName: program.name,
        },
        theme: {
          color: "#6366f1",
        },
        handler: async function (response: RazorpayResponse) {
          try {
            await apiClient.post("/payments/enrollment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              programId: program.id,
            });
            toast.success("Payment successful! You are now enrolled.");
            setIsEnrolled(true);
            router.push("/dashboard/enrollments");
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
            setIsEnrolling(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsEnrolling(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsEnrolling(false);
      });

      rzp.open();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to initiate payment");
      setIsEnrolling(false);
    }
  }, [program, router]);

  const handleEnroll = async () => {
    if (!program) return;

    // Check if program is free or paid
    const price = program.discountPrice || program.price;

    if (price && price > 0) {
      // Paid program - use Razorpay
      await initializeEnrollmentPayment();
    } else {
      // Free program - direct enrollment
      setIsEnrolling(true);
      try {
        await apiClient.post("/enrollments", {
          programId: program.id,
        });
        setIsEnrolled(true);
        toast.success("Successfully enrolled in the program!");
        router.push("/dashboard/enrollments");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to enroll");
      } finally {
        setIsEnrolling(false);
      }
    }
  };

  const handleToggleWishlist = async () => {
    if (!program) return;

    setIsTogglingWishlist(true);
    try {
      if (isInWishlist) {
        await apiClient.delete(`/wishlist/program/${program.id}`);
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await apiClient.post("/wishlist", {
          type: "program",
          itemId: program.id,
        });
        setIsInWishlist(true);
        toast.success("Added to wishlist!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update wishlist");
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  const getTypeConfig = (type: string) => {
    return (
      programTypeConfig[type] || {
        icon: <BookOpen className="w-5 h-5" />,
        color: "text-slate-600",
        bgColor: "bg-slate-50",
        label: type,
      }
    );
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 w-32 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-64 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-48 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </UserLayout>
    );
  }

  if (!program) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto text-center py-16">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Program Not Found</h2>
          <p className="text-slate-600 mb-6">The program you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/dashboard/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Programs
          </Link>
        </div>
      </UserLayout>
    );
  }

  const typeConfig = getTypeConfig(program.type);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Programs
        </button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/10 to-secondary/10">
            {(program.thumbnail && program.thumbnail.length > 0) || (program.image && program.image.length > 0) ? (
              <Image
                src={program.thumbnail || program.image || ""}
                alt={program.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-3xl ${typeConfig.bgColor} flex items-center justify-center`}>
                  <span className={`${typeConfig.color} scale-[3]`}>{typeConfig.icon}</span>
                </div>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 right-4 flex gap-2">
              {program.isFeatured && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500 text-white text-sm font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  Featured
                </span>
              )}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${typeConfig.bgColor} ${typeConfig.color} text-sm font-semibold`}>
                {typeConfig.icon}
                {typeConfig.label}
              </span>
            </div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{program.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                {program.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {program.duration}
                  </span>
                )}
                {program.gradeLevel && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    {program.gradeLevel}
                  </span>
                )}
                {program._count?.enrollments !== undefined && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {program._count.enrollments} Students
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Description */}
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-lg text-slate-600 leading-relaxed">{program.description}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Price Display */}
              {(program.price || program.discountPrice) && (
                <div className="flex items-center gap-3">
                  {program.discountPrice && program.price && program.discountPrice < program.price ? (
                    <>
                      <span className="text-2xl font-bold text-slate-900">
                        {formatPrice(program.discountPrice)}
                      </span>
                      <span className="text-lg text-slate-400 line-through">
                        {formatPrice(program.price)}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-lg">
                        {calculateDiscount(program.price, program.discountPrice)}% OFF
                      </span>
                    </>
                  ) : program.price && program.price > 0 ? (
                    <span className="text-2xl font-bold text-slate-900">
                      {formatPrice(program.price)}
                    </span>
                  ) : (
                    <span className="text-2xl font-bold text-green-600">Free</span>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-1 gap-3 w-full sm:w-auto">
                {isEnrolled ? (
                  <Link
                    href="/dashboard/enrollments"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Already Enrolled - Go to My Courses
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isEnrolling ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (program.discountPrice || program.price) && (program.discountPrice || program.price)! > 0 ? (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Enroll Now - {formatPrice(program.discountPrice || program.price || 0)}
                      </>
                    ) : (
                      "Enroll Now - Free"
                    )}
                  </button>
                )}
                <button
                  onClick={handleToggleWishlist}
                  disabled={isTogglingWishlist}
                  className={`px-4 py-3 rounded-xl border transition-colors flex items-center justify-center gap-2 ${isInWishlist
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {/* Payment Trust Badges */}
            {(program.discountPrice || program.price) && (program.discountPrice || program.price)! > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  UPI / Cards / NetBanking
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Features & Outcomes */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Features */}
          {program.features && program.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Key Features
              </h2>
              <ul className="space-y-3">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Learning Outcomes */}
          {program.learningOutcomes && program.learningOutcomes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
            >
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                What You&apos;ll Learn
              </h2>
              <ul className="space-y-3">
                {program.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>

        {/* Prerequisites */}
        {program.prerequisites && program.prerequisites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Prerequisites
            </h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {program.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-center gap-2 text-slate-600">
                  <div className="w-2 h-2 rounded-full bg-primary/60" />
                  {prereq}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Curriculum */}
        {program.curriculum && program.curriculum.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
          >
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Curriculum
            </h2>
            <div className="space-y-3">
              {program.curriculum.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary font-semibold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-2">Ready to Start Learning?</h2>
          <p className="text-white/80 mb-6">
            Join thousands of students who are already building the future with STEMmantra
          </p>

          {/* Price Display in CTA */}
          {(program.discountPrice || program.price) && (program.discountPrice || program.price)! > 0 && (
            <div className="mb-6">
              {program.discountPrice && program.price && program.discountPrice < program.price ? (
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-bold">{formatPrice(program.discountPrice)}</span>
                  <span className="text-xl text-white/60 line-through">{formatPrice(program.price)}</span>
                </div>
              ) : (
                <span className="text-3xl font-bold">{formatPrice(program.price || 0)}</span>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isEnrolled ? (
              <Link
                href="/dashboard/enrollments"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Go to My Courses
              </Link>
            ) : (
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isEnrolling ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Enroll Now"
                )}
              </button>
            )}
            <Link
              href="/contact"
              className="px-8 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        strategy="lazyOnload"
      />
    </UserLayout>
  );
}
