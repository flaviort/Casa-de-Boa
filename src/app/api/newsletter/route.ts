// libraries
import { Resend } from 'resend'

// utils
import { isBot, MESSAGES, newsletterSchema, readJson, reply } from '@/lib/forms'

export async function POST(req: Request) {
	const body = await readJson(req)
	if (isBot(body)) return reply(200, { ok: true })

	const parsed = newsletterSchema.safeParse(body)
	if (!parsed.success) return reply(400, { ok: false, error: MESSAGES.invalid })

	const { RESEND_API_KEY, RESEND_SEGMENT_ID } = process.env
	if (!RESEND_API_KEY || !RESEND_SEGMENT_ID) {
		console.error('newsletter: RESEND_API_KEY or RESEND_SEGMENT_ID missing')
		return reply(500, { ok: false, error: MESSAGES.failed })
	}

	try {
		const { error } = await new Resend(RESEND_API_KEY).contacts.create({ email: parsed.data.email, unsubscribed: false, segments: [{ id: RESEND_SEGMENT_ID }] })
		// a repeated sign-up is fine for the visitor, so it counts as success
		if (error && !/already exists/i.test(error.message)) {
			console.error('newsletter: resend error', error)
			return reply(502, { ok: false, error: MESSAGES.failed })
		}
	} catch (error) {
		console.error('newsletter: resend threw', error)
		return reply(502, { ok: false, error: MESSAGES.failed })
	}

	return reply(200, { ok: true })
}
