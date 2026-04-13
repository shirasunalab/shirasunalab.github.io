export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) {
    try {
      return new URL(explicit)
    } catch {
      // ignore invalid URL
    }
  }

  // Hosting provider fallbacks (avoid localhost canonical in production)
  const vercelUrl = process.env.VERCEL_URL
  if (vercelUrl) {
    return new URL(`https://${vercelUrl}`)
  }

  const netlifyUrl = process.env.URL || process.env.DEPLOY_PRIME_URL
  if (netlifyUrl) {
    try {
      return new URL(netlifyUrl)
    } catch {
      // ignore invalid URL
    }
  }

  const cfPagesUrl = process.env.CF_PAGES_URL
  if (cfPagesUrl) {
    try {
      return new URL(cfPagesUrl)
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
