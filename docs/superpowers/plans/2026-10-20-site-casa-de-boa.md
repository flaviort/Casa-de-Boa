# Site da Casa de Boa (parte 1): plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir o blog da Casa de Boa (layout do memoir, identidade da marca, SEO forte no nome) lendo os posts de arquivos JSON no repositório, pronto para deploy na Vercel.

**Architecture:** Next.js App Router sem i18n. Os posts ficam em `content/posts/<slug>.json`, validados com zod numa camada `src/lib/posts`, e toda página filtra pela data (`publishAt <= agora`) com ISR de uma hora. SEO centralizado em `src/lib/seo.ts` (metadata + JSON-LD). Newsletter e contato por duas rotas de API com Resend.

**Tech Stack:** Next 16, React 19, TypeScript estrito, Tailwind 4, GSAP + `@gsap/react`, Resend, zod, Vitest.

**Spec:** `docs/superpowers/specs/2026-10-20-site-casa-de-boa-design.md`. Leia antes de começar. Referência de código: `/Users/flavioczuk/Downloads/_sites/senz/aether` (só leitura). Ativos da marca: `/Users/flavioczuk/Downloads/_sites/senz/_side-projects/affiliates/brands/casadeboa/` (só leitura).

## Global Constraints

- Todo texto visível em português do Brasil. `<html lang="pt-BR">`.
- Nunca usar travessão (`—`) nem emoji em código, comentário, copy ou commit. Hífen simples no lugar.
- Estilo da Aether: tabs (largura 4), comentários mínimos, cabeçalhos de import `// libraries`, `// components`, `// utils`, `// svg`. Alias `@/*` → `./src/*`. `reactStrictMode: false` (GSAP).
- Versões como na Aether: `next ^16.4.0`, `react`/`react-dom ^19.3.0`, `tailwindcss` e `@tailwindcss/postcss ^4.3.3`, `gsap ^3.15.0`, `@gsap/react ^2.1.2`, `resend ^6.32.1`, `clsx ^2.1.1`, `typescript ^5.9.3`, `eslint ^9.39.5` + `eslint-config-next ^16.4.0`. Mais `zod ^3` e `vitest` (última estável). npm, como a Aether.
- Domínio canônico: `https://casadeboa.com.br`. Marca: "Casa de Boa"; nomes alternativos `casadeboa` e `casadeboa.br`; linha: "Achados da Shopee pra casa".
- Cores da marca (de `affiliates/src/tools/render/capa-modelos.ts`): terracota `#96340A` (faixa da marca), laranja da logo `#F57A12`, creme `#FFF6E3`, ouro `#F2C76B`. Fundo do site em creme claro, texto quase preto quente, destaque em terracota.
- Fontes (via `next/font/google`): **Nunito** para texto e interface (a fonte dos slides) e **Dancing Script** para a palavra de destaque dos títulos (a cursiva das capas), no lugar do itálico serifado do memoir.
- Link de produto: `target="_blank"` e `rel="sponsored noopener"`. Sem preço em lugar nenhum.
- Variáveis de ambiente: `RESEND_API_KEY`, `RESEND_SEGMENT_ID` (ou o id de audience, conforme a API atual do Resend), `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. As rotas respondem 500 com mensagem genérica se faltar alguma; nunca quebram o build (diferente da Aether, que lança na carga do módulo).
- Comando de teste: `npm test` (`vitest run`). `npm run build` e `npm run lint` precisam passar ao fim de cada task.
- Branch `site`. Commits pequenos, mensagem em inglês no imperativo, terminando com a linha `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

