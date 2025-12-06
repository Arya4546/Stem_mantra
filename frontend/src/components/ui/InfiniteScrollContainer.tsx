"use client";

import { useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface InfiniteScrollContainerProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  className?: string;
  loadingComponent?: ReactNode;
  endMessage?: ReactNode;
  threshold?: number;
}

export default function InfiniteScrollContainer({
  children,
  onLoadMore,
  hasMore,
  isLoading,
  isFetchingNextPage,
  className = "",
  loadingComponent,
  endMessage,
  threshold = 200,
}: InfiniteScrollContainerProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingNextPage && !isLoading) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: `${threshold}px`,
        threshold: 0,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isFetchingNextPage, isLoading, onLoadMore, threshold]);

  const defaultLoadingComponent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-8 space-y-3"
    >
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <span className="text-sm text-slate-500">Loading more...</span>
    </motion.div>
  );

  const defaultEndMessage = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-8 space-y-2"
    >
      <span className="text-3xl">🎉</span>
      <span className="text-sm text-slate-500">You&apos;ve seen it all!</span>
    </motion.div>
  );

  return (
    <div className={className}>
      {children}
      
      {/* Loading indicator */}
      {(isLoading || isFetchingNextPage) && (
        loadingComponent || defaultLoadingComponent
      )}
      
      {/* End message */}
      {!hasMore && !isLoading && !isFetchingNextPage && (
        endMessage !== undefined ? endMessage : defaultEndMessage
      )}
      
      {/* Invisible trigger for intersection observer */}
      <div ref={loadMoreRef} className="h-1" aria-hidden="true" />
    </div>
  );
}
