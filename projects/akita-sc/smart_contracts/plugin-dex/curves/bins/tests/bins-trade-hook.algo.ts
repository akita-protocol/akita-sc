import {
  Account,
  Application,
  Contract,
  Global,
  GlobalState,
  itxn,
  uint64,
} from '@algorandfoundation/algorand-typescript'
import { abimethod } from '@algorandfoundation/algorand-typescript/arc4'
import { passResult, rekeyBackToDex, requireDexCaller } from '../../../hook-interface'
import { HookContext, HookResult } from '../../../types'

/**
 * Test-only custody hook for bins pools (WP2 integration, bins.md §11 e2e 11). With custody it moves
 * exactly the configured amounts: `giveA`/`giveB` from its own balance into the pool escrow, then
 * `takeA`/`takeB` from the escrow to itself, and rekeys the escrow back to the Vault. Any mix is
 * allowed (a trade in either direction, a donation, a withdrawal, two-sided theft), so the Vault's
 * custody guard and the engine's Settle see every delta shape. Without custody it does nothing.
 */
export class BinsTradeHook extends Contract {
  dex = GlobalState<Application>({ key: 'dex' })
  assetA = GlobalState<uint64>({ key: 'asset_a' })
  assetB = GlobalState<uint64>({ key: 'asset_b' })
  giveA = GlobalState<uint64>({ key: 'give_a' })
  giveB = GlobalState<uint64>({ key: 'give_b' })
  takeA = GlobalState<uint64>({ key: 'take_a' })
  takeB = GlobalState<uint64>({ key: 'take_b' })
  calls = GlobalState<uint64>({ key: 'calls' })

  @abimethod({ onCreate: 'require' })
  create(dex: Application): void {
    this.dex.value = dex
    this.assetA.value = 0
    this.assetB.value = 0
    this.giveA.value = 0
    this.giveB.value = 0
    this.takeA.value = 0
    this.takeB.value = 0
    this.calls.value = 0
  }

  /** opt the hook into an ASA it gives or takes */
  optIn(asset: uint64): void {
    itxn.assetTransfer({ assetReceiver: Global.currentApplicationAddress, xferAsset: asset, assetAmount: 0 }).submit()
  }

  configure(assetA: uint64, assetB: uint64, giveA: uint64, giveB: uint64, takeA: uint64, takeB: uint64): void {
    this.assetA.value = assetA
    this.assetB.value = assetB
    this.giveA.value = giveA
    this.giveB.value = giveB
    this.takeA.value = takeA
    this.takeB.value = takeB
  }

  akitaDexHook(dex: Application, hookIndex: uint64, ctx: HookContext): HookResult {
    requireDexCaller(this.dex.value)
    this.calls.value += 1
    if (ctx.custody) {
      const self = Global.currentApplicationAddress
      this.move(self, ctx.escrow, this.assetA.value, this.giveA.value)
      this.move(self, ctx.escrow, this.assetB.value, this.giveB.value)
      this.move(ctx.escrow, self, this.assetA.value, this.takeA.value)
      this.move(ctx.escrow, self, this.assetB.value, this.takeB.value)
      rekeyBackToDex(dex, ctx.escrow)
    }
    return passResult()
  }

  /** `amount` of `asset` from `from` (this app or the rekeyed escrow) to `to`; 0 is a no-op */
  private move(from: Account, to: Account, asset: uint64, amount: uint64): void {
    if (amount === 0) return
    if (asset === 0) {
      itxn.payment({ sender: from, receiver: to, amount, fee: 0 }).submit()
    } else {
      itxn.assetTransfer({ sender: from, assetReceiver: to, xferAsset: asset, assetAmount: amount, fee: 0 }).submit()
    }
  }
}
