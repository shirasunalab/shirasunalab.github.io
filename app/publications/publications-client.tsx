"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import type { Publication } from "@/lib/types"
import { PublicationRow } from "@/components/sections/publication-row"

const typeLabels: Record<string, string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
}

export function PublicationsClient({
  publications,
}: {
  publications: Publication[]
}) {
  const [query, setQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const allYears = useMemo(() => {
    const years = new Set<number>()
    publications.forEach((p) => years.add(p.year))
    return Array.from(years).sort((a, b) => b - a)
  }, [publications])

  const allTypes = useMemo(() => {
    const types = new Set<string>()
    publications.forEach((p) => types.add(p.type))
    return Array.from(types)
  }, [publications])

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      if (
        query &&
        !p.title.toLowerCase().includes(query.toLowerCase()) &&
        !p.authors.toLowerCase().includes(query.toLowerCase()) &&
        !p.venue.toLowerCase().includes(query.toLowerCase())
      ) {
        return false
      }
      if (selectedYear && p.year !== Number(selectedYear)) return false
      if (selectedType && p.type !== selectedType) return false
      return true
    })
  }, [publications, query, selectedYear, selectedType])

  const grouped = useMemo(() => {
    const map: Record<number, Publication[]> = {}
    filtered.forEach((p) => {
      if (!map[p.year]) map[p.year] = []
      map[p.year].push(p)
    })
    return Object.entries(map)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, pubs]) => ({ year: Number(year), pubs }))
  }, [filtered])

  return (
    <div className="mt-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, author, or venue..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-wrap gap-2">
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

          <select
            value={selectedType ?? ""}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Types</option>
            {allTypes.map((type) => (
              <option key={type} value={type}>
                {typeLabels[type] ?? type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 text-xs text-muted-foreground">
        {filtered.length} publication{filtered.length !== 1 ? "s" : ""} found
      </div>

      {/* Results grouped by year */}
      <div className="mt-6 flex flex-col gap-8">
        {grouped.map(({ year, pubs }) => (
          <div key={year}>
            <h2 className="text-lg font-bold text-foreground">{year}</h2>
            <div className="mt-3 flex flex-col gap-3">
              {pubs.map((pub, i) => (
                <PublicationRow key={i} publication={pub} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          該当する業績が見つかりません。
        </p>
      )}
    </div>
  )
}
