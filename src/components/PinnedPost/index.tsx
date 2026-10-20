// libraries
import Image from 'next/image'
import Link from 'next/link'

// components
import { ArrowUpRightIcon, PinIcon } from '@/components/Icons'

// utils
import type { Post } from '@/lib/posts'

export default function PinnedPost({ post }: { post: Post }) {
	return (
		<div className='relative'>
			<Link href={`/posts/${post.slug}`} className='group block rounded-lg bg-cartao p-2 transition-[opacity,visibility] duration-200 collapsed:invisible collapsed:opacity-0'>
				<p className='px-1 pt-0.5 pb-2 text-[10px] font-medium tracking-[0.13em] text-suave uppercase'>Fixado</p>
				<div className='relative aspect-[4/3] overflow-hidden rounded'>
					<Image src={post.cover.url} alt='' fill sizes='224px' className='object-cover transition-transform duration-500 group-hover:scale-105' />
				</div>
				<div className='flex items-end gap-2 px-1 pt-2 pb-1'>
					<p className='flex-1 text-[13px] leading-snug font-semibold tracking-[-0.02em] text-tinta'>{post.title}</p>
					<ArrowUpRightIcon className='mb-0.5 size-3 shrink-0 text-suave' />
				</div>
			</Link>
			<Link href={`/posts/${post.slug}`} title={`Fixado: ${post.title}`} className='invisible absolute top-0 left-0 flex size-[38px] items-center justify-center rounded-lg text-suave opacity-0 transition-[opacity,visibility] duration-300 hover:bg-cartao/60 hover:text-tinta collapsed:visible collapsed:opacity-100'>
				<PinIcon className='size-4' />
				<span className='sr-only'>Post fixado: {post.title}</span>
			</Link>
		</div>
	)
}
