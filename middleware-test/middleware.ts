import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log("Middleware running for:", request.nextUrl.pathname);
  const isLoggedIn = request.cookies.get('next-auth.session-token');
  console.log("isLoggedIn value:", isLoggedIn);

  if (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/p2p')) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/p2p/:path*'],
}