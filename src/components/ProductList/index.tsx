// libraries
import Image from 'next/image'

// components
import { ArrowUpRightIcon } from '@/components/Icons'

// utils
import type { Product } from '@/lib/posts'

export default function ProductList({ products }: { products: Product[] }) {
	return (
		<ol className='flex flex-col gap-3'>
			{products.map((product, index) => (
				<li key={product.url} className='flex gap-4 rounded-lg bg-cartao p-3 sm:items-center'>
					<div className='relative size-24 shrink-0 overflow-hidden rounded bg-areia sm:size-28'>
						<Image src={product.image} alt='' fill sizes='112px' className='object-cover' />
					</div>
					<div className='flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6'>
						<div className='min-w-0 flex-1'>
							<p className='text-xs font-semibold text-terracota'>{String(index + 1).padStart(2, '0')}</p>
							<h3 className='text-base leading-[1.4] font-semibold tracking-[-0.04em] text-tinta'>{product.name}</h3>
							<p className='mt-1 text-sm leading-relaxed font-medium text-suave'>{product.blurb}</p>
						</div>
						<a
							href={product.url}
							target='_blank'
							rel='sponsored noopener'
							aria-label={`Ver ${product.name} na Shopee (abre em nova aba)`}
							className='inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-terracota px-4 text-sm font-semibold tracking-[-0.02em] text-creme transition-colors hover:bg-tinta sm:self-center'
						>
							Ver na Shopee
							<ArrowUpRightIcon className='size-4' />
						</a>
					</div>
				</li>
			))}
		</ol>
	)
}
