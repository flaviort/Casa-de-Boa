'use client'

// libraries
import { useSyncExternalStore } from 'react'

// utils
import { getConsent, openConsent, subscribeConsent } from '@/lib/consent'

const LABELS = { granted: 'Você aceitou o Google Analytics.', denied: 'Você recusou o Google Analytics.', none: 'Você ainda não escolheu.' }

export default function CookiePreferences() {
	const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null)

	return (
		<div className='flex flex-wrap items-center gap-4 rounded-lg bg-areia p-4'>
			<p className='text-sm font-medium text-tinta'>{LABELS[consent ?? 'none']}</p>
			<button type='button' onClick={openConsent} className='inline-flex min-h-11 cursor-pointer items-center rounded-lg bg-terracota px-4 text-sm font-semibold tracking-[-0.02em] text-creme transition-colors hover:bg-tinta sm:ml-auto'>Mudar preferências de cookies</button>
		</div>
	)
}
