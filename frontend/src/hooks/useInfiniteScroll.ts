"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient, PaginatedResponse } from "@/lib/api";

interface UseInfiniteScrollParams {
  queryKey: string[];
  endpoint: string;
  limit?: number;
  filters?: Record<string, string | number | boolean | undefined>;
  enabled?: boolean;
}

export function useInfiniteScroll<T>({
  queryKey,
  endpoint,
  limit = 12,
  filters = {},
  enabled = true,
}: UseInfiniteScrollParams) {
  return useInfiniteQuery({
    queryKey: [...queryKey, filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.append("page", String(pageParam));
      params.append("limit", String(limit));
      
      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          params.append(key, String(value));
        }
      });
      
      const response = await apiClient.get<PaginatedResponse<T>>(
        `${endpoint}?${params.toString()}`
      );
      
      return response;
    },
    getNextPageParam: (lastPage: PaginatedResponse<T>) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled,
  });
}

// Hook for detecting scroll to bottom
import { useEffect, useRef, useCallback } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  enabled = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<T>(null);
  const callbackRef = useRef<(() => void) | null>(null);

  const setCallback = useCallback((callback: () => void) => {
    callbackRef.current = callback;
  }, []);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && callbackRef.current) {
            callbackRef.current();
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [enabled, root, rootMargin, threshold]);

  return { ref, setCallback };
}