- **Post com `publishAt` no futuro**: não aparece no Início, na categoria, no fixado, em "Leia também" nem no sitemap, e `/posts/<slug>` responde 404. Teste na Task 2 (`getVisiblePosts`) e na Task 3 (sitemap).
- **JSON de post com problema** (campo faltando, link que não é da Shopee, slug diferente do nome do arquivo, slug repetido, `room` fora da lista, travessão no texto): o build falha com uma mensagem que diz qual arquivo e qual campo. Testes na Task 2.
- **Newsletter recebendo lixo ou repetição**: e-mail inválido devolve 400 com mensagem em português; e-mail já inscrito conta como sucesso; campo isca preenchido devolve 200 sem chamar o Resend; Resend fora do ar devolve 502 e o formulário mostra o erro sem perder o que foi digitado. Testes na Task 4.
- **Cômodo sem nenhum post visível**: some do filtro e do sitemap, e `/categoria/<comodo>` responde 404 em vez de uma página vazia indexável. Teste na Task 2 (`getVisibleRooms`) e na Task 3.
- **Nenhum post visível** (site recém-lançado com posts só no futuro): o Início mostra um estado vazio com a newsletter, e o bloco de fixado some do menu lateral. Teste na Task 2 (`getPinnedPost` devolve `undefined`) e conferência no navegador na Task 6.

---

### Task 1: Base do projeto

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `.env.example`, `CLAUDE.md`
- Create: `src/app/layout.tsx` (provisório, só `<html>`/`<body>` com as fontes), `src/app/page.tsx` (provisório), `src/assets/css/global.css`
- Create: `src/lib/site.ts`
- Create: `src/app/icon.png` (de `perfil-instagram.png`), `public/img/perfil.png` (mesma imagem), `public/og.jpg` (de `capa-facebook.jpg`, recortada para 1200x630 com `sips` ou `sharp`)
- Test: `src/lib/site.test.ts`

**Interfaces:**
- Produces: `SITE` em `src/lib/site.ts`:
  ```ts
  export const SITE = {
  	name: 'Casa de Boa',
  	alternateNames: ['casadeboa', 'casadeboa.br'],
  	tagline: 'Achados da Shopee pra casa',
  	url: 'https://casadeboa.com.br',
  	locale: 'pt_BR',
  	socials: { instagram: 'https://www.instagram.com/casadeboa.br/', tiktok: '...', facebook: '...' },
  } as const
  export const ROOM_LABELS: Record<Room, string> // 'cozinha' -> 'Cozinha', 'organizacao' -> 'Organização', 'especial' -> 'Especiais'
  export function absoluteUrl(path: string): string // absoluteUrl('/sobre') === 'https://casadeboa.com.br/sobre'
  ```
  TikTok e Facebook ficam com URL provisória e um comentário `// PROVISORIO: link a confirmar com o dono`. `Room` vem da Task 2; nesta task declare `ROOM_LABELS` depois de criar o tipo lá, ou defina `ROOMS` aqui e reexporte na Task 2. Fica com quem implementar, desde que exista uma lista só.

- [ ] **Step 1:** Criar os arquivos de configuração copiando a Aether e tirando `next-intl`, `next-sitemap`, `ogl`, `swiper`, `react-hook-form`, AWS e `next-transition-router`. Manter `@svgr/webpack` e a regra do Turbopack para SVG. `images.remotePatterns`: `*.r2.dev`, `media.casadeboa.com.br`, `*.susercontent.com`. Scripts: `dev`, `build`, `start`, `lint`, `test`.
- [ ] **Step 2:** `global.css` com `@import "tailwindcss"` e um `@theme` com os tokens de cor (`--color-creme`, `--color-terracota`, `--color-laranja`, `--color-ouro`, `--color-tinta`, `--color-linha`) e as duas fontes (`--font-sans`, `--font-script`).
- [ ] **Step 3:** Escrever `site.test.ts`: `absoluteUrl('/')` é `'https://casadeboa.com.br/'`, `absoluteUrl('/posts/x')` é `'https://casadeboa.com.br/posts/x'`, e todo `ROOMS` tem rótulo em `ROOM_LABELS`.
- [ ] **Step 4:** `npm install && npm test`. Esperado: falha (`site.ts` ainda sem as funções) e depois passa quando implementar.
- [ ] **Step 5:** `CLAUDE.md` curto do projeto: idioma, regra do travessão, onde ficam os posts e o formato (aponta para o spec), que o `affiliates` faz commit em `content/posts/`, comandos.
- [ ] **Step 6:** `npm run build && npm run lint`. Esperado: sem erros.
- [ ] **Step 7:** Commit `Set up the Next.js project`.

### Task 2: Posts em JSON

