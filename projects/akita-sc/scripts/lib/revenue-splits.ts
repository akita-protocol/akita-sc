/**
 * The DAO's revenue split table (runbook B3b).
 *
 * The DAO stores one table, `revenue_splits`: a list of receivers, each a named escrow of the DAO wallet
 * with a share out of 100,000. Every revenue escrow the RevenueManager cycles is registered with a
 * reference to that table and reads it again at each allocation, so one UpdateFields proposal changes
 * the split for every revenue source at once. Nothing else stores the shares: no contract program holds
 * a ceiling for any receiver, and the RevenueManager only requires that the percentages total 100%.
 *
 * This step changes shares and nothing else. The receivers and their order stay as they are, because
 * the last percentage entry also takes the rounding remainder of each payout. A payout divides what a
 * revenue escrow holds when it runs, at the table stored then, so the first payout after this step
 * divides everything that has built up at the new shares.
 *
 * The DAO only checks that the value decodes as a split table; the checks the RevenueManager applies
 * when it pays (types, totals, receivers that exist) are applied here before anything is sent.
 */
import { microAlgo } from '@algorandfoundation/algokit-utils'
import type { SDKClient } from 'akita-sdk'
import { EMPTY_CID, ProposalActionEnum, SplitDistributionType, type ProposalAction, type Split } from 'akita-sdk/dao'
import type { RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING } from 'algosdk'
import type { ScriptContext } from '../script-base'
import { executeProposal, getAppFundingNeeded } from '../utils'
import { createPluginClient, DAO_STATE_FULLY_INITIALIZED } from './dao-wallet-plugin-migration'
import { comparesPowerInBaseUnits } from './power-units'

/** A share of 100% in the units the contracts store. */
export const SPLIT_DIVISOR = 100_000n
/** The most entries the RevenueManager accepts in one table. */
export const MAX_SPLITS = 10
export const REVENUE_SPLITS_KEY = 'revenue_splits'
const UNITS_PER_PERCENT = 1_000n
const PHASE_IDLE = 0

/** A wanted share: a DAO wallet escrow and its part of `SPLIT_DIVISOR`. */
export type Share = { escrow: string; value: bigint }
export type StoredSplit = { wallet: bigint; escrow: string; type: number; value: bigint }
export type ShareChange = { escrow: string; from?: bigint; to: bigint }
export type RevenueSplitPlan = { rows: ShareChange[]; changed: boolean; expected: StoredSplit[]; actions: ProposalAction<SDKClient>[] }
/** A receive escrow of the RevenueManager: whether it reads the DAO's table, and where its payout cycle stands. */
export type ReceiveEscrowStatus = { escrow: string; follows: boolean; ownSplit: boolean; phase: number }

/** A stored share as a percentage, without trailing zeros: 80000 is "80%", 12500 is "12.5%". */
export function percent(value: bigint): string {
  const fraction = (value % UNITS_PER_PERCENT).toString().padStart(3, '0').replace(/0+$/, '')
  return `${value / UNITS_PER_PERCENT}${fraction ? `.${fraction}` : ''}%`
}

/** Parse `rec_krby=80,rec_mod=5,rec_gov=15`: each share is a percentage with up to three decimals. */
export function parseShares(raw: string): Share[] {
  return raw.split(',').map((part) => {
    const [escrow, share, ...rest] = part.trim().split('=')
    if (!escrow || share === undefined || rest.length > 0 || !/^\d{1,3}(\.\d{1,3})?$/.test(share)) {
      throw new Error(`--split takes escrow=percent pairs, such as rec_krby=80,rec_mod=5,rec_gov=15 (got "${part.trim()}")`)
    }
    const [whole, fraction = ''] = share.split('.')
    return { escrow, value: BigInt(whole) * UNITS_PER_PERCENT + BigInt(fraction.padEnd(3, '0')) }
  })
}

