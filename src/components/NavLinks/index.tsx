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
									'flex min-h-[34px] w-full items-center gap-2.5 overflow-hidden rounded-lg px-[11px] py-2 text-sm font-medium tracking-[-0.02em] transition-[width,background-color,color] duration-300 ease-out collapsed:w-[38px]',
									active ? 'bg-cartao text-tinta' : 'text-suave hover:bg-cartao/60 hover:text-tinta'
								)}
							>
								<Icon className='size-4 shrink-0' />
								<span className='whitespace-nowrap transition-opacity duration-200 collapsed:opacity-0'>{label}</span>
							</Link>
						</li>
					)
				})}
			</ul>
		</nav>
	)
}
