// the visitor's answer about analytics cookies, kept in localStorage and shared by the banner,
// the privacy page and the Google Analytics loader
export type Consent = 'granted' | 'denied'

const KEY = 'cdb-consent'
const CHANGE = 'cdb:consent-change'
const OPEN = 'cdb:consent-open'

export const parseConsent = (value: string | null): Consent | null => value === 'granted' || value === 'denied' ? value : null

export const analyticsCookieNames = (cookies: string) => cookies
	.split(';')
	.map(cookie => cookie.split('=')[0].trim())
	.filter(name => name === '_ga' || name === '_gid' || name.startsWith('_ga_'))

export function getConsent(): Consent | null {
	try {
		return parseConsent(localStorage.getItem(KEY))
	} catch {
		return null
	}
}

export function setConsent(consent: Consent) {
	try {
		localStorage.setItem(KEY, consent)
	} catch {}
	window.dispatchEvent(new Event(CHANGE))
}

export function subscribeConsent(callback: () => void) {
	window.addEventListener(CHANGE, callback)
	window.addEventListener('storage', callback)
	return () => {
		window.removeEventListener(CHANGE, callback)
		window.removeEventListener('storage', callback)
	}
}

export const openConsent = () => window.dispatchEvent(new Event(OPEN))

export function onOpenConsent(callback: () => void) {
	window.addEventListener(OPEN, callback)
	return () => window.removeEventListener(OPEN, callback)
}

// clears the GA cookies on this host and on the parent domain, where gtag sets them
export function clearAnalyticsCookies() {
	const host = location.hostname
	const domains = ['', host, `.${host.split('.').slice(-3).join('.')}`]
	for (const name of analyticsCookieNames(document.cookie)) {
		for (const domain of domains) {
			document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`
		}
	}
}
