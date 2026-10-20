// libraries
import Image from 'next/image'
import Link from 'next/link'

// components
import NavLinks from '@/components/NavLinks'
import NewsletterForm from '@/components/NewsletterForm'
import PinnedPost from '@/components/PinnedPost'
import SocialLinks from '@/components/SocialLinks'

// utils
import { getPinnedPost } from '@/lib/posts'
import { SITE } from '@/lib/site'

function Heading({ children }: { children: React.ReactNode }) {
	return <p className='mb-2 px-3 text-[11px] font-extrabold tracking-[0.12em] text-suave uppercase'>{children}</p>
}

export function Profile() {
	return (
		<Link href='/' className='flex items-center gap-3 rounded-lg'>
			<Image src='/img/perfil.png' alt='' width={44} height={44} className='rounded-full' priority />
			<span className='leading-tight'>
				<span className='block text-base font-extrabold text-tinta'>{SITE.name}</span>
				<span className='block text-[13px] text-suave'>{SITE.tagline}</span>
			</span>
		</Link>
	)
}

export function SidebarContent() {
	const pinned = getPinnedPost()

	return (
		<div className='flex flex-col gap-7'>
			<NavLinks />
			<div>
				<Heading>Me encontre</Heading>
				<SocialLinks />
			</div>
			{pinned && (
				<div>
					<Heading>Fixado</Heading>
					<PinnedPost post={pinned} />
				</div>
			)}
			<div>
				<p className='mb-1 px-1 text-[15px] font-extrabold text-tinta'>Fique por dentro</p>
				<NewsletterForm variant='sidebar' />
			</div>
		</div>
	)
}

export default function Sidebar() {
	return (
		<aside className='sticky top-0 hidden h-dvh w-[272px] shrink-0 flex-col gap-7 overflow-y-auto border-r border-linha bg-creme/60 px-4 py-6 lg:flex'>
			<div className='px-1'>
				<Profile />
			</div>
			<SidebarContent />
		</aside>
	)
}
