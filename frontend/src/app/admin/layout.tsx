"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/admin");
      } else if (!isAdmin) {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
