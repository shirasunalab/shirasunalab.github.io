"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog-news", label: "Blog＆News" },
  { href: "/research", label: "Research" },
  { href: "/sentan", label: "Sentan" },
  { href: "/members", label: "Members" },
  { href: "https://sites.google.com/view/masaru-shirasuna/home/publications-works?authuser=0", label: "Publications" },
  { href: "/join", label: "Join Us" },
  { href: "/access", label: "Access" },
]

function isActiveNavItem(pathname: string, href: string) {
  if (pathname === href) return true
  if (href === "/") return pathname === "/"

  if (href === "/blog-news") {
    return (
      pathname.startsWith("/blog-news") ||
      pathname.startsWith("/blog") ||
      pathname.startsWith("/news")
    )
  }

  return pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
          aria-label="Shirasuna Lab ホーム"
        >
          <Image
            src="/logo.png"
            alt="白砂研究室 ロゴ"
            width={80}
            height={80}
            priority
            className="h-9 w-9"
          />
          <span className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-foreground lg:text-lg">
              Shirasuna Lab
            </span>
            <span className="text-xs text-muted-foreground">
              白砂研究室 / 静岡大学
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActiveNavItem(pathname, item.href)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Mobile toggle */}
          <button
            className="rounded-md p-2 text-muted-foreground hover:bg-secondary md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActiveNavItem(pathname, item.href)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
