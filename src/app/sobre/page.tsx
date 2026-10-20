// components
import Container from '@/components/Container'
import JsonLd from '@/components/JsonLd'
import PageHero, { Script } from '@/components/PageHero'
import SocialCards from '@/components/SocialCards'

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
			</div>
			<section aria-labelledby='redes-titulo' className='mt-20'>
				<div className='mb-8 text-center'>
					<h2 id='redes-titulo' className='text-[32px] leading-[1.1] font-medium tracking-[-0.06em] text-tinta sm:text-[40px]'>
						Os achados saem <Script>primeiro</Script> nas redes
					</h2>
					<p className='mx-auto mt-3 max-w-md text-base font-medium tracking-[-0.02em] text-suave'>Segue a Casa de Boa onde você mais gosta de ficar.</p>
				</div>
				<SocialCards />
			</section>
			<JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Sobre', path: '/sobre' }])} />
		</Container>
	)
}
