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

	const { email } = parsed.data

	try {
		const resend = new Resend(RESEND_API_KEY)
		const created = await resend.contacts.create({ email, unsubscribed: false, segments: [{ id: RESEND_SEGMENT_ID }] })
		let error = created.error

		// contacts are account-wide: an existing one may be unsubscribed or outside this segment
		if (error && /already exists/i.test(error.message)) {
			error = (await resend.contacts.update({ email, unsubscribed: false })).error
			if (!error) {
				const added = (await resend.contacts.segments.add({ email, segmentId: RESEND_SEGMENT_ID })).error
				error = added && !/already/i.test(added.message) ? added : null
			}
		}

		if (error) {
			console.error('newsletter: resend error', error)
			return reply(502, { ok: false, error: MESSAGES.failed })
		}
	} catch (error) {
		console.error('newsletter: resend threw', error)
		return reply(502, { ok: false, error: MESSAGES.failed })
	}

	return reply(200, { ok: true })
}
