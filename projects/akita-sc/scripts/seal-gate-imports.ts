#!/usr/bin/env node
/**
 * Seal Gate v2 imports (`sealImports`), which hands allowlist control from the Gate creator to the DAO wallet.
 *
 * After the seal only the DAO wallet can call `setSubGate`, and no DAO proposal action does that directly, so
 * every sub-gate must be allowlisted first (`allowlist-sub-gates.ts`). This script refuses to seal while any
 * sub-gate of the tree has no receipt in `--manifest-dir` (and is not named with `--sub-gates`), or while one
 * of them is missing from the allowlist: a sub-gate left out here could only be added by a DAO proposal.
 * Re-running on a sealed Gate is a no-op. `--dry-run` checks and prints, and sends nothing.
 */
import fs from 'node:fs'
import path from 'node:path'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { immutableCatalog } from './lib/immutable-deployment'
import { artifactApprovalHash, decodeAllowlistBox, loadArtifact, programHash, resolveGateId, subGateBoxName } from './lib/ctx-sub-gates'

const IMPORTS_SEALED_KEY = 'imports_sealed'

const subGateNames = Object.entries(immutableCatalog)
  .filter(([name, entry]) => name.endsWith('Gate') && name !== 'Gate' && entry.artifact.startsWith('gates/sub-gates/'))
  .map(([name]) => name)

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('seal-gate-imports.ts', `
  --gate <id>              Gate v2 app id (default: the Gate receipt in --manifest-dir, else the network's gate id)
  --manifest-dir <dir>     deploy-gates.ts receipt directory; every sub-gate receipt there must be allowlisted
  --sub-gates <list>       Extra Name=id pairs that must be allowlisted`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  const algod = ctx.algorand.client.algod
  const gateSpec = loadArtifact(immutableCatalog.Gate.artifact)

  const gateId = resolveGateId(value('--gate'), value('--manifest-dir'), options.network, ctx.appIds.gate)
  const gate = (await algod.getApplicationByID(gateId).do()).params
  if (!gate) throw new Error(`Gate ${gateId} not found`)
  if (programHash(gate.approvalProgram) !== artifactApprovalHash(gateSpec)) throw new Error(`Gate ${gateId} does not run the current gates/Gate artifact. Deploy Gate v2 first (rollout step C1) and pass its receipts with --manifest-dir`)
  const sealed = (gate.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === IMPORTS_SEALED_KEY)?.value.uint
  if (BigInt(sealed ?? 0) !== 0n) { console.log(`Gate ${gateId} imports are already sealed.`); return }

  const expected = new Map<string, bigint>()
  const directory = value('--manifest-dir')
  if (directory) {
    for (const name of subGateNames) {
      const file = path.join(directory, `${name}.json`)
      if (!fs.existsSync(file)) continue
      const receipt = JSON.parse(fs.readFileSync(file, 'utf8')) as { contract: string; appId?: string; network: string }
      if (receipt.contract !== name || receipt.network !== options.network) throw new Error(`${file}: receipt is for ${receipt.contract} on ${receipt.network}`)
      if (!receipt.appId) throw new Error(`${file}: deployment is unresolved (no appId)`)
      expected.set(name, BigInt(receipt.appId))
    }
  }
  for (const pair of (value('--sub-gates') ?? '').split(',').map((s) => s.trim()).filter(Boolean)) {
    const [name, id] = pair.split('=')
    if (!subGateNames.includes(name) || !id) throw new Error(`Invalid --sub-gates entry ${pair}`)
    expected.set(name, BigInt(id))
  }
  if (expected.size === 0) throw new Error('No sub-gates to verify (use --manifest-dir and/or --sub-gates); refusing to seal blind')
  const absent = subGateNames.filter((name) => !expected.has(name))
  if (absent.length > 0) {
    throw new Error(`Refusing to seal: no receipt for ${absent.join(', ')}. Deploy them (deploy-gates.ts) and allowlist them first: after the seal only a DAO proposal can add a sub-gate`)
  }

  const missing: string[] = []
  for (const [name, appId] of expected) {
    const box = await algod.getApplicationBoxByName(gateId, subGateBoxName(gateSpec, appId)).do().then((b) => b.value, () => undefined)
    const state = decodeAllowlistBox(box)
    console.log(`  ${name} ${appId}: ${state.allowed ? `allowlisted${state.ctxAware ? ' (context-aware)' : ''}` : 'NOT allowlisted'}`)
    if (!state.allowed) missing.push(`${name} ${appId}`)
  }
  if (missing.length > 0) throw new Error(`Refusing to seal: not allowlisted: ${missing.join(', ')}. Run allowlist-sub-gates.ts first`)

  const creator = gate.creator.toString()
  if (options.dryRun) { console.log(`Dry run: would call sealImports on Gate ${gateId} as creator ${creator}; nothing sent.`); return }
  if (creator !== ctx.sender) throw new Error(`Sender ${ctx.sender} is not the Gate creator ${creator}`)

  const client = ctx.algorand.client.getAppClientById({ appSpec: JSON.stringify(gateSpec), appId: gateId, defaultSender: ctx.sender, defaultSigner: ctx.signer })
  await client.send.call({ method: 'sealImports', args: [] })
  const after = (await algod.getApplicationByID(gateId).do()).params?.globalState
    ?.find((kv) => Buffer.from(kv.key).toString() === IMPORTS_SEALED_KEY)?.value.uint
  if (BigInt(after ?? 0) !== 1n) throw new Error(`Gate ${gateId}: imports_sealed is ${after} after sealImports`)
  console.log(`Gate ${gateId} imports sealed; allowlist control is now the DAO wallet.`)
})
