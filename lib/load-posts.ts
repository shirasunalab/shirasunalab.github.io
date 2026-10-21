import fs from "fs"
import path from "path"
import type { BlogNewsItem } from "@/lib/types"

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

type PostKind = "blog" | "news"

type PostMeta = {
  title?: string
  date?: string
  summary?: string
  kind?: string
  pinned?: boolean
  tags: string[]
  links: { label: string; url: string }[]
  images: { src: string; alt: string }[]
}

function unquote(raw: string): string {
  const value = raw.trim()
  if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value) as string
  }
  if (value.length >= 2 && value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1)
  }
  return value
}

function parseFrontmatter(block: string, fileLabel: string): PostMeta {
  const lines = block.split(/\r?\n/)
  const meta: PostMeta = { tags: [], links: [], images: [] }
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }

    const match = line.match(/^([A-Za-z]+):\s*(.*)$/)
    if (!match) {
      throw new Error(
        `${fileLabel} の ${i + 1} 行目を読めません: ${line}\n書き方は content/blog/README.md を見てください。`,
      )
    }

    const key = match[1]
    const rest = match[2]
    if (rest.trim() === "") {
      i++
      if (key === "tags") {
        while (i < lines.length && lines[i].startsWith("  - ")) {
          meta.tags.push(unquote(lines[i].slice(4)))
          i++
        }
        continue
      }
      if (key === "links" || key === "images") {
        while (i < lines.length && lines[i].startsWith("  - ")) {
          const first = lines[i].slice(4).trim().match(/^([A-Za-z]+):\s*(.*)$/)
          if (!first) {
            throw new Error(`${fileLabel} の ${i + 1} 行目を読めません: ${lines[i]}`)
          }
          const obj: Record<string, string> = { [first[1]]: unquote(first[2]) }
          i++
          while (i < lines.length && lines[i].startsWith("    ")) {
            const nested = lines[i].trim().match(/^([A-Za-z]+):\s*(.*)$/)
            if (!nested) {
              throw new Error(`${fileLabel} の ${i + 1} 行目を読めません: ${lines[i]}`)
            }
            obj[nested[1]] = unquote(nested[2])
            i++
          }
          if (key === "links") {
            if (!obj.label || !obj.url) {
              throw new Error(`${fileLabel} の links には label と url の両方が必要です。`)
            }
            meta.links.push({ label: obj.label, url: obj.url })
          } else if (!obj.src?.trim()) {
            throw new Error(`${fileLabel} の images には src が必要です。`)
          } else {
            meta.images.push({ src: obj.src, alt: obj.alt ?? "" })
          }
        }
        continue
      }
      throw new Error(`${fileLabel} の ${key} は一覧として読めません。`)
    }

    const value = unquote(rest)
    if (key === "pinned") {
      if (value !== "true" && value !== "false") {
        throw new Error(`${fileLabel} の pinned は true か false にしてください。`)
      }
      meta.pinned = value === "true"
    } else if (key === "tags") {
      meta.tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    } else if (key === "title" || key === "date" || key === "summary" || key === "kind") {
      meta[key] = value
    } else {
      throw new Error(
        `${fileLabel} の項目「${key}」は使えません。使える項目は title, date, tags, summary, pinned, images, links です。`,
      )
    }
    i++
  }

  return meta
}

function parsePost(filePath: string, kind: PostKind): BlogNewsItem {
  const fileLabel = path.relative(process.cwd(), filePath)
  const raw = fs.readFileSync(filePath, "utf8")
  let rest: string
  if (raw.startsWith("---\r\n")) rest = raw.slice(5)
  else if (raw.startsWith("---\n")) rest = raw.slice(4)
  else {
    throw new Error(
      `${fileLabel} の先頭は --- で始めてください。content/blog/_template.md をコピーして使ってください。`,
    )
  }

  const close = rest.search(/\r?\n---\r?\n/)
  if (close === -1) {
    throw new Error(`${fileLabel} の先頭の --- が閉じていません。`)
  }

  const meta = parseFrontmatter(rest.slice(0, close), fileLabel)
  let body = rest.slice(close).replace(/^\r?\n---\r?\n/, "")
  body = body.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  if (body.endsWith("\n")) body = body.slice(0, -1)

  if (!meta.title?.trim()) throw new Error(`${fileLabel} に title を書いてください。`)
  if (!meta.date || !DATE_RE.test(meta.date)) {
    throw new Error(`${fileLabel} の date は 2026-10-21 の形で書いてください。`)
  }
  if (!meta.summary?.trim()) throw new Error(`${fileLabel} に summary を書いてください。`)
  if (meta.kind && meta.kind !== kind) {
    throw new Error(
      `${fileLabel} は ${kind === "blog" ? "content/blog" : "content/news"} にあるので、kind は ${kind} にしてください。`,
    )
  }

  const slug = path.basename(filePath).replace(/\.md$/i, "")
  if (/\s/.test(slug)) {
    throw new Error(`${fileLabel} のファイル名に空白は使えません。日付とハイフンにしてください。`)
  }

  return {
    kind,
    slug,
    title: meta.title,
    date: meta.date,
    tags: meta.tags,
    summary: meta.summary,
    links: meta.links,
    pinned: meta.pinned ?? false,
    images: meta.images,
    body,
  }
}

function collect(dir: string, kind: PostKind): BlogNewsItem[] {
  if (!fs.existsSync(dir)) {
    throw new Error(`${path.relative(process.cwd(), dir)} フォルダがありません。`)
  }

  const posts: BlogNewsItem[] = []
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith("_") || name.toLowerCase() === "readme.md") continue
    if (!name.toLowerCase().endsWith(".md")) continue
    posts.push(parsePost(path.join(dir, name), kind))
  }
  return posts
}

export function loadBlogNewsPosts(): BlogNewsItem[] {
  const root = process.cwd()
  const posts = [
    ...collect(path.join(root, "content", "blog"), "blog"),
    ...collect(path.join(root, "content", "news"), "news"),
  ]
  const seen = new Set<string>()
  for (const post of posts) {
    if (seen.has(post.slug)) {
      throw new Error(`記事のファイル名が重複しています: ${post.slug}.md（URL はファイル名になります）`)
    }
    seen.add(post.slug)
  }
  return posts
}
