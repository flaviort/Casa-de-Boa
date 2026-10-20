// utils
import { getVisiblePosts } from '@/lib/posts'
import { absoluteUrl, SITE } from '@/lib/site'

export const revalidate = 3600

const xml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')

export async function GET() {
	const posts = getVisiblePosts()
	const items = posts.map(post => {
		const url = absoluteUrl(`/posts/${post.slug}`)
		return `		<item>
			<title>${xml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${new Date(post.publishAt).toUTCString()}</pubDate>
			<description>${xml(post.excerpt)}</description>
			<enclosure url="${xml(absoluteUrl(post.cover.url))}" type="image/jpeg" length="0" />
		</item>`
	}).join('\n')

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${xml(SITE.name)}</title>
		<link>${SITE.url}</link>
		<description>${xml(SITE.tagline)}</description>
		<language>pt-BR</language>
		<atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`
	return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
