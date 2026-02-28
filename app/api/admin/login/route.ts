import { NextResponse } from 'next/server'
import crypto from 'crypto'

// simple in-memory rate limiter (per IP) — for production use a shared store like Redis
const loginAttempts = new Map<string, { count: number; last: number }>()
const WINDOW_MS = 60 * 1000 // 1 minute
const MAX_ATTEMPTS = 10

function safeEquals(a: string, b: string) {
  try {
    const A = Buffer.from(a)
    const B = Buffer.from(b)
    if (A.length !== B.length) return false
    return crypto.timingSafeEqual(A, B)
  } catch (e) {
    return false
  }
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local') as string
    const now = Date.now()
    const entry = loginAttempts.get(ip) || { count: 0, last: 0 }
    if (now - entry.last > WINDOW_MS) {
      entry.count = 0
    }
    entry.count += 1
    entry.last = now
    loginAttempts.set(ip, entry)
    if (entry.count > MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'too_many_requests' }, { status: 429 })
    }

    const body = await req.json()
    const user = String(body.user || '')
    const pass = String(body.pass || '')

    const envUser = String(process.env.ADMIN_USER || '')
    const envPass = String(process.env.ADMIN_PASS || '')

    if (safeEquals(user, envUser) && safeEquals(pass, envPass)) {
      const secret = process.env.ADMIN_SECRET || 'change-this-secret'
      const expiry = Date.now() + 24 * 60 * 60 * 1000
      const value = `${user}:${expiry}`
      const hmac = crypto.createHmac('sha256', secret).update(value).digest('hex')
      const token = Buffer.from(value).toString('base64') + '.' + hmac
      const cookieValue = encodeURIComponent(token)
      const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : ''
      const cookie = `admin_session=${cookieValue}; HttpOnly; Path=/; SameSite=Lax; Max-Age=86400${secureFlag}`
      return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } })
    }
    return NextResponse.json({ error: 'invalid' }, { status: 401 })
  } catch (err) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
