import { Account, Application, Global, GlobalState, itxn, itxnCompose, op, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract, decodeArc4, methodSelector } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyAkitaDAO } from '../../constants'
import { getControlledSpendingAccount, pluginPrincipalOf, rekeyAddress, rekeyBackIfNecessary } from '../../utils/functions'
import { GateCtx, Principal, windowHint } from '../../utils/principal'

// CONTRACT IMPORTS
import type { MockPrincipalProbe } from '../principal-probe/contract.algo'
import type { MockPrincipalProxy } from '../principal-proxy/contract.algo'

export type CtxOwnsResult = {
  /** gateCtx(probe.probe(hint)) as computed by the first hop (sender = S) */
  ctx: GateCtx
  /** probe.ctxOwns(ctx, account) evaluated inside the same window */
  owns: boolean
  /** probe.thirdParty(account, hint) evaluated at the same point (E23 comparison), or the zero address */
  thirdParty: Account
}

/**
 * TEST-ONLY. Installable ARC-58 plugin for the principal-resolution suite
 * (docs/principal-resolution/PHASE-0-SPEC.md §5.1). Every method takes the wallet first
 * (`appArgs(1) == W`, required by the wallet's window pinning). Never deploy outside tests.
 */
export class TestPrincipalPlugin extends Contract {
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  @abimethod({ onCreate: 'require' })
  create(akitaDAO: uint64): void {
    this.akitaDAO.value = Application(akitaDAO)
  }

