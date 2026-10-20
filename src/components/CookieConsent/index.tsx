'use client'

// libraries
import { useEffect, useSyncExternalStore } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'

// utils
import { clearAnalyticsCookies, getConsent, setConsent, subscribeConsent } from '@/lib/consent'

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void
		[key: `ga-disable-${string}`]: boolean
	}
}

// Google Analytics loads only after the visitor accepts; until then nothing from Google reaches the page
export default function CookieConsent({ gaId }: { gaId?: string }) {
	const consent = useSyncExternalStore(subscribeConsent, getConsent, () => 'pending')

	// also reacts to the switch on the privacy page, which writes the same answer
	useEffect(() => {
		if (!gaId) return
		window[`ga-disable-${gaId}`] = consent !== 'granted'
		if (consent === 'granted') window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
		if (consent === 'denied') {
			window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
			clearAnalyticsCookies()
		}
	}, [consent, gaId])

	return (
		<>
			{gaId && consent === 'granted' && (
				<>
					<Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy='afterInteractive' />
					<Script id='ga-init' strategy='afterInteractive'>
						{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${gaId}')`}
					</Script>
				</>
			)}
			{consent === null && (
				<section aria-label='Cookies' className='fixed inset-x-4 bottom-4 z-40 rounded-lg border border-linha bg-cartao p-4 sm:left-auto sm:max-w-[440px]'>
					<p className='flex items-center gap-2 text-base font-semibold tracking-[-0.04em] text-tinta'>
						Cookies, só se você deixar
						<Image src='/img/cookie.png' alt='' width={18} height={18} />
					</p>
					<p className='mt-2 text-sm leading-relaxed font-medium tracking-[-0.01em] text-suave'>
						A gente usa o Google Analytics para saber quais achados vocês mais visitam. Ele só liga se você aceitar, e dá para desligar quando quiser na página de <Link href='/privacidade' className='text-terracota underline underline-offset-4 hover:text-tinta'>privacidade</Link>.
					</p>
					<div className='mt-3 flex gap-2'>
						<button type='button' onClick={() => setConsent('granted')} className='min-h-10 flex-1 cursor-pointer rounded-lg bg-terracota px-4 text-sm font-semibold tracking-[-0.02em] text-creme transition-colors hover:bg-tinta'>Aceitar</button>
						<button type='button' onClick={() => setConsent('denied')} className='min-h-10 flex-1 cursor-pointer rounded-lg bg-areia px-4 text-sm font-semibold tracking-[-0.02em] text-tinta transition-colors hover:bg-linha'>Recusar</button>
					</div>
				</section>
			)}
		</>
	)
}
