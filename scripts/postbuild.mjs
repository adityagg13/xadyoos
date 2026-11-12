// Post-build pass on dist/: prune hidden files and source maps (and the
// sourceMappingURL comments that point at them), then derive docs.html from
// index.html so Vercel's cleanUrls serves the docs page at /docs without
// needing a catch-all rewrite.
import {
  copyFileSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { extname, join } from 'node:path'

const SOURCE_MAP_COMMENT = /^\/\/[#@]\s*sourceMappingURL=.*$/gm

function clean(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (name.startsWith('.') || name.endsWith('.map')) {
      rmSync(path, { recursive: true, force: true })
      continue
    }
    if (statSync(path).isDirectory()) {
      clean(path)
      continue
    }
    if (extname(name) !== '.js') continue

    const code = readFileSync(path, 'utf8')
    const stripped = code.replace(SOURCE_MAP_COMMENT, '')
    if (stripped !== code) writeFileSync(path, stripped)
  }
}

const dist = new URL('../dist', import.meta.url).pathname
clean(dist)
copyFileSync(join(dist, 'index.html'), join(dist, 'docs.html'))
