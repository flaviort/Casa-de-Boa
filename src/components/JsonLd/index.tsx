export default function JsonLd({ data }: { data: object | object[] }) {
	// escape < so a post text can never close the script tag
	const json = JSON.stringify(data).replace(/</g, '\\u003c')
	return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: json }} />
}
