/**
 * Service apps whose own account has to hold ALGO before they work (docs/rollout/MAINNET-ROLLOUT.md, E6a).
 *
 * HyperSwap, PrizeBoxFactory and PollFactory charge a caller exactly the storage a call adds. The
 * account's own 0.1 ALGO minimum is not part of that charge, so while the account is empty every offer,
 * mint and poll fails with a balance below the minimum. AkitaSocialModeration takes no payment at all:
 * it pays for its moderator, ban, action and activity boxes from its own balance, so it also needs a float.
 *
 * Read-only apart from `sendServiceFunding`, which sends one plain payment per account that is short.
 */
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import type { ScriptContext } from '../script-base'

/** Free ALGO the moderation app is brought up to: about forty moderator, ban or activity boxes. */
export const DEFAULT_MODERATION_FLOAT = 1_000_000n
/** Below this the moderation app cannot store one more moderator with its activity record (18,900 + 25,300). */
export const MODERATION_MIN_FREE = 44_200n

export const SERVICE_ACCOUNTS: readonly { name: string; appIdKey: string; float: 'none' | 'moderation' }[] = [
  { name: 'HyperSwap', appIdKey: 'hyperSwap', float: 'none' },
  { name: 'PrizeBoxFactory', appIdKey: 'prizeBoxFactory', float: 'none' },
  { name: 'PollFactory', appIdKey: 'pollFactory', float: 'none' },
  { name: 'AkitaSocialModeration', appIdKey: 'socialModeration', float: 'moderation' },
]

export type ServiceFunding = {
  name: string
  appId: bigint
  address: string
  balance: bigint
  minBalance: bigint
  /** ALGO above the minimum balance (0 while the account is below it). */
  free: bigint
  /** What one payment has to add to reach the minimum balance plus the float. */
  shortfall: bigint
  /** True once the app can do its work: at its minimum, and for the moderation app with room for a box. */
  working: boolean
}

export async function planServiceFunding(ctx: ScriptContext, moderationFloat: bigint = DEFAULT_MODERATION_FLOAT): Promise<ServiceFunding[]> {
  const plans: ServiceFunding[] = []
  for (const account of SERVICE_ACCOUNTS) {
    const appId = (ctx.appIds as unknown as Record<string, bigint | undefined>)[account.appIdKey]
    if (!appId) throw new Error(`${account.name}: the SDK holds no ${account.appIdKey} app id for ${ctx.options.network}`)
    const address = algosdk.getApplicationAddress(appId).toString()
    const info = await ctx.algorand.client.algod.accountInformation(address).do()
    const balance = BigInt(info.amount)
    const minBalance = BigInt(info.minBalance)
    const free = balance > minBalance ? balance - minBalance : 0n
    const float = account.float === 'moderation' ? moderationFloat : 0n
    const target = minBalance + float
    plans.push({
      name: account.name,
      appId,
      address,
      balance,
      minBalance,
      free,
      shortfall: target > balance ? target - balance : 0n,
      working: balance >= minBalance && (account.float === 'none' || free >= MODERATION_MIN_FREE),
    })
  }
  return plans
}

export function describeServiceFunding(plans: readonly ServiceFunding[]): string[] {
  return plans.map((p) => `${p.name} ${p.appId}: holds ${p.balance} µALGO, minimum ${p.minBalance}, free ${p.free}` +
    (p.shortfall > 0n ? `; needs ${p.shortfall}` : '; nothing to send'))
}

/** Sends one plain payment to every account that is short. Returns the total sent. */
export async function sendServiceFunding(ctx: ScriptContext, plans: readonly ServiceFunding[], log: (line: string) => void = console.log): Promise<bigint> {
  let total = 0n
  for (const p of plans) {
    if (p.shortfall === 0n) continue
    await ctx.algorand.send.payment({ sender: ctx.sender, signer: ctx.signer, receiver: p.address, amount: microAlgo(p.shortfall) })
    log(`  sent ${p.shortfall} µALGO to ${p.name} ${p.appId}`)
    total += p.shortfall
  }
  return total
}
