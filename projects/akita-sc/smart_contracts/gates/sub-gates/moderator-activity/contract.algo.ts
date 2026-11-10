import { Account, Application, BoxMap, bytes, clone, Global, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { getAkitaSocialAppList } from '../../../utils/functions'
import { GateCtx } from '../../../utils/principal'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'
import { ModeratorActivityGateRegistryMBR, ModeratorActivityMaxEpochsBack, ModeratorActivityRegisterByteLength } from './constants'
import { ModeratorActivityGateRegistryInfo } from './types'

// CONTRACT IMPORTS
import type { AkitaSocialModeration } from '../../../social/moderation.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'

/**
 * Passes when the subject is a moderator with at least `minActions` counted moderation actions in
 * the current epoch (7 days), plus the previous epoch when `epochsBack` is 1. Counts come from
 * `AkitaSocialModeration.moderatorActivity`, a net count: forward actions add one, reversals take one off.
 *
 * Context-aware (principal-resolution spec §6.9): `checkFor(ctx, ...)` passes when either the verified
 * principal or the spender qualifies. Moderation records actions under the sender of the moderation
 * call, which is the spender when a moderator acts through a wallet escrow window.
 */
export class ModeratorActivityGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(uint64,uint64)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, ModeratorActivityGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  private activityGate(user: Account, minActions: uint64, epochsBack: uint64): boolean {
    const { exists, actions, previousActions } = abiCall<typeof AkitaSocialModeration.prototype.moderatorActivity>({
      appId: getAkitaSocialAppList(this.akitaDAO.value).moderation,
      args: [user],
    }).returnValue

    if (!exists) {
      return false
    }

    const counted: uint64 = epochsBack === 0 ? actions : actions + previousActions
    return counted >= minActions
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // MODERATOR ACTIVITY GATE ----------------------------------------------------------------------

  cost(args: bytes): uint64 {
    return ModeratorActivityGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === ModeratorActivityRegisterByteLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === ModeratorActivityGateRegistryMBR, errInvalidPayment)

    const info = decodeArc4<ModeratorActivityGateRegistryInfo>(args)
    loggedAssert(info.epochsBack <= ModeratorActivityMaxEpochsBack, errInvalidRegistryArg)

    const id = this.newRegistryID()
    this.registry(id).value = clone(info)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 0, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { minActions, epochsBack } = clone(this.registry(registryID).value)
    return this.activityGate(caller, minActions, epochsBack)
  }

  /** Context-aware check (see the class comment). No args. */
  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 0, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { minActions, epochsBack } = clone(this.registry(registryID).value)
    if (this.activityGate(ctx.principal, minActions, epochsBack)) {
      return true
    }
    return ctx.spender !== ctx.principal && this.activityGate(ctx.spender, minActions, epochsBack)
  }

  @abimethod({ readonly: true })
  getRegistrationShape(shape: ModeratorActivityGateRegistryInfo): ModeratorActivityGateRegistryInfo {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
