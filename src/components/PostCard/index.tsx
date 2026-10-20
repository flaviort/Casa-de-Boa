// libraries
import Image from 'next/image'
import Link from 'next/link'

// utils
import { ROOM_LABELS } from '@/lib/rooms'
import type { Post } from '@/lib/posts'

export function countLabel(post: Post) {
	return `${post.products.length} ${post.products.length === 1 ? 'achado' : 'achados'}`
}

export default function PostCard({ post, priority }: { post: Post; priority?: boolean }) {
	return (
		<Link href={`/posts/${post.slug}`} className='group flex h-full flex-col rounded-2xl bg-cartao p-2.5 shadow-[0_1px_2px_rgba(42,30,23,0.06)] transition-shadow hover:shadow-[0_10px_30px_-12px_rgba(42,30,23,0.25)]'>
			<div className='relative aspect-[3/4] overflow-hidden rounded-xl bg-creme'>
				<Image
					src={post.cover.url}
					alt={post.cover.alt}
					fill
					priority={priority}
					sizes='(min-width: 1280px) 320px, (min-width: 640px) 45vw, 92vw'
					className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
				/>
			</div>
			<div className='flex flex-1 flex-col gap-2 px-1.5 pt-3 pb-1.5'>
				<h2 className='text-[17px] leading-snug font-extrabold text-tinta text-balance'>{post.title}</h2>
				<p className='mt-auto text-[13px] font-bold text-suave'>
					{ROOM_LABELS[post.room]} <span aria-hidden='true'>·</span> {countLabel(post)}
				</p>
			</div>
		</Link>
	)
}
