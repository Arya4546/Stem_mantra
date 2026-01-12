"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to lock body scroll when a modal is open.
 * Uses position: fixed approach which is more reliable than overflow: hidden
 * and properly preserves scroll position when modal closes.
 */
export function useBodyScrollLock(isLocked: boolean) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isLocked) {
      // Store current scroll position
      scrollYRef.current = window.scrollY;
      
      // Apply styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.width = "100%";
    } else {
      // Restore styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      
      // Restore scroll position
      window.scrollTo(0, scrollYRef.current);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
