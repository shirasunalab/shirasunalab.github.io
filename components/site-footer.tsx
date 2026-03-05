import Link from "next/link"
import { Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold text-foreground">Shirasuna Lab / 白砂研究室</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              静岡大学 情報学部 行動情報学科
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Faculty of Informatics, Shizuoka University
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground">Links</h3>
            <ul className="mt-2 flex flex-col gap-1.5">
              {[
                { href: "/news", label: "News" },
                { href: "/research", label: "Research" },
                { href: "/sentan", label: "Sentan" },
                { href: "/members", label: "Members" },
                { href: "https://sites.google.com/view/masaru-shirasuna/home/publications-works?authuser=0", label: "Publications" },
                { href: "/join", label: "Join Us" },
                { href: "/access", label: "Access" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-foreground">Contact</h3>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span>m.shirasuna1392[AT]gmail.com</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              〒432-8011<br />
              静岡県浜松市中央区城北3-5-1<br />
              静岡大学 浜松キャンパス <br />
              情報学部2号館4階<br />
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Shirasuna Lab, Shizuoka University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
