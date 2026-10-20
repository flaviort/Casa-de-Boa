import fs from 'fs'
import os from 'os'
import path from 'path'
import { beforeAll, describe, expect, it } from 'vitest'
import { makePost } from './__fixtures__/post'

const now = new Date('2026-10-21T12:00:00-03:00')

function writePosts(posts: Record<string, unknown>[]) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cdb-posts-'))
	for (const post of posts) fs.writeFileSync(path.join(dir, `${post.slug}.json`), JSON.stringify(post))
	return dir
}

async function load(dir: string) {
	process.env.POSTS_DIR = dir
	return import('./index')
}

let posts: Awaited<ReturnType<typeof load>>

beforeAll(async () => {
	posts = await load(writePosts([
		makePost({ slug: 'cozinha-velha', room: 'cozinha', publishAt: '2026-10-10T21:00:00-03:00' }),
		makePost({ slug: 'cozinha-nova', room: 'cozinha', publishAt: '2026-10-19T21:00:00-03:00' }),
		makePost({ slug: 'quarto-fixado', room: 'quarto', publishAt: '2026-10-12T21:00:00-03:00', pinned: true }),
		makePost({ slug: 'sala-ontem', room: 'sala', publishAt: '2026-10-20T21:00:00-03:00' }),
		makePost({ slug: 'banheiro-futuro', room: 'banheiro', publishAt: '2026-10-21T21:00:00-03:00' })
	]))
})

describe('visibility', () => {
	it('hides posts scheduled for later', () => {
		expect(posts.getVisiblePosts(now).map(p => p.slug)).toEqual(['sala-ontem', 'cozinha-nova', 'quarto-fixado', 'cozinha-velha'])
	})

	it('does not return a future post by slug', () => {
		expect(posts.getVisiblePost('banheiro-futuro', now)).toBeUndefined()
		expect(posts.getVisiblePost('sala-ontem', now)?.slug).toBe('sala-ontem')
	})

	it('shows a post once its time comes', () => {
		expect(posts.getVisiblePost('banheiro-futuro', new Date('2026-10-21T21:00:00-03:00'))?.slug).toBe('banheiro-futuro')
	})
})

describe('rooms', () => {
	it('lists only rooms with a visible post, in ROOMS order', () => {
		expect(posts.getVisibleRooms(now)).toEqual(['cozinha', 'quarto', 'sala'])
	})

	it('filters by room without future posts', () => {
		expect(posts.getPostsByRoom('cozinha', now).map(p => p.slug)).toEqual(['cozinha-nova', 'cozinha-velha'])
		expect(posts.getPostsByRoom('banheiro', now)).toEqual([])
	})
})

describe('getPinnedPost', () => {
	it('prefers the pinned post', () => {
		expect(posts.getPinnedPost(now)?.slug).toBe('quarto-fixado')
	})

	it('falls back to the newest post', async () => {
		const previous = process.env.POSTS_DIR
		const other = await load(writePosts([
			makePost({ slug: 'a', publishAt: '2026-10-10T21:00:00-03:00' }),
			makePost({ slug: 'b', publishAt: '2026-10-11T21:00:00-03:00' })
		]))
		expect(other.getPinnedPost(now)?.slug).toBe('b')
		process.env.POSTS_DIR = previous
	})

	it('returns undefined when nothing is visible', () => {
		expect(posts.getPinnedPost(new Date('2026-01-01T00:00:00-03:00'))).toBeUndefined()
	})
})

describe('getRelatedPosts', () => {
	it('puts the same room first, never the post itself, never a future one', () => {
		const post = posts.getVisiblePost('cozinha-nova', now)!
		expect(posts.getRelatedPosts(post, 3, now).map(p => p.slug)).toEqual(['cozinha-velha', 'sala-ontem', 'quarto-fixado'])
	})

	it('respects count', () => {
		const post = posts.getVisiblePost('cozinha-nova', now)!
		expect(posts.getRelatedPosts(post, 1, now)).toHaveLength(1)
	})
})
