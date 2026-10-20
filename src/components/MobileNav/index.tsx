'use client'

// libraries
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

// components
import { CloseIcon, MenuIcon } from '@/components/Icons'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function MobileNav({ profile, children }: { profile: React.ReactNode; children: React.ReactNode }) {
	const [open, setOpen] = useState(false)
	const [mounted, setMounted] = useState(false)
	const pathname = usePathname()
	const button = useRef<HTMLButtonElement>(null)
	const header = useRef<HTMLElement>(null)
	const overlay = useRef<HTMLDivElement>(null)
	const sheet = useRef<HTMLDivElement>(null)

	// close on navigation
	const [lastPath, setLastPath] = useState(pathname)
	if (pathname !== lastPath) {
		setLastPath(pathname)
		setOpen(false)
	}

	if (open && !mounted) setMounted(true)

	// enter / leave animation; layout effect so the sheet never paints before GSAP positions it
	useLayoutEffect(() => {
		if (!mounted || !overlay.current || !sheet.current) return
		const items = sheet.current.querySelectorAll('li, [data-menu-item]')
		const instant = reducedMotion()

		if (open) {
			const tl = gsap.timeline()
			tl.fromTo(overlay.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: instant ? 0 : 0.25, ease: 'power1.out' })
				.fromTo(sheet.current, { xPercent: 100 }, { xPercent: 0, duration: instant ? 0 : 0.45, ease: 'power3.out' }, 0)
				.fromTo(items, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: instant ? 0 : 0.35, ease: 'power2.out', stagger: instant ? 0 : 0.04 }, instant ? 0 : 0.15)
			return () => { tl.kill() }
		}

		const tl = gsap.timeline({ onComplete: () => setMounted(false) })
		tl.to(sheet.current, { xPercent: 100, duration: instant ? 0 : 0.3, ease: 'power2.in' })
			.to(overlay.current, { autoAlpha: 0, duration: instant ? 0 : 0.2 }, instant ? 0 : 0.1)
		return () => { tl.kill() }
	}, [open, mounted])

	// scroll lock, focus and keeping the page behind out of reach while open
	useEffect(() => {
		if (!open) return
		const previous = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		sheet.current?.querySelector<HTMLElement>('a, button, input')?.focus()

		// keep keyboard and screen readers inside the sheet while it is open
		const background = [header.current, document.getElementById('conteudo'), document.querySelector<HTMLElement>('a[href="#conteudo"]')].filter(el => el !== null)
		background.forEach(el => { el.inert = true })

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		const trigger = button.current

		return () => {
			document.body.style.overflow = previous
			background.forEach(el => { el.inert = false })
			document.removeEventListener('keydown', onKey)
			trigger?.focus()
		}
	}, [open])

	return (
		<div className='lg:hidden'>
			<header ref={header} className='flex items-center justify-between bg-areia px-4 py-3'>
				{profile}
				<button
					ref={button}
					type='button'
					onClick={() => setOpen(true)}
					aria-expanded={open}
					aria-controls='menu-celular'
					className='grid size-11 place-items-center rounded-lg bg-cartao text-tinta'
				>
					<MenuIcon className='size-5' />
					<span className='sr-only'>Abrir menu</span>
				</button>
			</header>
			{mounted && (
				<div className='fixed inset-0 z-40'>
					<div ref={overlay} className='invisible absolute inset-0 bg-tinta/40' onClick={() => setOpen(false)} aria-hidden='true' />
					<div
						ref={sheet}
						id='menu-celular'
						role='dialog'
						aria-modal='true'
						aria-label='Menu'
						className='absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col gap-6 overflow-y-auto bg-areia px-4 py-4'
					>
						<div data-menu-item className='flex justify-end'>
							<button type='button' onClick={() => setOpen(false)} className='grid size-11 place-items-center rounded-lg bg-cartao text-tinta'>
								<CloseIcon className='size-5' />
								<span className='sr-only'>Fechar menu</span>
							</button>
						</div>
						<div className='flex flex-1 flex-col'>{children}</div>
					</div>
				</div>
			)}
		</div>
	)
}
