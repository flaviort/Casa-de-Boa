// libraries
import fs from 'fs'
import path from 'path'

// utils
import { PostSchema, type Post } from './schema'

export function parsePost(file: string, raw: unknown): Post {
	let data = raw
	if (typeof raw === 'string') {
		try {
			data = JSON.parse(raw)
		} catch (error) {
			throw new Error(`${file}: JSON inválido (${(error as Error).message})`)
		}
	}

	const result = PostSchema.safeParse(data)
	if (!result.success) {
		const issues = result.error.issues.map(i => `${i.path.join('.') || '(raiz)'}: ${i.message}`).join('; ')
		throw new Error(`${file}: ${issues}`)
	}

	// slug = file name also guarantees unique slugs, since file names are unique
	if (`${result.data.slug}.json` !== file) {
		throw new Error(`${file}: slug "${result.data.slug}" diferente do nome do arquivo`)
	}

	return result.data
}

const cache = new Map<string, Post[]>()

export function loadAllPosts(dir = path.join(process.cwd(), 'content', 'posts')): Post[] {
	const cached = cache.get(dir)
	if (cached) return cached

	const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : []
	const posts = files
		.map(file => parsePost(file, fs.readFileSync(path.join(dir, file), 'utf8')))
		.sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt))

	cache.set(dir, posts)
	return posts
}
