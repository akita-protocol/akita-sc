import { Account, Application, assert, Bytes, Global, GlobalState, gtxn, op, Txn, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, Contract, decodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GlobalStateKeyAkitaDAO } from '../../constants'
import { AkitaDAOGlobalStateKeysAkitaAppList } from '../../arc58/dao/constants'
import { AkitaAppList } from '../../arc58/dao/types'
import {
  ctxOwnsOf,
  gateCheckCtx,
  getAkitaAppList,
  ownsAtRestOf,
  atRestPrincipalOf,
  principalOf,
  quoteReferrerOf,
  thirdPartyPrincipalOf,
  tipWallet,
  tryPrincipalOf,
} from '../../utils/functions'
import { GateCtx, gateCtx, isGenuineWallet, Principal, resolvePrincipal } from '../../utils/principal'

/**
 * TEST-ONLY. Principal-resolution probe (docs/principal-resolution/PHASE-0-SPEC.md §5.1).
 * Every method resolves through the DAO-aware wrappers in utils/functions.ts, with the wallet
 * factory pinned to `AkitaAppList(this.akitaDAO).wallet`. Never deploy outside tests.
 */
export class MockPrincipalProbe extends Contract {
  akitaDAO = GlobalState<Application>({ key: GlobalStateKeyAkitaDAO })

  @abimethod({ onCreate: 'require' })
  create(akitaDAO: uint64): void {
    this.akitaDAO.value = Application(akitaDAO)
  }

  /** Extra resource slots for grouped calls. */
  opUp(): void { }

  /** Strict first-hop resolution (`principalOf`). */
  probe(wallet: uint64): Principal {
    return principalOf(this.akitaDAO.value, wallet)
  }

  /** Non-reverting variant (`tryPrincipalOf`). */
  tryProbe(wallet: uint64): Principal {
    return tryPrincipalOf(this.akitaDAO.value, wallet)
  }

  /**
   * T32: opcode cost of the strict `principalOf(dao, wallet)` call (Global.opcodeBudget delta; includes the
   * AkitaAppList read and the subroutine call overhead).
   */
  probeCost(wallet: uint64): uint64 {
    const before = Global.opcodeBudget
    const p = principalOf(this.akitaDAO.value, wallet)
    const after = Global.opcodeBudget
    assert(p.spender === Txn.sender)
    return before - after
  }

  /** V0.1: what the callee observes as `Txn.sender.authAddress` (RekeyTo is already applied). */
  probeAuth(wallet: uint64): Account {
    const [auth] = op.AcctParams.acctAuthAddr(Txn.sender)
    return auth
  }

  @abimethod({ readonly: true })
  quote(wallet: uint64): Account {
    return quoteReferrerOf(this.akitaDAO.value, wallet)
  }

  @abimethod({ readonly: true })
  owns(wallet: uint64, account: Account): boolean {
    return ownsAtRestOf(this.akitaDAO.value, wallet, account)
  }

  @abimethod({ readonly: true })
  atRest(account: Account, wallet: uint64, stored: Account): Account {
    return atRestPrincipalOf(this.akitaDAO.value, account, wallet, stored)
  }

  /** QUOTE-ONLY variant that reads W.controlled_address. */
  @abimethod({ readonly: true })
  thirdParty(account: Account, wallet: uint64): Account {
    return thirdPartyPrincipalOf(this.akitaDAO.value, account, wallet)
  }

  @abimethod({ readonly: true })
  ctxOwns(ctx: GateCtx, account: Account): boolean {
    return ctxOwnsOf(this.akitaDAO.value, ctx, account)
  }

  /** `tipWallet(dao, creator, stored)`: the tip-routing wallet, or 0 for a direct tip. */
  @abimethod({ readonly: true })
  tipWalletOf(creator: Account, stored: uint64): uint64 {
    return tipWallet(this.akitaDAO.value, creator, stored)
  }

  /** `gateCheckCtx(gateTxn, dao, ctx, id)` against the gate named by this probe's DAO. */
  gateCheckCtxOf(gateTxn: gtxn.ApplicationCallTxn, ctx: GateCtx, id: uint64): boolean {
    return gateCheckCtx(gateTxn, this.akitaDAO.value, ctx, id)
  }

  /** Strict resolution, returned as the gate context `{ principal, wallet, spender }`. */
  probeCtx(wallet: uint64): GateCtx {
    return gateCtx(principalOf(this.akitaDAO.value, wallet))
  }

  /** Nested-call test (E12/T17): this app calls `target.probe(wallet)` as itself. */
  relay(target: Application, wallet: uint64): Principal {
    return abiCall<typeof MockPrincipalProbe.prototype.probe>({
      appId: target,
      args: [wallet],
    }).returnValue
  }

  /** T27: `relay` with the non-reverting `target.tryProbe(wallet)`. */
  tryRelay(target: Application, wallet: uint64): Principal {
    return abiCall<typeof MockPrincipalProbe.prototype.tryProbe>({
      appId: target,
      args: [wallet],
    }).returnValue
  }

  /** T43: resolve with the factory read from THIS app's own DAO only (never from the wallet). */
  pinnedFactoryProbe(wallet: uint64): Principal {
    return resolvePrincipal(getAkitaAppList(this.akitaDAO.value).wallet, wallet)
  }

  /**
   * T43 negative control: the FORBIDDEN derivation `AkitaAppList(W.akita_dao).wallet`. A wallet admin
   * can repoint `akita_dao`, so this value is attacker-controlled.
   */
  @abimethod({ readonly: true })
  unpinnedFactory(wallet: uint64): uint64 {
    const [dao] = op.AppGlobal.getExUint64(wallet, Bytes(GlobalStateKeyAkitaDAO))
    const [appListBytes] = op.AppGlobal.getExBytes(dao, Bytes(AkitaDAOGlobalStateKeysAkitaAppList))
    return decodeArc4<AkitaAppList>(appListBytes).wallet
  }

  /** `isGenuineWallet(wallet, factory)` for an arbitrary factory (T43 negative control). */
  @abimethod({ readonly: true })
  genuineFor(wallet: uint64, factory: uint64): boolean {
    return isGenuineWallet(wallet, factory)
  }

  /** The DAO's wallet factory as this probe pins it. */
  @abimethod({ readonly: true })
  pinnedFactory(): uint64 {
    return getAkitaAppList(this.akitaDAO.value).wallet
  }

  /** The caller-app context this call observes (diagnostics). */
  @abimethod({ readonly: true })
  callerApp(): uint64 {
    return Global.callerApplicationId
  }
}
