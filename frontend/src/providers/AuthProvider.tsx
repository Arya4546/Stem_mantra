"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/admin", "/profile", "/settings"];

// Routes that should redirect to dashboard if authenticated
const authRoutes = ["/login", "/register", "/forgot-password"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return false;
    }

    try {
      // Decode token to get user info (simple decode, not verification)
      const payload = JSON.parse(atob(token.split(".")[1]));
      
      // Check if token is expired
      if (payload.exp * 1000 < Date.now()) {
        // Token expired, try to refresh
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/auth/refresh-token`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              localStorage.setItem("accessToken", data.data.accessToken);
              localStorage.setItem("refreshToken", data.data.refreshToken);
              setUser(data.data.user);
              setIsLoading(false);
              return true;
            }
          } catch {
            // Refresh failed
          }
        }
        
        // Clear tokens and redirect
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setIsLoading(false);
        return false;
      }

      // Token is valid, set user from payload
      setUser({
        id: payload.userId,
        email: payload.email,
        firstName: payload.firstName || "User",
        role: payload.role || "USER",
      });
      setIsLoading(false);
      return true;
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setIsLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Route protection
  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (isAuthRoute && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, pathname, router]);

  const login = (accessToken: string, refreshToken: string, userData: User) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
