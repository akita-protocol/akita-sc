#!/usr/bin/env node
/**
 * Allowlist sub-gates on Gate v2 and flag the context-aware ones (principal-resolution spec §6.9, Q12).
 *
 * Inputs are the receipts that `deploy-gates.ts --manifest-dir <dir>` writes (one `<Contract>.json` per
 * sub-gate), plus optional explicit `--sub-gates Name=id,...`. For each sub-gate the script:
 *   1. checks that the app runs the program its receipt (or the current artifact) names;
 *   2. flags it context-aware only if it runs the current artifact AND that artifact has `checkFor`;
 *   3. reads the Gate's allowlist box and skips sub-gates that are already allowlisted with the right flag;
 *   4. tops up the Gate for new boxes and sends `setSubGate(app, true, ctxAware)` as the Gate creator;
 *   5. reads every box back and fails on any mismatch.
 *
 * Only the Gate creator can call `setSubGate`, and only before `sealImports`. After the seal the DAO
 * wallet owns the allowlist: the script then prints the calls for a DAO proposal and writes nothing.
 * `--dry-run` prints the plan and writes nothing.
 */
import fs from 'node:fs'
import path from 'node:path'
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { parseBaseArgs, runScript, setupContext } from './script-base'
import { getAppFundingNeeded } from './utils'
import { immutableCatalog } from './lib/immutable-deployment'
import {
  ALLOWLIST_BOX_MBR_BOUND,
  type AllowlistState,
  artifactApprovalHash,
  decodeAllowlistBox,
  gateSupportsCtxFlag,
  loadArtifact,
  planAllowlist,
  programHash,
  resolveGateId,
  setSubGateCall,
  type SubGateCandidate,
  subGateBoxName,
} from './lib/ctx-sub-gates'

/** The params of an existing app; throws for a deleted or missing app. */
function appParams(app: algosdk.modelsv2.Application, appId: bigint): algosdk.modelsv2.ApplicationParams {
  if (!app.params) throw new Error(`App ${appId} has no params (deleted?)`)
  return app.params
}

const subGateNames = Object.entries(immutableCatalog)
  .filter(([name, entry]) => name.endsWith('Gate') && name !== 'Gate' && entry.artifact.startsWith('gates/sub-gates/'))
  .map(([name]) => name)

