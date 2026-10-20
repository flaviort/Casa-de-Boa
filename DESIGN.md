# Design da Casa de Boa

Referência: https://memoir.framer.website/ (medida em 20/10/2026 a 1440px). O layout segue o memoir; as cores são da Casa de Boa. Regras do dono marcadas com (dono).

## Regras fixas

- Nenhuma sombra, em lugar nenhum: sem `shadow-*`, `drop-shadow`, `box-shadow` ou `text-shadow` (dono). Separação entre superfícies vem da cor de fundo, não de sombra.
- Cantos pouco arredondados (dono): 8px (`rounded-lg`) em cards, itens de menu, campos, botões e o selo de filtro; 4px (`rounded`) em imagens dentro de cards. Só o selo do topo e a seta da sidebar são redondos (`rounded-full`).
- Mesma grade em todas as páginas (dono): todo conteúdo fica dentro do `Container` (`src/components/Container`), com no máximo 1128px de conteúdo, 36px de margem lateral no desktop e 16px no celular. Texto corrido de post pode usar uma coluna mais estreita (720px) centralizada dentro do mesmo `Container`, nunca outro container.
- `cursor: pointer` em todo botão, link com papel de botão, `select` e `label` de controle (dono). Está no CSS global.
- Movimento com GSAP; respeitar `prefers-reduced-motion`.

## Tipografia (igual ao memoir)

- Manrope para tudo. Pesos 500 e 600.
- Source Serif 4 itálico, peso 500, só para a palavra de destaque dos títulos (componente `Script`).
- Título principal: 64px, peso 500, entrelinha 1.1, espaçamento -0.06em (36px no celular). Destaque em serifa com -0.07em.
- Nome na sidebar 16px/600 (-0.04em); linha abaixo 12px/500 na cor `suave`.
- Rótulos de seção da sidebar ("Me encontre"): 10px, peso 500, caixa alta, espaçamento 0.13em, cor `suave`.
- Título de card 16px/600 (-0.04em, entrelinha 1.4); meta do card 12px/500 na cor `suave`.
- Texto corrido 18px, entrelinha 1.7.

## Cores

| Token | Uso |
|---|---|
| `papel` #F4F2F0 | fundo da página |
| `areia` #EDEAE7 | fundo da sidebar, selo do topo, campos sobre o fundo |
| `cartao` #FFFFFF | cards e campos na sidebar |
| `tinta` #1F1A17 | texto principal e a seta da sidebar |
| `suave` #6B625C | texto secundário (o memoir usa preto a 48%; aqui é sólido para passar no contraste AA) |
| `terracota` #96340A | botões e destaques da marca |
| `creme` #FFF6E3 | texto sobre terracota |
| `linha` #E2DDD8 | divisória curta na sidebar recolhida |

## Sidebar

- 256px aberta (o memoir usa 240px; aumentamos 16px para a seta não encostar na linha do slogan), 70px recolhida. Padding 24px em cima e 16px nos lados.
- Seta de recolher: círculo de 24px na cor `tinta`, com seta branca de 14px, centrado sobre a borda direita da sidebar, na altura do nome. Gira 180° quando recolhida.
- Recolhida: só a foto do perfil, os ícones do menu e das redes e o ícone do post fixado; os textos somem e o nome de cada item vira `title`/`aria-label`. A newsletter some.
- A escolha (aberta ou recolhida) fica no navegador da pessoa (`localStorage`) e é aplicada antes da primeira pintura, para não piscar.
- Itens de menu: 34px de altura, padding 8px 11px, canto 8px; o ativo tem fundo `cartao`. Recolhidos, os itens encolhem para 38px de largura (um quadrado em volta do ícone).
- Animação de abrir e recolher (300ms): o conteúdo da sidebar tem largura fixa de 256px e a borda da sidebar corta por cima. Nada muda de lugar e nada quebra linha durante a animação; textos só esmaecem (`opacity`) e os ícones ficam parados, já na posição em que caem centralizados na faixa de 70px (27px da borda). Nunca usar `hidden`, `sr-only` ou mudar alinhamento no estado recolhido, porque isso troca o layout no primeiro quadro e o ícone "pula".

## Página do post

- Topo em duas colunas no desktop: título, subtítulo e data à esquerda; a capa à direita, com no máximo 440px de largura, dentro de um card branco. No celular, empilha (texto em cima, capa embaixo).
- Abaixo do topo, texto, achados e newsletter numa coluna de 720px centralizada, dentro do mesmo `Container`.

## Cards de post

- Fundo `cartao`, canto 8px, padding 12px, sem borda e sem sombra.
- Capa 3:4 com canto 4px.
- Grade de 3 colunas no desktop, 2 no tablet e 1 no celular, com 16px entre os cards.

## Menu do celular

- Abre como uma folha vinda da direita (GSAP): o fundo escurece em 0,25s, a folha entra em 0,45s (`power3.out`) e os itens sobem em sequência (0,04s entre eles). Fecha com a animação inversa, mais rápida.
- Com `prefers-reduced-motion`, abre e fecha sem animação.
