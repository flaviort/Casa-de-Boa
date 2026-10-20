// libraries
import type { Metadata, Viewport } from 'next'
import { Nunito, Dancing_Script } from 'next/font/google'

// components
import JsonLd from '@/components/JsonLd'
import MobileNav from '@/components/MobileNav'
import Sidebar, { Profile, SidebarContent } from '@/components/Sidebar'

// utils
import { organizationJsonLd, pageMetadata, websiteJsonLd } from '@/lib/seo'
import { isProduction, SITE } from '@/lib/site'

import '@/assets/css/global.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' })
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing', display: 'swap' })

export const revalidate = 3600

export const metadata: Metadata = {
	...pageMetadata({ description: 'Achados da Shopee pra casa, escolhidos a dedo: campeões de vendas e bem avaliados, com o link de cada um.', path: '/' }),
	metadataBase: new URL(SITE.url),
	title: { default: `${SITE.name} | ${SITE.tagline}`, template: `%s | ${SITE.name}` },
	applicationName: SITE.name,
	...(!isProduction() && { robots: { index: false, follow: false } })
}

export const viewport: Viewport = {
	themeColor: '#FBF7F0'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR' className={`${nunito.variable} ${dancing.variable}`}>
			<body className='min-h-dvh lg:flex'>
				<a href='#conteudo' className='sr-only z-50 rounded-lg bg-terracota px-4 py-2 text-creme focus:not-sr-only focus:fixed focus:top-3 focus:left-3'>Pular para o conteúdo</a>
				<Sidebar />
				<MobileNav profile={<Profile />}>
					<SidebarContent />
				</MobileNav>
				<main id='conteudo' className='min-w-0 flex-1'>
					{children}
				</main>
				<JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
			</body>
		</html>
	)
}
