import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getResearch, getResearchBySlug } from "@/lib/content"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const research = getResearch()
  return research.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getResearchBySlug(slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.summary,
  }
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getResearchBySlug(slug)
  if (!item) notFound()

  const allResearch = getResearch()
  const otherTopics = allResearch.filter((r) => r.slug !== slug)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <Link
        href="/research"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Research
      </Link>

      <article className="mt-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {item.title}
        </h1>

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

        <div className="mt-6 rounded-lg border border-border bg-card p-4">
          <p className="text-sm leading-relaxed text-foreground">{item.summary}</p>
        </div>

        <div className="mt-8 text-sm leading-relaxed text-foreground">
          {item.body.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mt-4 first:mt-0">
              {paragraph.split("**").map((part, j) =>
                j % 2 === 1 ? (
                  <strong key={j}>{part}</strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          ))}
        </div>
      </article>

      {otherTopics.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-lg font-bold text-foreground">Other Research Topics</h2>
          <div className="mt-4 flex flex-col gap-3">
            {otherTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/research/${topic.slug}`}
                className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-secondary/50"
              >
                <h3 className="text-sm font-semibold text-foreground">{topic.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{topic.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
