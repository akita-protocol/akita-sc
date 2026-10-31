import { Application, Bytes, bytes, Contract, GlobalState, itxn, loggedAssert, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, encodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { GateArgs } from '../../../gates/types'
import type { GatedFeeHook } from '../../../plugin-dex/hooks/gated-fee.algo'
import { FeePass, PassMbr } from '../../../plugin-dex/hooks/gated-fee.algo'
import { GateMustCheckForAbiMethod, getAkitaAppList, pluginPrincipalOf, rekeyAddress } from '../../../utils/functions'
import { gateCtx, Principal, windowHint } from '../../../utils/principal'
import { errGpHook } from './errors'

/**
 * GatedFeePassPlugin: the production way for an ARC-58 wallet user to open, refresh and close the GatedFeeHook
 * pass of the wallet's principal (principal-resolution spec §6.12; IMPLEMENTATION-LOG, plugin-dex review fixes).
 *
 * A wallet's principal (`C = W.address`, or an external `C` rekeyed to `W`) is never `Txn.sender` of a top-level
 * call, and a top-level call with a hint reverts (errHtop). So the hook's owner-only methods are reachable for
 * wallet users only from inside the wallet's own window. Every method here:
 * - derives the key itself: `pluginPrincipalOf(dao, wallet).principal` (asserts the wallet is genuine for the
 *   DAO's factory, errHnwl, and that this app holds S, errNath). The caller never names the key;
 * - sends as the window's spending account S and forwards `windowHint(wallet)` (spec §3.8 rule 6), so the hook
 *   resolves the same principal;
 * - calls only the hook pinned at create and the DAO's gate (custody rule 3(c): never a caller-chosen app as S).
 *
 * One plugin per GatedFeeHook deployment. `akita_dao` is copied from the pinned hook at create, so the plugin
 * and the hook always resolve against the same wallet factory. Immutable and adminless (no update method).
 */
export class GatedFeePassPlugin extends Contract {
  version = GlobalState<string>({ key: 'version' })
  /** the GatedFeeHook this plugin serves (immutable) */
  hook = GlobalState<Application>({ key: 'hook' })
  /** the hook's own `akita_dao` (copied at create) */
  akitaDAO = GlobalState<Application>({ key: 'akita_dao' })

  @abimethod({ onCreate: 'require' })
  create(version: string, hook: Application): void {
    const [dao, hasDao] = op.AppGlobal.getExUint64(hook, Bytes('akita_dao'))
    loggedAssert(hasDao && dao !== 0, errGpHook)
    this.version.value = version
    this.hook.value = hook
    this.akitaDAO.value = Application(dao)
  }

  /**
   * Open the pass of the wallet's principal and measure it (`measure`: 1 power, 2 impact, 4 gates). S pays the
   * hook's PassMbr and becomes the funder (refunded on close). `gateArgs` has one entry per hook gate slot when
   * `measure` includes gates.
   */
  openPass(wallet: Application, rekeyBack: boolean, measure: uint64, gateArgs: bytes[][]): FeePass {
    const p = this.principal(wallet)
    return abiCall<typeof GatedFeeHook.prototype.openPass>({
      appId: this.hook.value,
      sender: p.spender,
      args: [itxn.payment({ sender: p.spender, receiver: this.hook.value.address, amount: PassMbr }), p.principal, measure, gateArgs, windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** Re-measure the principal's pass (the daily swap count carries over) */
  refresh(wallet: Application, rekeyBack: boolean, measure: uint64, gateArgs: bytes[][]): FeePass {
    const p = this.principal(wallet)
    return abiCall<typeof GatedFeeHook.prototype.refresh>({
      appId: this.hook.value,
      sender: p.spender,
      args: [p.principal, measure, gateArgs, windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /**
   * Set gate bit `slot` on the principal's live pass: `Gate.mustCheckFor(gateCtx(p), gateId, args)` then
   * `hook.refreshFromGate(gateTxn, p.principal, slot, windowHint(wallet))`, one inner group, both as S. `gateId`
   * must be the hook's `getGateSlots()[slot]` (the hook rejects anything else, errGfgt); the gate runs on its
   * own budget.
   */
  refreshFromGate(wallet: Application, rekeyBack: boolean, slot: uint64, gateId: uint64, args: GateArgs): FeePass {
    const p = this.principal(wallet)
    return abiCall<typeof GatedFeeHook.prototype.refreshFromGate>({
      appId: this.hook.value,
      sender: p.spender,
      args: [
        itxn.applicationCall({
          sender: p.spender,
          appId: getAkitaAppList(this.akitaDAO.value).gate,
          appArgs: [methodSelector(GateMustCheckForAbiMethod), encodeArc4(gateCtx(p)), op.itob(gateId), encodeArc4(args)],
        }),
        p.principal,
        slot,
        windowHint(wallet),
      ],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** Close the principal's pass; the hook refunds PassMbr to the pass funder (not on a day with a discounted swap) */
  closePass(wallet: Application, rekeyBack: boolean): void {
    const p = this.principal(wallet)
    abiCall<typeof GatedFeeHook.prototype.closePass>({
      appId: this.hook.value,
      sender: p.spender,
      args: [p.principal, windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    })
  }

  /** No-op carrier for opcode budget and resource references (place after arc58_verifyAuthAddress) */
  opUp(): void {}

  /** The window's verified principal; asserts a genuine wallet (errHnwl) whose S this app holds (errNath) */
  private principal(wallet: Application): Principal {
    return pluginPrincipalOf(this.akitaDAO.value, wallet)
  }
}
