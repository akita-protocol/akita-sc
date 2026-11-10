#!/usr/bin/env node

/**
 * Pre-launch review of the DAO wallet before `initialize()` (review 2026-10-05, DAO-R3 and DAO-R1).
 *
 * Caller-scoped grants set up before launch (keepers, agents, operators) are intended to survive
 * `initialize()`: the script lists every one of them so the set the DAO launches with is explicit, and
 * revokes only the ones named with --revoke. It always revokes what must not outlive creator control:
 *
 *   - grants of the DAO's Update plugin (`pal.update`) that are not global + execution key;
 *   - execution keys live in the DAO wallet. Keys the DAO tracks as bootstrap keys are revoked with
 *     `clearBootstrapKeys` (it also stops tracking them); every other key gets a RemoveExecutePlugin.
 *
 * The DAO records only grants and keys that its current program created in bootstrap; the previously
 * deployed DAO recorded none, so this script reads the wallet itself. It plans by default;
 * --confirm-revoke creates the proposals (and executes them while the DAO is not initialized, which
 * needs the DAO creator's key).
 *
 * Usage:
 *   npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network localnet --dao-app-id <id> --dry-run
 *   npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --dry-run
 *   npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --revoke <plugin>:<caller>:<escrow> --dry-run
 *   npx ts-node --transpile-only scripts/revoke-dao-bootstrap-grants.ts --network mainnet --confirm-revoke -m "$MNEMONIC"
 */

import dotenv from 'dotenv'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { SDKClient } from 'akita-sdk'
import { ProposalAction, ProposalActionEnum } from 'akita-sdk/dao'
import { parseBaseArgs, runScript, setupContext, type ScriptContext } from './script-base'
import { executeProposal } from './utils'
import { DAO_STATE_FULLY_INITIALIZED, pluginKeyId, splitMigrations } from './lib/dao-wallet-plugin-migration'

type Revocation = { label: string; actions: ProposalAction<SDKClient>[] }

export type RevocationPlan = {
  revocations: Revocation[]
  /** Leases the DAO tracks as bootstrap keys; `clearBootstrapKeys` revokes and untracks them. */
  trackedKeys: Uint8Array[]
  /** caller-scoped grants the DAO launches with */
  kept: string[]
}

const hex = (bytes: Uint8Array) => Buffer.from(bytes).toString('hex')

function parseExtraArgs(): { revoke: Set<string>; confirm: boolean } {
  const args = process.argv.slice(2)
  const revoke = new Set<string>()
  let confirm = false
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--revoke') {
      const value = args[++i]
      if (!value || value.split(':').length < 2) throw new Error('--revoke needs <plugin>:<caller>[:<escrow>]')
      const [plugin, caller, escrow = ''] = value.split(':')
      revoke.add(pluginKeyId({ plugin: BigInt(plugin), caller, escrow }))
    } else if (args[i] === '--confirm-revoke') {
      confirm = true
    }
  }
  return { revoke, confirm }
}

export async function planRevocation(ctx: ScriptContext, revoke: ReadonlySet<string>): Promise<RevocationPlan> {
  const wallet = await ctx.dao.getWallet()
  const [grants, named, executions, pal, trackedKeys] = await Promise.all([
    wallet.client.state.box.plugins.getMap(),
    wallet.getNamedPlugins(),
    wallet.client.state.box.executions.getMap(),
    ctx.dao.client.state.global.pluginAppList(),
    ctx.dao.getBootstrapKeys(),
  ])

  const namesByKey = new Map<string, string>()
  for (const [name, key] of named) namesByKey.set(pluginKeyId(key), name)

  const revocations: Revocation[] = []
  const kept: string[] = []
  for (const [key, info] of grants) {
    const id = pluginKeyId(key)
    const callerScoped = key.caller !== ALGORAND_ZERO_ADDRESS_STRING
    const weakUpdateGrant = key.plugin === pal?.update && (callerScoped || key.escrow !== '' || !info.useExecutionKey)
    if (!callerScoped && !weakUpdateGrant) continue
    if (!weakUpdateGrant && !revoke.has(id)) {
      kept.push(id)
      continue
    }
    const name = namesByKey.get(id)
    revocations.push({
      label: `grant ${id}${name ? ` (named "${name}")` : ''}${weakUpdateGrant ? ' [pal.update without execution key]' : ''}`,
      actions: [name
        ? { type: ProposalActionEnum.RemoveNamedPlugin, name }
        : { type: ProposalActionEnum.RemovePlugin, plugin: key.plugin, caller: key.caller, escrow: key.escrow }],
    })
  }

  const tracked = new Set(trackedKeys.map(hex))
  const round = BigInt((await ctx.algorand.client.algod.status().do()).lastRound)
  for (const [lease, info] of executions) {
    if (tracked.has(hex(lease))) continue
    revocations.push({
      label: `execution key ${hex(lease)} (rounds ${info.firstValid}-${info.lastValid}${info.lastValid < round ? ', expired' : ''})`,
      actions: [{ type: ProposalActionEnum.RemoveExecutePlugin, executionKey: lease }],
    })
  }

  return { revocations, trackedKeys, kept }
}

