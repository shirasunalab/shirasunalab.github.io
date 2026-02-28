import { NextResponse } from 'next/server'
import crypto from 'crypto'

function verifyToken(token: string | undefined) {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [b64, hmac] = parts
  try {
    const value = Buffer.from(b64, 'base64').toString('utf8')
    const secret = process.env.ADMIN_SECRET || 'change-this-secret'
    const expected = crypto.createHmac('sha256', secret).update(value).digest('hex')
    if (expected !== hmac) return false
    const [user, expiryStr] = value.split(':')
    const expiry = Number(expiryStr || '0')
    if (Date.now() > expiry) return false
    return true
  } catch (err) {
    return false
  }
}

export async function GET(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  const match = cookie.match(/(?:^|; )admin_session=([^;]+)/)
  const token = match ? decodeURIComponent(match[1]) : undefined
  if (verifyToken(token)) return NextResponse.json({ ok: true })
  return NextResponse.json({ ok: false }, { status: 401 })
}
