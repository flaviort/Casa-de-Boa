// libraries
import { z } from 'zod'

// utils
import { ROOMS } from '@/lib/rooms'

export { ROOMS } from '@/lib/rooms'
export type { Room } from '@/lib/rooms'

const text = (max?: number) => {
	const base = z.string().trim().min(1).refine(s => !s.includes('—'), 'sem travessão (—), use hífen')
	return max ? base.refine(s => s.length <= max, `até ${max} caracteres`) : base
}

const isShopee = (value: string) => {
	try {
		const { protocol, hostname } = new URL(value)
		return protocol === 'https:' && (hostname === 'shopee.com.br' || hostname.endsWith('.shopee.com.br'))
	} catch {
		return false
	}
}

const imageUrl = z.string().refine(s => s.startsWith('https://') || s.startsWith('/'), 'precisa ser https ou caminho local')

export const ProductSchema = z.object({
	name: text(80),
	blurb: text(200),
	image: imageUrl,
	url: z.string().refine(isShopee, 'link não é da Shopee')
})

export const PostSchema = z.object({
	slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug em kebab-case'),
	postId: z.string().min(1),
	publishAt: z.string().datetime({ offset: true }),
	title: text(70),
	seoTitle: text(60).optional(),
	excerpt: text(160),
	room: z.enum(ROOMS),
	cover: z.object({
		url: imageUrl,
		alt: text(200),
		width: z.number().int().positive(),
		height: z.number().int().positive()
	}),
	body: z.array(text()).min(1),
	products: z.array(ProductSchema).min(1).max(12),
	pinned: z.boolean().optional(),
	instagramUrl: z.string().url().optional()
})

export type Product = z.infer<typeof ProductSchema>
export type Post = z.infer<typeof PostSchema>
