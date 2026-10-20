// libraries
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// components
import AffiliateNote from '@/components/AffiliateNote'
import Container from '@/components/Container'
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
		<Container className='pt-8 pb-20 lg:pt-12'>
			<article>
				<nav aria-label='Navegação do post' className='flex items-center justify-between gap-3 text-xs font-medium tracking-[-0.02em] text-suave'>
					<Link href='/' className='inline-flex min-h-9 items-center rounded-lg bg-areia px-3 hover:text-tinta'>Voltar</Link>
					<p className='inline-flex min-h-9 items-center rounded-lg bg-areia px-3'>
						<Link href={`/categoria/${post.room}`} className='hover:text-tinta'>{room}</Link>
						<span aria-hidden='true' className='px-1.5'>·</span>
						{countLabel(post)}
					</p>
				</nav>

				<header className='mx-auto mt-10 max-w-3xl text-center'>
					<h1 className='text-[36px] leading-[1.1] font-medium tracking-[-0.06em] text-tinta text-balance sm:text-[56px]'>{post.title}</h1>
					<p className='mx-auto mt-5 max-w-xl text-base leading-relaxed font-medium tracking-[-0.02em] text-suave text-pretty'>{post.excerpt}</p>
					<p className='mt-3 text-xs font-medium text-suave'>
						<time dateTime={post.publishAt}>{formatDate.format(new Date(post.publishAt))}</time>
					</p>
				</header>

				<div className='mx-auto mt-10 max-w-[720px] rounded-lg bg-cartao p-3'>
					<div className='relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded'>
						<Image src={post.cover.url} alt={post.cover.alt} fill priority sizes='(min-width: 640px) 448px, 92vw' className='object-cover' />
					</div>
				</div>

				<div className='mx-auto mt-10 flex max-w-[720px] flex-col gap-4 text-lg leading-[1.7] font-medium tracking-[-0.01em] text-tinta'>
					{post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
				</div>

				<section aria-labelledby='produtos-titulo' className='mx-auto mt-12 max-w-[720px]'>
					<h2 id='produtos-titulo' className='mb-4 text-2xl font-semibold tracking-[-0.04em] text-tinta'>Os achados deste post</h2>
					<ProductList products={post.products} />
					<div className='mt-3'>
						<AffiliateNote />
					</div>
					{post.instagramUrl && (
						<p className='mt-4 text-sm font-semibold'>
							<a href={post.instagramUrl} target='_blank' rel='noopener' className='text-terracota underline underline-offset-4 hover:text-tinta'>Ver no Instagram</a>
						</p>
					)}
				</section>

				<section aria-label='Newsletter' className='mx-auto mt-14 max-w-[720px] rounded-lg bg-areia px-5 py-8 text-center sm:px-10'>
					<p className='text-xl font-semibold tracking-[-0.04em] text-tinta'>Gostou? Os próximos achados chegam no seu e-mail.</p>
					<div className='mx-auto mt-5 max-w-md'>
						<NewsletterForm variant='inline' />
					</div>
				</section>
			</article>

			{related.length > 0 && (
				<section aria-labelledby='leia-tambem' className='mt-16'>
					<h2 id='leia-tambem' className='mb-6 text-2xl font-semibold tracking-[-0.04em] text-tinta'>Leia também</h2>
					<PostGrid posts={related} />
				</section>
			)}

			<JsonLd data={[
				articleJsonLd(post),
				itemListJsonLd(post),
				breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: room, path: `/categoria/${post.room}` }, { name: post.title, path: `/posts/${post.slug}` }])
			]} />
		</Container>
	)
}
