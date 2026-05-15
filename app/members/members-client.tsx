"use client"

import { useState, useMemo } from "react"
import { Mail, ExternalLink, User } from "lucide-react"
import type { Member } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const categoryLabels: Record<string, string> = {
  PI: "Principal Investigator",
  Faculty: "Faculty / Collaborators",
  Student: "Students",
  Alumni: "Alumni",
}

const categoryOrder = ["PI", "Faculty", "Student", "Alumni"]

export function MembersClient({ members }: { members: Member[] }) {
  const [activeTab, setActiveTab] = useState<string>("all")

  const categories = useMemo(() => {
    const cats = new Set<string>()
    members.forEach((m) => cats.add(m.roleCategory))
    return categoryOrder.filter((c) => cats.has(c))
  }, [members])

  const filtered = useMemo(() => {
    if (activeTab === "all") return members
    return members.filter((m) => m.roleCategory === activeTab)
  }, [members, activeTab])

  const grouped = useMemo(() => {
    const map: Record<string, Member[]> = {}
    filtered.forEach((m) => {
      if (!map[m.roleCategory]) map[m.roleCategory] = []
      map[m.roleCategory].push(m)
    })
    return categoryOrder.filter((c) => map[c]).map((c) => ({ category: c, members: map[c] }))
  }, [filtered])

  return (
    <div className="mt-8">
      {/* Tab filters */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Member categories">
        <button
          role="tab"
          aria-selected={activeTab === "all"}
          onClick={() => setActiveTab("all")}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            activeTab === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeTab === cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Member groups */}
      <div className="mt-8 flex flex-col gap-10">
        {grouped.map(({ category, members: groupMembers }) => (
          <div key={category}>
            <h2 className="text-lg font-bold text-foreground">
              {categoryLabels[category]}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {groupMembers.map((member) => (
                <MemberCard key={member.nameEn} member={member} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          該当するメンバーがいません。
        </p>
      )}
    </div>
  )
}

function MemberCard({ member }: { member: Member }) {
  return (
    <div className="flex gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/20">
      <Avatar className="h-14 w-14 shrink-0">
        {member.photo ? (
          <AvatarImage src={member.photo} alt={member.name} />
        ) : null}
        <AvatarFallback className="bg-secondary">
          <User className="h-6 w-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-sm font-bold text-foreground">{member.name}</h3>
          <span className="text-xs text-muted-foreground">{member.nameEn}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{member.title}</p>
        {member.affiliation && (
          <p className="mt-0.5 text-xs text-muted-foreground">{member.affiliation}</p>
        )}

        {member.bio && (
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {member.bio}
          </p>
        )}

        {member.interests.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {member.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-3">
          {member.email && (
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              {member.email}
            </span>
          )}
          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80"
            >
              <ExternalLink className="h-3 w-3" /> Website
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
