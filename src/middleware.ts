import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('next-auth.session-token')?.value ??
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  const { pathname } = request.nextUrl;

  const protectedPaths = [
    '/api/compile',
    '/messages',
    '/problems/add_p',
    '/problems/update_p',
    '/pages/api',
    '/api/messages'
  ];

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/compile/:path*',
    '/messages/:path*',
    '/problems/add_p',
    '/problems/update_p',
    '/pages/api/:path*',
    '/api/messages/:path*',
    '/login'
  ],
};
