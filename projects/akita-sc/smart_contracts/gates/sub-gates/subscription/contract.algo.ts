import { Account, Application, BoxMap, bytes, clone, Global, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { ctxOwnsOf, getAkitaAppList } from '../../../utils/functions'
import { GateCtx } from '../../../utils/principal'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'
import { SubscriptionGateRegistryMBR } from './constants'
import { SubscriptionGateCheckParams, SubscriptionGateRegistryInfo } from './types'
import { getActiveSubscription, subscriberControlledBy } from './utils'

// CONTRACT IMPORTS
import type { Subscriptions } from '../../../subscriptions/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'


/** [merchant:32][serviceID:8] */
const RegisterArgsByteLength: uint64 = 40
/** [subscriber:32][subscriptionID:8] */
const CheckArgsByteLength: uint64 = 40

/**
 * Passes when the caller (or the Akita wallet it controls) holds a live subscription to a
 * specific merchant service. Audit SG-03: the registry names a service (not a subscription
 * index), donations never count, and the subscription is supplied by the caller and
 * proven to belong to them.
 *
 * Context-aware (principal-resolution spec §6.9): Gate v2 `checkFor` / `mustCheckFor` call
 * `checkFor(ctx, ...)`, which proves ownership with `ctxOwns` (subscriber is the verified principal,
 * the spender, or an account the verified wallet owns at rest). No registry read. The plain
 * `check(caller, ...)` keeps the legacy registry rule for legacy callers.
 */
export class SubscriptionGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(address,uint64)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '(address,uint64)', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, SubscriptionGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // SUBSCRIPTION GATE METHODS --------------------------------------------------------------------

  cost(args: bytes): uint64 {
    return SubscriptionGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === RegisterArgsByteLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === SubscriptionGateRegistryMBR, errInvalidPayment)

    const info = decodeArc4<SubscriptionGateRegistryInfo>(args)
    loggedAssert(info.serviceID !== 0, errInvalidRegistryArg)
    // asserts the service exists
    abiCall<typeof Subscriptions.prototype.getService>({
      appId: getAkitaAppList(this.akitaDAO.value).subscriptions,
      args: [info.merchant, info.serviceID],
    })

    const id = this.newRegistryID()
    this.registry(id).value = clone(info)
    return id
  }

  /** LEGACY subject rule (registry): `subscriberControlledBy(subscriber, caller)`. */
  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === CheckArgsByteLength, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { merchant, serviceID } = clone(this.registry(registryID).value)
    const { subscriber, id } = decodeArc4<SubscriptionGateCheckParams>(args)

    if (!subscriberControlledBy(this.akitaDAO.value, subscriber, caller)) {
      return false
    }

    return getActiveSubscription(this.akitaDAO.value, subscriber, id, merchant, serviceID).active
  }

  /**
   * Context-aware check: `ctx` is the first hop's verified context, forwarded by Gate v2. Same args
   * as `check` (`(address subscriber, uint64 id)`, 40 bytes). Subject rule: `ctxOwns(ctx, subscriber)`.
   * Because `ctx.wallet` is the actor's own verified wallet, no one can borrow another user's
   * subscription. Resources: P(ctx.wallet) and A(subscriber) when the subscriber is neither the
   * principal nor the spender.
   */
  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === CheckArgsByteLength, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { merchant, serviceID } = clone(this.registry(registryID).value)
    const { subscriber, id } = decodeArc4<SubscriptionGateCheckParams>(args)

    if (!ctxOwnsOf(this.akitaDAO.value, ctx, subscriber)) {
      return false
    }

    return getActiveSubscription(this.akitaDAO.value, subscriber, id, merchant, serviceID).active
  }

  @abimethod({ readonly: true })
  getRegistrationShape(shape: SubscriptionGateRegistryInfo): SubscriptionGateRegistryInfo {
    return shape
  }

  @abimethod({ readonly: true })
  getCheckShape(shape: SubscriptionGateCheckParams): SubscriptionGateCheckParams {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
