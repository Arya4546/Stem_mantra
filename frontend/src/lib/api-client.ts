import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Response types
interface ApiResponse<T> {
  success: boolean;
  message?: string;
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

// Create axios instance with defaults
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token management
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Handle 401 - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        processQueue(null, accessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

interface PaginatedApiResponse<T> {
  success: boolean;
  message?: string;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error extraction helper
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;
    
    if (axiosError.response?.data?.errors) {
      const errors = axiosError.response.data.errors;
      return Object.values(errors).flat()[0] || "Validation failed";
    }
    
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }
    
    if (axiosError.code === "ERR_NETWORK") {
      return "Network error. Please check your connection.";
    }
    
    if (axiosError.code === "ECONNABORTED") {
      return "Request timeout. Please try again.";
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return "Something went wrong. Please try again.";
};

// API client with typed methods
export const apiClient = {
  // GET request
  get: async <T>(url: string, params?: Record<string, unknown>): Promise<T> => {
    const response = await api.get<ApiResponse<T>>(url, { params });
    return response.data.data;
  },

  // GET paginated request
  getPaginated: async <T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<{ data: T[]; meta: { page: number; limit: number; total: number; totalPages: number } }> => {
    const response = await api.get<PaginatedApiResponse<T>>(url, { params });
    return { data: response.data.data, meta: response.data.meta };
  },

  // POST request
  post: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  // PUT request
  put: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  // PATCH request
  patch: async <T>(url: string, data?: unknown): Promise<T> => {
    const response = await api.patch<ApiResponse<T>>(url, data);
    return response.data.data;
  },

  // DELETE request
  delete: async <T>(url: string): Promise<T> => {
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data.data;
  },

  // Upload single file
  upload: async <T>(url: string, file: File, fieldName = "file"): Promise<T> => {
    const formData = new FormData();
    formData.append(fieldName, file);
    const response = await api.post<ApiResponse<T>>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  // Upload multiple files
  uploadMultiple: async <T>(url: string, files: File[], fieldName = "files", folder?: string): Promise<T> => {
    const formData = new FormData();
    files.forEach((file) => formData.append(fieldName, file));
    if (folder) {
      formData.append("folder", folder);
    }
    const response = await api.post<ApiResponse<T>>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  },

  // Raw axios instance for custom requests
  raw: api,
};

export default api;