/** What changes, and the proposal action that changes it. Pure: nothing is read or sent. */
export function planRevenueSplits(current: StoredSplit[], wanted: Share[], daoWallet: bigint): RevenueSplitPlan {
  if (wanted.length === 0) throw new Error('Name at least one share')
  if (wanted.length > MAX_SPLITS) throw new Error(`The RevenueManager accepts at most ${MAX_SPLITS} receivers (got ${wanted.length})`)
  const shares = new Map<string, bigint>()
  for (const { escrow, value } of wanted) {
    if (shares.has(escrow)) throw new Error(`"${escrow}" is named twice`)
    if (value <= 0n) throw new Error(`The share of "${escrow}" must be more than 0%: this step does not remove a receiver`)
    shares.set(escrow, value)
  }
  const total = wanted.reduce((sum, share) => sum + share.value, 0n)
  if (total !== SPLIT_DIVISOR) throw new Error(`The shares total ${percent(total)}, not 100%`)

  const today = current.map((split) => split.escrow)
  if (new Set(today).size !== today.length) throw new Error(`The stored table names a receiver twice (${today.join(', ')}); this step does not rewrite it`)
  for (const split of current) {
    if (split.type !== SplitDistributionType.Percentage) throw new Error(`The stored table pays "${split.escrow}" a flat amount or the remainder, not a percentage; this step does not rewrite it`)
    if (split.wallet !== daoWallet) throw new Error(`The stored table pays "${split.escrow}" on wallet ${split.wallet}, not the DAO wallet ${daoWallet}; this step does not rewrite it`)
  }
  if (current.length > 0 && (today.length !== shares.size || today.some((escrow) => !shares.has(escrow)))) {
    throw new Error(`The table pays ${today.join(', ')} today and this step changes shares only: name exactly those receivers (got ${[...shares.keys()].join(', ')})`)
  }

  // The stored order is kept: the last percentage entry takes the rounding remainder of every payout.
  const order = current.length > 0 ? today : [...shares.keys()]
  const expected: StoredSplit[] = order.map((escrow) => ({ wallet: daoWallet, escrow, type: SplitDistributionType.Percentage, value: shares.get(escrow)! }))
  const rows: ShareChange[] = expected.map((split) => ({ escrow: split.escrow, from: current.find((c) => c.escrow === split.escrow)?.value, to: split.value }))
  const changed = rows.some((row) => row.from !== row.to)
  const value: Split[] = expected.map((split) => ({ receiver: { wallet: split.wallet, escrow: split.escrow }, type: split.type, value: split.value }))
  const actions = changed ? [{ type: ProposalActionEnum.UpdateFields, field: REVENUE_SPLITS_KEY, value } as ProposalAction<SDKClient>] : []
  return { rows, changed, expected, actions }
}

/** The DAO's stored table; empty when the DAO holds none. */
export async function readRevenueSplits(ctx: ScriptContext): Promise<StoredSplit[]> {
  const stored = await ctx.dao.client.state.global.revenueSplits()
  return (stored ?? []).map(([[wallet, escrow], type, value]) => ({ wallet: BigInt(wallet), escrow, type: Number(type), value: BigInt(value) }))
}

/** How `actual` differs from `expected`, entry by entry; empty when they are the same table. */
export function splitDifferences(actual: StoredSplit[], expected: StoredSplit[]): string[] {
  const show = (split?: StoredSplit) => (split ? `${split.escrow} on wallet ${split.wallet}, type ${split.type}, value ${split.value}` : 'nothing')
  const out: string[] = []
  for (let i = 0; i < Math.max(actual.length, expected.length); i++) {
    if (show(actual[i]) !== show(expected[i])) out.push(`entry ${i + 1}: ${show(actual[i])}, expected ${show(expected[i])}`)
  }
  return out
}

