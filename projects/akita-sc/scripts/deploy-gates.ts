#!/usr/bin/env node
/** Deploy the unused main Gate and every sub-gate in the immutable catalog, with resumable receipts. */
import fs from 'node:fs'
import path from 'node:path'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { deployImmutable } from './lib/immutable-deployment'
import { checkLegacyCutoff } from './lib/ctx-sub-gates'
import catalog from './lib/immutable-catalog.json'

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const gates = Object.entries(catalog).filter(([name]) => name.endsWith('Gate'))
  const names = Object.fromEntries(gates.map(([name, entry]) => [name === 'Gate' ? 'gate' : entry.registryKey!.replace(/Gate$/, ''), name]))
  const options = parseBaseArgs('deploy-gates.ts', `
  --contracts <list>     Selected gates (${Object.keys(names).join(', ')}); default all
  --manifest-dir <dir>  Existing directory for one durable receipt per gate (required for writes)
  --register            Register SDK IDs and update DAO aal.gate after main Gate deployment
  --legacy-cutoff <n>   Gate v2 only: Gate v1 gate_cursor at migration time (ids below it can be
                        imported once, until sealImports); required when deploying the main gate`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const selected = value('--contracts')?.split(',').map(s => s.trim()) ?? Object.keys(names)
  if (new Set(selected).size !== selected.length || selected.some(s => !names[s])) throw new Error('Invalid or duplicate gate selection')
  const directory = value('--manifest-dir')
  if (!options.dryRun && !directory) throw new Error('--manifest-dir is required')
  const ctx = await setupContext(options)
  const legacyCutoff = value('--legacy-cutoff')
  if (selected.includes('gate') && !legacyCutoff) throw new Error('--legacy-cutoff is required to deploy the main Gate (v1 gate_cursor; 1 on a fresh network)')
  // Checked until the Gate's receipt names its app: after that the create is done and cannot change.
  const gateReceipt = directory ? path.join(directory, 'Gate.json') : undefined
  const gateCreated = gateReceipt !== undefined && fs.existsSync(gateReceipt) && Boolean((JSON.parse(fs.readFileSync(gateReceipt, 'utf8')) as { appId?: string }).appId)
  const liveGate = ctx.appIds.gate ?? 0n
  if (selected.includes('gate') && !gateCreated && liveGate > 0n) {
    const state = (await ctx.algorand.client.algod.getApplicationByID(liveGate).do()).params?.globalState ?? []
    const cursor = state.find((kv) => Buffer.from(kv.key).toString() === 'gate_cursor')?.value.uint
    console.log(checkLegacyCutoff(legacyCutoff!, liveGate, cursor === undefined ? undefined : BigInt(cursor)))
  }
  for (const key of selected) {
    const config: Record<string, string> = key === 'gate' ? { legacyCutoff: legacyCutoff! } : {}
    await deployImmutable(ctx, names[key], config, directory ? path.join(directory, `${names[key]}.json`) : undefined, args.includes('--register'))
  }
})
