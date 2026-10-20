/** @type {import('next').NextConfig} */

const nextConfig = {
	turbopack: {
		rules: {
			'*.svg': {
				condition: { not: { query: /[?&]url(?=&|$)/ } },
				loaders: [{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [{
								name: 'preset-default',
								params: {
									overrides: {
										removeViewBox: false
									}
								}
							}]
						}
					}
				}],
				as: '*.js'
			}
		}
	},
	reactStrictMode: false,
	outputFileTracingIncludes: {
		'/*': ['./content/posts/**/*.json', './src/assets/fonts/*.woff', './public/posts/**/*']
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '*.r2.dev' },
			{ protocol: 'https', hostname: 'media.casadeboa.com.br' },
			{ protocol: 'https', hostname: '*.susercontent.com' },
			{ protocol: 'https', hostname: 'cf.shopee.com.br' }
		],
		formats: ['image/avif', 'image/webp']
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'X-Frame-Options', value: 'SAMEORIGIN' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' }
				]
			}
		]
	}
}

export default nextConfig
