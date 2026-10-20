// libraries
import type { Metadata } from 'next'
import Link from 'next/link'

// components
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
		<div className='px-4 pt-10 pb-20 sm:px-8 lg:px-12 lg:pt-16'>
			<PageHero eyebrow='Página não encontrada' lead='Esse link não leva a lugar nenhum. Talvez o post ainda não tenha saído, ou o endereço mudou.'>
				Ops, nada <Script>por aqui</Script>
			</PageHero>
			<p className='mt-6 text-center'>
				<Link href='/' className='inline-flex min-h-11 items-center rounded-xl bg-terracota px-6 font-extrabold text-creme hover:bg-tinta'>Ver todos os achados</Link>
			</p>
			{latest.length > 0 && (
				<section aria-labelledby='recentes' className='mx-auto mt-16 max-w-6xl'>
					<h2 id='recentes' className='mb-6 text-2xl font-black tracking-tight text-tinta'>Achados recentes</h2>
					<PostGrid posts={latest} />
				</section>
			)}
		</div>
	)
}
