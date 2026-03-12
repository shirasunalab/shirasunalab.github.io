import type { Metadata } from "next"
import { getBlogNews } from "@/lib/content"
import { BlogNewsListClient } from "@/app/blog-news/blog-news-list-client"

export const metadata: Metadata = {
  title: "Blog",
  description: "研究室ブログ・活動記録。勉強会や日々の出来事を記録します。",
}

export default function BlogPage() {
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