runScript(async () => {
  const network = (() => {
    const args = process.argv.slice(2)
    const index = args.findIndex((arg) => arg === '--network' || arg === '-n')
    return index >= 0 ? (args[index + 1] ?? 'localnet') : (process.env.ALGORAND_NETWORK ?? 'localnet')
  })()
  dotenv.config({ path: `.env.${network}` })
  const extra = parseExtraArgs()
  const options = parseBaseArgs(
    'revoke-dao-bootstrap-grants.ts',
    `
Additional options:
  --revoke <plugin>:<caller>[:<escrow>]  Revoke a caller-scoped grant (all others are kept). Repeatable.
  --confirm-revoke                     Create the revocation proposals and, before initialization, execute
                                       them and clear the tracked bootstrap keys. Without it the run plans only.`,
  )

  const ctx = await setupContext(options, { minBalance: 100_000n })
  const daoCreator = (await ctx.algorand.app.getById(ctx.dao.appId)).creator.toString()
  const effectiveSender = options.dryRun ? daoCreator : ctx.sender
  ctx.dao.setSendParams({ sender: effectiveSender, signer: ctx.signer })

  const daoState = await ctx.dao.client.state.global.getAll()
  const plan = await planRevocation(ctx, extra.revoke)
  const actionLimit = Number(daoState.proposalActionLimit ?? 1n)
  const batches = splitMigrations(plan.revocations, actionLimit)

  console.log(`DAO bootstrap revocation plan on ${options.network}`)
  console.log(`  DAO: ${ctx.dao.appId} (state ${daoState.state ?? 'unknown'}), creator ${daoCreator}`)
  console.log(`  Tracked bootstrap count (bootstrap_key_count): ${daoState.bootstrapKeyCount ?? 0n}`)
  console.log(`  Tracked bootstrap keys (clearBootstrapKeys): ${plan.trackedKeys.length}`)
  for (const lease of plan.trackedKeys) console.log(`    ${hex(lease)}`)
  console.log(`  Pre-launch grants kept (survive initialize): ${plan.kept.length}`)
  for (const id of plan.kept) console.log(`    ${id}`)
  console.log(`  Revocations: ${plan.revocations.length} in ${batches.length} proposal(s) of at most ${actionLimit} action(s)`)
  for (const revocation of plan.revocations) console.log(`    ${revocation.label}`)

  for (let i = 0; i < batches.length; i++) {
    const actions = batches[i].flatMap((revocation) => revocation.actions)
    const cost = await ctx.dao.proposalCost({ sender: effectiveSender, signer: ctx.signer, actions })
    console.log(`  Proposal ${i + 1}: actions=${actions.length}, total=${cost.total}, power=${cost.power}, participation=${cost.participation}`)
  }

  if (options.dryRun || !extra.confirm) {
    console.log(`\n${options.dryRun ? 'DRY RUN' : 'PLAN ONLY'}: no state was changed. Re-run with --confirm-revoke to apply.`)
    return
  }

  const bootstrap = daoState.state !== DAO_STATE_FULLY_INITIALIZED
  if (bootstrap && ctx.sender !== daoCreator) {
    throw new Error(`Only the DAO creator ${daoCreator} can create pre-initialization proposals`)
  }
  for (const batch of batches) {
    const actions = batch.flatMap((revocation) => revocation.actions)
    const cost = await ctx.dao.proposalCost({ actions })
    if (cost.total > 0n) {
      await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: ctx.dao.client.appAddress, amount: microAlgo(cost.total) })
    }
    const { return: proposalId } = await ctx.dao.newProposal({ actions })
    if (proposalId === undefined) throw new Error('Failed to create the revocation proposal')
    if (bootstrap) {
      await executeProposal(ctx.dao, proposalId)
      console.log(`Created and executed proposal ${proposalId}`)
    } else {
      console.log(`Created draft proposal ${proposalId} (submit it for a vote)`)
    }
  }
  if (bootstrap && plan.trackedKeys.length > 0) {
    await ctx.dao.clearBootstrapKeys({ leases: plan.trackedKeys })
    console.log(`Cleared ${plan.trackedKeys.length} tracked bootstrap key(s)`)
  }
  const after = await ctx.dao.client.state.global.bootstrapKeyCount()
  console.log(`bootstrap_key_count is now ${after ?? 0n}${after ? ': initialize() still refuses' : ''}`)
})
