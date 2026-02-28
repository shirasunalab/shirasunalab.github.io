import type { Metadata } from "next"
import { getBlogPosts } from "@/lib/content"
import { BlogListClient } from "./blog-list-client"

export const metadata: Metadata = {
  title: "Blog",
  description: "研究室ブログ・活動記録。勉強会や日々の出来事を記録します。",
}

export default function BlogPage() {
  const posts = getBlogPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="mt-2 text-sm text-muted-foreground">研究室ブログ・活動記録</p>
      </div>

      <BlogListClient posts={posts} />
    </div>
  )
}
