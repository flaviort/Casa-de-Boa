# Site da Casa de Boa: design

Data: 20/10/2026. Dono: Flavio. Repositório do site: `flaviort/Casa-de-Boa` (esta pasta). Repositório da operação: `flaviort/affiliates` (pasta `_side-projects/affiliates`).

## Para que serve

A Casa de Boa é um perfil de achados da Shopee para a casa, publicado no Instagram (@casadeboa.br), no TikTok e no Facebook. Todo post leva link de afiliado da Shopee; o dinheiro vem da comissão. O foco do projeto inteiro é conversão: quanto menos passos entre a pessoa e o link da Shopee, melhor.

O site é o blog da marca. Cada post das redes vira um post no blog: a mesma capa, um texto curto escrito para leitura e a lista dos produtos com o link de afiliado de cada um. Ele existe por dois motivos:

1. **Busca.** Quem procura "Casa de Boa", "casadeboa" ou "casadeboa.br" no Google tem que cair no site em primeiro lugar. Depois disso, os posts pegam buscas como "achadinhos Shopee", "links Shopee", "promoções Shopee", "itens de casa", "decoração".
2. **Um lugar com todos os links.** Os links ficam a um clique, sem precisar comentar e esperar o direct. No futuro o site também vira a página de links da bio do TikTok (quando a conta tiver 1.000 seguidores).

## Metas, não-metas e anti-metas

Metas:
- Ficar em primeiro lugar no Google para o nome da marca, nas três grafias.
- Cada post do blog sai sozinho, na mesma hora do post nas redes, sem trabalho manual.
- Cada clique num produto leva à Shopee com o ID de afiliado e um sub-ID que identifica o blog.

Não-metas (fora deste projeto):
- Comentários (talvez no futuro).
- Conta, login, cadastro ou conteúdo trancado. O memoir tranca o fim do artigo atrás de uma conta gratuita ("Continue reading with a free account"); aqui tudo é aberto.
- Banco de dados ou CMS. Os posts ficam em JSON no repositório, como no site da Aether.
- Outros idiomas. Só português do Brasil.
- Disparo automático da newsletter. Este projeto só coleta os e-mails.

Anti-metas (seria fracasso mesmo funcionando):
- Link da Shopee sem o ID de afiliado `18390951288` (não paga comissão).
- Post do blog aparecendo antes do post das redes, ou um post das redes sem o post do blog.
- Site lento ou que pareça um template genérico de loja de ofertas.
- Texto com travessão (`—`). Vale para o site inteiro, igual à Aether.

## Decisões do dono

