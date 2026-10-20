// libraries
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// components
import Container from '@/components/Container'
import JsonLd from '@/components/JsonLd'
import NewsletterForm from '@/components/NewsletterForm'
import { ChevronLeftIcon } from '@/components/Icons'
import { countLabel } from '@/components/PostCard'
import PostGrid from '@/components/PostGrid'
import ProductList from '@/components/ProductList'
import Reveal from '@/components/Reveal'

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
		<Container className='pt-8 pb-20 lg:pt-14'>
			<article>
				<header className='grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16'>
					<Reveal className='flex flex-col items-start'>
						<nav aria-label='Navegação do post' className='flex flex-wrap items-center gap-2 text-xs font-medium tracking-[-0.02em] text-suave'>
							<Link href='/' className='inline-flex min-h-8 items-center gap-1 rounded-lg bg-areia pr-3 pl-2 hover:text-tinta'>
								<ChevronLeftIcon className='size-3.5' />
								Voltar
							</Link>
							<Link href={`/categoria/${post.room}`} className='inline-flex min-h-8 items-center rounded-lg bg-areia px-3 hover:text-tinta'>{room}</Link>
						</nav>
						<h1 className='mt-6 text-[36px] leading-[1.08] font-medium tracking-[-0.06em] text-tinta text-balance sm:text-[56px]'>{post.title}</h1>
						<p className='mt-5 max-w-xl text-base leading-relaxed font-medium tracking-[-0.02em] text-suave text-pretty sm:text-lg'>{post.excerpt}</p>
						<p className='mt-5 flex items-center gap-2 text-xs font-medium text-suave'>
							<time dateTime={post.publishAt}>{formatDate.format(new Date(post.publishAt))}</time>
							<span aria-hidden='true'>·</span>
							{countLabel(post)}
						</p>
						<div className='mt-8 flex w-full max-w-xl flex-wrap items-center gap-4 rounded-lg bg-areia p-3'>
							<ul className='flex -space-x-2' aria-hidden='true'>
								{post.products.slice(0, 5).map(product => (
									<li key={product.url} className='relative size-11 overflow-hidden rounded-lg border-2 border-areia bg-cartao'>
										<Image src={product.image} alt='' fill sizes='44px' className='object-cover' />
									</li>
								))}
							</ul>
							<a href='#achados' className='inline-flex min-h-11 w-full items-center justify-center rounded-lg sm:ml-auto sm:w-auto bg-terracota px-4 text-sm font-semibold tracking-[-0.02em] text-creme transition-colors hover:bg-tinta'>
								Ver os {countLabel(post)}
							</a>
						</div>
					</Reveal>
					<Reveal>
						<div className='relative aspect-[3/4] overflow-hidden rounded-lg bg-areia'>
							<Image src={post.cover.url} alt={post.cover.alt} fill priority sizes='(min-width: 1024px) 440px, 92vw' className='object-cover' />
						</div>
					</Reveal>
				</header>

				<div className='mx-auto mt-14 flex max-w-[720px] flex-col gap-4 text-lg leading-[1.7] font-medium tracking-[-0.01em] text-tinta'>
					{post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
				</div>

				<section id='achados' aria-labelledby='produtos-titulo' className='mx-auto mt-12 max-w-[720px] scroll-mt-8'>
					<h2 id='produtos-titulo' className='mb-4 text-2xl font-semibold tracking-[-0.04em] text-tinta'>Os achados deste post</h2>
					<ProductList products={post.products} />
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
