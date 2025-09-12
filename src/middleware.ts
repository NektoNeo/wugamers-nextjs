import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting storage (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (value.resetTime < now) {
      requestCounts.delete(key);
    }
  }
}, 60000); // Clean up every minute

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  
  // Get client IP for rate limiting
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  
  // Rate limiting for form submissions
  if (url.pathname.startsWith('/api/') && request.method === 'POST') {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 10; // Max 10 requests per 15 minutes
    
    const key = `${ip}:${url.pathname}`;
    const current = requestCounts.get(key) || { count: 0, resetTime: now + windowMs };
    
    if (current.resetTime < now) {
      current.count = 1;
      current.resetTime = now + windowMs;
    } else {
      current.count++;
    }
    
    requestCounts.set(key, current);
    
    if (current.count > maxRequests) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
    
    response.headers.set('X-RateLimit-Limit', maxRequests.toString());
    response.headers.set('X-RateLimit-Remaining', (maxRequests - current.count).toString());
    response.headers.set('X-RateLimit-Reset', new Date(current.resetTime).toISOString());
  }
  
  // Security Headers
  
  // Content Security Policy - strict policy for child safety
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel.com", // Allow Vercel preview
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://donate.wugamers.ru https://api.wugamers.ru wss://*.vercel.com", // Allow Vercel websocket
    "frame-ancestors 'none'", // Prevent clickjacking
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', cspDirectives);
  
  // Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  
  // X-Frame-Options - prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY');
  
  // X-Content-Type-Options - prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // X-XSS-Protection - legacy XSS protection
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy - privacy protection
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy - restrict browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );
  
  // X-DNS-Prefetch-Control
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // X-Permitted-Cross-Domain-Policies
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // Additional security for API routes
  if (url.pathname.startsWith('/api/')) {
    // CORS headers for API
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || 'https://wugamers.ru');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
    
    // Prevent caching of API responses with sensitive data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};