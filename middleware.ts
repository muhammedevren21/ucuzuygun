import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token') || req.cookies.get('sb-refresh-token')

  if (req.nextUrl.pathname.startsWith('/satici/panel')) {
    if (!token) {
      return NextResponse.redirect(new URL('/satici/giris', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/satici/panel/:path*'],
}
