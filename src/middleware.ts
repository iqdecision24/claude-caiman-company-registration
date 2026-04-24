// Edge-safe middleware: uses auth.config.ts (no Prisma import).
import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth.config';

export const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const isAdminPath = req.nextUrl.pathname.startsWith('/admin');
  const isLoggedIn = !!req.auth;

  if (isAdminPath && !isLoggedIn) {
    const url = new URL('/login', req.nextUrl.origin);
    url.searchParams.set('callbackUrl', req.nextUrl.pathname);
    return Response.redirect(url);
  }
  return undefined;
});

export const config = {
  matcher: ['/admin/:path*'],
};
