// Next.js Middleware for Route Protection
// Protects dashboard routes and enforces role-based access control

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const PROTECTED_ROUTES = {
  '/dashboard/farmer': ['farmer', 'admin'],
  '/dashboard/supplier': ['supplier', 'admin'],
  '/dashboard/expert': ['expert', 'admin'],
  '/dashboard/admin': ['admin'],
};

// Note: AUTH_REQUIRED_ROUTES is implicitly handled by checking pathname.startsWith('/dashboard')

// Routes only for unauthenticated users
const GUEST_ONLY_ROUTES = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the auth token from cookies (set by Firebase client SDK)
  // Note: For full server-side verification, you would need to verify the token
  // using Firebase Admin SDK in an API route or server component
  const authToken = request.cookies.get('__session')?.value;
  const userRole = request.cookies.get('user_role')?.value;
  
  // Check if user is authenticated (basic check - token exists)
  const isAuthenticated = !!authToken;
  
  // Handle guest-only routes (login, register)
  if (GUEST_ONLY_ROUTES.some(route => pathname.startsWith(route))) {
    if (isAuthenticated && userRole) {
      // Redirect authenticated users to their dashboard
      const dashboardPath = getDashboardPath(userRole);
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
    return NextResponse.next();
  }
  
  // Handle protected dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Check role-based access for specific dashboard routes
    for (const [route, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
      if (pathname.startsWith(route)) {
        if (!userRole || !allowedRoles.includes(userRole)) {
          // User doesn't have permission - redirect to their own dashboard or home
          if (userRole) {
            const correctDashboard = getDashboardPath(userRole);
            return NextResponse.redirect(new URL(correctDashboard, request.url));
          } else {
            return NextResponse.redirect(new URL('/', request.url));
          }
        }
      }
    }
  }
  
  return NextResponse.next();
}

// Helper function to get dashboard path for a role
function getDashboardPath(role: string): string {
  const dashboardPaths: Record<string, string> = {
    farmer: '/dashboard/farmer',
    supplier: '/dashboard/supplier',
    expert: '/dashboard/expert',
    admin: '/dashboard/admin',
  };
  return dashboardPaths[role] || '/dashboard/farmer';
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Match all dashboard routes
    '/dashboard/:path*',
    // Match auth routes
    '/login',
    '/register',
  ],
};
