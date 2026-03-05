export interface NewsItem {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  links: { label: string; url: string }[]
  pinned: boolean
  body: string
}

export interface ResearchItem {
  slug: string
  title: string
  tags: string[]
  summary: string
  body: string
}

export interface LabActivityItem {
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  links: { label: string; url: string }[]
  body: string
  images?: { src: string; alt?: string }[]
}

export interface Member {
  name: string
  nameEn: string
  roleCategory: "PI" | "Faculty" | "Student" | "Alumni"
  title: string
  affiliation: string
  year: number
  interests: string[]
  email: string | null
  website: string | null
  photo: string | null
  bio: string | null
}

export interface Publication {
  year: number
  type: "journal" | "conference" | "workshop" | "preprint"
  title: string
  authors: string
  venue: string
  doi: string | null
  url: string | null
  pdf: string | null
  bibtex: string | null
  highlight?: boolean
}
