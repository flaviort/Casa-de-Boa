// libraries
import type { MetadataRoute } from 'next'

// utils
import { SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${SITE.name} | ${SITE.tagline}`,
		short_name: SITE.name,
		description: 'Achados da Shopee pra casa, escolhidos a dedo: campeões de vendas e bem avaliados.',
		start_url: '/',
		display: 'standalone',
		background_color: '#F4F2F0',
		theme_color: '#F4F2F0',
		lang: 'pt-BR',
		icons: [
			{ src: '/icon.png', sizes: '256x256', type: 'image/png' },
			{ src: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
		]
	}
}
