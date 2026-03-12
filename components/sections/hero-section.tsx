import { Brain, Sparkles } from "lucide-react"
import Link from "next/link"
import { getBlogNews } from "@/lib/content"

export function HeroSection() {
  const combined = getBlogNews()
  const latest = combined.slice(0, 1)

  return (
    <section className="relative overflow-hidden border-b border-border bg-card py-20 md:py-28">
      {/* Subtle decorative element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-accent/5" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 lg:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Shirasuna Laboratory
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
              認知科学から探る<br />
              <span className="text-primary">「人の知性」</span>の本質
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              静岡大学 情報学部 行動情報学科 白砂研究室。ヒューリスティック、不確実性下の判断、集合知、人間とAIの協働など、意思決定科学を中心とした認知科学の研究を行っています。
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Cognitive Science",
                "Decision Science",
                "Heuristics",
                "Wisdom of Crowds",
                "Human-AI Collaboration",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-4 md:w-72">
            <div className="rounded-lg border border-border bg-background p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="text-xs font-medium text-muted-foreground uppercase">Latest</span>
                </div>
                <Link href="/blog-news" className="text-xs text-muted-foreground hover:underline">View all</Link>
              </div>

              <ul className="mt-3 space-y-3">
                {latest.map((it) => (
                  <li key={`${it.kind}-${it.slug}`}>
                    <Link
                      href={`/blog-news/${it.slug}`}
                      className="block rounded-sm px-1 py-0.5 hover:bg-muted/30"
                    >
                      <div className="text-xs text-muted-foreground">{new Date(it.date).toLocaleDateString()}</div>
                      <div className="mt-0.5 text-sm font-medium text-foreground">{it.title}</div>
                    </Link>
                  </li>
                ))}
                {latest.length === 0 && (
                  <li className="text-sm text-muted-foreground">最新の更新はありません。</li>
                )}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-background p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase">
                Principal Investigator
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">白砂 大 / Masaru Shirasuna</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Ph.D. in Cognitive Science, The University of Tokyo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
