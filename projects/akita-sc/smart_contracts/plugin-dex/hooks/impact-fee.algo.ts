import { Application, Contract, GlobalState, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, HookPointBeforeSwap, HookPointQuote, HookResultSetFee } from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

/**
 * Non-custody DynamicFee hook (points: BeforeSwap | Quote).
 * fee = minFeeBps + slopeBps * amountIn / reserveIn, capped at maxFeeBps, so
 * trades that move the price more pay LPs more.
 *
 * - Prices only at BeforeSwap and Quote; every other subscribed point passes (v2 passResult pattern), so an
 *   extra point in the install never reverts the pool's operations.
 * - Never panics: a trade whose impact does not fit in uint64 (amountIn·1e4 / reserveIn ≥ 2^64, or a slope
 *   product past uint64) is charged maxFeeBps, and an empty input reserve passes.
 * - It returns `SetFee` with `max(ctx.feeBps, fee)` (OPEN-DECISIONS #21, option b): it never lowers the running
 *   fee — the pool's base fee or a fee set by an earlier hook (e.g. AntiSnipe) — so stack order no longer matters
 *   against fee-raising hooks. A `minFeeBps` below the pool's base fee therefore no longer discounts small trades:
 *   set the pool's base fee to the floor you want. A later discount hook (GatedFee) can still lower the result.
 */
export class ImpactFeeHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  minFeeBps = GlobalState<uint64>({ key: 'min_fee' })
  maxFeeBps = GlobalState<uint64>({ key: 'max_fee' })
  slopeBps = GlobalState<uint64>({ key: 'slope' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application, minFeeBps: uint64, maxFeeBps: uint64, slopeBps: uint64): void {
    this.dex.value = dex
    this.minFeeBps.value = minFeeBps
    this.maxFeeBps.value = maxFeeBps
    this.slopeBps.value = slopeBps
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)

    if ((ctx.point !== HookPointBeforeSwap && ctx.point !== HookPointQuote) || ctx.reserveIn === 0) {
      return passResult()
    }
    const fee = this.fee(ctx.amountIn, ctx.reserveIn)
    return { flags: HookResultSetFee, feeBps: fee > ctx.feeBps ? fee : ctx.feeBps, hookFee: 0, hookFeeOutBps: 0 }
  }

  /** min + slope·impact/1e4 capped at max, overflow-safe (reserveIn > 0) */
  private fee(amountIn: uint64, reserveIn: uint64): uint64 {
    const max = this.maxFeeBps.value
    const min = this.minFeeBps.value
    if (min >= max) {
      return max
    }
    // impactBps = amountIn·1e4 / reserveIn: the quotient fits in uint64 iff the high word < reserveIn
    const [impactHigh, impactLow] = op.mulw(amountIn, BpsDivisor)
    if (impactHigh >= reserveIn) {
      return max
    }
    const impactBps = op.divw(impactHigh, impactLow, reserveIn)
    // extra = impactBps·slope / 1e4: fits iff the high word < 1e4
    const [extraHigh, extraLow] = op.mulw(impactBps, this.slopeBps.value)
    if (extraHigh >= BpsDivisor) {
      return max
    }
    const extra = op.divw(extraHigh, extraLow, BpsDivisor)
    return extra >= max - min ? max : min + extra
  }
}
