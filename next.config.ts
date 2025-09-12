import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security configurations
  poweredByHeader: false, // Remove X-Powered-By header
  
  // React strict mode for better error detection
  reactStrictMode: true,
  
  // Optimize images
  images: {
    domains: ['wugamers.ru', 'donate.wugamers.ru'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false, // Prevent SVG XSS attacks
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Experimental security features
  experimental: {
    // Strict mode for better security
    strictNextHead: true,
  },
  
  // Headers configuration (additional to middleware)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private',
          },
        ],
      },
    ];
  },
  
  // Redirects for security
  async redirects() {
    return [
      {
        source: '/.env',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.env.local',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.git/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://wugamers.ru',
  },
  
  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // SWC minification for better performance
  swcMinify: true,
  
  // Disable source maps in production for security
  productionBrowserSourceMaps: false,
};

export default nextConfig;
