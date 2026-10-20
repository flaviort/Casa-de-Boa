// libraries
import type { MetadataRoute } from 'next'

// utils
import { absoluteUrl, isProduction } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
	if (!isProduction()) return { rules: { userAgent: '*', disallow: '/' } }

	return {
		rules: { userAgent: '*', allow: '/', disallow: '/api/' },
		sitemap: absoluteUrl('/sitemap.xml')
	}
}
