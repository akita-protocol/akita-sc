import { Account, Application, bytes, Contract, contract, GlobalState, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { tmPoolAddress, tmQuoteFixedInput, tmSwapAs } from './tinyman-v2'
import { requireVenueCustody } from './venue-adapter'

/**
 * Venue adapter for the Tinyman v2 AMM (router.md §4.5, venues.md §1). Immutable, holds no funds and
 * is permissionless: custody can only flow back to the app that granted it (`requireVenueCustody`).
 *
 * The pool is derived on-chain from the pair, so `venueData` is ignored (pass empty bytes).
 * Swap = 3 inner txns (deposit, Tinyman appl carrying the handback rekey, Tinyman payout), all with
 * fee 0. Callers must make available: the pool account, the Tinyman app, the (pool, Tinyman) local,
 * both non-zero assets and the (account, assetOut) holding (Tinyman is TEAL v7: no resource sharing
 * for its own inner frame, so its appl carries explicit arrays).
 */
@contract({ avmVersion: 13 })
export class TinymanV2Adapter extends Contract {
  tinyman = GlobalState<Application>({ key: 'tinyman' })

  @abimethod({ onCreate: 'require' })
  create(tinyman: Application): void {
    this.tinyman.value = tinyman
  }

  /**
   * Exact-in swap of `amountIn` of `assetIn` held by `account` (rekeyed to this app) into `assetOut`.
   * The last inner txn (the Tinyman appl) rekeys `account` to `returnTo`. Tinyman itself enforces
   * `minAmountOut` and `lock == 0`. Returns the measured output.
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
    requireVenueCustody(account, returnTo)
    const app = this.tinyman.value
    return tmSwapAs(account, app, tmPoolAddress(app, assetIn, assetOut), assetIn, amountIn, assetOut, minAmountOut, returnTo)
  }

  /** Deterministic exact-in quote from pool state; 0 = unavailable (never reverts) */
  @abimethod({ readonly: true })
  akitaVenueQuote(assetIn: uint64, assetOut: uint64, amountIn: uint64, venueData: bytes): uint64 {
    const app = this.tinyman.value
    return tmQuoteFixedInput(app, tmPoolAddress(app, assetIn, assetOut), assetIn, assetOut, amountIn)
  }
}
