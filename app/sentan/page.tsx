import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Sentan",
  description:
    "先端情報学実習（sentan）『実世界と数理世界を結ぶモデリングとシミュレーション』—通称シミュレーション・プロジェクトの紹介ページです。",
  alternates: {
    canonical: "/sentan",
  },
}

export default function SentanPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 lg:px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sentan</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          先端情報学実習プロジェクト
          「実世界と数理世界を結ぶモデリングとシミュレーション」
          （通称:シミュプロ, 主催:森田純哉先生）の紹介ページです。
          白砂研究室では、教員ごとに複数あるプロジェクトのうちの一つとして活動を行っています。
          2年生から、実践的な研究プロセスに触れられることが特徴です。
        </p>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-foreground">何をするの？</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            人の認知・意思決定・学習といった「行動」を、モデルとして表現し、
            シミュレーションで検証します。実験データ（反応時間、正答率など）と
            モデルのふるまいがどれだけ一致するかを手がかりに、理解を深めます。
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-foreground">何が身につく？</h2>
          <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>・現象を「変数」と「関係」で捉えるモデリング思考</li>
            <li>・データとモデルを往復する検証のしかた</li>
            <li>・仮説→実装→評価→改善の研究サイクル</li>
            <li>・再現可能なレポート/発表の進め方</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-bold text-foreground">誰に向いてる？</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            数理・プログラミングに強い興味がある人はもちろん、
            「人を理解する」ことに関心がある人にも向いています。
            2年生から参加できるため、早い段階で研究の手触りを得られます。
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-border bg-card p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold tracking-tight text-foreground">進め方（イメージ）</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              実世界の観測（実験）と、コンピュータ上のモデル（形式表現）を
              「マッチさせる」ことを目標に、段階的に進めます。
            </p>
            <ol className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>1. 問いの設定：何を説明したいか（行動・認知プロセス）</li>
              <li>2. モデル化：仮定・パラメータ・ルールを明確化</li>
              <li>3. 実装：シミュレーションでモデルのふるまいを生成</li>
              <li>4. 検証：反応時間、正答率などの指標でデータと比較</li>
              <li>5. 改善：不一致の理由を考え、モデルや実験設計を更新</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">アピールポイント</h2>
          <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>
              このプロジェクトは、講義で学ぶ知識を「研究の流れ」として接続することを
              重視します。2年生から、実験・モデル・シミュレーション・評価という
              一連のプロセスを体験できます。
            </p>
            <p>
              早い段階から研究の作法に触れることで、卒業研究や共同研究にスムーズに
              つなげられることを目指します。
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <h2 className="text-xl font-bold tracking-tight text-foreground">興味がある方へ</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            参加方法や配属に関する情報は Join Us、連絡先は Access にまとめています。
            まずは雰囲気を知りたい方も歓迎です。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Join Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/access"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
