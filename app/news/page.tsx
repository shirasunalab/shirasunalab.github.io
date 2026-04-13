import type { Metadata } from "next"
import { getBlogNews } from "@/lib/content"
import { BlogNewsListClient } from "@/app/blog-news/blog-news-list-client"

export const metadata: Metadata = {
  title: "News",
  description: "白砂研究室のお知らせ・最新ニュース。論文掲載、学会発表、受賞などの情報を掲載しています。",
  alternates: {
    canonical: "/news",
  },
}

export default function NewsPage() {
  const items = getBlogNews().filter((n) => n.kind === "news")

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">News</h1>
        <p className="mt-2 text-sm text-muted-foreground">お知らせ</p>
      </div>

      <BlogNewsListClient items={items} />
    </div>
  )
}
