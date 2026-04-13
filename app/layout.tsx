import type { Metadata, Viewport } from "next"
import { Noto_Sans_JP, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"
import { getSiteUrl } from "@/lib/site"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "白砂研究室 | Shirasuna Lab - 静岡大学",
    template: "%s | 白砂研究室",
  },
  description:
    "静岡大学情報学部行動情報学科 白砂研究室。認知科学・意思決定科学の視点から「人の知性」の本質を解明する研究を行っています。Cognitive Science and Decision Science Laboratory at Shizuoka University.",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "白砂研究室 | Shirasuna Lab",
    title: "白砂研究室 | Shirasuna Lab - 静岡大学",
    description:
      "静岡大学情報学部行動情報学科 白砂研究室。認知科学・意思決定科学の視点から「人の知性」の本質を解明する研究を行っています。",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "白砂研究室 | Shirasuna Lab - 静岡大学",
    description:
      "静岡大学情報学部行動情報学科 白砂研究室。認知科学・意思決定科学の視点から「人の知性」の本質を解明する研究を行っています。",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a365d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = getSiteUrl().toString().replace(/\/$/, "")
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "白砂研究室 | Shirasuna Lab",
    url: baseUrl,
    inLanguage: "ja",
  }
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "白砂研究室 | Shirasuna Lab",
    url: baseUrl,
  }

  return (
    <html lang="ja" className={`${notoSansJP.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={orgJsonLd} />
        <Analytics />
      </body>
    </html>
  )
}
