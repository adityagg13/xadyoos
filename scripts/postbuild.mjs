// Strips files the Sites uploader refuses (hidden files and source maps)
// from the build output, so `deploy.json` can point straight at dist/.
// Removing a source map must also remove the sourceMappingURL comment that
// points at it, otherwise `wrangler deploy` fails on the missing file.
import {
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

clean(new URL('../dist', import.meta.url).pathname)