/** The RevenueManager's receive escrows on the DAO wallet. `follows` means the escrow reads the DAO's table. */
export async function readReceiveEscrows(ctx: ScriptContext, daoWallet: bigint, sender: string): Promise<{ revenueManager: bigint; escrows: ReceiveEscrowStatus[] }> {
  const revenueManager = (await ctx.dao.client.state.global.pluginAppList())?.revenueManager ?? 0n
  if (revenueManager <= 0n) return { revenueManager: 0n, escrows: [] }
  const rm = createPluginClient('revenueManagerPlugin', ctx, revenueManager, sender) as unknown as RevenueManagerPluginSDK
  const [records, refs, own] = await Promise.all([
    rm.client.state.box.escrows.getMap(), rm.client.state.box.splitRefs.getMap(), rm.client.state.box.splits.getMap(),
  ])
  const id = (key: { wallet: bigint; escrow: string }) => `${key.wallet}/${key.escrow}`
  const following = new Set([...refs].filter(([, ref]) => ref.app === ctx.dao.appId && Buffer.from(ref.key).toString() === REVENUE_SPLITS_KEY).map(([key]) => id(key)))
  const direct = new Set([...own].map(([key]) => id(key)))
  const escrows = [...records].filter(([key]) => key.wallet === daoWallet)
    // A split stored on the escrow itself takes precedence over a reference.
    .map(([key, record]) => ({ escrow: key.escrow, ownSplit: direct.has(id(key)), follows: following.has(id(key)) && !direct.has(id(key)), phase: Number(record.phase) }))
    .sort((a, b) => a.escrow.localeCompare(b.escrow))
  return { revenueManager, escrows }
}

/**
 * Simulate the proposal's creation and execution as one group, as `sender`, on the chain as it is.
 * Nothing is sent. Throws with the DAO's own failure when it would reject either call.
 */
export async function simulateProposal(ctx: ScriptContext, sender: string, actions: ProposalAction<SDKClient>[], total: bigint, funding: bigint): Promise<bigint> {
  const prepared = await (ctx.dao as unknown as { prepProposalActions(a: ProposalAction<SDKClient>[]): Promise<never> }).prepProposalActions(actions)
  const proposalId = (await ctx.dao.client.state.global.proposalId()) ?? 0n
  const daoAddress = ctx.dao.client.appAddress.toString()
  const pay = (amount: bigint) => ctx.algorand.createTransaction.payment({ sender, receiver: daoAddress, amount: microAlgo(amount) })
  const group = ctx.dao.client.newGroup()
  if (funding > 0n) group.addTransaction(await pay(funding))
  group.newProposal({ sender, signer: ctx.signer, args: { payment: await pay(total), cid: EMPTY_CID, actions: prepared }, staticFee: microAlgo(257_000n) })
  group.executeProposal({ sender, signer: ctx.signer, args: { proposalId }, staticFee: microAlgo(1_000_000n) })
  try {
    await group.simulate({ skipSignatures: true, allowUnnamedResources: true })
  } catch (error) {
    throw new Error(`The DAO rejects this proposal in simulation: ${error instanceof Error ? error.message : String(error)}`)
  }
  return proposalId
}

/**
 * Plan the split change and, with `confirm`, send it as one DAO proposal and read the table back.
 * Returns the proposal id, or undefined when nothing was sent.
 */
