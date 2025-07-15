
import { NextRequest, NextResponse } from 'next/server';




import { getToken } from 'next-auth/jwt';

// Define protected route prefixes for each role
const adminRoutePrefix = '/admin';
const moderatorRoutePrefix = '/moderator';
const userRoutePrefix = '/talent';

const publicRoutes = ['/login', '/signup', '/', '/pricing', '/contact', '/about', '/terms', '/privacy', '/faq'];

function getAllowedRoutePrefix(role: string | undefined) {
  switch (role) {
    case 'admin':
      return adminRoutePrefix;
    case 'moderator':
      return moderatorRoutePrefix;
    case 'user':
      return userRoutePrefix;
    default:
      return undefined;
  }
}

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token1 = req.cookies.get('token');

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const role = token?.role as string | undefined;
  const allowedRoutePrefix = getAllowedRoutePrefix(role);
  const isPublicRoute = publicRoutes.includes(path);

  console.log(
    '[middleware] User role:', role,
    '| Log label: SIMPLE',
    '| Token:', token,
    '| Path:', path,
    '| Is public route:', isPublicRoute,
    '| Cookie token:', token1
  );

  // If not authenticated and not on a public route, redirect to login
  if (!token && !isPublicRoute) {
    console.log('[middleware] Not authenticated and not on a public route. Redirecting to /login.');
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // If authenticated, check if route is allowed for the user's role
  if (token && !isPublicRoute) {
    // Admin: only allow /admin/*
    if (role === 'admin' && !path.startsWith(adminRoutePrefix)) {
      console.log('[middleware] Admin trying to access non-admin route. Redirecting to /admin.');
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    // Moderator: only allow /moderator/*, but not /admin/*
    if (role === 'moderator') {
      if (path.startsWith(adminRoutePrefix) || !path.startsWith(moderatorRoutePrefix)) {
        console.log('[middleware] Moderator trying to access forbidden route. Redirecting to /moderator.');
        return NextResponse.redirect(new URL('/moderator', req.nextUrl));
      }
    }
    // User: only allow /talent/*, but not /admin/* or /moderator/*
    if (role === 'user') {
      if (path.startsWith(adminRoutePrefix) || path.startsWith(moderatorRoutePrefix) || !path.startsWith(userRoutePrefix)) {
        console.log('[middleware] User trying to access forbidden route. Redirecting to /talent.');
        return NextResponse.redirect(new URL('/talent', req.nextUrl));
      }
    }
  }

  // If authenticated and on a public route, redirect to their dashboard
  if (token && isPublicRoute) {
    if (role === 'admin' && !path.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.nextUrl));
    }
    if (role === 'moderator' && !path.startsWith('/moderator')) {
      return NextResponse.redirect(new URL('/moderator', req.nextUrl));
    }
    if (role === 'user' && !path.startsWith('/talent')) {
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

