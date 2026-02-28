import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

// simple in-memory rate limiter (per IP)
const saveAttempts = new Map<string, { count: number; last: number }>()
const SAVE_WINDOW_MS = 60 * 1000
const SAVE_MAX = 20

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

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local') as string
    const now = Date.now()
    const entry = saveAttempts.get(ip) || { count: 0, last: 0 }
    if (now - entry.last > SAVE_WINDOW_MS) {
      entry.count = 0
    }
    entry.count += 1
    entry.last = now
    saveAttempts.set(ip, entry)
    if (entry.count > SAVE_MAX) {
      return NextResponse.json({ error: 'too_many_requests' }, { status: 429 })
    }

    const cookie = req.headers.get('cookie') || ''
    const match = cookie.match(/(?:^|; )admin_session=([^;]+)/)
    const token = match ? decodeURIComponent(match[1]) : undefined
    if (!verifyToken(token)) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const members = body.members
    if (!members) return NextResponse.json({ error: 'invalid payload' }, { status: 400 })

    // server-side validation: expect array of objects with at least `name`
    if (!Array.isArray(members)) return NextResponse.json({ error: 'members must be an array' }, { status: 400 })
    for (const item of members) {
      if (!item || typeof item !== 'object') return NextResponse.json({ error: 'invalid member item' }, { status: 400 })
      if (!item.name || typeof item.name !== 'string') return NextResponse.json({ error: 'member.name required' }, { status: 400 })
    }

    const p = path.join(process.cwd(), 'content', 'members.json')
    // write file atomically by writing to a temp file then renaming
    const tmp = p + '.tmp'
    await fs.writeFile(tmp, JSON.stringify(members, null, 2), 'utf8')
    await fs.rename(tmp, p)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
