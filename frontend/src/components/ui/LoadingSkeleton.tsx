"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Wifi, WifiOff } from "lucide-react";

interface LoadingSkeletonProps {
  count?: number;
  type?: "card" | "blog" | "gallery" | "product" | "list";
  className?: string;
}

export default function LoadingSkeleton({
  count = 6,
  type = "card",
  className = "",
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const cardSkeleton = (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
      <div className="aspect-video bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
        <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-slate-200 rounded animate-pulse w-20" />
          <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-24" />
        </div>
      </div>
    </div>
  );

  const blogSkeleton = (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
      <div className="aspect-[16/9] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-3 bg-slate-200 rounded-full animate-pulse w-16" />
          <div className="h-3 bg-slate-100 rounded-full animate-pulse w-24" />
        </div>
        <div className="h-6 bg-slate-200 rounded animate-pulse w-full" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
          <div className="h-4 bg-slate-100 rounded animate-pulse w-5/6" />
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
          <div className="space-y-1">
            <div className="h-4 bg-slate-200 rounded animate-pulse w-24" />
            <div className="h-3 bg-slate-100 rounded animate-pulse w-16" />
          </div>
        </div>
      </div>
    </div>
  );

  const gallerySkeleton = (
    <div className="relative aspect-square bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 rounded-xl overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );

  const productSkeleton = (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
      <div className="aspect-square bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-slate-100 rounded animate-pulse w-1/3" />
        <div className="h-5 bg-slate-200 rounded animate-pulse w-full" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-slate-200 rounded animate-pulse w-20" />
          <div className="h-5 bg-slate-100 rounded-full animate-pulse w-16" />
        </div>
      </div>
    </div>
  );

  const listSkeleton = (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-slate-100">
      <div className="w-16 h-16 rounded-lg bg-slate-200 animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-100 rounded animate-pulse w-1/2" />
      </div>
      <div className="h-8 bg-slate-200 rounded-lg animate-pulse w-20" />
    </div>
  );

  const getSkeleton = () => {
    switch (type) {
      case "blog":
        return blogSkeleton;
      case "gallery":
        return gallerySkeleton;
      case "product":
        return productSkeleton;
      case "list":
        return listSkeleton;
      default:
        return cardSkeleton;
    }
  };

  const getGridClasses = () => {
    switch (type) {
      case "blog":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      case "gallery":
        return "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4";
      case "product":
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";
      case "list":
        return "flex flex-col space-y-4";
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {skeletons.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          {getSkeleton()}
        </motion.div>
      ))}
    </div>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      {icon && (
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 max-w-md mb-6">{description}</p>
      )}
      {action}
    </motion.div>
  );
}

// Error state component
interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load the content. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <WifiOff className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md mb-6">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
}

// Loading spinner component
interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-3">
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
      {text && <span className="text-sm text-slate-500">{text}</span>}
    </div>
  );
}

// Full page loader
export function PageLoader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
        >
          <span className="text-white text-2xl font-bold">SM</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-slate-600 font-medium"
        >
          Loading...
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
