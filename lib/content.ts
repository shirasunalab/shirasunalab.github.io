import type { BlogNewsItem, NewsItem, ResearchItem, Member, Publication, LabActivityItem } from "@/lib/types"
import { loadBlogNewsPosts } from "@/lib/load-posts"

import researchData from "@/content/research.json"
import membersData from "@/content/members.json"
import publicationsData from "@/content/publications.json"

function getBlogNewsData(): BlogNewsItem[] {
  return loadBlogNewsPosts()
}

export function getNews(): NewsItem[] {
  return getBlogNews().filter((n) => n.kind === "news") as unknown as NewsItem[]
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
  return getBlogNews().filter((n) => n.kind === "blog") as unknown as LabActivityItem[]
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
  return getBlogNewsData().slice().sort((a, b) => {
    const byDate = new Date(b.date).getTime() - new Date(a.date).getTime()
    if (byDate !== 0) return byDate
    if (a.slug < b.slug) return -1
    if (a.slug > b.slug) return 1
    return 0
  })
}

export function getBlogNewsBySlug(slug: string): BlogNewsItem | undefined {
  return getBlogNewsData().find((n) => n.slug === slug)
}