**Files:**
- Create: `src/lib/posts/schema.ts`, `src/lib/posts/load.ts`, `src/lib/posts/index.ts`
- Create: `content/posts/` com 4 posts de exemplo (ver Step 6)
- Test: `src/lib/posts/load.test.ts`, `src/lib/posts/index.test.ts`, fixtures em `src/lib/posts/__fixtures__/`

**Interfaces:**
- Produces:
  ```ts
  export const ROOMS = ['cozinha', 'quarto', 'sala', 'banheiro', 'lavanderia', 'organizacao', 'especial'] as const
  export type Room = typeof ROOMS[number]
  export type Product = { name: string; blurb: string; image: string; url: string }
  export type Post = {
  	slug: string; postId: string; publishAt: string; title: string; seoTitle?: string; excerpt: string
  	room: Room; cover: { url: string; alt: string; width: number; height: number }
  	body: string[]; products: Product[]; pinned?: boolean; instagramUrl?: string
  }
  export function loadAllPosts(dir?: string): Post[]                // default: <cwd>/content/posts; ordem publishAt decrescente
  export function getVisiblePosts(now?: Date): Post[]
  export function getVisiblePost(slug: string, now?: Date): Post | undefined
  export function getPostsByRoom(room: Room, now?: Date): Post[]
  export function getVisibleRooms(now?: Date): Room[]                // só cômodos com post visível, na ordem de ROOMS
  export function getPinnedPost(now?: Date): Post | undefined       // o visível com pinned; senão o mais recente; senão undefined
  export function getRelatedPosts(post: Post, count?: number, now?: Date): Post[] // mesmo cômodo primeiro, completa com os mais recentes, nunca o próprio; count padrão 3
  ```
  `body` é uma lista de parágrafos de texto puro (decisão deste plano, fecha o ponto que o spec deixou aberto).

**Regras de validação (zod):** `slug` em kebab-case e igual ao nome do arquivo; slugs únicos; `publishAt` ISO com fuso; `title` até 70 caracteres; `excerpt` até 160; `seoTitle` até 60; `products` de 1 a 12; `products[].url` com host `s.shopee.com.br` ou terminando em `shopee.com.br`; `cover.url` https ou começando com `/`; nenhum campo de texto com `—`. Erro lançado: `Error` cuja mensagem começa com o nome do arquivo e cita o caminho do campo (por exemplo `cozinha-x.json: products.0.url: link não é da Shopee`).

- [ ] **Step 1:** Escrever `load.test.ts` com fixtures: um arquivo válido carrega; cada regra acima tem um caso que lança, e o teste confere que a mensagem contém o nome do arquivo e o campo; dois arquivos com o mesmo slug lançam; a ordem de saída é por `publishAt` decrescente.
- [ ] **Step 2:** Escrever `index.test.ts` com `now` fixo e posts de fixture no passado e no futuro: `getVisiblePosts` exclui o futuro; `getVisiblePost` do futuro é `undefined`; `getVisibleRooms` não lista cômodo que só tem post futuro; `getPinnedPost` prefere o `pinned`, cai para o mais recente e devolve `undefined` sem posts visíveis; `getRelatedPosts` nunca devolve o próprio post, nunca um futuro, e respeita `count`.
- [ ] **Step 3:** `npm test`. Esperado: falha (módulos não existem).
- [ ] **Step 4:** Implementar `schema.ts`, `load.ts` (lê com `fs` no servidor, memoiza por diretório) e `index.ts` (as funções recebem o diretório por um parâmetro interno ou variável para os testes usarem as fixtures; fica com quem implementar).
- [ ] **Step 5:** `npm test`. Esperado: tudo passa.
- [ ] **Step 6:** Criar 4 posts de exemplo em `content/posts/`, com `[PROVISÓRIO]` no começo do título: cozinha, quarto, organização e um com `publishAt` em 2030 (para conferir que não aparece). Capas: copiar os PNG de `affiliates/brands/casadeboa/assets/capas/` para `public/provisorio/` e converter para JPG. Links: `https://s.shopee.com.br/PROVISORIO1` e assim por diante. Imagens de produto: as mesmas capas servem. Texto no tom do guia de voz.
- [ ] **Step 7:** `npm run build`. Esperado: passa. Estragar um link de propósito, rodar de novo, ver o build falhar com o nome do arquivo, desfazer.
- [ ] **Step 8:** Commit `Load blog posts from JSON files`.

