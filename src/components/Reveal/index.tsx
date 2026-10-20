'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// content is visible without JS; items are hidden only once GSAP runs, then revealed on enter
export default function Reveal({ children, className, stagger = 0.08 }: { children: React.ReactNode; className?: string; stagger?: number }) {
	const root = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const mm = gsap.matchMedia()
		mm.add('(prefers-reduced-motion: no-preference)', () => {
			const items = gsap.utils.toArray<HTMLElement>(root.current!.children)
			gsap.set(items, { y: 28, autoAlpha: 0 })
			ScrollTrigger.batch(items, {
				start: 'top 95%',
				once: true,
				onEnter: batch => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', stagger, overwrite: true })
			})
		})
	}, { scope: root })

	return <div ref={root} className={className}>{children}</div>
}
