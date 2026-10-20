import path from 'path'
import { describe, expect, it } from 'vitest'
import { loadAllPosts, parsePost } from './load'
import { makePost } from './__fixtures__/post'

const fixtures = path.join(__dirname, '__fixtures__')

function expectInvalid(overrides: Record<string, unknown>, field: string) {
	const file = `${(overrides.slug as string) ?? 'cozinha-organizada'}.json`
	expect(() => parsePost(file, makePost(overrides))).toThrowError(new RegExp(`^${file.replace('.', '\\.')}: .*${field.replace(/\./g, '\\.')}`))
}

describe('parsePost', () => {
	it('accepts a valid post', () => {
		expect(parsePost('cozinha-organizada.json', makePost()).slug).toBe('cozinha-organizada')
	})

	it('rejects a missing title', () => {
		expectInvalid({ title: undefined }, 'title')
	})

	it('rejects a product link outside Shopee', () => {
		expectInvalid({ products: [{ ...makePost().products[0], url: 'https://amzn.to/x' }] }, 'products.0.url')
	})

	it('accepts a long shopee.com.br link', () => {
		const products = [{ ...makePost().products[0], url: 'https://shopee.com.br/product/1/2?utm_source=an_18390951288' }]
		expect(() => parsePost('cozinha-organizada.json', makePost({ products }))).not.toThrow()
	})

	it('rejects a lookalike host', () => {
		expectInvalid({ products: [{ ...makePost().products[0], url: 'https://shopee.com.br.evil.com/x' }] }, 'products.0.url')
	})

	it('rejects a slug that differs from the file name', () => {
		expect(() => parsePost('outro-nome.json', makePost())).toThrowError(/^outro-nome\.json: slug/)
	})

	it('rejects a room outside the list', () => {
		expectInvalid({ room: 'garagem' }, 'room')
	})

	it('rejects an em dash in any text field', () => {
		expectInvalid({ body: ['Texto com — travessão.'] }, 'body.0')
	})

	it('rejects a publishAt without timezone', () => {
		expectInvalid({ publishAt: '2026-10-19T21:11:00' }, 'publishAt')
	})

	it('rejects an empty product list', () => {
		expectInvalid({ products: [] }, 'products')
	})

	it('rejects a title over 70 characters', () => {
		expectInvalid({ title: 'a'.repeat(71) }, 'title')
	})

	it('rejects an excerpt over 160 characters', () => {
		expectInvalid({ excerpt: 'a'.repeat(161) }, 'excerpt')
	})

	it('rejects a cover url that is neither https nor a local path', () => {
		expectInvalid({ cover: { ...makePost().cover, url: 'http://x.com/a.jpg' } }, 'cover.url')
	})
})

describe('loadAllPosts', () => {
	it('loads every file, newest first', () => {
		const posts = loadAllPosts(path.join(fixtures, 'valid'))
		expect(posts.map(p => p.slug)).toEqual(['quarto-novo', 'cozinha-organizada'])
	})

	it('rejects a repeated slug', () => {
		expect(() => loadAllPosts(path.join(fixtures, 'dup'))).toThrowError(/slug/)
	})

	it('names the file when the JSON is malformed', () => {
		expect(() => parsePost('quebrado.json', '{ nope')).toThrowError(/^quebrado\.json: /)
	})
})
