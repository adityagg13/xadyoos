# SaaS landing page

A dark, animated marketing page for a software product: hero with a live
product mock, logo cloud, feature bento, how it works, a tabbed showcase,
metrics, testimonials, pricing with a billing toggle, FAQ, email capture and
footer. Every section is its own component and all copy lives in one file.

## Run it

```sh
bun install
bun run dev        # http://localhost:5173 (Vite + the Worker in workerd)
bun run build      # dist/client (assets) + dist/saas_landing/index.js (Worker)
```

`bun run dev` goes through `scripts/dev.mjs`, which runs Vite on the Node
runtime in `.tools/` and falls back to `node` on PATH when that is missing, so
the server starts the same way on every machine. On a box with no Node on PATH
at all use `bun run dev:local` or `scripts\dev.cmd`: they locate
`.tools\node-v*\node.exe` themselves. Extra arguments are forwarded
(`scripts\dev.cmd --port 5174`).

Run the dev server with Node, not Bun: `@cloudflare/vite-plugin` asks workerd
for its export types over a custom undici dispatcher that Bun bypasses, so Bun
fails with `ECONNREFUSED http://localhost/`. `bun install` and `bun run build`
are unaffected.

## Edit it

- `src/content.ts` holds every string, price and link. Start there.
- `src/sections/*` are the page sections. `src/App.tsx` stacks them; delete or
  reorder lines there to remove or move a section.
- `src/styles.css` holds the design tokens (colours, radii, fonts, keyframes).
  Everything rounded is a squircle via `corner-shape`; true circles use `.round`.
  Bordered surfaces use the `depth` utility instead of a border: an inset edge
  plus a top highlight, the same treatment as the Freebuff desktop app. The
  element must be positioned; recolour the edge with `--depth-edge`.
- `src/worker/index.ts` is the Cloudflare Worker. `/api/subscribe` receives the
  email form; connect it to your provider or a D1 table.

## Deploy

`.github/workflows/deploy.yml` builds the site and runs `wrangler deploy` on
every push to `main` (or manually from the Actions tab). It ships the Worker in
`src/worker` with the static assets from `dist/client` in front of it, so the
page and `/api/*` both come from one deployment.

Add these two repository secrets once (**Settings → Secrets and variables →
Actions → New repository secret**):

| Secret | Where to get it |
| :-- | :-- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → **My Profile → API Tokens → Create Token**. Use a custom token with **Workers Scripts: Edit** and **Account Settings: Read**. |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → **Workers & Pages** → the account ID in the right sidebar. |

The live URL is `https://saas-landing.<your-subdomain>.workers.dev` — it is also
printed at the end of the deploy step. Once it is up, put it in the repo's
**Website** field and in the profile README.
