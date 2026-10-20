// libraries
import type { Metadata } from 'next'
import { Nunito, Dancing_Script } from 'next/font/google'

// utils
import { SITE } from '@/lib/site'

import '@/assets/css/global.css'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' })
const dancing = Dancing_Script({ subsets: ['latin'], variable: '--font-dancing', display: 'swap' })

export const metadata: Metadata = {
	metadataBase: new URL(SITE.url)
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-BR' className={`${nunito.variable} ${dancing.variable}`}>
			<body>
				{children}
			</body>
		</html>
	)
}
