// ============================================
// User & Authentication Types
// ============================================

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
  MANAGER = "MANAGER",
  TEACHER = "TEACHER",
  SCHOOL_ADMIN = "SCHOOL_ADMIN",
  STUDENT = "STUDENT",
  PARENT = "PARENT",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

// ============================================
// Program Types
// ============================================

export interface Program {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  image?: string;
  features: string[];
  benefits: string[];
  targetAudience?: string;
  duration?: string;
  price?: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Product Types
// ============================================

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  images: string[];
  features?: string[];
  specifications?: Record<string, string>;
  category?: ProductCategory;
  categoryId?: string;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Lead Types
// ============================================

export enum LeadSource {
  WEBSITE = "WEBSITE",
  REFERRAL = "REFERRAL",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  EVENT = "EVENT",
  DIRECT = "DIRECT",
  OTHER = "OTHER",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  PROPOSAL = "PROPOSAL",
  NEGOTIATION = "NEGOTIATION",
  WON = "WON",
  LOST = "LOST",
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  designation?: string;
  city?: string;
  state?: string;
  source: LeadSource;
  status: LeadStatus;
  interest?: string;
  message?: string;
  score: number;
  assignedTo?: User;
  assignedToId?: string;
  notes?: LeadNote[];
  createdAt: string;
  updatedAt: string;
}

export interface LeadNote {
  id: string;
  content: string;
  createdBy: User;
  createdAt: string;
}

// ============================================
// Contact Types
// ============================================

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
  isRead: boolean;
  isReplied: boolean;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Order Types
// ============================================

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  user: User;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Blog Types
// ============================================

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  email: string;
  bio?: string;
  avatar?: string;
  designation?: string;
  isActive: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  status: PostStatus;
  tags: string[];
  viewCount: number;
  readTime?: number;
  publishedAt?: string;
  authors: { author: BlogAuthor }[];
  categories: { category: BlogCategory }[];
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Content Types
// ============================================

export interface Testimonial {
  id: string;
  name: string;
  designation?: string;
  schoolName?: string;
  content: string;
  rating: number;
  avatar?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isPublished: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
}

// ============================================
// Analytics Types
// ============================================

export interface DashboardStats {
  users: {
    total: number;
    today: number;
    thisMonth: number;
  };
  leads: {
    total: number;
    thisMonth: number;
  };
  orders: {
    total: number;
    thisMonth: number;
    revenue: number;
    revenueGrowth: number;
  };
  pageViews: {
    today: number;
    thisMonth: number;
  };
  other: {
    newsletterSubscribers: number;
    upcomingEvents: number;
    pendingDemos: number;
  };
}

// ============================================
// Form Types
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  schoolName?: string;
  designation?: string;
  city?: string;
  state?: string;
  interest?: string;
  message?: string;
  source?: LeadSource;
}

export interface LoginFormData {
  email: string;
  password?: string;
}

export interface RegisterFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}
