import { Account, Application, BoxMap, bytes, clone, Global, GlobalState, gtxn, loggedAssert, uint64 } from '@algorandfoundation/algorand-typescript'
import { abiCall, abimethod, decodeArc4, encodeArc4, Uint8 } from '@algorandfoundation/algorand-typescript/arc4'
import { STAKING_TYPE_HARD, STAKING_TYPE_HEARTBEAT, STAKING_TYPE_LOCK, STAKING_TYPE_SOFT, StakingType } from '../../../staking/types'
import { getAkitaAppList } from '../../../utils/functions'
import {
  Equal,
  GreaterThan,
  GreaterThanOrEqualTo,
  LessThan,
  LessThanOrEqualTo,
  NotEqual,
} from '../../../utils/operators'
import { GateGlobalStateKeyCheckShape, GateGlobalStateKeyRegistrationShape, GateGlobalStateKeyRegistryCursor } from '../../constants'
import { errBadOperation, errInvalidArgCount, errInvalidPayment } from '../../errors'
import { Operator } from '../../types'

// CONTRACT IMPORTS
import type { Staking } from '../../../staking/contract.algo'
import { AkitaBaseContract } from '../../../utils/base-contracts/upgradeable'


type StakingAmountGateRegistryInfo = {
  op: Operator
  asset: uint64
  type: StakingType
  amount: uint64
  includeEscrowed: boolean
}

const StakingAmountGateRegistryMBR: uint64 = 13_300
/** [op:1][asset:8][type:1][amount:8][includeEscrowed:1] */
const RegisterByteLength: uint64 = 19

export class StakingAmountGate extends AkitaBaseContract {

  // GLOBAL STATE ---------------------------------------------------------------------------------

  registryCursor = GlobalState<uint64>({ initialValue: 1, key: GateGlobalStateKeyRegistryCursor })
  /** the abi string for the register args */
  registrationShape = GlobalState<string>({ initialValue: '(uint8,uint64,uint8,uint64,bool)', key: GateGlobalStateKeyRegistrationShape })
  /** the abi string for the check args */
  checkShape = GlobalState<string>({ initialValue: '', key: GateGlobalStateKeyCheckShape })

  // BOXES ----------------------------------------------------------------------------------------

  registry = BoxMap<uint64, StakingAmountGateRegistryInfo>({ keyPrefix: '' })

  // PRIVATE METHODS ------------------------------------------------------------------------------

  private newRegistryID(): uint64 {
    const id = this.registryCursor.value
    this.registryCursor.value += 1
    return id
  }

  private stakingAmountGate(
    user: Account,
    op: Operator,
    asset: uint64,
    amount: uint64,
    type: Uint8,
    includeEscrowed: boolean
  ): boolean {
    let staked: uint64 = 0
    const appId = getAkitaAppList(this.akitaDAO.value).staking

    if (type === STAKING_TYPE_HEARTBEAT) {
      staked = abiCall<typeof Staking.prototype.getHeartbeatAverage>({
        appId,
        args: [user, asset, includeEscrowed],
      }).returnValue
    } else {
      // getInfo returns an empty stake instead of failing (audit SG-17)
      const info = abiCall<typeof Staking.prototype.getInfo>({
        appId,
        args: [user, { asset, type }],
      }).returnValue

      staked = info.amount

      // audit SG-10: a SOFT stake is only a commitment; never count more than is held now
      if (type === STAKING_TYPE_SOFT && staked > 0) {
        const { balance } = abiCall<typeof Staking.prototype.softCheck>({
          appId,
          args: [user, asset],
        }).returnValue
        if (balance < staked) {
          staked = balance
        }
      }
    }

    switch (op) {
      case Equal: return staked === amount
      case NotEqual: return staked !== amount
      case LessThan: return staked < amount
      case LessThanOrEqualTo: return staked <= amount
      case GreaterThan: return staked > amount
      case GreaterThanOrEqualTo: return staked >= amount
      default: return false
    }
  }

  // LIFE CYCLE METHODS ---------------------------------------------------------------------------

  @abimethod({ onCreate: 'require' })
  create(version: string, akitaDAO: uint64): void {
    this.version.value = version
    this.akitaDAO.value = Application(akitaDAO)
  }

  // STAKING AMOUNT GATE METHODS ------------------------------------------------------------------

  cost(args: bytes): uint64 {
    return StakingAmountGateRegistryMBR
  }

  register(mbrPayment: gtxn.PaymentTxn, args: bytes): uint64 {
    loggedAssert(args.length === RegisterByteLength, errInvalidArgCount)
    loggedAssert(mbrPayment.receiver === Global.currentApplicationAddress, errInvalidPayment)
    loggedAssert(mbrPayment.amount === StakingAmountGateRegistryMBR, errInvalidPayment)

    const params = decodeArc4<StakingAmountGateRegistryInfo>(args)
    // dont include the list operators includes & not includes
    loggedAssert(params.op.asUint64() >= Equal.asUint64() && params.op.asUint64() <= GreaterThanOrEqualTo.asUint64(), errBadOperation)
    loggedAssert(
      params.type === STAKING_TYPE_HEARTBEAT ||
      params.type === STAKING_TYPE_SOFT ||
      params.type === STAKING_TYPE_HARD ||
      params.type === STAKING_TYPE_LOCK,
      errBadOperation
    )
    const id = this.newRegistryID()
    this.registry(id).value = clone(params)
    return id
  }

  check(caller: Account, registryID: uint64, args: bytes): boolean {
    loggedAssert(args.length === 0, errInvalidArgCount)
    const { op, asset, amount, type, includeEscrowed } = clone(this.registry(registryID).value)
    return this.stakingAmountGate(
      caller,
      op,
      asset,
      amount,
      type,
      includeEscrowed
    )
  }

  @abimethod({ readonly: true })
  getRegistrationShape(shape: StakingAmountGateRegistryInfo): StakingAmountGateRegistryInfo {
    return shape
  }

  @abimethod({ readonly: true })
  getEntry(registryID: uint64): bytes {
    return encodeArc4(this.registry(registryID).value)
  }
}
