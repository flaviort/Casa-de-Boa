// libraries
import type { Metadata } from 'next'
import Link from 'next/link'

// components
import Container from '@/components/Container'
import PageHero, { Script } from '@/components/PageHero'
import PostGrid from '@/components/PostGrid'

// utils
import { getVisiblePosts } from '@/lib/posts'

export const metadata: Metadata = {
	title: 'Página não encontrada',
	robots: { index: false }
}

export default function NotFound() {
	const latest = getVisiblePosts().slice(0, 3)

	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero eyebrow='Página não encontrada' lead='Esse link não leva a lugar nenhum. Talvez o post ainda não tenha saído, ou o endereço mudou.'>
				Ops, nada <Script>por aqui</Script>
			</PageHero>
			<p className='mt-6 text-center'>
				<Link href='/' className='inline-flex min-h-11 items-center rounded-lg bg-terracota px-5 text-sm font-semibold tracking-[-0.02em] text-creme hover:bg-tinta'>Ver todos os achados</Link>
			</p>
			{latest.length > 0 && (
				<section aria-labelledby='recentes' className='mt-16'>
					<h2 id='recentes' className='mb-6 text-2xl font-semibold tracking-[-0.04em] text-tinta'>Achados recentes</h2>
					<PostGrid posts={latest} />
				</section>
			)}
		</Container>
	)
}
