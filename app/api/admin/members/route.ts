import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    const p = path.join(process.cwd(), 'content', 'members.json')
    const txt = await fs.readFile(p, 'utf8')
    const data = JSON.parse(txt)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: '読み取り失敗' }, { status: 500 })
  }
}
