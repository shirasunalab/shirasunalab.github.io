import Link from "next/link"
import { Calendar } from "lucide-react"
import type { LabActivityItem } from "@/lib/types"

export function LabActivityCard({ item }: { item: LabActivityItem }) {
  return (
    <Link
      href={`/lab-activity/${item.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30 hover:bg-secondary/50"
    >
      <div className="flex items-center gap-2">
        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
        <time className="text-xs text-muted-foreground">{item.date}</time>
      </div>
      <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
        {item.title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-muted-foreground">
        {item.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
