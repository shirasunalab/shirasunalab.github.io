import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const sourcePath = path.join(root, "content", "blog-news.json")
const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"))

if (!Array.isArray(source)) {
  throw new Error("content/blog-news.json must contain an array.")
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/
const seenSlugs = new Set()

function yamlString(value, label) {
  if (typeof value !== "string") {
    throw new Error(`${label} must be a string.`)
  }
  return JSON.stringify(value)
}

function requiredString(post, key) {
  const value = post[key]
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${post.slug ?? "<unknown>"}: ${key} must be a non-empty string.`)
  }
  return value
}

function list(value, label) {
  if (value === undefined) return []
  if (!Array.isArray(value)) throw new Error(`${label} must be an array.`)
  return value
}

function renderList(values, renderItem) {
  return values.length === 0 ? [] : ["", ...values.flatMap(renderItem)]
}

function renderPost(post) {
  const kind = requiredString(post, "kind")
  if (kind !== "blog" && kind !== "news") {
    throw new Error(`${post.slug ?? "<unknown>"}: kind must be "blog" or "news".`)
  }

  const slug = requiredString(post, "slug")
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(slug)) {
    throw new Error(`${slug}: slug contains unsupported characters.`)
  }
  if (seenSlugs.has(slug)) throw new Error(`Duplicate slug: ${slug}.`)
  seenSlugs.add(slug)

  const date = requiredString(post, "date")
  if (!datePattern.test(date)) throw new Error(`${slug}: date must use YYYY-MM-DD.`)

  const tags = list(post.tags, `${slug}: tags`)
  const links = list(post.links, `${slug}: links`)
  const images = list(post.images, `${slug}: images`).filter(
    (image) => image && typeof image.src === "string" && image.src.trim() !== "",
  )

  const body = requiredString(post, "body").replace(/\\n/g, "\n")
  const lines = [
    "---",
    `title: ${yamlString(requiredString(post, "title"), `${slug}: title`)}`,
    `date: ${yamlString(date, `${slug}: date`)}`,
    "tags:",
    ...tags.map((tag, index) => `  - ${yamlString(tag, `${slug}: tags[${index}]`)}`),
    `summary: ${yamlString(requiredString(post, "summary"), `${slug}: summary`)}`,
    `pinned: ${post.pinned === true ? "true" : "false"}`,
    ...renderList(links, (link, index) => {
      if (!link || typeof link.label !== "string" || typeof link.url !== "string") {
        throw new Error(`${slug}: links[${index}] must contain label and url.`)
      }
      return [
        "links:",
        `  - label: ${yamlString(link.label, `${slug}: links[${index}].label`)}`,
        `    url: ${yamlString(link.url, `${slug}: links[${index}].url`)}`,
      ]
    }),
    ...renderList(images, (image, index) => [
      "images:",
      `  - src: ${yamlString(image.src, `${slug}: images[${index}].src`)}`,
      `    alt: ${yamlString(typeof image.alt === "string" ? image.alt : "", `${slug}: images[${index}].alt`)}`,
    ]),
    "---",
    body.trim(),
    "",
  ]

  return { kind, slug, content: `${lines.join("\n")}` }
}

const generated = source.map(renderPost)
const generatedByKind = {
  blog: generated.filter((post) => post.kind === "blog"),
  news: generated.filter((post) => post.kind === "news"),
}

for (const [kind, posts] of Object.entries(generatedByKind)) {
  const directory = path.join(root, "content", kind)
  fs.mkdirSync(directory, { recursive: true })

  for (const name of fs.readdirSync(directory)) {
    if (name.endsWith(".md") && name !== "README.md" && name !== "_template.md") {
      fs.unlinkSync(path.join(directory, name))
    }
  }

  for (const post of posts) {
    fs.writeFileSync(path.join(directory, `${post.slug}.md`), post.content, "utf8")
  }
}

console.log(`Generated ${generated.length} blog/news Markdown files from content/blog-news.json.`)
