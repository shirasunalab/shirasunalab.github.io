import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react"
import { getBlogNews, getBlogNewsBySlug } from "@/lib/content"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const items = getBlogNews()
  return items.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = getBlogNewsBySlug(slug)
  if (!item) return {}
  return {
    title: item.title,
    description: item.summary,
    keywords: item.tags,
    alternates: {
      canonical: `/blog-news/${item.slug}`,
    },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.summary,
      url: `/blog-news/${item.slug}`,
      publishedTime: new Date(item.date).toISOString(),
      tags: item.tags,
    },
    twitter: {
      card: "summary",
      title: item.title,
      description: item.summary,
    },
  }
}

export default async function BlogNewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = getBlogNewsBySlug(slug)
  if (!item) notFound()

  const images = (item.images ?? []).filter((img) => (img.src ?? "").trim().length > 0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6">
      <Link
        href="/blog-news"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog＆News
      </Link>

      <article className="mt-8">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <time className="text-sm text-muted-foreground">{item.date}</time>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
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

        <div className="mt-8 text-sm leading-relaxed text-foreground">
          {images.length > 0 && (
            <div className="mb-6 flex flex-col gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.src}
                  alt={img.alt ?? item.title}
                  className="w-full rounded-md"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          )}

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

        {item.links.length > 0 && (
          <div className="mt-8 rounded-lg border border-border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground">Related Links</h2>
            <div className="mt-2 flex flex-col gap-2">
              {item.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
