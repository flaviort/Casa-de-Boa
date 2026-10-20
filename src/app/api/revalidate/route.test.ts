import { beforeEach, describe, expect, it, vi } from 'vitest'

const revalidatePath = vi.fn()
vi.mock('next/cache', () => ({ revalidatePath }))

const { POST } = await import('./route')

const call = (auth?: string) => POST(new Request('http://localhost/api/revalidate', { method: 'POST', headers: auth ? { authorization: auth } : {} }))

beforeEach(() => {
	revalidatePath.mockReset()
	process.env.REVALIDATE_SECRET = 'segredo-de-teste'
})

describe('POST /api/revalidate', () => {
	it('purges every page, cached 404s included, with the right secret', async () => {
		const res = await call('Bearer segredo-de-teste')
		expect(res.status).toBe(200)
		expect(revalidatePath).toHaveBeenCalledWith('/', 'layout')
	})

	it('refuses a wrong secret', async () => {
		expect((await call('Bearer outro')).status).toBe(401)
		expect(revalidatePath).not.toHaveBeenCalled()
	})

	it('refuses a missing header', async () => {
		expect((await call()).status).toBe(401)
	})

	it('refuses everything when the secret is not configured', async () => {
		delete process.env.REVALIDATE_SECRET
		expect((await call('Bearer ')).status).toBe(500)
		expect((await call('Bearer undefined')).status).toBe(500)
		expect(revalidatePath).not.toHaveBeenCalled()
	})
})
