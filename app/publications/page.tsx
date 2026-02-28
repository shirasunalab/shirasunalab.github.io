import type { Metadata } from "next"
import { getPublications } from "@/lib/content"
import { PublicationsClient } from "./publications-client"

export const metadata: Metadata = {
  title: "Publications",
  description:
    "白砂研究室の業績一覧。学術誌論文、国際会議論文、プレプリントなどを掲載しています。",
}

export default function PublicationsPage() {
  const publications = getPublications()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Publications</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          業績一覧
        </p>
      </div>
      <PublicationsClient publications={publications} />
    </div>
  )
}
