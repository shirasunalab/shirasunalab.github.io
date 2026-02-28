import type { Metadata } from "next"
import { getLabActivities } from "@/lib/content"
import { LabActivityListClient } from "./lab-activity-list-client"

export const metadata: Metadata = {
  title: "Lab Activity",
  description: "研究室の日記・活動記録。勉強会や日々の出来事を記録します。",
}

export default function LabActivityPage() {
  const activities = getLabActivities()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Lab Activity</h1>
        <p className="mt-2 text-sm text-muted-foreground">研究室の日記・活動記録</p>
      </div>

      <LabActivityListClient activities={activities} />
    </div>
  )
}
