"use client"
import React, { useEffect, useState } from 'react'

export default function AdminClient() {
  const [logged, setLogged] = useState(false)
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [membersText, setMembersText] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/me').then((r) => {
      if (r.ok) setLogged(true)
    })
    fetch('/api/admin/members')
      .then((r) => r.json())
      .then((data) => setMembersText(JSON.stringify(data, null, 2)))
      .catch(() => setMembersText(''))
  }, [])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setMsg(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, pass }),
      })
      if (res.ok) {
        setLogged(true)
        setMsg('ログインしました')
      } else {
        setMsg('認証に失敗しました')
      }
    } catch (err) {
      setMsg('通信エラー')
    } finally {
      setLoading(false)
    }
  }

  async function saveMembers() {
    setMsg(null)
    try {
      const parsed = JSON.parse(membersText)
      // basic client-side validation
      if (!Array.isArray(parsed)) {
        setMsg('members は配列である必要があります')
        return
      }
      for (const item of parsed) {
        if (!item || typeof item !== 'object' || !item.name) {
          setMsg('各メンバーに少なくとも `name` が必要です')
          return
        }
      }
      if (!confirm('members.json を上書き保存します。よろしいですか？')) return
      setLoading(true)
      const res = await fetch('/api/admin/save-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: parsed }),
      })
      if (res.ok) {
        setMsg('保存しました')
      } else {
        const j = await res.json()
        setMsg(j?.error || '保存に失敗しました')
      }
    } catch (err) {
      setMsg('JSON が無効です')
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    setMsg(null)
    setLoading(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      setLogged(false)
      setMsg('ログアウトしました')
    } catch (err) {
      setMsg('通信エラー')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      {!logged ? (
        <form onSubmit={login} className="max-w-md">
          <h2 className="text-lg font-semibold mb-2">Admin Login</h2>
          <label className="block mb-2">ユーザー
            <input className="block w-full mt-1" value={user} onChange={(e) => setUser(e.target.value)} />
          </label>
          <label className="block mb-2">パスワード
            <input type="password" className="block w-full mt-1" value={pass} onChange={(e) => setPass(e.target.value)} />
          </label>
          <div className="flex items-center gap-2">
            <button className="btn" type="submit" disabled={loading}>{loading ? '処理中...' : 'ログイン'}</button>
          </div>
          {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
        </form>
      ) : (
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Members JSON Editor</h2>
            <div>
              <button className="btn mr-2" onClick={logout} disabled={loading}>{loading ? '処理中...' : 'ログアウト'}</button>
            </div>
          </div>
          <textarea className="w-full h-96 p-2 font-mono border rounded" value={membersText} onChange={(e) => setMembersText(e.target.value)} />
          <div className="mt-2">
            <button className="btn mr-2" onClick={saveMembers} disabled={loading}>{loading ? '処理中...' : '保存'}</button>
          </div>
          {msg && <p className="mt-2 text-sm">{msg}</p>}
        </div>
      )}
    </div>
  )
}
