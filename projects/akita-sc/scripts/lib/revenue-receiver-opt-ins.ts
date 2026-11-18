/**
 * Rollout step G3b: the receivers of the revenue split must hold every asset the revenue escrows pay
 * out, before the split keeper runs.
 *
 * A payout sends each receiver its share of ALGO whatever it holds, but skips an asset share whose
 * receiver has not opted in to that asset and leaves it in the revenue escrow. The next payout divides
 * what was left again, so a receiver that has not opted in loses its share to the ones that have,
 * cycle after cycle. All receivers therefore opt in together, before the first payout.
 *
 * The assets wanted are those a revenue escrow is registered to pay out and holds a balance of. An
 * asset that is registered but held by none of them has nothing to pay out, so it needs no opt-in yet;
 * `--asset` adds one ahead of its first payment.
 *
 * The receivers are escrows of the DAO wallet that carry a global OptInPlugin grant, so any funded
 * account can send the opt-ins and pays the 0.1 ALGO minimum balance of each. The plugin acts on the
 * escrow through the wallet's plugin rekey, which an escrow lock does not stop. Assets a receiver
 * already holds are skipped, so a rerun only finishes what is left.
 */
import { microAlgo } from '@algorandfoundation/algokit-utils'
import type { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
import { prepareGroup } from 'akita-sdk'
import { CallerType, type OptInPluginSDK, type RevenueManagerPluginSDK } from 'akita-sdk/wallet'
import { ALGORAND_ZERO_ADDRESS_STRING, makeEmptyTransactionSigner } from 'algosdk'
import type { ScriptContext } from '../script-base'
import { createPluginClient } from './dao-wallet-plugin-migration'
import { readReceiveEscrows, readRevenueSplits } from './revenue-splits'

/** The minimum balance one asset holding adds to an account. */
export const ASSET_OPT_IN_MBR = 100_000n
/** Assets per opt-in group: each is one inner transaction and one asset reference. */
const ASSETS_PER_GROUP = 4
const MAX_APP_CALL_FEE = 272_000n

export type ReceiverOptIns = { escrow: string; address: string; locked: boolean; granted: boolean; missing: bigint[] }
export type ReceiverOptInPlan = {
  optInPlugin: bigint
  revenueManager: bigint
  /** Assets a revenue escrow is registered to pay out and holds a balance of, plus any asked for by hand, ascending. */
  wanted: bigint[]
  /** Registered assets that no revenue escrow holds any of: there is nothing to pay out, so no opt-in yet. */
  unheld: bigint[]
  receivers: ReceiverOptIns[]
}
type Wallet = Awaited<ReturnType<ScriptContext['dao']['getWallet']>>

const ascending = (a: bigint, b: bigint) => (a < b ? -1 : a > b ? 1 : 0)

/** The wanted assets `held` lacks, in ascending order. Pure. */
export function missingAssets(wanted: readonly bigint[], held: readonly bigint[]): bigint[] {
  return [...new Set(wanted)].filter((asset) => !held.includes(asset)).sort(ascending)
}

async function holdings(ctx: ScriptContext, address: string): Promise<{ asset: bigint; amount: bigint }[]> {
  const info = await ctx.algorand.client.algod.accountInformation(address).do()
  return (info.assets ?? []).map((holding) => ({ asset: BigInt(holding.assetId), amount: BigInt(holding.amount) }))
}

/** Which assets each receiver of the DAO's split table still has to opt in to. Reads only. */
export async function planReceiverOptIns(ctx: ScriptContext, extra: readonly bigint[] = [], sender = ctx.sender): Promise<ReceiverOptInPlan> {
  const [table, wallet, pluginList] = await Promise.all([readRevenueSplits(ctx), ctx.dao.getWallet(), ctx.dao.client.state.global.pluginAppList()])
  if (table.length === 0) throw new Error('The DAO holds no revenue split table, so there are no receivers to opt in')
  const outside = table.filter((split) => split.wallet !== wallet.appId)
  if (outside.length > 0) throw new Error(`The split table pays ${outside.map((s) => `"${s.escrow}" on wallet ${s.wallet}`).join(', ')}, which is not an escrow of the DAO wallet ${wallet.appId}; this step cannot opt it in`)
  const optInPlugin = pluginList?.optin ?? 0n
  if (optInPlugin <= 0n) throw new Error('The DAO pluginAppList names no OptIn plugin')

  const [grants, walletEscrows] = await Promise.all([wallet.client.state.box.plugins.getMap().then((map) => [...map]), wallet.getEscrows()])

  // Only an asset registered with the RevenueManager for an escrow can be paid out of it, and a payout
  // moves a balance: an asset is wanted once a revenue escrow that reads the table holds some of it.
  const { revenueManager, escrows } = await readReceiveEscrows(ctx, wallet.appId, sender)
  const following = new Set(escrows.filter((e) => e.follows).map((e) => e.escrow))
  const registered = new Map<string, Set<bigint>>()
  if (revenueManager > 0n) {
    const rm = createPluginClient('revenueManagerPlugin', ctx, revenueManager, sender) as unknown as RevenueManagerPluginSDK
    for (const [key] of await rm.client.state.box.managedAssets.getMap()) {
      if (key.wallet !== wallet.appId || !following.has(key.escrow)) continue
      registered.set(key.escrow, (registered.get(key.escrow) ?? new Set()).add(key.asset))
    }
  }
  const held = new Set<bigint>()
  for (const [escrow, assets] of registered) {
    const info = walletEscrows.get(escrow)
    if (!info) continue
    for (const { asset, amount } of await holdings(ctx, info.address.toString())) if (amount > 0n && assets.has(asset)) held.add(asset)
  }
  for (const asset of extra) {
    await ctx.algorand.client.algod.getAssetByID(asset).do().catch(() => { throw new Error(`--asset ${asset} is not an asset on ${ctx.options.network}`) })
  }
  const managed = [...new Set([...registered.values()].flatMap((assets) => [...assets]))]
  const wanted = [...new Set([...managed.filter((asset) => held.has(asset)), ...extra])].sort(ascending)
  const unheld = managed.filter((asset) => !wanted.includes(asset)).sort(ascending)

  const receivers: ReceiverOptIns[] = []
  for (const { escrow } of table) {
    const info = walletEscrows.get(escrow)
    if (!info) throw new Error(`The split table pays "${escrow}", but the DAO wallet has no such escrow`)
    const address = info.address.toString()
    const granted = grants.some(([key]) => key.plugin === optInPlugin && key.caller === ALGORAND_ZERO_ADDRESS_STRING && key.escrow === escrow)
    receivers.push({ escrow, address, locked: info.locked, granted, missing: missingAssets(wanted, (await holdings(ctx, address)).map((h) => h.asset)) })
  }
  return { optInPlugin, revenueManager, wanted, unheld, receivers }
}

const optInCall = (ctx: ScriptContext, plugin: bigint, sender: string, assets: bigint[]) =>
  (createPluginClient('optinPlugin', ctx, plugin, sender) as unknown as OptInPluginSDK).optIn({ sender, signer: ctx.signer, assets })

/** Build and simulate one opt-in group as `sender`, the way the wallet SDK does before it sends. Nothing is sent. */
async function simulateOptIn(ctx: ScriptContext, wallet: Wallet, plugin: bigint, sender: string, escrow: string, assets: bigint[]): Promise<void> {
  const { group } = await wallet.prepareUsePlugin({ sender, signer: ctx.signer, callerType: CallerType.Global, escrow, calls: [optInCall(ctx, plugin, sender, assets)] })
  const composer = await group.composer()
  // Covering inner-transaction fees needs a ceiling on every app call; the wallet SDK sets the same one.
  for (const txn of (composer as unknown as { txns: { type: string; maxFee?: AlgoAmount }[] }).txns) {
    if ((txn.type === 'appCall' || txn.type === 'methodCall') && txn.maxFee === undefined) txn.maxFee = microAlgo(MAX_APP_CALL_FEE)
  }
  await prepareGroup(composer, { signer: makeEmptyTransactionSigner() })
}

/**
 * Plan the receivers' opt-ins and, with `confirm`, send them and read the holdings back.
 * Returns how many opt-ins were sent.
 */
export async function runReceiverOptIns(ctx: ScriptContext,
  options: { assets?: readonly bigint[]; confirm: boolean; sender?: string; log?: (line: string) => void }): Promise<{ plan: ReceiverOptInPlan; optedIn: number }> {
  const log = options.log ?? console.log
  const live = options.confirm && !ctx.options.dryRun
  const sender = live ? ctx.sender : (options.sender ?? ctx.sender)
  const plan = await planReceiverOptIns(ctx, options.assets ?? [], sender)
  const names = new Map<bigint, string>()
  for (const asset of [...plan.wanted, ...plan.unheld]) names.set(asset, (await ctx.algorand.client.algod.getAssetByID(asset).do()).params?.unitName ?? '')
  const show = (asset: bigint) => (names.get(asset) ? `${asset} (${names.get(asset)})` : `${asset}`)
  log(`Revenue receivers on ${ctx.options.network} (DAO ${ctx.dao.appId}, OptIn plugin ${plan.optInPlugin}):`)
  log(`  Assets the revenue escrows hold and pay out${options.assets?.length ? ', plus --asset' : ''}: ${plan.wanted.map(show).join(', ') || 'none'}`)
  if (plan.unheld.length > 0) log(`  Registered but held by no revenue escrow, so not needed yet: ${plan.unheld.map(show).join(', ')}. Pass --asset to opt in ahead of a first payment.`)
  for (const r of plan.receivers) {
    log(`  ${r.escrow} (${r.address}${r.locked ? ', locked' : ''}): ${r.missing.length ? `opt in to ${r.missing.map(show).join(', ')}` : 'holds every one'}`)
  }
  const pending = plan.receivers.filter((r) => r.missing.length > 0)
  const total = pending.reduce((sum, r) => sum + r.missing.length, 0)
  if (total === 0) {
    log('Nothing to do.')
    return { plan, optedIn: 0 }
  }
  const ungranted = pending.filter((r) => !r.granted)
  if (ungranted.length > 0) {
    throw new Error(`The DAO wallet holds no global grant of OptIn plugin ${plan.optInPlugin} on ${ungranted.map((r) => r.escrow).join(', ')}; a DAO proposal has to add it before anyone can opt that escrow in`)
  }
  log(`  ${total} opt-in(s): the sender pays ${ASSET_OPT_IN_MBR * BigInt(total)} microAlgos of minimum balance, held by the receivers, plus fees.`)

  const wallet = await ctx.dao.getWallet()
  const groups = pending.flatMap((r) => Array.from({ length: Math.ceil(r.missing.length / ASSETS_PER_GROUP) },
    (_, i) => ({ escrow: r.escrow, assets: r.missing.slice(i * ASSETS_PER_GROUP, (i + 1) * ASSETS_PER_GROUP) })))
  if (!live) {
    if (sender === ALGORAND_ZERO_ADDRESS_STRING) log('  Not simulated: pass --sender <a funded address> to simulate the opt-ins.')
    else {
      for (const { escrow, assets } of groups) {
        await simulateOptIn(ctx, wallet, plan.optInPlugin, sender, escrow, assets).catch((error) => {
          throw new Error(`Opting "${escrow}" in to ${assets.join(', ')} fails in simulation as ${sender}: ${error instanceof Error ? error.message : String(error)}`)
        })
      }
      log(`  Simulated as ${sender} against the programs live now: ${groups.length} group(s) pass.`)
    }
    log(`${ctx.options.dryRun ? 'DRY RUN' : 'PLAN ONLY'}: nothing was sent. Pass --confirm to send the opt-ins.`)
    return { plan, optedIn: 0 }
  }

  for (const { escrow, assets } of groups) {
    await wallet.usePlugin({ sender: ctx.sender, signer: ctx.signer, callerType: CallerType.Global, escrow, consolidateFees: true,
      calls: [optInCall(ctx, plan.optInPlugin, ctx.sender, assets)] })
    log(`  ${escrow} opted in to ${assets.map(show).join(', ')}`)
  }
  const after = await planReceiverOptIns(ctx, options.assets ?? [], sender)
  const still = after.receivers.filter((r) => r.missing.length > 0)
  if (still.length > 0) throw new Error(`Still not opted in: ${still.map((r) => `${r.escrow} lacks ${r.missing.join(', ')}`).join('; ')}`)
  log(`Verified: ${plan.receivers.map((r) => r.escrow).join(', ')} each hold every asset the revenue escrows hold and pay out.`)
  return { plan, optedIn: total }
}
