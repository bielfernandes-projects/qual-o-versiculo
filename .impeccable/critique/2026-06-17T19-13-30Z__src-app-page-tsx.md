---
target: src/app/page.tsx
total_score: 33
p0_count: 0
p1_count: 2
timestamp: 2026-06-17T19-13-30Z
slug: src-app-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 4 | Spinner, skeleton, debounce, contagem de resultados, feedback "Copiado!" |
| 2 | Match System / Real World | 4 | Vocabulário católico natural, português claro, formato de citação familiar |
| 3 | User Control and Freedom | 3 | Cancelar busca funcional, mas sem histórico de navegação nem "voltar" |
| 4 | Consistency and Standards | 4 | Tokens, radii, paddings, focus rings consistentes em toda a base |
| 5 | Error Prevention | 3 | Debounce + requestId previnem resultados obsoletos; sem validação de query mínima |
| 6 | Recognition Rather Than Recall | 3 | Placeholders ajudam, mas sem autocomplete de livros ou buscas recentes |
| 7 | Flexibility and Efficiency | 2 | Sem atalhos, sem refinar busca, sem paginação, sem compartilhar |
| 8 | Aesthetic and Minimalist Design | 4 | Limpo, espaçamento generoso, hierarquia clara, sem ruído |
| 9 | Error Recovery | 4 | Mensagens específicas por tipo de erro, retry, fallback do versículo |
| 10 | Help and Documentation | 2 | Sem ajuda in-app, FAQ, about page ou dicas de busca avançada |
| **Total** | | **33/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment**: Acima da média para apps desse porte. Nenhum gradient text, glassmorphism, side-stripe borders, hero-metrics ou numbered section markers. O "VERSÍCULO DO DIA" é um uppercase eyebrow, mas é o único uso — escolha deliberada, não template slop. A paleta OKLCH restrita e a evolução orgânica do design (BookOpen → cruz customizada) mostram decisões próprias.

**Deterministic scan**: Zero antipadrões encontrados. detect.mjs varreu a base e não reportou nenhum problema estrutural.

**Contraste**: Todas as combinações passam WCAG AA com folga. rand-muted sobre rand-bg tem 17:1, muito acima do mínimo 4,5:1.

## Overall Impression

App focado, coeso e bem construído para um buscador de versículos. O que falta não é conserto de erro — é expansão de valor. As maiores oportunidades estão em dar poder ao usuário (histórico, compartilhar, paginação) e em reduzir atrito na primeira visita (newsletter, onboarding).

## What's Working

1. **Coerência de design exemplar** — DESIGN.md descreve e o código segue. Raro.
2. **Estética contida e intencional** — respira espaço, foge de modinhas, parece pensado.
3. **Tratamento de erros robusto** — 4 tipos mapeados com mensagens humanas e retry.

## Priority Issues

- **[P1] SVG da cruz sem rótulo acessível** (header.tsx) — screen readers não identificam o ícone. Num app católico, a cruz é elemento significativo, não decorativo.
- **[P1] Zero histórico de buscas recentes** — usuários que consultam versículos diariamente precisam redigitar tudo. localStorage resolveria.
- **[P2] Newsletter na primeira visita** — CTA de email aparece antes do usuário experimentar valor. Viola o "Mínimo atrito" do PRODUCT.md. Sugestão: exibir só após primeira busca.
- **[P2] Sem compartilhar versículo** — o público católico compartilha versículos em grupos de família/igreja (WhatsApp). Ausência de um share button nativo é lacuna perceptível.
- **[P3] Zero ajuda ou documentação** — busca com FTS + citação + ILIKE fallback é poderosa, mas o usuário comum nunca saberá. Um micro FAQ ou "Como buscar?" minimalista.

## Persona Red Flags

**Casey (Mobile, consulta rápida)**:
- Anúncio no topo (se habilitado) força scroll antes de buscar
- Sem compartilhar versículo por WhatsApp/iMessage — ação esperada no mobile
- Sem lazy loading ou paginação — 30 resultados podem travar conexão lenta

**Alex (Power User, estudante/pesquisador)**:
- Máximo 30 resultados sem "carregar mais"
- Sem exportar ou copiar lote de versículos
- Sem sintaxe de busca avançada (AND/OR, excluir livro)
- Sem ordenação por livro/capítulo

**Jordan (Primeira visita)**:
- Onboarding zero — "O que eu faço aqui?" além do placeholder
- Sem indicação de que "João 3:16" funciona como busca estruturada
- Se o versículo do dia cair no fallback (Sl 23,1), não há aviso — pode achar que todo dia é o mesmo

## Minor Observations

- DESIGN.md ainda menciona BookOpen no header — defasado desde a troca pela cruz
- getDayOfYear com Date.UTC e Jan 0 pode ter off-by-one em timezones específicos
- O botão clear custom substitui o nativo ::-webkit-search-cancel-button — decisão consciente, mas perde padrão conhecido do navegador
- rand-accent dourado aparece só no versículo do dia — uso parcimonioso e efetivo

## Questions to Consider

1. **Newsletter timing**: Por que pedir email antes do usuário sentir valor? Já pensaram em mostrar o CTA só após a primeira busca?
2. **Estratégia de anúncios**: O placeholder sm/lg veio de pesquisa de usuário ou é posição default? Anúncio antes da busca num app mobile-first é arriscado.
3. **Compartilhamento**: Ausência de share button é minimalismo deliberado ou esquecimento?
4. **Dark mode**: PRODUCT.md diz "nada escuro", mas leitura bíblica noturna é caso de uso real. A decisão é teológica ou de escopo?
