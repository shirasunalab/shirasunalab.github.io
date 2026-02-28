import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Brain, Lightbulb, Users } from "lucide-react"
import { getResearch } from "@/lib/content"

export const metadata: Metadata = {
  title: "Research",
  description: "白砂研究室の研究テーマ。人の知性の解明、バイアスの先にあるもの、AI×ヒューマン協働システムについて研究しています。",
}

const icons = [Brain, Lightbulb, Users]

export default function ResearchPage() {
  const research = getResearch()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Research</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          認知科学・意思決定科学のアプローチから「人の知性」の本質に迫る3つの研究テーマに取り組んでいます。
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6">
        {research.map((item, i) => {
          const Icon = icons[i % icons.length]
          return (
            <Link
              key={item.slug}
              href={`/research/${item.slug}`}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-secondary/50 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-foreground group-hover:text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
