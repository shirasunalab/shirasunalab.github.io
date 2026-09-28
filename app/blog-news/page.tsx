import type { Metadata } from "next"
import { getBlogNews } from "@/lib/content"
import { BlogNewsListClient } from "./blog-news-list-client"

export const metadata: Metadata = {
  title: "Blog＆News",
  description: "研究室の活動記録（Blog）とお知らせ（News）をまとめて掲載します。",
  alternates: {
    canonical: "/blog-news",
  },
}

export default function BlogNewsPage() {
  const items = getBlogNews()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog＆News</h1>
        <p className="mt-2 text-sm text-muted-foreground">活動記録・お知らせ</p>
      </div>

      <BlogNewsListClient items={items} />
    </div>
  )
}
