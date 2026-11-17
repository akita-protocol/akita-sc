/**
 * Rollout step D2: the new Rewards app must hold every asset the old one pays out before the DAO's
 * `aal.rewards` moves to it. A disbursement in an asset the app has not opted in to reverts, and every
 * service resolves Rewards through `aal.rewards` at call time, so a cutover with an opt-in missing
 * stops that asset's rewards everywhere at once.
 *
 * `Rewards.optIn(payment, asset)` is open to anyone and costs the 0.1 ALGO asset minimum each.
 */
import algosdk from 'algosdk'
import { RewardsSDK } from 'akita-sdk/rewards'
import type { ScriptContext } from '../script-base'

type ReadContext = Pick<ScriptContext, 'algorand'>

export type RewardsOptInPlan = {
  from: bigint
  to: bigint
  /** Assets the old app holds, plus any asked for by hand, in ascending order. */
  wanted: bigint[]
  /** The wanted assets the new app does not hold yet. */
  missing: bigint[]
}

/** Ids of the assets an app's account is opted in to. */
export async function heldAssets(ctx: ReadContext, appId: bigint): Promise<bigint[]> {
  const info = await ctx.algorand.client.algod.accountInformation(algosdk.getApplicationAddress(appId)).do()
  return (info.assets ?? []).map((holding) => BigInt(holding.assetId)).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
}

export async function planRewardsOptIns(ctx: ReadContext, from: bigint, to: bigint, extra: readonly bigint[] = []): Promise<RewardsOptInPlan> {
  if (to <= 0n) throw new Error('The new Rewards app id is required')
  if (from === to) throw new Error(`Rewards ${to} is both the old and the new app; name the old one with --from`)
  const [old, current] = await Promise.all([from > 0n ? heldAssets(ctx, from) : Promise.resolve([]), heldAssets(ctx, to)])
  const wanted = [...new Set([...old, ...extra])].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  return { from, to, wanted, missing: wanted.filter((asset) => !current.includes(asset)) }
}

/** Opts the new app in to every missing asset, one group each, and reads the holdings back. */
export async function runRewardsOptIns(ctx: ScriptContext, plan: RewardsOptInPlan, log: (line: string) => void = console.log): Promise<bigint[]> {
  const rewards = new RewardsSDK({ algorand: ctx.algorand, factoryParams: { appId: plan.to, defaultSender: ctx.sender, defaultSigner: ctx.signer } })
  for (const asset of plan.missing) {
    await rewards.optIn({ sender: ctx.sender, signer: ctx.signer, asset })
    log(`  Rewards ${plan.to} opted in to asset ${asset}`)
  }
  const after = await heldAssets(ctx, plan.to)
  const still = plan.wanted.filter((asset) => !after.includes(asset))
  if (still.length > 0) throw new Error(`Rewards ${plan.to} still lacks asset(s) ${still.join(', ')}`)
  return plan.missing
}

/**
 * Throws unless the new Rewards app holds every asset the old one holds. `deploy:rewards --register`
 * calls this before it repoints `aal.rewards`.
 */
export async function assertRewardsOptedIn(ctx: ReadContext, from: bigint, to: bigint): Promise<void> {
  if (from <= 0n || from === to) return
  const { missing } = await planRewardsOptIns(ctx, from, to)
  if (missing.length > 0) {
    throw new Error(`Rewards ${to} is not opted in to ${missing.length} asset(s) that Rewards ${from} holds (${missing.join(', ')}). ` +
      'Run `npm run rewards:opt-in` with the same --manifest first; pass --allow-missing-opt-ins only if those assets are retired')
  }
}
