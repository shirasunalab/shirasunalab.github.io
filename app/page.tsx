import Link from "next/link"
import { ArrowRight, Brain, Users, Lightbulb } from "lucide-react"
import { getNews, getResearch, getPublications } from "@/lib/content"
import { HeroSection } from "@/components/sections/hero-section"
import { NewsCard } from "@/components/sections/news-card"
import { ResearchCard } from "@/components/sections/research-card"
import { PublicationRow } from "@/components/sections/publication-row"

export default function HomePage() {
  const news = getNews().filter((n) => n.pinned).slice(0, 3)
  const research = getResearch()
  const publications = getPublications().slice(0, 3)

  return (
    <div>
      <HeroSection />

      {/* News Section */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">News</h2>
              <p className="mt-1 text-sm text-muted-foreground">お知らせ・最新情報</p>
            </div>
            <Link
              href="/news"
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Research</h2>
              <p className="mt-1 text-sm text-muted-foreground">研究テーマ</p>
            </div>
            <Link
              href="/research"
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {research.map((item, i) => (
              <ResearchCard
                key={item.slug}
                item={item}
                icon={i === 0 ? Brain : i === 1 ? Lightbulb : Users}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section className="border-b border-border py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Publications</h2>
              <p className="mt-1 text-sm text-muted-foreground">注目の業績</p>
            </div>
            <Link
              href="https://sites.google.com/view/masaru-shirasuna/home/publications-works?authuser=0"
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {publications.map((pub, i) => (
              <PublicationRow key={i} publication={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="rounded-lg border border-border bg-card p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Join Our Lab</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              白砂研究室では、認知科学・意思決定科学に関心のある学生を歓迎しています。配属を希望する方、共同研究にご関心のある方はお気軽にお問い合わせください。
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                配属情報を見る <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/access"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                アクセス・連絡先
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
