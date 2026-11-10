import { Account, Application, Bytes, Global, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import {
  ARC58_CONTROLLED_ADDRESS_KEY,
  ARC58_ERR_PLUGIN_NOT_AUTH_ADDR,
  ARC58_REFERRER_KEY,
  ARC58_SPENDING_ADDRESS_KEY,
} from './constants'
import { Arc58Accounts } from './types'

/**
 * Gets the spending account (the rekeyed address) from the ARC-58 wallet.
 * This is the account that your plugin should use as `sender` for inner transactions.
 *
 * @param wallet - The ARC-58 wallet Application passed as the first arg to your plugin method
 * @returns The account that has been rekeyed to your plugin
 */
export function getSpendingAccount(wallet: Application): Account {
  const [spendingAddressBytes] = op.AppGlobal.getExBytes(
    wallet,
    Bytes(ARC58_SPENDING_ADDRESS_KEY)
  )
  return Account(Bytes(spendingAddressBytes))
}

/**
 * Like `getSpendingAccount`, but also asserts that the spending account is currently rekeyed to
 * this plugin. The `wallet` argument is caller-supplied, so a fake app can point
 * `spending_address` at any account; with this check, an account the plugin does not control
 * (such as the plugin's own, never-rekeyed app account) fails with `ERR:errNath`.
 *
 * Prefer this over `getSpendingAccount` whenever the plugin spends from the account.
 *
 * @param wallet - The ARC-58 wallet Application passed as the first arg to your plugin method
 * @returns The spending account, guaranteed to be rekeyed to this plugin
 */
export function getControlledSpendingAccount(wallet: Application): Account {
  const sender = getSpendingAccount(wallet)
  loggedAssert(sender.authAddress === Global.currentApplicationAddress, ARC58_ERR_PLUGIN_NOT_AUTH_ADDR)
  return sender
}

/**
 * Checks that `wallet` is a genuine Akita ARC-58 wallet: it exists and was created by
 * `walletFactory` (the DAO-registered ARC-58 wallet factory). Use this before trusting values
 * read from a caller-supplied wallet (origin, referrer) for identity or gating decisions.
 *
 * @param wallet - The wallet Application to check
 * @param walletFactory - The ARC-58 wallet factory application
 * @returns True if the wallet was created by the factory
 */
export function isAkitaWallet(wallet: Application, walletFactory: Application): boolean {
  const walletId: uint64 = wallet.id
  if (walletId === 0 || walletFactory.id === 0) {
    return false
  }
  const [creator, exists] = op.AppParams.appCreator(wallet)
  return exists && creator === walletFactory.address
}

/**
 * Gets the wallet's raw `controlled_address` global.
 *
 * DISPLAY ONLY, NOT IDENTITY. The value is self-declared by the wallet app (an admin can update a
 * wallet to arbitrary code) and says nothing about whether the wallet still controls the account.
 * For identity, gates, referrals or stored ownership use `pluginPrincipal` (inside a plugin window)
 * or `resolvePrincipal` (in a target contract) from `./principal`.
 *
 * @param wallet - The ARC-58 wallet Application
 * @returns The wallet's claimed controlled address
 */
export function getOriginAccount(wallet: Application): Account {
  const [controlledAccountBytes] = op.AppGlobal.getExBytes(
    wallet,
    Bytes(ARC58_CONTROLLED_ADDRESS_KEY)
  )
  return Account(Bytes(controlledAccountBytes))
}

/**
 * Gets the referrer account associated with the ARC-58 wallet.
 *
 * DISPLAY ONLY, NOT IDENTITY: self-asserted by the wallet. Pay referrals only to the `referrer` of a
 * principal resolved with `resolvePrincipal` / `pluginPrincipal` (genuine wallet, verified context).
 *
 * @param wallet - The ARC-58 wallet Application
 * @returns The referrer account, or zero address if none set
 */
export function getReferrerAccount(wallet: Application): Account {
  const [referrerBytes] = op.AppGlobal.getExBytes(
    wallet,
    Bytes(ARC58_REFERRER_KEY)
  )
  return Account(Bytes(referrerBytes))
}

/**
 * Gets all relevant accounts from the ARC-58 wallet in a single call.
 *
 * `origin` and `referrer` are DISPLAY ONLY, NOT IDENTITY (see `getOriginAccount`). For gate
 * subjects and referrals use `pluginPrincipal(wallet, walletFactory)`.
 *
 * @param wallet - The ARC-58 wallet Application
 * @returns Object containing walletAddress, origin, sender, and referrer accounts
 */
export function getAccounts(wallet: Application): Arc58Accounts {
  const origin = getOriginAccount(wallet)
  const sender = getSpendingAccount(wallet)
  const referrer = getReferrerAccount(wallet)
  return {
    walletAddress: wallet.address,
    origin,
    sender,
    referrer,
  }
}

/**
 * Returns the address to rekey to based on the `rekeyBack` flag.
 *
 * Use this on the `rekeyTo` field of your **last** inner transaction to properly
 * return control back to the wallet when the plugin is done.
 *
 * - If `rekeyBack` is true, returns the wallet address (rekeys back to the wallet)
 * - If `rekeyBack` is false, returns the zero address (no rekey, allows chaining plugins)
 *
 * @example
 * ```ts
 * itxn
 *   .payment({
 *     sender,
 *     receiver,
 *     amount,
 *     rekeyTo: rekeyAddress(rekeyBack, wallet),
 *   })
 *   .submit()
 * ```
 */
export function rekeyAddress(rekeyBack: boolean, wallet: Application): Account {
  if (!rekeyBack) {
    return Global.zeroAddress
  }
  return wallet.address
}

/**
 * Submits a no-op payment to rekey back to the wallet if necessary.
 *
 * Use this when your last operation is NOT an inner transaction that supports `rekeyTo`
 * (e.g. when the last thing you do is a box write or state update).
 *
 * @example
 * ```ts
 * // After doing box/state operations as the final step:
 * this.myBox(key).value = someValue
 * rekeyBackIfNecessary(rekeyBack, wallet)
 * ```
 */
export function rekeyBackIfNecessary(rekeyBack: boolean, wallet: Application): void {
  if (rekeyBack) {
    const sender = getSpendingAccount(wallet)
    itxn
      .payment({
        sender,
        receiver: sender,
        amount: 0,
        rekeyTo: rekeyAddress(rekeyBack, wallet),
      })
      .submit()
  }
}

/**
 * Checks if the current application controls the given account (its auth address is this app).
 *
 * @param sender - The sender account
 * @returns True if the current application controls the given account, false otherwise
 */
export function controls(sender: Account): boolean {
  return sender.authAddress === Global.currentApplicationAddress
}