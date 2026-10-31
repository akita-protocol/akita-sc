import { Account, Application, Contract, Global, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { HookContext, HookResult } from './types'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.4).

/**
 * Static interface every PluginDex hook implements. The Vault calls the same method for every
 * subscribed hook point; the hook branches on `ctx.point`. Every call is version-pinned
 * (`rejectVersion = installedVersion + 1`), so an updated hook app stops being callable by pools
 * that installed an earlier version.
 *
 * Custody hooks (HookPermCustody) are called while `ctx.escrow` is rekeyed to the hook app
 * (`ctx.custody == true`). They may send from it like an ARC-58 plugin sends from the spending
 * account. When the hook returns, the Vault requires the escrow to be rekeyed back and books the
 * balance change through the custody guard (FINAL-SPEC §4.6).
 *
 * Hook-author obligations (enforced by the approval checklist):
 * - `Quote` must not write state and must not revert on valid input.
 * - A custody hook's last escrow inner txn must rekey the escrow to `dex.address`
 *   (`dexRekeyAddress` / `rekeyBackToDex`), and every escrow-sent inner txn must use `fee: 0`.
 *   A non-zero fee is booked as a loss. The only exception is the 2-ALGO incentive keyreg fee,
 *   which the hook pre-donates in the same custody call.
 * - A custody hook at BeforeSwap breaks quote == swap by design. Pricing hooks must subscribe to `Quote`.
 * - With `HookFlagLazyCustody`, the first call has `ctx.custody = false`. Return
 *   `HookResultRequestCustody` to be called again at the same point with custody.
 * - `ctx.after` is the state before this point's hooks. It is not refreshed after an earlier custody hook
 *   at the same point books a delta (e.g. a backrun at AfterSwap), so a later hook sees a stale
 *   `ctx.after.priceX64`. `ctx.reserveIn/Out` are recomputed for every hook; read those (or the hook's own
 *   live state) when the post-custody price matters (amendment L1, OPEN-DECISIONS #8).
 */
export class PluginDexHook extends Contract {
  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    return { flags: 0, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
  }
}

/** A hook result that changes nothing */
export function passResult(): HookResult {
  return { flags: 0, feeBps: 0, hookFee: 0, hookFeeOutBps: 0 }
}

/** Hooks must only trust a context delivered by their canonical DEX */
export function requireDexCaller(dex: Application): void {
  loggedAssert(Global.callerApplicationId === dex.id, 'errHookCaller')
}

/** `rekeyTo` for a custody hook's final inner transaction from the pool escrow */
export function dexRekeyAddress(dex: Application): Account {
  return dex.address
}

/** Rekey the pool escrow back to the DEX when the hook's last action is not an inner txn */
export function rekeyBackToDex(dex: Application, escrow: Account): void {
  itxn
    .payment({
      sender: escrow,
      receiver: escrow,
      amount: 0,
      rekeyTo: dex.address,
    })
    .submit()
}
