'use client'

// libraries
import { useId, useState } from 'react'
import clsx from 'clsx'

// utils
import { HONEYPOT } from '@/lib/honeypot'

type Status = 'idle' | 'sending' | 'done' | 'error'

const CONSENT = 'Uma vez por semana, os achados novos. Sem spam, dá pra sair quando quiser.'

export default function NewsletterForm({ variant }: { variant: 'sidebar' | 'hero' | 'inline' }) {
	const id = useId()
	const [email, setEmail] = useState('')
	const [status, setStatus] = useState<Status>('idle')
	const [error, setError] = useState('')

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setStatus('sending')
		const honeypot = new FormData(event.currentTarget).get(HONEYPOT)

		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, [HONEYPOT]: honeypot })
			})
			const body = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(body.error || 'Não deu certo agora. Tenta de novo daqui a pouco?')
			setStatus('done')
		} catch (err) {
			setError((err as Error).message)
			setStatus('error')
		}
	}

	const compact = variant === 'sidebar'

	if (status === 'done') {
		return (
			<p role='status' className={clsx('rounded-lg bg-creme font-semibold text-terracota', compact ? 'p-3 text-sm' : 'p-4 text-base')}>
				Prontinho! Os próximos achados chegam no seu e-mail.
			</p>
		)
	}

	return (
		<form method='post' action='/api/newsletter' onSubmit={onSubmit} noValidate className={clsx(variant === 'hero' && 'mx-auto w-full max-w-md')}>
			<div className={clsx('flex gap-2', compact ? 'flex-col' : 'flex-col sm:flex-row')}>
				<label htmlFor={`${id}-email`} className='sr-only'>Seu e-mail</label>
				<input
					id={`${id}-email`}
					type='email'
					name='email'
					required
					autoComplete='email'
					placeholder='Seu e-mail'
					value={email}
					onChange={event => setEmail(event.target.value)}
					aria-invalid={status === 'error' || undefined}
					aria-describedby={`${id}-help`}
					className={clsx(
						'w-full flex-1 rounded-lg bg-cartao text-tinta placeholder:text-suave focus:outline-2 focus:outline-terracota',
						compact ? 'min-h-9 px-3 text-xs font-medium' : 'min-h-11 px-4 text-sm font-medium'
					)}
				/>
				{/* honeypot: hidden from people and keyboard, bots fill it */}
				<input type='text' name={HONEYPOT} tabIndex={-1} autoComplete='off' aria-hidden='true' className='absolute -left-[9999px] h-px w-px opacity-0' />
				<button
					type='submit'
					disabled={status === 'sending'}
					className={clsx(
						'shrink-0 rounded-lg bg-terracota font-semibold tracking-[-0.02em] text-creme transition-colors hover:bg-tinta disabled:opacity-60',
						compact ? 'min-h-8 px-3 text-xs' : 'min-h-11 px-5 text-sm'
					)}
				>
					{status === 'sending' ? 'Enviando...' : 'Quero receber'}
				</button>
			</div>
			<p id={`${id}-help`} role={status === 'error' ? 'alert' : undefined} className={clsx('mt-2 text-xs leading-relaxed font-medium', status === 'error' ? 'text-terracota' : 'text-suave', variant !== 'inline' && 'text-center')}>
				{status === 'error' ? error : CONSENT}
			</p>
		</form>
	)
}