### Task 3: SEO, sitemap e robots

**Files:**
- Create: `src/lib/seo.ts`, `src/components/JsonLd/index.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Test: `src/lib/seo.test.ts`, `src/app/sitemap.test.ts`

**Interfaces:**
- Consumes: `SITE`, `absoluteUrl`, `ROOM_LABELS` (Task 1); `Post`, `getVisiblePosts`, `getVisibleRooms` (Task 2).
- Produces:
  ```ts
  export function pageMetadata(opts: { title?: string; description: string; path: string; image?: { url: string; width: number; height: number; alt: string }; type?: 'website' | 'article'; publishedTime?: string }): Metadata
  export function postMetadata(post: Post): Metadata
  export function organizationJsonLd(): object
  export function websiteJsonLd(): object
  export function articleJsonLd(post: Post): object      // BlogPosting
  export function itemListJsonLd(post: Post): object
  export function breadcrumbJsonLd(items: { name: string; path: string }[]): object
  export function JsonLd({ data }: { data: object | object[] }): JSX.Element // <script type="application/ld+json">
  ```
  `pageMetadata` sem `title` usa o título padrão do Início. Com `title`, o `<title>` vira `<title> | Casa de Boa` pelo `template` do layout. Canonical sempre absoluto. Imagem padrão: `/og.jpg`. A imagem OG do post é a própria capa (decisão deste plano).

- [ ] **Step 1:** Escrever `seo.test.ts`: `organizationJsonLd()` tem `@type: 'Organization'`, `name: 'Casa de Boa'`, `alternateName` com `casadeboa` e `casadeboa.br`, `url: 'https://casadeboa.com.br'` e `sameAs` com as três redes; `websiteJsonLd()` tem `alternateName`; `postMetadata(post)` usa `seoTitle` quando existe, canonical `https://casadeboa.com.br/posts/<slug>`, `openGraph.type` `article` e a capa como imagem; `itemListJsonLd` tem um `ListItem` por produto com `position` a partir de 1 e a `url` do produto; `articleJsonLd` tem `datePublished` igual a `publishAt` e `publisher` igual à organização.
- [ ] **Step 2:** Escrever `sitemap.test.ts` com posts de fixture: o sitemap tem `/`, `/sobre`, `/contato`, uma entrada por post visível e uma por cômodo visível; não tem post futuro nem cômodo sem post visível; todo `url` é absoluto.
- [ ] **Step 3:** `npm test`. Esperado: falha.
- [ ] **Step 4:** Implementar. `sitemap.ts` e `robots.ts` com `export const revalidate = 3600`. `robots.ts` libera tudo, bloqueia `/api/` e aponta para `https://casadeboa.com.br/sitemap.xml`.
- [ ] **Step 5:** `npm test` passa; `npm run build`; abrir `/sitemap.xml` e `/robots.txt` no `npm run start` e conferir.
- [ ] **Step 6:** Commit `Add SEO helpers, sitemap and robots`.

### Task 4: Rotas de newsletter e contato

**Files:**
- Create: `src/lib/forms.ts`, `src/app/api/newsletter/route.ts`, `src/app/api/contact/route.ts`
- Test: `src/lib/forms.test.ts`, `src/app/api/newsletter/route.test.ts`, `src/app/api/contact/route.test.ts`

**Interfaces:**
- Produces:
  - `POST /api/newsletter` com JSON `{ email, website }` (`website` é o campo isca). Respostas: `200 { ok: true }`; `400 { ok: false, error: 'Confere o e-mail? Parece que tem algo errado.' }`; `502 { ok: false, error: 'Não deu certo agora. Tenta de novo daqui a pouco?' }`; `500` com a mesma mensagem do 502 quando falta variável de ambiente.
  - `POST /api/contact` com JSON `{ name, email, message, website }`. Mesmas regras; `name` de 2 a 80 caracteres, `message` de 10 a 4000. Envia um e-mail para `CONTACT_TO_EMAIL` com `replyTo` igual ao e-mail de quem escreveu.
  - `src/lib/forms.ts`: `newsletterSchema`, `contactSchema` (zod) e `isBot(body: unknown): boolean` (verdadeiro quando `website` vem preenchido).

