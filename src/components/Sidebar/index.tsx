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
		<div data-menu-item className='relative mb-2 h-2.5'>
			<p className='px-[11px] text-[10px] leading-none font-medium tracking-[0.13em] text-suave uppercase transition-opacity duration-200 collapsed:opacity-0'>{children}</p>
			<hr className='absolute top-1/2 left-[7px] w-6 border-linha opacity-0 transition-opacity duration-300 collapsed:opacity-100' />
		</div>
	)
}

export function Profile() {
	return (
		<Link href='/' className='flex items-center gap-3 rounded-lg'>
			<Image src='/img/perfil.png' alt='' width={40} height={40} className='size-10 shrink-0 rounded-lg' priority />
			<span className='min-w-0 whitespace-nowrap transition-opacity duration-200 collapsed:opacity-0'>
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
			<div data-menu-item className='mt-auto transition-[opacity,visibility] duration-200 collapsed:invisible collapsed:opacity-0'>
				<p className='mb-3 text-center text-base font-semibold tracking-[-0.04em] text-tinta'>Fique por dentro</p>
				<NewsletterForm variant='sidebar' />
			</div>
		</div>
	)
}

export default function Sidebar() {
	return (
		<aside className='sticky top-0 hidden h-dvh w-64 shrink-0 bg-areia transition-[width] duration-300 ease-out lg:block collapsed:w-[70px]'>
			<SidebarToggle />
			{/* content keeps a fixed 256px width and the aside clips it, so nothing reflows while the width animates */}
			<div className='h-full overflow-x-hidden overflow-y-auto'>
				<div className='flex min-h-full w-64 flex-col gap-7 px-4 pt-6 pb-4'>
					<Profile />
					<SidebarContent />
				</div>
			</div>
		</aside>
	)
}
