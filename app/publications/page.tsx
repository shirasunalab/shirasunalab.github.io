import { redirect } from "next/navigation"

const externalUrl = "https://sites.google.com/view/masaru-shirasuna/home/publications-works?authuser=0"

export default function PublicationsPage() {
  redirect(externalUrl)
}
