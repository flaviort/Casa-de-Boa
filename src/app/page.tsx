// components
import Container from '@/components/Container'
import NewsletterForm from '@/components/NewsletterForm'
import PageHero, { Script } from '@/components/PageHero'
import PostGrid from '@/components/PostGrid'
import RoomFilter from '@/components/RoomFilter'

// utils
import { getVisiblePosts, getVisibleRooms } from '@/lib/posts'

export const revalidate = 3600

export default function Home() {
	const posts = getVisiblePosts()

	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero
				eyebrow='Achados da Shopee pra casa'
				lead='Só entra aqui o que é campeão de vendas e bem avaliado. Cada post traz o link de tudo, direto na Shopee.'
			>
				Casa de Boa: a casa <Script>de boa</Script>, sem gastar muito
			</PageHero>
			<div className='mt-8'>
				<NewsletterForm variant='hero' />
			</div>
			<section aria-labelledby='posts-titulo' className='mt-16'>
				<div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					<h2 id='posts-titulo' className='text-2xl font-semibold tracking-[-0.04em] text-tinta'>Últimos achados</h2>
					<RoomFilter rooms={getVisibleRooms()} />
				</div>
				<PostGrid posts={posts} eager={3} />
			</section>
		</Container>
	)
}
