'use client'

// libraries
import { useState } from 'react'

type Status = 'idle' | 'sending' | 'done' | 'error'

const field = 'min-h-11 w-full rounded-xl border border-linha bg-cartao px-4 text-[15px] text-tinta placeholder:text-suave/70 focus:border-terracota focus:outline-none'

export default function ContactForm() {
	const [status, setStatus] = useState<Status>('idle')
	const [error, setError] = useState('')

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setStatus('sending')
		const data = Object.fromEntries(new FormData(event.currentTarget))

		try {
			const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
			const body = await res.json().catch(() => ({}))
			if (!res.ok) throw new Error(body.error || 'Não deu certo agora. Tenta de novo daqui a pouco?')
			setStatus('done')
		} catch (err) {
			setError((err as Error).message)
			setStatus('error')
		}
	}

	if (status === 'done') {
		return <p role='status' className='rounded-2xl bg-creme p-5 text-lg font-bold text-terracota'>Mensagem enviada! A gente responde no seu e-mail.</p>
	}

	return (
		<form onSubmit={onSubmit} noValidate className='flex flex-col gap-4'>
			<div>
				<label htmlFor='contato-nome' className='mb-1.5 block text-sm font-extrabold text-tinta'>Nome</label>
				<input id='contato-nome' name='name' required minLength={2} maxLength={80} autoComplete='name' className={field} />
			</div>
			<div>
				<label htmlFor='contato-email' className='mb-1.5 block text-sm font-extrabold text-tinta'>E-mail</label>
				<input id='contato-email' name='email' type='email' required autoComplete='email' className={field} />
			</div>
			<div>
				<label htmlFor='contato-mensagem' className='mb-1.5 block text-sm font-extrabold text-tinta'>Mensagem</label>
				<textarea id='contato-mensagem' name='message' required minLength={10} maxLength={4000} rows={6} className={`${field} py-3`} />
			</div>
			{/* honeypot: hidden from people and keyboard, bots fill it */}
			<input type='text' name='website' tabIndex={-1} autoComplete='off' aria-hidden='true' className='absolute -left-[9999px] h-px w-px opacity-0' />
			{status === 'error' && <p role='alert' className='text-sm font-bold text-terracota'>{error}</p>}
			<button type='submit' disabled={status === 'sending'} className='min-h-11 self-start rounded-xl bg-terracota px-6 text-[15px] font-extrabold text-creme transition-colors hover:bg-tinta disabled:opacity-60'>
				{status === 'sending' ? 'Enviando...' : 'Enviar mensagem'}
			</button>
		</form>
	)
}
