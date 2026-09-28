import { NextResponse } from 'next/server'

export async function POST() {
  // Clear cookie by setting expired Set-Cookie
  const cookie = `admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax` + (process.env.NODE_ENV === 'production' ? '; Secure' : '')
  return NextResponse.json({ ok: true }, { headers: { 'Set-Cookie': cookie } })
}
