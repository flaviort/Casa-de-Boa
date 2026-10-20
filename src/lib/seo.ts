// libraries
import type { Metadata } from 'next'

// utils
import { absoluteUrl, SITE } from '@/lib/site'
import type { Post } from '@/lib/posts/schema'

type Image = { url: string; width: number; height: number; alt: string }

const DEFAULT_IMAGE: Image = { url: '/og.jpg', width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` }

export function pageMetadata(opts: { title?: string; description: string; path: string; image?: Image; type?: 'website' | 'article'; publishedTime?: string }): Metadata {
	const image = opts.image ?? DEFAULT_IMAGE
	const url = absoluteUrl(opts.path)
	const images = [{ ...image, url: absoluteUrl(image.url) }]

	return {
		title: opts.title,
		description: opts.description,
		alternates: { canonical: url },
		openGraph: {
			type: opts.type ?? 'website',
			url,
			siteName: SITE.name,
			locale: SITE.locale,
			title: opts.title ?? `${SITE.name} | ${SITE.tagline}`,
			description: opts.description,
			images,
			...(opts.publishedTime && { publishedTime: opts.publishedTime })
		},
		twitter: { card: 'summary_large_image', images: images.map(i => i.url) }
	}
}

export function postMetadata(post: Post): Metadata {
	return pageMetadata({
		title: post.seoTitle ?? post.title,
		description: post.excerpt,
		path: `/posts/${post.slug}`,
		image: post.cover,
		type: 'article',
		publishedTime: post.publishAt
	})
}

export function organizationJsonLd(): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${SITE.url}/#organization`,
		name: SITE.name,
		alternateName: [...SITE.alternateNames],
		url: SITE.url,
		logo: absoluteUrl('/img/perfil.png'),
		sameAs: [...Object.values(SITE.socials), ...SITE.otherProfiles]
	}
}

export function websiteJsonLd(): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE.name,
		alternateName: [...SITE.alternateNames],
		url: SITE.url,
		inLanguage: 'pt-BR',
		publisher: { '@id': `${SITE.url}/#organization` }
	}
}

export function articleJsonLd(post: Post): object {
	const url = absoluteUrl(`/posts/${post.slug}`)
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.excerpt,
		image: [absoluteUrl(post.cover.url)],
		datePublished: post.publishAt,
		dateModified: post.publishAt,
		inLanguage: 'pt-BR',
		mainEntityOfPage: url,
		url,
		author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
		publisher: { '@type': 'Organization', '@id': `${SITE.url}/#organization`, name: SITE.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/img/perfil.png') } }
	}
}

export function itemListJsonLd(post: Post): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: post.title,
		itemListElement: post.products.map((product, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: product.name,
			url: product.url,
			image: absoluteUrl(product.image)
		}))
	}
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path)
		}))
	}
}
