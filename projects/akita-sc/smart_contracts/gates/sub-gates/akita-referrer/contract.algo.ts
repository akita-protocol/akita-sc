import { Account, Application, BoxMap, Bytes, bytes, clone, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { AppGlobal, bitLength, btoi, Global } from '@algorandfoundation/algorand-typescript/op'
import { getAkitaAppList, getOtherAppList } from '../../../utils/functions'
import { GateCtx, isGenuineWallet, PRINCIPAL_KEY_REFERRER } from '../../../utils/principal'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'
import { AkitaReferrerGateRegistryMBR } from './constants'

// CONTRACT IMPORTS
import type { EscrowFactory } from '../../../escrow/factory.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'


export type AkitaReferrerGateRegistryInfo = {
  referrer: Account
}

/**
 * Passes when the acting Akita wallet's `referrer` is the registered referrer. The referrer is
 * self-asserted (residual R-REFERRER): it was chosen at wallet creation and an admin-updated
 * wallet can rewrite it.
 *
 * Context-aware (principal-resolution spec §6.9): `checkFor(ctx, ...)` uses `ctx.wallet`, the
 * wallet the first hop verified for this action. No registry read, so it also works for wallets
 * with an external controlled address and for wallets that never registered. Args are ignored.
 * The plain `check(caller, ...)` keeps the legacy registry rule (args = the 8-byte wallet id
 * registered for `caller`) but returns false instead of reverting when `caller` is unregistered.
 */
export class AkitaReferrerGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })

  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: 'address', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, AkitaReferrerGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  /** `wallet` is a genuine Akita wallet (creator == the DAO's wallet factory) whose referrer is `referrer`. */
  private referrerGate(wallet: uint64, referrer: Account): boolean {
    const factory = getAkitaAppList(this.akitaDAO.value).wallet
    if (wallet === 0 || !isGenuineWallet(wallet, factory)) {
      return false
    }
    // Third-party paths (StakingPool.gateCheck) reach this read, so it must not fail for any wallet
    // program. `len` fails on a uint64; `bitlen` accepts both stack types. A value of at most 64 bits
    // is a uint64 or an (all but) zero byte string: it reads as "no referrer", like a missing key.
    const [raw, exists] = AppGlobal.getExBytes(wallet, Bytes(PRINCIPAL_KEY_REFERRER))
    if (!exists || bitLength(raw) <= 64) {
      return referrer === Global.zeroAddress
    }
    return (raw.length === 32 ? Account(raw) : Global.zeroAddress) === referrer
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------  

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // ASSET GATE METHODS ---------------------------------------------------------------------------

  cost(args: bytes): uint64 {
    return AkitaReferrerGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === 32, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === AkitaReferrerGateRegistryMBR, errInvalidPayment)

    const id = this.newRegistryID()
    this.registry(id).value = decodeArc4<AkitaReferrerGateRegistryInfo>(args)
    return id
  }

  /**
   * LEGACY subject rule (EscrowFactory registry): `args` is the 8-byte wallet id registered for
   * `caller`. Returns false (no revert) when `caller` is not registered or is registered to
   * another wallet, so OR groups keep working.
   */
  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 8, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)

    const { referrer } = clone(this.registry(registryID).value)

    const registered = abiCall<typeof EscrowFactory.prototype.get>({
      appId: getOtherAppList(this.akitaDAO.value).escrow,
      args: [caller]
    }).returnValue

    if (registered !== args) {
      return false
    }

    return this.referrerGate(btoi(args), referrer)
  }

  /**
   * Context-aware check: rule `ctx.wallet != 0 && referrer(ctx.wallet) == registered`. `ctx.wallet`
   * is the actor's own wallet, verified by the first hop (spec §3.5), so no one can borrow another
   * wallet's referrer. `args` are ignored (any value, including the legacy 8-byte wallet id).
   * Resource: P(ctx.wallet).
   */
  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { referrer } = clone(this.registry(registryID).value)
    return this.referrerGate(ctx.wallet, referrer)
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
