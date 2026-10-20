// components
import PostCard from '@/components/PostCard'
import Reveal from '@/components/Reveal'
import NewsletterForm from '@/components/NewsletterForm'

// utils
import type { Post } from '@/lib/posts'

export default function PostGrid({ posts, eager = 0 }: { posts: Post[]; eager?: number }) {
	if (posts.length === 0) {
		return (
			<div className='rounded-lg bg-cartao px-6 py-12 text-center'>
				<p className='text-lg font-semibold tracking-[-0.04em] text-tinta'>Os primeiros achados estão chegando.</p>
				<p className='mx-auto mt-2 mb-6 max-w-sm text-suave'>Deixa seu e-mail que você fica sabendo assim que sair o primeiro post.</p>
				<NewsletterForm variant='hero' />
			</div>
		)
	}

	return (
		<Reveal className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
			{posts.map((post, index) => <PostCard key={post.slug} post={post} priority={index < eager} />)}
		</Reveal>
	)
}
