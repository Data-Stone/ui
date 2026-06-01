# @data-stone/ui

Design System da Data Stone — componentes Vue 3, composables e utilitarios compartilhados entre os frontends via Nuxt Layer.

## Stack

| Tecnologia | Versao |
|------------|--------|
| Vue | 3.5 |
| Nuxt | 4 |
| Nuxt UI | 4 |
| Tailwind CSS | 4 |
| TypeScript | 5.9 |
| Storybook | 8.4 |
| pnpm | 9 |

## Estrutura

```
ui/
├── components/       # 37 componentes Vue (prefixo Ds*)
├── composables/      # 7 composables reutilizaveis
├── utils/            # Formatadores, validadores e helpers
├── assets/css/       # Design tokens (cores, fontes, spacing)
├── stories/          # Storybook stories e docs
├── index.ts          # Barrel export principal
├── types.ts          # Tipos publicos
└── nuxt.config.ts    # Configuracao Nuxt Layer
```

## Instalacao

```bash
# .npmrc do projeto consumidor
@data-stone:registry=https://npm.pkg.github.com

# Instalar
pnpm add @data-stone/ui
```

### Como Nuxt Layer

No `nuxt.config.ts` do app consumidor:

```ts
export default defineNuxtConfig({
  extends: ['@data-stone/ui']
})
```

Isso auto-registra todos os componentes `Ds*`, composables e injeta os design tokens. Nenhum import manual e necessario.

### Import direto (sem Nuxt Layer)

```ts
import { DsDataTable, useFormErrors, formatCurrency } from '@data-stone/ui'
```

## Exports

O pacote expoe diferentes entry points:

| Path | Conteudo |
|------|----------|
| `@data-stone/ui` | Tudo (componentes, composables, utils, tipos) |
| `@data-stone/ui/components/*` | Componente especifico |
| `@data-stone/ui/composables` | Apenas composables |
| `@data-stone/ui/utils` | Apenas utilitarios |
| `@data-stone/ui/tokens.css` | Design tokens CSS |
| `@data-stone/ui/nuxt` | Config Nuxt Layer |

## Componentes (37)

### Fase 1 — Originais

| Componente | Descricao |
|------------|-----------|
| `DsAppShell` | Shell de aplicacao |
| `DsChannelList` | Lista de canais com status |
| `DsKpiCard` | Card de KPI com badge e trend |
| `DsKpiGrid` | Grid de multiplos KPIs |
| `DsTimeline` | Timeline de eventos |

### Fase 2 — Principais

| Componente | Descricao |
|------------|-----------|
| `DsEmptyState` | Estado vazio com icone e descricao |
| `DsConfirmModal` | Modal de confirmacao |
| `DsDateRangePicker` | Seletor de intervalo de datas |
| `DsDataTable` | Tabela com busca, ordenacao e paginacao server-side |
| `DsStepper` | Stepper/wizard |
| `DsPasswordInput` | Input de senha com toggle de visibilidade |
| `DsMetricCard` | Card de metrica |
| `DsDetailItem` | Item de detalhe (label + valor) |
| `DsInfoRow` | Linha de informacao |
| `DsCarousel` | Carrossel |

### Fase 3 — Secundarios

| Componente | Descricao |
|------------|-----------|
| `DsBaseTemplate` | Template base de pagina |
| `DsEditTemplate` | Template de edicao |
| `DsFilterBar` | Barra de filtros |
| `DsDialog` | Dialogo generico |
| `DsMenuButton` | Botao com menu dropdown |
| `DsCurrencyInput` | Input de moeda (BRL) |
| `DsNumberInput` | Input numerico |
| `DsResourceCard` | Card de recurso |
| `DsCookieBanner` | Banner de cookies |
| `DsFormStep` | Step de formulario |
| `DsEngagementScore` | Score de engajamento |
| `DsSkeletonRow` | Linha skeleton (loading) |

### Fase 4 — Novos

| Componente | Descricao |
|------------|-----------|
| `DsAvatar` | Avatar com imagem ou iniciais |
| `DsProgressTable` | Tabela com barra de progresso |
| `DsAutocomplete` | Autocomplete com sugestoes |
| `DsStatusFeedback` | Feedback de status (success/error/info) |
| `DsSecurityBadge` | Badge de seguranca |
| `DsSection` | Secao com titulo |
| `DsSectionBadge` | Badge dentro de secao |
| `DsCouponInput` | Input de cupom |
| `DsFormCollapsible` | Formulario collapsible |
| `DsRecaptcha` | Integracao reCAPTCHA |
| `DsAddressForm` | Formulario de endereco |

## Composables (7)

| Composable | Descricao |
|------------|-----------|
| `useScreenSize()` | Breakpoints responsivos reativos (mobile, tablet, desktop) |
| `useFeedbackToast()` | Wrapper para toasts de feedback |
| `useGenericTable<T>()` | Logica de tabela com paginacao server-side |
| `useFormErrors()` | Gerenciamento de erros de formulario da API |
| `useCrudEditMode()` | Alterna entre modo leitura e edicao |
| `useDelete<T>()` | Confirmacao e execucao de delecao |
| `useLocationData()` | Busca estados e cidades via API do IBGE |

## Utils

### Datas

`toISODate` · `formatDateBR` · `formatDateTimeBR` · `formatDateTimeSecondsBR` · `toBrasiliaTime` · `relativeDate`

### Tempo

`formatSecondsToTime` · `formatDuration` · `formatMillisToTime`

### Numeros

`cleanValue` · `formatCurrency` · `formatPercent` · `formatThousand` · `formatUnitPrice` · `formatCompact`

### CPF/CNPJ

`formatCPF` · `formatCNPJ` · `formatCPFCNPJ` · `unmaskCPFCNPJ` · `isValidCPF` · `isValidCNPJ` · `isValidCPFCNPJ`

### Validadores

`isValidEmail` · `isValidPhone` · `isValidCEP` · `formatCEP` · `formatPhone` · `isRequired` · `minLength` · `maxLength`

## Design Tokens

Os tokens ficam em `assets/css/tokens.css` e definem:

- **Cores primarias** — escala azul Data Stone (primary-50 a primary-950)
- **Fontes** — DM Sans (principal), Hubot Sans (alternativa), JetBrains Mono (codigo)
- **Tokens semanticos** — background, foreground, card, border, success, warning, danger
- **Sidebar** — tema navy (#14467b) com acentos ciano e amarelo
- **Dark mode** — suporte completo via classe `.dark`

## Desenvolvimento

```bash
# Instalar dependencias
pnpm install

# Storybook (porta 6006)
pnpm storybook

# Verificar tipos
pnpm type-check

# Lint
pnpm lint

# Build do Storybook
pnpm build-storybook
```

## Publicacao

A publicacao e feita automaticamente via GitHub Actions ao criar uma tag:

```bash
git tag v0.2.0
git push origin v0.2.0
```

O workflow executa `type-check` e publica no GitHub Packages (`@npm.pkg.github.com`).

### Versionamento (SemVer)

- **Patch** (0.1.0 → 0.1.1): bug fix, ajuste de token
- **Minor** (0.1.0 → 0.2.0): novo componente, composable ou util
- **Major** (0.x → 1.0.0): breaking change

## Apps consumidores

- `nexus-frontend`
- `billing-frontend`
- `billing-checkout`
