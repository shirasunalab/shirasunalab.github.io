type JsonLdProps = {
  data: unknown
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw JSON string
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
