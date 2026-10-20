export function makePost(overrides: Record<string, unknown> = {}) {
	return {
		slug: 'cozinha-organizada',
		postId: '109d6d10-0000-0000-0000-000000000000',
		publishAt: '2026-10-19T21:11:00-03:00',
		title: 'Achados da Shopee pra cozinha',
		excerpt: 'Oito coisas que deixaram a cozinha mais prática.',
		room: 'cozinha',
		cover: { url: 'https://pub-x.r2.dev/casadeboa/109d6d10/slide-01.jpg', alt: 'Capa', width: 1080, height: 1440 },
		body: ['Primeiro parágrafo.', 'Segundo parágrafo.'],
		products: [{ name: 'Chaleira', blurb: 'Ferve rápido.', image: 'https://down-br.img.susercontent.com/file/a.jpg', url: 'https://s.shopee.com.br/AKbUftcZA3' }],
		...overrides
	}
}
