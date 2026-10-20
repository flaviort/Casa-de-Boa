// libraries
import Image from 'next/image'
import Link from 'next/link'

// utils
import type { Post } from '@/lib/posts'

export default function PinnedPost({ post }: { post: Post }) {
	return (
		<Link href={`/posts/${post.slug}`} className='group block rounded-xl bg-cartao p-2 shadow-[0_1px_2px_rgba(42,30,23,0.06)]'>
			<div className='relative aspect-[4/3] overflow-hidden rounded-lg'>
				<Image src={post.cover.url} alt='' fill sizes='240px' className='object-cover transition-transform duration-500 group-hover:scale-105' />
			</div>
			<p className='mt-2 px-1 pb-1 text-[13px] leading-snug font-bold text-tinta'>{post.title}</p>
		</Link>
	)
}
