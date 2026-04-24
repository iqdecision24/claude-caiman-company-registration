import type { NextAuthConfig } from 'next-auth';

// Edge-safe subset of the NextAuth config. Does NOT import Prisma.
// Used by the middleware so it can run on the Edge runtime.
export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.role = (user as { role: 'ADMIN' | 'EDITOR' }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'ADMIN' | 'EDITOR';
      }
      return session;
    },
    authorized({ auth, request }) {
      const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
      if (isAdminPath) return !!auth;
      return true;
    },
  },
};
