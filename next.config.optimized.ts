import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ========== ПРОИЗВОДИТЕЛЬНОСТЬ ==========
  
  // React оптимизации
  reactStrictMode: true,
  
  // SWC минификация (быстрее Terser)
  swcMinify: true,
  
  // Compiler оптимизации
  compiler: {
    // Удаление console.log в продакшене (кроме errors и warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    
    // Emotion CSS-in-JS оптимизация (если используется)
    // emotion: true,
    
    // Удаление React DevTools в продакшене
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$'],
    } : false,
  },
  
  // ========== ИЗОБРАЖЕНИЯ ==========
  images: {
    // Домены для внешних изображений
    domains: ['wugamers.ru', 'donate.wugamers.ru'],
    
    // Поддержка современных форматов
    formats: ['image/avif', 'image/webp'],
    
    // Размеры устройств для responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Размеры изображений для srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Минимальное время кэширования (1 год)
    minimumCacheTTL: 31536000,
    
    // Безопасность для SVG
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Оптимизация загрузки
    loader: 'default',
    
    // Удаленные паттерны (более безопасно чем domains)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wugamers.ru',
      },
    ],
  },
  
  // ========== ЭКСПЕРИМЕНТАЛЬНЫЕ ФУНКЦИИ ==========
  experimental: {
    // Оптимизация размера бандла
    optimizeCss: true,
    
    // Улучшенная типизация
    typedRoutes: true,
    
    // Server Actions (если используются)
    serverActions: {
      bodySizeLimit: '2mb',
    },
    
    // Partial Prerendering (PPR)
    ppr: true,
    
    // Улучшенная безопасность
    strictNextHead: true,
    
    // Оптимизация памяти
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-*',
    ],
    
    // WebVitals аналитика
    webVitalsAttribution: ['CLS', 'LCP', 'FCP', 'FID', 'TTFB'],
  },
  
  // ========== БЕЗОПАСНОСТЬ (HEADERS) ==========
  async headers() {
    return [
      {
        // Для всех маршрутов
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Статические ресурсы - агрессивное кэширование
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Next.js статика - долгосрочное кэширование
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Изображения - кэширование с ревалидацией
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=43200',
          },
        ],
      },
      {
        // API маршруты - без кэширования
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, private',
          },
        ],
      },
      {
        // Шрифты - долгосрочное кэширование
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // ========== REDIRECTS (безопасность) ==========
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
      {
        source: '/admin',
        destination: '/404',
        permanent: false,
      },
    ];
  },
  
  // ========== REWRITES (для CDN) ==========
  async rewrites() {
    return {
      beforeFiles: [
        // CDN для статики (если используется)
        // {
        //   source: '/cdn/:path*',
        //   destination: 'https://cdn.wugamers.ru/:path*',
        // },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  
  // ========== ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ ==========
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://wugamers.ru',
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || '',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
  },
  
  // ========== PRODUCTION ОПТИМИЗАЦИИ ==========
  
  // Отключение source maps в продакшене (безопасность + размер)
  productionBrowserSourceMaps: false,
  
  // Отключение powered by header
  poweredByHeader: false,
  
  // Сжатие HTML
  compress: true,
  
  // Генерация статических ID для CSS модулей
  generateBuildId: async () => {
    // Можно использовать git commit hash для версионирования
    return process.env.BUILD_ID || 'wugamers-' + Date.now();
  },
  
  // ========== OUTPUT CONFIGURATION ==========
  output: 'standalone', // Для Docker деплоя
  
  // ========== WEBPACK CONFIGURATION ==========
  webpack: (config, { isServer }) => {
    // Оптимизации для клиента
    if (!isServer) {
      // Tree shaking для lodash и других библиотек
      config.resolve.alias = {
        ...config.resolve.alias,
        'lodash': 'lodash-es',
      };
      
      // Игнорирование moment локалей (если используется)
      config.plugins.push(
        new (require('webpack').IgnorePlugin)({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      );
    }
    
    // SVG как React компоненты
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
  
  // ========== МОДУЛЬНАЯ ФЕДЕРАЦИЯ (если нужно) ==========
  // modularizeImports: {
  //   'lucide-react': {
  //     transform: 'lucide-react/dist/esm/icons/{{member}}',
  //   },
  // },
};

export default nextConfig;