runScript(async () => {
  const args = process.argv.slice(2)
  const value = (key: string) => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1] }
  const options = parseBaseArgs('allowlist-sub-gates.ts', `
  --gate <id>              Gate v2 app id (default: the Gate receipt in --manifest-dir, else the network's gate id)
  --manifest-dir <dir>     deploy-gates.ts receipt directory; every sub-gate receipt found there is used
  --sub-gates <list>       Extra Name=id pairs, e.g. SubscriptionGate=1234 (names: ${subGateNames.join(', ')})`)
  if (!args.includes('--network') && !args.includes('-n')) throw new Error('An explicit --network is required')
  const ctx = await setupContext(options, { minBalance: 1_000_000n })
  const algod = ctx.algorand.client.algod

  const gateSpec = loadArtifact(immutableCatalog.Gate.artifact)
  const gateId = resolveGateId(value('--gate'), value('--manifest-dir'), options.network, ctx.appIds.gate)
  const gateInfo = { params: appParams(await algod.getApplicationByID(gateId).do(), gateId) }
  if (programHash(gateInfo.params.approvalProgram) !== artifactApprovalHash(gateSpec)) {
    throw new Error(`Gate ${gateId} does not run the current gates/Gate artifact; its ABI is unknown. Deploy Gate v2 first (rollout step C1) and pass its receipts with --manifest-dir`)
  }

  // Candidates: receipts first, then explicit pairs (an explicit pair must not contradict a receipt).
  const ids = new Map<string, { appId: bigint; receiptHash?: string }>()
  const directory = value('--manifest-dir')
  if (directory) {
    for (const name of subGateNames) {
      const file = path.join(directory, `${name}.json`)
      if (!fs.existsSync(file)) continue
      const receipt = JSON.parse(fs.readFileSync(file, 'utf8')) as { contract: string; appId?: string; approvalHash: string; network: string }
      if (receipt.contract !== name || receipt.network !== options.network) throw new Error(`${file}: receipt is for ${receipt.contract} on ${receipt.network}`)
      if (!receipt.appId) throw new Error(`${file}: deployment is unresolved (no appId)`)
      ids.set(name, { appId: BigInt(receipt.appId), receiptHash: receipt.approvalHash })
    }
  }
  for (const pair of (value('--sub-gates') ?? '').split(',').map((s) => s.trim()).filter(Boolean)) {
    const [name, id] = pair.split('=')
    if (!subGateNames.includes(name) || !id) throw new Error(`Invalid --sub-gates entry ${pair}`)
    const prior = ids.get(name)
    if (prior && prior.appId !== BigInt(id)) throw new Error(`${name}: --sub-gates ${id} contradicts receipt ${prior.appId}`)
    ids.set(name, { appId: BigInt(id), receiptHash: prior?.receiptHash })
  }
  if (ids.size === 0) throw new Error('No sub-gates selected (use --manifest-dir and/or --sub-gates)')

  const candidates: SubGateCandidate[] = []
  const current = new Map<bigint, AllowlistState>()
  for (const [name, { appId, receiptHash }] of ids) {
    const info = appParams(await algod.getApplicationByID(appId).do(), appId)
    const onChainApprovalHash = programHash(info.approvalProgram)
    if (receiptHash && receiptHash !== onChainApprovalHash) throw new Error(`${name}: app ${appId} does not run the program in its receipt`)
    candidates.push({ name, appId, onChainApprovalHash, artifact: loadArtifact(immutableCatalog[name].artifact) })
    const box = await algod.getApplicationBoxByName(gateId, subGateBoxName(gateSpec, appId)).do()
      .then((b) => b.value, () => undefined)
    current.set(appId, decodeAllowlistBox(box))
  }

  const plan = planAllowlist(gateSpec, candidates, current)
  const pending = plan.filter((action) => action.kind !== 'none')
  console.log(JSON.stringify({
    gate: gateId.toString(), ctxFlag: gateSupportsCtxFlag(gateSpec),
    plan: plan.map((a) => ({ ...a, appId: a.appId.toString() })),
  }, null, 2))
  if (pending.length === 0) { console.log('Allowlist already up to date.'); return }

  const sealed = (gateInfo.params.globalState ?? []).find((kv) => Buffer.from(kv.key).toString() === 'imports_sealed')?.value.uint
  const calls = pending.flatMap((a) => a.kind === 'reflag'
    ? [setSubGateCall(gateSpec, a.appId, false, false), setSubGateCall(gateSpec, a.appId, true, a.ctxAware)]
    : [setSubGateCall(gateSpec, a.appId, true, a.ctxAware)])
  const creator = gateInfo.params.creator.toString()
  if (BigInt(sealed ?? 0) !== 0n) {
    console.log(`Gate imports are sealed: only the DAO wallet can call setSubGate. Propose these calls on Gate ${gateId}:`)
    for (const call of calls) console.log(`  ${call.method} ${JSON.stringify(call.args, (_, v) => typeof v === 'bigint' ? v.toString() : v)}`)
    throw new Error('Allowlist not changed (sealed Gate)')
  }
  if (options.dryRun) { console.log(`Dry run: ${calls.length} setSubGate call(s) by creator ${creator}; nothing sent.`); return }
  if (creator !== ctx.sender) throw new Error(`Sender ${ctx.sender} is not the Gate creator ${creator}`)

  const gateAddress = algosdk.getApplicationAddress(gateId).toString()
  const added = BigInt(pending.filter((a) => a.kind === 'add').length)
  const topUp = await getAppFundingNeeded(ctx.algorand, gateAddress, added * ALLOWLIST_BOX_MBR_BOUND, 0n)
  if (topUp > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, receiver: gateAddress, amount: microAlgo(topUp) })

  const client = ctx.algorand.client.getAppClientById({ appSpec: JSON.stringify(gateSpec), appId: gateId, defaultSender: ctx.sender, defaultSigner: ctx.signer })
  for (const call of calls) {
    await client.send.call({ method: call.method, args: call.args })
    console.log(`  sent ${call.method} ${call.args.join(', ')}`)
  }

  for (const action of plan) {
    const box = await algod.getApplicationBoxByName(gateId, subGateBoxName(gateSpec, action.appId)).do().then((b) => b.value, () => undefined)
    const state = decodeAllowlistBox(box)
    const flagOk = !gateSupportsCtxFlag(gateSpec) || (state.allowed && state.ctxAware === action.ctxAware)
    if (!state.allowed || !flagOk) throw new Error(`${action.name} (${action.appId}): allowlist box does not match the plan after sending`)
  }
  console.log('Allowlist verified on chain.')
})
