import { describe, expect, it } from 'vitest'
import { analyticsCookieNames, parseConsent } from './consent'

describe('parseConsent', () => {
	it('accepts only the two saved answers', () => {
		expect(parseConsent('granted')).toBe('granted')
		expect(parseConsent('denied')).toBe('denied')
		expect(parseConsent(null)).toBeNull()
		expect(parseConsent('yes')).toBeNull()
	})
})

describe('analyticsCookieNames', () => {
	it('picks the Google Analytics cookies and leaves the rest', () => {
		expect(analyticsCookieNames('_ga=GA1.1.1; theme=x; _ga_ABC123=GS1; _gid=1; other_ga=2')).toEqual(['_ga', '_ga_ABC123', '_gid'])
		expect(analyticsCookieNames('')).toEqual([])
	})
})