Antes de implementar, consultar a documentação atual do SDK `resend` (skill `find-docs`) para a chamada certa de criar contato (audiences ou segments) e como ela sinaliza contato já existente.

- [ ] **Step 1:** Escrever os testes com o módulo `resend` mockado (`vi.mock('resend')`): e-mail inválido dá 400 e não chama o Resend; campo isca preenchido dá 200 e não chama o Resend; e-mail já inscrito dá 200; Resend lançando ou devolvendo erro dá 502; sem `RESEND_API_KEY` dá 500; o contato envia para `CONTACT_TO_EMAIL` com `replyTo` certo; o e-mail é normalizado (minúsculas, sem espaços) antes de enviar.
- [ ] **Step 2:** `npm test`. Esperado: falha.
- [ ] **Step 3:** Implementar as rotas. O cliente do Resend é criado dentro do handler, não na carga do módulo.
- [ ] **Step 4:** `npm test`. Esperado: passa.
- [ ] **Step 5:** `.env.example` com as quatro variáveis.
- [ ] **Step 6:** Commit `Add newsletter and contact API routes`.

### Task 5: Moldura do site (menu lateral, menu do celular, newsletter)

**Files:**
- Create: `src/components/Sidebar/index.tsx`, `src/components/MobileNav/index.tsx`, `src/components/NewsletterForm/index.tsx`, `src/components/PinnedPost/index.tsx`, `src/components/SocialLinks/index.tsx`, `src/assets/svg/social/{instagram,tiktok,facebook}.svg`, `src/assets/svg/ux/arrow-diagonal.svg`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `SITE` (Task 1), `getPinnedPost` (Task 2), `organizationJsonLd`, `websiteJsonLd`, `JsonLd` (Task 3), `POST /api/newsletter` (Task 4).
- Produces: `<NewsletterForm variant="sidebar" | "hero" | "inline" />` (client component; estados `idle`, `sending`, `done`, `error`; mantém o e-mail digitado no erro; campo isca `website` escondido de leitor de tela e de teclado; texto de consentimento: "Uma vez por semana, os achados novos. Sem spam, dá pra sair quando quiser.").

Layout do memoir (ver spec, "Menu lateral"): coluna fixa à esquerda com foto, nome, linha, navegação (Início, Sobre, Contato, com o atual destacado via `usePathname`), "Me encontre" com as três redes e a seta, post fixado (some se `getPinnedPost()` for `undefined`), "Fique por dentro" com o formulário. Sem bloco de conta. Abaixo de `lg`, o menu lateral some e entra a `MobileNav`: barra no topo com foto e nome e um botão que abre o mesmo conteúdo numa folha; fecha com Escape, com o botão e ao navegar; trava o scroll do corpo enquanto aberta; foco vai para dentro ao abrir e volta ao botão ao fechar.

O `layout.tsx` monta `metadata` padrão (`metadataBase`, `title.template: '%s | Casa de Boa'`, `title.default: 'Casa de Boa | Achados da Shopee pra casa'`), as fontes, a moldura e o JSON-LD de `Organization` e `WebSite`. `export const revalidate = 3600`.

