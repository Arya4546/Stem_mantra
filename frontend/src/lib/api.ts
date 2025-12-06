import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { toast } from "sonner";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Show success toast for mutation operations
    if (response.config.method !== "get" && response.data?.message) {
      toast.success(response.data.message);
    }
    return response;
  },
  async (error: AxiosError<{ message?: string; errors?: Record<string, string[]> }>) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });
          
          const { accessToken, refreshToken: newRefreshToken } = response.data.data;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          
          return api(originalRequest);
        }
      } catch {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        if (typeof window !== "undefined") {
          toast.error("Session expired. Please login again.");
          window.location.href = "/login";
        }
      }
    }
    
    // Handle validation errors
    if (error.response?.status === 422 && error.response.data?.errors) {
      const errors = error.response.data.errors;
      const firstError = Object.values(errors)[0]?.[0];
      toast.error(firstError || "Validation failed");
    } 
    // Handle general errors
    else if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } 
    // Handle network errors
    else if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your connection.");
    } 
    // Handle timeout
    else if (error.code === "ECONNABORTED") {
      toast.error("Request timeout. Please try again.");
    }
    // Handle other errors
    else {
      toast.error("Something went wrong. Please try again.");
    }
    
    return Promise.reject(error);
  }
);

// Generic API Response Type
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Paginated Response Type
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// API Methods
export const apiClient = {
  // GET request
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url, config);
    return response.data.data;
  },
  
  // POST request
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.post<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },
  
  // PUT request
  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.put<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },
  
  // PATCH request
  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.patch<ApiResponse<T>>(url, data, config);
    return response.data.data;
  },
  
  // DELETE request
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await api.delete<ApiResponse<T>>(url, config);
    return response.data.data;
  },
  
  // Upload file(s)
  upload: async <T>(
    url: string,
    files: File | File[],
    folder?: string,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const formData = new FormData();
    
    if (Array.isArray(files)) {
      files.forEach((file) => formData.append("images", file));
    } else {
      formData.append("image", files);
    }
    
    if (folder) {
      formData.append("folder", folder);
    }
    
    const response = await api.post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data.data;
  },
};

export default api;
