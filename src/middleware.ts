import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin');
  const isLoggedIn = !!req.auth;

  if (isAdminPath && !isLoggedIn) {
    const url = new URL('/login', req.nextUrl.origin);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
};
