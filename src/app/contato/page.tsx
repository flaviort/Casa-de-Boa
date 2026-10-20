// components
import JsonLd from '@/components/JsonLd'
import PageHero, { Script } from '@/components/PageHero'
import ContactForm from './ContactForm'
import Container from '@/components/Container'

// utils
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
	title: 'Contato',
	description: 'Fale com a Casa de Boa: dúvidas sobre um achado, sugestões ou parcerias.',
	path: '/contato'
})

export default function ContactPage() {
	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero eyebrow='Contato' lead='Dúvida sobre um achado, sugestão de produto ou proposta de parceria: escreve aqui que a gente responde.'>
				Fale com a Casa de <Script>Boa</Script>
			</PageHero>
			<div className='mx-auto mt-12 max-w-[560px]'>
				<ContactForm />
			</div>
			<JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Contato', path: '/contato' }])} />
		</Container>
	)
}
