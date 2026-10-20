// libraries
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// components
import AffiliateNote from '@/components/AffiliateNote'
import JsonLd from '@/components/JsonLd'
import NewsletterForm from '@/components/NewsletterForm'
import { countLabel } from '@/components/PostCard'
import PostGrid from '@/components/PostGrid'
import ProductList from '@/components/ProductList'

// utils
import { getRelatedPosts, getVisiblePost, getVisiblePosts } from '@/lib/posts'
import { ROOM_LABELS } from '@/lib/rooms'
import { articleJsonLd, breadcrumbJsonLd, itemListJsonLd, postMetadata } from '@/lib/seo'

export const revalidate = 3600
export const dynamicParams = true

type Props = { params: Promise<{ slug: string }> }

const formatDate = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' })

export function generateStaticParams() {
	return getVisiblePosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = getVisiblePost((await params).slug)
	return post ? postMetadata(post) : {}
}

export default async function PostPage({ params }: Props) {
	const post = getVisiblePost((await params).slug)
	if (!post) notFound()

	const room = ROOM_LABELS[post.room]
	const related = getRelatedPosts(post)

	return (
		<article className='px-4 pt-8 pb-20 sm:px-8 lg:px-12 lg:pt-12'>
			<div className='mx-auto max-w-3xl'>
				<nav aria-label='Navegação do post' className='flex items-center justify-between gap-3 text-sm font-bold text-suave'>
					<Link href='/' className='inline-flex min-h-11 items-center rounded-full bg-cartao px-4 shadow-[0_1px_2px_rgba(42,30,23,0.06)] hover:text-tinta'>Voltar</Link>
					<p>
						<Link href={`/categoria/${post.room}`} className='hover:text-tinta'>{room}</Link>
						<span aria-hidden='true'> · </span>
						{countLabel(post)}
					</p>
				</nav>

				<header className='mt-8 text-center'>
					<h1 className='text-[34px] leading-[1.05] font-black tracking-[-0.03em] text-tinta text-balance sm:text-5xl'>{post.title}</h1>
					<p className='mx-auto mt-4 max-w-xl text-lg leading-relaxed text-suave text-pretty'>{post.excerpt}</p>
					<p className='mt-3 text-sm text-suave'>
						<time dateTime={post.publishAt}>{formatDate.format(new Date(post.publishAt))}</time>
					</p>
				</header>

				<div className='relative mx-auto mt-8 aspect-[3/4] max-w-md overflow-hidden rounded-3xl bg-creme shadow-[0_20px_50px_-24px_rgba(42,30,23,0.45)]'>
					<Image src={post.cover.url} alt={post.cover.alt} fill priority sizes='(min-width: 640px) 448px, 92vw' className='object-cover' />
				</div>

				<div className='mx-auto mt-10 flex max-w-2xl flex-col gap-4 text-[18px] leading-[1.7] text-tinta'>
					{post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
				</div>

				<section aria-labelledby='produtos-titulo' className='mx-auto mt-10 max-w-2xl'>
					<h2 id='produtos-titulo' className='mb-4 text-2xl font-black tracking-tight text-tinta'>Os achados deste post</h2>
					<ProductList products={post.products} />
					<div className='mt-4'>
						<AffiliateNote />
					</div>
					{post.instagramUrl && (
						<p className='mt-4 text-sm font-bold'>
							<a href={post.instagramUrl} target='_blank' rel='noopener' className='text-terracota underline underline-offset-4 hover:text-tinta'>Ver no Instagram</a>
						</p>
					)}
				</section>

				<section aria-label='Newsletter' className='mx-auto mt-14 max-w-2xl rounded-3xl bg-creme px-5 py-8 text-center sm:px-10'>
					<p className='text-xl font-black text-tinta'>Gostou? Os próximos achados chegam no seu e-mail.</p>
					<div className='mt-5'>
						<NewsletterForm variant='inline' />
					</div>
				</section>
			</div>

			{related.length > 0 && (
				<section aria-labelledby='leia-tambem' className='mx-auto mt-16 max-w-6xl'>
					<h2 id='leia-tambem' className='mb-6 text-2xl font-black tracking-tight text-tinta'>Leia também</h2>
					<PostGrid posts={related} />
				</section>
			)}

			<JsonLd data={[
				articleJsonLd(post),
				itemListJsonLd(post),
				breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: room, path: `/categoria/${post.room}` }, { name: post.title, path: `/posts/${post.slug}` }])
			]} />
		</article>
	)
}
