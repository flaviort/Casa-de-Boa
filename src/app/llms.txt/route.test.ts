import fs from 'fs'
import os from 'os'
import path from 'path'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { makePost } from '@/lib/posts/__fixtures__/post'

beforeAll(() => {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdb-llms-'))
	const posts = [
		makePost({ slug: 'cozinha-ok', title: 'Achados pra cozinha', publishAt: '2026-10-19T21:00:00-03:00' }),
		makePost({ slug: 'quarto-futuro', room: 'quarto', publishAt: '2026-10-21T21:00:00-03:00' })
	]
	for (const post of posts) fs.writeFileSync(path.join(dir, `${post.slug}.json`), JSON.stringify(post))
	process.env.POSTS_DIR = dir
	vi.useFakeTimers()
	vi.setSystemTime(new Date('2026-10-20T12:00:00-03:00'))
})

describe('GET /llms.txt', () => {
	it('describes the brand and links visible posts in markdown', async () => {
		const { GET } = await import('./route')
		const res = await GET()
		const text = await res.text()
		expect(res.headers.get('content-type')).toContain('text/plain')
		expect(text.startsWith('# Casa de Boa')).toBe(true)
		expect(text).toContain('[Achados pra cozinha](https://casadeboa.com.br/posts/cozinha-ok)')
		expect(text).not.toContain('quarto-futuro')
		expect(text).toContain('https://www.instagram.com/casadeboa.br/')
	})
})
