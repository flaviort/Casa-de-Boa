import { describe, expect, it } from 'vitest'
import { contactEmail } from './contact'

const input = { name: 'Ana Souza', email: 'ana@exemplo.com', message: 'Oi!\nQuero saber do organizador.' }

describe('contactEmail', () => {
	it('builds the subject on one line', () => {
		expect(contactEmail({ ...input, name: 'Ana\nBcc: x@y.com' }).subject).toBe('Contato pelo site: Ana Bcc: x@y.com')
	})

	it('puts name, e-mail and message in the html', () => {
		const { html } = contactEmail(input)
		expect(html).toContain('Ana Souza')
		expect(html).toContain('mailto:ana@exemplo.com')
		expect(html).toContain('Quero saber do organizador.')
	})

	it('keeps line breaks of the message', () => {
		expect(contactEmail(input).html).toContain('Oi!<br>Quero saber do organizador.')
	})

	it('escapes what the visitor typed, so no html can be injected', () => {
		const { html } = contactEmail({ name: '<script>alert(1)</script>', email: 'a@b.com', message: '<img src=x onerror=alert(1)> & "aspas"' })
		expect(html).not.toContain('<script>')
		expect(html).not.toContain('<img src=x')
		expect(html).toContain('&lt;script&gt;')
		expect(html).toContain('&amp; &quot;aspas&quot;')
	})

	it('has a plain text version', () => {
		const { text } = contactEmail(input)
		expect(text).toContain('Nome: Ana Souza')
		expect(text).toContain('E-mail: ana@exemplo.com')
		expect(text).toContain('Quero saber do organizador.')
	})
})