export async function runRevenueSplits(ctx: ScriptContext, wanted: Share[],
  options: { confirm: boolean; sender?: string; log?: (line: string) => void }): Promise<{ plan: RevenueSplitPlan; proposalId?: bigint }> {
  const log = options.log ?? console.log
  const live = options.confirm && !ctx.options.dryRun
  const [before, state, daoApp, wallet] = await Promise.all([
    readRevenueSplits(ctx), ctx.dao.client.state.global.state(), ctx.algorand.client.algod.getApplicationByID(ctx.dao.appId).do(), ctx.dao.getWallet(),
  ])
  const creator = daoApp.params!.creator.toString()
  // A dry run that names no sender plans as the creator, the only account that can send this before initialize().
  const sender = live ? ctx.sender : ([options.sender, ctx.sender].find((address) => address && address !== ALGORAND_ZERO_ADDRESS_STRING) ?? creator)
  const plan = planRevenueSplits(before, wanted, wallet.appId)
  log(`Revenue split on ${ctx.options.network} (DAO ${ctx.dao.appId}, DAO wallet ${wallet.appId}):`)
  const walletEscrows = await wallet.getEscrows()
  for (const row of plan.rows) {
    if (!walletEscrows.has(row.escrow)) throw new Error(`The DAO wallet has no escrow "${row.escrow}", so a payout to it would fail; create it first: npm run create:dao-escrow -- --escrow ${row.escrow} --execute`)
    const change = row.from === undefined ? `new, ${percent(row.to)}` : row.from === row.to ? `already ${percent(row.to)}` : `${percent(row.from)} -> ${percent(row.to)}`
    log(`  ${row.escrow}: ${change}  (${row.from ?? 'unset'} -> ${row.to} of ${SPLIT_DIVISOR})`)
  }

  const { revenueManager, escrows } = await readReceiveEscrows(ctx, wallet.appId, sender)
  const following = escrows.filter((e) => e.follows)
  const apart = escrows.filter((e) => !e.follows)
  const open = following.filter((e) => e.phase !== PHASE_IDLE)
  if (revenueManager <= 0n) log('  The DAO names no RevenueManager yet, so nothing pays from this table.')
  else log(`  RevenueManager ${revenueManager}: ${following.length} revenue escrow(s) read this table${following.length ? ` (${following.map((e) => e.escrow).join(', ')})` : ''}.`)
  for (const e of apart) log(`  Note: "${e.escrow}" ${e.ownSplit ? 'holds its own split' : 'reads another table'} and is not changed by this step.`)
  for (const e of open) log(`  Note: "${e.escrow}" is in the middle of a payout cycle (phase ${e.phase}). The table is read at each allocation, so a cycle open across this change pays part at the old shares.`)

  if (!plan.changed) {
    log('Nothing to change.')
    return { plan }
  }

  const blockers = [
    Number(state ?? 0) === DAO_STATE_FULLY_INITIALIZED && 'The DAO is initialized: this needs a voted proposal, which this script does not drive',
    !comparesPowerInBaseUnits(daoApp.params!.approvalProgram) && 'The DAO is not upgraded yet; run rollout step B2 first',
    open.length > 0 && `A payout cycle is open on ${open.map((e) => e.escrow).join(', ')}; let it finish first`,
  ].filter((line): line is string => typeof line === 'string')
  if (live) {
    if (blockers.length > 0) throw new Error(blockers[0])
    if (sender !== creator) throw new Error(`Only the DAO creator ${creator} can create pre-initialization proposals (sender ${sender})`)
  }

  const cost = await ctx.dao.proposalCost({ sender, signer: ctx.signer, actions: plan.actions })
  // The proposal's own boxes are held by the DAO account; a creator's proposal on a Draft DAO is charged nothing for them.
  const funding = await getAppFundingNeeded(ctx.algorand, ctx.dao.client.appAddress.toString(), cost.total + cost.mbr, 1_000_000n)
  log(`  One UpdateFields action in one proposal: proposal fee ${cost.total} microAlgos, DAO storage ${cost.mbr} microAlgos, DAO funding shortfall ${funding} microAlgos.`)

  if (!live) {
    for (const line of blockers) log(`  Before --confirm: ${line}.`)
    if (sender !== creator) log(`  Not simulated: only the DAO creator ${creator} can create this proposal. Pass --sender ${creator} to simulate it.`)
    else if (Number(state ?? 0) === DAO_STATE_FULLY_INITIALIZED) log('  Not simulated: an initialized DAO executes a proposal only after its vote.')
    else {
      const proposalId = await simulateProposal(ctx, sender, plan.actions, cost.total, funding)
      log(`  Simulated as the creator against the DAO program live now: proposal ${proposalId} is created and executed without error.`)
    }
    log(`${ctx.options.dryRun ? 'DRY RUN' : 'PLAN ONLY'}: nothing was sent. Pass --confirm to create and execute the proposal.`)
    return { plan }
  }

  if (funding > 0n) await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: ctx.dao.client.appAddress, amount: microAlgo(funding) })
  const { return: proposalId } = await ctx.dao.newProposal({ actions: plan.actions })
  if (proposalId === undefined) throw new Error('The DAO returned no proposal id')
  await executeProposal(ctx.dao, proposalId)
  const differences = splitDifferences(await readRevenueSplits(ctx), plan.expected)
  if (differences.length > 0) throw new Error(`Proposal ${proposalId} executed, but the table read back differs: ${differences.join('; ')}`)
  log(`Proposal ${proposalId} executed. The table was read back and matches: ${plan.expected.map((split) => `${split.escrow} ${percent(split.value)}`).join(', ')}.`)
  return { plan, proposalId }
}
