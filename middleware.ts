import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sessionCookie, verifySessionToken } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionToken(request.cookies.get(sessionCookie.name)?.value);

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !session) {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete(sessionCookie.name);
    return response;
  }
  if (pathname === '/admin/login' && session) return NextResponse.redirect(new URL('/admin/posts', request.url));
  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
