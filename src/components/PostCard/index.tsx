// libraries
import Image from 'next/image'
import Link from 'next/link'

// components
import { ArrowUpRightIcon } from '@/components/Icons'

// utils
import { ROOM_LABELS } from '@/lib/rooms'
import type { Post } from '@/lib/posts'

export function countLabel(post: Post) {
	return `${post.products.length} ${post.products.length === 1 ? 'achado' : 'achados'}`
}

export default function PostCard({ post, priority }: { post: Post; priority?: boolean }) {
	return (
		<Link href={`/posts/${post.slug}`} className='group flex h-full flex-col rounded-lg bg-cartao p-3'>
			<div className='relative aspect-[3/4] overflow-hidden rounded bg-areia'>
				<Image
					src={post.cover.url}
					alt={post.cover.alt}
					fill
					priority={priority}
					sizes='(min-width: 1280px) 360px, (min-width: 640px) 45vw, 92vw'
					className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]'
				/>
			</div>
			<div className='flex flex-1 flex-col gap-2 px-0.5 pt-3'>
				<div className='flex items-start gap-3'>
					<h3 className='flex-1 text-base leading-[1.4] font-semibold tracking-[-0.04em] text-tinta text-balance'>{post.title}</h3>
					<ArrowUpRightIcon className='mt-1 size-3.5 shrink-0 text-suave transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
				</div>
				<p className='mt-auto text-xs font-medium tracking-[-0.02em] text-suave'>
					{ROOM_LABELS[post.room]} <span aria-hidden='true'>·</span> {countLabel(post)}
				</p>
			</div>
		</Link>
	)
}
