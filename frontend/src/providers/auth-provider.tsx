"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { User, UserRole, LoginResponse, RegisterResponse } from "@/types";
import { apiClient, getErrorMessage } from "@/lib/api-client";

// ============================================
// Types & Interfaces
// ============================================

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  loginWithOTP: (email: string, otp: string) => Promise<boolean>;
  sendOTP: (email: string, purpose?: "login" | "register") => Promise<{ success: boolean; otp?: string }>;
  register: (data: RegisterData) => Promise<boolean>;
  registerWithOTP: (data: RegisterOTPData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  checkAuth: () => Promise<boolean>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

interface RegisterOTPData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  otp: string;
}

// ============================================
// Context
// ============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================
// Route Configuration
// ============================================

const PROTECTED_ROUTES = ["/dashboard", "/admin", "/profile", "/settings"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const ADMIN_ROUTES = ["/admin"];
const ADMIN_ROLES: UserRole[] = [UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.MANAGER];

// ============================================
// Provider Component
// ============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    isAdmin: false,
  });

  const router = useRouter();
  const pathname = usePathname();

  // Check if user has admin privileges
  const checkIsAdmin = useCallback((user: User | null): boolean => {
    if (!user) return false;
    return ADMIN_ROLES.includes(user.role as UserRole);
  }, []);

  // Decode JWT token
  const decodeToken = useCallback((token: string): { userId: string; email: string; role: UserRole; exp: number } | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async (): Promise<boolean> => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (!token) {
      setState({ user: null, isLoading: false, isAuthenticated: false, isAdmin: false });
      return false;
    }

    try {
      const payload = decodeToken(token);

      if (!payload) {
        throw new Error("Invalid token");
      }

      // Check if token is expired
      if (payload.exp * 1000 < Date.now()) {
        // Try to refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await apiClient.post<LoginResponse>("/auth/refresh-token", {
              refreshToken,
            });

            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);

            setState({
              user: response.user,
              isLoading: false,
              isAuthenticated: true,
              isAdmin: checkIsAdmin(response.user),
            });
            return true;
          } catch {
            // Refresh failed
          }
        }

        // Clear tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setState({ user: null, isLoading: false, isAuthenticated: false, isAdmin: false });
        return false;
      }

      // Fetch user profile to get full user data
      try {
        const user = await apiClient.get<User>("/auth/me");
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
          isAdmin: checkIsAdmin(user),
        });
        return true;
      } catch {
        // If profile fetch fails, use token data
        const user: User = {
          id: payload.userId,
          email: payload.email,
          firstName: "User",
          role: payload.role,
          isVerified: true,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
          isAdmin: checkIsAdmin(user),
        });
        return true;
      }
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setState({ user: null, isLoading: false, isAuthenticated: false, isAdmin: false });
      return false;
    }
  }, [decodeToken, checkIsAdmin]);

  // Initialize auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Route protection
  useEffect(() => {
    if (state.isLoading) return;

    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
    const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));

    if (isProtectedRoute && !state.isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (isAdminRoute && !state.isAdmin) {
      toast.error("You don't have permission to access this page");
      router.push("/dashboard");
      return;
    }

    if (isAuthRoute && state.isAuthenticated) {
      router.push(state.isAdmin ? "/admin" : "/dashboard");
    }
  }, [state.isLoading, state.isAuthenticated, state.isAdmin, pathname, router]);

  // Login with email/password
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/login", { email, password });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: checkIsAdmin(response.user),
      });

      toast.success(`Welcome back, ${response.user.firstName}!`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  }, [checkIsAdmin]);

  // Login with OTP
  const loginWithOTP = useCallback(async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<LoginResponse>("/auth/otp/login/verify", { email, otp });

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: checkIsAdmin(response.user),
      });

      toast.success(`Welcome back, ${response.user.firstName}!`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  }, [checkIsAdmin]);

  // Send OTP
  const sendOTP = useCallback(async (email: string, purpose: "login" | "register" = "login"): Promise<{ success: boolean; otp?: string }> => {
    try {
      const endpoint = purpose === "register" ? "/auth/otp/register/send" : "/auth/otp/login/send";
      const response = await apiClient.post<{ otp?: string }>(endpoint, { email });
      toast.success("OTP sent to your email!");
      return { success: true, otp: response.otp };
    } catch (error) {
      toast.error(getErrorMessage(error));
      return { success: false };
    }
  }, []);

  // Register with password
  const register = useCallback(async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await apiClient.post<RegisterResponse>("/auth/register", data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: checkIsAdmin(response.user),
      });

      toast.success(`Welcome to STEM Mantra, ${response.user.firstName}!`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  }, [checkIsAdmin]);

  // Register with OTP
  const registerWithOTP = useCallback(async (data: RegisterOTPData): Promise<boolean> => {
    try {
      const response = await apiClient.post<RegisterResponse>("/auth/otp/register/verify", data);

      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

      setState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        isAdmin: checkIsAdmin(response.user),
      });

      toast.success(`Welcome to STEM Mantra, ${response.user.firstName}!`);
      return true;
    } catch (error) {
      toast.error(getErrorMessage(error));
      return false;
    }
  }, [checkIsAdmin]);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setState({ user: null, isLoading: false, isAuthenticated: false, isAdmin: false });
    toast.success("Logged out successfully");
    router.push("/login");
  }, [router]);

  // Update user data
  const updateUser = useCallback((updates: Partial<User>) => {
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...updates } : null,
    }));
  }, []);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      ...state,
      login,
      loginWithOTP,
      sendOTP,
      register,
      registerWithOTP,
      logout,
      updateUser,
      checkAuth,
    }),
    [state, login, loginWithOTP, sendOTP, register, registerWithOTP, logout, updateUser, checkAuth]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

// ============================================
// Hook
// ============================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============================================
// HOC for Protected Components
// ============================================

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: { adminOnly?: boolean }
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push("/login");
        } else if (options?.adminOnly && !isAdmin) {
          router.push("/dashboard");
        }
      }
    }, [isAuthenticated, isAdmin, isLoading, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
        </div>
      );
    }

    if (!isAuthenticated || (options?.adminOnly && !isAdmin)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
