import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Optional custom middleware logic
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },

    pages: {
      signIn: '/auth/login',
    },
  },
);

export const config = {
  matcher: [
    '/profile/:path*',
    '/carlist/:path*',
    '/car/:path*',
    '/category/:path*',
    '/comparecar/:path*',
    '/comparison/:path*',
  ],
};
