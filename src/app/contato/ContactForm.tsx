'use client'

// libraries
import { useEffect, useRef, useState } from 'react'

// components
import { CheckIcon, ChevronLeftIcon } from '@/components/Icons'

// utils
import { HONEYPOT } from '@/lib/honeypot'

type Status = 'idle' | 'sending' | 'done' | 'error'

const field = 'min-h-11 w-full rounded-lg bg-cartao px-4 text-sm font-medium text-tinta placeholder:text-suave focus:outline-2 focus:outline-terracota'

export default function ContactForm() {
	const [status, setStatus] = useState<Status>('idle')
	const [error, setError] = useState('')
	const [sentTo, setSentTo] = useState('')
	const heading = useRef<HTMLHeadingElement>(null)
	const firstField = useRef<HTMLInputElement>(null)
	const [returning, setReturning] = useState(false)

	// move focus with the view change so keyboard and screen reader users follow it
	useEffect(() => {
		if (status === 'done') heading.current?.focus()
		if (status === 'idle' && returning) firstField.current?.focus()
	}, [status, returning])

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setStatus('sending')
		const data = Object.fromEntries(new FormData(event.currentTarget))

		try {
			const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
			const body = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(body.error || 'Não deu certo agora. Tenta de novo daqui a pouco?')
			setSentTo(String(data.email ?? ''))
			setStatus('done')
		} catch (err) {
			setError((err as Error).message)
			setStatus('error')
		}
	}

	function writeAgain() {
		setReturning(true)
		setError('')
		setStatus('idle')
	}

	if (status === 'done') {
		return (
			<div role='status' className='flex flex-col items-center rounded-lg bg-cartao px-6 py-12 text-center sm:px-12'>
				<span className='grid size-14 place-items-center rounded-full bg-terracota text-creme'>
					<CheckIcon className='size-7' />
				</span>
				<h2 ref={heading} tabIndex={-1} className='mt-6 text-[28px] leading-[1.1] font-medium tracking-[-0.06em] text-tinta outline-none'>
					Mensagem <span className='font-serif tracking-[-0.07em] italic'>enviada</span>
				</h2>
				<p className='mt-3 max-w-sm text-base leading-relaxed font-medium tracking-[-0.02em] text-suave'>
					Obrigada por escrever! A resposta chega no seu e-mail{sentTo && <> (<span className='text-tinta'>{sentTo}</span>)</>}.
				</p>
				<button
					type='button'
					onClick={writeAgain}
					className='mt-8 inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-areia pr-5 pl-4 text-sm font-semibold tracking-[-0.02em] text-tinta transition-colors hover:bg-linha'
				>
					<ChevronLeftIcon className='size-4' />
					Escrever outra mensagem
				</button>
			</div>
		)
	}

	return (
		<form method='post' action='/api/contact' onSubmit={onSubmit} noValidate className='flex flex-col gap-4'>
			<div>
				<label htmlFor='contato-nome' className='mb-1.5 block text-sm font-semibold tracking-[-0.02em] text-tinta'>Nome</label>
				<input ref={firstField} id='contato-nome' name='name' required minLength={2} maxLength={80} autoComplete='name' className={field} />
			</div>
			<div>
				<label htmlFor='contato-email' className='mb-1.5 block text-sm font-semibold tracking-[-0.02em] text-tinta'>E-mail</label>
				<input id='contato-email' name='email' type='email' required autoComplete='email' className={field} />
			</div>
			<div>
				<label htmlFor='contato-mensagem' className='mb-1.5 block text-sm font-semibold tracking-[-0.02em] text-tinta'>Mensagem</label>
				<textarea id='contato-mensagem' name='message' required minLength={10} maxLength={4000} rows={6} className={`${field} py-3`} />
			</div>
			{/* honeypot: hidden from people and keyboard, bots fill it */}
			<input type='text' name={HONEYPOT} tabIndex={-1} autoComplete='off' aria-hidden='true' className='absolute -left-[9999px] h-px w-px opacity-0' />
			{status === 'error' && <p role='alert' className='text-sm font-semibold text-terracota'>{error}</p>}
			<button type='submit' disabled={status === 'sending'} className='min-h-11 self-start rounded-lg bg-terracota px-5 text-sm font-semibold tracking-[-0.02em] text-creme transition-colors hover:bg-tinta disabled:opacity-60'>
				{status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
			</button>
		</form>
	)
}
