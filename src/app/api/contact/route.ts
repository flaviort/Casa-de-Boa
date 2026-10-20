// libraries
import { Resend } from 'resend'

// utils
import { contactSchema, isBot, MESSAGES, readJson, reply } from '@/lib/forms'

export async function POST(req: Request) {
	const body = await readJson(req)
	if (isBot(body)) return reply(200, { ok: true })

	const parsed = contactSchema.safeParse(body)
	if (!parsed.success) return reply(400, { ok: false, error: MESSAGES.invalidContact })

	const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env
	if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
		console.error('contact: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing')
		return reply(500, { ok: false, error: MESSAGES.failed })
	}

	const { name, email, message } = parsed.data

	try {
		const { error } = await new Resend(RESEND_API_KEY).emails.send({
			from: CONTACT_FROM_EMAIL,
			to: CONTACT_TO_EMAIL,
			replyTo: email,
			subject: `Contato pelo site: ${name.replace(/\s+/g, ' ')}`,
			text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`
		})
		if (error) {
			console.error('contact: resend error', error)
			return reply(502, { ok: false, error: MESSAGES.failed })
		}
	} catch (error) {
		console.error('contact: resend threw', error)
		return reply(502, { ok: false, error: MESSAGES.failed })
	}

	return reply(200, { ok: true })
}
