import fs from 'fs'
import os from 'os'
import path from 'path'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { makePost } from '@/lib/posts/__fixtures__/post'

beforeAll(() => {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdb-feed-'))
	const posts = [
		makePost({ slug: 'cozinha-ok', title: 'Cozinha & companhia <top>', publishAt: '2026-10-19T21:00:00-03:00' }),
		makePost({ slug: 'quarto-futuro', room: 'quarto', publishAt: '2026-10-21T21:00:00-03:00' })
	]
	for (const post of posts) fs.writeFileSync(path.join(dir, `${post.slug}.json`), JSON.stringify(post))
	process.env.POSTS_DIR = dir
	vi.useFakeTimers()
	vi.setSystemTime(new Date('2026-10-20T12:00:00-03:00'))
})

describe('GET /feed.xml', () => {
	it('lists visible posts as escaped RSS items', async () => {
		const { GET } = await import('./route')
		const res = await GET()
		const xml = await res.text()
		expect(res.headers.get('content-type')).toContain('application/rss+xml')
		expect(xml).toContain('<title>Cozinha &amp; companhia &lt;top&gt;</title>')
		expect(xml).toContain('<link>https://casadeboa.com.br/posts/cozinha-ok</link>')
		expect(xml).not.toContain('quarto-futuro')
		expect(xml).toContain('<language>pt-BR</language>')
	})
})
