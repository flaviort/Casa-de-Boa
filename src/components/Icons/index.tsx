type Props = { className?: string }

export function InstagramIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className={className} aria-hidden='true'>
			<rect x='3' y='3' width='18' height='18' rx='5' />
			<circle cx='12' cy='12' r='4' />
			<circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
		</svg>
	)
}

export function TiktokIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden='true'>
			<path d='M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z' />
		</svg>
	)
}

export function FacebookIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden='true'>
			<path d='M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z' />
		</svg>
	)
}

export function ArrowUpRightIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={className} aria-hidden='true'>
			<path d='M7 17 17 7M8 7h9v9' />
		</svg>
	)
}

export function HomeIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' className={className} aria-hidden='true'>
			<path d='M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z' />
		</svg>
	)
}

export function UserIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className={className} aria-hidden='true'>
			<circle cx='12' cy='8' r='4' />
			<path d='M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5' strokeLinecap='round' />
		</svg>
	)
}

export function MailIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinejoin='round' className={className} aria-hidden='true'>
			<rect x='3' y='5' width='18' height='14' rx='2' />
			<path d='m4 7 8 6 8-6' />
		</svg>
	)
}

export function MenuIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className={className} aria-hidden='true'>
			<path d='M4 7h16M4 12h16M4 17h16' />
		</svg>
	)
}

export function CloseIcon({ className }: Props) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' className={className} aria-hidden='true'>
			<path d='M6 6l12 12M18 6 6 18' />
		</svg>
	)
}
