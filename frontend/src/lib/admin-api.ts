/**
 * Browser-side client for the admin API.
 * Auth uses httpOnly cookies set by the backend; an expired access token is renewed once
 * through /api/auth/refresh and the request is retried transparently.
 */
import type { Pagination } from "@/types/site";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

export interface ApiResult<T> {
  data: T;
  message: string;
  pagination?: Pagination;
}

type Query = Record<string, string | number | boolean | undefined | null>;

let refreshing: Promise<boolean> | null = null;

/** Renews the session once, shared by every request that hit a 401 at the same time. */
export function refreshSession(): Promise<boolean> {
  refreshing ??= fetch("/api/auth/refresh", { method: "POST", credentials: "same-origin" })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => {
      setTimeout(() => (refreshing = null), 0);
    });
  return refreshing;
}

let onSessionExpired: (() => void) | null = null;
export function setSessionExpiredHandler(handler: (() => void) | null) {
  onSessionExpired = handler;
}
export function sessionExpired() {
  onSessionExpired?.();
}

function buildUrl(path: string, query?: Query): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(query ?? {})) {
    if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
  }
  const q = qs.toString();
  return `/api${path}${q ? `?${q}` : ""}`;
}

export async function apiRequest<T>(
  path: string,
  options: { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown; query?: Query; signal?: AbortSignal } = {},
): Promise<ApiResult<T>> {
  const { method = "GET", body, query, signal } = options;
  const init: RequestInit = {
    method,
    credentials: "same-origin",
    signal,
    headers: { Accept: "application/json", ...(body !== undefined ? { "Content-Type": "application/json" } : {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };
  const url = buildUrl(path, query);
  const isAuthCall = path.startsWith("/auth/");

  let res: Response;
  try {
    res = await fetch(url, init);
    if (res.status === 401 && !isAuthCall && (await refreshSession())) res = await fetch(url, init);
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ApiError("Can't reach the server. Check your connection and try again.", 0);
  }

  let json: { success?: boolean; message?: string; data?: T; meta?: { pagination?: Pagination; errors?: Record<string, string> } } | null = null;
  try {
    json = await res.json();
  } catch {
    /* empty or non-JSON body */
  }

  if (res.status === 401 && !isAuthCall) sessionExpired();
  if (!res.ok || !json?.success) {
    throw new ApiError(json?.message || `Request failed (${res.status})`, res.status, json?.meta?.errors ?? {});
  }
  return { data: json.data as T, message: json.message ?? "", pagination: json.meta?.pagination };
}

export const adminApi = {
  get: <T>(path: string, query?: Query, signal?: AbortSignal) => apiRequest<T>(path, { query, signal }),
  post: <T>(path: string, body?: unknown) => apiRequest<T>(path, { method: "POST", body: body ?? {} }),
  patch: <T>(path: string, body: unknown) => apiRequest<T>(path, { method: "PATCH", body }),
  del: <T>(path: string, query?: Query) => apiRequest<T>(path, { method: "DELETE", query }),
};

export type UploadPurpose = "gallery" | "client-logo" | "testimonial" | "blog-cover" | "blog-inline";

export interface UploadedMedia {
  id: string;
  url: string;
  thumbUrl: string | null;
  width: number | null;
  height: number | null;
  blurDataUrl: string | null;
}

/** Uploads one image with progress reporting (XHR, because fetch has no upload progress). */
export function uploadImage(
  file: File,
  purpose: UploadPurpose,
  onProgress?: (percent: number) => void,
  retried = false,
): Promise<UploadedMedia> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/admin/uploads");
    xhr.withCredentials = true;
    xhr.responseType = "json";
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onerror = () => reject(new ApiError("Upload failed. Check your connection.", 0));
    xhr.onload = async () => {
      const body = xhr.response as { success?: boolean; message?: string; data?: UploadedMedia } | null;
      if (xhr.status === 401 && !retried) {
        if (await refreshSession()) {
          uploadImage(file, purpose, onProgress, true).then(resolve, reject);
          return;
        }
        sessionExpired();
      }
      if (xhr.status >= 200 && xhr.status < 300 && body?.success && body.data) resolve(body.data);
      else reject(new ApiError(body?.message || `Upload failed (${xhr.status})`, xhr.status));
    };
    const form = new FormData();
    form.append("purpose", purpose);
    form.append("file", file);
    xhr.send(form);
  });
}

export const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/avif": [".avif"],
  "image/svg+xml": [".svg"],
};
