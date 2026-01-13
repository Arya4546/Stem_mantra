"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface RouteLoadingContextType {
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
}

const RouteLoadingContext = createContext<RouteLoadingContextType>({
    isLoading: false,
    startLoading: () => { },
    stopLoading: () => { },
});

export const useRouteLoading = () => useContext(RouteLoadingContext);

export function RouteLoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Stop loading when route changes
        setIsLoading(false);
    }, [pathname, searchParams]);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);

    return (
        <RouteLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {/* Loading Bar */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-teal-500 to-orange-500 z-[100] origin-left"
                        style={{
                            backgroundSize: "200% 100%",
                            animation: "gradient-shift 1.5s ease infinite",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Loading Overlay for longer loads */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.5 }}
                        className="fixed inset-0 z-[99] bg-white/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            {/* Animated Logo Spinner */}
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-orange-200" />
                                <motion.div
                                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <p className="text-gray-600 font-medium">Loading...</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {children}

            {/* Add keyframes for gradient animation */}
            <style jsx global>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
        </RouteLoadingContext.Provider>
    );
}
