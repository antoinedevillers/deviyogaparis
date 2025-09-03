import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Cloner la réponse pour pouvoir la modifier
  const response = NextResponse.next();

  // Headers de sécurité
  response.headers.set('X-Frame-Options', 'DENY'); // Empêche iframe
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Empêche MIME sniffing
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin'); // Contrôle referrer
  response.headers.set('X-XSS-Protection', '1; mode=block'); // Protection XSS legacy
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://www.google.com https://api.resend.com https://api.stripe.com",
    "frame-src https://www.google.com",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  // HSTS (uniquement en HTTPS/production)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  return response;
}

// Appliquer le middleware à toutes les routes sauf les API et assets
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};