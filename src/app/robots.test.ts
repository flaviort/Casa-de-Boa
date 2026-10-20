import { afterEach, describe, expect, it } from 'vitest'
import robots from './robots'

afterEach(() => {
	delete process.env.VERCEL_ENV
})

describe('robots', () => {
	it('opens the site in production', () => {
		process.env.VERCEL_ENV = 'production'
		expect(robots().rules).toEqual({ userAgent: '*', allow: '/', disallow: '/api/' })
		expect(robots().sitemap).toBe('https://casadeboa.com.br/sitemap.xml')
	})

	it('closes stage and previews to crawlers', () => {
		process.env.VERCEL_ENV = 'preview'
		expect(robots().rules).toEqual({ userAgent: '*', disallow: '/' })
		expect(robots().sitemap).toBeUndefined()
	})
})
