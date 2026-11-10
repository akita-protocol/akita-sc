import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { generate, writeDocumentPartsToString } from '@algorandfoundation/algokit-client-generator'

// Compile and generate only these contracts, preserving unrelated in-progress artifacts.
const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const compiler = path.join(
  path.dirname(fileURLToPath(import.meta.resolve('@algorandfoundation/puya-ts'))),
  'bin/run-cli.mjs',
)
for (const [directory, name] of [
  ['meta', 'Meta'],
  ['arc58/plugins/meta', 'MetaPlugin'],
  ['mocks/meta-reader', 'MockMetaReader'],
]) {
  const source = path.join(project, 'smart_contracts', directory)
  const output = path.join(project, 'smart_contracts/artifacts', directory)
  const result = spawnSync(process.execPath, [compiler, source, '--out-dir', output], {
    cwd: project,
    stdio: 'inherit',
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
  const spec = JSON.parse(await fs.readFile(path.join(output, `${name}.arc56.json`), 'utf8'))
  const client = writeDocumentPartsToString(generate(spec, { mode: 'full', preserveNames: false })).replace(
    /[ \t]+$/gm,
    '',
  )
  await fs.writeFile(path.join(output, `${name}Client.ts`), client)
  if (!directory.startsWith('mocks/')) {
    await fs.writeFile(path.resolve(project, '../akita-sdk/src/generated', `${name}Client.ts`), client)
  }
}
