// utils
import { getVisiblePosts } from '@/lib/posts'
import { ROOM_LABELS } from '@/lib/rooms'
import { absoluteUrl, SITE } from '@/lib/site'

export const revalidate = 3600

// llms.txt (llmstxt.org): a short markdown map of the site for AI assistants and crawlers
export async function GET() {
	const posts = getVisiblePosts()
	const body = `# ${SITE.name}

> ${SITE.tagline}. A Casa de Boa garimpa achadinhos da Shopee para a casa, com preço que dá vontade de comprar. Cada post é um cômodo (cozinha, quarto, sala, lavanderia, organização) e traz a lista dos produtos com o link de cada um na Shopee.

Os mesmos achados saem primeiro no Instagram (@casadeboa_br), no TikTok (@casadeboa.br), no Facebook (Casa de Boa), no YouTube (@casadeboa) e no X (@casadeboa).

## Posts

${posts.map(post => `- [${post.title}](${absoluteUrl(`/posts/${post.slug}`)}): ${ROOM_LABELS[post.room]}, ${post.products.length} achados. ${post.excerpt}`).join('\n')}

## Páginas

- [Início](${SITE.url}/): todos os posts, do mais recente ao mais antigo
- [Sobre](${absoluteUrl('/sobre')}): como os achados são escolhidos
- [Contato](${absoluteUrl('/contato')}): dúvidas, sugestões e parcerias

## Redes

${Object.values(SITE.socials).map(url => `- ${url}`).join('\n')}
`
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
