"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  ShoppingCart,
  Receipt,
  GraduationCap,
  Settings,
  ChevronLeft,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Heart,
  Trophy,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

// ============================================
// Navigation Configuration
// ============================================

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  description?: string;
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    description: "Overview of your learning journey",
  },
  {
    title: "Browse Courses",
    href: "/dashboard/courses",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Explore our programs and courses",
  },
  {
    title: "My Enrollments",
    href: "/dashboard/enrollments",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "View your enrolled courses",
  },
  {
    title: "Store",
    href: "/dashboard/store",
    icon: <ShoppingBag className="w-5 h-5" />,
    description: "Shop robotics kits and materials",
  },
  {
    title: "My Cart",
    href: "/dashboard/cart",
    icon: <ShoppingCart className="w-5 h-5" />,
    description: "View your shopping cart",
  },
  {
    title: "My Orders",
    href: "/dashboard/orders",
    icon: <Receipt className="w-5 h-5" />,
    description: "Track your orders",
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: <Trophy className="w-5 h-5" />,
    description: "Your badges and certificates",
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    icon: <Calendar className="w-5 h-5" />,
    description: "Upcoming classes and events",
  },
  {
    title: "Wishlist",
    href: "/dashboard/wishlist",
    icon: <Heart className="w-5 h-5" />,
    description: "Saved courses and products",
  },
];

const bottomNavItems: NavItem[] = [
  {
    title: "Profile",
    href: "/profile",
    icon: <User className="w-5 h-5" />,
    description: "Manage your profile",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
    description: "Account settings",
  },
  {
    title: "Help Center",
    href: "/dashboard/help",
    icon: <HelpCircle className="w-5 h-5" />,
    description: "Get support",
  },
];

// ============================================
// Sidebar Component
// ============================================

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  cartCount?: number;
}

function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose, cartCount = 0 }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.href);
    const showBadge = item.href === "/dashboard/cart" && cartCount > 0;

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onMobileClose}
        className={cn(
          "group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          active
            ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <span
          className={cn(
            "shrink-0 transition-colors",
            active ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
          )}
        >
          {item.icon}
        </span>
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {showBadge && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-red-500 rounded-full">
                {cartCount}
              </span>
            )}
            {item.badge && (
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-primary rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
        {isCollapsed && showBadge && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-500 rounded-full">
            {cartCount}
          </span>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className="absolute left-full ml-3 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
            <div className="font-medium">{item.title}</div>
            {item.description && (
              <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
            )}
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-slate-900" />
          </div>
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <FaRobot className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <span className="text-lg font-bold text-slate-900">STEM</span>
              <span className="text-lg font-bold text-primary">Mantra</span>
            </div>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform duration-200",
              isCollapsed && "rotate-180"
            )}
          />
        </button>
        <button
          onClick={onMobileClose}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info Card */}
      {!isCollapsed && (
        <div className="px-4 py-4">
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.firstName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user?.firstName || "User"} {user?.lastName || ""}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className={cn(!isCollapsed && "mb-2")}>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Learning
            </p>
          )}
          {navigationItems.slice(0, 3).map(renderNavItem)}
        </div>

        <div className={cn(!isCollapsed && "mb-2 mt-6")}>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Shopping
            </p>
          )}
          {navigationItems.slice(3, 6).map(renderNavItem)}
        </div>

        <div className={cn(!isCollapsed && "mb-2 mt-6")}>
          {!isCollapsed && (
            <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              More
            </p>
          )}
          {navigationItems.slice(6).map(renderNavItem)}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-200 p-3 space-y-1">
        {bottomNavItems.map(renderNavItem)}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            "text-red-600 hover:bg-red-50"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-40",
          isCollapsed ? "w-20" : "w-72"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-200 z-50 lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================
// Header Component
// ============================================

interface HeaderProps {
  onMenuClick: () => void;
  isCollapsed: boolean;
}

function Header({ onMenuClick, isCollapsed }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-30 transition-all duration-300",
        isCollapsed ? "lg:left-20" : "lg:left-72",
        "left-0"
      )}
    >
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Page Title - Can be customized */}
          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-slate-900">Welcome back!</h1>
            <p className="text-sm text-slate-500">Track your learning progress</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold shadow-md">
              {user?.firstName?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================
// Main Layout Component
// ============================================

interface UserLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
}

export function UserLayout({ children, cartCount = 0 }: UserLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Close mobile sidebar on route change
  const pathname = usePathname();
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
            <FaRobot className="w-8 h-8 text-white" />
          </div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        cartCount={cartCount}
      />
      <Header onMenuClick={() => setIsMobileOpen(true)} isCollapsed={isCollapsed} />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        )}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}

export default UserLayout;
