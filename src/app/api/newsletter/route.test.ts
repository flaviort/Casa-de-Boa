import { beforeEach, describe, expect, it, vi } from 'vitest'

const create = vi.fn()
vi.mock('resend', () => ({ Resend: vi.fn(() => ({ contacts: { create } })) }))

const { POST } = await import('./route')

const post = (body: unknown) => POST(new Request('http://localhost/api/newsletter', { method: 'POST', body: JSON.stringify(body) }))

beforeEach(() => {
	create.mockReset()
	process.env.RESEND_API_KEY = 're_test'
	process.env.RESEND_SEGMENT_ID = 'seg_1'
})

describe('POST /api/newsletter', () => {
	it('subscribes a normalized email to the segment', async () => {
		create.mockResolvedValue({ data: { id: 'c1' }, error: null })
		const res = await post({ email: ' Ana@Exemplo.com ', website: '' })
		expect(res.status).toBe(200)
		expect(await res.json()).toEqual({ ok: true })
		expect(create).toHaveBeenCalledWith(expect.objectContaining({ email: 'ana@exemplo.com', segments: [{ id: 'seg_1' }] }))
	})

	it('rejects an invalid email without calling Resend', async () => {
		const res = await post({ email: 'ana@', website: '' })
		expect(res.status).toBe(400)
		expect((await res.json()).error).toBe('Confere o e-mail? Parece que tem algo errado.')
		expect(create).not.toHaveBeenCalled()
	})

	it('accepts a malformed body as a 400', async () => {
		const res = await POST(new Request('http://localhost/api/newsletter', { method: 'POST', body: '{ nope' }))
		expect(res.status).toBe(400)
	})

	it('answers 200 to a bot without calling Resend', async () => {
		const res = await post({ email: 'bot@spam.com', website: 'http://spam' })
		expect(res.status).toBe(200)
		expect(create).not.toHaveBeenCalled()
	})

	it('treats an existing contact as success', async () => {
		create.mockResolvedValue({ data: null, error: { name: 'validation_error', message: 'Contact already exists' } })
		const res = await post({ email: 'ana@exemplo.com', website: '' })
		expect(res.status).toBe(200)
	})

	it('answers 502 when Resend returns an error', async () => {
		create.mockResolvedValue({ data: null, error: { name: 'internal_server_error', message: 'boom' } })
		const res = await post({ email: 'ana@exemplo.com', website: '' })
		expect(res.status).toBe(502)
		expect((await res.json()).error).toBe('Não deu certo agora. Tenta de novo daqui a pouco?')
	})

	it('answers 502 when Resend throws', async () => {
		create.mockRejectedValue(new Error('network'))
		expect((await post({ email: 'ana@exemplo.com', website: '' })).status).toBe(502)
	})

	it('answers 500 when the API key is missing', async () => {
		delete process.env.RESEND_API_KEY
		const res = await post({ email: 'ana@exemplo.com', website: '' })
		expect(res.status).toBe(500)
		expect(create).not.toHaveBeenCalled()
	})
})
