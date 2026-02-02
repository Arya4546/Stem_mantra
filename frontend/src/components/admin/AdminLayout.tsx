"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  FileText,
  Image as ImageIcon,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronDown,
  Package,
  GraduationCap,
  Star,
  HelpCircle,
  Mail,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";

// ============================================
// Navigation Configuration
// ============================================

interface NavItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  badge?: number;
  children?: { title: string; href: string }[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Leads",
    href: "/admin/leads",
    icon: <MessageSquare className="w-5 h-5" />,
    badge: 5,
  },
  {
    title: "Programs",
    href: "/admin/programs",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    title: "Blog",
    icon: <FileText className="w-5 h-5" />,
    children: [
      { title: "All Posts", href: "/admin/blog" },
    ],
  },
  {
    title: "Content",
    icon: <ImageIcon className="w-5 h-5" />,
    children: [
      { title: "Gallery", href: "/admin/gallery" },
      { title: "Testimonials", href: "/admin/testimonials" },
      { title: "FAQs", href: "/admin/faqs" },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
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
}

export function Sidebar({ isCollapsed, onToggle, isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const renderNavItem = (item: NavItem, index: number) => {
    const active = isActive(item.href);
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleExpand(item.title)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              isExpanded && "bg-slate-100 text-slate-900"
            )}
          >
            <span className="shrink-0">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )}
                />
              </>
            )}
          </button>
          <AnimatePresence>
            {isExpanded && !isCollapsed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pl-11 py-1 space-y-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onMobileClose}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-sm transition-colors duration-200",
                        pathname === child.href
                          ? "text-orange-600 bg-orange-50 font-medium"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      )}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href!}
        onClick={onMobileClose}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          active
            ? "bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-md shadow-orange-500/25"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <span className="shrink-0">{item.icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-slate-200", isCollapsed && "justify-center")}>
        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
          <img
            src="https://stemmantra.com/assets/img/Custom/Newlogo.jpeg"
            alt="STEMmantra Logo"
            className="w-full h-full object-cover"
          />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-xl">
            <span className="text-orange-500">STEM</span>
            <span className="text-slate-800">Mantra</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map(renderNavItem)}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-slate-200">
        {!isCollapsed && user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
              {user.firstName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user.firstName}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200",
            "text-red-600 hover:bg-red-50",
            isCollapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse Toggle (Desktop) */}
      <button
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center text-slate-400 hover:text-slate-600 shadow-sm"
      >
        <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
      </button>
    </>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-slate-200 z-50 flex flex-col lg:hidden"
          >
            <button
              onClick={onMobileClose}
              className="absolute right-4 top-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-slate-200 z-30 transition-all duration-300",
          isCollapsed ? "w-[72px]" : "w-[280px]"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

// ============================================
// Top Header Component
// ============================================

interface TopHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function TopHeader({ onMenuClick, title }: TopHeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && <h1 className="text-lg font-semibold text-slate-900">{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">{user.firstName}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-teal-500 flex items-center justify-center text-white font-medium text-sm">
              {user.firstName.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ============================================
// Admin Layout Component
// ============================================

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      <div
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "lg:pl-[72px]" : "lg:pl-[280px]"
        )}
      >
        <TopHeader onMenuClick={() => setIsMobileOpen(true)} title={title} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
