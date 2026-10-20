'use client'

// libraries
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

// components
import { HomeIcon, MailIcon, UserIcon } from '@/components/Icons'

const LINKS = [
	{ href: '/', label: 'Início', Icon: HomeIcon },
	{ href: '/sobre', label: 'Sobre', Icon: UserIcon },
	{ href: '/contato', label: 'Contato', Icon: MailIcon }
]

export default function NavLinks() {
	const pathname = usePathname()

	return (
		<nav aria-label='Principal'>
			<ul className='flex flex-col gap-1'>
				{LINKS.map(({ href, label, Icon }) => {
					const active = href === '/' ? pathname === '/' || pathname.startsWith('/posts') || pathname.startsWith('/categoria') : pathname.startsWith(href)
					return (
						<li key={href}>
							<Link
								href={href}
								aria-current={active ? 'page' : undefined}
								className={clsx(
									'flex min-h-11 items-center gap-3 rounded-lg px-3 text-[15px] font-bold transition-colors',
									active ? 'bg-cartao text-tinta shadow-[0_1px_2px_rgba(42,30,23,0.08)]' : 'text-suave hover:bg-cartao/60 hover:text-tinta'
								)}
							>
								<Icon className='size-[18px]' />
								{label}
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
