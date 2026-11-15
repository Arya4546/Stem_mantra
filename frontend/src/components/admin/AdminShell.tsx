"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ExternalLink,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Newspaper,
  School,
  Settings,
  ShieldAlert,
  X,
} from "lucide-react";
import { ApiError, adminApi, apiRequest, refreshSession, setSessionExpiredHandler } from "@/lib/admin-api";
import { cn } from "@/lib/utils";
import { Button, LoadingBlock } from "./ui";

export type AdminRole = "SUPER_ADMIN" | "ADMIN" | "EDITOR";
export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
}

interface AdminContextValue {
  user: AdminUser;
  setUser: (user: AdminUser) => void;
  badges: { newEnquiries: number };
  refreshBadges: () => void;
  canManageEnquiries: boolean;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside <AdminShell>");
  return ctx;
}

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/clients", label: "Clients", icon: School },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox, adminOnly: true },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

const ROLE_LABEL: Record<AdminRole, string> = { SUPER_ADMIN: "Super admin", ADMIN: "Admin", EDITOR: "Editor" };

function Sidebar({ user, badges, onNavigate }: { user: AdminUser; badges: { newEnquiries: number }; onNavigate?: () => void }) {
  const pathname = usePathname() ?? "";
  const canManageEnquiries = user.role !== "EDITOR";
  return (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2.5">
          <span className="bg-white rounded-lg px-2 py-1">
            <Image src="/images/logo.png" alt="STEMmantra" width={2708} height={591} className="h-6 w-auto" priority />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-orange-300">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Admin">
        {NAV.filter((item) => !("adminOnly" in item) || canManageEnquiries).map((item) => {
          const active = "exact" in item && item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          const badge = item.href === "/admin/enquiries" ? badges.newEnquiries : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                active ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-slate-300 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {badge > 0 && (
                <span className={cn("min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center", active ? "bg-white text-orange-600" : "bg-orange-500 text-white")}>
                  {badge > 99 ? "99+" : badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <a href="/" target="_blank" rel="noopener" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
          <ExternalLink className="w-5 h-5" /> View website
        </a>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/admin";
  const [user, setUser] = useState<AdminUser | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [badges, setBadges] = useState({ newEnquiries: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);

  const goToLogin = useCallback(
    async (expired: boolean) => {
      // Clears the cookies (including the marker the middleware looks at) before leaving.
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => undefined);
      router.replace(`/login?next=${encodeURIComponent(window.location.pathname)}${expired ? "&expired=1" : ""}`);
    },
    [router],
  );

  useEffect(() => {
    setSessionExpiredHandler(() => void goToLogin(true));
    return () => setSessionExpiredHandler(null);
  }, [goToLogin]);

  const loadUser = useCallback(async () => {
    setStatus("loading");
    const me = () => apiRequest<{ user: AdminUser }>("/auth/me");
    try {
      let result;
      try {
        result = await me();
      } catch (err) {
        if ((err as ApiError).status !== 401) throw err;
        if (!(await refreshSession())) {
          void goToLogin(true);
          return;
        }
        result = await me();
      }
      setUser(result.data.user);
      setStatus("ready");
    } catch (err) {
      if ((err as ApiError).status === 401) void goToLogin(true);
      else setStatus("error");
    }
  }, [goToLogin]);

  useEffect(() => {
    void loadUser();
  }, [loadUser]);

  const canManageEnquiries = user ? user.role !== "EDITOR" : false;
  const refreshBadges = useCallback(() => {
    if (!canManageEnquiries) return;
    adminApi
      .get<{ newEnquiries: number }>("/admin/dashboard/badges")
      .then(({ data }) => setBadges(data))
      .catch(() => undefined);
  }, [canManageEnquiries]);

  useEffect(() => {
    if (status !== "ready") return;
    refreshBadges();
    const timer = setInterval(refreshBadges, 60_000);
    return () => clearInterval(timer);
  }, [status, refreshBadges]);

  useEffect(() => setMobileOpen(false), [pathname]);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => undefined);
    router.replace("/login");
    router.refresh();
  };

  if (status !== "ready" || !user) {
    return (
      <div className="min-h-[100dvh] bg-slate-100 flex items-center justify-center p-6">
        {status === "error" ? (
          <div className="text-center">
            <p className="font-semibold text-slate-800">Can&apos;t reach the server.</p>
            <p className="text-sm text-slate-500 mt-1">Check your connection and try again.</p>
            <Button className="mt-4" onClick={() => void loadUser()}>
              Retry
            </Button>
          </div>
        ) : (
          <LoadingBlock label="Checking your session…" />
        )}
      </div>
    );
  }

  const restricted = pathname.startsWith("/admin/enquiries") && !canManageEnquiries;

  return (
    <AdminContext.Provider value={{ user, setUser, badges, refreshBadges, canManageEnquiries }}>
      <div className="min-h-[100dvh] bg-slate-100 text-slate-900">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 bg-slate-900 z-40">
          <Sidebar user={user} badges={badges} />
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <button className="absolute inset-0 bg-slate-900/60" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 shadow-2xl">
              <button className="absolute top-4 right-3 text-slate-400 hover:text-white p-1" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5" />
              </button>
              <Sidebar user={user} badges={badges} onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className="lg:pl-64 flex flex-col min-h-[100dvh]">
          <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button className="lg:hidden p-2 -ml-2 rounded-lg text-slate-600 hover:bg-slate-100" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-3 rounded-xl pl-1 pr-2 py-1 hover:bg-slate-100 transition-colors">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold flex items-center justify-center">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden sm:block text-left leading-tight">
                    <span className="block text-sm font-semibold text-slate-800 max-w-[180px] truncate">{user.fullName}</span>
                    <span className="block text-xs text-slate-500">{ROLE_LABEL[user.role]}</span>
                  </span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content align="end" sideOffset={8} className="z-50 min-w-[220px] bg-white rounded-xl shadow-xl border border-slate-200 p-1.5">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.fullName}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <DropdownMenu.Item asChild>
                    <Link href="/admin/settings" className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-slate-700 outline-none data-[highlighted]:bg-slate-100">
                      <Settings className="w-4 h-4" /> Account settings
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => void signOut()}
                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-600 outline-none cursor-pointer data-[highlighted]:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </header>

          <main className="flex-1 w-full max-w-[1400px] mx-auto p-4 sm:p-6 lg:p-8">
            {restricted ? (
              <div className="flex flex-col items-center text-center py-24">
                <ShieldAlert className="w-10 h-10 text-orange-500 mb-3" />
                <p className="font-semibold">Only admins can view enquiries.</p>
                <Link href="/admin" className="text-sm text-orange-600 font-semibold mt-2 hover:underline">
                  Back to dashboard
                </Link>
              </div>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
