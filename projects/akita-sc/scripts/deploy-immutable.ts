#!/usr/bin/env node
import fs from 'node:fs'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { deployImmutable, describeDeployOrder, immutableContracts } from './lib/immutable-deployment'

runScript(async () => {
  const order = describeDeployOrder()
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('deploy-immutable.ts', `
  --contract <name>   Required: ${immutableContracts.join(', ')}
  --config <json|file> Constructor arguments using ARC-56 names; uint64 IDs as decimal strings.
                      Inline JSON (starts with "{") or the path of a JSON file
  --manifest <json>   Durable receipt; reuse it to resume funding/registration without redeploying
  --register          Update supported SDK metadata and DAO rewards/gate pointers after deployment
  --allow-dependency-mismatch
                      Accept a dependency app whose program differs from its current artifact,
                      i.e. one deployed from another build
  --allow-missing-opt-ins
                      Rewards only: repoint aal.rewards although the new app lacks an asset the old
                      one holds (rewards in that asset revert until it is opted in)${order ? `

Contracts that depend on each other deploy in this order; each dependency arg (name=Contract)
takes the app ID from that contract's receipt and is checked on chain before anything is
written. Admin calls after "→" are printed after deployment and must be executed by the admin
(the DAO wallet on MainNet) before use:
${order}` : ''}`)
  const name = value('--contract')
  if (!name) throw new Error('--contract is required')
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const raw = value('--config')
  // Inline JSON or a file: an inline object used to be read as a path and failed with ENOENT.
  const config = raw ? JSON.parse(raw.trimStart().startsWith('{') ? raw : fs.readFileSync(raw, 'utf8')) : {}
  const ctx = await setupContext(options)
  await deployImmutable(ctx, name, config, value('--manifest'), args.includes('--register'),
    { allowDependencyMismatch: args.includes('--allow-dependency-mismatch'), allowMissingOptIns: args.includes('--allow-missing-opt-ins') })
})
