/**
 * Tiny in-process TTL cache for public read endpoints. The site runs as a single process, so
 * invalidating on every admin write keeps the public pages instantly up to date.
 */
interface Entry {
  value: unknown;
  expiresAt: number;
}

const store = new Map<string, Entry>();
const DEFAULT_TTL_MS = 5 * 60 * 1000;

export const cache = {
  async wrap<T>(key: string, loader: () => Promise<T>, ttlMs = DEFAULT_TTL_MS): Promise<T> {
    const hit = store.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.value as T;
    const value = await loader();
    store.set(key, { value, expiresAt: Date.now() + ttlMs });
    return value;
  },

  /** Drops every key that starts with one of the given prefixes. */
  invalidate(...prefixes: string[]): void {
    for (const key of store.keys()) {
      if (prefixes.some((p) => key.startsWith(p))) store.delete(key);
    }
  },

  clear(): void {
    store.clear();
  },
};

export const CacheKeys = {
  gallery: 'gallery:',
  clients: 'clients:',
  testimonials: 'testimonials:',
  blog: 'blog:',
} as const;
