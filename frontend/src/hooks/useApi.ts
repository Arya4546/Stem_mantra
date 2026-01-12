import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, PaginatedResponse } from "@/lib/api-client";

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  duration: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: string;
  price: number;
  status: "ACTIVE" | "DRAFT" | "ARCHIVED";
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  status: "ACTIVE" | "DRAFT" | "OUT_OF_STOCK";
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  school?: string;
  message: string;
  source: string;
  status: "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST";
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  publicId: string;
  title?: string;
  description?: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export interface Analytics {
  totalUsers: number;
  totalBlogPosts: number;
  totalPrograms: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalLeads: number;
  recentActivity: {
    type: string;
    message: string;
    timestamp: string;
  }[];
}

// Query Keys
export const queryKeys = {
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  blogs: ["blogs"] as const,
  blog: (slug: string) => ["blogs", slug] as const,
  programs: ["programs"] as const,
  program: (slug: string) => ["programs", slug] as const,
  products: ["products"] as const,
  product: (slug: string) => ["products", slug] as const,
  leads: ["leads"] as const,
  lead: (id: string) => ["leads", id] as const,
  orders: ["orders"] as const,
  order: (id: string) => ["orders", id] as const,
  gallery: ["gallery"] as const,
  analytics: ["analytics"] as const,
  profile: ["profile"] as const,
};

// ============= Users Hooks =============
export function useUsers(params?: { page?: number; limit?: number; search?: string; role?: string }) {
  return useQuery({
    queryKey: [...queryKeys.users, params],
    queryFn: () => apiClient.get<PaginatedResponse<User>>("/users", { params }),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => apiClient.get<User>(`/users/${id}`),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      apiClient.patch<User>(`/users/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ queryKey: queryKeys.user(id) });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
    },
  });
}

// ============= Blog Hooks =============
export function useBlogs(params?: { page?: number; limit?: number; search?: string; status?: string; category?: string }) {
  return useQuery({
    queryKey: [...queryKeys.blogs, params],
    queryFn: () => apiClient.get<PaginatedResponse<BlogPost>>("/blog", { params }),
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: queryKeys.blog(slug),
    queryFn: () => apiClient.get<BlogPost>(`/blog/${slug}`),
    enabled: !!slug,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BlogPost>) => apiClient.post<BlogPost>("/blog", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BlogPost> }) =>
      apiClient.patch<BlogPost>(`/blog/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/blog/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.blogs });
    },
  });
}

// ============= Programs Hooks =============
export function usePrograms(params?: { page?: number; limit?: number; search?: string; category?: string }) {
  return useQuery({
    queryKey: [...queryKeys.programs, params],
    queryFn: () => apiClient.get<PaginatedResponse<Program>>("/programs", { params }),
  });
}

export function useProgram(slug: string) {
  return useQuery({
    queryKey: queryKeys.program(slug),
    queryFn: () => apiClient.get<Program>(`/programs/${slug}`),
    enabled: !!slug,
  });
}

export function useCreateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Program>) => apiClient.post<Program>("/programs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs });
    },
  });
}

export function useUpdateProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Program> }) =>
      apiClient.patch<Program>(`/programs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs });
    },
  });
}

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/programs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.programs });
    },
  });
}

// ============= Products Hooks =============
export function useProducts(params?: { page?: number; limit?: number; search?: string; category?: string }) {
  return useQuery({
    queryKey: [...queryKeys.products, params],
    queryFn: () => apiClient.get<PaginatedResponse<Product>>("/products", { params }),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: queryKeys.product(slug),
    queryFn: () => apiClient.get<Product>(`/products/${slug}`),
    enabled: !!slug,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Product>) => apiClient.post<Product>("/products", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) =>
      apiClient.patch<Product>(`/products/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products });
    },
  });
}

// ============= Leads Hooks =============
export function useLeads(params?: { page?: number; limit?: number; search?: string; status?: string }) {
  return useQuery({
    queryKey: [...queryKeys.leads, params],
    queryFn: () => apiClient.get<PaginatedResponse<Lead>>("/leads", { params }),
  });
}

export function useLead(id: string) {
  return useQuery({
    queryKey: queryKeys.lead(id),
    queryFn: () => apiClient.get<Lead>(`/leads/${id}`),
    enabled: !!id,
  });
}

export function useCreateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Lead>) => apiClient.post<Lead>("/leads", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
    },
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Lead> }) =>
      apiClient.patch<Lead>(`/leads/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
      queryClient.invalidateQueries({ queryKey: queryKeys.lead(id) });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.leads });
    },
  });
}

// ============= Orders Hooks =============
export function useOrders(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: [...queryKeys.orders, params],
    queryFn: () => apiClient.get<PaginatedResponse<Order>>("/orders", { params }),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => apiClient.get<Order>(`/orders/${id}`),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order["status"] }) =>
      apiClient.patch<Order>(`/orders/${id}/status`, { status }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.invalidateQueries({ queryKey: queryKeys.order(id) });
    },
  });
}

// ============= Gallery Hooks =============
export function useGallery(params?: { page?: number; limit?: number; category?: string }) {
  return useQuery({
    queryKey: [...queryKeys.gallery, params],
    queryFn: () => apiClient.get<PaginatedResponse<GalleryImage>>("/gallery", { params }),
  });
}

export function useUploadImages() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ files, folder }: { files: File[]; folder?: string }) =>
      apiClient.uploadMultiple<GalleryImage[]>("/upload/images", files, "images", folder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gallery });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/gallery/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gallery });
    },
  });
}

// ============= Analytics Hooks =============
export function useAnalytics() {
  return useQuery({
    queryKey: queryKeys.analytics,
    queryFn: () => apiClient.get<Analytics>("/analytics/dashboard"),
  });
}

// ============= Profile Hooks =============
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => apiClient.get<User>("/auth/me"),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<User>) => apiClient.patch<User>("/auth/profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

// ============= Contact Form Hook =============
export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    }) => apiClient.post("/contact", data),
  });
}
