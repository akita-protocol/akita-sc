import { Account, Application, BoxMap, bytes, clone, Global, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4 } from '@algorandfoundation/algorand-typescript/arc4'
import { GateCtx } from '../../../utils/principal'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errInvalidArgCount, errInvalidPayment, errInvalidRegistryArg } from '../../errors'
import { GovernanceParticipationGateRegistryMBR, GovernanceParticipationRegisterByteLength } from './constants'
import { GovernanceParticipationGateRegistryInfo } from './types'

// CONTRACT IMPORTS
import type { AkitaDAO } from '../../../arc58/dao/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'

/**
 * Passes when the subject has voted on at least `minVotes` distinct Akita DAO proposals and, when
 * `withinSeconds` is not 0, cast its last vote at most `withinSeconds` ago. Reads the DAO's
 * participation record (`AkitaDAO.getGovernanceParticipation`), which survives vote receipt deletion.
 *
 * Context-aware (principal-resolution spec §6.9): `checkFor(ctx, ...)` passes when either the verified
 * principal or the spender qualifies. The DAO records a vote under the sender of `voteProposal`, which is
 * the wallet's spending account when the vote goes through the AkitaDAOPlugin.
 */
export class GovernanceParticipationGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(uint64,uint64)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, GovernanceParticipationGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  private participationGate(user: Account, withinSeconds: uint64, minVotes: uint64): boolean {
    const { lastVotedTs, votes } = abiCall<typeof AkitaDAO.prototype.getGovernanceParticipation>({
      appId: this.akitaDAO.value,
      args: [user],
    }).returnValue

    if (votes < minVotes) {
      return false
    }
    return withinSeconds === 0 || Global.latestTimestamp - lastVotedTs <= withinSeconds
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // GOVERNANCE PARTICIPATION GATE ----------------------------------------------------------------

  cost(args: bytes): uint64 {
    return GovernanceParticipationGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === GovernanceParticipationRegisterByteLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === GovernanceParticipationGateRegistryMBR, errInvalidPayment)

    const info = decodeArc4<GovernanceParticipationGateRegistryInfo>(args)
    loggedAssert(info.minVotes > 0, errInvalidRegistryArg)

    const id = this.newRegistryID()
    this.registry(id).value = clone(info)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 0, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { withinSeconds, minVotes } = clone(this.registry(registryID).value)
    return this.participationGate(caller, withinSeconds, minVotes)
  }

  /** Context-aware check (see the class comment). No args. */
  checkFor(ctx: GateCtx, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 0, errInvalidArgCount)
    loggedAssert(this.registry(registryID).exists, errInvalidRegistryArg)
    const { withinSeconds, minVotes } = clone(this.registry(registryID).value)
    if (this.participationGate(ctx.principal, withinSeconds, minVotes)) {
      return true
    }
    return ctx.spender !== ctx.principal && this.participationGate(ctx.spender, withinSeconds, minVotes)
  }

  @abimethod({ readonly: true })
  getRegistrationShape(shape: GovernanceParticipationGateRegistryInfo): GovernanceParticipationGateRegistryInfo {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
