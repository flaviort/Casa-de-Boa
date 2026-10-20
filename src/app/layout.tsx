// libraries
import type { Metadata, Viewport } from 'next'
import { Manrope, Source_Serif_4 } from 'next/font/google'

// components
import CookieConsent from '@/components/CookieConsent'
import JsonLd from '@/components/JsonLd'
import MobileNav from '@/components/MobileNav'
import Sidebar, { Profile, SidebarContent } from '@/components/Sidebar'

// utils
import { organizationJsonLd, pageMetadata, websiteJsonLd } from '@/lib/seo'
import { gaId, isProduction, SITE } from '@/lib/site'

import '@/assets/css/global.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], style: 'italic', weight: '500', variable: '--font-source-serif', display: 'swap' })

// applies the saved sidebar state before first paint so the layout does not jump
const SIDEBAR_SCRIPT = `try{if(localStorage.getItem('cdb-sidebar')==='collapsed')document.documentElement.dataset.sidebar='collapsed'}catch(e){}`

export const revalidate = 3600

export const metadata: Metadata = {
	...pageMetadata({ description: 'Achados da Shopee pra casa, escolhidos a dedo: campeões de vendas e bem avaliados, com o link de cada um.', path: '/' }),
	metadataBase: new URL(SITE.url),
	title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
	applicationName: SITE.name,
	...(!isProduction() && { robots: { index: false, follow: false } })
}

export const viewport: Viewport = {
	themeColor: '#F4F2F0'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const analyticsId = gaId()

	return (
		<html lang='pt-BR' className={`${manrope.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: SIDEBAR_SCRIPT }} />
			</head>
			<body className='min-h-dvh lg:flex'>
				<a href='#conteudo' className='sr-only z-50 rounded-lg bg-terracota px-4 py-2 text-creme focus:not-sr-only focus:fixed focus:top-3 focus:left-3'>Pular para o conteúdo</a>
				<Sidebar />
				<MobileNav profile={<Profile />}>
					<SidebarContent />
				</MobileNav>
				<main id='conteudo' className='min-w-0 flex-1'>
					{children}
				</main>
				{analyticsId && <CookieConsent gaId={analyticsId} />}
				<JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
			</body>
		</html>
	)
}
