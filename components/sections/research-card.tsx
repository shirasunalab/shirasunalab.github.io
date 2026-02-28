import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import type { ResearchItem } from "@/lib/types"

export function ResearchCard({
  item,
  icon: Icon,
}: {
  item: ResearchItem
  icon: LucideIcon
}) {
  return (
    <Link
      href={`/research/${item.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-secondary/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground group-hover:text-primary">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {item.summary}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
        Read more <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  )
}
