// libraries
import { z } from 'zod'

export const MESSAGES = {
	invalid: 'Confere o e-mail? Parece que tem algo errado.',
	invalidContact: 'Confere os campos? Nome, e-mail e uma mensagem de pelo menos 10 letras.',
	failed: 'Não deu certo agora. Tenta de novo daqui a pouco?'
} as const

const email = z.string().trim().toLowerCase().email().max(254)

export const newsletterSchema = z.object({ email })

export const contactSchema = z.object({
	name: z.string().trim().min(2).max(80),
	email,
	message: z.string().trim().min(10).max(4000)
})

export function isBot(body: unknown): boolean {
	return typeof body === 'object' && body !== null && typeof (body as { website?: unknown }).website === 'string' && (body as { website: string }).website.trim() !== ''
}

export async function readJson(req: Request): Promise<unknown> {
	try {
		return await req.json()
	} catch {
		return null
	}
}

export const reply = (status: number, body: object) => Response.json(body, { status })
