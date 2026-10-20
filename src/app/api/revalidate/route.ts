// libraries
import { timingSafeEqual } from 'crypto'
import { revalidatePath } from 'next/cache'

// utils
import { reply } from '@/lib/forms'

function matches(header: string | null, secret: string) {
	const expected = Buffer.from(`Bearer ${secret}`)
	const given = Buffer.from(header ?? '')
	return given.length === expected.length && timingSafeEqual(given, expected)
}

// called by the affiliates worker cron: ISR alone keeps a cached 404 of a scheduled post and serves stale pages once after the hour
export async function POST(req: Request) {
	const secret = process.env.REVALIDATE_SECRET
	if (!secret) {
		console.error('revalidate: REVALIDATE_SECRET missing')
		return reply(500, { ok: false })
	}

	if (!matches(req.headers.get('authorization'), secret)) return reply(401, { ok: false })

	revalidatePath('/', 'layout')
	return reply(200, { ok: true })
}
