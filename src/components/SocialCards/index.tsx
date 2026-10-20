// components
import { ArrowUpRightIcon, FacebookIcon, InstagramIcon, TiktokIcon } from '@/components/Icons'
import Reveal from '@/components/Reveal'

// utils
import { SITE } from '@/lib/site'

const NETWORKS = [
	{
		href: SITE.socials.instagram,
		name: 'Instagram',
		handle: '@casadeboa.br',
		text: 'Carrosséis e Reels com os achados da semana. Comenta a palavra do post e recebe os links no direct.',
		Icon: InstagramIcon
	},
	{
		href: SITE.socials.tiktok,
		name: 'TikTok',
		handle: '@casadeboa.br',
		text: 'Os achados em vídeo curto, do jeito que eles funcionam no dia a dia.',
		Icon: TiktokIcon
	},
	{
		href: SITE.socials.facebook,
		name: 'Facebook',
		handle: 'Casa de Boa',
		text: 'Os mesmos posts, com o link de cada produto direto na legenda.',
		Icon: FacebookIcon
	}
]

export default function SocialCards() {
	return (
		<Reveal className='grid gap-4 sm:grid-cols-3'>
			{NETWORKS.map(({ href, name, handle, text, Icon }) => (
				<a key={name} href={href} target='_blank' rel='noopener' className='group flex flex-col rounded-lg bg-cartao p-5 transition-colors hover:bg-areia'>
					<span className='flex items-center justify-between'>
						<span className='grid size-11 place-items-center rounded-lg bg-terracota text-creme'>
							<Icon className='size-5' />
						</span>
						<ArrowUpRightIcon className='size-4 text-suave transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tinta' />
					</span>
					<span className='mt-6 text-lg font-semibold tracking-[-0.04em] text-tinta'>{name}</span>
					<span className='text-sm font-medium text-suave'>{handle}</span>
					<span className='mt-3 text-sm leading-relaxed font-medium text-suave'>{text}</span>
					<span className='mt-auto inline-flex items-center gap-1 pt-6 text-sm font-semibold tracking-[-0.02em] text-terracota'>
						Seguir no {name}
						<span className='sr-only'>(abre em nova aba)</span>
					</span>
				</a>
			))}
		</Reveal>
	)
}
