// libraries
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { notFound } from 'next/navigation'

// utils
import { getVisiblePost, getVisiblePosts } from '@/lib/posts'
import { ROOM_LABELS } from '@/lib/rooms'

export const revalidate = 3600
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Casa de Boa'

const font = (file: string) => readFile(path.join(/* turbopackIgnore: true */ process.cwd(), 'src/assets/fonts', file))

// local covers (/posts/...) are read from public so new posts work before they are deployed
async function coverSrc(url: string) {
	if (!url.startsWith('/')) return url
	const data = await readFile(path.join(/* turbopackIgnore: true */ process.cwd(), 'public', url))
	return `data:image/jpeg;base64,${data.toString('base64')}`
}

export function generateStaticParams() {
	return getVisiblePosts().map(post => ({ slug: post.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const post = getVisiblePost((await params).slug)
	if (!post) notFound()

	const [manrope500, manrope600, serifItalic, cover] = await Promise.all([
		font('manrope-500.woff'),
		font('manrope-600.woff'),
		font('source-serif-4-500-italic.woff'),
		coverSrc(post.cover.url)
	])

	const titleSize = post.title.length > 52 ? 54 : 62

	return new ImageResponse(
		(
			<div style={{ display: 'flex', width: '100%', height: '100%', background: '#F4F2F0', fontFamily: 'Manrope' }}>
				<img src={cover} width={472} height={630} style={{ objectFit: 'cover' }} alt='' />
				<div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '56px 64px' }}>
					<div style={{ display: 'flex', alignItems: 'center', fontSize: 26, fontWeight: 600, letterSpacing: -1, color: '#1F1A17' }}>
						Casa de&nbsp;<span style={{ fontFamily: 'Source Serif', fontStyle: 'italic', fontWeight: 500 }}>Boa</span>
					</div>
					<div style={{ display: 'flex', marginTop: 'auto' }}>
						<div style={{ display: 'flex', background: '#EDEAE7', borderRadius: 8, padding: '8px 16px', fontSize: 22, fontWeight: 500, color: '#1F1A17' }}>
							{ROOM_LABELS[post.room]} · {post.products.length} achados
						</div>
					</div>
					<div style={{ display: 'flex', marginTop: 24, fontSize: titleSize, lineHeight: 1.08, fontWeight: 600, letterSpacing: -3, color: '#1F1A17' }}>
						{post.title}
					</div>
					<div style={{ display: 'flex', marginTop: 'auto', fontSize: 22, fontWeight: 500, color: '#96340A' }}>
						casadeboa.com.br
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: [
				{ name: 'Manrope', data: manrope500, weight: 500, style: 'normal' },
				{ name: 'Manrope', data: manrope600, weight: 600, style: 'normal' },
				{ name: 'Source Serif', data: serifItalic, weight: 500, style: 'italic' }
			]
		}
	)
}
