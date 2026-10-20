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

export default function AboutPage() {
	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero eyebrow='Sobre'>
				Sobre a Casa de <Script>Boa</Script>
			</PageHero>
			<div className='mx-auto mt-12 flex max-w-[720px] flex-col gap-5 text-lg leading-[1.7] font-medium tracking-[-0.01em] text-tinta'>
				<p>A Casa de Boa nasceu de um cansaço: gastar dinheiro com coisa pra casa que não prestava. Hoje a gente garimpa a Shopee atrás do que resolve um problema de verdade, e só indica o que passou nesse filtro.</p>
				<p>Todo achado precisa ser campeão de vendas e ter avaliação boa de quem comprou. Se as avaliações reclamam, não entra. Por isso cada post traz poucos produtos, e cada um tem o porquê de estar ali.</p>
				<p>O &ldquo;de boa&rdquo; do nome é a atitude: casa gostosa e organizada, sem gastar muito e sem drama. Cozinha, quarto, lavanderia, organização: cada post é um cômodo, com o link de tudo direto na Shopee.</p>
				<p>Os links são de afiliado. Se você comprar por eles, a Casa de Boa ganha uma pequena comissão da Shopee, e você não paga nada a mais por isso. É assim que o projeto se mantém.</p>
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
