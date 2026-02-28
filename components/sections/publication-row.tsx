"use client"

import { ExternalLink, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { Publication } from "@/lib/types"

const typeLabels: Record<string, string> = {
  journal: "Journal",
  conference: "Conference",
  workshop: "Workshop",
  preprint: "Preprint",
}

const typeColors: Record<string, string> = {
  journal: "bg-primary/10 text-primary",
  conference: "bg-accent/10 text-accent",
  workshop: "bg-chart-4/20 text-foreground",
  preprint: "bg-muted text-muted-foreground",
}

export function PublicationRow({ publication }: { publication: Publication }) {
  const [copied, setCopied] = useState(false)

  const handleCopyBibtex = async () => {
    if (publication.bibtex) {
      await navigator.clipboard.writeText(publication.bibtex)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/20">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[publication.type] ?? typeColors.preprint}`}
        >
          {typeLabels[publication.type] ?? publication.type}
        </span>
        <span className="text-xs text-muted-foreground">{publication.year}</span>
      </div>

      <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground">
        {publication.title}
      </h3>

      <p className="mt-1 text-xs text-muted-foreground">{publication.authors}</p>
      <p className="mt-0.5 text-xs italic text-muted-foreground">{publication.venue}</p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {publication.doi && (
          <a
            href={publication.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80"
          >
            <ExternalLink className="h-3 w-3" /> DOI
          </a>
        )}
        {publication.bibtex && (
          <button
            onClick={handleCopyBibtex}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> BibTeX
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
