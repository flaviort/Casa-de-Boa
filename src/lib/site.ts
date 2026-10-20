export const SITE = {
	name: 'Casa de Boa',
	alternateNames: ['casadeboa', 'casadeboa.br'],
	tagline: 'Achados da Shopee pra casa',
	url: 'https://casadeboa.com.br',
	locale: 'pt_BR',
	// source: Notion page "Casa de Boa", table "Redes sociais"; socials are the active networks shown in the menu
	socials: {
		instagram: 'https://www.instagram.com/casadeboa.br/',
		tiktok: 'https://www.tiktok.com/@casadeboa.br',
		facebook: 'https://www.facebook.com/casadeboa.br'
	},
	// reserved profiles: not in the menu, but listed in sameAs so Google ties them to the brand
	otherProfiles: [
		'https://www.threads.com/@casadeboa.br',
		'https://www.youtube.com/@casadeboa',
		'https://x.com/casadeboa',
		'https://br.pinterest.com/casadeboa/',
		'https://kwai-video.com/u/@casadeboa.br/eHMC4RCJ',
		'https://www.snapchat.com/@casadeboa.br'
	]
} as const

export function absoluteUrl(path: string): string {
	return new URL(path, SITE.url).toString()
}

// stage and preview deployments must stay out of search results
export const isProduction = () => process.env.VERCEL_ENV === 'production'
