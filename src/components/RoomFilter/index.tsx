// libraries
import Link from 'next/link'
import clsx from 'clsx'

// utils
import { ROOM_LABELS, type Room } from '@/lib/rooms'

export default function RoomFilter({ rooms, current }: { rooms: Room[]; current?: Room }) {
	if (rooms.length < 2 && !current) return null

	const items = [{ href: '/', label: 'Todos', active: !current }, ...rooms.map(room => ({ href: `/categoria/${room}`, label: ROOM_LABELS[room], active: room === current }))]

	return (
		<nav aria-label='Cômodos' className='-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0'>
			<ul className='flex gap-2'>
				{items.map(item => (
					<li key={item.href}>
						<Link
							href={item.href}
							aria-current={item.active ? 'page' : undefined}
							className={clsx(
								'flex min-h-10 items-center rounded-lg px-3.5 text-sm font-medium tracking-[-0.02em] whitespace-nowrap transition-colors',
								item.active ? 'bg-tinta text-cartao' : 'bg-areia text-suave hover:text-tinta'
							)}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
