import type { Metadata } from "next"
import { MapPin, Train, Bus, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Access",
  description:
    "白砂研究室（静岡大学浜松キャンパス）へのアクセス方法。住所、交通手段、地図をご確認ください。",
}

export default function AccessPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          アクセス・連絡先
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        {/* Map placeholder */}
        <section className="overflow-hidden rounded-lg border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.0!2d137.7190!3d34.7230!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601adfe7a03e5d47%3A0x3b61057d8c81e5c!2z6Z2Z5bKh5aSn5a2m5rWc5p2-44Kt44Oj44Oz44OR44K5!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="静岡大学浜松キャンパスの地図"
            className="w-full"
          />
        </section>

        {/* Info grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Address */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">住所</h2>
            </div>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <p>〒432-8011</p>
              <p>静岡県浜松市中央区城北3-5-1</p>
              <p>静岡大学 浜松キャンパス 情報学部2号館4階</p> 
              <p>教員室:J2431,  学生室:J2433</p>
              <p className="mt-2">情報学部 行動情報学科</p>
            </div>
            <div className="mt-4 text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">English</p>
              <p>Faculty of Informatics, Shizuoka University</p>
              <p>3-5-1 Johoku, Chuo-ku, Hamamatsu 432-8011, Japan</p>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-base font-bold text-foreground">連絡先</h2>
            </div>
            <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
              <p className="font-medium text-foreground">白砂 大 / Masaru Shirasuna</p>
              <p className="mt-1">講師（Junior Associate Professor）</p>
              <p className="mt-2">
                Email: m.shirasuna1392[AT]gmail.com
              </p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="https://sites.google.com/view/masaru-shirasuna"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Personal Website
              </a>
              <a
                href="https://researchmap.jp/mscog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
              >
                <ExternalLink className="h-3.5 w-3.5" /> researchmap
              </a>
            </div>
          </div>
        </div>

        {/* Transportation */}
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-base font-bold text-foreground">交通アクセス</h2>

          <div className="mt-4 flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Train className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">JR浜松駅から</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  JR浜松駅北口バスターミナルより遠鉄バスで約20分。下車すぐ。
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Bus className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">バスでのアクセス</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  遠鉄バス「15番乗り場」または「16番乗り場」から乗車し、「静岡大学」バス停で下車。所要時間約20分。
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">車でのアクセス</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  東名高速道路「浜松IC」または「浜松西IC」より約20分。キャンパス内に来客用駐車場あり。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-lg border border-border bg-secondary/50 p-6 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            研究室見学を希望される方は、事前にメールにてご連絡ください。
          </p>
          <div className="mt-4">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              配属情報を見る
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
