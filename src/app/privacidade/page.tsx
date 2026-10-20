// libraries
import Link from 'next/link'

// components
import Container from '@/components/Container'
import CookiePreferences from '@/components/CookiePreferences'
import JsonLd from '@/components/JsonLd'
import PageHero, { Script } from '@/components/PageHero'

// utils
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo'
import { showConsent } from '@/lib/site'

export const metadata = pageMetadata({
	title: 'Privacidade e cookies',
	description: 'Que dados a Casa de Boa guarda, para quê, e como desligar os cookies do Google Analytics.',
	path: '/privacidade'
})

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<section className='flex flex-col gap-4'>
			<h2 className='text-2xl font-semibold tracking-[-0.04em] text-tinta'>{title}</h2>
			{children}
		</section>
	)
}

export default function PrivacyPage() {
	return (
		<Container className='pt-12 pb-20 lg:pt-20'>
			<PageHero eyebrow='Privacidade' lead='O que a gente guarda, por quê e como você controla. Sem letra miúda.'>
				Privacidade e <Script>cookies</Script>
			</PageHero>
			<div className='mx-auto mt-12 flex max-w-[720px] flex-col gap-12 text-lg leading-[1.7] font-medium tracking-[-0.01em] text-tinta'>
				<Section title='Google Analytics'>
					<p>Para saber quais posts e achados vocês mais visitam, o site pode usar o Google Analytics. Ele grava cookies no seu navegador e manda ao Google dados de navegação: páginas vistas, tempo no site, tipo de aparelho e cidade aproximada. A gente só olha os números somados, nunca uma pessoa.</p>
					<p>Ele só liga se você aceitar no aviso de cookies. Desligado, nenhum script do Google é carregado. Você pode ligar ou desligar aqui embaixo quando quiser, e ao desligar os cookies do Analytics são apagados na hora.</p>
					{showConsent() && <CookiePreferences />}
				</Section>
				<Section title='Newsletter'>
					<p>Quando você assina, guardamos só o seu e-mail, no Resend, o serviço que envia as mensagens. Ele serve para mandar os próximos achados e mais nada. Todo e-mail tem um link para cancelar, e o cancelamento apaga você da lista de envio.</p>
				</Section>
				<Section title='Formulário de contato'>
					<p>O nome, o e-mail e a mensagem que você manda chegam para a gente por e-mail, para poder responder. Não entram em lista nenhuma.</p>
				</Section>
				<Section title='Links da Shopee'>
					<p>Os links dos produtos são links de afiliado: ao clicar, você vai para a Shopee, e a partir dali vale a política de privacidade dela, inclusive os cookies que ela usa para registrar a compra.</p>
				</Section>
				<Section title='Seus direitos'>
					<p>Pela LGPD, você pode pedir para ver, corrigir ou apagar qualquer dado seu que esteja com a gente. É só escrever pela <Link href='/contato' className='text-terracota underline underline-offset-4 hover:text-tinta'>página de contato</Link>.</p>
				</Section>
			</div>
			<JsonLd data={breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Privacidade', path: '/privacidade' }])} />
		</Container>
	)
}
