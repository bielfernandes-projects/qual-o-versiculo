# Qual o Versículo?

Buscador de versículos bíblicos da Bíblia Católica CNBB. Busca por palavras, livros, citações exatas ou referências. Inclui versículo do dia e compartilhamento.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| Linguagem | TypeScript (strict) |
| Estilização | Tailwind CSS v4 |
| Banco | PostgreSQL (Supabase) |
| Busca | Full-text search (websearch) + ILIKE fallback |
| Ícones | Lucide React |
| Fonte | Inter (next/font/google) |
| Analytics | Vercel Analytics |
| Deploy | Vercel |

## Estrutura

```
src/
├── actions/           # Server Actions (newsletter)
├── app/               # Rotas, layout, estilos globais
│   ├── api/seed       # Popula o banco com dados da CNBB
│   └── icon.svg       # Favicon (cruz)
├── components/        # 11 componentes React
├── data/              # Tipos (preparado para dados mock)
├── lib/               # Clientes Supabase + utilitários
│   └── supabase/      # server.ts / client.ts / admin.ts
└── types/             # Interfaces compartilhadas
```

## Componentes

| Componente | Servidor? | Função |
|---|---|---|
| `Header` | Sim | Título, cruz SVG, descrição |
| `SearchBar` | Não | Input com debounce, limpar/cancelar |
| `SearchSection` | Não | Orquestrador: busca, filtros, histórico, ajuda |
| `SearchResults` | Sim | Lista de resultados com share/copy |
| `DailyVerseFetcher` | Sim | Busca o versículo do dia (revalidate 24h) |
| `DailyVerseCard` | Não | Card do versículo do dia |
| `ShareButton` | Não | Web Share API + clipboard fallback |
| `CopyButton` | Não | Copia versículo formatado |
| `EmptyState` | Sim | Nenhum resultado encontrado |
| `AdPlaceholder` | Sim | Espaço para anúncio (gated por env var) |
| `NewsletterSignup` | Não | Formulário de email (não usado no momento) |

## Fluxo de busca

1. Usuário digita na `SearchBar` → debounce 300ms
2. `SearchSection` tenta `parseCitation()` — se for citação exata (`João 3:16`), busca com `.eq()`
3. Senão, tenta `textSearch("fts", query, { type: "websearch" })` no Supabase
4. Se vazio, fallback com `.ilike()` no conteúdo e título
5. Resultados renderizados em `SearchResults`
6. Cada resultado tem botões Copiar e Compartilhar

## Versículo do dia

`DailyVerseFetcher` (Server Component) calcula um offset baseado no dia do ano, faz fetch REST direto ao Supabase com `revalidate: 86400`. Fallback: Salmos 23:1.

## Estilos e design system

Cores definidas em `globals.css` via `@theme inline` (Tailwind v4), todas em OKLCH:

| Token | Valor | Uso |
|---|---|---|
| `brand-bg` | `oklch(1 0 0)` | Fundo do card |
| `brand-surface` | `oklch(0.97 0.008 260)` | Bordas, hover, fade do body |
| `brand-ink` | `oklch(0.12 0.02 260)` | Texto principal |
| `brand-muted` | `oklch(0.48 0.015 260)` | Texto secundário, placeholder |
| `brand-primary` | `oklch(0.55 0.14 260)` | Ações, destaque, badge |
| `brand-accent` | `oklch(0.72 0.14 80)` | Kicker do versículo do dia (ouro) |

Body com `radial-gradient` em azul, card centralizado com `max-w-lg md:max-w-2xl`.

## Variáveis de ambiente

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SEED_SECRET=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_ADS_ENABLED=     # opcional: mostra placeholders de anúncio
```

## Desenvolvimento

```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção
npm run start     # servidor de produção
npm run lint      # ESLint
```

## Seed do banco

```bash
curl "http://localhost:3000/api/seed?token=SEU_SEED_SECRET"
```

Popula 31.105 versículos da CNBB a partir do dataset público (thiagobodruk/bíblia). Insere em lotes de 500 com `fts` TSVECTOR para busca em português.

## Supabase

- Projeto: `hdxwrsutyxgvpbxryksu`
- Tabela `verses`: `id, book, chapter, verse_number, content, fts`
- Tabela `subscribers`: `id, email, created_at`

## Deploy

Deploy na Vercel com variáveis de ambiente configuradas no dashboard. Vercel Analytics coleta page views automaticamente.
