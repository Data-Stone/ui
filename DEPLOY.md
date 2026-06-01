# Publicação do `@data-stone/ui`

Este repositório tem **dois artefatos publicáveis**, com propósitos diferentes:

| Artefato | O que é | Como publica | Precisa de domínio/servidor? |
|----------|---------|--------------|------------------------------|
| **Pacote npm** | A biblioteca de componentes que outros frontends instalam | Tag `v*` → GitHub Actions → GitHub Packages | ❌ Não |
| **Storybook** | Site de documentação/visualização dos componentes | Docker Compose + Cloudflare Tunnel | ✅ Sim (domínio na Cloudflare + servidor) |

---

## Parte A — Publicar o pacote npm (GitHub Packages)

A biblioteca **não roda em servidor**: ela é instalada pelos projetos consumidores via
`pnpm add @data-stone/ui`. A publicação é automática pelo workflow `.github/workflows/publish.yml`.

### Como lançar uma versão

```bash
# 1. Suba a versão (atualiza package.json e cria a tag)
pnpm version patch       # ou minor / major

# 2. Envie commit + tag
git push && git push --tags
```

O push da tag `v*` dispara o Actions, que roda `type-check` e `pnpm publish` no
registro `https://npm.pkg.github.com` usando o `GITHUB_TOKEN` automático. **Sem
configuração extra de infraestrutura.**

### Como os projetos consomem

No `.npmrc` do projeto consumidor:

```
@data-stone:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

E no `nuxt.config.ts`:

```ts
export default defineNuxtConfig({ extends: ['@data-stone/ui'] })
```

---

## Parte B — Hospedar o Storybook (Docker + Cloudflare Tunnel)

Sobe o Storybook estático servido por Nginx (interno) e o expõe via **Cloudflare
Tunnel**. A Cloudflare cuida do HTTPS e do DNS; o servidor **não abre nenhuma
porta** — o `cloudflared` faz só conexão de saída.

### Pré-requisitos

- Servidor com **Docker** e **Docker Compose** instalados
- Um **domínio gerenciado na Cloudflare** (nameservers apontando pra ela)
- Um **tunnel** criado no Cloudflare Zero Trust

### Passo 1 — Criar o tunnel na Cloudflare

1. **Zero Trust → Networks → Tunnels → Create a tunnel** → tipo **Cloudflared**
2. Dê um nome (ex. `datastone-ui`) e **copie o token** (string `eyJ...`)
3. Em **Public Hostnames → Add a public hostname**:
   - **Subdomain / Domain**: ex. `ui` + `seudominio.com.br`
   - **Service**: tipo **HTTP**, URL **`storybook:80`**
     (é o nome do serviço no compose — o cloudflared o alcança pela rede interna)

> O `storybook:80` funciona porque os dois containers estão na mesma rede do
> compose. Não use `localhost` aqui.

### Passo 2 — Subir no servidor

```bash
# 1. Cole o token do tunnel
cp .env.prod.example .env.prod
#   edite .env.prod  →  TUNNEL_TOKEN=eyJ...

# 2. Suba (builda a imagem na primeira vez)
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# 3. Confirme que o tunnel conectou (deve aparecer "Registered tunnel connection")
docker compose -f docker-compose.prod.yml logs -f cloudflared
```

Pronto: `https://ui.seudominio.com.br` serve o Storybook, com TLS da Cloudflare.

### Atualizar (após mudanças nos componentes)

```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

> Só o serviço `storybook` é reconstruído; o `cloudflared` continua conectado.
