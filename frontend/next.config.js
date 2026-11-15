/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained server build for Docker (.next/standalone)
  output: 'standalone',
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Images are served as-is (already optimised in /public); remote hosts allowed for CDN/B2 uploads later.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: 'localhost', port: '3000', pathname: '/**' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
