import { Account, Application, Global, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall } from '@algorandfoundation/algorand-typescript/arc4'
import { getAkitaAppList, legacyWalletOf, legacyOriginOr } from '../../../utils/functions'
import { SubscriptionGraceMax } from './constants'

// CONTRACT IMPORTS
import type { Subscriptions } from '../../../subscriptions/contract.algo'

export type ActiveSubscription = {
  active: boolean
  streak: uint64
}

/**
 * LEGACY (EscrowFactory registry read; used only by the plain `check(caller, ...)` of the
 * subscription sub-gates, delete in Phase 4). Context-aware callers use `checkFor` + `ctxOwnsOf`.
 * True if `caller` is the gate subject that owns `subscriber`: either the same account, or
 * the authenticated origin of the Akita wallet that `subscriber` (wallet app address or one
 * of its escrows) belongs to.
 */
export function subscriberControlledBy(akitaDAO: Application, subscriber: Account, caller: Account): boolean {
  if (subscriber === caller) {
    return true
  }
  const wallet = legacyWalletOf(akitaDAO, subscriber)
  if (wallet.id === 0) {
    return false
  }
  return legacyOriginOr(wallet, subscriber) === caller
}

/**
 * Whether a subscription is paid up now: paid in the current window, or paid in the previous window
 * while the current window is younger than the grace, `min(SubscriptionGraceMax, interval / 4)`.
 * Uses the window boundaries `Subscriptions` uses for `canTrigger` and the streak.
 */
export function subscriptionPaidUp(startDate: uint64, interval: uint64, lastPayment: uint64): boolean {
  if (interval === 0 || startDate > Global.latestTimestamp) {
    return false
  }
  const currentWindowStart: uint64 = Global.latestTimestamp - ((Global.latestTimestamp - startDate) % interval)
  if (lastPayment >= currentWindowStart) {
    return true
  }
  const previousWindowStart: uint64 = currentWindowStart >= interval ? currentWindowStart - interval : 0
  const quarter: uint64 = interval / 4
  const grace: uint64 = quarter < SubscriptionGraceMax ? quarter : SubscriptionGraceMax
  return lastPayment >= previousWindowStart && Global.latestTimestamp < currentWindowStart + grace
}

/**
 * Whether `subscriber`'s subscription `id` is a live subscription to `merchant`'s service
 * `serviceID`: right service (never a donation), service not shut down, and paid up
 * (`subscriptionPaidUp`). Never panics (missing subscriptions return inactive).
 */
export function getActiveSubscription(
  akitaDAO: Application,
  subscriber: Account,
  id: uint64,
  merchant: Account,
  serviceID: uint64
): ActiveSubscription {
  const subscriptionsApp = getAkitaAppList(akitaDAO).subscriptions

  const info = abiCall<typeof Subscriptions.prototype.getSubscription>({
    appId: subscriptionsApp,
    args: [{ address: subscriber, id }],
  }).returnValue

  if (
    !info.exists ||
    serviceID === 0 ||
    info.serviceID !== serviceID ||
    info.recipient !== merchant ||
    info.interval === 0 ||
    info.startDate > Global.latestTimestamp
  ) {
    return { active: false, streak: 0 }
  }

  const shutdown = abiCall<typeof Subscriptions.prototype.isShutdown>({
    appId: subscriptionsApp,
    args: [merchant, serviceID],
  }).returnValue

  if (shutdown) {
    return { active: false, streak: 0 }
  }

  return { active: subscriptionPaidUp(info.startDate, info.interval, info.lastPayment), streak: info.streak }
}
