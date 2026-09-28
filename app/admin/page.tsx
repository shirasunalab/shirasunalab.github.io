import type { Metadata } from "next"
import AdminClient from "./admin-client"

export const metadata: Metadata = {
  title: "管理画面",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">管理画面</h1>
      <AdminClient />
    </main>
  )
}
