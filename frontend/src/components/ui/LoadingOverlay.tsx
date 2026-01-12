"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
}

export function LoadingOverlay({
  isLoading,
  message = "Loading...",
  fullScreen = true,
}: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`${
            fullScreen ? "fixed inset-0" : "absolute inset-0"
          } z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4"
          >
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-slate-700 font-medium">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to manage loading state with automatic reset
import { useState, useCallback } from "react";

export function useLoadingOverlay() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Loading...");

  const startLoading = useCallback((msg?: string) => {
    if (msg) setMessage(msg);
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setMessage("Loading...");
  }, []);

  const withLoading = useCallback(
    async <T,>(fn: () => Promise<T>, msg?: string): Promise<T> => {
      startLoading(msg);
      try {
        return await fn();
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return { isLoading, message, startLoading, stopLoading, withLoading };
}
