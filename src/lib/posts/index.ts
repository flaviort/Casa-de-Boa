// utils
import { loadAllPosts } from './load'
import { ROOMS, type Post, type Room } from './schema'

export * from './schema'

const all = () => loadAllPosts(process.env.POSTS_DIR || undefined)

export function getVisiblePosts(now = new Date()): Post[] {
	return all().filter(post => Date.parse(post.publishAt) <= now.getTime())
}

export function getVisiblePost(slug: string, now = new Date()): Post | undefined {
	return getVisiblePosts(now).find(post => post.slug === slug)
}

export function getPostsByRoom(room: Room, now = new Date()): Post[] {
	return getVisiblePosts(now).filter(post => post.room === room)
}

export function getVisibleRooms(now = new Date()): Room[] {
	const rooms = new Set(getVisiblePosts(now).map(post => post.room))
	return ROOMS.filter(room => rooms.has(room))
}

export function getPinnedPost(now = new Date()): Post | undefined {
	const posts = getVisiblePosts(now)
	return posts.find(post => post.pinned) ?? posts[0]
}

export function getRelatedPosts(post: Post, count = 3, now = new Date()): Post[] {
	const others = getVisiblePosts(now).filter(p => p.slug !== post.slug)
	return [...others.filter(p => p.room === post.room), ...others.filter(p => p.room !== post.room)].slice(0, count)
}
