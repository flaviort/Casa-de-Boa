// components
import Container from '@/components/Container'
import JsonLd from '@/components/JsonLd'
import PageHero, { Script } from '@/components/PageHero'
import SocialLinks from '@/components/SocialLinks'

// utils
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
	title: 'Sobre',
	description: 'A Casa de Boa garimpa achados da Shopee pra casa: só entra o que é campeão de vendas e bem avaliado, com o link de cada um.',
	path: '/sobre'
})

// PROVISORIO: texto a revisar com o dono
export default function AboutPage() {
	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero eyebrow='Sobre'>
				Sobre a Casa de <Script>Boa</Script>
			</PageHero>
			<div className='mx-auto mt-12 flex max-w-[720px] flex-col gap-5 text-lg leading-[1.7] font-medium tracking-[-0.01em] text-tinta'>
				<p className='rounded-lg bg-areia px-4 py-2 text-sm font-semibold'>[PROVISÓRIO] Texto de exemplo, a revisar.</p>
				<p>A Casa de Boa nasceu de um cansaço: gastar dinheiro com coisa pra casa que não prestava. Hoje a gente só indica o que resolveu um problema de verdade, e indica com gosto.</p>
				<p>Todo achado passa pelo mesmo filtro. Precisa ser campeão de vendas na Shopee e ter avaliação boa de quem comprou. Se as avaliações reclamam, não entra.</p>
				<p>O &ldquo;de boa&rdquo; do nome é a atitude: casa gostosa e organizada, sem gastar muito e sem drama.</p>
				<p>Os links são de afiliado. Se você comprar por eles, a Casa de Boa ganha uma pequena comissão da Shopee, e você não paga nada a mais por isso. É assim que o perfil se mantém.</p>
			</div>
			<section aria-labelledby='redes-titulo' className='mx-auto mt-12 max-w-[720px]'>
				<h2 id='redes-titulo' className='mb-3 text-xl font-semibold tracking-[-0.04em] text-tinta'>A gente também está aqui</h2>
				<div className='max-w-xs'>
					<SocialLinks />
				</div>
			</section>
			<JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Sobre', path: '/sobre' }])} />
		</Container>
	)
}
