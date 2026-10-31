import { Account, bytes, Contract, Global, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'

// FROZEN INTERFACE (PluginDex v2, FINAL-SPEC §3.7; router.md §4.3).

/** Static interface of a venue adapter registered in the VenueRegistry (version-pinned by callers). */
export class VenueAdapter extends Contract {
  /**
   * PRE: account.authAddress == this app; returnTo == Global.callerApplicationAddress.
   * POST: last inner txn rekeys `account` to `returnTo`; only ≤ amountIn of assetIn leaves `account`;
   * every inner txn fee 0; output ≥ minAmountOut else revert. Returns measured output (informational).
   */
  akitaVenueSwap(
    account: Account,
    assetIn: uint64,
    amountIn: uint64,
    assetOut: uint64,
    minAmountOut: uint64,
    venueData: bytes,
    returnTo: Account,
  ): uint64 {
    return 0
  }

  /** Deterministic exact-in quote from venue state; 0 = unavailable (never reverts). */
  @abimethod({ readonly: true })
  akitaVenueQuote(assetIn: uint64, assetOut: uint64, amountIn: uint64, venueData: bytes): uint64 {
    return 0
  }
}

/**
 * Adapter prologue: custody of `account` must have been granted to this adapter, and it can only flow
 * back to the app that granted it.
 */
export function requireVenueCustody(account: Account, returnTo: Account): void {
  loggedAssert(account.authAddress === Global.currentApplicationAddress, 'errVaCustody')
  loggedAssert(returnTo === Global.callerApplicationAddress, 'errVaReturnTo')
}
