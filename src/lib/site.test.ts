import { describe, expect, it } from 'vitest'
import { absoluteUrl, SITE } from './site'
import { ROOMS, ROOM_LABELS } from './rooms'

describe('absoluteUrl', () => {
	it('builds the home url', () => {
		expect(absoluteUrl('/')).toBe('https://casadeboa.com.br/')
	})

	it('builds a nested url', () => {
		expect(absoluteUrl('/posts/x')).toBe('https://casadeboa.com.br/posts/x')
	})
})

describe('SITE', () => {
	it('carries the brand names used for SEO', () => {
		expect(SITE.name).toBe('Casa de Boa')
		expect(SITE.alternateNames).toEqual(['casadeboa', 'casadeboa.br'])
	})
})

describe('ROOM_LABELS', () => {
	it('labels every room', () => {
		for (const room of ROOMS) expect(ROOM_LABELS[room]).toBeTruthy()
	})
})
