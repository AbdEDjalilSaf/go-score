// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  // If no access token, redirect to login
  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Optional: Refresh token if accessToken expired (e.g., ping API to verify)
  // Add logic here to refresh and set cookies using NextResponse.cookies

  // return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/users/:path*', '/products/:path*', '/dashboard/dashStudent/:path*', '/dashboard/dashTeacher/:path*', '/dashboard/dashStudent/smartTest/:path*', '/dashboard/dashStudent/examGlobalTest/:path*' ], // Protected routes
};