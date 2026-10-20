'use client'

// libraries
import { useSyncExternalStore } from 'react'
import clsx from 'clsx'

// utils
import { getConsent, setConsent, subscribeConsent } from '@/lib/consent'

const STATUS = { granted: 'Ligado. Obrigado por ajudar a gente a melhorar.', denied: 'Desligado. Nenhum dado seu vai para o Google.', none: 'Desligado. Você ainda não escolheu.' }

export default function CookiePreferences() {
	const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null)
	const on = consent === 'granted'

	return (
		<div className='flex items-center gap-4 rounded-lg bg-areia p-4'>
			<div className='min-w-0 flex-1'>
				<p id='ga-switch' className='text-base font-semibold tracking-[-0.02em] text-tinta'>Google Analytics</p>
				<p className='mt-0.5 text-sm font-medium text-suave' aria-live='polite'>{STATUS[consent ?? 'none']}</p>
			</div>
			<button
				type='button'
				role='switch'
				aria-checked={on}
				aria-labelledby='ga-switch'
				onClick={() => setConsent(on ? 'denied' : 'granted')}
				className={clsx('relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors', on ? 'bg-terracota' : 'bg-linha')}
			>
				<span className={clsx('absolute top-1 left-1 size-5 rounded-full bg-cartao transition-transform', on && 'translate-x-5')} />
			</button>
		</div>
	)
}
