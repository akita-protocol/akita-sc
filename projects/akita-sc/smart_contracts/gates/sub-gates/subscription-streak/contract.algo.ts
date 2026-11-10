import { Account, Application, BoxMap, bytes, clone, Global, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { ctxOwnsOf, getAkitaAppList } from '../../../utils/functions'
import { GateCtx } from '../../../utils/principal'
import {
  Equal,
  GreaterThan,
  GreaterThanOrEqualTo,
  LessThan,
  LessThanOrEqualTo,
  NotEqual,
} from '../../../utils/operators'
import { Operator } from '../../types'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errBadOperation, errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'
import { SubscriptionGateCheckParams } from '../subscription/types'
import { ActiveSubscription, getActiveSubscription, subscriberControlledBy } from '../subscription/utils'
import { SubscriptionStreakGateRegistryMBR } from './constants'
import { SubscriptionStreakGateRegistryInfo } from './types'

// CONTRACT IMPORTS
import type { Subscriptions } from '../../../subscriptions/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'


/** [merchant:32][serviceID:8][op:1][streak:8] */
const RegisterByteLength: uint64 = 49
/** [subscriber:32][subscriptionID:8] */
const CheckArgsByteLength: uint64 = 40

/**
 * Passes when the caller (or the Akita wallet it controls) holds a live subscription to a
 * specific merchant service whose streak satisfies `op streak`. Audit SG-03 (same subject
 * and service rules as SubscriptionGate).
 *
 * Context-aware (principal-resolution spec §6.9): `checkFor(ctx, ...)` proves ownership with
 * `ctxOwns`; the plain `check(caller, ...)` keeps the legacy registry rule.
 */
export class SubscriptionStreakGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(address,uint64,uint8,uint64)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '(address,uint64)', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, SubscriptionStreakGateRegistryInfo>({ keyPrefix: '' })

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

  // SUBSCRIPTION STREAK GATE METHODS -------------------------------------------------------------

  cost(args: bytes): uint64 {
    return SubscriptionStreakGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === RegisterByteLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === SubscriptionStreakGateRegistryMBR, errInvalidPayment)

    const info = decodeArc4<SubscriptionStreakGateRegistryInfo>(args)
    loggedAssert(info.serviceID !== 0, errInvalidRegistryArg)
    loggedAssert(info.op.asUint64() >= Equal.asUint64() && info.op.asUint64() <= GreaterThanOrEqualTo.asUint64(), errBadOperation)
    // asserts the service exists
    abiCall<typeof Subscriptions.prototype.getService>({
      appId: getAkitaAppList(this.akitaDAO.value).subscriptions,
      args: [info.merchant, info.serviceID],
    })

    const id = this.newRegistryID()
    this.registry(id).value = clone(info)
    return id
  }

  private streakPasses(sub: ActiveSubscription, op: Operator, streak: uint64): boolean {
    if (!sub.active) {
      return false
    }

    switch (op) {
      case Equal: return sub.streak === streak
      case NotEqual: return sub.streak !== streak
      case LessThan: return sub.streak < streak
      case LessThanOrEqualTo: return sub.streak <= streak
      case GreaterThan: return sub.streak > streak
      case GreaterThanOrEqualTo: return sub.streak >= streak
      default: return false
    }
  }

  /** LEGACY subject rule (registry): `subscriberControlledBy(subscriber, caller)`. */
  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === CheckArgsByteLength, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { merchant, serviceID, op, streak } = clone(this.registry(registryID).value)
    const { subscriber, id } = decodeArc4<SubscriptionGateCheckParams>(args)

    if (!subscriberControlledBy(this.akitaDAO.value, subscriber, caller)) {
      return false
    }

    return this.streakPasses(getActiveSubscription(this.akitaDAO.value, subscriber, id, merchant, serviceID), op, streak)
  }

  /** Context-aware check (same args as `check`); subject rule `ctxOwns(ctx, subscriber)`. */
  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === CheckArgsByteLength, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { merchant, serviceID, op, streak } = clone(this.registry(registryID).value)
    const { subscriber, id } = decodeArc4<SubscriptionGateCheckParams>(args)

    if (!ctxOwnsOf(this.akitaDAO.value, ctx, subscriber)) {
      return false
    }

    return this.streakPasses(getActiveSubscription(this.akitaDAO.value, subscriber, id, merchant, serviceID), op, streak)
  }

  @abimethod({ readonly: true })
  getRegistrationShape(shape: SubscriptionStreakGateRegistryInfo): SubscriptionStreakGateRegistryInfo {
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
