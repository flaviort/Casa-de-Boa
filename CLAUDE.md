# Casa de Boa: site

Blog da Casa de Boa (achados da Shopee pra casa) em `casadeboa.com.br`. Cada post das redes vira um post aqui: capa, texto curto e os produtos com link de afiliado.

Design: `docs/superpowers/specs/2026-10-20-site-casa-de-boa-design.md`. Plano: `docs/superpowers/plans/2026-10-20-site-casa-de-boa.md`.

## Regras

- Chat com o dono e todo texto do site em português do Brasil.
- Nunca usar travessão (`—`) nem emoji, em copy, código, comentário ou commit. Use hífen, vírgula ou dois-pontos.
- Estilo da Aether (`_sites/senz/aether`): tabs, aspas simples, comentários mínimos, cabeçalhos `// libraries`, `// components`, `// utils`, `// svg`.

## Onde estão as informações da marca

Antes de perguntar ao dono, procure aqui:

- Notion, página "Casa de Boa" (tabela "Redes sociais"): links de todos os perfis. Ativos: Instagram, TikTok e Facebook; reservados: Threads, YouTube, X, Pinterest, Kwai e Snapchat. Os links usados no site ficam em `src/lib/site.ts`.
- Repositório `affiliates` (`_sites/senz/_side-projects/affiliates`): `CLAUDE.md` (regras de afiliado, ID `18390951288`, sub-IDs), `docs/handoff/` (último estado), `brands/casadeboa/` (guia de voz, logo, capas).
- Banco do `affiliates` (Supabase, projeto `mbswjwimnnkgcrxqeveo`): posts, produtos (`shopee_item_id`, `shop_id`) e mídia no R2.
- Domínio `casadeboa.com.br` no registro.br; e-mail do Resend e da Vercel na conta Promo Senz (`promosenz@gmail.com`).

## Posts

- Um arquivo por post em `content/posts/<slug>.json`. Formato e validação em `src/lib/posts/schema.ts`; o build falha com o nome do arquivo se algo estiver errado.
- O repositório `affiliates` faz commit desses arquivos sozinho quando o dono aprova um post. Não edite à mão sem combinar.
- O post só aparece quando `publishAt` passa. As páginas se atualizam a cada hora (`revalidate = 3600`).
- Links de produto só da Shopee, gerados pelo `shopee link` do `affiliates` (o ID de afiliado vai dentro do link curto).

## Comandos

```bash
npm run dev
npm run build
npm run lint
npm test
```

Variáveis em `.env.example` (Resend). Sem elas o site funciona, só a newsletter e o contato respondem com erro.
