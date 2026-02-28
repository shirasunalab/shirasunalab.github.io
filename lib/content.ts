import type { NewsItem, ResearchItem, Member, Publication, LabActivityItem } from "@/lib/types"

import newsData from "@/content/news.json"
import researchData from "@/content/research.json"
import membersData from "@/content/members.json"
import publicationsData from "@/content/publications.json"
import labActivitiesData from "@/content/blog.json"

export function getNews(): NewsItem[] {
  return (newsData as NewsItem[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return (newsData as NewsItem[]).find((n) => n.slug === slug)
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
  return (labActivitiesData as unknown as LabActivityItem[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getLabActivityBySlug(slug: string): LabActivityItem | undefined {
  return (labActivitiesData as unknown as LabActivityItem[]).find((n) => n.slug === slug)
}

// Backwards-compatible wrappers named for "blog"
export function getBlogPosts(): LabActivityItem[] {
  return getLabActivities()
}

export function getBlogPostBySlug(slug: string): LabActivityItem | undefined {
  return getLabActivityBySlug(slug)
}
