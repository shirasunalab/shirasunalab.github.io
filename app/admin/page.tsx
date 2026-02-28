import AdminClient from './admin-client'

export default function AdminPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">管理画面</h1>
      <AdminClient />
    </main>
  )
}
