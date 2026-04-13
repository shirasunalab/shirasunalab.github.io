import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getBlogNews } from "@/lib/content"

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: false,
	},
}

export async function generateStaticParams() {
	const items = getBlogNews().filter((n) => n.kind === "news")
	return items.map((n) => ({ slug: n.slug }))
}

export default async function NewsAliasRedirectPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	redirect(`/blog-news/${slug}`)
}