- [ ] **Step 1:** Implementar os componentes e o layout.
- [ ] **Step 2:** `npm run dev` e conferir no navegador em 1440x900 e 375x812: moldura igual à do memoir (screenshot de referência em https://memoir.framer.website/), navegação destacando a página atual, menu do celular abrindo e fechando por teclado, newsletter mostrando sucesso e erro (testar o erro sem `RESEND_API_KEY`).
- [ ] **Step 3:** `npm run build && npm run lint && npm test`.
- [ ] **Step 4:** Commit `Add the sidebar, mobile menu and newsletter form`.

### Task 6: Início e páginas de cômodo

**Files:**
- Create: `src/components/PostCard/index.tsx`, `src/components/PostGrid/index.tsx`, `src/components/RoomFilter/index.tsx`, `src/components/Reveal/index.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/categoria/[room]/page.tsx`

**Interfaces:**
- Consumes: `getVisiblePosts`, `getPostsByRoom`, `getVisibleRooms`, `ROOMS` (Task 2); `pageMetadata`, `breadcrumbJsonLd`, `JsonLd` (Task 3); `NewsletterForm` (Task 5).
- Produces: `<PostCard post={Post} priority?: boolean />` (capa 3:4 com `next/image`, título, rótulo do cômodo e "N achados"; o card inteiro é um link para `/posts/<slug>`), `<PostGrid posts={Post[]} />` (3 colunas no desktop, 2 no tablet, 1 no celular; estado vazio quando a lista vem vazia), `<Reveal>` (client; GSAP sobe e revela os filhos com stagger ao entrar na tela, usando `ScrollTrigger` na janela; com `prefers-reduced-motion` não anima; o conteúdo já é visível sem JS, a animação parte de `gsap.from`).

Início: selo pequeno ("Achados da Shopee pra casa"), `<h1>` "Casa de Boa: a casa <script>de boa</script>, sem gastar muito" (o trecho em `Dancing Script`; o texto final do título pode ser ajustado, mas precisa ter "Casa de Boa" no `<h1>`), a newsletter `hero`, o `RoomFilter` (links "Todos" + um por cômodo visível, levando a `/categoria/<room>`) e a grade. A primeira linha de cards usa `priority` na imagem.

Página de cômodo: `generateStaticParams` com `getVisibleRooms()`, `dynamicParams = true`, `revalidate = 3600`, `notFound()` quando o cômodo não está em `ROOMS` ou não tem post visível. Título `Achadinhos da Shopee para <cômodo> | Casa de Boa` (para `especial`: `Achados especiais da Shopee`). `<h1>` com o nome do cômodo, filtro com o atual marcado, grade, breadcrumb (Início > Cômodo) em JSON-LD.

- [ ] **Step 1:** Implementar.
- [ ] **Step 2:** No navegador: o post de 2030 não aparece; `/categoria/banheiro` (sem posts) dá 404; `/categoria/cozinha` lista só cozinha; com `prefers-reduced-motion` emulado no DevTools os cards aparecem sem animação; desligar o JS e ver que os cards continuam visíveis.
- [ ] **Step 3:** Esvaziar `content/posts` temporariamente (ou pôr todos no futuro) e conferir o estado vazio do Início e o menu lateral sem fixado. Desfazer.
- [ ] **Step 4:** `npm run build && npm run lint && npm test`.
- [ ] **Step 5:** Commit `Add the home feed and room pages`.

### Task 7: Página do post

**Files:**
- Create: `src/app/posts/[slug]/page.tsx`, `src/components/ProductList/index.tsx`, `src/components/AffiliateNote/index.tsx`

**Interfaces:**
- Consumes: `getVisiblePost`, `getVisiblePosts`, `getRelatedPosts`, `ROOM_LABELS` (Tasks 1-2); `postMetadata`, `articleJsonLd`, `itemListJsonLd`, `breadcrumbJsonLd`, `JsonLd` (Task 3); `PostGrid` (Task 6); `NewsletterForm` (Task 5).
- Produces: `<ProductList products={Product[]} />` (foto, nome, frase, botão "Ver na Shopee" com `target="_blank" rel="sponsored noopener"` e `aria-label` "Ver <nome> na Shopee (abre em nova aba)").

`generateStaticParams` com os slugs visíveis, `dynamicParams = true`, `revalidate = 3600`, `notFound()` se `getVisiblePost` devolver `undefined`. Estrutura do spec ("Post"): Voltar (link para `/`), cômodo (link para a categoria) e "N achados", `<h1>` com o título, resumo, capa grande com `priority`, parágrafos do `body`, `ProductList`, `AffiliateNote` com o texto "A Casa de Boa ganha uma comissão se você comprar pelos links, sem custo extra pra você.", newsletter `inline`, "Leia também" com `getRelatedPosts(post)`. Data de publicação visível no formato `20 de outubro de 2026` no fuso `America/Sao_Paulo` dentro de `<time dateTime>`. Se houver `instagramUrl`, um link "Ver no Instagram". JSON-LD: `BlogPosting`, `ItemList` e breadcrumb (Início > Cômodo > Post).

- [ ] **Step 1:** Implementar.
- [ ] **Step 2:** No navegador: um post de exemplo abre com tudo na ordem; os links de produto abrem em nova aba; `/posts/<slug-do-post-de-2030>` e `/posts/nao-existe` dão 404; o HTML tem um `<h1>` só e os três blocos de JSON-LD.
- [ ] **Step 3:** Validar o JSON-LD de um post no validador do schema.org (https://validator.schema.org/) colando o HTML renderizado. Esperado: sem erros.
- [ ] **Step 4:** `npm run build && npm run lint && npm test`.
- [ ] **Step 5:** Commit `Add the post page`.

### Task 8: Sobre, Contato e 404

**Files:**
- Create: `src/app/sobre/page.tsx`, `src/app/contato/page.tsx`, `src/app/contato/ContactForm.tsx`, `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `pageMetadata`, `breadcrumbJsonLd`, `JsonLd` (Task 3); `POST /api/contact` (Task 4); `PostGrid`, `getVisiblePosts` (Tasks 2 e 6).

Sobre: `<h1>` "Sobre a Casa de Boa", texto no tom do guia de voz (`affiliates/brands/casadeboa/voice.md`) dizendo o que é o perfil, como os achados são escolhidos (campeões de vendas e bem avaliados) e que os links são de afiliado. O texto todo é provisório: começar a página com um aviso visível só em desenvolvimento ou marcar com `[PROVISÓRIO]` no primeiro parágrafo, e listar como pendência no fim. Links para as três redes.

Contato: `<h1>` "Fale com a Casa de Boa", formulário com nome, e-mail, mensagem e campo isca, com os mesmos estados da newsletter e rótulos visíveis em cada campo.

404: mensagem curta no tom da marca, link para o Início e os 3 posts mais recentes.

- [ ] **Step 1:** Implementar.
- [ ] **Step 2:** No navegador: enviar o contato sem as variáveis do Resend e ver o erro sem perder o texto; navegar por teclado no formulário; abrir uma URL inexistente e ver a 404 com os posts.
- [ ] **Step 3:** `npm run build && npm run lint && npm test`.
- [ ] **Step 4:** Commit `Add the about, contact and not found pages`.

### Task 9: Revisão de acabamento e deploy de prévia

**Files:**
- Modify: o que a revisão apontar.

- [ ] **Step 1:** Rodar o skill `impeccable` (modo de crítica e polimento) sobre as páginas no navegador, comparando com o memoir, e corrigir o que for material: hierarquia, espaçamento, contraste (texto terracota sobre creme precisa passar AA), foco visível, alvos de toque de 44px no celular.
- [ ] **Step 2:** Lighthouse no `npm run start` (Início e um post, mobile). Esperado: SEO 100, Acessibilidade 95 ou mais, Performance 90 ou mais. Corrigir o que estiver abaixo.
- [ ] **Step 3:** Conferir que nenhum arquivo tem `—`: `grep -rn "—" src content CLAUDE.md` sem resultado.
- [ ] **Step 4:** Commit `Polish the layout and accessibility` (se houve mudança).
- [ ] **Step 5:** Criar o projeto na Vercel, na conta pessoal do dono, ligado ao repositório `flaviort/Casa-de-Boa`, e publicar uma prévia da branch `site`. Variáveis do Resend: pedir ao dono que cadastre na Vercel (não colar segredo no chat). O domínio `casadeboa.com.br` e a promoção para produção ficam com o dono, depois de revisar a prévia, porque dependem de onde está o DNS (pendência do spec).
- [ ] **Step 6:** Mandar o link da prévia ao dono com a lista do que ainda é provisório: posts de exemplo, texto do Sobre, links do TikTok e do Facebook, e-mail do contato, variáveis do Resend, domínio e, depois do domínio no ar, o cadastro no Google Search Console com o envio do sitemap.