- **Stack:** Next.js (App Router) + Tailwind + GSAP + Resend. Seguir a Aether (`_sites/senz/aether`): Next 16, React 19, Tailwind 4, TypeScript estrito, `@gsap/react`, tabs, mesmo estilo de comentários.
- **Hospedagem:** Vercel, na conta pessoal do dono. Domínio `casadeboa.com.br` (comprado em 11/10/2026 no registro.br).
- **Layout:** o do memoir (https://memoir.framer.website/), descrito abaixo.
- **Dados:** JSON no repositório, sem Supabase.
- **Automação:** o post do blog entra na rotina de criação de posts do `affiliates` e chega ao site sem trabalho manual.
- **SEO:** prioridade, com o nome da marca em primeiro lugar.
- **Sem comentários e sem cadastro.** A newsletter fica.

## Layout (do memoir)

### Menu lateral (desktop)

Coluna fixa à esquerda, com cara de perfil de rede social, de cima para baixo:
- Foto do perfil (o ícone da casinha, `affiliates/brands/casadeboa/assets/perfil-instagram.png`), o nome "Casa de Boa" e uma linha embaixo ("Achados da Shopee pra casa").
- Navegação: Início, Sobre, Contato. A página atual fica destacada.
- Bloco "Me encontre": Instagram, TikTok, Facebook, cada um com o ícone da rede e uma seta de link externo.
- Bloco de post fixado (o memoir tem "Pinned"): a capa e o título de um post. **Minha decisão:** mostra o post mais recente, a não ser que um post esteja marcado como fixado no JSON.
- Bloco "Fique por dentro": campo de e-mail e botão de inscrição na newsletter.
- Sem o bloco "Account / Sign up" do memoir.

No celular, o menu lateral vira uma barra no topo com o nome e um botão que abre o menu. O jeito exato fica com quem construir.

### Início (`/`)

- Topo: um selo pequeno (no memoir, "From the desk of Skylar"), um título grande com uma palavra em itálico serifado, o campo de e-mail com o botão de inscrição e uma linha pequena embaixo ("Sem spam. Dá pra sair quando quiser."). O título é o `<h1>` da página e precisa ter "Casa de Boa".
- Abaixo: filtro por cômodo (o memoir tem um seletor "All") e a grade de posts em 3 colunas. Cada card: capa, título, cômodo e quantidade de produtos (no lugar do "4 min" do memoir).
- **Minha decisão:** sem a busca do memoir por enquanto. Com poucos posts, ela não ajuda; volta quando passar de uns 40.

### Post (`/posts/<slug>`)

- Topo como no memoir: botão Voltar, cômodo e quantidade de produtos, título, resumo, capa grande.
- Texto curto do post.
- Lista dos produtos: foto, nome, uma frase sobre o produto e o botão "Ver na Shopee". Link com `target="_blank"` e `rel="sponsored noopener"`.
- **Minha decisão:** sem preço no blog. Preço da Shopee muda todo dia e um preço velho na página gera reclamação.
- Uma linha avisando que os links são de afiliado ("A Casa de Boa ganha uma comissão se você comprar pelos links, sem custo extra pra você").
- Fim da página: o bloco de newsletter e "Leia também" com 3 posts.

### Sobre (`/sobre`) e Contato (`/contato`)

- Sobre: quem é a Casa de Boa, no tom do guia de voz (`affiliates/brands/casadeboa/voice.md`). Página boa para SEO de marca. Texto a escrever; enquanto não houver, marcar como provisório.
- Contato: formulário (nome, e-mail, mensagem) que manda um e-mail pelo Resend para o dono, como o `/api/resend` da Aether. E-mail de destino em variável de ambiente.

### Categorias (`/categoria/<comodo>`)

**Minha proposta, ainda não confirmada pelo dono:** uma página por cômodo (cozinha, quarto, lavanderia, banheiro, sala...) com os posts daquele cômodo, título e descrição próprios ("Achadinhos da Shopee para cozinha | Casa de Boa"). O filtro do Início leva para essas páginas. São páginas que crescem sozinhas a cada post e pegam buscas de cauda longa.

## Identidade visual

O layout é o do memoir. Cor, fontes e textura são da Casa de Boa: terracota da marca (a faixa das legendas dos Reels), tons quentes de casa aconchegante, como nas capas dos carrosséis. As capas e as fontes da marca estão em `affiliates/brands/casadeboa/`. O itálico serifado do título do memoir combina com a cursiva das capas ("minha cozinha agradece").

Movimento com GSAP: revelação suave dos cards e do título no Início, nada que atrase a primeira pintura (a Aether tirou o preloader pelo mesmo motivo). Respeitar `prefers-reduced-motion`.

## Os dados

Um arquivo por post em `content/posts/<slug>.json`. **Minha decisão:** um arquivo por post, e não um `posts.json` único como na Aether, porque os posts chegam por commit automático. Arquivos separados não dão conflito e o diff de cada post fica limpo.

Campos de cada post:

| Campo | O que é |
|---|---|
| `slug` | URL do post, gerada do título |
| `postId` | id do post no Supabase do `affiliates` (rastreio) |
| `publishAt` | data e hora ISO com fuso, igual ao `scheduled_at` do post nas redes |
| `title`, `excerpt` | título e resumo do blog (o resumo vira a meta description) |
| `seoTitle?` | título para o `<title>` quando for diferente |
| `room` | um valor de uma lista fechada: `cozinha`, `quarto`, `sala`, `banheiro`, `lavanderia`, `organizacao`, `especial` (datas comemorativas e mistura de cômodos). Um por post. Usado no filtro e nas categorias |
| `cover` | `{ url, alt, width, height }`; caminho local `/posts/<slug>.jpg` (arquivo em `public/posts`) |
| `body` | texto curto em parágrafos (Markdown simples ou lista de parágrafos; fica com quem construir) |
| `products[]` | `{ name, blurb, image, url }`; `url` é o link de afiliado com o sub-ID do blog |
| `pinned?` | fixa o post no menu lateral |
| `instagramUrl?` | link do post no Instagram, se houver |

O site valida os arquivos no build (com zod ou parecido) e o build falha se um link de produto não for da Shopee (`s.shopee.com.br` ou `shopee.com.br`).

**Minha decisão sobre o ID de afiliado:** os links vêm do `shopee link` do `affiliates`, que devolve o link curto (`https://s.shopee.com.br/...`) gerado pela API com as credenciais da conta. O ID `18390951288` vai dentro do link curto por construção e não aparece na URL, então o site não tem como conferir. A garantia fica no `blog export`, que só aceita links gerados pelo `shopee link`, nunca colados à mão.

**Minha decisão sobre a capa:** "a capa" é a capa do post nas redes, ou seja, o primeiro slide do carrossel, com o título e a cursiva já na imagem (o pôster JPG do slide 1 que o render sobe no R2, 1080x1440, 3:4). Por isso os cards e a capa do post usam proporção 3:4, e não a paisagem do memoir. No Reel, a capa é o pôster do quadro do gancho, e o blog mostra só a imagem parada, sem o vídeo. A imagem OG (1200x630) é gerada por post em `src/app/posts/[slug]/opengraph-image.tsx`: capa à esquerda, título à direita.

### Quando o post aparece

O site só mostra posts com `publishAt` no passado. As páginas se atualizam sozinhas a cada hora (ISR com `revalidate`), então um post commitado de manhã para as 21h aparece entre 21h e 22h, sem novo deploy. Página de post com data futura responde 404. Sitemap e feed seguem a mesma regra.

## SEO

- `metadata` em toda rota: título, descrição, canonical, OG e Twitter. Formato do título: `<Título> | Casa de Boa`. No Início: "Casa de Boa | Achados da Shopee pra casa".
- `<html lang="pt-BR">`, um `<h1>` por página.
- Dados estruturados (JSON-LD):
  - `Organization`: nome "Casa de Boa", `alternateName` ["casadeboa", "casadeboa.br"], logo, `sameAs` com os perfis do Instagram, TikTok e Facebook. É o que liga o site aos perfis e ajuda a aparecer o painel da marca.
  - `WebSite` com nome e `alternateName`.
  - `Article` (ou `BlogPosting`) em cada post, com a capa, as datas e o autor Casa de Boa.
  - `ItemList` com os produtos de cada post.
  - `BreadcrumbList` nos posts e nas categorias.
- `sitemap.xml` e `robots.txt` gerados (a Aether usa `next-sitemap`; o `app/sitemap.ts` do próprio Next também serve).
- Imagem OG de cada post: a capa.
- Depois do deploy: cadastrar o domínio no Google Search Console e enviar o sitemap. Isso é com o dono.

## Newsletter

Campo de e-mail no menu lateral, no topo do Início e no fim dos posts. Grava o contato numa Audience do Resend por uma rota de API. Mensagem de sucesso e de erro no próprio campo. Validar o e-mail no servidor e proteger a rota contra robôs (campo isca escondido, no mínimo). O texto de inscrição diz para que serve o e-mail (achados novos da semana), por causa da LGPD.

O envio da newsletter fica de fora. Quando houver lista, o dono manda pelos Broadcasts do Resend.

## A ligação com o `affiliates` (parte 2)

Hoje a rotina de criação (`affiliates/routines/criacao.md`) escolhe os produtos, o subagente Criador escreve o post, o Revisor revisa, o post vai para a Fila de posts no Notion, o dono aprova e o post é publicado nas três redes. Cada rede tem um registro próprio no banco (tabela `posts`, com `scheduled_at`).

O que entra:

1. **O Criador escreve a versão de blog** junto com a legenda: título, resumo, um texto curto e uma frase por produto, no guia de voz, mas para leitura (sem "Comenta PALAVRA", sem hashtags). Fica gravado no post (por exemplo, uma coluna `blog` em `posts`). O Revisor revisa e o card do Notion mostra, então o dono aprova tudo de uma vez.
2. **Links do blog:** um link de afiliado por produto, gerado pelo `shopee link` com os mesmos `subIds` que os links do Facebook usam, só trocando `facebook` por `blog` no último (por exemplo `cozinhablog` no lugar de `cozinhafacebook`, veja `_temp/posts/links-facebook.txt`). Assim o `shopee report` separa os cliques do blog dos das redes.
3. **Ferramenta nova `blog export { postId }`:** baixa a capa do R2 e commita em `public/posts/<slug>.jpg` junto com o JSON do post (capa servida pelo próprio site, produtos com os links do blog, `publishAt` igual ao `scheduled_at`) e faz o commit em `content/posts/<slug>.json` no repositório `Casa-de-Boa` pela API do GitHub, com um token só de escrita nesse repositório. Respeita `DRY_RUN`. Roda quando o dono aprova o post (no `notion queue-pull`).
4. **Um post do blog por post, não por rede.** Só o registro do Instagram gera o post do blog.
5. **Posts já publicados** (cozinha de 19/10, quarto de 20/10, Reel de cozinha de 20/10) entram no blog no lançamento, pela mesma ferramenta.

**Cron no worker (mudou na revisão de 20/10).** O ISR sozinho não basta: ele guarda o 404 de quem abriu o link de um post antes da hora e, passada a hora, ainda entrega a versão velha uma vez. O site tem a rota `POST /api/revalidate` (cabeçalho `Authorization: Bearer <REVALIDATE_SECRET>`), que limpa o cache do site inteiro. O worker `casadeboa-refs-bot` chama essa rota a cada 10 minutos por um cron, e assim o post do blog aparece no máximo 10 minutos depois do horário.

Essa parte mexe no outro repositório. Ela só começa quando o site estiver no ar e o formato do JSON estiver fechado.

## Ordem de construção

1. Site com posts de exemplo em JSON (marcados como provisórios), as quatro páginas, newsletter e contato.
2. Deploy na Vercel com o domínio, Search Console.
3. Parte 2 no `affiliates`, com a exportação dos posts que já existem.

## O que fica com quem construir

- Estrutura de pastas e componentes (seguindo a Aether onde fizer sentido).
- Se usa o scroll suave e a transição de página da Aether ou não. Lembrar que o scroll da Aether não rola a janela e exige `scroller` nos ScrollTriggers.
- Formato do `body` no JSON.
- Detalhes de espaçamento, tipografia e animação dentro da direção acima.
- Imagens: `next/image` com `remotePatterns` para o R2 (`*.r2.dev` e depois `media.casadeboa.com.br`) e para as fotos de produto da Shopee (`*.susercontent.com`).

## Pendências

- Links dos perfis do TikTok e do Facebook (o Instagram é @casadeboa.br).
- Texto da página Sobre.
- E-mail que recebe o contato.
- Se as páginas de categoria entram.
- Onde está o DNS do domínio (registro.br ou Cloudflare; o plano antigo era passar para a Cloudflare por causa do `media.casadeboa.com.br`).
