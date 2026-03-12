import type { BlogNewsItem, NewsItem, ResearchItem, Member, Publication, LabActivityItem } from "@/lib/types"

import blogNewsData from "@/content/blog-news.json"
import researchData from "@/content/research.json"
import membersData from "@/content/members.json"
import publicationsData from "@/content/publications.json"

function getBlogNewsData(): BlogNewsItem[] {
  return blogNewsData as BlogNewsItem[]
}

export function getNews(): NewsItem[] {
  return getBlogNewsData()
    .filter((n) => n.kind === "news")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as unknown as NewsItem[]
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getNews().find((n) => n.slug === slug)
}

export function getResearch(): ResearchItem[] {
  return researchData as ResearchItem[]
}

export function getResearchBySlug(slug: string): ResearchItem | undefined {
  return (researchData as ResearchItem[]).find((r) => r.slug === slug)
}

export function getMembers(): Member[] {
  return membersData as Member[]
}

export function getPublications(): Publication[] {
  return (publicationsData as Publication[]).sort((a, b) => b.year - a.year)
}

export function getLabActivities(): LabActivityItem[] {
  return getBlogNewsData()
    .filter((n) => n.kind === "blog")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) as unknown as LabActivityItem[]
}

export function getLabActivityBySlug(slug: string): LabActivityItem | undefined {
  return getLabActivities().find((n) => n.slug === slug)
}

// Backwards-compatible wrappers named for "blog"
export function getBlogPosts(): LabActivityItem[] {
  return getLabActivities()
}

export function getBlogPostBySlug(slug: string): LabActivityItem | undefined {
  return getLabActivityBySlug(slug)
}

export function getBlogNews(): BlogNewsItem[] {
  return getBlogNewsData().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getBlogNewsBySlug(slug: string): BlogNewsItem | undefined {
  return getBlogNewsData().find((n) => n.slug === slug)
}
