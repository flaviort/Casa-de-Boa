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
								'flex min-h-11 items-center rounded-full px-4 text-sm font-extrabold whitespace-nowrap transition-colors',
								item.active ? 'bg-tinta text-creme' : 'bg-cartao text-suave shadow-[0_1px_2px_rgba(42,30,23,0.06)] hover:text-tinta'
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
