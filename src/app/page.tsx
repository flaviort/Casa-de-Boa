// utils
import { getVisiblePosts } from '@/lib/posts'

export const revalidate = 3600

export default function Home() {
	return (
		<main>
			<h1>Casa de Boa</h1>
			<ul>
				{getVisiblePosts().map(post => <li key={post.slug}>{post.title}</li>)}
			</ul>
		</main>
	)
}
