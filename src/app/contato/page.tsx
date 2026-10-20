// components
import JsonLd from '@/components/JsonLd'
import PageHero, { Script } from '@/components/PageHero'
import ContactForm from './ContactForm'

// utils
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
	title: 'Contato',
	description: 'Fale com a Casa de Boa: dúvidas sobre um achado, sugestões ou parcerias.',
	path: '/contato'
})

export default function ContactPage() {
	return (
		<div className='px-4 pt-10 pb-20 sm:px-8 lg:px-12 lg:pt-16'>
			<PageHero eyebrow='Contato' lead='Dúvida sobre um achado, sugestão de produto ou proposta de parceria: escreve aqui que a gente responde.'>
				Fale com a Casa de <Script>Boa</Script>
			</PageHero>
			<div className='mx-auto mt-10 max-w-xl'>
				<ContactForm />
			</div>
			<JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Contato', path: '/contato' }])} />
		</div>
	)
}
