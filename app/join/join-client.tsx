"use client"

import { useState } from "react"
import { ChevronDown, Mail, MessageSquare, BookOpen, Users, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const faqItems = [
  {
    question: "どのような研究テーマに取り組めますか？",
    answer:
      "認知科学・意思決定科学に関連するテーマであれば幅広く対応します。主な領域は「ヒューリスティックと生態学的合理性」「不確実性下の判断とバイアス」「人間とAIの協働」です。学生の興味に合わせてテーマを一緒に設定します。",
  },
  {
    question: "プログラミングの経験は必要ですか？",
    answer:
      "必須ではありませんが、研究ではPython・R等を用いたデータ分析やシミュレーションを行うことが多いため、基本的なプログラミングスキルがあると望ましいです。入門段階からサポートしますので、意欲があれば問題ありません。",
  },
  {
    question: "ゼミや研究室のミーティングはどのような形式ですか？",
    answer:
      "週1回の研究ゼミ（進捗報告・論文紹介）と、必要に応じた個別ミーティングを行っています。ゼミでは論文の読み方、発表の仕方、研究の進め方なども丁寧に指導します。",
  },
  {
    question: "大学院進学は推奨されますか？",
    answer:
      "認知科学の研究を深めたい方には大学院進学を強くお勧めします。進学に関する相談はいつでも受け付けています。",
  },
  {
    question: "共同研究の受け入れは可能ですか？",
    answer:
      "共同研究や見学希望も歓迎しています。まずはメールにてご相談ください。",
  },
]

const timeline = [
  {
    period: "3年次前期",
    title: "研究室説明会・見学",
    description: "研究室の研究内容や雰囲気を知る機会です。気軽にお越しください。",
  },
  {
    period: "3年次 5月末頃～6月初旬頃",
    title: "配属希望提出",
    description: "学科の配属スケジュールに従って希望を提出します。",
  },
  {
    period: "3年次 7月〜",
    title: "研究室活動開始",
    description: "ゼミへの参加、研究テーマの設定、関連論文の輪読を行います。",
  },
  {
    period: "4年次 通年",
    title: "卒業研究",
    description: "実験・分析・論文執筆を進めます。学会発表の機会もあります。",
  },
]

export function JoinClient() {
  return (
    <div className="mt-10 flex flex-col gap-12">
      {/* Overview */}
      <section>
        <h2 className="text-xl font-bold text-foreground">研究室の特徴</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "認知科学の最前線",
              desc: "ヒューリスティック、集合知、AI協働など、最新の認知科学研究に取り組めます。",
            },
            {
              icon: Users,
              title: "少人数の丁寧な指導",
              desc: "一人ひとりの興味と進度に合わせた個別指導を行います。",
            },
            {
              icon: MessageSquare,
              title: "挑戦的な研究環境",
              desc: "国内会議（認知科学会等）や国際会議（CogSci等）での発表の機会があります。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-card p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-xl font-bold text-foreground">配属スケジュール</h2>
        <div className="mt-4 flex flex-col gap-0">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                {i < timeline.length - 1 && (
                  <div className="h-full w-px bg-border" />
                )}
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {step.period}
                  </span>
                </div>
                <h3 className="mt-1 text-sm font-bold text-foreground">{step.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-foreground">FAQ</h2>
        <div className="mt-4 flex flex-col gap-2">
          {faqItems.map((item, i) => (
            <FaqAccordion key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="rounded-lg border border-border bg-card p-6 text-center md:p-8">
        <h2 className="text-lg font-bold text-foreground">お問い合わせ</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          研究室見学や配属に関するご質問は、お気軽に以下のメールアドレスまでご連絡ください。
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground">
          <Mail className="h-4 w-4 text-primary" />
          <span>m.shirasuna1392[AT]gmail.com</span>
        </div>
        <div className="mt-4">
          <Link
            href="/access"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            アクセス情報を見る
          </Link>
        </div>
      </section>
    </div>
  )
}

function FaqAccordion({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      )}
    </div>
  )
}
