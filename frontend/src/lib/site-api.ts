/**
 * Server-side data access for the public pages.
 *
 * Next.js runs inside the backend process, so pages call the REST API over loopback
 * (http://127.0.0.1:$PORT/api/public/...). The API keeps the results in memory and clears them
 * whenever an admin changes something, so these calls are cheap and always up to date.
 * Only import this from Server Components / route handlers.
 */
import type {
  BlogPost,
  BlogPostSummary,
  ClientItem,
  GalleryPhoto,
  GallerySection,
  Pagination,
  TestimonialItem,
} from "@/types/site";

const API_ORIGIN = (process.env.INTERNAL_API_ORIGIN || `http://127.0.0.1:${process.env.PORT || 3000}`).replace(/\/$/, "");

interface Envelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: { pagination?: Pagination };
}

class NotFound extends Error {}

async function request<T>(path: string): Promise<Envelope<T>> {
  const res = await fetch(`${API_ORIGIN}/api/public${path}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404) throw new NotFound(path);
  if (!res.ok) throw new Error(`GET /api/public${path} failed with ${res.status}`);
  return (await res.json()) as Envelope<T>;
}

/** For optional page sections: a failure hides the section instead of breaking the whole page. */
export async function orEmpty<T>(promise: Promise<T>, fallback: T, label: string): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    console.error(`[site-api] ${label} unavailable:`, (err as Error).message);
    return fallback;
  }
}

export const siteApi = {
  async gallery(): Promise<GallerySection[]> {
    return (await request<GallerySection[]>("/gallery")).data;
  },
  async featuredPhotos(limit = 7): Promise<GalleryPhoto[]> {
    return (await request<GalleryPhoto[]>(`/gallery/featured?limit=${limit}`)).data;
  },
  async clients(): Promise<ClientItem[]> {
    return (await request<ClientItem[]>("/clients")).data;
  },
  async testimonials(): Promise<TestimonialItem[]> {
    return (await request<TestimonialItem[]>("/testimonials")).data;
  },
  async blogPosts(params: { page?: number; tag?: string; limit?: number } = {}) {
    const qs = new URLSearchParams();
    if (params.page && params.page > 1) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    if (params.tag) qs.set("tag", params.tag);
    const query = qs.toString();
    const body = await request<BlogPostSummary[]>(`/blog${query ? `?${query}` : ""}`);
    return {
      posts: body.data,
      pagination: body.meta?.pagination ?? { page: 1, limit: body.data.length, total: body.data.length, totalPages: 1 },
    };
  },
  /** Returns null when the post does not exist or is not published. */
  async blogPost(slug: string): Promise<{ post: BlogPost; related: BlogPostSummary[] } | null> {
    if (!/^[a-z0-9-]{1,220}$/.test(slug)) return null;
    try {
      return (await request<{ post: BlogPost; related: BlogPostSummary[] }>(`/blog/${slug}`)).data;
    } catch (err) {
      if (err instanceof NotFound) return null;
      throw err;
    }
  },
  async blogSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
    return (await request<{ slug: string; updatedAt: string }[]>("/blog/slugs")).data;
  },
};

export const SITE_URL = "https://www.stemmantra.com";

/** Absolute URL for a media path (for Open Graph / JSON-LD). */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
