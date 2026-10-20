// internal notification for the contact form: light on purpose (no images, little color) so Gmail
// treats it as a personal message and not as a promotion

const escape = (value: string) => value
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;')
	.replace(/'/g, '&#39;')

const COLORS = { page: '#F4F2F0', card: '#FFFFFF', ink: '#1F1A17', soft: '#6B625C', line: '#EDEAE7', brand: '#96340A', cream: '#FFF6E3' }
const FONT = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`

export function contactEmail({ name, email, message }: { name: string; email: string; message: string }) {
	const oneLineName = name.replace(/\s+/g, ' ')
	const subject = `Contato pelo site: ${oneLineName}`
	const safe = { name: escape(oneLineName), email: escape(email), message: escape(message).replace(/\r?\n/g, '<br>') }
	const reply = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: seu contato com a Casa de Boa')}`

	const html = `<!doctype html>
<html lang="pt-BR">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(subject)}</title></head>
<body style="margin:0;padding:0;background:${COLORS.page};">
	<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.page};">
		<tr><td align="center" style="padding:32px 16px;">
			<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
				<tr><td style="padding:0 4px 16px;font-family:${FONT};font-size:15px;font-weight:700;letter-spacing:-0.3px;color:${COLORS.ink};">Casa de Boa</td></tr>
				<tr><td style="background:${COLORS.card};border-radius:8px;padding:28px;font-family:${FONT};color:${COLORS.ink};">
					<p style="margin:0 0 4px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.soft};">Nova mensagem pelo site</p>
					<p style="margin:0 0 20px;font-size:22px;line-height:1.25;font-weight:600;letter-spacing:-0.6px;">${safe.name} escreveu</p>
					<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.5;">
						<tr>
							<td style="padding:10px 0;border-top:1px solid ${COLORS.line};color:${COLORS.soft};width:72px;">Nome</td>
							<td style="padding:10px 0;border-top:1px solid ${COLORS.line};font-weight:600;">${safe.name}</td>
						</tr>
						<tr>
							<td style="padding:10px 0;border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};color:${COLORS.soft};">E-mail</td>
							<td style="padding:10px 0;border-top:1px solid ${COLORS.line};border-bottom:1px solid ${COLORS.line};"><a href="mailto:${safe.email}" style="color:${COLORS.brand};text-decoration:none;font-weight:600;">${safe.email}</a></td>
						</tr>
					</table>
					<p style="margin:24px 0 8px;font-size:12px;letter-spacing:1.2px;text-transform:uppercase;color:${COLORS.soft};">Mensagem</p>
					<div style="background:${COLORS.page};border-radius:8px;padding:16px 18px;font-size:15px;line-height:1.65;color:${COLORS.ink};">${safe.message}</div>
					<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;"><tr><td style="background:${COLORS.brand};border-radius:8px;">
						<a href="${escape(reply)}" style="display:inline-block;padding:12px 20px;font-family:${FONT};font-size:14px;font-weight:600;color:${COLORS.cream};text-decoration:none;">Responder para ${safe.name}</a>
					</td></tr></table>
				</td></tr>
				<tr><td style="padding:16px 4px 0;font-family:${FONT};font-size:12px;line-height:1.5;color:${COLORS.soft};">Enviado pelo formulário de contato de casadeboa.com.br. Responder este e-mail também vai direto para quem escreveu.</td></tr>
			</table>
		</td></tr>
	</table>
</body>
</html>`

	const text = `Nova mensagem pelo site da Casa de Boa\n\nNome: ${oneLineName}\nE-mail: ${email}\n\n${message}\n\nResponder este e-mail vai direto para quem escreveu.`

	return { subject, html, text }
}
