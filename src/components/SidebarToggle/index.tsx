'use client'

// libraries
import { useSyncExternalStore } from 'react'

// components
import { ChevronLeftIcon } from '@/components/Icons'

// the source of truth is data-sidebar on <html>, set before paint by the layout script
function subscribe(onChange: () => void) {
	const observer = new MutationObserver(onChange)
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-sidebar'] })
	return () => observer.disconnect()
}

const isCollapsed = () => document.documentElement.dataset.sidebar === 'collapsed'

export default function SidebarToggle() {
	const collapsed = useSyncExternalStore(subscribe, isCollapsed, () => false)

	function toggle() {
		const next = !collapsed
		if (next) document.documentElement.dataset.sidebar = 'collapsed'
		else delete document.documentElement.dataset.sidebar
		try {
			localStorage.setItem('cdb-sidebar', next ? 'collapsed' : 'expanded')
		} catch {}
	}

	return (
		<button
			type='button'
			onClick={toggle}
			aria-expanded={!collapsed}
			aria-label={collapsed ? 'Abrir menu lateral' : 'Recolher menu lateral'}
			className='absolute top-[30px] -right-3 z-10 grid size-6 place-items-center rounded-full bg-tinta text-cartao transition-colors hover:bg-terracota'
		>
			<ChevronLeftIcon className='size-3.5 transition-transform duration-300 collapsed:rotate-180' />
		</button>
	)
}
