import { Account, Application, Contract, Global, itxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { readonly } from '@algorandfoundation/algorand-typescript/arc4'
import { TmPool, tmPoolAddress, tmQuoteFixedInput, tmReadPool, tmSwapAs } from '../venues/tinyman-v2'

/**
 * Test-only app that exercises the Tinyman v2 venue library
 * (`venues/tinyman-v2.ts`) the way the router adapter and the backrun hook will:
 * it swaps as an account that is rekeyed to it and hands the account back on
 * the Tinyman appl.
 */
export class MockVenueProbe extends Contract {
  @readonly
  poolAddress(tinyman: Application, assetA: uint64, assetB: uint64): Account {
    return tmPoolAddress(tinyman, assetA, assetB)
  }

  @readonly
  readPool(tinyman: Application, pool: Account): TmPool {
    return tmReadPool(pool, tinyman)
  }

  /** Quote against the derived pool for the pair; 0 = unavailable */
  @readonly
  quote(tinyman: Application, assetIn: uint64, assetOut: uint64, amountIn: uint64): uint64 {
    return tmQuoteFixedInput(tinyman, tmPoolAddress(tinyman, assetIn, assetOut), assetIn, assetOut, amountIn)
  }

  /**
   * Swap as `account` (rekeyed to this app) and rekey it back to itself on the
   * Tinyman appl. A non-zero `carrierFee` first submits a fee-carrying 0-ALGO
   * payment from this app's account, so the swap's inner fees come from the app.
   * Returns [quote taken just before the swap, measured output].
   */
  swapAs(
    account: Account,
    tinyman: Application,
    assetIn: uint64,
    amountIn: uint64,
    assetOut: uint64,
    minOut: uint64,
    carrierFee: uint64,
  ): [uint64, uint64] {
    loggedAssert(account.authAddress === Global.currentApplicationAddress, 'errProbeCustody')
    const pool = tmPoolAddress(tinyman, assetIn, assetOut)
    const quoted = tmQuoteFixedInput(tinyman, pool, assetIn, assetOut, amountIn)
    if (carrierFee > 0) {
      itxn.payment({ receiver: Global.currentApplicationAddress, amount: 0, fee: carrierFee }).submit()
    }
    const out = tmSwapAs(account, tinyman, pool, assetIn, amountIn, assetOut, minOut, account)
    return [quoted, out]
  }
}
