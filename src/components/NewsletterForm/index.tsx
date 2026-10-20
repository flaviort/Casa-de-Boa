'use client'

// libraries
import { useId, useState } from 'react'
import clsx from 'clsx'

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
		const website = new FormData(event.currentTarget).get('website')

		try {
			const res = await fetch('/api/newsletter', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, website })
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
			<p role='status' className={clsx('rounded-xl bg-creme font-bold text-terracota', compact ? 'p-3 text-sm' : 'p-4 text-base')}>
				Prontinho! Os próximos achados chegam no seu e-mail.
			</p>
		)
	}

	return (
		<form onSubmit={onSubmit} noValidate className={clsx(variant === 'hero' && 'mx-auto w-full max-w-md')}>
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
					className='min-h-11 w-full flex-1 rounded-xl border border-linha bg-cartao px-4 text-[15px] text-tinta placeholder:text-suave/70 focus:border-terracota focus:outline-none'
				/>
				{/* honeypot: hidden from people and keyboard, bots fill it */}
				<input type='text' name='website' tabIndex={-1} autoComplete='off' aria-hidden='true' className='absolute -left-[9999px] h-px w-px opacity-0' />
				<button
					type='submit'
					disabled={status === 'sending'}
					className='min-h-11 shrink-0 rounded-xl bg-terracota px-5 text-[15px] font-extrabold text-creme transition-colors hover:bg-tinta disabled:opacity-60'
				>
					{status === 'sending' ? 'Enviando...' : 'Quero receber'}
				</button>
			</div>
			<p id={`${id}-help`} role={status === 'error' ? 'alert' : undefined} className={clsx('mt-2 text-xs leading-relaxed', status === 'error' ? 'font-bold text-terracota' : 'text-suave', variant === 'hero' && 'text-center')}>
				{status === 'error' ? error : CONSENT}
			</p>
		</form>
	)
}
