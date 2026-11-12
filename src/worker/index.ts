import { Hono } from 'hono'

// The Worker in front of the static site. Add API routes here; everything
// else falls through to the built assets (single-page-application mode).
type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

// Newsletter / waitlist capture. Wire this to your email provider or a D1
// table; it currently just acknowledges the address.
app.post('/api/subscribe', async (c) => {
  const body = await c.req.json<{ email?: string }>().catch(() => ({}) as { email?: string })
  const email = body.email?.trim() ?? ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: 'Enter a valid email address.' }, 400)
  }
  return c.json({ ok: true })
})

// SEO files are generated from the request origin, so they stay correct on
// any domain — including a future workers.dev subdomain change.
app.get('/robots.txt', (c) => {
  const origin = new URL(c.req.url).origin
  return c.body(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, 200, {
    'content-type': 'text/plain; charset=utf-8',
  })
})

app.get('/sitemap.xml', (c) => {
  const origin = new URL(c.req.url).origin
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${origin}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    '</urlset>',
    '',
  ].join('\n')
  return c.body(xml, 200, { 'content-type': 'application/xml; charset=utf-8' })
})

// Static assets fall through; HTML gets __SITE_ORIGIN__ replaced with the
// serving origin so the Open Graph, canonical and JSON-LD URLs always match
// the domain that served the page.
app.all('*', async (c) => {
  const res = await c.env.ASSETS.fetch(c.req.raw)
  const type = res.headers.get('content-type') ?? ''
  if (!type.includes('text/html')) return res
  const origin = new URL(c.req.url).origin
  const html = (await res.text()).replaceAll('__SITE_ORIGIN__', origin)
  const headers = new Headers(res.headers)
  headers.delete('content-length')
  headers.delete('etag')
  return new Response(html, { status: res.status, headers })
})

export default app
