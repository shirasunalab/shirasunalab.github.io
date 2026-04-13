export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (raw) {
    try {
      return new URL(raw)
    } catch {
      // ignore invalid URL
    }
  }

  return new URL("http://localhost:3000")
}

export function toAbsoluteUrl(pathname: string): string {
  const base = getSiteUrl()
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  return new URL(path, base).toString()
}
