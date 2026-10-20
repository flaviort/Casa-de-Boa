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
								title={label}
								aria-current={active ? 'page' : undefined}
								className={clsx(
									'flex min-h-[34px] items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium tracking-[-0.02em] transition-colors collapsed:justify-center collapsed:px-0',
									active ? 'bg-cartao text-tinta' : 'text-suave hover:bg-cartao/60 hover:text-tinta'
								)}
							>
								<Icon className='size-4 shrink-0' />
								<span className='collapsed:sr-only'>{label}</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
