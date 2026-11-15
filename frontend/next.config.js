/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is served by the Node.js backend (backend/src/next-app.ts), which mounts Next.js as a
  // custom server next to the /api and /media routes. Build with `next build`; no standalone output.
  //
  // URLs have no trailing slash (matches the canonical URLs and the sitemap); /about/ → 308 → /about.
  trailingSlash: false,
  poweredByHeader: false,
  // Responses are compressed by the backend (Express `compression`), not twice.
  compress: false,
  images: {
    // Optimises the photos shipped in /public (resized + WebP, cached in .next/cache/images).
    // Admin uploads (/media/...) are already WebP with a thumbnail and use `unoptimized`.
    formats: ['image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: 'https', hostname: 'www.stemmantra.com' },
      { protocol: 'https', hostname: 'learn.stemmantra.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
