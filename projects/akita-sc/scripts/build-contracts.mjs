import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const source = path.join(project, 'smart_contracts')
const artifacts = path.join(source, 'artifacts')
const compiler = path.join(path.dirname(fileURLToPath(import.meta.resolve('@algorandfoundation/puya-ts'))), 'bin/run-cli.mjs')
const roots = process.argv.slice(2)
const outputs = []
for (const root of roots.length ? roots : ['.']) {
  const input = path.resolve(source, root)
  const output = path.join(artifacts, path.relative(source, input.endsWith('.algo.ts') ? path.dirname(input) : input))
  const result = spawnSync(process.execPath, [compiler, input, '--out-dir', output], { cwd: project, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
  outputs.push(output)
}

// The compiler names a source inside this project by its path from the project, and a source outside
// it (a workspace package such as @akita-protocol/plugin) by its absolute path. An absolute path
// differs from one checkout to the next, so the TEAL, and the specs that embed it, would too. Name
// those sources from the project as well. Only comments change: the bytecode is not touched.
const repository = path.resolve(project, '../..')
const absolute = repository + path.sep
const relative = path.relative(project, repository).split(path.sep).join('/') + '/'
const portable = (teal) => teal.split(absolute).join(relative)

function rewrite(file, change) {
  const before = fs.readFileSync(file, 'utf8')
  const after = change(before)
  if (after !== before) fs.writeFileSync(file, after)
}

function portableSpec(text) {
  const spec = JSON.parse(text)
  let result = text
  for (const encoded of Object.values(spec.source ?? {})) {
    if (typeof encoded !== 'string') continue
    const teal = Buffer.from(encoded, 'base64').toString('utf8')
    const fixed = portable(teal)
    if (fixed !== teal) result = result.split(JSON.stringify(encoded)).join(JSON.stringify(Buffer.from(fixed, 'utf8').toString('base64')))
  }
  return result
}

for (const output of outputs) {
  for (const entry of fs.readdirSync(output, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue
    const file = path.join(entry.parentPath, entry.name)
    if (entry.name.endsWith('.teal')) rewrite(file, portable)
    else if (entry.name.endsWith('.arc32.json') || entry.name.endsWith('.arc56.json')) rewrite(file, portableSpec)
  }
}

await import('./generate-clients.mjs')
