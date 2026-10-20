export default function PageHero({ eyebrow, children, lead }: { eyebrow: string; children: React.ReactNode; lead?: React.ReactNode }) {
	return (
		<header className='mx-auto max-w-3xl text-center'>
			<p className='inline-flex rounded-full bg-areia px-3 py-1 text-xs font-medium tracking-[-0.02em] text-tinta'>{eyebrow}</p>
			<h1 className='mt-6 text-[40px] leading-[1.1] font-medium tracking-[-0.06em] text-tinta text-balance sm:text-[64px]'>{children}</h1>
			{lead && <div className='mx-auto mt-5 max-w-xl text-base leading-relaxed font-medium tracking-[-0.02em] text-suave text-pretty'>{lead}</div>}
		</header>
	)
}

export function Script({ children }: { children: React.ReactNode }) {
	return <span className='font-serif tracking-[-0.07em] whitespace-nowrap italic'>{children}</span>
}
