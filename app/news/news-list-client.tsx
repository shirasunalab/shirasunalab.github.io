"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import type { NewsItem } from "@/lib/types"
import { NewsCard } from "@/components/sections/news-card"

export function NewsListClient({ news }: { news: NewsItem[] }) {
  const [query, setQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    news.forEach((n) => n.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [news])

  const allYears = useMemo(() => {
    const years = new Set<string>()
    news.forEach((n) => years.add(n.date.slice(0, 4)))
    return Array.from(years).sort().reverse()
  }, [news])

  const filtered = useMemo(() => {
    return news.filter((n) => {
      if (query && !n.title.toLowerCase().includes(query.toLowerCase()) && !n.summary.toLowerCase().includes(query.toLowerCase())) {
        return false
      }
      if (selectedTag && !n.tags.includes(selectedTag)) return false
      if (selectedYear && !n.date.startsWith(selectedYear)) return false
      return true
    })
  }, [news, query, selectedTag, selectedYear])

  return (
    <div className="mt-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedTag ?? ""}
            onChange={(e) => setSelectedTag(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            value={selectedYear ?? ""}
            onChange={(e) => setSelectedYear(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Years</option>
            {allYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <NewsCard key={item.slug} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          該当するニュースが見つかりません。
        </p>
      )}
    </div>
  )
}
