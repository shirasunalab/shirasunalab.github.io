import type { Metadata } from "next"
import { getMembers } from "@/lib/content"
import { MembersClient } from "./members-client"

export const metadata: Metadata = {
  title: "Members",
  description:
    "白砂研究室のメンバー紹介。教員、大学院生、共同研究者の一覧です。現在実装作業中です。",
}

export default function MembersPage() {
  const members = getMembers()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Members</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          研究室メンバー
        </p>
      </div>
      <MembersClient members={members} />
    </div>
  )
}
