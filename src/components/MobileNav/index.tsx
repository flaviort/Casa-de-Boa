'use client'

// libraries
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

// components
import { CloseIcon, MenuIcon } from '@/components/Icons'

export default function MobileNav({ profile, children }: { profile: React.ReactNode; children: React.ReactNode }) {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()
	const button = useRef<HTMLButtonElement>(null)
	const sheet = useRef<HTMLDivElement>(null)

	// close on navigation
	const [lastPath, setLastPath] = useState(pathname)
	if (pathname !== lastPath) {
		setLastPath(pathname)
		setOpen(false)
	}

	useEffect(() => {
		if (!open) return
		const previous = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		sheet.current?.querySelector<HTMLElement>('a, button, input')?.focus()

		const onKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		const trigger = button.current

		return () => {
			document.body.style.overflow = previous
			document.removeEventListener('keydown', onKey)
			trigger?.focus()
		}
	}, [open])

	return (
		<div className='lg:hidden'>
			<header className='sticky top-0 z-30 flex items-center justify-between border-b border-linha bg-papel/90 px-4 py-3 backdrop-blur'>
				{profile}
				<button
					ref={button}
					type='button'
					onClick={() => setOpen(true)}
					aria-expanded={open}
					aria-controls='menu-celular'
					className='grid size-11 place-items-center rounded-xl bg-cartao text-tinta shadow-[0_1px_2px_rgba(42,30,23,0.08)]'
				>
					<MenuIcon className='size-5' />
					<span className='sr-only'>Abrir menu</span>
				</button>
			</header>
			{open && (
				<div className='fixed inset-0 z-40'>
					<div className='absolute inset-0 bg-tinta/30' onClick={() => setOpen(false)} aria-hidden='true' />
					<div
						ref={sheet}
						id='menu-celular'
						role='dialog'
						aria-modal='true'
						aria-label='Menu'
						className='absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col gap-6 overflow-y-auto bg-papel px-4 py-4 shadow-2xl'
					>
						<div className='flex justify-end'>
							<button type='button' onClick={() => setOpen(false)} className='grid size-11 place-items-center rounded-xl bg-cartao text-tinta'>
								<CloseIcon className='size-5' />
								<span className='sr-only'>Fechar menu</span>
							</button>
						</div>
						{children}
					</div>
				</div>
			)}
		</div>
	)
}
