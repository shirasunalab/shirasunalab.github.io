import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // Only protect admin UI and admin API routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next()
  }

  const envUser = process.env.ADMIN_BASIC_USER || process.env.ADMIN_USER || ''
  const envPass = process.env.ADMIN_BASIC_PASS || process.env.ADMIN_PASS || ''
  if (!envUser || !envPass) {
    return new NextResponse('Admin basic auth is not configured on the server', { status: 500 })
  }

  const auth = req.headers.get('authorization') || ''
  if (auth.startsWith('Basic ')) {
    try {
      const b64 = auth.slice(6)
      // atob is available in Edge runtime; fallback to Buffer when available
      let decoded = ''
      if (typeof globalThis.atob === 'function') {
        decoded = globalThis.atob(b64)
      } else if (typeof Buffer !== 'undefined') {
        decoded = Buffer.from(b64, 'base64').toString('utf8')
      } else {
        decoded = ''
      }
      const idx = decoded.indexOf(':')
      if (idx > -1) {
        const user = decoded.slice(0, idx)
        const pass = decoded.slice(idx + 1)
        if (user === envUser && pass === envPass) {
          return NextResponse.next()
        }
      }
    } catch (err) {
      // fallthrough to challenge
    }
  }

  const res = new NextResponse('Authentication required', { status: 401 })
  res.headers.set('WWW-Authenticate', 'Basic realm="Admin Area"')
  return res
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
