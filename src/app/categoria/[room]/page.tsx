// libraries
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// components
import Container from '@/components/Container'
import JsonLd from '@/components/JsonLd'
import PageHero, { Script } from '@/components/PageHero'
import PostGrid from '@/components/PostGrid'
import RoomFilter from '@/components/RoomFilter'

// utils
import { getPostsByRoom, getVisibleRooms, ROOMS, type Room } from '@/lib/posts'
import { ROOM_LABELS } from '@/lib/rooms'
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const revalidate = 3600
export const dynamicParams = true

type Props = { params: Promise<{ room: string }> }

function resolve(room: string): Room | undefined {
	return (ROOMS as readonly string[]).includes(room) && getPostsByRoom(room as Room).length > 0 ? room as Room : undefined
}

function copy(room: Room) {
	if (room === 'especial') return { title: 'Achados especiais da Shopee', label: 'Achados especiais' }
	return { title: `Achadinhos da Shopee para ${ROOM_LABELS[room].toLowerCase()}`, label: ROOM_LABELS[room] }
}

export function generateStaticParams() {
	return getVisibleRooms().map(room => ({ room }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const room = resolve((await params).room)
	if (!room) return {}
	const { title } = copy(room)
	return pageMetadata({ title, description: `${title}: os campeões de vendas e bem avaliados, com o link de cada um. Seleção da Casa de Boa.`, path: `/categoria/${room}` })
}

export default async function RoomPage({ params }: Props) {
	const room = resolve((await params).room)
	if (!room) notFound()

	const { title, label } = copy(room)

	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero eyebrow={title}>
				{label} <Script>de boa</Script>
			</PageHero>
			<section aria-labelledby='posts-titulo' className='mt-12'>
				<h2 id='posts-titulo' className='sr-only'>Posts de {label}</h2>
				<div className='mb-6'>
					<RoomFilter rooms={getVisibleRooms()} current={room} />
				</div>
				<PostGrid posts={getPostsByRoom(room)} eager={3} />
			</section>
			<JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: label, path: `/categoria/${room}` }])} />
		</Container>
	)
}
