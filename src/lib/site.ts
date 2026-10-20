export const SITE = {
	name: 'Casa de Boa',
	alternateNames: ['casadeboa', 'casadeboa.br'],
	tagline: 'Achados da Shopee pra casa',
	url: 'https://casadeboa.com.br',
	locale: 'pt_BR',
	socials: {
		instagram: 'https://www.instagram.com/casadeboa.br/',
		// PROVISORIO: link a confirmar com o dono
		tiktok: 'https://www.tiktok.com/@casadeboa.br',
		// PROVISORIO: link a confirmar com o dono
		facebook: 'https://www.facebook.com/casadeboa.br'
	}
} as const

export function absoluteUrl(path: string): string {
	return new URL(path, SITE.url).toString()
}

// stage and preview deployments must stay out of search results
export const isProduction = () => process.env.VERCEL_ENV === 'production'
