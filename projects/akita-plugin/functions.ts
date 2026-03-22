import { Account, Application, Bytes, Global, itxn, op } from '@algorandfoundation/algorand-typescript'
import {
  ARC58_CONTROLLED_ADDRESS_KEY,
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
 * Gets the origin account (the real user) who owns the ARC-58 wallet.
 *
 * @param wallet - The ARC-58 wallet Application
 * @returns The origin account that controls this wallet
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
 * Use this when your plugin method needs multiple account references (e.g. gated operations).
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
 * Checks if the current application controls the given account.
 *
 * @param sender - The sender account
 * @returns True if the current application controls the given account, false otherwise
 */
export function controls(sender: Account): boolean {
  return sender.authAddress === Global.currentApplicationAddress
}