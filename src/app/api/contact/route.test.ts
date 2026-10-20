import { beforeEach, describe, expect, it, vi } from 'vitest'
import { HONEYPOT } from '@/lib/honeypot'

const send = vi.fn()
vi.mock('resend', () => ({ Resend: vi.fn(() => ({ emails: { send } })) }))

const { POST } = await import('./route')

const post = (body: unknown) => POST(new Request('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) }))
const valid = { name: 'Ana', email: 'Ana@Exemplo.com', message: 'Quero saber do organizador.', [HONEYPOT]: '' }

beforeEach(() => {
	send.mockReset()
	process.env.RESEND_API_KEY = 're_test'
	process.env.CONTACT_TO_EMAIL = 'dono@casadeboa.com.br'
	process.env.CONTACT_FROM_EMAIL = 'site@casadeboa.com.br'
})

describe('POST /api/contact', () => {
	it('emails the owner with reply-to set to the sender', async () => {
		send.mockResolvedValue({ data: { id: 'e1' }, error: null })
		const res = await post(valid)
		expect(res.status).toBe(200)
		expect(send).toHaveBeenCalledWith(expect.objectContaining({
			to: 'dono@casadeboa.com.br',
			from: 'site@casadeboa.com.br',
			replyTo: 'ana@exemplo.com'
		}))
		expect(send.mock.calls[0][0].text).toContain('Quero saber do organizador.')
		expect(send.mock.calls[0][0].html).toContain('Quero saber do organizador.')
	})

	it('keeps the subject on one line', async () => {
		send.mockResolvedValue({ data: { id: 'e1' }, error: null })
		await post({ ...valid, name: 'Ana\nBcc: x@y.com' })
		expect(send.mock.calls[0][0].subject).toBe('Contato pelo site: Ana Bcc: x@y.com')
	})

	it('rejects a short message without sending', async () => {
		const res = await post({ ...valid, message: 'oi' })
		expect(res.status).toBe(400)
		expect(send).not.toHaveBeenCalled()
	})

	it('answers 200 to a bot without sending', async () => {
		expect((await post({ ...valid, [HONEYPOT]: 'x' })).status).toBe(200)
		expect(send).not.toHaveBeenCalled()
	})

	it('answers 502 when Resend fails', async () => {
		send.mockResolvedValue({ data: null, error: { name: 'application_error', message: 'boom' } })
		expect((await post(valid)).status).toBe(502)
	})

	it('answers 500 when the destination is missing', async () => {
		delete process.env.CONTACT_TO_EMAIL
		expect((await post(valid)).status).toBe(500)
		expect(send).not.toHaveBeenCalled()
	})
})
