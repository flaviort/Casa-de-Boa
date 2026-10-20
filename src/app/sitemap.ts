// libraries
import type { MetadataRoute } from 'next'

// utils
import { absoluteUrl } from '@/lib/site'
import { getVisiblePosts, getVisibleRooms } from '@/lib/posts'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getVisiblePosts()
	const latest = posts[0]?.publishAt

	return [
		{ url: absoluteUrl('/'), lastModified: latest, changeFrequency: 'daily', priority: 1 },
		{ url: absoluteUrl('/sobre'), changeFrequency: 'monthly', priority: 0.6 },
		{ url: absoluteUrl('/contato'), changeFrequency: 'yearly', priority: 0.4 },
		...getVisibleRooms().map(room => ({ url: absoluteUrl(`/categoria/${room}`), lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.7 })),
		...posts.map(post => ({ url: absoluteUrl(`/posts/${post.slug}`), lastModified: post.publishAt, changeFrequency: 'monthly' as const, priority: 0.8 }))
	]
}
