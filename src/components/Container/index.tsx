// libraries
import clsx from 'clsx'

// the one content grid for every page (DESIGN.md): 1128px of content, 36px side margin on desktop
export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={clsx('mx-auto w-full max-w-[1200px] px-4 sm:px-9', className)}>{children}</div>
}
