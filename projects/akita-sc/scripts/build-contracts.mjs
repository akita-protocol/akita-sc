import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(project, 'smart_contracts')
const artifacts = path.join(source, 'artifacts')
const compiler = path.join(path.dirname(fileURLToPath(import.meta.resolve('@algorandfoundation/puya-ts'))), 'bin/run-cli.mjs')
const roots = process.argv.slice(2)
for (const root of roots.length ? roots : ['.']) {
  const input = path.resolve(source, root)
  const output = path.join(artifacts, path.relative(source, input.endsWith('.algo.ts') ? path.dirname(input) : input))
  const result = spawnSync(process.execPath, [compiler, input, '--out-dir', output], { cwd: project, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
}
await import('./generate-clients.mjs')
