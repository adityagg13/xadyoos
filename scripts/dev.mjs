/**
 * Starts the Vite dev server for this template with the project-local Node
 * runtime in `.tools/`, so the preview starts the same way on a machine that
 * has no system Node, npm or Bun on PATH.
 *
 * Extra arguments are forwarded to Vite:
 *   node scripts/dev.mjs --port 5174 --host
 */
import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const toolsDir = join(root, ".tools");

/** Sort extracted runtimes newest first, so a newer one wins. */
function compareRuntimes(a, b) {
  const parts = (value) => (value.match(/\d+/g) ?? []).map(Number);
  const [left, right] = [parts(a), parts(b)];
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    const delta = (right[i] ?? 0) - (left[i] ?? 0);
    if (delta !== 0) return delta;
  }
  return 0;
}

function bundledNode() {
  if (!existsSync(toolsDir)) return null;
  const runtimes = readdirSync(toolsDir)
    .filter((name) => name.startsWith("node-v"))
    .sort(compareRuntimes);
  for (const runtime of runtimes) {
    for (const candidate of [
      join(toolsDir, runtime, "node.exe"),
      join(toolsDir, runtime, "bin", "node"),
    ]) {
      if (existsSync(candidate)) return candidate;
    }
  }
  return null;
}

const viteBin = join(root, "node_modules", "vite", "bin", "vite.js");
if (!existsSync(viteBin)) {
  console.error("Dependencies are not installed yet. Run `bun install` first.");
  process.exit(1);
}

const node = bundledNode() ?? "node";
const child = spawn(node, [viteBin, ...process.argv.slice(2)], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("error", (error) => {
  console.error(`Could not start the dev server with ${node}: ${error.message}`);
  process.exit(1);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}

child.on("exit", (code, signal) => {
  process.exit(signal ? 1 : code ?? 0);
});
