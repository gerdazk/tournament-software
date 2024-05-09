import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const session = await getToken({ req: request, secret: process.env.SECRET })
  const isAdmin = session?.user?.role === 'admin'

  return isAdmin
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/admin/:path*'
}
