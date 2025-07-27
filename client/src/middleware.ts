
import { NextRequest, NextResponse } from 'next/server';




import { getToken } from 'next-auth/jwt';

// Define protected route prefixes for each role
const adminRoutePrefix = '/admin';
const moderatorRoutePrefix = '/moderator';
const userRoutePrefix = '/talent';

const publicRoutes = ['/login', '/signup', '/', '/pricing', '/contact', '/about', '/terms', '/privacy', '/faq'];
// creatate admin routes and moderator routes 
// Define which routes are protected for each role
export const adminRoutes = [
  '/admin',
  '/admin/dashboard',
  '/admin/settings',
  // add more admin-only routes here
];

export const moderatorRoutes = [
  '/moderator',
  '/moderator/dashboard',
  '/moderator/settings',
  // add more moderator-only routes here
];

export const userRoutes = [
  '/talent',
  '/talent/dashboard',
  '/talent/profile',
  // add more user-only routes here
];




export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const roleId = token?.roleId as number | undefined;
  const isPublicRoute = publicRoutes.includes(path);

  // If not authenticated and not on a public route, redirect to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // If authenticated, check if route is allowed for the user's roleId
  if (token && !isPublicRoute ) {
    // Admin: only allow /admin/*
    if (roleId === 1 && !path.startsWith(adminRoutePrefix)) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    // Moderator: only allow /moderator/*, but not /admin/*
    if (roleId === 3) {
      if (path.startsWith(adminRoutePrefix) || !path.startsWith(moderatorRoutePrefix)) {
        return NextResponse.redirect(new URL('/moderator', req.nextUrl));
      }
    }
    // User: only allow /talent/*, but not /admin/* or /moderator/*
    if (roleId === 2) {
      if (path.startsWith(adminRoutePrefix) || path.startsWith(moderatorRoutePrefix) || !path.startsWith(userRoutePrefix)) {
        return NextResponse.redirect(new URL('/talent', req.nextUrl));
      }
    }
  }

  // If authenticated and on a public route, redirect to their dashboard
  if (token && isPublicRoute) {
    if (roleId === 1 && !path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    if (roleId === 3 && !path.startsWith('/moderator')) {
      return NextResponse.redirect(new URL('/moderator', req.nextUrl));
    }
    if (roleId === 2 && !path.startsWith('/talent')) {
      return NextResponse.redirect(new URL('/talent', req.nextUrl));
    }
  }


  return NextResponse.next();
}



export const config = {
  matcher: [
    '/',
    '/((?!api|_next|.*\\.).*)', // Excludes API routes, Next.js internals, and files with extensions
  ]};

