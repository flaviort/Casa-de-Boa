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
				<li key={product.url} className='flex gap-4 rounded-2xl bg-cartao p-3 shadow-[0_1px_2px_rgba(42,30,23,0.06)] sm:items-center sm:p-4'>
					<div className='relative size-24 shrink-0 overflow-hidden rounded-xl bg-creme sm:size-28'>
						<Image src={product.image} alt='' fill sizes='112px' className='object-cover' />
					</div>
					<div className='flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6'>
						<div className='min-w-0 flex-1'>
							<p className='text-xs font-extrabold text-terracota'>{String(index + 1).padStart(2, '0')}</p>
							<h3 className='text-[17px] leading-snug font-extrabold text-tinta'>{product.name}</h3>
							<p className='mt-1 text-[15px] leading-relaxed text-suave'>{product.blurb}</p>
						</div>
						<a
							href={product.url}
							target='_blank'
							rel='sponsored noopener'
							aria-label={`Ver ${product.name} na Shopee (abre em nova aba)`}
							className='inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-terracota px-4 text-sm font-extrabold text-creme transition-colors hover:bg-tinta sm:self-center'
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
