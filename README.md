<div align="center">

# SaaS Landing

A dark, animated marketing page for a software product — Vite + React 19 in front, a Cloudflare Worker at the edge.

[![Live demo](https://img.shields.io/badge/live%20demo-saas--landing.adityakumarjha5052.workers.dev-7c3aed?style=for-the-badge&logo=cloudflare&logoColor=white)](https://saas-landing.adityakumarjha5052.workers.dev)
[![Deploy](https://github.com/adityagg13/saas-landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/adityagg13/saas-landing/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge)](LICENSE)

</div>

**Live:** https://saas-landing.adityakumarjha5052.workers.dev

---

## What's inside

- Hero with a live product mock and a logo cloud
- Feature bento, how-it-works, tabbed showcase, metrics
- Testimonials, pricing with a monthly/yearly toggle, FAQ
- Email capture that posts to the Worker, footer
- Every section is its own component; all copy lives in one file
- One deployment serves both the page and `/api/*`

## Stack

| Layer | Choice |
| :-- | :-- |
| UI | React 19 · TypeScript · Tailwind CSS 4 · motion · lucide-react |
| Build | Vite 8 · `@cloudflare/vite-plugin` |
| Edge | Cloudflare Worker (Hono) + static assets from `dist/client` |
| CI | GitHub Actions → `wrangler deploy` on every push to `main` |

## Run it

```sh
bun install
bun run dev      # http://localhost:5173 (Vite + the Worker in workerd)
bun run build    # dist/client (assets) + dist/saas_landing/index.js (Worker)
```

`bun run dev` goes through `scripts/dev.mjs`, which runs Vite on the Node runtime in `.tools/` and falls back to `node` on PATH when that is missing, so the server starts the same way on every machine. On a box with no Node on PATH at all, use `bun run dev:local` or `scripts\dev.cmd` — they locate `.tools\node-v*\node.exe` themselves. Extra arguments are forwarded (`scripts\dev.cmd --port 5174`).

Run the dev server with Node, not Bun: `@cloudflare/vite-plugin` asks workerd for its export types over a custom undici dispatcher that Bun bypasses, so Bun fails with `ECONNREFUSED http://localhost/`. `bun install` and `bun run build` are unaffected.

## Edit it

- `src/content.ts` holds every string, price and link. Start there.
- `src/sections/*` are the page sections. `src/App.tsx` stacks them; delete or reorder lines there to remove or move a section.
- `src/styles.css` holds the design tokens (colours, radii, fonts, keyframes). Everything rounded is a squircle via `corner-shape`; true circles use `.round`. Bordered surfaces use the `depth` utility instead of a border: an inset edge plus a top highlight. The element must be positioned; recolour the edge with `--depth-edge`.
- `src/worker/index.ts` is the Cloudflare Worker. `/api/subscribe` receives the email form; connect it to your provider or a D1 table.

## Project structure

```
src/
  App.tsx            section stack
  content.ts         all copy, prices and links
  sections/          one file per page section
  components/        shared UI pieces
  lib/               small helpers
  styles.css         design tokens + utilities
  worker/index.ts    Cloudflare Worker (/api/subscribe)
scripts/
  dev.mjs, dev.cmd   dev server launcher
  postbuild.mjs      prunes dot-files, maps and dangling sourceMappingURL comments
public/              static files copied as-is
```

## Deploy

`.github/workflows/deploy.yml` builds the site and runs `wrangler deploy` on every push to `main` (or manually from the **Actions** tab). It ships the Worker in `src/worker` with the static assets from `dist/client` in front of it, so the page and `/api/*` both come from one deployment.

Add one repository secret once (**Settings → Secrets and variables → Actions → New repository secret**):

| Secret | Where to get it |
| :-- | :-- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → **My Profile → API Tokens → Create Token**. Use the **Edit Cloudflare Workers** template. |

The account ID is not a credential, so it lives in the workflow as `CF_ACCOUNT_ID`. If you fork this repo, change that constant. The deploy step prints the live URL at the end — that is the URL to put in the repo's **Website** field.

---

<div align="center">
  <sub>Template by <a href="https://github.com/adityagg13">adityagg13</a> · fast is a feature</sub>
</div>
