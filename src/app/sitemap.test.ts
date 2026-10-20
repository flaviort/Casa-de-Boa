import fs from 'fs'
import os from 'os'
import path from 'path'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { makePost } from '@/lib/posts/__fixtures__/post'

beforeAll(() => {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdb-sitemap-'))
	const posts = [
		makePost({ slug: 'cozinha-ok', room: 'cozinha', publishAt: '2026-10-19T21:00:00-03:00' }),
		makePost({ slug: 'banheiro-futuro', room: 'banheiro', publishAt: '2026-10-21T21:00:00-03:00' })
	]
	for (const post of posts) fs.writeFileSync(path.join(dir, `${post.slug}.json`), JSON.stringify(post))
	process.env.POSTS_DIR = dir
	vi.useFakeTimers()
	vi.setSystemTime(new Date('2026-10-21T12:00:00-03:00'))
})

afterAll(() => {
	vi.useRealTimers()
})

describe('sitemap', () => {
	it('lists static pages, visible posts and visible rooms only', async () => {
		const { default: sitemap } = await import('./sitemap')
		const urls = sitemap().map(entry => entry.url)
		expect(urls).toEqual(expect.arrayContaining([
			'https://casadeboa.com.br/',
			'https://casadeboa.com.br/sobre',
			'https://casadeboa.com.br/contato',
			'https://casadeboa.com.br/posts/cozinha-ok',
			'https://casadeboa.com.br/categoria/cozinha'
		]))
		expect(urls.some(url => url.includes('banheiro'))).toBe(false)
		expect(urls.every(url => url.startsWith('https://casadeboa.com.br/'))).toBe(true)
	})
})
