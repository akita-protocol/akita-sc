/**
 * The storage reserve of the services that already exist, before the Subscriptions upgrade of rollout
 * step E2 (audit 07, SUB-02).
 *
 * The deployed program charges 62,500 microAlgo for a service box that starts at 168 bytes and may grow
 * to 3,441. The upgraded program charges the whole reserve (`ServicesMBR`) when a service is created, so
 * its two setters take no payment, and a service created before the upgrade can grow to the maximum for
 * nothing. Every byte of that growth raises the app's minimum balance, and what pays for it is the app's
 * free balance, which is where subscribers' escrowed ALGO sits. A merchant could therefore block every
 * withdrawal, unsubscribe and ALGO renewal until the text is shrunk again.
 *
 * So before E2 the app is given what the existing services could still take: for each service box, the
 * reserve less what that box already holds. The check then is the one the audit asked for:
 *
 *   (balance − minimum balance) ≥ Σ ALGO escrow + Σ (ServicesMBR − MBR of each service box)
 *
 * Read-only; the caller sends the payment.
 */
import algosdk from 'algosdk'
import { microAlgo } from '@algorandfoundation/algokit-utils'
import type { ScriptContext } from '../script-base'

/** `SubscriptionsBoxPrefixServices`: one box per service, keyed by merchant and id. */
export const SERVICES_PREFIX = 'o'
/** `SubscriptionsBoxPrefixSubscriptions`: one box per subscription. */
export const SUBSCRIPTIONS_PREFIX = 's'
/** `ServicesMBR`: what the upgraded program reserves for one service box (its maximum size). */
export const SERVICES_MBR = 1_378_900n

/** Minimum balance of a box: 2,500 + 400 per byte of key and value. */
export const boxMbr = (keyBytes: number, valueBytes: number): bigint => 2_500n + 400n * BigInt(keyBytes + valueBytes)

export type ServiceBox = { key: Uint8Array; bytes: number; mbr: bigint; owed: bigint }

export type ServiceReservePlan = {
  appId: bigint
  address: string
  balance: bigint
  minBalance: bigint
  /** ALGO above the minimum balance. */
  free: bigint
  services: ServiceBox[]
  /** Σ (ServicesMBR − MBR of each service box): what the existing services could still take for free. */
  reserveOwed: bigint
  /** Σ escrowed ALGO of every subscription: what subscribers can withdraw. */
  algoEscrow: bigint
  /** What one payment has to add so the free balance covers both. */
  shortfall: bigint
}

/**
 * `SubscriptionInfo` as the contract declares it (`smart_contracts/subscriptions/types.ts`): `recipient`
 * is a 32-byte address and the nine fields after it are uint64, in this order. The test asserts this
 * list against the struct, because reading `asset` at the wrong offset silently skips ALGO escrow.
 */
export const SUBSCRIPTION_FIELDS = [
  'serviceID',
  'startDate',
  'amount',
  'interval',
  'asset',
  'gateID',
  'lastPayment',
  'streak',
  'escrowed',
] as const

/** Byte offset of one uint64 field of a `SubscriptionInfo` box value. */
export const subscriptionOffset = (field: (typeof SUBSCRIPTION_FIELDS)[number]): number =>
  32 + 8 * SUBSCRIPTION_FIELDS.indexOf(field)

/** Bytes of a `SubscriptionInfo` box value. */
export const SUBSCRIPTION_BYTES = 32 + 8 * SUBSCRIPTION_FIELDS.length
const ASSET_OFFSET = subscriptionOffset('asset')
const ESCROWED_OFFSET = subscriptionOffset('escrowed')

/** The ALGO a subscription box holds in escrow. `asset` 0 means the escrow is ALGO. */
export function readAlgoEscrow(value: Uint8Array): bigint {
  if (value.length !== SUBSCRIPTION_BYTES) return 0n
  const view = new DataView(value.buffer, value.byteOffset, value.byteLength)
  const asset = view.getBigUint64(ASSET_OFFSET)
  return asset === 0n ? view.getBigUint64(ESCROWED_OFFSET) : 0n
}

/** Every box of the app whose key starts with `prefix`, with its value. */
async function boxes(ctx: ScriptContext, appId: bigint, prefix: string): Promise<{ key: Uint8Array; value: Uint8Array }[]> {
  const algod = ctx.algorand.client.algod
  const round = Number((await algod.status().do()).lastRound)
  const names: Uint8Array[] = []
  let next: string | undefined
  for (let page = 0; page < 1_000; page++) {
    const response = await algod.getApplicationBoxes(appId)
      .prefix(Buffer.from(prefix)).limit(1_000).round(round).next(next).do()
    for (const box of response.boxes) names.push(box.name)
    next = response.nextToken
    if (!next || response.boxes.length === 0) break
  }
  if (next) throw new Error(`App ${appId} has more "${prefix}" boxes than this check reads`)
  const out: { key: Uint8Array; value: Uint8Array }[] = []
  for (const key of names) {
    const box = await algod.getApplicationBoxByName(appId, key).do()
    out.push({ key, value: box.value })
  }
  return out
}

export async function planServiceReserve(ctx: ScriptContext, appId: bigint): Promise<ServiceReservePlan> {
  const address = algosdk.getApplicationAddress(appId).toString()
  const info = await ctx.algorand.client.algod.accountInformation(address).do()
  const balance = BigInt(info.amount)
  const minBalance = BigInt(info.minBalance)

  const services = (await boxes(ctx, appId, SERVICES_PREFIX)).map(({ key, value }) => {
    const mbr = boxMbr(key.length, value.length)
    return { key, bytes: value.length, mbr, owed: mbr >= SERVICES_MBR ? 0n : SERVICES_MBR - mbr }
  })
  const algoEscrow = (await boxes(ctx, appId, SUBSCRIPTIONS_PREFIX))
    .reduce((sum, { value }) => sum + readAlgoEscrow(value), 0n)

  const reserveOwed = services.reduce((sum, s) => sum + s.owed, 0n)
  const free = balance > minBalance ? balance - minBalance : 0n
  const needed = reserveOwed + algoEscrow
  return { appId, address, balance, minBalance, free, services, reserveOwed, algoEscrow, shortfall: needed > free ? needed - free : 0n }
}

export function describeServiceReserve(plan: ServiceReservePlan): string[] {
  const lines = [
    `Subscriptions ${plan.appId}: holds ${plan.balance} µALGO, minimum ${plan.minBalance}, free ${plan.free}`,
    `  ${plan.services.length} service box(es): ${plan.services.map((s) => `${s.bytes} B owes ${s.owed}`).join(', ') || 'none'}`,
    `  reserve the existing services could still take: ${plan.reserveOwed} µALGO`,
    `  ALGO subscribers hold in escrow: ${plan.algoEscrow} µALGO`,
  ]
  lines.push(plan.shortfall > 0n
    ? `  send ${plan.shortfall} µALGO before the upgrade (E2), or a merchant can block every withdrawal and renewal (SUB-02)`
    : '  the free balance covers both; nothing to send')
  return lines
}

/** Sends the shortfall as one plain payment. Returns what was sent. */
export async function sendServiceReserve(
  ctx: ScriptContext,
  plan: ServiceReservePlan,
  log: (line: string) => void = console.log,
): Promise<bigint> {
  if (plan.shortfall === 0n) return 0n
  await ctx.algorand.send.payment({
    sender: ctx.sender,
    signer: ctx.signer,
    receiver: plan.address,
    amount: microAlgo(plan.shortfall),
  })
  log(`  sent ${plan.shortfall} µALGO to Subscriptions ${plan.appId}`)
  return plan.shortfall
}
