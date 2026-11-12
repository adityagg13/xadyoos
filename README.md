<div align="center">

# X-ADYO OS — landing page

One playbook for every Windows 10 and 11 build. This repo is the marketing page for **X-ADYO OS**, a single AME Wizard playbook covering Windows 10 1809 to Windows 11 26H2.

[![Live](https://img.shields.io/badge/live-saas--landing.adityakumarjha5052.workers.dev-4f8dff?style=for-the-badge&logo=cloudflare&logoColor=white)](https://saas-landing.adityakumarjha5052.workers.dev)
[![Deploy](https://github.com/adityagg13/saas-landing/actions/workflows/deploy.yml/badge.svg)](https://github.com/adityagg13/saas-landing/actions/workflows/deploy.yml)
[![Release](https://img.shields.io/github/v/release/adityagg13/X-ADYO-OS?style=for-the-badge&color=4f8dff&label=playbook)](https://github.com/adityagg13/X-ADYO-OS/releases/latest)

</div>

**Live:** https://saas-landing.adityakumarjha5052.workers.dev

**Playbook:** https://github.com/adityagg13/X-ADYO-OS

---

## What the page says

- Hero with a playbook-run window: staged progress, build stats, report generated
- "Built for" strip: AME Wizard, Windows 10/11, PowerShell, Winget, GPL-3.0
- Feature bento: one playbook for every build, three presets, measured report, reversible by design
- How it works: grab the .apbx, pick a preset, apply and read the report
- Inside the pass: Debloat / Privacy / Performance panels with sample data
- Metrics, FAQ and a download CTA linking to GitHub Releases

All copy lives in `src/content.ts`. The mock UI in the hero is `src/components/DashboardMock.tsx`; the tabbed panels are in `src/sections/Showcase.tsx`.

> The page uses sample data in the mock panels (progress bars, before/after bars) so the layout can be seen without shipping claims. The build counts and run time are real (15 builds, 3 presets, ~12 minutes from `playbook.conf`).

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

- `src/content.ts` holds every string on the page — headlines, features, steps, FAQ, footer, and all links to the playbook repo.
- `src/App.tsx` is the section stack. Delete a line there to remove a section.
- `src/sections/*` are the sections themselves. `Showcase.tsx` and `Features.tsx` keep their own panel content next to the layout.
- `src/styles.css` holds the design tokens (colours, radii, fonts, keyframes). The palette is a deep navy with an electric-blue accent. Everything rounded is a squircle via `corner-shape`; true circles use `.round`. Bordered surfaces use the `depth` utility instead of a border: an inset edge plus a top highlight.
- `src/worker/index.ts` is the Cloudflare Worker. `/api/subscribe` (email capture) is kept for future use; the page currently links straight to GitHub Releases.
- `index.html` carries the title, description and Open Graph tags.

## Project structure

```
src/
  App.tsx             section stack
  content.ts          all copy on the page
  sections/           Nav, Hero, LogoCloud, Features, Steps, Showcase, Metrics, Faq, Cta, Footer
  components/         DashboardMock (hero window), Aurora, Button, Logo, Reveal, SectionHeading
  lib/                small helpers
  styles.css          design tokens + utilities
  worker/index.ts     Cloudflare Worker (/api/health, /api/subscribe)
scripts/
  dev.mjs, dev.cmd    dev server launcher
  postbuild.mjs       prunes dot-files, maps and dangling sourceMappingURL comments
public/               static files copied as-is
```

## Deploy

`.github/workflows/deploy.yml` builds the site and runs `wrangler deploy` on every push to `main` (or manually from the **Actions** tab). It ships the Worker in `src/worker` with the static assets from `dist/client` in front of it, so the page and `/api/*` both come from one deployment.

Add one repository secret once (**Settings → Secrets and variables → Actions → New repository secret**):

| Secret | Where to get it |
| :-- | :-- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → **My Profile → API Tokens → Create Token**. Use the **Edit Cloudflare Workers** template. |

The account ID is not a credential, so it lives in the workflow as `CF_ACCOUNT_ID`. If you fork this repo, change that constant. The deploy step prints the live URL at the end.

---

<div align="center">
  <sub>Marketing page for <a href="https://github.com/adityagg13/X-ADYO-OS">X-ADYO OS</a> · GPL-3.0</sub>
</div>
