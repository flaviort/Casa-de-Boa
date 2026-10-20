// libraries
import Image from 'next/image'
import Link from 'next/link'

// components
import NavLinks from '@/components/NavLinks'
import NewsletterForm from '@/components/NewsletterForm'
import PinnedPost from '@/components/PinnedPost'
import SidebarToggle from '@/components/SidebarToggle'
import SocialLinks from '@/components/SocialLinks'

// utils
import { getPinnedPost } from '@/lib/posts'
import { SITE } from '@/lib/site'

function Heading({ children }: { children: React.ReactNode }) {
	return (
		<>
			<p data-menu-item className='mb-2 px-2.5 text-[10px] font-medium tracking-[0.13em] text-suave uppercase collapsed:hidden'>{children}</p>
			<hr className='mx-auto mb-2 hidden w-6 border-linha collapsed:block' />
		</>
	)
}

export function Profile() {
	return (
		<Link href='/' className='flex items-center gap-3 rounded-lg collapsed:justify-center'>
			<Image src='/img/perfil.png' alt='' width={40} height={40} className='size-10 shrink-0 rounded-lg' priority />
			<span className='min-w-0 collapsed:sr-only'>
				<span className='block text-base leading-none font-semibold tracking-[-0.04em] text-tinta'>{SITE.name}</span>
				<span className='mt-1.5 block text-xs leading-none font-medium tracking-[-0.02em] text-suave'>{SITE.tagline}</span>
			</span>
		</Link>
	)
}

export function SidebarContent() {
	const pinned = getPinnedPost()

	return (
		<div className='flex flex-1 flex-col gap-6'>
			<NavLinks />
			<div>
				<Heading>Me encontre</Heading>
				<SocialLinks />
			</div>
			{pinned && <div data-menu-item><PinnedPost post={pinned} /></div>}
			<div data-menu-item className='mt-auto collapsed:hidden'>
				<p className='mb-3 text-center text-base font-semibold tracking-[-0.04em] text-tinta'>Fique por dentro</p>
				<NewsletterForm variant='sidebar' />
			</div>
		</div>
	)
}

export default function Sidebar() {
	return (
		<aside className='sticky top-0 hidden h-dvh w-60 shrink-0 bg-areia transition-[width] duration-300 ease-out lg:block collapsed:w-[70px]'>
			<SidebarToggle />
			<div className='flex h-full flex-col gap-7 overflow-x-hidden overflow-y-auto px-4 pt-6 pb-4'>
				<Profile />
				<SidebarContent />
			</div>
		</aside>
	)
}
