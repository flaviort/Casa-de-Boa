export default function PageHero({ eyebrow, children, lead }: { eyebrow: string; children: React.ReactNode; lead?: React.ReactNode }) {
	return (
		<header className='mx-auto max-w-3xl text-center'>
			<p className='inline-flex rounded-full bg-cartao px-3.5 py-1.5 text-xs font-extrabold tracking-wide text-terracota shadow-[0_1px_2px_rgba(42,30,23,0.06)]'>{eyebrow}</p>
			<h1 className='mt-5 text-[40px] leading-[1.02] font-black tracking-[-0.03em] text-tinta text-balance sm:text-6xl'>{children}</h1>
			{lead && <div className='mx-auto mt-5 max-w-xl text-lg leading-relaxed text-suave text-pretty'>{lead}</div>}
		</header>
	)
}

export function Script({ children }: { children: React.ReactNode }) {
	return <span className='font-script font-bold tracking-normal whitespace-nowrap text-terracota'>{children}</span>
}
