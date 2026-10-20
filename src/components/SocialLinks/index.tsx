// components
import { ArrowUpRightIcon, FacebookIcon, InstagramIcon, TiktokIcon } from '@/components/Icons'

// utils
import { SITE } from '@/lib/site'

const SOCIALS = [
	{ href: SITE.socials.instagram, label: 'Instagram', Icon: InstagramIcon },
	{ href: SITE.socials.tiktok, label: 'TikTok', Icon: TiktokIcon },
	{ href: SITE.socials.facebook, label: 'Facebook', Icon: FacebookIcon }
]

export default function SocialLinks() {
	return (
		<ul className='flex flex-col gap-1'>
			{SOCIALS.map(({ href, label, Icon }) => (
				<li key={label}>
					<a
						href={href}
						target='_blank'
						rel='noopener'
						title={label}
						className='group flex min-h-[34px] w-full items-center gap-2.5 overflow-hidden rounded-lg px-[11px] py-2 text-sm font-medium tracking-[-0.02em] text-suave transition-[width,background-color,color] duration-300 ease-out hover:bg-cartao/60 hover:text-tinta collapsed:w-[38px]'
					>
						<Icon className='size-4 shrink-0' />
						<span className='flex-1 whitespace-nowrap transition-opacity duration-200 collapsed:opacity-0'>{label}</span>
						<span className='sr-only'>(abre em nova aba)</span>
						<ArrowUpRightIcon className='size-3 opacity-50 transition-[opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 collapsed:opacity-0' />
					</a>
				</li>
			))}
		</ul>
	)
}
