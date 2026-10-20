// components
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
		<div className='px-4 pt-10 pb-20 sm:px-8 lg:px-12 lg:pt-16'>
			<PageHero
				eyebrow='Achados da Shopee pra casa'
				lead='Só entra aqui o que é campeão de vendas e bem avaliado. Cada post traz o link de tudo, direto na Shopee.'
			>
				Casa de Boa: a casa <Script>de boa</Script>, sem gastar muito
			</PageHero>
			<div className='mt-8'>
				<NewsletterForm variant='hero' />
			</div>
			<section aria-labelledby='posts-titulo' className='mx-auto mt-16 max-w-6xl'>
				<div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
					<h2 id='posts-titulo' className='text-2xl font-black tracking-tight text-tinta'>Últimos achados</h2>
					<RoomFilter rooms={getVisibleRooms()} />
				</div>
				<PostGrid posts={posts} eager={3} />
			</section>
		</div>
	)
}
