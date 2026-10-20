import { describe, expect, it } from 'vitest'
import { contactSchema, isBot, newsletterSchema } from './forms'

describe('newsletterSchema', () => {
	it('normalizes the email', () => {
		expect(newsletterSchema.parse({ email: '  Ana@Exemplo.COM ' }).email).toBe('ana@exemplo.com')
	})

	it('rejects an invalid email', () => {
		expect(newsletterSchema.safeParse({ email: 'ana@' }).success).toBe(false)
	})
})

describe('contactSchema', () => {
	it('limits name and message sizes', () => {
		expect(contactSchema.safeParse({ name: 'A', email: 'a@b.com', message: 'Mensagem longa o bastante' }).success).toBe(false)
		expect(contactSchema.safeParse({ name: 'Ana', email: 'a@b.com', message: 'curta' }).success).toBe(false)
		expect(contactSchema.safeParse({ name: 'Ana', email: 'a@b.com', message: 'x'.repeat(4001) }).success).toBe(false)
		expect(contactSchema.safeParse({ name: 'Ana', email: 'a@b.com', message: 'Mensagem longa o bastante' }).success).toBe(true)
	})
})

describe('isBot', () => {
	it('flags a filled honeypot', () => {
		expect(isBot({ website: 'http://spam' })).toBe(true)
		expect(isBot({ website: '' })).toBe(false)
		expect(isBot({})).toBe(false)
		expect(isBot(null)).toBe(false)
	})
})
