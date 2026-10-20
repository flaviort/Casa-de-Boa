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
						className='group flex min-h-11 items-center gap-3 rounded-lg px-3 text-[15px] font-bold text-suave transition-colors hover:bg-cartao/60 hover:text-tinta'
					>
						<Icon className='size-[18px]' />
						<span className='flex-1'>{label}</span>
						<span className='sr-only'>(abre em nova aba)</span>
						<ArrowUpRightIcon className='size-3.5 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100' />
					</a>
				</li>
			))}
		</ul>
	)
}
