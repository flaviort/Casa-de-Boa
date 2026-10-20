import { describe, expect, it } from 'vitest'
import { articleJsonLd, breadcrumbJsonLd, itemListJsonLd, organizationJsonLd, pageMetadata, postMetadata, websiteJsonLd } from './seo'
import { PostSchema } from './posts/schema'
import { makePost } from './posts/__fixtures__/post'

// JSON-LD objects are untyped schema.org shapes; tests read nested fields freely
type Json = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any

const post = PostSchema.parse(makePost({
	seoTitle: 'Achados pra cozinha',
	products: [
		{ name: 'Chaleira', blurb: 'Ferve.', image: 'https://down-br.img.susercontent.com/file/a.jpg', url: 'https://s.shopee.com.br/A' },
		{ name: 'Coador', blurb: 'Coa.', image: 'https://down-br.img.susercontent.com/file/b.jpg', url: 'https://s.shopee.com.br/B' }
	]
}))

describe('organizationJsonLd', () => {
	it('ties the site to the brand names and the social profiles', () => {
		const org = organizationJsonLd() as Record<string, unknown>
		expect(org['@type']).toBe('Organization')
		expect(org.name).toBe('Casa de Boa')
		expect(org.alternateName).toEqual(expect.arrayContaining(['casadeboa', 'casadeboa.br']))
		expect(org.url).toBe('https://casadeboa.com.br')
		expect(org.sameAs).toEqual(expect.arrayContaining([
			'https://www.instagram.com/casadeboa.br/',
			'https://www.tiktok.com/@casadeboa.br',
			'https://www.facebook.com/casadeboa.br',
			'https://www.youtube.com/@casadeboa',
			'https://br.pinterest.com/casadeboa/'
		]))
	})
})

describe('websiteJsonLd', () => {
	it('carries the alternate names', () => {
		const site = websiteJsonLd() as Record<string, unknown>
		expect(site['@type']).toBe('WebSite')
		expect(site.alternateName).toEqual(expect.arrayContaining(['casadeboa', 'casadeboa.br']))
	})
})

describe('pageMetadata', () => {
	it('builds an absolute canonical and the default image', () => {
		const meta = pageMetadata({ title: 'Sobre', description: 'Quem somos.', path: '/sobre' })
		expect(meta.title).toBe('Sobre')
		expect(meta.alternates?.canonical).toBe('https://casadeboa.com.br/sobre')
		expect(JSON.stringify(meta.openGraph?.images)).toContain('/og.jpg')
	})

	it('links the RSS feed on every page', () => {
		const meta = pageMetadata({ description: 'x', path: '/sobre' })
		expect(JSON.stringify(meta.alternates?.types)).toContain('/feed.xml')
	})

	it('leaves the title to the layout default when none is given', () => {
		expect(pageMetadata({ description: 'x', path: '/' }).title).toBeUndefined()
	})
})

describe('postMetadata', () => {
	it('uses seoTitle, the post canonical and the cover as image', () => {
		const meta = postMetadata(post)
		expect(meta.title).toBe('Achados pra cozinha')
		expect(meta.description).toBe(post.excerpt)
		expect(meta.alternates?.canonical).toBe(`https://casadeboa.com.br/posts/${post.slug}`)
		expect((meta.openGraph as { type?: string }).type).toBe('article')
		expect(JSON.stringify(meta.openGraph?.images)).toContain(post.cover.url)
	})

	it('falls back to title without seoTitle', () => {
		expect(postMetadata({ ...post, seoTitle: undefined }).title).toBe(post.title)
	})
})

describe('articleJsonLd', () => {
	it('dates the article and names the publisher', () => {
		const article = articleJsonLd(post) as Json
		expect(article['@type']).toBe('BlogPosting')
		expect(article.datePublished).toBe(post.publishAt)
		expect(article.publisher.name).toBe('Casa de Boa')
		expect(article.image).toContain(post.cover.url)
	})
})

describe('itemListJsonLd', () => {
	it('lists each product in order', () => {
		const list = itemListJsonLd(post) as Json
		expect(list['@type']).toBe('ItemList')
		expect(list.itemListElement).toEqual([
			expect.objectContaining({ '@type': 'ListItem', position: 1, name: 'Chaleira', url: 'https://s.shopee.com.br/A' }),
			expect.objectContaining({ '@type': 'ListItem', position: 2, name: 'Coador', url: 'https://s.shopee.com.br/B' })
		])
	})
})

describe('breadcrumbJsonLd', () => {
	it('builds absolute item urls', () => {
		const crumbs = breadcrumbJsonLd([{ name: 'Início', path: '/' }, { name: 'Cozinha', path: '/categoria/cozinha' }]) as Json
		expect(crumbs.itemListElement[1]).toEqual({ '@type': 'ListItem', position: 2, name: 'Cozinha', item: 'https://casadeboa.com.br/categoria/cozinha' })
	})
})
