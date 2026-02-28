import type { Metadata } from "next"
import { JoinClient } from "./join-client"

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "白砂研究室への配属・参加方法。研究室の概要、応募フロー、FAQ、スケジュールをご確認ください。",
}

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Join Us</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          白砂研究室への配属を希望する方へ
        </p>
      </div>

      <JoinClient />
    </div>
  )
}
