import { Account, Application, Bytes, bytes, Contract, GlobalState, itxn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { itob } from '@algorandfoundation/algorand-typescript/op'
import { GateArgs } from '../../gates/types'
import { GateMustCheckForAbiMethod, getAkitaAppList, getControlledSpendingAccount, pluginPrincipalOf, rekeyAddress } from '../../utils/functions'
import { gateCtx, windowHint } from '../../utils/principal'
import type { PluginDex } from '../contract.algo'
import type { GatedFeeHook } from '../hooks/gated-fee.algo'
import { FeePass, PassMbr } from '../hooks/gated-fee.algo'

/**
 * TEST-ONLY. ARC-58 plugin that manages a GatedFeeHook pass from inside a wallet window, the way a wallet
 * user must since passes are keyed by principal (principal-resolution spec §6.12, P2-DEX-01/02). Every
 * method sends as the window's spending account S and forwards `windowHint(wallet)` (spec §3.8 rule 6), so
 * the hook resolves the wallet's principal. `key` is caller-supplied ON PURPOSE: the hook must reject a key
 * that is not the window's principal (P2-DEX-01). The pinned hook is set at creation (custody rule 3(c):
 * never call a caller-chosen app as S).
 *
 * `quoteAs` is the "app X" of P2-DEX-03: an app that calls `PluginDex.quote` with a caller-chosen swapper
 * and wallet (no window), so the Vault's Quote point sees `callerApp == X`.
 *
 * Never deploy outside tests.
 */
export class MockGatedFeePlugin extends Contract {
  hook = GlobalState<Application>({ key: 'hook' })
  akitaDAO = GlobalState<Application>({ key: 'akita_dao' })

  @abimethod({ onCreate: 'require' })
  create(hook: Application, akitaDAO: Application): void {
    this.hook.value = hook
    this.akitaDAO.value = akitaDAO
  }

  /** `hook.openPass(pay PassMbr from S, key, ...)` as S with the window hint; S becomes the funder */
  openPass(wallet: Application, rekeyBack: boolean, key: Account, measure: uint64, gateArgs: bytes[][]): FeePass {
    const sender = getControlledSpendingAccount(wallet)
    const hook = this.hook.value
    return abiCall<typeof GatedFeeHook.prototype.openPass>({
      appId: hook,
      sender,
      args: [itxn.payment({ sender, receiver: hook.address, amount: PassMbr }), key, measure, gateArgs, windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** `hook.refresh(key, ...)` as S with the window hint */
  refresh(wallet: Application, rekeyBack: boolean, key: Account, measure: uint64, gateArgs: bytes[][]): FeePass {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof GatedFeeHook.prototype.refresh>({
      appId: this.hook.value,
      sender,
      args: [key, measure, gateArgs, windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** `hook.closePass(key)` as S with the window hint (the MBR goes back to the pass funder) */
  closePass(wallet: Application, rekeyBack: boolean, key: Account): void {
    const sender = getControlledSpendingAccount(wallet)
    abiCall<typeof GatedFeeHook.prototype.closePass>({
      appId: this.hook.value,
      sender,
      args: [key, windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /**
   * `Gate.mustCheckFor(gateCtx(pluginPrincipalOf(dao, wallet)), gateId, args)` followed by
   * `hook.refreshFromGate(gateTxn, key, slot, windowHint(wallet))` in one inner group, both as S: the plugin-side
   * context equals the one the hook computes for (wallet, S) (IMPLEMENTATION-LOG, Gate track, step 2).
   */
  refreshFromGate(wallet: Application, rekeyBack: boolean, key: Account, slot: uint64, gateId: uint64, args: GateArgs): FeePass {
    const sender = getControlledSpendingAccount(wallet)
    const ctx = gateCtx(pluginPrincipalOf(this.akitaDAO.value, wallet))
    return abiCall<typeof GatedFeeHook.prototype.refreshFromGate>({
      appId: this.hook.value,
      sender,
      args: [
        itxn.applicationCall({
          sender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [methodSelector(GateMustCheckForAbiMethod), encodeArc4(ctx), itob(gateId), encodeArc4(args)],
        }),
        key,
        slot,
        windowHint(wallet),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** P2-DEX-03 "app X": `PluginDex.quote` with a caller-chosen swapper and wallet, sent as this app */
  quoteAs(dex: Application, poolId: uint64, assetIn: uint64, amountIn: uint64, swapper: Account, wallet: uint64): uint64 {
    return abiCall<typeof PluginDex.prototype.quote>({
      appId: dex,
      args: [poolId, assetIn, amountIn, swapper, Bytes(''), wallet],
    }).returnValue
  }

  /** No-op carrier for opcode budget and resource references (place after arc58_verifyAuthAddress) */
  opUp(): void {}
}
