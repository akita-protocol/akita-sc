import { Account, Application, Contract, Global, GlobalState, itxn, loggedAssert, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { BpsDivisor, HookPointBeforeSwap, HookPointQuote } from '../constants'
import { passResult, requireDexCaller } from '../hook-interface'
import { HookContext, HookResult } from '../types'

/**
 * HookFee hook (points: BeforeSwap | Quote): a creator token tax. Takes `taxBps`
 * of every swap input whose asset is in the taxed pair; the DEX pays it to this
 * app, and the owner withdraws. The hook must be opted into each ASA it taxes.
 * Any other subscribed point passes (v2 passResult pattern).
 */
export class SwapTaxHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  owner = GlobalState<Account>({ key: 'owner' })
  taxBps = GlobalState<uint64>({ key: 'tax_bps' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application, owner: Account, taxBps: uint64): void {
    // ≤ 100%: the tax never exceeds the input, so its mulw/divw cannot overflow
    loggedAssert(taxBps <= BpsDivisor, 'errStbp')
    this.dex.value = dex
    this.owner.value = owner
    this.taxBps.value = taxBps
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    // taxes only at BeforeSwap and Quote; every other subscribed point passes (a hook fee there would make
    // the Vault fail errHookPermission and block the pool)
    if ((ctx.point !== HookPointBeforeSwap && ctx.point !== HookPointQuote) || this.taxBps.value === 0) {
      return passResult()
    }
    return { flags: 0, feeBps: 0, hookFee: op.divw(...op.mulw(ctx.amountIn, this.taxBps.value), BpsDivisor), hookFeeOutBps: 0 }
  }

  optIn(asset: uint64): void {
    loggedAssert(Txn.sender === this.owner.value, 'errNotOwner')
    itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: asset, assetAmount: 0 }).submit()
  }

  withdraw(asset: uint64, amount: uint64): void {
    loggedAssert(Txn.sender === this.owner.value, 'errNotOwner')
    if (asset === 0) {
      itxn.payment({ receiver: this.owner.value, amount }).submit()
    } else {
      itxn.assetTransfer({ assetReceiver: this.owner.value, xferAsset: asset, assetAmount: amount }).submit()
    }
  }
}
