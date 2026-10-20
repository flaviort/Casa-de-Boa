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
		'/*': ['./content/posts/**/*.json']
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '*.r2.dev' },
			{ protocol: 'https', hostname: 'media.casadeboa.com.br' },
			{ protocol: 'https', hostname: '*.susercontent.com' }
		],
		formats: ['image/avif', 'image/webp']
	}
}

export default nextConfig
