import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generate, writeDocumentPartsToString } from '@algorandfoundation/algokit-client-generator'

const project = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const artifacts = path.join(project, 'smart_contracts/artifacts')
const sdk = path.resolve(project, '../akita-sdk/src/generated')
await fs.mkdir(sdk, { recursive: true })

async function visit(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await visit(file)
    } else if (entry.name.endsWith('.arc56.json')) {
      const spec = JSON.parse(await fs.readFile(file, 'utf8'))
      const client = writeDocumentPartsToString(generate(spec, { mode: 'full', preserveNames: false })).replace(
        /[ \t]+$/gm,
        '',
      )
      await fs.writeFile(path.join(directory, `${spec.name}Client.ts`), client)
      await fs.writeFile(path.join(sdk, `${spec.name}Client.ts`), client)
    }
  }
}
await visit(artifacts)
// Preserve client generation for immutable MetaMerkles deployments after its
// source is replaced by Meta. This archived spec is not a deployment target.
const legacySpec = JSON.parse(
  await fs.readFile(path.resolve(project, '../akita-sdk/legacy/MetaMerkles.arc56.json'), 'utf8'),
)
const legacyClient = writeDocumentPartsToString(generate(legacySpec, { mode: 'full', preserveNames: false })).replace(
  /[ \t]+$/gm,
  '',
)
await fs.writeFile(path.join(sdk, 'MetaMerklesClient.ts'), legacyClient)
console.log('Generated contract and SDK clients from ARC-56 artifacts')