  /**
   * `probe.probe(hint)` sent as the wallet's spending account S; rekeys S back when `rekeyBack`.
   * NON-COMPLIANT on purpose: it forwards a caller-chosen `hint` (§3.8 rule 6 violation) so the suite can
   * aim any hint at the open window. A shipping plugin forwards `windowHint(wallet)` (see `callProbeWindow`).
   */
  callProbe(wallet: Application, rekeyBack: boolean, probe: Application, hint: uint64): Principal {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /**
   * T47 positive control: the compliant shape (§3.8 rule 6). The hint is `windowHint(wallet)`, the
   * wallet whose window this call serves, never a caller-supplied value. Compare `callProbe`, whose
   * caller-chosen `hint` is the T47 negative control.
   */
  callProbeWindow(wallet: Application, rekeyBack: boolean, probe: Application): Principal {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      sender,
      args: [windowHint(wallet)],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** `probe.tryProbe(hint)` sent as S (T27). */
  callTryProbe(wallet: Application, rekeyBack: boolean, probe: Application, hint: uint64): Principal {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.tryProbe>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** T32: `probe.probeCost(hint)` sent as S: opcode cost of the strict resolution in the target. */
  callProbeCost(wallet: Application, rekeyBack: boolean, probe: Application, hint: uint64): uint64 {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.probeCost>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** V0.1: `probe.probeAuth(hint)` sent as S, returning what the callee sees as S.authAddress. */
  callProbeAuth(wallet: Application, rekeyBack: boolean, probe: Application, hint: uint64): Account {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.probeAuth>({
      appId: probe,
      sender,
      args: [hint],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /** E11/T16: the plugin calls the probe as ITS OWN address with hint W, then rekeys S back. */
  callProbeAsSelf(wallet: Application, probe: Application, hint: uint64): Principal {
    const result = abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: probe,
      args: [hint],
    }).returnValue
    rekeyBackIfNecessary(true, wallet)
    return result
  }

  /** T27: `tryProbe` as the plugin's own address, then rekeys S back. */
  callTryProbeAsSelf(wallet: Application, probe: Application, hint: uint64): Principal {
    const result = abiCall<typeof MockPrincipalProbe.prototype.tryProbe>({
      appId: probe,
      args: [hint],
    }).returnValue
    rekeyBackIfNecessary(true, wallet)
    return result
  }

  /**
   * E9/T14 proxy chain (compliant P): rekey S to `proxy` in the SAME inner group as the proxy call
   * (§3.8 rule 3(b)); the proxy probes as S and hands S back to this plugin before it returns.
   */
  proxyProbe(wallet: Application, rekeyBack: boolean, proxy: Application, probe: Application, hint: uint64): Principal {
    const sender = getControlledSpendingAccount(wallet)
    itxnCompose.begin(itxn.payment({ sender, receiver: sender, amount: 0, rekeyTo: proxy.address }))
    itxnCompose.next<typeof MockPrincipalProxy.prototype.forward>({
      appId: proxy,
      args: [wallet.id, probe, hint, true],
    })
    itxnCompose.submit()
    const result = decodeArc4<Principal>(op.GITxn.lastLog(1), 'log')
    rekeyBackIfNecessary(rekeyBack, wallet)
    return result
  }

  /** Negative control: the proxy is told to KEEP S (§3.8 rule 3(b) violation). */
  proxyProbeKeep(wallet: Application, proxy: Application, probe: Application, hint: uint64): Principal {
    const sender = getControlledSpendingAccount(wallet)
    itxnCompose.begin(itxn.payment({ sender, receiver: sender, amount: 0, rekeyTo: proxy.address }))
    itxnCompose.next<typeof MockPrincipalProxy.prototype.forward>({
      appId: proxy,
      args: [wallet.id, probe, hint, false],
    })
    itxnCompose.submit()
    return decodeArc4<Principal>(op.GITxn.lastLog(1), 'log')
  }

  /** T30: the plugin-side answer (`pluginPrincipal`) for this wallet. Call before S is rekeyed back. */
  principal(wallet: Application): Principal {
    return pluginPrincipalOf(this.akitaDAO.value, wallet)
  }

  /** E12/T17: sending as S, call `probe.relay(probe2, hint)`; probe2 then sees caller = probe. */
  callRelay(wallet: Application, rekeyBack: boolean, probe: Application, probe2: Application, hint: uint64): Principal {
    const sender = getControlledSpendingAccount(wallet)
    return abiCall<typeof MockPrincipalProbe.prototype.relay>({
      appId: probe,
      sender,
      args: [probe2, hint],
      rekeyTo: rekeyAddress(rekeyBack, wallet),
    }).returnValue
  }

  /**
   * V0.2/T23: mid-window call-out to `MockPrincipalReenter.poke(this, forgedWallet, probe)`, which
   * tries to re-enter this plugin with a forged wallet. The AVM rejects the re-entry.
   */
  callReenter(wallet: Application, reenter: Application, forgedWallet: uint64, probe: Application): void {
    itxn
      .applicationCall({
        appId: reenter,
        appArgs: [
          methodSelector('poke(uint64,uint64,uint64)void'),
          op.itob(Global.currentApplicationId.id),
          op.itob(forgedWallet),
          op.itob(probe.id),
        ],
      })
      .submit()
    rekeyBackIfNecessary(true, wallet)
  }

  /** T28 "escrow mid-window": `probe.owns(wallet.id, account)` while the window is open. */
  callOwns(wallet: Application, rekeyBack: boolean, probe: Application, account: Account): boolean {
    const result = abiCall<typeof MockPrincipalProbe.prototype.owns>({
      appId: probe,
      args: [wallet.id, account],
    }).returnValue
    rekeyBackIfNecessary(rekeyBack, wallet)
    return result
  }

  /**
   * T38–T40: `probe.probeCtx(hint)` as S (no rekey), then in the same window `probe.ctxOwns(ctx, account)`
   * and, when `alsoThirdParty`, `probe.thirdParty(account, hint)` for the E23 comparison.
   */
  callCtxOwns(
    wallet: Application,
    rekeyBack: boolean,
    probe: Application,
    hint: uint64,
    account: Account,
    alsoThirdParty: boolean
  ): CtxOwnsResult {
    const sender = getControlledSpendingAccount(wallet)
    const ctx = abiCall<typeof MockPrincipalProbe.prototype.probeCtx>({
      appId: probe,
      sender,
      args: [hint],
    }).returnValue
    const owns = abiCall<typeof MockPrincipalProbe.prototype.ctxOwns>({
      appId: probe,
      args: [ctx, account],
    }).returnValue
    let thirdParty = Global.zeroAddress
    if (alsoThirdParty) {
      thirdParty = abiCall<typeof MockPrincipalProbe.prototype.thirdParty>({
        appId: probe,
        args: [account, hint],
      }).returnValue
    }
    rekeyBackIfNecessary(rekeyBack, wallet)
    return { ctx, owns, thirdParty }
  }

  /** T48: `probe.tipWalletOf(creator, stored)` while the window is open (E23: a held creator gets 0). */
  callTipWallet(wallet: Application, rekeyBack: boolean, probe: Application, creator: Account, stored: uint64): uint64 {
    const result = abiCall<typeof MockPrincipalProbe.prototype.tipWalletOf>({
      appId: probe,
      args: [creator, stored],
    }).returnValue
    rekeyBackIfNecessary(rekeyBack, wallet)
    return result
  }

  /** Hand S back to the wallet (closes a window opened with rekeyBack = false). */
  done(wallet: Application): void {
    rekeyBackIfNecessary(true, wallet)
  }
}
